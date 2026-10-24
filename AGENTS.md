This is an Expo/React Native mobile application. Prioritize mobile-first patterns, performance, and cross-platform compatibility.

## Required collaboration workflow

This repository is developed by multiple humans using different remote coding agents. GitHub is the source of truth, and every feature must be isolated in its own branch and pull request.

Before making changes, read `docs/REMOTE_AGENT_WORKFLOW.md` completely. Its rules apply to every coding agent, regardless of vendor or execution environment.

The short version:

1. Never implement a feature directly on `main`.
2. Start from the latest `main` and create a uniquely named branch such as `agent/<agent-name>/<feature-name>`.
3. Keep one feature or fix per branch. Do not modify unrelated files.
4. Run `npm run lint`, `npm run typecheck`, and `npm run export:web` before requesting review.
5. Commit and push the branch, then open a pull request into `main`.
6. EAS Workflows validates the branch, deploys a unique web preview, and comments the preview URL on the pull request.
7. Report the pull request URL, preview URL, validation results, and any known limitations to the user.
8. Do not merge the pull request unless the user explicitly asks. Do not deploy a feature branch to the production alias.

If another branch has changed the same files, update from `main`, resolve conflicts deliberately, rerun validation, and push the resolution to the same feature branch. Never overwrite another agent's work to avoid a conflict.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Commands

Use `bunx` instead of `npx` if the project uses bun (`bun.lock` present).

```bash
npx expo install <package>  # ALWAYS use instead of npm/yarn/pnpm/bun add — resolves SDK-compatible versions
npx expo start              # start the dev server
npx expo lint               # lint
npx tsc --noEmit            # typecheck
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
```

Run lint and typecheck before declaring any task done.

For any user-visible feature, also run `npm run export:web`. A feature is not ready for review if the static web export fails.

## Navigation & Routing

- Use **Expo Router** for all navigation. Routes live in `src/app/` — every file there is a screen, `_layout.tsx` files define navigators. Keep non-route code (components, hooks, utils) outside `src/app/`.
- Import `Link`, `router`, and `useLocalSearchParams` from `expo-router`.
- Docs: https://docs.expo.dev/router/introduction.md

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`) — no local Xcode or Android Studio required. Run EAS CLI as `bunx eas-cli <command>` in Bun projects, or `npx eas-cli@latest <command>` otherwise; substitute that for bare `eas` in docs examples.
Docs: https://docs.expo.dev/eas/index.md

Web previews are deployed automatically from pull requests by `.eas/workflows/pr-preview.yml`. Merges to `main` deploy the stable production URL through `.eas/workflows/deploy-production.yml`. Agents must not place Expo credentials in the repository; deployment credentials and environment values belong in EAS project settings.

## Rules

- If `ios/` and `android/` directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: `npx expo run:ios|android` locally, or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md
