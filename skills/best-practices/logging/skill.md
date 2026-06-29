---
name: logging
description: Use when writing or reviewing error handling and logging code in TypeScript or JavaScript.
when_to_use: |
  Also trigger on: "refactor this", "while you're at it", "any quick wins", "improve this a bit", "review this", or when editing existing TypeScript or JavaScript code that contains error logging or error handling logic.
---

# AI Behavior
- Always apply the rules in this skill when editing TypeScript or JavaScript code, even if not explicitly asked for.
- When you see a violation of any of the rules in this skill, fix it without being asked, as long as it can be done in a small change alongside the requested edit.
- If you see a violation of any of the rules in this skill that cannot be fixed in a small change, leave a comment in the code suggesting the improvement, so that it can be addressed in a future edit.
- When you fix a violation of any of the rules in this skill, also look for and fix any other violations of the rules in this skill that you see in the same code, as long as they can be fixed in small changes alongside the requested edit.
- Always prioritize fixing violations of the rules in this skill over other types of improvements, as long as they can be done in small changes alongside the requested edit.

# Rules list

## Avoid using jQuery for error logging.

Do not use jQuery methods such as `$.ajaxError` or `jQuery.error` to handle or log errors. jQuery is a DOM manipulation library and is not designed for robust error logging. Use a dedicated logging module — in SAPUI5, use `sap/base/Log`; in general JavaScript projects, use a proper logging library (e.g., Winston, Bunyan) or the native `console.error`.

### The Rule in Practice

```typescript
// Avoid this — using jQuery for error logging (SAPUI5 TypeScript):
import Controller from "sap/ui/core/mvc/Controller";
// jQuery.sap.log is deprecated and not typed in modern SAPUI5

export default class MyController extends Controller {
    onError(oError: Error): void {
        jQuery.sap.log.error("Something went wrong: " + oError.message); // deprecated
    }
}

// Do this — use the dedicated SAPUI5 logging module:
import Controller from "sap/ui/core/mvc/Controller";
import Log from "sap/base/Log";

export default class MyController extends Controller {
    onError(oError: Error): void {
        Log.error("Something went wrong: " + oError.message);
    }
}
```

```javascript
// Avoid this — using jQuery for error handling/logging:
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "jquery.sap.global"
], function (Controller, jQuery) {
    "use strict";
    return Controller.extend("my.namespace.MyController", {
        onError: function (oError) {
            jQuery.sap.log.error("Something went wrong: " + oError.message);
        }
    });
});

// Do this — use the dedicated SAPUI5 logging module:
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/base/Log"
], function (Controller, Log) {
    "use strict";
    return Controller.extend("my.namespace.MyController", {
        onError: function (oError) {
            Log.error("Something went wrong: " + oError.message);
        }
    });
});
```

```typescript
// Avoid this — in general TypeScript:
$(document).ajaxError((event, jqXHR, settings, error) => {
    console.log("AJAX error via jQuery: " + error);
});

// Do this — use native error handling:
fetch("/api/data")
    .then((response: Response) => response.json())
    .catch((error: Error) => console.error("Fetch error:", error));
```

```javascript
// Avoid this — in general JavaScript:
$(document).ajaxError(function (event, jqXHR, settings, error) {
    console.log("AJAX error via jQuery: " + error);
});

// Do this — use native error handling:
fetch("/api/data")
    .then(response => response.json())
    .catch(error => console.error("Fetch error:", error));
```

> **Why it matters:** jQuery's logging utilities are deprecated in modern SAPUI5 and provide limited flexibility. Dedicated logging modules offer structured logging, log levels, and better integration with monitoring tools.

---
