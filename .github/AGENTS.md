# GitHub Actions Instructions

- `.github/workflows/deploy.yml` deploys changes from `main`.
- The bot Docker image is built in GitHub Actions and pushed to GHCR.
- Deployment should pull `URANABOT_IMAGE` with Docker Compose; do not build the bot image on the VPS.
- The deploy job should sync only deployment files such as `docker-compose.yml`, `Caddyfile`, and generated `.env`.
- Be careful with workflow changes because `main` deploys through GitHub Actions.
- Do not print secrets, tokens, or private environment values in logs.
- CI should run lint, type-check, unit tests, and build before deploy.
- For workflow changes, verify locally that referenced npm scripts pass when possible.
- After workflow or deployment changes are merged to `main`, verify the GitHub Actions run on `main`, including deploy and health-check jobs.
