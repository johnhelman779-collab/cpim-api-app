---
name: create-qa-validation-plan
# Draft a QA validation plan for a ticket once development is complete.
description: Whenever the user asks to create a QA validation plan for a ticket.
---

1. Derive the ticket ID from the branch name.
2. Fetch the ticket requirements and acceptance criteria (black-box — do not reference code).
3. Draft the plan as a scratch file using the `use-scratch-folder` skill following ISO/IEC/IEEE 29119 test case format.
4. Fetch the PRs linked to the ticket to identify involved projects. For each project not yet in the workspace, add it using the `add-project` skill.
5. Inspect changed files vs existing tests and append a coverage gap section to the plan following ISO/IEC/IEEE 29119 coverage criteria (statement, branch, condition, decision).
6. Show the draft to the user for approval.
7. Once approved, post as a comment on the original ticket.
