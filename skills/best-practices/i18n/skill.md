---
name: i18n
description: Use when writing or reviewing SAPUI5 i18n .properties files that contain translatable text.
when_to_use: |
  Also trigger on: "refactor this", "while you're at it", "any quick wins", "improve this a bit", "review this", or when editing SAPUI5 i18n .properties resource files that contain translatable labels, titles, or messages.
---

# AI Behavior
- Always apply the rules in this skill when editing SAPUI5 i18n .properties files, even if not explicitly asked for.
- When you see a violation of any of the rules in this skill, fix it without being asked, as long as it can be done in a small change alongside the requested edit.
- If you see a violation of any of the rules in this skill that cannot be fixed in a small change, leave a comment in the code suggesting the improvement, so that it can be addressed in a future edit.
- When you fix a violation of any of the rules in this skill, also look for and fix any other violations of the rules in this skill that you see in the same code, as long as they can be fixed in small changes alongside the requested edit.
- Always prioritize fixing violations of the rules in this skill over other types of improvements, as long as they can be done in small changes alongside the requested edit.

# Rules list

## Use Unicode escape sequences instead of raw special characters.

In `.properties` files, replace raw special characters — such as curly apostrophes (`'`), accented characters, or other non-ASCII glyphs — with their Unicode escape sequences (e.g., `\u2019` for `'`). This prevents encoding issues when the file is read across different platforms, editors, or locales.

### The Rule in Practice

```properties
# Avoid this — raw special character used directly:
AbsenceLabel = Type D'absence
ApproverLabel = Nom de l'approbateur
AppTitle = Suivi des réservations d'équipements

# Do this — use Unicode escape sequences:
AbsenceLabel = Type D\u2019absence
ApproverLabel = Nom de l\u2019approbateur
AppTitle = Suivi des r\u00e9servations d\u2019\u00e9quipements
```

> **Why it matters:** `.properties` files are read as ISO-8859-1 by default in Java and many SAPUI5 toolchains. Raw non-ASCII characters can become garbled or cause parsing errors when the file is opened or processed in environments with different default encodings. Unicode escape sequences are always safe regardless of the file encoding.

---
