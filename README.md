# Personal Site

My personal website, written in [Svelte](https://svelte.dev/).

You can visit it at <https://sammohr.dev/>.

Dev is done with `yarn`, just run `yarn dev` to run a development server.

Deployment is automated with GitHub actions.

## Resume PDF pipeline

The deploy workflow downloads the latest resume PDF from the rolling GitHub
release published by the [public](https://github.com/smores56/resume)
`smores56/resume` repo (its `.github/workflows/release-pdf.yml` renders
`samuel-mohr-resume.yaml` with RenderCV on every push to `main`, re-publishes
the `resume-pdf` release, then **dispatches this repo's deploy workflow** so
the new PDF is served at <https://sammohr.dev/samuel-mohr-resume.pdf> without
any manual step).

The chain is therefore:
`push to resume:main` → render → rolling release → dispatch personal-site deploy → download asset → publish Pages.

`smores56/resume` is **public**, so the download needs no authentication. The
only remaining credential is for the dispatch step.

### SITE_DEPLOY_TOKEN secret

Dispatching this repo's deploy workflow from `smores56/resume` requires a
fine-grained PAT with **Actions: Read and write** on `personal-site`, stored as
the `SITE_DEPLOY_TOKEN` Actions secret in the *resume* repo (Settings →
Secrets and variables → Actions).

**Creating it (first setup):**
1. GitHub → Settings → Developer settings → Fine-grained tokens → Generate new token
2. Name: `resume-pipeline`; Expiration: pick one (e.g. 90 days)
3. Resource owner: `smores56`; Repository access: *Only select repositories* → `personal-site`
4. Permissions → Repository permissions → **Actions: Read and write**
   (if the dispatch step 403s, also grant Workflows: Read and write)
5. Generate; copy the token (shown once)
6. In `smores56/resume`: Settings → Secrets and variables → Actions → New repository secret
   → name `SITE_DEPLOY_TOKEN`, paste
7. Push to `resume:main` and confirm the full chain completes.

**Rotating / resetting it (e.g. expired, leaked, or suspected compromise):**
1. GitHub → Settings → Developer settings → Fine-grained tokens → open
   `resume-pipeline` → **Regenerate token** (or Revoke to kill it outright)
2. Copy the new token; in `smores56/resume` → Settings → Secrets →
   `SITE_DEPLOY_TOKEN` → Update
3. Re-run the resume release workflow once to verify the full chain works
4. If you revoked instead of regenerated, re-create the token per the setup
   steps above

Never commit the token value anywhere; it only ever lives in the GitHub
secrets store.

## Tasks

- Update dark mode theming for the Sudoku and Keyboards pages
- Consider deploying elsewhere, as SSR deployment is a little wonky
