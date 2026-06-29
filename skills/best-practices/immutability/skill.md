---
name: immutability
description: Use when writing or reviewing code that manipulates objects or arrays in TypeScript or JavaScript.
when_to_use: |
  Also trigger on: "refactor this", "while you're at it", "any quick wins", "improve this a bit", "review this", or when editing existing TypeScript or JavaScript and an adjacent small cleanup is possible alongside the requested change.
---

# AI Behavior
- Always apply the rules in this skill when editing TypeScript or JavaScript code, even if not explicitly asked for.
- When you see a violation of any of the rules in this skill, fix it without being asked, as long as it can be done in a small change alongside the requested edit.
- If you see a violation of any of the rules in this skill that cannot be fixed in a small change, leave a comment in the code suggesting the improvement, so that it can be addressed in a future edit.
- When you fix a violation of any of the rules in this skill, also look for and fix any other violations of the rules in this skill that you see in the same code, as long as they can be fixed in small changes alongside the requested edit.
- Always prioritize fixing violations of the rules in this skill over other types of improvements, as long as they can be done in small changes alongside the requested edit.

# Rules list

## Avoid modifying objects and arrays directly.

Mutating objects and arrays in place can cause unpredictable side effects, especially when the same reference is shared across multiple parts of the code. Prefer creating new copies using spread syntax, `Object.assign`, `Array.prototype.map`, `filter`, `concat`, or `slice` to keep data transformations explicit and predictable.

### The Rule in Practice

```typescript
// Avoid this:
function addItem(cart: string[], item: string) {
    cart.push(item); // mutates the original array
    return cart;
}

function updateUser(user: { name: string; age: number }, age: number) {
    user.age = age; // mutates the original object
    return user;
}

// Do this:
function addItem(cart: string[], item: string): string[] {
    return [...cart, item]; // returns a new array
}

function updateUser(user: { name: string; age: number }, age: number) {
    return { ...user, age }; // returns a new object
}
```

```javascript
// Avoid this:
function addItem(cart, item) {
    cart.push(item); // mutates the original array
    return cart;
}

function updateUser(user, age) {
    user.age = age; // mutates the original object
    return user;
}

// Do this:
function addItem(cart, item) {
    return [...cart, item]; // returns a new array
}

function updateUser(user, age) {
    return { ...user, age }; // returns a new object
}
```

> **Why it matters:** Direct mutations make code harder to trace and test, can introduce subtle bugs when references are shared, and conflict with patterns like React state management or Redux that rely on immutability to detect changes.

---
