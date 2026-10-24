# Remote multi-agent development workflow

This document is the operating contract for every human and coding agent working in this repository. It is intentionally agent-neutral: the agent may run in Codex Cloud, another vendor's cloud, a remote workstation, or any environment that can work with GitHub.

The goal is simple: either developer can prompt an agent from a phone, receive an isolated web preview for a feature, test it in a browser, and merge it without overwriting another agent's work.

## System of record

- GitHub is the source of truth for code and review state.
- `main` represents approved, integrated work and deploys to the stable production web URL.
- Every feature or fix uses its own branch and pull request.
- Every pull request receives its own immutable EAS Hosting preview URL.
- EAS owns deployment credentials. Never commit tokens, passwords, `.env` files, signing files, or service-account credentials.

## Workflow map

```text
Developer A on Android -> Agent A -> feature branch A -> pull request A -> preview URL A
Developer B on iPhone  -> Agent B -> feature branch B -> pull request B -> preview URL B
                                                            |
                                               approved pull requests
                                                            |
                                                          main
                                                            |
                                                stable production URL
```

The phone only needs the agent's mobile or browser interface and a web browser. Cloud-hosted agents do not require a personal computer to remain online. Agents that remotely control a workstation require that workstation to stay awake and connected while they work.

## Instructions for every coding agent

### 1. Establish a clean starting point

1. Read `AGENTS.md` and this file completely.
2. Inspect `git status` before changing anything. Preserve unrelated user or agent changes.
3. Fetch the remote and start from the latest `main`.
4. Create a unique branch. Use this format when the surrounding system does not provide its own isolated branch or worktree:

   ```text
   agent/<agent-name>/<short-feature-name>
   ```

5. Never reuse another feature's branch. Never develop directly on `main`.

If the agent platform automatically creates an isolated branch or pull request, use that platform-provided isolation and do not create a second branch unnecessarily.

### 2. Implement one scoped change

- Keep one feature, fix, or coherent task per branch.
- Do not reformat, rename, or rewrite unrelated files.
- Use Expo Router for navigation and keep routes in `src/app/`.
- Keep shared components, hooks, services, and utilities outside `src/app/`.
- Treat web as a required target. Platform-specific code must provide a web implementation or a deliberate, documented fallback.
- Use `npx expo install <package>` for Expo and React Native dependencies so versions remain compatible with the installed Expo SDK.
- Do not add secrets to client code. Any value embedded in a web bundle is public, including values prefixed with `EXPO_PUBLIC_`.

### 3. Validate before review

Run all of the following from the repository root:

```bash
npm run lint
npm run typecheck
npm run export:web
```

Fix failures caused by the branch. If a failure is demonstrably pre-existing, report it explicitly rather than hiding it. The EAS pull-request workflow repeats these checks and will not deploy a preview if validation fails.

### 4. Publish the feature for testing

1. Review the diff and remove debugging code, accidental files, and secrets.
2. Commit with a concise message describing the feature.
3. Push the feature branch.
4. Open a pull request into `main` with:
   - what changed;
   - how it was validated;
   - testing instructions;
   - known limitations or follow-up work.
5. Wait for `.eas/workflows/pr-preview.yml` to complete.
6. Find the EAS bot's pull-request comment and return its preview URL to the user.

Every new commit pushed to the pull request runs validation again and creates a new immutable preview deployment. Treat the newest successful preview comment as the current test version.

### 5. Review and merge

- Both developers may open any preview URL in Android Chrome, iPhone Safari, or a desktop browser.
- Record feedback in the pull request or send it to the agent working on that branch.
- Agents may update their own feature branch in response to feedback.
- Do not merge unless the user explicitly requests it or the surrounding automation has a separately authorized merge policy.
- After an approved pull request merges, `.eas/workflows/deploy-production.yml` validates `main` and promotes that revision to the stable production URL.

## Concurrent work and conflicts

Separate branches prevent agents from overwriting each other, but two features can still modify the same lines.

Before final review or whenever `main` has moved significantly:

1. Update the feature branch from the latest `main` using the agent platform's normal non-destructive synchronization flow.
2. Resolve conflicts by preserving the intent of both changes.
3. Rerun lint, typecheck, and web export.
4. Push the resolution to the same pull request.

Never force-push over a collaborator's branch unless that collaborator and the user explicitly authorize it. Never delete another feature branch as part of routine cleanup.

## Preview and production behavior

- Pull requests trigger `.eas/workflows/pr-preview.yml`.
- The workflow installs locked dependencies, lints, typechecks, and verifies a static Expo web export.
- Validation must pass before deployment.
- EAS Hosting creates a unique preview URL and comments it on the pull request.
- Pushes to `main` trigger `.eas/workflows/deploy-production.yml` and update the production alias only after the same validation passes.
- Feature agents must not manually promote their preview to production.

These are deployed previews, not a continuously running development server. A new commit creates a new preview. This avoids requiring either developer to keep a computer or paid cloud IDE running.

## One-time owner setup

The repository owner must complete these steps once. They require the owner's GitHub and Expo credentials and therefore must not be guessed or automated by an untrusted agent.

1. Push the repository's initial `main` branch to GitHub.
2. Create or select the team's Expo account and project.
3. From a trusted terminal, authenticate and link this repository:

   ```bash
   npx eas-cli@latest login
   npx eas-cli@latest init
   ```

   `eas init` writes the Expo project identifier into the app configuration. Commit that generated configuration change.

4. Activate EAS Hosting and reserve the preview subdomain with the first deployment:

   ```bash
   npm run export:web
   npx eas-cli@latest hosting:deploy dist
   ```

5. In the Expo dashboard, connect the EAS project to this GitHub repository. GitHub `push` and `pull_request` workflow triggers do not run until this connection exists.
6. Validate the workflow files from a trusted terminal:

   ```bash
   npx eas-cli@latest workflow:validate .eas/workflows/pr-preview.yml
   npx eas-cli@latest workflow:validate .eas/workflows/deploy-production.yml
   ```

7. Open a small test pull request. Confirm that validation passes, a preview is deployed, and the preview URL is posted as a pull-request comment.
8. In GitHub branch settings, protect `main`: require pull requests, require successful checks, prevent force pushes, and restrict direct deletion.
9. Invite each developer using their own GitHub account. Give only the repository and Expo permissions required for their role; never share personal accounts or tokens.

## Agent completion report

An agent finishing a feature should report:

```text
Branch: <branch name>
Pull request: <URL>
Preview: <latest successful preview URL>
Validation: lint / typecheck / web export
Test focus: <what the humans should verify>
Limitations: <known gaps, or "none known">
```

If the agent cannot push, open a pull request, or access the EAS/GitHub status, it should still finish and validate the local change, then state exactly which external action remains for an authorized human or agent.
