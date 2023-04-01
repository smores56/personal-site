import type { Tool, Job, Project } from "./models";

export const abbTools: Tool[] = [
  { name: "Rust", url: "https://www.rust-lang.org/" },
  { name: "Docker", url: "https://www.docker.com/" },
  { name: "Kubernetes", url: "https://kubernetes.io/" },
  { name: "Cap'n Proto", url: "https://capnproto.org/" },
  { name: "gRPC", url: "https://grpc.io/" },
  { name: "JSON Schema", url: "https://json-schema.org/" },
  { name: "Apache Kafka", url: "https://kafka.apache.org/" }
];

export const ncrTools: Tool[] = [
  { name: "TypeScript", url: "https://www.typescriptlang.org/" },
  { name: "Angular", url: "https://angular.io/" },
  { name: "RxJS", url: "https://rxjs-dev.firebaseapp.com/" },
  { name: "jasmine", url: "https://jasmine.github.io/" },
  { name: "cypress", url: "https://www.cypress.io/" },
  { name: "Java", url: "https://www.java.com/en/" },
  { name: "Spring Boot", url: "https://spring.io/projects/spring-boot" },
  { name: "Hibernate ORM", url: "https://hibernate.org/orm/" }
];

export const aceTools: Tool[] = [
  { name: "TypeScript", url: "https://www.typescriptlang.org/" },
  { name: "React Native", url: "https://reactnative.dev/" },
  { name: "Redux (Offline)", url: "https://redux.js.org/" },
  { name: "Python", url: "https://www.python.org/" },
  { name: "Django", url: "https://www.djangoproject.com/" },
  { name: "AWS", url: "https://aws.amazon.com/" }
];

export const allJobs: Job[] = [
  {
    company: "ABB",
    location: "Atlanta, GA",
    position: "Rust Developer",
    startedAt: "March 2020",
    left: "Present",
    description: "I am currently working to both research and design new systems, as well as upgrade existing \
      systems using modern tools (primarily Rust). I can't give specific details, as most of my \
      work is done on private projects, but I have been solving problems with the following \
      general approach:",
    accomplishments: [],
    responsibilities: [
      "Research best options for designing systems",
      "Write, test, and deploy Rust code",
      "Benchmark and optimize applications to maximize performance"
    ],
    tools: abbTools
  },
  {
    company: "NCR",
    location: "Atlanta, GA",
    position: "Full-Stack Developer",
    startedAt: "July 2019",
    left: "March 2020",
    description: "I worked as a full-stack developer on NCR's Menu Service, an application for building and serving menus \
      to restaurants at a high scale. The service comprised a website (Menu Maker) made with Angular 8 written \
      in TypeScript and a JSON API (Menu API) using Spring Boot written in Java. I was on one of three \
      teams working on the same project (~20 people).",
    accomplishments: [
      "Add state management to frontend with no centralized state management",
      "Taught best practices to multiple teams for state management in websites"
    ],
    responsibilities: [
      "Develop best approaches to problems in team discussions",
      "Add new features on frontend + backend",
      "Write unit and integration tests"
    ],
    tools: ncrTools
  }
  , {
    company: "Ace Industries"
    , location: "Atlanta, GA"
    , position: "Part-Time App Developer"
    , startedAt: "January"
    , left: "May 2019"
    , description:
      "I worked between classes to help a startup migrate complex, outdated systems for an entire manufacturing \
    company to a unified set of applications. I primarily helped with development of features on the React \
    Native app. The service ran on top of a Django JSON API in Python 3 that coordinated Amazon S3 data \
    and a 50+ table database."
    , accomplishments:
      ["Leveraged Redux Offline to allow users to work without internet"
        , "Added type safety to codebase for safety and readability"
        , "Moved to Material UI framework for cohesiveness of user experience"
      ]
    , responsibilities:
      ["Write and test React Native components"
        , "Design app pages for ergonomics and aesthetic needs"
        , "Refactor existing code to provide similar behavior for existing userbase"
      ]
    , tools: aceTools
  }
];

