---
title: Announcing Weaver
subtitle: Having your cake and eating it, too
date: "2024-05-05"
---

_This is an announcement for [Weaver](https://github.com/smores56/weaver), my arg_
_parsing library for the [Roc](https://roc-lang.org) language. I did a talk on_
_Weaver that you can watch [here](https://drive.google.com/file/d/1uhxZ8vRJ_4a-RPccTGN8CsB5yWLjmdD2/view?usp=sharing),_
_the transcript for which is available [as a gist here](https://gist.github.com/smores56/896c905863cd187b9e6ec43dc9caee02)._

Programming languages, much like life, are mired in decisions concerning scarcity.
"There is no silver bullet." If you want the convenience of using Python for 
prototyping your project, you'll either need to rewrite it into a compiled language
at some point or face scaling issues relating to both performance and complexity
management. That's what I love so much about the budding [Roc](https://roc-lang.org)
language: it's very ergonomic to write, but it's designed from the ground up to be
well-typed, fast to compile, and fast to run. Roc is all about letting me not feel
like I'm making a big sacrifice in using it.

There are many efforts by the Roc language to achieve this uncompromising simplicity;
most recently, the [await bang syntax](https://rtfeldman.com/imperative-clothing)
(e.g. `data = Http.get! url`)  has made writing effectful code much more ergonomic
while still being safe. Though that's a great feature, I personally was most enamored
with the [record builder](https://www.roc-lang.org/examples/RecordBuilder/README.html)
syntax that was added [last year](https://github.com/roc-lang/roc/pull/5421) by @agu-z.

## What's a record builder?

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

It's a syntax in Roc that lets you call multiple functions on an applicative functor
and store the results in a record. If you don't know what an applicative functor is,
you can [read about it here](https://www.adit.io/posts/2013-04-17-functors,_applicatives,_and_monads_in_pictures.html),
but it's basically a convenient type that allows for effectful-like programming. There
are lots of tasks that are made much simpler, or even possible at all, with this syntax:

- Batching parallel HTTP requests
- Incrementing a counter for successive function calls
- Parsing JSON data or command-line arguments

That last one is the first thing I thought of when I saw this syntax, a way to
[parse, not validate](https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/)
my command line arguments without metaprogramming/macros! Normally, when you get
a list of command line arguments and want to parse them into specific values, you'll
define your flags and parameters, and whatever library will give you back a dictionary
with string values for everything you asked for:

```python
config = Cli(
    name="my-app",
    flags=["-f/--force"],
    params={
        "file": "string",
        "amount": "number"
    }
)

args = ["my-app", "--force", "abc.txt", "5"]
data = config.parse(args)

data == { "force": "true", "file": "abc.txt": "amount": "5" }
```

And then you have to go in and validate that data after it's already parsed:

```python
force = data["force"] == "true"
file = data["file"] or ""
amount = int(data["amount"]) # might throw if invalid
```

Now, if the above Python was written to be Pythonic, then it would
return a dictionary with the actual data types in it (e.g. `{ "amount": 5 }`),
but that is only possible because Python is dynamically typed, and I don't
want to live in that kind of jungle. So as long as we live in Type Land,
then we need to do the above.

## Macro-based parser builders

However, if you have macros like in [Rust](https://rust-lang.org), then you
can get the above for free<sup>**</sup> with [clap](https://github.com/clap-rs/clap),
a magical and type-safe library for argument parsing! All you do is define
a struct with your options and then put some annotations:

```rust
/// A tool to color some data.
#[derive(Debug, Parser)]
pub struct ArgConfig {
    /// The color of your output.
    #[clap(short, long)]
    pub color: String,
    /// How much logging to show.
    #(clap(count))
    pub verbosity: usize,
}
```

And clap will generate code during compilation to do what we had to manually
do in Python, and we can just call a single function to handle everything:

```rust
let config = ArgConfig::parse();

config == ArgConfig { color: "abc".to_owned(), verbosity: 3 }
```

You may have noticed a conspicuous asterisk or two on the word "free"
when I said clap generates this for free. The hidden cost here is a compile
time cost: macros are a box of legos bundled on top of any language they're
in, and make compilation a good deal slower. Any Rust engineer (myself included)
will tell you how much [serde](https://serde.rs/) or [sqlx](https://github.com/launchbadge/sqlx)
contributes to their development slowdown. Not to mention that Rust's
procedural macros, like the ones that clap uses here, are extremely powerful,
which lets you do write very convenient-to-use code that unfortunately makes
it much harder for readers to know what's actually happening in the code
they're writing.

Knowing about these difficulties in conveniently parsing data is what makes
me so excited about using Roc's record builder syntax to solve this problem!
One [Hackers](https://www.imdb.com/title/tt0113243/)-inspired montage of
cracking out code later, I've now released version 0.2.0 of [Weaver](https://github.com/smores56/weaver),
my library for parsing CLI args using this great `: <- ...` doohickey.

## Show me an example!

Weaver CLI's look like this:

```elm
cli =
    Cli.weave {
        alpha: <- Opt.maybeU64 { short: "a", long: "alpha" },
        verbosity: <- Opt.count { short: "v", long: "verbose" }
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
    args = Arg.list!
    when Cli.parseOrDisplayMessage cli args is
        Ok data ->
            data == {
                alpha: 5,
                verbosity: 1,
                file: "1.txt",
                files: ["2.txt", "3.txt"]
            }

        Err message ->
            Stderr.line message
```

There are a few cool things I want to point out:

- We didn't explicitly define the type of any of our fields in
  the CLI config, all of their types were inferred from the functions
  we called.
- The `cli` we defined didn't require us to pass the arguments ahead
  of time, because Weaver is able to be very modular thanks to how the
  builder syntax works.
- Like with Rust's [clap](https://github.com/clap-rs/clap), we also
  get automatic help text and usage text without writing any extra code,
  but here it's done without _any_ macros.

The main takeaway is that we get a simple API to parse CLI args in a
type-safe way without needing to do metaprogramming at compile time.
To be fair, there was a lot more work necessary to develop this library
than it is to use (keep reading), but that parallels how the Roc language
works: the language team has done a lot of great design work and
optimization to make it so that you don't have to worry about writing
performant or safe code, it happens by virtue of writing anything that
compiles in Roc.

Weaver has everything you need already to write a CLI parser to get your
app rolling, but there are a few other features I'm planning on adding
when I get to it:

- Completion generation for popular shells (e.g. zsh, fish, bash, etc.)
- Detecting whether to style help text if in a TTY or not
- A one-and-done parsing function like [clap](https://docs.rs/clap/latest/clap/trait.Parser.html#method.parse)'s
  once [module params](https://docs.google.com/document/u/0/d/110MwQi7Dpo1Y69ECFXyyvDWzF4OYv1BLojIm08qDTvg/mobilebasic)
  are implemented
- Check the [README](https://github.com/smores56/weaver) for a more
  complete list

If there's a feature that's missing that you would find crucial to writing
a CLI using Weaver, please [make an issue](https://github.com/smores56/weaver/issues/new)
and I can jump on doing what the community finds important. I want to make
Weaver a one-stop-shop for CLI parsing in Roc!

## What I like about writing Roc

I love writing code in Roc. It's awesome. There are tons of great
features that I take for granted like the type system, the super helpful
compiler error messages, and the clean syntax, but the biggest two
are definitely the expressiveness and the good dev experience.

### It's expressive

Roc has something I've not seen in any other programming language:
anonymous tag unions. You can create sum types like in Rust, but you
don't need to write a type that captures all variants of your sum
type, you _just write code_ and Roc will figure out which variants
you used, and make sure you handle all variants where necessary.

So not only does Roc know that `color`'s type in

```elm
score = when color is
    Red -> 5
    Green -> 10
    Blue -> 15
```

is `[Red, Green, Blue]`, but you can use the same tag in different
contexts and Roc will group the unions differently:

```elm
myScore = when myColor is
    Red -> 5
    Green -> 10

yourScore = when yourColor is
    Green -> 10
    Custom score -> score

allColors = [myColor, yourColor]
```

`myColor` is typed `[Red, Green]` and `yourScore` is typed
`[Green, Custom U64]`, but `allColors` is typed `[Red, Green, Custom U64]`.
Just one of many magic features in Roc.

### It has great DX

Roc only accepts features that can be parsed and type-checked
very quickly, meaning that you can expect your code to always
type-check in _milliseconds_. That paired with a language server
and a [tree sitter implementation](https://github.com/faldor20/tree-sitter-roc)
makes for a great experience writing code. It will take some time
for Roc to mature enough to test this, but I'm pretty confident
that Roc will be a great language for monorepos, meaning I won't
have to eat my [golang](https://go.dev/) brussel sprouts when working on
large, collaborative codebases.

Since the compiler errors are so helpful, you can just start writing
code and the type-checker will tell you what part of your code is
missing. That was a godsend during my development of Weaver with how
complicated some of the types that I was dealing with were.

When I had a working prototype and needed to get the library ready for
release, refactoring was a breeze, since everything is just functions,
as Roc is a pure functional language, and also doesn't support name
shadowing. I just copied around text and renamed functions, and then
added doc comments and made a GitHub release. Nothing to it!

### Should I use Roc?

If you're wondering whether or not you should write code in Roc,
the tl;dr is go for it now if you don't mind using an alpha-language,
but probably you should wait a couple years until they do versioned
releases so you can get stability guarantees. There are definitely a
lot of compiler bugs at the moment, but they are getting fixed as
the months go by.

The thing that gives me the most confidence that I'll be using Roc
at my job someday is the team of developers currently working on Roc.
The GitHub repo is always active with new issues and pull requests,
and I don't have to worry about a low bus factor. Above all, the BDFN
(Benevolent Dictator For Now) is Richard Feldman, who is a big player
from the Elm ecosystem and the reason Roc exists at all. He is so
knowledgeable about how to make the right programming language that
I have no doubt that Roc will be a great language in the next few years!

## How to build a library, one magic trick at a time

If you're curious about how Weaver works, keep reading, but if not,
you can use it right now by copying the example in [the README](https://github.com/smores56/weaver)
into a file and running it with `roc example.roc -- ARGS`.

# 👋

...okay, you didn't run away. Good! I learned a good bit while writing
Weaver, and anyone writing Roc code with or without the record builder
syntax could probably glean something from my experience. I'll start by
explaining the gist of how Weaver works, and then we'll get into some
nitty gritty bits. Fair warning, I'm assuming your familiar with how Roc
works, which you can learn from the [tutorial](https://www.roc-lang.org/tutorial)
if you haven't already.

### Wrangling the curried builder

`Cli.weave` is the entry point for any Weaver CLI, and it creates a
CLI builder that receives the [curried](https://en.wikipedia.org/wiki/Currying)
builder and initializes an empty metadata config.

Each new field (e.g. `Opt.maybeStr` or `Param.u64`) does the following:

- Add their metadata to the config
- Update the parser to a new parser

What we want at the end is a parser of type `List Str -> Result data CliErr`,
and all metadata defined. To get that parser, we need some way of getting from
the curried builder:

```elm
A -> B -> C -> { a: A, b: B, c: C }
```

to an uncurried argument parser:

```elm
List Str -> Result { a: A, b: B, c: C } CliErr
```

We do this by having each field parser (e.g. [Opt.i16List](https://smores56.github.io/weaver/Opt/#i16List))
take an applicative functor that currently has a data parser of type `A -> rest`
and returns an applicative functor that has a data parser of type `rest`, and we end
up working through the curried builder until we have a simple function at the end.

For example, the type of `Opt.i16List` is:

```elm
OptionConfigBaseParams -> (CliBuilder (List I16 -> state) GetOptionsAction -> CliBuilder state GetOptionsAction)
```

where `CliBuilder state action` is the builder we pass around. The `state` represents
what remains of the original `A -> B -> C -> { ... }` we have remaining in our builder.
You'll notice that the second parameter has a `state` of `List I16 -> state`, which
sets the corresponding field to `List I16` and returns the remaining state for
deconstruction by the rest of the field extractor functions.

You should look at the [source of Weaver](https://github.com/smores56/weaver/tree/main/package/Opt.roc)
to properly understand how this works if you want to build your own builder pattern
library for Roc.

### Enforcing field ordering with typestate

Based on looking at how other CLIs work, including the official `roc` CLI,
there's a precedence on the order in which arguments should be parsed:

- options (`-a` or `--alpha`),
- then subcommands,
- and then parameters (`file.txt`)

This lets us handle these cases correctly:

- both `roc example.roc` and `roc test example.roc`
- parameters starting with `-` (e.g. a file named "-file.txt")

We want to allow starting the builder with `Opt`s, `Subcommand`s, or `Param`s.
We should be able to move to any following field from a prior type, but not
move back. e.g. `Opt` to `Subcommand` or `Opt` to `Param`, but not `Param` to `Opt`.
To achieve the above, the `CliBuilder` has a type variable called `action` that
can either be:

- `{ getOptions: {} }` (alias `GetOptionsAction`)
- `{ getParams: {} }` (alias `GetParamsAction`)
- `[]` (alias `StopCollectingAction`)

This is an approach called [typestate](https://cliffle.com/blog/rust-typestate/) that
I learned from the Rust ecosystem. Typestate encodes the state of the program into
its types, like a finite state machine. We follow this recipe when traversing the
"finite state machine":

1. On builder creation, the `action` is `{ getOptions: {} }`.

   We can start taking `Opt`, `Subcommand`, or `Param`.

2. `Opt.*` takes `{ getOptions: {} }` and returns `{ getOptions: {} }`.

   We can only take `Opt`s at the beginning of building as any other
   action will not type-check.

3. `Subcommand.*` takes `{ getOptions: {} }` and returns `{ getParams: {} }`.

   Subcommands must come after `Opt`s (though none are required) and
   before `Param`s.

4. `Param.*` takes `{}action` and returns `{ getParams: {} }`.

   Once we start taking `Param`s, we can't take anything else but `Param`s.
   All other actions need `{ getOptions: {}  }` as the input action. The
   `{}` at the beginning of the `{}action` parameter says that whatever
   action parameter is passed must be a record of some type, disallowing
   the `[]` empty union type that is returned after a `Param.*List` call.

5. `Param.*List` takes `action` and returns `[]`.

   Once we take a list of params, we can't take anything else as it will
   consume all remaining parameters. This type-checks because of the
   other actions need their action to be some kind of struct, not
   a tag union.

This specific recipe for transitions between field `action`s means that
the compiler keeps the user from compiling code that doesn't have their
fields (and therefore the underlying parser) in the right order! It's tricky
to wrap your head around, but it's definitely the coolest thing I applied in
building Weaver!

## Thanks for reading!

P.S please check out [Roc](https://roc-lang.org) if you haven't already.

Bye!
