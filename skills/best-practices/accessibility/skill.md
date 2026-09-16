---
name: accessibility
description: Use when writing or reviewing SAPUI5 XML views/fragments (and their controllers) to ensure interactive elements meet accessibility requirements covering ARIA roles, accessible names, error/context-change management, keyboard navigation, and empty-value handling.
when_to_use: |
  Also trigger on: "refactor this", "while you're at it", "any quick wins", "improve this a bit", "review this", "accessibility", "a11y", "screen reader", or when editing SAPUI5 XML views/fragments that contain interactive elements such as Buttons, Links, Icons, Images, Inputs, Tables, Dialogs, Popovers, Menus, SegmentedButtons, IconTabBars, FileUploaders, Landmarks, or any other control (listed here or not) that can render itself as an icon-only button with no visible text (e.g. `FileUploader`, `MenuButton`, `ToggleButton`).
---

# AI Behavior
- Always apply the rules in this skill when editing SAPUI5 XML view/fragment files (and their controllers), even if not explicitly asked for.
- When you see a violation of any of the rules in this skill, fix it without being asked, as long as it can be done in a small change alongside the requested edit.
- If you see a violation of any of the rules in this skill that cannot be fixed in a small change, leave a comment in the code suggesting the improvement, so that it can be addressed in a future edit.
- When you fix a violation of any of the rules in this skill, also look for and fix any other violations of the rules in this skill that you see in the same code, as long as they can be fixed in small changes alongside the requested edit.
- Always prioritize fixing violations of the rules in this skill over other types of improvements, as long as they can be done in small changes alongside the requested edit.

# Rules list

## Category: Role

### Use a `role` (and matching keyboard behavior) when an element's semantics don't match its visual/interactive purpose

A `<m:Link>` that visually behaves like a button (e.g. it triggers an action instead of navigating) must be exposed to assistive technology with `role="Button"`, not left as a link. Screen readers announce the role, so mismatched roles create false expectations about how the control behaves (e.g. "link" implies navigation, not an action with side effects).

#### The Rule in Practice

```xml
<!-- Avoid this — a Link used as an action trigger, exposed as "link" (misleading): -->
<m:Link text="{FullDelivery}" press="onFullDeliveryLinkPress"/>

<!-- Do this — expose the real semantics with the role property: -->
<m:Link text="{FullDelivery}" press="onFullDeliveryLinkPress" role="Button"/>
```

