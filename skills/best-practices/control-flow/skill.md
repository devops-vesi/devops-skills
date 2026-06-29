---
name: control-flow
description: Use when writing or reviewing control flow logic such as loops and conditional returns in TypeScript or JavaScript code.
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

## Apply the Return Early Pattern.

Handle edge cases, guard clauses, and error conditions at the top of a function and return immediately. This avoids deep nesting, reduces complexity, and keeps the main logic at a flat indentation level, making functions easier to read and debug.

### The Rule in Practice

```typescript
// Avoid this:
function processOrder(order: Order | null) {
    if (order) {
        if (order.isValid) {
            if (order.items.length > 0) {
                // main logic buried inside multiple levels of nesting
                sendOrder(order);
            }
        }
    }
}

// Do this:
function processOrder(order: Order | null) {
    if (!order) return;
    if (!order.isValid) return;
    if (order.items.length === 0) return;

    // main logic at the top level
    sendOrder(order);
}
```

```javascript
// Avoid this:
function processOrder(order) {
    if (order) {
        if (order.isValid) {
            if (order.items.length > 0) {
                sendOrder(order);
            }
        }
    }
}

// Do this:
function processOrder(order) {
    if (!order) return;
    if (!order.isValid) return;
    if (order.items.length === 0) return;

    sendOrder(order);
}
```

> **Why it matters:** Deep nesting makes code hard to follow and increases cognitive load. Early returns keep functions short, flat, and focused on their main purpose.

---

## Use `for...of` loops for simple iteration.

Prefer `for...of` over traditional `for` loops or `for...in` loops when iterating over arrays or iterables. It provides a cleaner syntax, avoids index management, and does not risk iterating over inherited prototype properties.

### The Rule in Practice

```typescript
const items: string[] = ["apple", "banana", "cherry"];

// Avoid this:
for (let i = 0; i < items.length; i++) {
    console.log(items[i]);
}

// Also avoid this (for...in iterates over keys, not values):
for (const i in items) {
    console.log(items[i]);
}

// Do this:
for (const item of items) {
    console.log(item);
}
```

```javascript
const items = ["apple", "banana", "cherry"];

// Avoid this:
for (let i = 0; i < items.length; i++) {
    console.log(items[i]);
}

// Do this:
for (const item of items) {
    console.log(item);
}
```

> **Why it matters:** `for...of` reads as plain English ("for each item of items"), removes error-prone index management, and works consistently across all iterables (arrays, Sets, Maps, strings).

---

## Use a JSON object instead of a switch statement to reduce complexity.

When a function branches based on a key to execute different logic, replace the `switch` statement with a plain object mapping keys to functions. This flattens the code, reduces cyclomatic complexity, and makes adding new cases trivial.

### The Rule in Practice

```javascript
// Avoid this:
function handleAction(key) {
    switch (key) {
        case "contractTeam":
            // delete contract team
            break;
        case "contact":
            // delete contact
            break;
        case "vendor":
            // delete vendor
            break;
        default:
            // default action
    }
}

// Do this:
function handleAction(key) {
    const actions = {
        "contractTeam": () => { /* delete contract team */ },
        "contact":      () => { /* delete contact */ },
        "vendor":       () => { /* delete vendor */ }
    };
    const action = actions[key];
    if (action) {
        action();
    }
}
```

> **Why it matters:** Each `case` in a `switch` increments the cyclomatic complexity of the function. A lookup object keeps complexity flat, the set of supported keys is immediately visible, and adding a new case is a one-liner.

---

## Switch statements should have at least 3 case clauses.

A `switch` statement with only 1 or 2 cases is harder to read than an equivalent `if`/`else`. Use `if`/`else` for 1–2 branches, and reserve `switch` for 3 or more distinct cases.

### The Rule in Practice

```typescript
// Avoid this — only 2 cases, use if/else instead:
function formatErrorType(sSeverity: string): string {
    switch (sSeverity) {
        case "error":
            return "Error";
        default:
            return "None";
    }
}

// Do this:
function formatErrorType(sSeverity: string): string {
    if (sSeverity === "error") {
        return "Error";
    }
    return "None";
}

// switch is appropriate when there are 3+ cases:
function formatStatus(status: string): string {
    switch (status) {
        case "active":   return "Active";
        case "inactive": return "Inactive";
        case "pending":  return "Pending";
        default:         return "Unknown";
    }
}
```