export const sitchTools: Tool[] = [
  { name: "Rust", url: "https://www.rust-lang.org/" },
  { name: "StructOpt", url: "https://github.com/TeXitoi/structopt" },
  { name: "reqwest", url: "https://github.com/seanmonstar/reqwest" },
  { name: "select.rs", url: "https://github.com/utkarshkukreti/select.rs" },
  { name: "Serde JSON", url: "https://github.com/serde-rs/json" }
];

export const chesskerTools: Tool[] = [
  { name: "Zig", url: "https://ziglang.org/" },
  { name: "mecha (parser combinator)", url: "https://github.com/Hejsil/mecha" },
  { name: "Wikipedia", url: "https://en.wikipedia.org/wiki/Rules_of_chess" }
];

export const thisSiteTools: Tool[] = [
  { name: "TypeScript", url: "https://www.typescriptlang.org/" },
  { name: "Svelte", url: "https://svelte.dev/" },
  { name: "Mustard CSS", url: "https://kylelogue.github.io/mustard-ui/index.html" },
];

export const allProjects: Project[] = [
  {
    name: "Sitch"
    , repository: "https://github.com/smores56/sitch"
    , description: "A CLI written in Rust that notifies you of new content that you follow, like on YouTube or RSS feeds, \
          and conveniently sends notifications to your desktop. It's blazing fast thanks to Rust's performance and the \
          fantastic Rayon library, which easily parallelized network requests and boosted performance about 6 times."
    , toolsUsed: sitchTools
  }
  , {
    name: "Chessker"
    , repository: "https://github.com/smores56/chessker"
    , description: "A terminal app to verify a sequence of chess moves and display the state of the game in your console. \
              Born as a marriage between a newfound interest in playing chess with friends online and learning the Zig \
              programming language, I have had great success implementing the complex rules chess prescribes with Zig's \
              combination of high-level abstractions (generics via compile time evaluation, strict null checks, enum-based \
              error handling), and look forward to seeing it rise to popularity."
    , toolsUsed: chesskerTools
  }
  , {
    name: "This Website"
    , repository: "https://github.com/smores56/personal-site"
    , description: "My personal page has been re-written a few times (mostly as a way to learn new frontend frameworks), \
        but I have landed on Svelte with TypeScript as a great middle ground between speed, build size, and \
        correctness. In addition to Mustard CSS, a very lightweight CSS framework, making this site was \
        way simpler than it should have been."
    , toolsUsed: thisSiteTools
  }
];

export const proficientLanguages: Tool[] = [{
  name: "Rust"
  , url: "https://www.rust-lang.org/"
}
  , {
  name: "Python"
  , url: "https://www.python.org/"
}
  , {
  name: "TypeScript"
  , url: "https://www.typescriptlang.org/"
}
  , {
  name: "Elm"
  , url: "https://elm-lang.org/"
}
  , {
  name: "Crystal"
  , url: "https://crystal-lang.org/"
}
  , {
  name: "Zig"
  , url: "https://ziglang.org/"
}
  , {
  name: "C"
  , url: "https://en.wikipedia.org/wiki/C_(programming_language)"
}
  , {
  name: "Java"
  , url: "https://docs.oracle.com/javase/8/docs/technotes/guides/language/index.html"
}
];

export const personalLanguages: Tool[] = [{
  name: "Pony"
  , url: "https://www.ponylang.io/"
}
  , {
  name: "Haskell"
  , url: "https://www.haskell.org/"
}
  , {
  name: "Kotlin"
  , url: "https://kotlinlang.org/"
}
  , {
  name: "Mint"
  , url: "https://www.mint-lang.com/"
}
  , {
  name: "Unison"
  , url: "https://www.unisonweb.org/"
}
  , {
  name: "Formality"
  , url: "https://github.com/moonad/Formality"
}
];
