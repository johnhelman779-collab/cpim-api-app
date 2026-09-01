# collect-testing-evidence

Runs test suites, collects results, and posts evidence as a Jira comment.

## Skills

- `collect-testing-evidence` — runs each changed project's test suites, logs results to `scratch/`, runs a post-deploy smoke test, and posts the approved evidence summary as a Jira comment.

## Configuration

The smoke-test entry point (e.g. an AWS Step Functions state machine name) is project-specific — configure it per project rather than hardcoding one across the marketplace.
