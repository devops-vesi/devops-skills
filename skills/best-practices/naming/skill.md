---
name: naming
description: Use when naming or renaming variables, functions, classes or interfaces in TypeScript or JavaScript code.
when_to_use: |
  Also trigger on: "refactor this", "while you're at it", "any quick wins", "improve this a bit", "review this", or when editing existing TypeScript or JavaScript and an adjacent small cleanup is possible alongside the asked-for change.
---

# AI Behavior
- Always apply the rules in this skill when editing TypeScript or JavaScript code, even if not explicitly asked for.
- When you see a violation of any of the rules in this skill, fix it without being asked, as long as it can be done in a small change alongside the requested edit.
- If you see a violation of any of the rules in this skill that cannot be fixed in a small change, leave a comment in the code suggesting the improvement, so that it can be addressed in a future edit.
- When you fix a violation of any of the rules in this skill, also look for and fix any other violations of the rules in this skill that you see in the same code, as long as they can be fixed in small changes alongside the requested edit.
- Always prioritize fixing violations of the rules in this skill over other types of improvements, as long as they can be done in small changes alongside the requested edit.

# Rules list

## Use meaningful variable names.

Using meaningful variable names can improve code readability and maintainability by clearly indicating the purpose of each variable.

### The Rule in Practice

```typescript
// Avoid this:
let x = 10;
let y = 20;

// Do this:
let width = 10;
let height = 20;
```

```javascript
// Avoid this:
let x = 10;
let y = 20;

// Do this:
let width = 10;
let height = 20;
```

---

## Use camelCase for variable and function names.

Using camelCase for variable and function names can improve code readability and maintainability by following a consistent naming convention widely adopted in the TypeScript and JavaScript communities.

### The Rule in Practice

```typescript
// Avoid this:
let my_variable = 10;
function my_function() {
    // implementation
}

// Do this:
let myVariable = 10;
function myFunction() {
    // implementation
}
```

```javascript
// Avoid this:
let my_variable = 10;
function my_function() {
    // implementation
}

// Do this:
let myVariable = 10;
function myFunction() {
    // implementation
}
```

---

## Use PascalCase for class names.

Using PascalCase for class names helps distinguish classes from variables and functions, following a convention widely adopted in both TypeScript and JavaScript communities.

### The Rule in Practice

```typescript
// Avoid this:
class my_class {
    // implementation
}

// Do this:
class MyClass {
    // implementation
}
```

```javascript
// Avoid this:
class my_class {
    // implementation
}

// Do this:
class MyClass {
    // implementation
}
```

---

## Use PascalCase for interface names. (TypeScript only)

Using PascalCase for interface names helps distinguish interfaces from other identifiers.

### The Rule in Practice

```typescript
// Avoid this:
interface my_interface {
    // implementation
}

// Do this:
interface MyInterface {
    // implementation
}
```

---

## Private functions should be prefixed with an underscore. (TypeScript only)

Prefixing private functions with an underscore helps differentiate them from public functions, improving code readability by clearly indicating their intended scope.

### The Rule in Practice

```typescript
// Avoid this:
class Example {
    private doSomething() {
        // implementation
    }
}

// Do this:
class Example {
    private _doSomething() {
        // implementation
    }
}
```

---

## Avoid non-informative IDs.

Using generic or non-descriptive IDs such as `id1`, `temp`, or `link1` makes it difficult to understand the purpose and context of an element, slowing down debugging and future development. IDs should clearly convey the role of the element they identify.

### The Rule in Practice

```xml
<!-- Avoid this: -->
<Button text="Submit" id="link1" press="attachfunc" />
<Button text="Cancel" id="temp" press="handleCancel" />

<!-- Do this: -->
<Button text="Submit" id="submitButton" press="handleSubmit" />
<Button text="Cancel" id="cancelButton" press="handleCancel" />
```

```javascript
// Avoid this:
document.getElementById("id1");
document.getElementById("temp");

// Do this:
document.getElementById("submitButton");
document.getElementById("userNameInput");
```

> **Why it matters:** Non-informative IDs force developers to trace the entire codebase to understand what an element represents. Descriptive IDs make code self-documenting and accelerate both development and debugging.

