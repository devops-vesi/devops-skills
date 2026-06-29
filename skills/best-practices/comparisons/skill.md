---
name: comparisons
description: Use when writing or reviewing comparison expressions in TypeScript or JavaScript code.
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

## Avoid type coercion issues — use `===` instead of `==`.

Using `===` (strict equality) instead of `==` (loose equality) prevents unexpected type coercion bugs. The `==` operator converts operands to the same type before comparing, which can lead to subtle and hard-to-debug errors. The `===` operator checks both value and type, making comparisons predictable and explicit.

### The Rule in Practice

```typescript
// Avoid this:
if (value == null) { }
if (count == "0") { }
if (isActive == true) { }

// Do this:
if (value === null) { }
if (count === "0") { }
if (isActive === true) { }
```

```javascript
// Avoid this:
if (value == null) { }
if (count == "0") { }
if (isActive == true) { }

// Do this:
if (value === null) { }
if (count === "0") { }
if (isActive === true) { }
```

> **Why it matters:** `==` has surprising results — for example, `0 == ""` is `true`, `null == undefined` is `true`, and `false == "0"` is `true`. These implicit conversions make code harder to reason about and are a common source of bugs.

---

## Use Optional Chaining to avoid unexpected exceptions.

The `?.` operator safely accesses deeply nested properties by short-circuiting and returning `undefined` if any part of the chain is nullish (`null` or `undefined`). This removes the need for repetitive manual null checks and prevents runtime `TypeError` crashes.

### The Rule in Practice

```typescript
// Avoid this:
const city = user.address.city; // throws if user or address is undefined

if (order && order.customer) {
    console.log(order.customer.name);
}

// Do this:
const city = user?.address?.city; // safely returns undefined

console.log(order?.customer?.name);
```

```javascript
// Avoid this:
const city = user.address.city; // throws if user or address is undefined

if (order && order.customer) {
    console.log(order.customer.name);
}

// Do this:
const city = user?.address?.city; // safely returns undefined

console.log(order?.customer?.name);
```

> **Why it matters:** Accessing a property on `null` or `undefined` throws a `TypeError` at runtime. Optional chaining makes the intent explicit and eliminates entire categories of null-related crashes.

---

## Use a null-check utility instead of inline `=== null`.

When checking for null, prefer using a dedicated utility function such as `Objects.isNull()` over inline `=== null` comparisons. This improves consistency and readability across the codebase by making null checks explicit and uniform.

### The Rule in Practice

```typescript
// Avoid this:
if (oItem[sProp] === null) {
    // handle null
}

aProp.forEach((sProp: string) => {
    if (oItem[sProp] === null) {
        // handle null
    }
});

// Do this:
if (Objects.isNull(oItem[sProp])) {
    // handle null
}

aProp.forEach((sProp: string) => {
    if (Objects.isNull(oItem[sProp])) {
        // handle null
    }
});
```

```javascript
// Avoid this:
if (oItem[sProp] === null) {
    // handle null
}

aProp.forEach((sProp) => {
    if (oItem[sProp] === null) {
        // handle null
    }
});

// Do this:
if (Objects.isNull(oItem[sProp])) {
    // handle null
}

aProp.forEach((sProp) => {
    if (Objects.isNull(oItem[sProp])) {
        // handle null
    }
});
```

> **Why it matters:** A utility function centralizes null-check logic and signals intent clearly. It also makes it easier to change or extend the null-check behavior globally without updating every call site.

---

## Simplify validation logic by using truthy checks.

Avoid verbose multi-condition checks (`!== null && !== undefined && !== ""`) when a simple truthy check communicates the same intent. JavaScript evaluates `null`, `undefined`, `""`, `0`, and `false` as falsy, so you can often replace complex conditions with a direct `if (value)` check.

### The Rule in Practice

```typescript
// Avoid this:
const value: string = oEvent.getSource().getValue();
if (value !== null && value !== undefined && value !== "") {
    this.getView().getModel("oToggleModel").setProperty("/bSaveButton", true);
} else {
    this.getView().getModel("oToggleModel").setProperty("/bSaveButton", false);
}

// Do this — truthy check is concise and covers all falsy values:
const value: string = oEvent.getSource().getValue();
if (value) {
    this.getView().getModel("oToggleModel").setProperty("/bSaveButton", true);
} else {
    this.getView().getModel("oToggleModel").setProperty("/bSaveButton", false);
}

// Or even more concisely:
const value: string = oEvent.getSource().getValue();
this.getView().getModel("oToggleModel").setProperty("/bSaveButton", !!value);
```

```javascript
// Avoid this:
const value = oEvent.getSource().getValue();
if (value !== null && value !== undefined && value !== "") {
    this.getView().getModel("oToggleModel").setProperty("/bSaveButton", true);
} else {
    this.getView().getModel("oToggleModel").setProperty("/bSaveButton", false);
}

// Do this — truthy check is concise and covers all falsy values:
const value = oEvent.getSource().getValue();
if (value) {
    this.getView().getModel("oToggleModel").setProperty("/bSaveButton", true);
} else {
    this.getView().getModel("oToggleModel").setProperty("/bSaveButton", false);
}

// Or even more concisely:
const value = oEvent.getSource().getValue();
this.getView().getModel("oToggleModel").setProperty("/bSaveButton", !!value);
```

> **Why it matters:** Verbose multi-condition checks are harder to read and easier to get wrong (e.g., forgetting to check for `undefined`). A truthy check is idiomatic, concise, and handles all falsy values at once.

---
