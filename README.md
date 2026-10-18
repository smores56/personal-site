Personal Site
=============

My personal website, a single static page at <https://sammohr.dev/>.

The site is plain HTML and CSS in `docs/`, with no build step. It runs as a
Cloudflare Worker with static assets: the Worker is connected to this repo in
the Cloudflare dashboard, with no build command and `docs` as the asset
directory. `sammohr.dev` is the Worker's custom domain. The keyboard index
lives at <https://github.com/smores56/keyboards>;
<https://keyboards.sammohr.dev> is a Cloudflare redirect to it.

Preview locally with `python3 -m http.server -d docs`. Edit `docs/index.html`
or `docs/style.css`, commit, and push to `main`. To deploy by hand, run
`nix shell nixpkgs#wrangler -c wrangler deploy` after `wrangler login`;
`wrangler.jsonc` points the Worker at `docs/`. The previous GitHub Pages
build remains on the `gh-pages` branch if the Worker needs to be rolled back.
