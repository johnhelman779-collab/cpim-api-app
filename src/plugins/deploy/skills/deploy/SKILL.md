---
name: deploy
# Deploys a project to an environment, with Slack announcement.
description: Whenever deploying a project — whether user-requested or self-initiated.
---

Configure per team/workspace: the deployment-announcement Slack channel and the current user's name.

1. Before announcing, check the deployment-announcement channel for any deployment announcement for the same project and environment posted today. If one exists:
   - If it was posted by the current user and no follow-up signals it is done, skip announcing (already in control) and proceed to deploy.
   - If it was posted by someone else and no follow-up signals the environment is free (e.g. "done", "free", "finished", strikethrough cancellation), stop and inform the user that the environment is in use.
2. If no prior announcement exists for this project/env today, post one to the deployment-announcement channel using the format established by the user's previous messages in that channel:
   ``Team I'm deploying `<project>` to `<env>` on account `<account>` from branch `<branch>` ``
3. Read `package.json` in the project directory and find the script whose name matches `deploy:<env>` (e.g. `deploy:staging`). Run it using the `use-nodejs-version` skill.
