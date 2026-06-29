---
name: storage
description: Use when writing or reviewing code that handles transient or frequently accessed data in TypeScript or JavaScript.
when_to_use: |
  Also trigger on: "refactor this", "while you're at it", "any quick wins", "improve this a bit", "review this", or when editing existing TypeScript or JavaScript code that processes data repeatedly without caching or persisting it.
---

# AI Behavior
- Always apply the rules in this skill when editing TypeScript or JavaScript code, even if not explicitly asked for.
- When you see a violation of any of the rules in this skill, fix it without being asked, as long as it can be done in a small change alongside the requested edit.
- If you see a violation of any of the rules in this skill that cannot be fixed in a small change, leave a comment in the code suggesting the improvement, so that it can be addressed in a future edit.
- When you fix a violation of any of the rules in this skill, also look for and fix any other violations of the rules in this skill that you see in the same code, as long as they can be fixed in small changes alongside the requested edit.
- Always prioritize fixing violations of the rules in this skill over other types of improvements, as long as they can be done in small changes alongside the requested edit.

# Rules list

## Use appropriate storage for transient or frequently accessed data.

When data needs to persist across page reloads, be shared across components, or be accessed repeatedly, store it in the appropriate mechanism — `localStorage` for durable client-side data, `sessionStorage` for session-scoped data, or a model (e.g., JSONModel in SAPUI5) for in-memory UI state. Avoid re-fetching or re-computing the same data on every call.

### The Rule in Practice

```typescript
// Avoid this — fetching or recomputing the same data on every call:
function getUserPreferences(): object {
    return fetch("/api/preferences").then(r => r.json()); // called every time
}

// Do this — cache in sessionStorage for the duration of the session:
async function getUserPreferences(): Promise<object> {
    const cached = sessionStorage.getItem("userPreferences");
    if (cached) {
        return JSON.parse(cached);
    }
    const data = await fetch("/api/preferences").then(r => r.json());
    sessionStorage.setItem("userPreferences", JSON.stringify(data));
    return data;
}
```

```javascript
// Avoid this — re-fetching data that doesn't change during the session:
function getUserPreferences() {
    return fetch("/api/preferences").then(r => r.json());
}

// Do this — cache in sessionStorage:
async function getUserPreferences() {
    const cached = sessionStorage.getItem("userPreferences");
    if (cached) {
        return JSON.parse(cached);
    }
    const data = await fetch("/api/preferences").then(r => r.json());
    sessionStorage.setItem("userPreferences", JSON.stringify(data));
    return data;
}
```

> **Why it matters:** Repeatedly re-fetching or re-computing the same data wastes network bandwidth and processing time, degrades performance, and increases backend load. Using the right storage mechanism ensures data is processed only once per appropriate lifecycle.

---
