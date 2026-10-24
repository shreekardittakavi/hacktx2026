# Repository instructions

Before changing this repository, read `AGENTS.md` and `docs/REMOTE_AGENT_WORKFLOW.md` completely. Those files are authoritative.

In particular: never implement a feature directly on `main`; use one isolated branch and pull request per feature; run lint, typecheck, and the static web export; and return the pull request plus the newest successful EAS web preview URL. Do not merge or promote a preview to production without explicit user authorization.
