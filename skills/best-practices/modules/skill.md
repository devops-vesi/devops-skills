---
name: modules
description: Use when writing or reviewing module imports and dependencies in TypeScript, JavaScript, or SAPUI5 (sap.ui.define) code.
when_to_use: |
  Also trigger on: "refactor this", "while you're at it", "any quick wins", "improve this a bit", "review this", or when editing existing TypeScript, JavaScript, or SAPUI5 code that contains module imports or sap.ui.define calls.
---

# AI Behavior
- Always apply the rules in this skill when editing TypeScript, JavaScript, or SAPUI5 code, even if not explicitly asked for.
- When you see a violation of any of the rules in this skill, fix it without being asked, as long as it can be done in a small change alongside the requested edit.
- If you see a violation of any of the rules in this skill that cannot be fixed in a small change, leave a comment in the code suggesting the improvement, so that it can be addressed in a future edit.
- When you fix a violation of any of the rules in this skill, also look for and fix any other violations of the rules in this skill that you see in the same code, as long as they can be fixed in small changes alongside the requested edit.
- Always prioritize fixing violations of the rules in this skill over other types of improvements, as long as they can be done in small changes alongside the requested edit.

# Rules list

## Load only what you really need.

Import only the specific modules, classes, or functions that are actually used in the file. Avoid importing entire libraries or listing modules in `sap.ui.define` that are never referenced in the code. Unused imports increase memory footprint, load time, and make dependencies harder to understand.

### The Rule in Practice

```typescript
// Avoid this — importing many modules, several of which may be unused:
import Controller from "sap/ui/core/mvc/Controller";
import MessageBox from "sap/m/MessageBox";
import History from "sap/ui/core/routing/History";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import MessageToast from "sap/m/MessageToast";
import Button from "sap/m/Button";
import Dialog from "sap/m/Dialog";
// Only Controller and JSONModel are actually used

// Do this — import only what is used:
import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";

export default class MyController extends Controller {
    onInit(): void {
        const oModel = new JSONModel();
        this.getView()!.setModel(oModel);
    }
}
```

```javascript
// Avoid this — imports many modules, several of which may be unused:
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/core/routing/History",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast",
    "sap/m/Button",
    "sap/m/Dialog"
], function (Controller, MessageBox, History, Filter, FilterOperator, MessageToast, Button, Dialog) {
    "use strict";
    return Controller.extend("my.namespace.MyController", {
        onInit: function () {
            // Only Controller and JSONModel are actually used
        }
    });
});

// Do this — import only what is used:
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";
    return Controller.extend("my.namespace.MyController", {
        onInit: function () {
            const oModel = new JSONModel();
            this.getView().setModel(oModel);
        }
    });
});
```

> **Why it matters:** Every unused import is code that is loaded, parsed, and kept in memory for no benefit. Keeping the dependency list lean makes the module's intent immediately clear.

---

## Use absolute paths to call modules in `sap.ui.define`.

Always use absolute paths when referencing modules in `sap.ui.define`. Avoid relative paths or dynamically building dependency strings, as these can lead to resolution errors, make dependencies harder to trace, and break when files are moved.

### The Rule in Practice

```typescript
// Avoid this — relative path is fragile:
import BaseController from "../controller/BaseController";
import Formatter from "./utils/Formatter";

// Do this — absolute path is explicit and stable:
import BaseController from "com/mycompany/myapp/controller/BaseController";
import Formatter from "com/mycompany/myapp/utils/Formatter";
```

```javascript
// Avoid this — relative path is fragile:
sap.ui.define([
    "../controller/BaseController",
    "./utils/Formatter"
], function (BaseController, Formatter) {
    "use strict";
});

// Do this — absolute path is explicit and stable:
sap.ui.define([
    "com/mycompany/myapp/controller/BaseController",
    "com/mycompany/myapp/utils/Formatter"
], function (BaseController, Formatter) {
    "use strict";
});
```

> **Why it matters:** Absolute paths are unambiguous, resilient to file reorganization, and make it easy to understand a module's origin at a glance without knowing the current file's location.

---

## Use `sap.ui.require` for lazy module loading.

