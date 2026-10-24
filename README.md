# HackTX 2026

Clean React Native starter built with Expo, TypeScript, and Expo Router.

## Development

```bash
npm install
npm start
```

From the Expo terminal, open the app on Android, iOS, or the web. You can also run:

```bash
npm run android
npm run ios
npm run web
```

Create a production-style static web bundle with:

```bash
npm run export:web
```

## Remote agent workflow

This repository supports multiple developers prompting different cloud or remote coding agents from Android, iPhone, or a browser. Each feature is developed in a separate branch and pull request. EAS Workflows validates every pull request, deploys a unique web preview, and posts the preview URL to the pull request. Merges to `main` update the stable production website.

Every coding agent must read [docs/REMOTE_AGENT_WORKFLOW.md](docs/REMOTE_AGENT_WORKFLOW.md) and the repository's [AGENTS.md](AGENTS.md) before changing code.

The repository owner must complete the one-time Expo and GitHub connection described in [docs/REMOTE_AGENT_WORKFLOW.md](docs/REMOTE_AGENT_WORKFLOW.md#one-time-owner-setup) before automated previews can run.

## Project structure

- `src/app/` contains file-based routes.
- `assets/` contains static app assets.
- `app.json` contains Expo configuration.
- `.eas/workflows/` contains pull-request preview and production web deployments.
- `docs/REMOTE_AGENT_WORKFLOW.md` contains the shared workflow for humans and coding agents.

No product features or architecture decisions have been added yet.
