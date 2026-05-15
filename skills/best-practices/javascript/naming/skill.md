---
name: naming
description: Use when naming or renaming variables, functions, classes or interfaces in JavaScript code. 
when_to_use: |
  Also trigger on: "refactor this", "while you're at it", "any quick wins", "improve this a bit", "review this", or when editing existing JavaScript and an adjacent small cleanup is possible alongside the asked-for change. 
---

# AI Behavior
- Always apply the rules in this skill when editing JavaScript code, even if not explicitly asked for.
- When you see a violation of any of the rules in this skill, fix it without being asked, as long as it can be done in a small change alongside the requested edit.
- If you see a violation of any of the rules in this skill that cannot be fixed in a small change, leave a comment in the code suggesting the improvement, so that it can be addressed in a future edit.
- When you fix a violation of any of the rules in this skill, also look for and fix any other violations of the rules in this skill that you see in the same code, as long as they can be fixed in small changes alongside the requested edit.
- Always prioritize fixing violations of the rules in this skill over other types of improvements, as long as they can be done in small changes alongside the requested edit.

# Rules list

## Private functions should be prefixed with an underscore.

Prefixing private functions with an underscore can help differentiate them from public functions, improving code readability and maintainability by clearly indicating their intended scope.

### The Rule in Practice

```javascript
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

## Use meaningful variable names.

Using meaningful variable names can improve code readability and maintainability by clearly indicating the purpose of each variable.

### The Rule in Practice

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

Using camelCase for variable and function names can improve code readability and maintainability by following a consistent naming convention. This convention is widely adopted in the JavaScript community and helps distinguish variables and functions from other types of identifiers.

### The Rule in Practice

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


## Use PascalCase for class and interface names.

Using PascalCase for class and interface names can improve code readability and maintainability by following a consistent naming convention. This convention is widely adopted in the JavaScript community and helps distinguish classes and interfaces from other types of identifiers.

### The Rule in Practice

```javascript
// Avoid this:
class my_class {
    // implementation
}
interface my_interface {
    // implementation
}

// Do this:
class MyClass {
    // implementation
}

interface MyInterface {
    // implementation
}
```