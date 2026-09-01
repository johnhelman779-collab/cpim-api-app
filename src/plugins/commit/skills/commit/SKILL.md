---
name: commit
# Commit message format and rules.
# User takes full responsibility for the change.
description: Whenever committing, saving, or pushing changes — whether user-requested or self-initiated.
allowed-tools: Bash(git add *), Bash(git commit *)
---

- One logical change per commit.
- No `Co-Authored-By` trailer.
- Submodule commit → also commit its pointer in the parent repo.
