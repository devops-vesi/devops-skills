---
name: models
description: Use when writing or reviewing UI bindings, model interactions, or OData path construction in SAPUI5.
when_to_use: |
  Also trigger on: "refactor this", "while you're at it", "any quick wins", "improve this a bit", "review this", or when editing SAPUI5 controller or view code that handles models, bindings, or OData paths.
---

# AI Behavior
- Always apply the rules in this skill when editing SAPUI5 controller or XML view code, even if not explicitly asked for.
- When you see a violation of any of the rules in this skill, fix it without being asked, as long as it can be done in a small change alongside the requested edit.
- If you see a violation of any of the rules in this skill that cannot be fixed in a small change, leave a comment in the code suggesting the improvement, so that it can be addressed in a future edit.
- When you fix a violation of any of the rules in this skill, also look for and fix any other violations of the rules in this skill that you see in the same code, as long as they can be fixed in small changes alongside the requested edit.
- Always prioritize fixing violations of the rules in this skill over other types of improvements, as long as they can be done in small changes alongside the requested edit.

# Rules list

## Handle UI state through a model.

Bind UI control properties (`visible`, `editable`, `enabled`, etc.) directly to model attributes in the XML view instead of retrieving and manipulating controls in the controller via `byId()`. This decouples the view from the controller, makes UI state changes declarative, and improves testability.

### The Rule in Practice

```xml
<!-- Avoid this — controlling visibility in the controller via byId(): -->
<!-- The controller calls: this.byId("editButton").setVisible(false); -->

<!-- Do this — bind directly to the model in the view: -->
<m:Button text="Edit" visible="{viewModel>/editMode}" press="onEditPress" />
<m:Input value="{/name}" editable="{viewModel>/editMode}" />
```

```javascript
// Avoid this — directly manipulating controls in the controller:
this.byId("editButton").setVisible(false);
this.byId("nameInput").setEditable(false);

// Do this — update the model attribute, let the bound view react:
this.getView().getModel("viewModel").setProperty("/editMode", false);
```

```typescript
// Avoid this — directly manipulating controls in the controller:
import Button from "sap/m/Button";
import Input from "sap/m/Input";
import JSONModel from "sap/ui/model/json/JSONModel";

(this.byId("editButton") as Button).setVisible(false);
(this.byId("nameInput") as Input).setEditable(false);

// Do this — update the model attribute, let the bound view react:
(this.getView()!.getModel("viewModel") as JSONModel).setProperty("/editMode", false);
```

> **Why it matters:** Directly manipulating controls via `byId()` creates tight coupling between controller logic and view structure. Model-driven bindings make the UI reactive and the controller agnostic of individual controls.

---

## Avoid complex paths — use `createKey` instead.

When building OData entity paths with multiple key parameters, use the model's `createKey()` method instead of manually concatenating path strings. This is more readable, less error-prone, and automatically handles URL encoding of special characters.

### The Rule in Practice

```typescript
// Avoid this — fragile manual string concatenation:
import ODataModel from "sap/ui/model/odata/v2/ODataModel";

const sPath: string = "/OrderSet(OrderId='" + sOrderId + "',CompanyCode='" + sCompanyCode + "')";
(this.getModel() as ODataModel).read(sPath, { success: onSuccess });

// Do this — use createKey for clarity and correctness:
const sPath: string = (this.getModel() as ODataModel).createKey("/OrderSet", {
    OrderId: sOrderId,
    CompanyCode: sCompanyCode
});
(this.getModel() as ODataModel).read(sPath, { success: onSuccess });
```

```javascript
// Avoid this — fragile manual string concatenation:
const sPath = "/OrderSet(OrderId='" + sOrderId + "',CompanyCode='" + sCompanyCode + "')";
this.getModel().read(sPath, { success: onSuccess });

// Do this — use createKey for clarity and correctness:
const sPath = this.getModel().createKey("/OrderSet", {
    OrderId: sOrderId,
    CompanyCode: sCompanyCode
});
this.getModel().read(sPath, { success: onSuccess });
```

> **Why it matters:** Manual path concatenation is fragile, bypasses automatic key encoding, and becomes unreadable as the number of key parameters grows. `createKey()` is explicit about the entity set and keys, and handles special characters correctly.

---

## Initialize global models in `Component.js`, not in controllers.

Models that are shared across multiple views or that represent application-wide state should be initialized in `Component.js` (or `Component.ts`). Controllers should only retrieve and use these models, not create them. This centralizes model management, improves maintainability, and keeps controller logic focused on view interaction.

### The Rule in Practice

```typescript
// Avoid this — creating a shared model inside a controller:
// webapp/controller/Home.controller.ts
onInit(): void {
    const oModel = new JSONModel({ items: [] });
    this.getView()!.setModel(oModel, "myModel");
}

// Do this — initialize in Component.ts, access from the controller:
// webapp/Component.ts
init(): void {
    super.init();
    this.setModel(models.createMyModel(), "myModel");
}

// webapp/controller/Home.controller.ts
onInit(): void {
    const oModel = this.getOwnerComponent()!.getModel("myModel");
    this.getView()!.setModel(oModel, "myModel");
}
```

```javascript
// Avoid this — creating a shared model inside a controller:
// webapp/controller/Home.controller.js
onInit: function () {
    const oModel = new JSONModel({ items: [] });
    this.getView().setModel(oModel, "myModel");
},

// Do this — initialize in Component.js, access from the controller:
// webapp/Component.js
init: function () {
    UIComponent.prototype.init.apply(this, arguments);
    this.setModel(models.createMyModel(), "myModel");
},

// webapp/controller/Home.controller.js
onInit: function () {
    const oModel = this.getOwnerComponent().getModel("myModel");
    this.getView().setModel(oModel, "myModel");
},
```

> **Why it matters:** Initializing models in controllers makes them controller-scoped and invisible to other views. Centralizing in `Component.js` ensures all views share the same model instance, avoids duplication, and keeps controllers lean.

---

## Avoid hardcoding values in filters.

Do not embed literal string or numeric values directly as filter parameters. Extract them into named constants or configuration objects. This makes filter criteria readable, centralizes changes to a single location, and prevents subtle bugs from copy-paste errors.

### The Rule in Practice

```typescript
// Avoid this — literal value hardcoded directly in the filter:
const oFilter = new Filter("Invoice", FilterOperator.EQ, "Tout");
const oStatusFilter = new Filter("Status", FilterOperator.EQ, "Active");

// Do this — extract to a named constant:
const INVOICE_ALL = "Tout";
const STATUS_ACTIVE = "Active";
const oFilter = new Filter("Invoice", FilterOperator.EQ, INVOICE_ALL);
const oStatusFilter = new Filter("Status", FilterOperator.EQ, STATUS_ACTIVE);
```

```javascript
// Avoid this:
const oFilter = new Filter("Invoice", FilterOperator.EQ, "Tout");
const oStatusFilter = new Filter("Status", FilterOperator.EQ, "Active");

// Do this:
const INVOICE_ALL = "Tout";
const STATUS_ACTIVE = "Active";
const oFilter = new Filter("Invoice", FilterOperator.EQ, INVOICE_ALL);
const oStatusFilter = new Filter("Status", FilterOperator.EQ, STATUS_ACTIVE);
```

> **Why it matters:** Hardcoded filter values are invisible at the call site — a reader cannot tell what `"Tout"` means without context. Named constants make intent clear, are reusable across multiple filters, and can be updated in one place.

---
