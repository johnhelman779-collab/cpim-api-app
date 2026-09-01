---
name: refine-ticket
# Analyses a ticket against the codebase and produces a structured refinement comment on Jira.
description: Refine a ticket.
---

1. Derive the ticket ID from the branch name.
2. Fetch the ticket and its parent (feature or epic) for full context.
3. For each project involved, if its source is not already present under `projects/`, add it as a git submodule (SSH) to investigate the codebase related to the ticket.
4. Draft the refinement notes as a scratch file using the `use-scratch-folder` skill.
5. Every story in the scope breakdown must be completable by one engineer in one working day or less, including implementation, local testing, and merge-readiness. Split any story that exceeds this.
6. Show the draft to the user for review and discussion.
7. Once approved, post the refinement notes as a comment on the Jira ticket and delete the scratch file.
