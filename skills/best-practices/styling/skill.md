---
name: styling
description: Use when writing or reviewing CSS styling in SAPUI5 XML views or controllers.
when_to_use: |
  Also trigger on: "refactor this", "while you're at it", "any quick wins", "improve this a bit", "review this", or when editing SAPUI5 XML views or controllers that manipulate visual styling of controls.
---

# AI Behavior
- Always apply the rules in this skill when editing SAPUI5 XML view or controller code, even if not explicitly asked for.
- When you see a violation of any of the rules in this skill, fix it without being asked, as long as it can be done in a small change alongside the requested edit.
- If you see a violation of any of the rules in this skill that cannot be fixed in a small change, leave a comment in the code suggesting the improvement, so that it can be addressed in a future edit.
- When you fix a violation of any of the rules in this skill, also look for and fix any other violations of the rules in this skill that you see in the same code, as long as they can be fixed in small changes alongside the requested edit.
- Always prioritize fixing violations of the rules in this skill over other types of improvements, as long as they can be done in small changes alongside the requested edit.

# Rules list

## Use SAP standard methods to update CSS styling.

Use SAPUI5's built-in `addStyleClass()` and `removeStyleClass()` methods to apply or remove CSS styles on controls. Never manipulate inline styles directly via `.style` properties or non-SAP methods like `setColor()`.

### The Rule in Practice

```typescript
// Avoid this — directly setting inline styles or using non-SAP methods:
oButton.setColor("#2B7D2B");
oPanel.style.background = "#E78C07";

// Do this — use SAP standard style class methods:
oButton.addStyleClass("sapMyHighlightStyle");
if (isActive) {
    oPanel.addStyleClass("sapMyActivePanel");
} else {
    oPanel.removeStyleClass("sapMyActivePanel");
}
```

```javascript
// Avoid this:
oButton.setColor("#2B7D2B");
if (isActive) {
    oPanel.style.background = "#E78C07";
}

// Do this:
oButton.addStyleClass("sapMyHighlightStyle");
if (isActive) {
    oPanel.addStyleClass("sapMyActivePanel");
} else {
    oPanel.removeStyleClass("sapMyActivePanel");
}
```

> **Why it matters:** Direct style manipulation bypasses SAPUI5's rendering lifecycle and theming engine. Using `addStyleClass`/`removeStyleClass` keeps styling declarative, theme-compatible, and consistent across the application.

---

## Create CSS classes and manipulate them via SAP style methods.

Instead of changing visual properties directly on a component (e.g., `setColor`, `.style.backgroundColor`), define named CSS classes and apply or remove them using SAPUI5's `addStyleClass()` and `removeStyleClass()` methods.

### The Rule in Practice

```typescript
// Avoid this — directly changing a style property:
oSource.setColor("#2B7D2B");
myElement.style.backgroundColor = "#FFF";

// Do this — define a CSS class and apply it via SAP methods:
oSource.addStyleClass("sapMyCustomStyle");
myElement.addStyleClass("sapMyWhiteBackground");
```

```javascript
// Avoid this:
oSource.setColor("#2B7D2B");
myElement.style.backgroundColor = "#FFF";

// Do this:
oSource.addStyleClass("sapMyCustomStyle");
myElement.addStyleClass("sapMyWhiteBackground");
```

> **Why it matters:** SAPUI5 controls are rendered through an abstraction layer — bypassing it with direct style mutations can cause styles to be overwritten on the next re-render. CSS classes applied via SAP methods are preserved across re-renders and support theming.

---

## Use native SAPUI5 CSS classes instead of custom ones where possible.

Before creating a custom CSS class for spacing, alignment, or sizing, check whether SAPUI5 already provides a native utility class (e.g., `sapUiSmallMargin`, `sapUiTinyMarginTop`, `sapUiContentPadding`). Prefer native classes to stay consistent with the SAPUI5 design system and benefit from automatic theme adaptation.

### The Rule in Practice

```xml
<!-- Avoid this — using a custom class for something SAPUI5 already provides: -->
<FlexBox class="AddHoursDivider" visible="{AddTime>/newTime}"/>
<!-- where AddHoursDivider only adds margin/padding in custom CSS -->

<!-- Do this — use a native SAPUI5 utility class: -->
<FlexBox class="sapUiSmallMarginTop" visible="{AddTime>/newTime}"/>
```

> **Why it matters:** Custom CSS classes require maintenance, can break with theme updates, and duplicate effort. Native SAPUI5 classes are theme-aware, responsive, and maintained by SAP — using them reduces custom CSS and keeps the UI consistent.

---
