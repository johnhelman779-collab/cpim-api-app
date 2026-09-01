---
name: collect-testing-evidence
# Runs test suites, collects results, and posts evidence as a Jira comment.
description: Collect and submit testing evidence for a ticket.
---

Configure per project: the smoke-test state machine (or equivalent smoke-test entry point) to run post-deploy.

1. Identify changed projects under `projects/` and classify each one's test types (unit, integration, E2E).
2. Create a scratch file scaffolded with one section per project/test-type using the `use-scratch-folder` skill.
3. For each suite: discover the command from the project manifest, run it saving output to a per-suite log in `scratch/`, then immediately update the scratch file with the result summary and log filename. E2E: run before and after deploy; record both results.
4. Smoke test: deploy the code first (using the `deploy` skill) if not already deployed, then start an execution of the project's smoke-test state machine in the same account and region using the same AWS profile as the deploy. Poll `describe-execution` until it reaches a terminal status (`SUCCEEDED`, `FAILED`, `TIMED_OUT`, or `ABORTED`), then update the scratch file with the status and execution ARN.
5. Show the scratch file to the user for approval.
6. Once approved, post it as a comment on the Jira ticket using `addCommentToJiraIssue`.
7. Delete all scratch logs and the draft.
