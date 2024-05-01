import funSizeUrl from "/images/keyboard-pics/fun-size.jpg";
import ospretteUrl from "/images/keyboard-pics/osprette.jpg";
import sephiretteUrl from "/images/keyboard-pics/sephirette.jpg";
import ospretteMxUrl from "/images/keyboard-pics/osprette-mx.jpg";
import clogUrl from "/images/keyboard-pics/clog.jpg";
import clogV2Url from "/images/keyboard-pics/clog-v2.jpg";
import clogV3Url from "/images/keyboard-pics/clog-v3.jpg";

import type { Keyboard } from "~/models";

export const ALL_KEYBOARDS: Keyboard[] = [
  {
    name: "The Osprette",
    link: "https://github.com/smores56/osprette",
    imageUrl: ospretteUrl,
    description:
      "My first foray into the pinky cluster jungle, a magnum opus I can still be proud of \
                  from the aesthetic alone. I've since moved on to other keyboard pastures as all cowboys do, \
                  but this holds a proud spot in my heart as a personal project that made it to about a dozen \
                  countries when I sold and shipped to any daring enough to try it.",
  },
  {
    name: "The Clog V3",
    link: "https://github.com/smores56/clog-v3",
    imageUrl: clogV3Url,
    description:
      "New and improved, and streamlined, the Clog V3 is. All components on the bottom. LDSA keycaps and \
                  choc sunset switches. Asymplex thumb keycaps. Heated seats and convertible roof. This is my \
                  mainstay at work because it makes no compromises, except for a bit of extra setup time.",
  },
  {
    name: "The Clog V2",
    link: "https://github.com/smores56/clog-v2",
    imageUrl: clogV2Url,
    description:
      "A board that works surprisingly well for all the iterations I made from the prior gen. Besides the \
                  newly released pink PCB's, I also used new controllers and brought back the horizontal encoders all \
                  in one go. Changing so much at once was nerve-wracking, but a Discord server of nerds gave me all \
                  the scrutiny I needed to get it right the first time, free of charge.",
  },
  {
    name: "The Clog",
    link: "https://github.com/smores56/clog",
    imageUrl: clogUrl,
    description:
      "\"To show you the power of pinky clusters, I sawed this keyboard in half!\" And also it looks \
                  like a shoe, huh. So yeah, the clog can be soldered together in half an hour or less and will \
                  last for years because it's simple and just works (tm). I'd recommend newer iterations at this point, \
                  though, so you can benefit from my greater design experience.",
  },
  {
    name: "The Osprette MX",
    link: "https://github.com/smores56/osprette-mx",
    imageUrl: ospretteMxUrl,
    description:
      "When you're on the run and wanna grab-and-go, or don't want to set up tripods every time, \
                  the Osprette MX is a wonderfully comfortable package that gets months of battery life. \
                  This is the closest I've come to a perfect board from a design and ergonomics perspective, \
                  and it wins the most used award across all of my designs.",
  },
  {
    name: "The Sephirette",
    link: "https://github.com/smores56/sephirette",
    imageUrl: sephiretteUrl,
    description:
      "The splitting image of the Osprette MX is my weapon of choice when clacking up a \
                  storm at home. The board earns the name of the fan favorite villain by looking good \
                  but feeling better. I haven't used the stacked case design since, but I highly recommend \
                  it if you want an inexpensive build that feels expensive.",
  },
  {
    name: "The Fun Size",
    link: "https://github.com/smores56/fun-size",
    imageUrl: funSizeUrl,
    description:
      "My first finished design. For an early evolution from the primordial design ooze, \
                  I still think it would be a great board to daily if you don't wanna go full pinky \
                  cluster (yet). Maybe if enough people bug me for non-cluster boards like this one I'll \
                  design another, but what can I say, I know what I like.",
  },
];
