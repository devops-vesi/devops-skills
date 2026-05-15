---
name: variables
description: Use when declaring or initializing variables in TypeScript code.
when_to_use: |
  Also trigger on: "refactor this", "while you're at it", "any quick wins", "improve this a bit", "review this", or when editing existing TypeScript and an adjacent small cleanup is possible alongside the asked-for change.
---

# AI Behavior
- Always apply the rules in this skill when editing TypeScript code, even if not explicitly asked for.
- When you see a violation of any of the rules in this skill, fix it without being asked, as long as it can be done in a small change alongside the requested edit.
- If you see a violation of any of the rules in this skill that cannot be fixed in a small change, leave a comment in the code suggesting the improvement, so that it can be addressed in a future edit.
- When you fix a violation of any of the rules in this skill, also look for and fix any other violations of the rules in this skill that you see in the same code, as long as they can be fixed in small changes alongside the requested edit.
- Always prioritize fixing violations of the rules in this skill over other types of improvements, as long as they can be done in small changes alongside the requested edit.

# Rules list

## Avoid using var to declare variables. Use let and const instead.

Utilizing 'let' instead of 'var' can prevent scope-related bugs, as 'let' is block-scoped while 'var' is function-scoped, leading to better-maintained and more predictable code.

### The Rule in Practice

```typescript
// Avoid this:
function example() {
    var count = 0;
    var me = "Alice";
    for (var i = 0; i < 10; i++) {
        count += i;
    }
    console.log(count);
    console.log(me);
}

// Do this:
function example() {
    let count = 0;
    const me = "Alice";
    for (let i = 0; i < 10; i++) {
        count += i;
    }
    console.log(count);
    console.log(me);
}
```

---

## Always initialize variables when declaring them.

Initializing variables at the time of declaration can prevent unintended bugs caused by undefined values and makes the code more readable and maintainable.

### The Rule in Practice

```typescript

// Avoid this:
let count: number;      
let name: string;

// Do this:
let count: number = 0;
let name: string = "Alice";
```

---

## Use const for variables that won't be reassigned.

Using 'const' for variables that won't be reassigned can help prevent accidental changes to values, making the code more predictable and easier to debug.

### The Rule in Practice

```typescript
// Avoid this:
let pi = 3.14; // This value should not change

// Do this:
const pi = 3.14; // This value should not change
``` 

---

## Avoid hardcoding values directly in your code

Hardcoding values can make your code less flexible and harder to maintain. Instead, use constants or configuration files to store values that may need to be changed in the future. This practice can improve code readability and maintainability by centralizing the management of important values.

### The Rule in Practice

```typescript
// Avoid this:
if (user.role === 2) { ... }    
setTimeout(doSomething, 86400000); 

// Do this:
const ADMIN_ROLE = 2;
const ONE_DAY_MS = 86_400_000;
if (user.role === ADMIN_ROLE) { ... }
setTimeout(doSomething, ONE_DAY_MS);
```