```javascript
// Avoid this — only 2 cases, use if/else instead:
function formatErrorType(sSeverity) {
    switch (sSeverity) {
        case "error":
            return "Error";
        default:
            return "None";
    }
}

// Do this:
function formatErrorType(sSeverity) {
    if (sSeverity === "error") {
        return "Error";
    }
    return "None";
}

// switch is appropriate when there are 3+ cases:
function formatStatus(status) {
    switch (status) {
        case "active":   return "Active";
        case "inactive": return "Inactive";
        case "pending":  return "Pending";
        default:         return "Unknown";
    }
}
```

> **Why it matters:** `switch` adds syntactic overhead (`break`, `default`) that outweighs its benefit for 1–2 branches. `if`/`else` is more concise and immediately readable for simple two-way decisions.

---

## Simplify conditions to improve code readability.

Avoid overly verbose conditional blocks that can be expressed more concisely. In particular, when a function returns in every branch, eliminate the `else` by returning early — the trailing `else` adds an indentation level for no benefit.

### The Rule in Practice

```typescript
// Avoid this:
function setWeekDateCounterValue(weekDateEdit: string, weekDateCounter: number): string | number {
    if (weekDateEdit === "X") {
        return "";
    } else {
        return weekDateCounter;
    }
}

// Do this:
function setWeekDateCounterValue(weekDateEdit: string, weekDateCounter: number): string | number {
    if (weekDateEdit === "X") {
        return "";
    }
    return weekDateCounter;
}
```

```javascript
// Avoid this:
function setWeekDateCounterValue(weekDateEdit, weekDateCounter) {
    if (weekDateEdit === "X") {
        return "";
    } else {
        return weekDateCounter;
    }
}

// Do this:
function setWeekDateCounterValue(weekDateEdit, weekDateCounter) {
    if (weekDateEdit === "X") {
        return "";
    }
    return weekDateCounter;
}
```

> **Why it matters:** An `else` after a `return` is redundant and forces an unnecessary indentation level. Removing it keeps the function flat and easier to scan.

---

## Refactor deeply nested conditional logic into separate functions.

When conditional logic is nested more than 2–3 levels deep, extract the inner logic into dedicated functions with clear, descriptive names. This reduces cognitive load, makes each function easier to understand in isolation, and improves testability.

### The Rule in Practice

```typescript
// Avoid this — deep nesting buries the actual logic:
function setHoursTableModel(bDataExists: boolean, aTempArray: object[], oContext: any): void {
    if (bDataExists) {
        if (aTempArray.length > 0) {
            for (let i = 0; i < 4; i++) {
                oContext.oTableData.push({ index: i });
            }
            oContext.getView().setModel(new JSONModel(oContext.oTableData), "HourModel");
        }
    }
}

// Do this — extract inner logic into a named helper:
function createHourTableModel(oContext: any): JSONModel {
    for (let i = 0; i < 4; i++) {
        oContext.oTableData.push({ index: i });
    }
    return new JSONModel(oContext.oTableData);
}

function setHoursTableModel(bDataExists: boolean, aTempArray: object[], oContext: any): void {
    const model = bDataExists
        ? new JSONModel(oContext.oTableData)
        : createHourTableModel(oContext);
    if (!bDataExists && aTempArray.length > 0) {
        oContext.oTableData.push(...aTempArray);
    }
    oContext.getView().setModel(model, "HourModel");
}
```

```javascript
// Avoid this — deep nesting buries the actual logic:
function setHoursTableModel(bDataExists, aTempArray, oContext) {
    if (bDataExists) {
        if (aTempArray.length > 0) {
            for (let i = 0; i < 4; i++) {
                oContext.oTableData.push({ index: i });
            }
            oContext.getView().setModel(new JSONModel(oContext.oTableData), "HourModel");
        }
    }
}

// Do this — extract inner logic into a named helper:
function createHourTableModel(oContext) {
    for (let i = 0; i < 4; i++) {
        oContext.oTableData.push({ index: i });
    }
    return new JSONModel(oContext.oTableData);
}

function setHoursTableModel(bDataExists, aTempArray, oContext) {
    const model = bDataExists
        ? new JSONModel(oContext.oTableData)
        : createHourTableModel(oContext);
    if (!bDataExists && aTempArray.length > 0) {
        oContext.oTableData.push(...aTempArray);
    }
    oContext.getView().setModel(model, "HourModel");
}
```

