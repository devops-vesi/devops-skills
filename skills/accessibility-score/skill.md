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

1. Make sure the app's dev server is running, then open the app in a browser page via the chrome-devtools MCP tools (or the built-in browser tools if the chrome-devtools iframe isn't reachable — the Support Assistant UI runs in a **cross-origin iframe** `sap-ui-supportToolsFrame`, which plain `evaluate_script`/`take_snapshot` cannot see into; use `run_playwright_code` with `page.frames().find(f => f.url().includes('supportRules'))` to interact with it).
2. Press `Control+Alt+Shift+P` to open the Technical Information dialog, then click **"Activate Support Assistant"**.
3. Inside the Support Assistant frame, click **Analyze**, switch to the **Issues** tab, and set the **Category** filter to **Accessibility only** (ignore every other category — Usage, Functionality, Performance, etc. are out of scope for this score).
4. Read the **High / Medium / Low** counts reported for the Accessibility category.
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

Report the final score to the user along with the two sub-scores and, for the conformity part, which rules failed and why (so it's actionable, not just a number).
