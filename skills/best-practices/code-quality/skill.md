---
name: code-quality
description: Use when reviewing code for duplication, DRY violations, or general maintainability improvements in TypeScript or JavaScript.
when_to_use: |
  Also trigger on: "refactor this", "while you're at it", "any quick wins", "improve this a bit", "review this", or when editing existing TypeScript or JavaScript code that contains duplicated logic or repeated patterns.
---

# AI Behavior
- Always apply the rules in this skill when editing TypeScript or JavaScript code, even if not explicitly asked for.
- When you see a violation of any of the rules in this skill, fix it without being asked, as long as it can be done in a small change alongside the requested edit.
- If you see a violation of any of the rules in this skill that cannot be fixed in a small change, leave a comment in the code suggesting the improvement, so that it can be addressed in a future edit.
- When you fix a violation of any of the rules in this skill, also look for and fix any other violations of the rules in this skill that you see in the same code, as long as they can be fixed in small changes alongside the requested edit.
- Always prioritize fixing violations of the rules in this skill over other types of improvements, as long as they can be done in small changes alongside the requested edit.

# Rules list

## Avoid duplicating functions with the same logic.

If two or more functions perform the exact same operation, merge them into a single reusable function. Duplicated logic multiplies the maintenance burden: every change, bug fix, or refactor must be applied to each copy, making it easy to introduce inconsistencies.

### The Rule in Practice

```typescript
// Avoid this — two functions doing the exact same thing:
function displayStartTime(startTime: string): string {
    let duration = "";
    if (startTime !== "") {
        duration = startTime;
    }
    return duration;
}

function displayEndTime(endTime: string): string {
    let duration = "";
    if (endTime !== "") {
        duration = endTime;
    }
    return duration;
}

// Do this — one reusable function:
function displayTime(time: string): string {
    return time || "";
}
```

```javascript
// Avoid this — two functions doing the exact same thing:
function displayStartTime(startTime) {
    let duration = "";
    if (startTime !== "") {
        duration = startTime;
    }
    return duration;
}

function displayEndTime(endTime) {
    let duration = "";
    if (endTime !== "") {
        duration = endTime;
    }
    return duration;
}

// Do this — one reusable function:
function displayTime(time) {
    return time || "";
}
```

