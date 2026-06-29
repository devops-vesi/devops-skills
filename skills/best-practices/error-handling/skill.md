---
name: error-handling
description: Use when writing or reviewing TypeScript or JavaScript code that performs asynchronous operations, API calls, or other potentially failing operations.
when_to_use: |
  Also trigger on: "refactor this", "while you're at it", "any quick wins", "improve this a bit", "review this", or when editing TypeScript or JavaScript code that uses fetch, async/await, promises, OData model calls, or any operation that could fail.
---

# AI Behavior
- Always apply the rules in this skill when editing TypeScript or JavaScript code, even if not explicitly asked for.
- When you see a violation of any of the rules in this skill, fix it without being asked, as long as it can be done in a small change alongside the requested edit.
- If you see a violation of any of the rules in this skill that cannot be fixed in a small change, leave a comment in the code suggesting the improvement, so that it can be addressed in a future edit.
- When you fix a violation of any of the rules in this skill, also look for and fix any other violations of the rules in this skill that you see in the same code, as long as they can be fixed in small changes alongside the requested edit.
- Always prioritize fixing violations of the rules in this skill over other types of improvements, as long as they can be done in small changes alongside the requested edit.

# Rules list

## Implement error handling for every asynchronous operation.

Every async operation — whether using `async/await`, promise chains, or callback-based APIs (e.g., OData model calls) — must have error handling. Use `try/catch` for `async/await`, `.catch()` for promise chains, and an `error` callback for OData methods. Always provide meaningful feedback to the user, not just a silent failure.

### The Rule in Practice

```typescript
// Avoid this — async/await with no error handling:
async function fetchData(): Promise<void> {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    console.log(data);
}

// Also avoid this — promise chain without .catch():
fetch("https://api.example.com/data")
    .then(response => response.json())
    .then(data => console.log(data));

// Do this — wrap async/await in try/catch:
async function fetchData(): Promise<void> {
    try {
        const response = await fetch("https://api.example.com/data");
        const data = await response.json();
        console.log(data);
    } catch (error) {
        Log.error("Error fetching data", String(error));
        MessageBox.error("Failed to load data. Please try again.");
    }
}

// Do this — add .catch() to promise chains:
fetch("https://api.example.com/data")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => {
        Log.error("Error fetching data", String(error));
        MessageBox.error("Failed to load data. Please try again.");
    });

// Do this — always provide an error callback in OData calls:
(this.getView()!.getModel() as ODataModel).read("/EntitySet", {
    success: (data: object) => {
        // handle data
    },
    error: (error: Error) => {
        Log.error("OData read failed", error.message);
        MessageBox.error("Failed to load data. Please try again.");
    }
});
```

```javascript
// Avoid this — no error handling:
async function fetchData() {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    console.log(data);
}

// Do this — try/catch for async/await:
async function fetchData() {
    try {
        const response = await fetch("https://api.example.com/data");
        const data = await response.json();
        console.log(data);
    } catch (error) {
        Log.error("Error fetching data", String(error));
        MessageBox.error("Failed to load data. Please try again.");
    }
}

// Do this — error callback for OData calls:
this.getView().getModel().read("/EntitySet", {
    success: (data) => {
        // handle data
    },
    error: (error) => {
        Log.error("OData read failed", error.message);
        MessageBox.error("Failed to load data. Please try again.");
    }
});
```

> **Why it matters:** Unhandled async errors cause silent failures that are impossible to debug. Users receive no feedback, data may be in an inconsistent state, and the root cause is lost. Explicit error handling ensures failures are visible, logged, and communicated.

---