> **Why it matters:** Deeply nested code forces readers to track multiple levels of context simultaneously. Extracting inner logic into named functions reduces nesting, makes each piece independently readable, and enables targeted unit testing.

---

## Refactor redundant condition checks with logical operators.

Replace verbose `if`/`else` blocks that simply assign or return one of two values with a concise logical operator expression (`||`, `&&`, `??`). This reduces noise and expresses the intent more directly.

### The Rule in Practice

```typescript
// Avoid this:
function displayStartTime(startTime: string): string {
    let duration = "";
    if (startTime !== "") {
        duration = startTime;
    }
    return duration;
}

// Do this:
function displayStartTime(startTime: string): string {
    return startTime || "";
}
```

```typescript
// Avoid this:
let label: string;
if (user.name) {
    label = user.name;
} else {
    label = "Anonymous";
}

// Do this:
const label: string = user.name || "Anonymous";
```

```javascript
// Avoid this:
function displayStartTime(startTime) {
    let duration = "";
    if (startTime !== "") {
        duration = startTime;
    }
    return duration;
}

// Do this:
function displayStartTime(startTime) {
    return startTime || "";
}
```

```javascript
// Avoid this:
let label;
if (user.name) {
    label = user.name;
} else {
    label = "Anonymous";
}

// Do this:
const label = user.name || "Anonymous";
```

> **Why it matters:** Logical operators (`||`, `??`) are idiomatic JavaScript for default-value patterns. They express the same logic in a single line, eliminating the temporary variable and the branching overhead.

---

## Use arrow functions instead of capturing context in a variable.

Avoid storing `this` in a variable (e.g., `var that = this`) to pass context into callbacks. Instead, use arrow functions, which lexically capture `this` from the surrounding scope. This is cleaner, less error-prone, and is the modern JavaScript/TypeScript standard.

### The Rule in Practice

```typescript
// Avoid this — capturing this in a variable:
const that = this;
oModel.read("/EntitySet", {
    success: function () {
        that.getView()!.getModel("viewModel")!.setProperty("/loaded", true);
    }
});

// Do this — use an arrow function:
oModel.read("/EntitySet", {
    success: () => {
        this.getView()!.getModel("viewModel")!.setProperty("/loaded", true);
    }
});
```

```javascript
// Avoid this:
let that = this;
oModel.read("/EntitySet", {
    success: function () {
        that.getView().getModel("viewModel").setProperty("/loaded", true);
    }
});

// Also avoid this:
var self = this;
setTimeout(function () {
    self.refresh();
}, 1000);

// Do this — use arrow functions:
oModel.read("/EntitySet", {
    success: () => {
        this.getView().getModel("viewModel").setProperty("/loaded", true);
    }
});

setTimeout(() => {
    this.refresh();
}, 1000);
```

> **Why it matters:** Variables like `that`, `self`, or `_this` are workarounds for a limitation that arrow functions solve natively. They add noise, create an extra variable to track, and can be confused with other identifiers. Arrow functions make the intent clear and eliminate the workaround entirely.

---

## Initialize loop control variables outside the loop.

When using a `for` loop whose boundary depends on a computed value (e.g., an array's `length`), compute and store that value in a variable before the loop starts. This avoids re-evaluating the same expression on every iteration.

### The Rule in Practice

```typescript
// Avoid this — .length is accessed on every iteration:
const aItems: number[] = [1, 2, 3, 4, 5];
for (let i = 0; i < aItems.length; i++) {
    console.log(aItems[i]);
}

// Do this — compute the boundary once before the loop:
const aItems: number[] = [1, 2, 3, 4, 5];
const iLength = aItems.length;
for (let i = 0; i < iLength; i++) {
    console.log(aItems[i]);
}
```

```javascript
// Avoid this:
let aArray = [1, 2, 3, 4, 5];
for (let i = 0; i < aArray.length; i++) {
    console.log(aArray[i]);
}

// Do this:
let aArray = [1, 2, 3, 4, 5];
let iLength = aArray.length;
for (let i = 0; i < iLength; i++) {
    console.log(aArray[i]);
}
```

> **Why it matters:** Accessing `.length` (or any computed boundary) on every iteration re-evaluates the expression unnecessarily. Hoisting it to a variable makes the loop boundary explicit and avoids redundant property lookups, especially in tight loops over large arrays.

---
