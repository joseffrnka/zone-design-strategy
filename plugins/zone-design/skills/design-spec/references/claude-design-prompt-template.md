# Claude Design build prompt — {{Project name}}

> **For repo readers:** the body below (between the PROMPT markers) is pasted directly into
> Claude Design (claude.ai/design). It assumes the **Zone design system** and the relevant
> **shell/template** are already loaded in the Claude Design project. Iterate on the prompt
> here in git; paste into Claude Design to (re)generate.
>
> **Companion spec:** ../specs/{{spec-filename}}.md

## Variables to fill before pasting
| Variable | Source | Default |
|----------|--------|---------|
| {{VAR}} | {{source}} | {{default}} |

=== PROMPT START ===

# Design: {{Project name}}

## Context
{{Who it's for (finance persona), what it is, what's different from the real product.}}

## Start from existing assets
- **Reuse the {{shell/template name}}** for the application shell — do not redraw it.
- **Use the Zone UI Kit (ZIN) for every component.** No custom components. If a component is
  missing, note it and propose adding it to the kit rather than inventing one inline.
- **Do not introduce new tokens** — use the design system's existing color, spacing, radius,
  and typography. (Colors and type are already loaded in Claude Design; never restate them.)

## Screens to produce
### Screen 1 — {{name}}
{{Layout. Then named states:}}
- **State A — {{name}}:** {{what differs}}
- **State B — {{name}}:** {{what differs}}

## Modals
{{Blocking overlay modals: trigger, title, body, buttons.}}

## Prototype interaction flow
{{Wire click targets: Screen/State → Screen/State.}}

## Constraints and rules
- Only Zone UI Kit components; no new tokens; keep the shell template intact.

## What to ignore (out of scope)
- {{explicit non-goals}}

## Open questions to flag during build (do not solve)
- {{flag as a frame comment, don't pick a behavior}}

## Final output
{{Deliverable + who reviews it + what's next.}}

=== PROMPT END ===

## Self-review (spec → prompt)
Map every spec section to a prompt section; list any spec requirement with no prompt
coverage. Confirm: no colors/type restated; out-of-scope mirrors the spec; named states match.

---

## Follow-up prompt pattern (additive)
To extend an existing prototype: state it's additive, reference any uploaded screenshot,
describe only the new screen, and wire the new click flow. Do not touch already-built screens.
