# Personal Site

My personal website, written in [Svelte](https://svelte.dev/).

You can visit it at <https://sammohr.dev/>.

Dev is done with `yarn`, just run `yarn dev` to run a development server.

Deployment is automated with GitHub actions.

## Resume PDF pipeline

The deploy workflow downloads the latest resume PDF from the rolling GitHub
release published by the private [`smores56/resume`](https://github.com/smores56/resume)
repo (its `.github/workflows/release-pdf.yml` renders `Samuel_Mohr_CV.yaml`
with RenderCV on every push to `main` and re-publishes the `resume-pdf`
release). The PDF is served at <https://sammohr.dev/Samuel_Mohr_CV.pdf>.

### RESUME_RELEASE_TOKEN secret

The download requires read access to the private `smores56/resume` repo,
provided by a fine-grained PAT stored as the `RESUME_RELEASE_TOKEN` Actions
secret in this repo's Settings → Secrets and variables → Actions.

**Creating it (first setup):**
1. GitHub → Settings → Developer settings → Fine-grained tokens → Generate new token
2. Name: `resume-release-read`; Expiration: pick one (e.g. 90 days)
3. Resource owner: `smores56`; Repository access: *Only select repositories* → `resume`
4. Permissions → Repository permissions → **Contents: Read-only**
5. Generate; copy the token (shown once)
6. In this repo: Settings → Secrets and variables → Actions → New repository secret
   → name `RESUME_RELEASE_TOKEN`, paste the token
7. Re-run the latest deploy workflow (or push to `main`) to confirm the download step passes

**Rotating / resetting it (e.g. expired, leaked, or suspected compromise):**
1. GitHub → Settings → Developer settings → Fine-grained tokens → open
   `resume-release-read` → **Regenerate token** (or Revoke to kill it outright)
2. Copy the new token; in this repo Settings → Secrets → `RESUME_RELEASE_TOKEN`
   → Update, paste, save
3. Re-run the deploy workflow once to verify the new token works
4. If you revoked instead of regenerated, re-create the token per the setup
   steps above

Never commit the token value anywhere; it only ever lives in the GitHub
secrets store.

## Tasks

- Update dark mode theming for the Sudoku and Keyboards pages
- Consider deploying elsewhere, as SSR deployment is a little wonky