Use `sap.ui.require` to load a module on demand instead of listing it in the `sap.ui.define` dependency array when it is only needed occasionally (e.g., inside an event handler or a conditional branch). This avoids loading the module at startup when it may not be needed.

### The Rule in Practice

```typescript
// Avoid this — loading MessageBox eagerly even if only needed on demand:
import Controller from "sap/ui/core/mvc/Controller";
import MessageBox from "sap/m/MessageBox";

export default class MyController extends Controller {
    onConfirm(): void {
        MessageBox.confirm("Are you sure?");
    }
}

// Do this — lazy-load with sap.ui.require when actually needed:
import Controller from "sap/ui/core/mvc/Controller";

export default class MyController extends Controller {
    onConfirm(): void {
        sap.ui.require(["sap/m/MessageBox"], (MessageBox: typeof import("sap/m/MessageBox")) => {
            MessageBox.default.confirm("Are you sure?");
        });
    }
}
```

```javascript
// Avoid this — loading MessageBox eagerly even if only needed on demand:
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], function (Controller, MessageBox) {
    "use strict";
    return Controller.extend("my.namespace.MyController", {
        onConfirm: function () {
            MessageBox.confirm("Are you sure?");
        }
    });
});

// Do this — lazy-load with sap.ui.require when actually needed:
sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";
    return Controller.extend("my.namespace.MyController", {
        onConfirm: function () {
            sap.ui.require(["sap/m/MessageBox"], function (MessageBox) {
                MessageBox.confirm("Are you sure?");
            });
        }
    });
});
```

> **Why it matters:** Every module in the `sap.ui.define` array is loaded at startup. Using `sap.ui.require` defers the load until the module is actually needed, reducing initial load time and memory footprint.

---

## Use `loadFragment` to load fragments asynchronously (SAPUI5 ≥ 1.93).

Since SAPUI5 1.93, `this.loadFragment()` is available on every controller instance extending `sap.ui.core.mvc.Controller`. Prefer it over the generic `sap.ui.core.Fragment.load()` API. It automatically handles lifecycle management: the fragment content is added to the view's `dependents` aggregation, prefixed with the view ID, and destroyed when the view is destroyed.

### The Rule in Practice

```typescript
// Avoid this — using the generic Fragment.load() with manual lifecycle management:
import Controller from "sap/ui/core/mvc/Controller";
import Fragment from "sap/ui/core/Fragment";
import type Dialog from "sap/m/Dialog";

export default class MyController extends Controller {
    async onOpenDialog(): Promise<void> {
        const oDialog = await Fragment.load({
            name: "my.namespace.fragment.Dialog",
            controller: this
        }) as Dialog;
        this.getView()!.addDependent(oDialog);
        oDialog.open();
    }
}

// Do this — use loadFragment() for automatic lifecycle management:
import Controller from "sap/ui/core/mvc/Controller";
import type Dialog from "sap/m/Dialog";

export default class MyController extends Controller {
    async onOpenDialog(): Promise<void> {
        const oDialog = await this.loadFragment({
            name: "my.namespace.fragment.Dialog"
        }) as Dialog;
        oDialog.open();
    }
}
```

```javascript
// Avoid this — using the generic Fragment.load() with manual lifecycle management:
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
], function (Controller, Fragment) {
    "use strict";
    return Controller.extend("my.namespace.MyController", {
        onOpenDialog: function () {
            Fragment.load({
                name: "my.namespace.fragment.Dialog",
                controller: this
            }).then(function (oDialog) {
                this.getView().addDependent(oDialog);
                oDialog.open();
            }.bind(this));
        }
    });
});

// Do this — use controller.loadFragment() for automatic lifecycle management:
sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";
    return Controller.extend("my.namespace.MyController", {
        onOpenDialog: function () {
            this.loadFragment({
                name: "my.namespace.fragment.Dialog"
            }).then(function (oDialog) {
                oDialog.open();
            });
        }
    });
});
```

> **Why it matters:** `Fragment.load()` requires manually adding the fragment to `dependents` and handling destruction. `loadFragment()` does this automatically, preventing duplicate ID errors, memory leaks, and making code simpler and safer.

---
