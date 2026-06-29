---
name: variables
description: Use when declaring or initializing variables in TypeScript or JavaScript code.
when_to_use: |
  Also trigger on: "refactor this", "while you're at it", "any quick wins", "improve this a bit", "review this", or when editing existing TypeScript or JavaScript and an adjacent small cleanup is possible alongside the asked-for change.
---

# AI Behavior
- Always apply the rules in this skill when editing TypeScript or JavaScript code, even if not explicitly asked for.
- When you see a violation of any of the rules in this skill, fix it without being asked, as long as it can be done in a small change alongside the requested edit.
- If you see a violation of any of the rules in this skill that cannot be fixed in a small change, leave a comment in the code suggesting the improvement, so that it can be addressed in a future edit.
- When you fix a violation of any of the rules in this skill, also look for and fix any other violations of the rules in this skill that you see in the same code, as long as they can be fixed in small changes alongside the requested edit.
- Always prioritize fixing violations of the rules in this skill over other types of improvements, as long as they can be done in small changes alongside the requested edit.

# Rules list

## Avoid using var to declare variables. Use let and const instead.

Utilizing `let` instead of `var` can prevent scope-related bugs, as `let` is block-scoped while `var` is function-scoped, leading to better-maintained and more predictable code.

### The Rule in Practice

```typescript
// Avoid this:
function example() {
    var count = 0;
    var me = "Alice";
    for (var i = 0; i < 10; i++) {
        count += i;
    }
}

// Do this:
function example() {
    let count = 0;
    const me = "Alice";
    for (let i = 0; i < 10; i++) {
        count += i;
    }
}
```

```javascript
// Avoid this:
function example() {
    var count = 0;
    var me = "Alice";
    for (var i = 0; i < 10; i++) {
        count += i;
    }
}

// Do this:
function example() {
    let count = 0;
    const me = "Alice";
    for (let i = 0; i < 10; i++) {
        count += i;
    }
}
```

---

## Always initialize variables when declaring them.

Initializing variables at the time of declaration can prevent unintended bugs caused by undefined values and makes the code more readable and maintainable. When no specific value is available yet, assign the "empty equivalent" for the type: `0` for numbers, `""` for strings, `[]` for arrays, and `{}` for objects.

### The Rule in Practice

```typescript
// Avoid this:
let count: number;
let name: string;
let oData: object;
let aItems: string[];

// Do this:
let count: number = 0;
let name: string = "";
let oData: object = {};
let aItems: string[] = [];
```

```javascript
// Avoid this:
let count;
let name;
let oData;
let aItems;

// Do this:
let count = 0;
let name = "";
let oData = {};
let aItems = [];
```

---

## Use const for variables that won't be reassigned.

Using `const` for variables that won't be reassigned can help prevent accidental changes to values, making the code more predictable and easier to debug.

### The Rule in Practice

```typescript
// Avoid this:
let pi = 3.14; // This value should not change

// Do this:
const pi = 3.14;
```

```javascript
// Avoid this:
let pi = 3.14; // This value should not change

// Do this:
const pi = 3.14;
```

---

## Declare variables at the top of your function.

Declare all variables at the beginning of a function, before any executable statements. This provides a clear overview of all data used in the function and prevents confusion about initialization order and variable scope.

### The Rule in Practice

```javascript
// Avoid this:
function processData() {
    console.log("Starting process");
    let result = compute(); // declared after an executable statement
    let aItems = [];
    // ...
}

// Do this:
function processData() {
    let result;
    let aItems = [];
    console.log("Starting process");
    result = compute();
    // ...
}
```

> **Why it matters:** Scattering declarations throughout a function forces readers to scan the entire body to find all variables. Declaring at the top makes the function's data inventory immediately visible.

---

## Use conditional assignment for lazy initialization.

Use short-circuit evaluation (`||`) to conditionally initialize a variable only when it has not yet been assigned a value. This avoids repetitive `if/else` blocks and expresses lazy initialization in a single, readable line.

