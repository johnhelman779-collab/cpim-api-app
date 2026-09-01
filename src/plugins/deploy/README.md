# deploy

Deploys a project to an environment, with a Slack announcement to coordinate shared environments.

## Skills

- `deploy` — checks for a same-day deployment announcement in the team's Slack channel, posts one if needed, and runs the project's `deploy:<env>` npm script.

## Configuration

The Slack channel to announce in and the current user's name are workspace-specific — the skill assumes these are established from context (e.g. the user's own prior messages in the channel) rather than hardcoded.
