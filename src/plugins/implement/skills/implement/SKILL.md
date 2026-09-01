---
name: implement
# TDD workflow: plan first, then red-green-refactor one test at a time.
description: Implement a feature or fix.
---

1. If working from a multi-project workspace and the project's source is not already present under `projects/`, add it as a git submodule (SSH) before continuing. Skip this step if already working directly inside the project's own clone.
2. Enter plan mode and present the full implementation plan. Each item must list its three phases explicitly: **Red** (what test to write), **Green** (what production code to write), **Refactor** (what to clean up, or "none"). Wait for approval before proceeding.
3. For each planned item in order:
   1. Red: write exactly one failing test, run the suite, confirm it fails. Never write a second test before the first one passes.
   2. Green: write the absolute minimum production code to make the failing test pass — nothing more. Do not anticipate future tests.
   3. Refactor: clean up if needed, confirm tests still pass.
- Test only through the public interface; never test private methods directly.
- Test assertion should match the test name.
- Asserting against a constant value is most of the time wrong.
- Test behavior, not data.
