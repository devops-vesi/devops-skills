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

## Provide meaningful text alternatives for images and icons

For accessibility, any `<m:Image>` or `<m:Icon>` must have a meaningful `alt` attribute that describes the content or function of the image or icon. This ensures that users relying on screen readers can understand the purpose of visual elements.

### The Rule in Practice

```xml
<!-- Avoid this — images and icons without alt text (inaccessible): -->
<m:Image src="logo.png"/>
<m:Icon src="sap-icon://decline"/>

<!-- Do this — provide meaningful alt text: -->
<m:Image src="logo.png" alt="{i18n>txtCompanyLogo}"/>
<m:Icon src="sap-icon://decline" alt="{i18n>txtDeclineAction}"/>
```

> **Why it matters:** Users relying on screen readers cannot understand the purpose of images or icons without descriptive alt text. Providing meaningful text alternatives ensures all users can interact with the UI effectively, and is required by WCAG accessibility guidelines.

---

## Providing labels for input controls

For accessibility, any `<m:Input>` or other input control must have a meaningful `label` attribute that describes the purpose of the input. This ensures that users relying on screen readers can understand the function of the input control.

### The Rule in Practice

```xml
<!-- Avoid this — input controls without labels (inaccessible): -->
<m:Input/>

<!-- Do this — provide meaningful labels: -->
<text labelFor="usernameInput">Username:</text>
<m:Input id="usernameInput"/>
```

> **Why it matters:** Users relying on screen readers cannot understand the purpose of input controls without descriptive labels. Providing meaningful labels ensures all users can interact with the UI effectively, and is required by WCAG accessibility guidelines.

---

## Providing Titles for Tables

For accessibility, any `<m:Table>` must have a meaningful `title` attribute that describes the purpose of the table. This ensures that users relying on screen readers can understand the context and content of the table.

### The Rule in Practice

```xml
<!-- Avoid this — tables without titles (inaccessible): -->
<m:Table>
    <!-- Table content -->
</m:Table>

<!-- Do this — provide meaningful titles: -->
<m:Table title="{i18n>txtUserList}">
    <!-- Table content -->
</m:Table>
```

```xml
<!-- Avoid this — tables without titles (inaccessible): -->
<m:Table>
    <!-- Table content -->
</m:Table>

<Title id="userListTitle">The User List</Title>
<!-- Do this — provide meaningful titles: -->
<m:Table ariaLabelledBy="userListTitle">
    <!-- Table content -->
</m:Table>
```

> **Why it matters:** Users relying on screen readers cannot understand the purpose of tables without descriptive titles. Providing meaningful titles ensures all users can interact with the UI effectively, and is required by WCAG accessibility guidelines.

---

## Using ARIA Roles and Properties

For accessibility, ARIA roles and properties can be used to provide additional context to screen readers and other assistive technologies. This is particularly useful for custom controls or complex UI elements that do not have native HTML semantics.

### The Rule in Practice

```xml
<!-- Avoid this — custom button without ARIA role (inaccessible): -->
<Link class="customButton">Click Me</Link>

<!-- Do this — provide meaningful ARIA role: -->
<Link class="customButton" role="button" tabindex="0">Click Me</Link>
```

> **Why it matters:** Users relying on screen readers cannot understand the purpose of custom controls without ARIA roles. Providing appropriate ARIA roles ensures all users can interact with the UI effectively, and is required by WCAG accessibility guidelines.

---

## Using Invisible text for grouped Input controls

For accessibility, when multiple input controls are grouped together (e.g., first name and last name fields), it is important to provide an invisible text label that describes of each input individually within the group. This helps screen reader users understand the context of the grouped inputs.

### The Rule in Practice

```xml
<!-- Avoid this — grouped inputs without a descriptive label (inaccessible): -->
<text id="idFullName">Full Name:</text>
<m:Input id="firstName"/>
<m:Input id="lastName"/>

<!-- Do this — provide an invisible text label for each input of the group: -->
<InvisibleText id="FirstNameLabel">First Name:</InvisibleText>
<InvisibleText id="LastNameLabel">Last Name:</InvisibleText>
<text id="idFullName">Full Name:</text>
<m:Input id="firstName" ariaLabelledBy="FirstNameLabel"/>
<m:Input id="lastName" ariaLabelledBy="LastNameLabel"/>
```

> **Why it matters:** Users relying on screen readers cannot understand the purpose of grouped input controls without descriptive labels. Providing invisible text labels ensures all users can interact with the UI effectively, and is required by WCAG accessibility guidelines.

