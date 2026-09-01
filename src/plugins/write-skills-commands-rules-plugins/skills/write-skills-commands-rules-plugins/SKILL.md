---
name: write-skills-commands-rules-plugins
# Conventions for authoring skills, commands, rules, and plugin files.
description: Use when creating or editing a skill, command, rule, or plugin file.
---

## General — applies to any instruction file (skill, command, rule, plugin)

- Use YAML comments in frontmatter for human-readable documentation.
- The comment should describe the file's purpose, not restate its content.
- Only add a statement when the agent needed steering.
- Couple to decisions, not implementation details, so they don't rot.
- Use ordered lists for sequential steps, unordered otherwise.
- Keep files token-efficient.

## Skills specifically

- Name skills as imperative verb phrases (e.g. `commit`, `create-pr`, `simplify`).
- Use kebab-case, lowercase letters, numbers, and hyphens only (max 64 characters).
- Use the `#` frontmatter comment for a human-readable description of what the skill does.
- Use the `description` frontmatter field for the trigger condition only.

## Commands and plugins specifically

- Name command files and plugins in lowercase, hyphen-separated form (e.g. `my-command.md`, `my-plugin`).