> **Why it matters:** Screen reader users rely on the announced role to predict interaction behavior. A link that actually performs an action (like opening a popover) rather than navigating must be announced as a button, per the [WAI ARIA Roles guidance](https://www.w3.org/WAI/ARIA/apg/practices/).

---

### Set `ariaHasPopup` on controls that open a Dialog, Menu, or List

Any `<m:Button>` (or other trigger control) that opens a `Dialog`, `Menu`, `List`, `Tree`, or `Grid` must declare `ariaHasPopup` with the matching value, so assistive technology can announce that activating the control will open additional UI.

#### The Rule in Practice

```xml
<!-- Avoid this — button opens a dialog/menu with no warning to screen readers: -->
<m:Button text="Open" icon="sap-icon://action" press="onOpenDialogButtonPress"/>
<m:Button text="Open" icon="sap-icon://menu" press="onOpenMenuButtonPress"/>

<!-- Do this — declare the popup type via ariaHasPopup: -->
<m:Button text="Open" icon="sap-icon://action" press="onOpenDialogButtonPress" ariaHasPopup="Dialog"/>
<m:Button text="Open" icon="sap-icon://menu" press="onOpenMenuButtonPress" ariaHasPopup="Menu"/>
```

> **Why it matters:** Without `ariaHasPopup`, screen reader users have no advance notice that pressing the control changes context by opening a dialog, menu, or list, which can be disorienting.

---

### Define Landmark roles to structure the page

Top-level page regions (header, navigation, main content, search, complementary content) must expose a landmark role (e.g. via `sap.ui.core.AccessibleLandmarkRole` properties on layout controls, or the `landmarkInfo` aggregation) so assistive technology users can jump directly between page sections instead of tabbing through everything.

#### The Rule in Practice

```xml
<!-- Avoid this — a Page with no landmark structure: -->
<Page id="idPage" backgroundDesign="Solid">
    <content>
        <!-- main content -->
    </content>
</Page>

<!-- Do this — expose landmarks so regions can be navigated directly: -->
<Page id="idPage" backgroundDesign="Solid">
    <landmarkInfo>
        <PageAccessibleLandmarkInfo
            rootRole="Region"
            rootLabel="{i18n>txtPageLandmark}"
            contentRole="Main"
            contentLabel="{i18n>txtContentLandmark}"
        />
    </landmarkInfo>
    <content>
        <!-- main content -->
    </content>
</Page>
```

> **Why it matters:** Landmarks (Banner, Navigation, Main, Search, Region, Contentinfo, etc.) let screen reader and keyboard users jump straight to a page section instead of navigating linearly through the whole DOM, per [WAI ARIA Landmark roles](https://www.w3.org/WAI/ARIA/apg/practices/).

---

## Category: Accessible Name

### Buttons (and any control that can render as a button) without text must have a tooltip

This rule is not limited to a fixed list of controls: it applies to **any** SAPUI5 control — `<m:Button>` included — that can end up rendered as an icon-only, button-like trigger with no visible text. Whenever a control has a property that suppresses/omits its visible text (e.g. no `text`, an empty `buttonText`, an icon-only display mode/`buttonOnly` flag, etc.), it must always include a `tooltip` attribute. Recognized examples include `<unified:FileUploader buttonOnly="true">`, `MenuButton`, `OverflowToolbarButton`, and `ToggleButton`, but the same reasoning applies to any other current or future control with the same icon-only behavior — always check whether the control you are using can render without visible text, regardless of whether it is listed here.

#### The Rule in Practice

```xml
<!-- Avoid this — icon-only buttons/button-rendering controls with no tooltip (inaccessible): -->
<m:Button icon="sap-icon://decline" press="clearAllFilters"/>
<m:Button icon="sap-icon://edit" press="onButtonEditTableColumnPress"/>
<unified:FileUploader
    id="regDocUploader"
    buttonOnly="true"
    icon="sap-icon://upload"
    name="file"
    uploadUrl="/upload"/>

<!-- Do this — add a tooltip whenever there is no visible text label: -->
<m:Button icon="sap-icon://decline" tooltip="{i18n>txtClearAllFilters}" press="clearAllFilters"/>
<m:Button icon="sap-icon://edit" tooltip="{i18n>txtEdit}" press="onButtonEditTableColumnPress"/>
<unified:FileUploader
    id="regDocUploader"
    tooltip="{i18n>txtUploadRegistrationDocument}"
    buttonOnly="true"
    buttonText="{i18n>txtUploadDocument}"
    icon="sap-icon://upload"
    name="file"
    uploadUrl="/upload"/>
```

> **Why it matters:** Users relying on screen readers or keyboard navigation cannot understand the purpose of an icon-only button — or any control rendered as one — without a descriptive tooltip (or text), which becomes its accessible name (`[aria-label] + [title]`). This is required by WCAG accessibility guidelines. Even when a control like `FileUploader` has a `buttonText`, a `tooltip` still provides a more explicit accessible description of the action.

---

### Provide meaningful text alternatives for images and icons

Any `<m:Image>` or `<m:Icon>` must either declare `decorative="true"` (if it conveys no information) or have a meaningful `alt` attribute describing its content/function. Never leave a non-decorative image or icon without alternative text.

#### The Rule in Practice

```xml
<!-- Avoid this — informative image/icon without alt text (inaccessible): -->
<m:Image src="{images>/logo}" width="300px"/>
<m:Icon src="sap-icon://decline"/>

<!-- Do this — decorative content is explicitly ignored... -->
<m:Image src="{images>/decoration}" decorative="true"/>

<!-- ...and informative content gets meaningful alt text: -->
<m:Image src="{images>/logo}" width="300px" alt="{i18n>txtCompanyLogo}"/>
<m:Icon src="sap-icon://decline" alt="{i18n>txtDeclineAction}"/>
```

> **Why it matters:** Users relying on screen readers cannot understand the purpose of images or icons without descriptive alt text (or know to ignore purely decorative ones). This is required by WCAG accessibility guidelines. See [MDN Accessible Name](https://developer.mozilla.org/en-US/docs/Glossary/Accessible_name).

---

### Provide labels for input controls (via `labelFor`)

Any `<m:Input>` (or other input control) must have an associated `<m:Label>` linked with `labelFor`, pointing at the input's `id`. The **label** is the accessible name, never the `placeholder` — a placeholder is only an input hint and disappears once text is entered.

#### The Rule in Practice

```xml
<!-- Avoid this — input control with no associated label (inaccessible): -->
<m:Label text="{i18n>txtFirstName}"/>
<m:Input id="idFirstNameInput"/>

<!-- Do this — link label and input explicitly with labelFor: -->
<m:Label id="idFirstNameLabel" labelFor="idFirstNameInput" text="{i18n>txtFirstName}"/>
<m:Input id="idFirstNameInput"/>
```

> **Why it matters:** Users relying on screen readers cannot understand the purpose of input controls without a properly associated label. Providing `labelFor` ensures all users can interact with the UI effectively, and is required by WCAG accessibility guidelines.

---

### Use Invisible Text for grouped input controls

When multiple input controls are grouped under one shared visible label (e.g. postal code + city sharing one "Address" label), each individual input still needs its own accessible name. Add an `<InvisibleText>` per input and reference it via `ariaLabelledBy`.

#### The Rule in Practice

```xml
<!-- Avoid this — grouped inputs share one label with no per-field distinction (inaccessible): -->
<m:Label text="{i18n>txtPostalCodeCity}"/>
<m:Input id="idPostalCodeInput" value="75000"/>
<m:Input id="idCityInput" value="Paris"/>

<!-- Do this — provide an invisible text label for each input of the group: -->
<InvisibleText id="idPostalCodeInvisibleText" text="{i18n>txtPostalCode}"/>
<InvisibleText id="idCityInvisibleText" text="{i18n>txtCity}"/>
<m:Label text="{i18n>txtPostalCodeCity}"/>
<m:Input id="idPostalCodeInput" value="75000" ariaLabelledBy="idPostalCodeInvisibleText"/>
<m:Input id="idCityInput" value="Paris" ariaLabelledBy="idCityInvisibleText"/>
```

> **Why it matters:** Users relying on screen readers cannot distinguish grouped input controls that only share one generic visible label. Invisible text labels give each field its own accessible name without changing the visual design.

---

### Provide extra input context via `ariaDescribedBy` or `description`

When an input needs supplementary guidance beyond its label (units, format, constraints), expose it via the `description` property (rendered) or `ariaDescribedBy` pointing at an `<InvisibleText>` (non-visual), instead of relying on a placeholder alone.

#### The Rule in Practice

```xml
<!-- Avoid this — extra context only in a placeholder (lost once text is entered, and never announced as a description): -->
<m:Label id="idTemperatureLabel" labelFor="idTemperatureInput" text="{i18n>txtTemperature}"/>
<m:Input id="idTemperatureInput" placeholder="Enter a value in Celsius"/>

<!-- Do this — expose the extra context permanently via ariaDescribedBy: -->
<InvisibleText id="idTemperatureUnitInvisibleText" text="{i18n>txtTemperatureUnitCelsius}"/>
<m:Label id="idTemperatureLabel" labelFor="idTemperatureInput" text="{i18n>txtTemperature}"/>
<m:Input id="idTemperatureInput" ariaDescribedBy="idTemperatureUnitInvisibleText"/>
```

> **Why it matters:** A placeholder is not an accessible description — it is not reliably announced and disappears once the user types. `ariaDescribedBy`/`description` keep the extra context available to screen reader users at all times.

---

### Provide titles for tables

Any `<m:Table>` (or `sap.ui.table.Table`) must have a meaningful title, either via a `Title`/toolbar title bound with `ariaLabelledBy`, or an equivalent accessible label, so screen reader users understand the table's purpose before navigating its rows.

#### The Rule in Practice

```xml
<!-- Avoid this — table with no accessible title (inaccessible): -->
<m:Table id="idProductTable" items="{/Products}">
    <!-- columns / items -->
</m:Table>

<!-- Do this — give the table a title and reference it: -->
<m:Table id="idProductTable" items="{/Products}" ariaLabelledBy="idProductTableTitle">
    <headerToolbar>
        <OverflowToolbar>
            <Title id="idProductTableTitle" text="{i18n>txtProductList}" level="H3"/>
        </OverflowToolbar>
    </headerToolbar>
    <!-- columns / items -->
</m:Table>
```

> **Why it matters:** Users relying on screen readers cannot understand the purpose/content of a table without a descriptive title. This is required by WCAG accessibility guidelines.

---

### Provide tooltips/labels for SegmentedButton, IconTabBar, and other icon-driven composite controls

Composite controls whose items are identified only by icon (e.g. `SegmentedButtonItem` with only an icon, `IconTabFilter` with only an `icon`) must expose a tooltip/label per item — and, when the whole group needs extra context, an `<InvisibleText>` + `ariaLabelledBy` on the container.

#### The Rule in Practice

```xml
<!-- Avoid this — icon-only tab/segmented items with no accessible name: -->
<SegmentedButton id="idViewModeSegmentedButton">
    <items>
        <SegmentedButtonItem icon="sap-icon://map"/>
        <SegmentedButtonItem icon="sap-icon://globe"/>
    </items>
</SegmentedButton>

<!-- Do this — add tooltips per item, plus a group label via InvisibleText: -->
<InvisibleText id="idViewModeInvisibleText" text="{i18n>txtViewModeSelection}"/>
<SegmentedButton id="idViewModeSegmentedButton" ariaLabelledBy="idViewModeInvisibleText">
    <items>
        <SegmentedButtonItem icon="sap-icon://map" tooltip="{i18n>txtMapView}"/>
        <SegmentedButtonItem icon="sap-icon://globe" tooltip="{i18n>txtSatelliteView}"/>
    </items>
</SegmentedButton>
```

> **Why it matters:** Icon-only items in composite controls carry no accessible name by default. Tooltips give each option a name; an invisible text on the container clarifies what the whole group of options is for.

---

### Provide labels for popups (Dialogs, Popovers)

Any `<m:Dialog>` or `<m:Popover>` must be labelled so assistive technology announces its purpose as soon as it opens. Use the `title` aggregation/property when there is a visible title, or `ariaLabelledBy` pointing at the element carrying the message, in addition to a proper heading structure inside.

#### The Rule in Practice

```xml
<!-- Avoid this — dialog with no accessible title/label announced on open (inaccessible): -->
<Dialog id="idProductDialog">
    <content>
        <m:Text id="idProductDialogText" text="This is the dialog message..."/>
    </content>
</Dialog>

<!-- Do this — give the dialog a title and/or reference its content via ariaLabelledBy: -->
<Dialog id="idProductDialog" title="{i18n>txtProductDialogTitle}" ariaLabelledBy="idProductDialogText">
    <content>
        <m:Text id="idProductDialogText" text="{i18n>txtProductDialogMessage}"/>
    </content>
</Dialog>
```

> **Why it matters:** When a dialog opens, screen readers announce its accessible name immediately. Without a title or `ariaLabelledBy`, users have no idea what just appeared or why focus moved.

---

## Category: Error Management & Context Changes

### Associate labels with fields — never rely on placeholder text alone

Every form field's accessible name must come from a properly associated `<m:Label labelFor="...">` (or `ariaLabelledBy`), never from `placeholder`, which is only an input hint and is not a reliable accessible name.

#### The Rule in Practice

```xml
<!-- Avoid this — placeholder used as the only guidance (not an accessible name): -->
<m:Input id="idEmailInput" placeholder="Enter your email"/>

<!-- Do this — a real label provides the accessible name: -->
<m:Label id="idEmailLabel" labelFor="idEmailInput" text="{i18n>txtEmail}"/>
<m:Input id="idEmailInput" placeholder="{i18n>txtEmailPlaceholder}"/>
```

> **Why it matters:** Placeholders vanish once a value is entered and are not consistently exposed as an accessible name, so screen reader users relying only on a placeholder lose the field's purpose. See [Error Identification (WCAG)](https://www.w3.org/WAI/WCAG21/Understanding/error-identification).

---

### Surface field validation errors with `valueState` and `valueStateText`

When a required/invalid field fails validation, set `valueState="Error"` and a descriptive `valueStateText` (not just a color change) so both sighted and screen reader users perceive the error and know how to correct it.

#### The Rule in Practice

```javascript
// Avoid this — only a value state color change, no explanatory message:
onInputLiveChange: function (oEvent) {
    const oInput = oEvent.getSource();
    if (!oEvent.getParameter("value")) {
        oInput.setValueState("Error");
    }
}

// Do this — reset state first, then set state + message so screen readers announce the reason:
onInputLiveChange: function (oEvent) {
    const oInput = oEvent.getSource();
    const sValue = oEvent.getParameter("value");

    oInput.setValueState("None");
    oInput.setValueStateText("");

    if (!sValue || sValue.length === 0) {
        oInput.setValueState("Error");
        oInput.setValueStateText(this._getText("txtFieldRequired"));
    }
}
```

> **Why it matters:** A value-state color alone is invisible to screen reader users. `valueStateText` is announced with the field so users perceive the error occurred and understand how to correct it, per [Error Suggestion (WCAG)](https://www.w3.org/WAI/WCAG21/Understanding/error-suggestion).

---

### Give visible + accessible feedback after form submission with `MessageStrip`

After a form submit (success or failure), show a `sap.m.MessageStrip` (or equivalent) with an appropriate `type` ("Success"/"Error") and clear text, instead of only a color/style change or a transient toast that some users may not perceive in time.

#### The Rule in Practice

```javascript
// Avoid this — no persistent, readable feedback after submit:
onSubmitButtonPress: function () {
    if (this.validateForm()) {
        this._clearForm();
    }
    // no feedback show to the user or to assistive tech
}

// Do this — surface a MessageStrip describing the outcome:
onSubmitButtonPress: function () {
    sap.ui.require(["sap/m/MessageStrip"], (MessageStrip) => {
        const bValid = this.validateForm();
        const oMessageStrip = new MessageStrip({
            showIcon: true,
            showCloseButton: true,
            type: bValid ? "Success" : "Error",
            text: bValid
                ? this._getText("txtFormSaved")
                : this._getText("txtFormHasErrors")
        });

        this.byId("idFormPanel").addContent(oMessageStrip);
        if (bValid) {
            this._clearForm();
        }
    });
}
```

> **Why it matters:** Users need both visual feedback and enough time to perceive it. A `MessageStrip` with a clear `type` and text works for sighted and non-sighted users alike, unlike relying on color alone.

---

### Announce non-visual context changes with `InvisibleMessage`

When a large section of the page updates without a full navigation (e.g. content refreshed after an action, a filter panel appearing above existing content), notify screen reader users with `sap.ui.core.InvisibleMessage` (`Polite` for non-critical, `Assertive` for important/urgent) or an equivalent invisible-text live region.

#### The Rule in Practice

```javascript
// Avoid this — content is updated but screen reader users are never told:
onSubmitButtonPress: function () {
    this._refreshResultsList();
}

// Do this — announce the context change via InvisibleMessage:
sap.ui.define(["sap/ui/core/InvisibleMessage"], function (InvisibleMessage) {
    "use strict";
    return {
        onInit: function () {
            this._oInvisibleMessage = InvisibleMessage.getInstance();
        },
        onSubmitButtonPress: function () {
            this._refreshResultsList();
            this._oInvisibleMessage.announce(
                this._getText("txtResultsUpdated"),
                sap.ui.core.InvisibleMessageMode.Polite
            );
        }
    };
});
```

> **Why it matters:** Changes of context (content, focus, viewport) that happen without an explicit page navigation can disorient users who cannot see the whole page. An invisible, live-region announcement keeps screen reader users informed, per [On Input (WCAG)](https://www.w3.org/WAI/WCAG21/Understanding/on-input.html).

---

## Category: Keyboard Navigation

### Expose custom shortcuts via `sap.ui.core.CommandExecution`, not raw keydown handlers

Custom keyboard shortcuts (Save, Delete, etc.) on a control must be declared with `<core:CommandExecution>` in the `dependents` aggregation and wired to the shell/manifest `"cmd"` definitions, so they integrate with UI5's standard keyboard handling instead of ad hoc `keydown` listeners.

#### The Rule in Practice

```xml
<!-- Avoid this — no discoverable, standards-based way to trigger the action via keyboard: -->
<Popover id="idProductPopover" title="{i18n>txtProduct}">
    <content>
        <m:Input id="idProductInput"/>
    </content>
</Popover>

<!-- Do this — declare CommandExecutions bound to manifest command shortcuts: -->
<Popover id="idProductPopover" title="{i18n>txtProduct}">
    <dependents>
        <core:CommandExecution command="Save" execute="onPopoverSave"/>
        <core:CommandExecution command="Delete" execute="onPopoverDelete"/>
    </dependents>
    <content>
        <m:Input id="idProductInput"/>
    </content>
</Popover>
```

> **Why it matters:** `CommandExecution` integrates custom shortcuts with UI5's accessibility-aware keyboard handling and keeps shortcuts centrally defined (and documentable), instead of silently intercepting keys with custom `keydown` code. See [Keyboard (WCAG)](https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html).

---

### Manage focus explicitly when content or the DOM order changes

When opening a `Popover`/`Dialog`, or when content is inserted before/around existing elements (e.g. a filter bar appearing above a list), explicitly set the initial/next focus target (e.g. `setInitialFocus`, `.focus()`) instead of letting focus default to the browser's fallback (often `<body>`), which silently strands or disorients keyboard/screen reader users.

#### The Rule in Practice

```javascript
// Avoid this — Popover opens with no defined initial focus target:
this._oPopover = new Popover({
    title: "...",
    content: [ /* ... */ ],
    footer: new Toolbar({ content: [ oCloseButton ] })
});
this._oPopover.openBy(oSource);

// Do this — explicitly send focus to a meaningful control (e.g. the close button):
this._oPopover = new Popover({
    title: "...",
    content: [ /* ... */ ],
    footer: new Toolbar({ content: [ oCloseButton ] })
});
this._oPopover.setInitialFocus(oCloseButton);
this._oPopover.openBy(oSource);
```

> **Why it matters:** Without explicit focus handling, keyboard and screen reader users can lose track of where they are after a UI change, or have to tab from the very top of the page again. Explicit focus management keeps navigation predictable, per [On Focus (WCAG)](https://www.w3.org/WAI/WCAG21/Understanding/on-focus.html).

---

## Category: Other Best Practices

### Provide a perceivable placeholder for blank/empty values

This rule applies only to controls used **inside tables and forms** (e.g. `Table`/`sap.m.Table` cells, `SimpleForm`/`Form` fields). In those contexts, empty values must not be rendered as a truly empty string with no accessible content — set `emptyIndicatorMode="On"` on the control so it automatically shows/announces a placeholder (e.g. "–") when the bound value is empty, instead of silently skipping the field/cell.

#### The Rule in Practice

```xml
<!-- Avoid this — an empty text in a table/form is invisible/unannounced to screen readers: -->
<m:Text id="idDescriptionText" text="{Description}"/>
<m:ObjectIdentifier id="idSupplierObjectIdentifier" title="{Supplier}"/>

<!-- Do this — let the control handle the empty state via emptyIndicatorMode: -->
<m:Text id="idDescriptionText" text="{Description}" emptyIndicatorMode="On"/>
<m:ObjectIdentifier id="idSupplierObjectIdentifier" title="{Supplier}" emptyIndicatorMode="On"/>
```

> **Why it matters:** A blank cell or field is easy to miss visually and gives no signal to a screen reader that a value was expected but absent. `emptyIndicatorMode` communicates "there is no value" instead of appearing as a gap or being skipped entirely.

---

### Set the level property to title

Title elements (e.g., `Title` control) should have their `level` property set to `TitleLevel.H1`, `TitleLevel.H2`, etc., to convey the correct semantic importance to screen readers and assistive technologies. This ensures that headings are properly structured and navigable.

#### The Rule in Practice

```xml
<!-- Avoid this — no level specified, may default incorrectly: -->
<m:Title id="idPageTitle" text="Page Title"/>

<!-- Do this — explicitly set the level to convey semantic importance: -->
<m:Title id="idPageTitle" text="Page Title" level="H1"/>
```

> **Why it matters:** Properly structured headings help screen reader users understand the hierarchy and organization of content, making navigation more efficient and the overall experience more accessible.

---