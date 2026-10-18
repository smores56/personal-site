Personal Site
=============

My personal website, a single static page at <https://sammohr.dev/>.

The site is plain HTML and CSS in `docs/`, with no build step. Cloudflare Pages
serves `docs/` on the apex domain: no build command, output directory `docs`.
The keyboard index lives at <https://github.com/smores56/keyboards>;
<https://keyboards.sammohr.dev> is a Cloudflare redirect to it.

Preview locally with `python3 -m http.server -d docs`. Edit `docs/index.html`
or `docs/style.css`, commit, and push to `main`. The previous GitHub Pages
build remains on the `gh-pages` branch if the Cloudflare project needs to be
rolled back.
