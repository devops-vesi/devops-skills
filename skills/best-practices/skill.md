---
name: best-practices
description: Use when fixing, editing, changing, or working with any TypeScript or Javascript code. Applies those rules on your code to always leave it cleaner than you found it. 
when_to_use: |
  Also trigger on: "refactor this", "while you're at it", "any quick wins", "improve this a bit", "review this", or when editing existing TypeScript or Javascript and an adjacent small cleanup is possible alongside the asked-for change. 
---


# Coding best practices 

This skill encompasses a set of best practices for writing clean, maintainable, and efficient TypeScript code. It includes rules for variable declaration, naming conventions, and other coding standards that help improve code quality and readability. By following these best practices, developers can create code that is easier to understand, debug, and maintain over time.


# AI Behavior
- Always apply the rules in the path corresponding to the language when editing TypeScript and Javascript code, even if not explicitly asked for.
- When the user ask for a refactor, an improvement, a review, or any change on existing TypeScript or Javascript code, look for any possible small cleanup that can be done alongside the asked-for change and apply the rules in the path corresponding to the language to fix them without being asked.
- If you see a violation of any of the rules in the path corresponding to the language that cannot be fixed in a small change, leave a comment in the code suggesting the improvement, so that it can be addressed in a future edit.
- When you fix a violation of any of the rules in the path corresponding to the language, also look for and fix any other violations of the rules in the same path that you see in the same code, as long as they can be fixed in small changes alongside the requested edit.
- Always prioritize fixing violations of the rules in the path corresponding to the language over other types of improvements, as long as they can be done in small changes alongside the requested edit.
- When working on TypeScript code, call fetch_skill for each skill under `best-practices/typescript/`
- When working on JavaScript code, call fetch_skill for each skill under `best-practices/javascript/`
- Apply all loaded rules before responding

## Available skills by language

### TypeScript
- [Naming conventions](./typescript/naming/skill.md)
- [Variable declaration and initialization](./typescript/variables/skill.md)

### JavaScript
- [Naming conventions](./javascript/naming/skill.md)
- [Variable declaration and initialization](./javascript/variables/skill.md)
