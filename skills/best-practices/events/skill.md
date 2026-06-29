---
name: events
description: Use when writing or reviewing event handlers in TypeScript or JavaScript code.
when_to_use: |
  Also trigger on: "refactor this", "while you're at it", "any quick wins", "improve this a bit", "review this", or when editing existing TypeScript or JavaScript code that contains event handlers or event listeners.
---

# AI Behavior
- Always apply the rules in this skill when editing TypeScript or JavaScript code, even if not explicitly asked for.
- When you see a violation of any of the rules in this skill, fix it without being asked, as long as it can be done in a small change alongside the requested edit.
- If you see a violation of any of the rules in this skill that cannot be fixed in a small change, leave a comment in the code suggesting the improvement, so that it can be addressed in a future edit.
- When you fix a violation of any of the rules in this skill, also look for and fix any other violations of the rules in this skill that you see in the same code, as long as they can be fixed in small changes alongside the requested edit.
- Always prioritize fixing violations of the rules in this skill over other types of improvements, as long as they can be done in small changes alongside the requested edit.

# Rules list  

## Avoid manipulating DOM elements directly in event handlers.

DOM manipulation logic should not be placed directly inside event handler callbacks. Instead, extract it into dedicated functions with clear names. This reduces coupling between the event-handling logic and the rendering logic, making code easier to test and maintain.

### The Rule in Practice

```typescript
// Avoid this:
document.getElementById("myButton")!.addEventListener("click", () => {
    (document.getElementById("myDiv") as HTMLElement).style.display = "none";
    (document.getElementById("myTitle") as HTMLElement).innerHTML = "Updated";
});

// Do this — extract DOM manipulation into a dedicated function:
function hideContent(): void {
    (document.getElementById("myDiv") as HTMLElement).style.display = "none";
    (document.getElementById("myTitle") as HTMLElement).innerHTML = "Updated";
}

document.getElementById("myButton")!.addEventListener("click", hideContent);
```

```javascript
// Avoid this:
document.getElementById("myButton").addEventListener("click", function () {
    document.getElementById("myDiv").style.display = "none";
    document.getElementById("myTitle").innerHTML = "Updated";
});

// Do this — extract DOM manipulation into a dedicated function:
function hideContent() {
    document.getElementById("myDiv").style.display = "none";
    document.getElementById("myTitle").innerHTML = "Updated";
}

document.getElementById("myButton").addEventListener("click", hideContent);
```

> **Why it matters:** Inlining DOM manipulation inside event handlers creates tightly coupled code that is hard to reuse, test, and maintain. Extracting it into named functions also makes the event handler self-documenting.

---

## Consolidate event handlers into dedicated methods.

Avoid writing event handler logic inline inside another method or as an anonymous function passed directly to an event subscription. Extract the logic into a separate named method and bind the context appropriately. This improves modularity, readability, and testability.

### The Rule in Practice

```typescript
// Avoid this — inline anonymous handler with logic:
import Device from "sap/ui/Device";
import JSONModel from "sap/ui/model/json/JSONModel";

Device.resize.attachHandler(function (this: MyController, mParams: { width: number }) {
    if (mParams.width > 425) {
        (this.getView()!.getModel("timeCreateView") as JSONModel).setProperty("/columnNumber", 2);
    } else {
        (this.getView()!.getModel("timeCreateView") as JSONModel).setProperty("/columnNumber", 1);
    }
}.bind(this));

// Do this — extract into a dedicated named method:
Device.resize.attachHandler(this._onResize.bind(this));

_onResize(mParams: { width: number }): void {
    const columnNumber: number = mParams.width > 425 ? 2 : 1;
    (this.getView()!.getModel("timeCreateView") as JSONModel).setProperty("/columnNumber", columnNumber);
}
```

```javascript
// Avoid this — inline anonymous handler with logic:
sap.ui.Device.resize.attachHandler(function (mParams) {
    if (mParams.width > 425) {
        this.getView().getModel("timeCreateView").setProperty("/columnNumber", 2);
    } else {
        this.getView().getModel("timeCreateView").setProperty("/columnNumber", 1);
    }
}.bind(this));

// Do this — extract into a dedicated named method:
sap.ui.Device.resize.attachHandler(this._onResize.bind(this));

_onResize: function (mParams) {
    const columnNumber = mParams.width > 425 ? 2 : 1;
    this.getView().getModel("timeCreateView").setProperty("/columnNumber", columnNumber);
}
```

> **Why it matters:** Inline anonymous handlers cannot be referenced elsewhere, unit tested independently, or detached later. Named methods are reusable, debuggable, and make the code easier to navigate.

---

## Use `attachPatternMatched` instead of putting routing logic in `onInit`.

In SAPUI5, `onInit` is called once when the controller is instantiated. Routing-dependent logic — such as loading data based on URL parameters — should be placed in a handler attached via `attachPatternMatched`, which fires each time the route is navigated to. Keep `onInit` focused on one-time initialization.

### The Rule in Practice

```typescript
// Avoid this — routing logic (data load, param extraction) in onInit:
onInit(): void {
    const sId = this.getOwnerComponent()!.getRouter()
        .getHashChanger().getHash(); // fragile URL parsing
    this._loadDetails(sId);
    this._buildTable();
}

// Do this — attach routing logic to the route's patternMatched event:
onInit(): void {
    this.getOwnerComponent()!.getRouter()
        .getRoute("details")!
        .attachPatternMatched(this._onRouteMatched, this);
}

_onRouteMatched(oEvent: Event): void {
    const sId = (oEvent.getParameter("arguments") as { id: string }).id;
    this._loadDetails(sId);
    this._buildTable();
}
```

```javascript
// Avoid this:
onInit: function () {
    this._loadDetails();
    this._buildTable();
},

// Do this:
onInit: function () {
    this.getOwnerComponent()
        .getRouter()
        .getRoute("details")
        .attachPatternMatched(this._onRouteMatched, this);
},

_onRouteMatched: function (oEvent) {
    const sId = oEvent.getParameter("arguments").id;
    this._loadDetails(sId);
    this._buildTable();
},
```

> **Why it matters:** `onInit` runs only once at controller creation. If the user navigates away and returns to the same route, `onInit` does not re-run, so data based on route parameters would be stale. `attachPatternMatched` fires on every navigation to the route, ensuring the view always reflects the current URL state.

---