> **Why it matters:** Duplicated code violates the DRY (Don't Repeat Yourself) principle. Every duplicated function is a future maintenance trap: bug fixes, behaviour changes, and refactors must all be applied in multiple places, increasing the risk of divergence and bugs.

---

## Extract long methods into smaller, focused ones.

When a method is excessively long, performs multiple unrelated tasks, or contains a repeated block of code, extract the distinct responsibilities into separate, well-named methods. Each method should have a single, clear purpose.

### The Rule in Practice

```typescript
// Avoid this — one method doing too much:
onSave(): void {
    this.getView()!.setBusy(true);
    const oModel = this.getView()!.getModel() as ODataModel;
    oModel.submitChanges({
        success: (data: object) => {
            MessageToast.show("Saved successfully");
            this.getView()!.setBusy(false);
            (this.getView()!.getModel("viewModel") as JSONModel).setProperty("/editMode", false);
            Log.info("Save successful", JSON.stringify(data));
        },
        error: (error: Error) => {
            this.getView()!.setBusy(false);
            MessageBox.error("Save failed: " + error.message);
        }
    });
}

// Do this — extract callbacks into dedicated methods:
onSave(): void {
    this.getView()!.setBusy(true);
    (this.getView()!.getModel() as ODataModel).submitChanges({
        success: this._onSaveSuccess.bind(this),
        error:   this._onSaveError.bind(this)
    });
}

_onSaveSuccess(data: object): void {
    this.getView()!.setBusy(false);
    MessageToast.show("Saved successfully");
    (this.getView()!.getModel("viewModel") as JSONModel).setProperty("/editMode", false);
    Log.info("Save successful", JSON.stringify(data));
}

_onSaveError(error: Error): void {
    this.getView()!.setBusy(false);
    MessageBox.error("Save failed: " + error.message);
}
```

```javascript
// Avoid this — one method doing too much:
onSave: function () {
    this.getView().setBusy(true);
    this.getView().getModel().submitChanges({
        success: function (data) {
            MessageToast.show("Saved successfully");
            this.getView().setBusy(false);
            this.getView().getModel("viewModel").setProperty("/editMode", false);
        }.bind(this),
        error: function (error) {
            this.getView().setBusy(false);
            MessageBox.error("Save failed: " + error.message);
        }.bind(this)
    });
},

// Do this — extract callbacks into dedicated methods:
onSave: function () {
    this.getView().setBusy(true);
    this.getView().getModel().submitChanges({
        success: this._onSaveSuccess.bind(this),
        error:   this._onSaveError.bind(this)
    });
},

_onSaveSuccess: function (data) {
    this.getView().setBusy(false);
    MessageToast.show("Saved successfully");
    this.getView().getModel("viewModel").setProperty("/editMode", false);
},

_onSaveError: function (error) {
    this.getView().setBusy(false);
    MessageBox.error("Save failed: " + error.message);
},
```

> **Why it matters:** Long methods with multiple responsibilities are hard to read, test, and debug. Extracting focused methods makes each piece independently understandable and testable, and named callbacks are self-documenting.

---

## Refactor conditional blocks to eliminate duplicated logic.

When the same code appears in multiple branches of a conditional, extract the shared logic outside the branches. Only keep the parts that actually differ inside each branch.

### The Rule in Practice

```typescript
// Avoid this — the same statements appear in both branches:
function displayMessage(bFlag: boolean): void {
    if (bFlag) {
        console.log("Hello, World with extra info");
        console.log("Exiting function");
    } else {
        console.log("Hello, World");
        console.log("Exiting function");
    }
}

// Do this — move shared logic outside the branch:
function displayMessage(bFlag: boolean): void {
    const msg = bFlag ? "Hello, World with extra info" : "Hello, World";
    console.log(msg);
    console.log("Exiting function");
}
```

```javascript
// Avoid this:
function displayMessage(bFlag) {
    if (bFlag) {
        console.log("Hello, World with extra info");
        console.log("Exiting function");
    } else {
        console.log("Hello, World");
        console.log("Exiting function");
    }
}

// Do this:
function displayMessage(bFlag) {
    const msg = bFlag ? "Hello, World with extra info" : "Hello, World";
    console.log(msg);
    console.log("Exiting function");
}
```

> **Why it matters:** Duplicated statements across branches mean any change must be made in multiple places. Extracting shared logic to a single location ensures consistency and makes future modifications easier.

---

## Avoid returning objects with nested functions and complex logic in the return statement.

Do not embed function definitions or complex logic directly inside a `return` statement. Instead, assign intermediate values and extract functions to named variables or methods before the return, so the returned structure is a clean, readable object or value.

### The Rule in Practice

```typescript
// Avoid this — inline function defined inside the return statement:
function getRawDecoder(): object {
    return {
        key: "raw",
        text: "RAW",
        decoder: function (result: { text: string } | null): string {
            return result ? result.text : "";
        }
    };
}

// Do this — extract the function before the return:
function getRawDecoder(): object {
    const decode = (result: { text: string } | null): string =>
        result ? result.text : "";
    return {
        key: "raw",
        text: "RAW",
        decoder: decode
    };
}
```

```javascript
// Avoid this:
function getRawDecoder() {
    return {
        key: "raw",
        text: "RAW",
        decoder: function (result) {
            return result ? result.text : "";
        }
    };
}

// Do this:
function getRawDecoder() {
    const decode = (result) => result ? result.text : "";
    return {
        key: "raw",
        text: "RAW",
        decoder: decode
    };
}
```

> **Why it matters:** Inline functions inside return statements mix structure with behaviour, making both harder to read and impossible to reference or test independently. Extracting them gives each piece a name and a single responsibility.

---

## Don't use deprecated or experimental SAPUI5 features.

Only use SAPUI5 modules, APIs, controls, and themes that are actively maintained. When a module or control is deprecated, replace it with the recommended successor. Check the [SAPUI5 API reference](https://sapui5.hana.ondemand.com/#/api) and the `@deprecated` JSDoc annotations for guidance.

### The Rule in Practice

```typescript
// Avoid this — sap.ui.commons is deprecated since SAPUI5 1.4:
import MessageToast from "sap/ui/commons/MessageToast";
import Button from "sap/ui/commons/Button";

// Do this — use the actively maintained sap.m equivalents:
import MessageToast from "sap/m/MessageToast";
import Button from "sap/m/Button";
```

```javascript
// Avoid this:
sap.ui.define([
    "sap/ui/commons/MessageToast",
    "sap/ui/commons/Button"
], function (MessageToast, Button) {
    // ...
});

// Do this:
sap.ui.define([
    "sap/m/MessageToast",
    "sap/m/Button"
], function (MessageToast, Button) {
    // ...
});
```

> **Why it matters:** Deprecated features may be removed in future SAPUI5 versions, causing breaking changes without notice. Experimental features are subject to API changes at any time. Using maintained features ensures long-term compatibility and access to security fixes and improvements.

---
