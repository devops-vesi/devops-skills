---
name: accessibility
description: Use when writing or reviewing SAPUI5 XML views to ensure interactive elements meet accessibility requirements.
when_to_use: |
  Also trigger on: "refactor this", "while you're at it", "any quick wins", "improve this a bit", "review this", or when editing SAPUI5 XML views that contain interactive elements such as Buttons, Icons, or Links.
---

# AI Behavior
- Always apply the rules in this skill when editing SAPUI5 XML view files, even if not explicitly asked for.
- When you see a violation of any of the rules in this skill, fix it without being asked, as long as it can be done in a small change alongside the requested edit.
- If you see a violation of any of the rules in this skill that cannot be fixed in a small change, leave a comment in the code suggesting the improvement, so that it can be addressed in a future edit.
- When you fix a violation of any of the rules in this skill, also look for and fix any other violations of the rules in this skill that you see in the same code, as long as they can be fixed in small changes alongside the requested edit.
- Always prioritize fixing violations of the rules in this skill over other types of improvements, as long as they can be done in small changes alongside the requested edit.

# Rules list

## Buttons without text must have a tooltip.

For accessibility, any `<m:Button>` that does not have a `text` attribute must always include a `tooltip` attribute. Without a visible label or tooltip, the button is inaccessible to screen readers and keyboard-only users.

### The Rule in Practice

```xml
<!-- Avoid this — icon-only buttons with no tooltip (inaccessible): -->
<m:Button icon="sap-icon://decline" press="clearAllFilters"/>
<m:Button press="onAction"/>

<!-- Do this — add a tooltip whenever the text attribute is absent: -->
<m:Button icon="sap-icon://decline" tooltip="{i18n>txtClearAllFilters}" press="clearAllFilters"/>
<m:Button icon="sap-icon://excel-attachment" tooltip="{i18n>txtExport}" press="onExport"/>
```

> **Why it matters:** Users relying on screen readers or keyboard navigation cannot understand the purpose of an icon-only button without a descriptive tooltip. A meaningful tooltip ensures all users can interact with the UI effectively, and is required by WCAG accessibility guidelines.

---
