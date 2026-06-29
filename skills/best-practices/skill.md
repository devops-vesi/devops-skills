---
name: best-practices
description: Use when fixing, editing, changing, or working with any TypeScript or Javascript code. Applies those rules on your code to always leave it cleaner than you found it. 
when_to_use: |
  Also trigger on: "refactor this", "while you're at it", "any quick wins", "improve this a bit", "review this", or when editing existing TypeScript or Javascript and an adjacent small cleanup is possible alongside the asked-for change. 
---


# Coding best practices 

This skill encompasses a set of best practices for writing clean, maintainable, and efficient TypeScript code. It includes rules for variable declaration, naming conventions, and other coding standards that help improve code quality and readability. By following these best practices, developers can create code that is easier to understand, debug, and maintain over time.


# AI Behavior
- When working on TypeScript or JavaScript code, call fetch_skill for each skill listed below before responding.
- Always apply all loaded rules when editing TypeScript or JavaScript code, even if not explicitly asked for.
- When you see a violation of any rule that cannot be fixed in a small change, leave a comment in the code suggesting the improvement, so that it can be addressed in a future edit.
- Always prioritize fixing rule violations over other types of improvements, as long as they can be done in small changes alongside the requested edit.
- Apply all loaded rules before responding.

## Available skills

- `best-practices/naming` — Naming conventions (variables, functions, classes, interfaces)
- `best-practices/variables` — Variable declaration and initialization
- `best-practices/comparisons` — Comparison best practices (`===` vs `==`, optional chaining, and more)
- `best-practices/immutability` — Immutability best practices (avoid direct mutation of objects and arrays, and more)
- `best-practices/control-flow` — Control flow best practices (Return Early Pattern, `for...of` loops, and more)
- `best-practices/modules` — Module import best practices (load only what you need, absolute paths in `sap.ui.define`, and more)
- `best-practices/logging` — Logging best practices (avoid jQuery for error logs, and more)
- `best-practices/models` — Model-driven UI and OData path best practices (bind via model, use `createKey`, and more)
- `best-practices/accessibility` — Accessibility best practices (button tooltips, and more)
- `best-practices/events` — Event handler best practices (consolidate handlers, avoid inline DOM manipulation, and more)
- `best-practices/code-quality` — Code quality best practices (avoid duplication, extract methods, refactor conditionals, and more)
- `best-practices/storage` — Storage best practices (use localStorage/sessionStorage for transient data, and more)
- `best-practices/styling` — CSS styling best practices (SAP standard methods, CSS classes, native SAPUI5 classes, and more)
- `best-practices/ux` — UX best practices (busy indicator feedback, and more)
- `best-practices/error-handling` — Error handling best practices (try/catch, async errors, OData error callbacks)
- `best-practices/i18n` — i18n best practices (Unicode escape sequences in .properties files, and more)
