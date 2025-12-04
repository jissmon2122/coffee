# Deploying this project

This project builds a static client into `dist/public` and bundles a server into `dist/index.cjs`.

Steps I ran locally to produce the `dist` folder:

```powershell
npm ci
npm run build
```

Deployment options

- GitHub Pages (static client only):
  - The workflow `.github/workflows/deploy.yml` builds the project and deploys the `dist/public` folder to the `gh-pages` branch.
  - You must have this repository created on GitHub and push this repo there for Actions to run.
  - After the workflow finishes, enable GitHub Pages in the repository settings (source: `gh-pages` branch).

- Self-hosted or server deployment:
  - The server bundle is `dist/index.cjs` (CommonJS). Deploy that to a Node host or serverless platform that supports Node.js.

Notes and troubleshooting

- If you don't have `gh` installed, you can create the repo via the GitHub web UI and push.
- If `npm run build` fails on CI due to large assets, consider optimizing images or hosting them externally.
