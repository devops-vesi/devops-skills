---
name: ux
description: Use when writing or reviewing SAPUI5 controller code that performs asynchronous operations affecting the user interface.
when_to_use: |
  Also trigger on: "refactor this", "while you're at it", "any quick wins", "improve this a bit", "review this", or when editing SAPUI5 controller code that calls the backend, performs long operations, or updates the UI asynchronously.
---

# AI Behavior
- Always apply the rules in this skill when editing SAPUI5 controller code, even if not explicitly asked for.
- When you see a violation of any of the rules in this skill, fix it without being asked, as long as it can be done in a small change alongside the requested edit.
- If you see a violation of any of the rules in this skill that cannot be fixed in a small change, leave a comment in the code suggesting the improvement, so that it can be addressed in a future edit.
- When you fix a violation of any of the rules in this skill, also look for and fix any other violations of the rules in this skill that you see in the same code, as long as they can be fixed in small changes alongside the requested edit.
- Always prioritize fixing violations of the rules in this skill over other types of improvements, as long as they can be done in small changes alongside the requested edit.

# Rules list

## Use the busy indicator to give users feedback during async operations.

Whenever the application performs an operation that may take time (backend call, data load, save), set the view or relevant container to busy (`setBusy(true)`) before starting and release it (`setBusy(false)`) in both the success and error callbacks. Set `setBusyIndicatorDelay(0)` to ensure the indicator appears immediately without delay.

### The Rule in Practice

```typescript
// Avoid this — no feedback to the user during the backend call:
onSave(): void {
    const oModel = this.getModel() as ODataModel;
    oModel.submitChanges({
        success: () => MessageToast.show("Saved"),
        error:   () => MessageBox.error("Failed")
    });
}

// Do this — set busy before and release in both callbacks:
onSave(): void {
    this.getView()!.setBusyIndicatorDelay(0);
    this.getView()!.setBusy(true);
    const oModel = this.getModel() as ODataModel;
    oModel.submitChanges({
        success: () => {
            this.getView()!.setBusy(false);
            MessageToast.show("Saved");
        },
        error: () => {
            this.getView()!.setBusy(false);
            MessageBox.error("Failed");
        }
    });
}
```

```javascript
// Avoid this:
onSave: function () {
    this.getModel().submitChanges({
        success: function () { MessageToast.show("Saved"); },
        error:   function () { MessageBox.error("Failed"); }
    });
},

// Do this:
onSave: function () {
    this.getView().setBusyIndicatorDelay(0);
    this.getView().setBusy(true);
    this.getModel().submitChanges({
        success: () => {
            this.getView().setBusy(false);
            MessageToast.show("Saved");
        },
        error: () => {
            this.getView().setBusy(false);
            MessageBox.error("Failed");
        }
    });
},
```

> **Why it matters:** Without a busy indicator, users have no feedback that an action is in progress and may click again, triggering duplicate requests. Setting `setBusyIndicatorDelay(0)` ensures the indicator is always visible, even for fast operations.

---
