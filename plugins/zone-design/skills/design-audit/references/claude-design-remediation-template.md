# Claude Design remediation prompt — {{Project name}}

> **For repo readers:** the body below (between the PROMPT markers) is pasted directly into the
> **same** Claude Design project this audit ran against. Unlike
> `../design-spec/references/claude-design-prompt-template.md`, this is not a from-scratch build
> — the prototype already exists; this prompt only describes changes to make to it.
>
> **Companion audit:** ../audits/{{project-slug}}-{{date}}/audit.html
> **Companion findings:** ../audits/{{project-slug}}-{{date}}/findings.md

## Variables to fill before pasting
| Variable | Source | Default |
|----------|--------|---------|
| {{Project name}} | intake | — |
| {{project-slug}} | intake | — |
| {{date}} | run date | — |
| {{items checked}} | `merged.itemsChecked` | — |
| {{items failed}} | `merged.itemsFailed` | — |

=== PROMPT START ===

# Fix pass: {{Project name}}

## Context
This is a revision pass on an existing prototype, not a new build. A design audit against
checklist.design's checklists plus a general UX-critique framework checked {{items checked}} items
and found {{items failed}} that are missing, partially present, or unclear. Fix them in place — do
not redesign screens that weren't flagged.

## Do not touch
Any screen or state not listed under "Fixes to make" below.

## Fixes to make
{{One entry per failed item from `merged.byScreen`, already ordered by the audit panel's severity
ranking (accessibility items first, then missing, then partially-present, then can't-tell) —
grouped by screen:}}
### {{Screen name}}
- **[{{status}}] {{item}} ({{checklistFile}})** — {{reason}}. Fix: {{fix}}

## Constraints and rules
- Only Zone UI Kit components; no new tokens; keep the shell/template intact.
- Do not restate colors or type — they're already loaded in this Claude Design project.

## Can't-tell items (need a real state to check, not fixes yet)
{{Every finding with status "cant-tell" — these aren't defects to fix, they're gaps in what this
audit could verify from a static capture. List them so a follow-up pass (or a screenshot of the
actual state) can resolve them.}}

## Final output
Re-render every screen touched by a fix (including any state that changed), so the next audit pass
can diff against this one.

=== PROMPT END ===

## Self-review (findings → prompt)
Map every "missing" and "partially-present" finding to a line under "Fixes to make." List any
finding with no prompt coverage. Confirm: no colors/type restated; untouched screens are explicitly
listed; "cant-tell" items are separated out, not mixed into "Fixes to make."
