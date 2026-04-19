# GitHub Actions Instructions

- `.github/workflows/deploy.yml` deploys changes from `main`.
- Be careful with workflow changes because `main` deploys through GitHub Actions.
- Do not print secrets, tokens, or private environment values in logs.
- CI should run lint, type-check, unit tests, and build before deploy.
- For workflow changes, verify locally that referenced npm scripts pass when possible.
