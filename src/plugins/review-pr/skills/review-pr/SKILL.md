---
name: review-pr
# Reviews all PRs associated with a Jira ticket.
description: Do code review on the PRs for a ticket.
---

1. Get the ticket key from the current branch name (e.g. `SA-3338` from `SA-3338-sms-input-validation`).
2. Search GitHub for PRs matching the ticket key — keep only results whose title contains the ticket key.
3. For each relevant repo not already present under `projects/`, add it as a git submodule (SSH) and check out the PR branch; if already present, just check out the PR branch.
4. Read the changed files in each project under `projects/` to understand the code in depth and produce a structured review.
5. Conclude with a GitHub review verdict: **Approve**, **Request changes**, or **Comment**.