### The Rule in Practice

```javascript
// Avoid this:
getContentDensityClass: function () {
    if (!this._sContentDensityClass) {
        if (Device.support.touch) {
            this._sContentDensityClass = "sapUiSizeCozy";
        } else {
            this._sContentDensityClass = "sapUiSizeCompact";
        }
    }
    return this._sContentDensityClass;
}

// Do this:
getContentDensityClass: function () {
    this._sContentDensityClass = this._sContentDensityClass
        || (Device.support.touch ? "sapUiSizeCozy" : "sapUiSizeCompact");
    return this._sContentDensityClass;
}
```

> **Why it matters:** Repetitive `if/else` initialization blocks add noise and make functions harder to scan. The `||` pattern expresses the intent in a single line: "use the cached value, or compute and store it".

---

## Avoid hardcoding values directly in your code.

Hardcoding values can make your code less flexible and harder to maintain. Instead, use named constants to store values that may need to be changed in the future.

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

```javascript
// Avoid this:
if (user.role === 2) { ... }
setTimeout(doSomething, 86400000);

// Do this:
const ADMIN_ROLE = 2;
const ONE_DAY_MS = 86_400_000;
if (user.role === ADMIN_ROLE) { ... }
setTimeout(doSomething, ONE_DAY_MS);
```

---

## Avoid global variables.

Do not declare variables in the global scope. Encapsulate all variables inside functions, classes, or modules, and pass data between components through parameters or return values. Global variables introduce tight coupling, naming conflicts, and hard-to-trace side effects.

### The Rule in Practice

```typescript
// Avoid this — variables declared at module/global scope:
const status = "active";
let count = 0;

function initialize(): void {
    // implicitly depends on global status and count
}

// Do this — encapsulate inside the function:
function initialize(): void {
    const status = "active";
    let count = 0;
    // ...
}
```

```javascript
// Avoid this:
var globalValue = 10;
const status = "active";
let count = 0;

// Do this — wrap in a function or module:
function initialize() {
    const localValue = 10;
    const status = "active";
    let count = 0;
    // ...
}

initialize();
```

> **Why it matters:** Global variables can be modified from anywhere in the codebase, making it impossible to reason about when or where a value changes. Encapsulating data within functions or modules limits its scope and makes code predictable and easier to test.

---

## Use literal syntax instead of wrapper constructors.

Never use `new String()`, `new Number()`, `new Boolean()`, `new Object()`, `new Array()`, `new RegExp()`, or `new Function()` to create primitive values or simple objects. Use literal syntax instead. Wrapper constructors create objects of those types rather than primitives, which causes unexpected behaviour with equality checks and type coercion.

### The Rule in Practice

```typescript
// Avoid this — wrapper constructors:
const name   = new String("hello");
const count  = new Number(42);
const flag   = new Boolean(true);
const obj    = new Object();
const arr    = new Array();
const regex  = new RegExp("\\d+");
const fn     = new Function("a", "return a");

// Do this — literal syntax:
const name   = "hello";
const count  = 42;
const flag   = true;
const obj    = {};
const arr: unknown[] = [];
const regex  = /\d+/;
const fn     = (a: unknown): unknown => a;
```

```javascript
// Avoid this:
let name   = new String("hello");
let count  = new Number(42);
let flag   = new Boolean(true);
let obj    = new Object();
let arr    = new Array();
let regex  = new RegExp("\\d+");
let fn     = new Function("a", "return a");

// Do this:
let name   = "";
let count  = 0;
let flag   = false;
let obj    = {};
let arr    = [];
let regex  = /()/;
let fn     = function () {};
```

> **Why it matters:** `new String("hello") !== "hello"` — wrapper constructors produce objects, not primitives. This breaks strict equality checks, type guards, and `typeof` comparisons. Literal syntax is always correct, shorter, and consistent.
