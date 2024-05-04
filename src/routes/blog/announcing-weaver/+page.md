---
title: Announcing Weaver
date: "2024-05-05"
---

An ergonomic arg parsing library for the Roc programming language.

---

## Table of Contents

- Introductions
- Why did I want to make this library?
- What is the builder pattern?
- How Weaver works
- Good things about developing in Roc
- Problems encountered during dev
- Future features
- Questions?

---

## Introductions

Hi, I'm Sam Mohr, or S'mores!

I currently write Rust at Flexport.

If anyone needs an ergo keyboard, reach out!

---

## Why did I want to make this library? (_prior art_)

I'm a big fan of Rust's `clap` library.

```rust
#[derive(Debug, Parser)]
pub struct Args {
    /// How verbose our output should be.
    #[clap(short, long)]
    pub verbosity: usize,
}
```

This lets us define our arguments and parse them all at once!

...but it works using compile-time code generation.

---

## Why did I want to make this library? (_double parsing_)

Without compile-time code gen or macros, we _usually_ need to parse twice:

Once, at argument definition:

```python
args = ArgParser(
    name="tool",
    options=[
        Option(name="verbosity", type="count"),
    ],
)
```

And second, after parsing into a dynamic collection:

```python
data = args.parse()
verbosity = int(data["verbosity"])
```

Hopefully we do this second parse immediately so we don't
fail 30 seconds later than necessary.

---

## Why did I want to make this library? (_builder pattern_)

`@agu-z` contributed the [builder pattern](https://github.com/roc-lang/roc/pull/5421) last year.

We can finally have our cake and eat it, too!

```elm
{ parser } =
    Cli.weave {
        verbosity: <- Opt.count { short: "v", long: "verbosity" }
    }
    |> Cli.finish { name: "tool", description: "A tool that does things." }
    |> Cli.assertValid

expect parser ["tool", "-vvv"] == SuccessfullyParsed { verbosity: 3 }
```

Full type safety with no metaprogramming!

---

## What is the builder pattern?

The builder pattern `: <-` is syntax sugar that turns this:

```elm
init {
    a: <- foo,
    b: <- bar,
}
|> finish
```

into this:

```elm
init (\a1 -> \b1 -> { a: a1, b: b1 })
|> foo
|> bar
|> finish
```

It's useful whenever you want to collect multiple fallible/stateful values into a record.

---

## How Weaver works (_example_)

Weaver CLI's look like this:

```elm
cli =
    Cli.weave {
        alpha: <- Opt.maybeNum { short: "a", long: "alpha" },
        file: <- Param.str { name: "file" },
        files: <- Param.strList { name: "files" },
    }
    |> Cli.finish {
        name: "transmogrify",
        version: "1.0.0",
        description: "Transform some files into a new state."
    }
    |> Cli.assertValid

main =
    args <- Arg.list |> Task.await
    when Cli.parseOrDisplayMessage cli args is
        Ok data -> ...
        Err message -> Stderr.line message
```

---

## How Weaver works (_the process_)

`Cli.weave` creates a CLI builder that receives the "curried" builder
and initializes an empty metadata config.

Each new field (e.g. `Opt.maybeStr` or `Param.num`) does the following:
- Add their metadata to the config
- Update the parser to a new parser

By the end of the build process, we get:
- a parsing function
- all the metadata for every option we've configured

This means we can generate help/usage text automatically!

---

## How Weaver works (_updating the parser_)

To update the parser, we borrow from parser combinators to parse in order.

Our intermediate parser is typed (more or less) `List Arg -> Result (state, List Arg) CliErr`.

We build the next parser somewhat like this:

```elm
parser = \args
    (state, remainingArgs) <- previousParser args
        |> Result.try
    (value, restOfArgs) <- parseValue remainingArgs
        |> Result.try
    
    Ok (state value, restOfArgs)
```

---

## How Weaver works (_field ordering_)

For us to parse
- options (`-a` or `--alpha`),
- subcommands,
- and parameters (`file.txt`)

correctly, we need to ensure the above order of fields are provided.

This ensures we can handle:
- both `roc example.roc` and `roc test example.roc`
- parameters starting with `-` (e.g. a file named "-file.txt")

We ensure the CLI builder orders its fields correctly using typestate.

---

## How Weaver works (_typestate_)

Typestate encodes the state of the program into its types, like a finite state machine.

We want to allow starting with `Opt`s, `Subcommand`s, or `Param`s.

We should be able to move to any following field from a prior type, but not move back.
- e.g. `Opt` to `Subcommand` or `Opt` to `Param`, but not `Param` to `Opt`.

To achieve the above, the `CliBuilder` has a type variable called `action` that can either be:
- `{ getOptions: {} }`
- `{ getParams: {} }`
- `[]`

---

## How Weaver works (_typestate continued_)

On builder creation, the `action` is `{ getOptions: {} }`
- We can start taking `Opt`, `Subcommand`, or `Param`

`Opt.*` takes `{ getOptions: {} }` and returns `{ getOptions: {} }`
- We can only take `Opt`s at the beginning of building

`Subcommand.field` takes `{ getOptions: {} }` and returns `{ getParams: {} }`
- Subcommands must come after `Opt`s and before `Param`s

`Param.*` takes `{}action` and returns `{ getParams: {} }`
- Once we start taking `Param`s, we can't take anything else but `Param`s

`Param.*List` takes `action` and returns `[]`
- Once we take a list of params, we can't take anything else

---

## Good things about developing in Roc

The developer experience ~~will be~~ is amazing!
- Compile times are super fast, which is a _language_ feature
  - Roc could be a great language to use in monorepos
- Error messages are very helpful

Compiler-aided design takes less planning ahead
- I don't need to know how my program fits together, I just write logic and the compiler cleans up after me
- I can start writing non-annotated functions for rapid prototyping
- If something isn't type-checking, I can bias the compiler with annotations

Refactoring is painless
- Going from my proof-of-concept to a proper library was just moving text around
  - No need to worry about global state, name shadowing, etc.

---

## Problems encountered during dev

Compiler bugs (to be expected)
- I have a few compiler panics that I need to report GitHub issues for
- In my editor, I go from seeing multiple errors to none at all
  - We could consider catching panics in the LSP?

Unfinished/malformed code gets no help from the LSP
- Rust helps the dev here by adding syntax nodes to the AST with malformed code

---

## Future features

- ANSI highlighting (e.g. colors)
- Completion generation for popular shells
- Module params + Task built-in -> one-and-done helper function
- Happy to take suggestions!

---

## Questions?
