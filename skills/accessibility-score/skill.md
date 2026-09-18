---
name: accessibility-score
description: Use when asked to compute, generate, or report an accessibility score (out of 100) for this SAPUI5/Fiori app, based on both SAP Support Assistant findings and conformity to accessibility best practices of the MCP DevOps skill.
when_to_use: |
  Also trigger on: "score d'accessibilité", "note d'accessibilité", "évalue l'accessibilité", "accessibility score", "compare accessible/non accessible", or any request to quantify how accessible the app currently is.
---

# AI Behavior

- Always compute the score from **two sources only**, never from personal judgment alone:
  1. **SAP Support Assistant** issues on the *Accessibility* category (20% of the final score).
  2. **Conformity to the `best-practices/accessibility` mcp devops skill**, checked against the actual project code (80% of the final score).
- Never skip a source: if one cannot be obtained (e.g. no browser/dev server available), say so explicitly and give a partial/estimated score instead of silently guessing numbers.
- Always show the two sub-scores and the breakdown, not just the final number, so the result is auditable.
- When re-running the score later (e.g. to compare before/after a fix), redo both steps fresh — do not reuse stale counts from a previous run.

## Step 1 — SAP Support Assistant score (20%)

1. Make sure the app's dev server is running, then open the app in a browser page via the chrome-devtools MCP tools only.
2. Press `Control+Alt+Shift+P` to open the Technical Information dialog, then click **"Activate Support Assistant"**.
3. Inside the Support Assistant frame, click **Analyze**, switch to the **Issues** tab, and set the **Category** filter to **Accessibility only** (ignore every other category — Usage, Functionality, Performance, etc. are out of scope for this score).
4. Count the **High / Medium / Low**  reported issues for the Accessibility category. And keep this number, no need to record the individual issues themselves — only the counts matter for the score calculation. DO NOT TRY TO KNOW WHAT EACH ISSUE REFERS TO OR ITS DETAILS.
5. Compute the sub-score:
   ```
   ssaScore = max(0, 100 - (High * 20 + Medium * 8 + Low * 2))
   ```

## Step 2 — mcp devops best-practices/accessibility conformity (80%)

1. Connect to the mcp devops server and fetch the current rules live (`best-practices/accessibility` skill, via `mcp_devops_fetch_skill`) — never rely on a cached/remembered/hardcoded copy, the rule set can evolve between runs.
2. Walk the project's SAPUI5 views/fragments (`webapp/view/**/*.xml`) and controllers (`webapp/controller/**/*.ts`) and check **every rule returned by that fetch** against the real code — not just against memory notes.
3. The score is based on **violations, not compliance**: for each rule, count every element that fails to respect it (each non-compliant element/instance = 1 violation). A rule with zero applicable elements simply contributes zero violations (don't penalize for controls the app doesn't use).
4. Compute the sub-score by deducting a fixed penalty per violation found:
   ```
   conformityScore = max(0, 100 - (totalViolations * penaltyPerViolation))
   ```
   Use `penaltyPerViolation = 2` by default (tune down for very large codebases with many small views, so the score doesn't bottom out at 0 too easily — state the value used when reporting the score).

## Step 3 — final score

```
finalScore = round(0.8 * conformityScore + 0.2 * ssaScore)   // out of 100, 100 = best
```

Report the final score to the user along with the two sub-scores and, for the conformity part, which rules failed and why (so it's actionable, not just a number) only for the `best-practices/accessibility` conformity check.

Always accompany the final score with a recap table listing every transgression found (across conformity check), with one row per violation (not one row per rule) so each occurrence is traceable:

| Rule transgressed | Violations | Location | Reason flagged |
|---|---|---|---|
| e.g. `sap.m.Image` missing `alt`/`decorative` | 3 | `webapp/view/Detail.view.xml` (lines/control IDs) | Screen readers can't announce the image / no accessible name provided |

- **Rule transgressed**: the exact rule name/id from the fetched `best-practices/accessibility` skill only, do not do it for the Support Assistant rule id for SSA-sourced issues.
- **Violations**: count of occurrences for that rule at that location.
- **Location**: file path (and line/control id when available) where the violation occurs; group by location if the same rule is violated in multiple places, one row per location.
- **Reason flagged**: brief explanation of why this specific instance breaks the rule.

If there are zero violations, state that explicitly instead of showing an empty table.
