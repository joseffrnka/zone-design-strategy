# Claude Design remediation prompt — {{Project name}}

> **For repo readers:** the body below (between the PROMPT markers) is pasted directly into the
> **same** Claude Design project this review ran against. Unlike
> `../design-spec/references/claude-design-prompt-template.md`, this is not a from-scratch build
> — the prototype already exists; this prompt only describes changes to make to it.
>
> **Companion review:** ../reviews/{{project-slug}}-{{date}}/review.html
> **Companion scorecard:** ../reviews/{{project-slug}}-{{date}}/scorecard.md

## Variables to fill before pasting
| Variable | Source | Default |
|----------|--------|---------|
| {{Project name}} | intake | — |
| {{project-slug}} | intake | — |
| {{date}} | run date | — |
| {{blind baseline}} | `reconciled.blindBaseline` | — |

=== PROMPT START ===

# Fix pass: {{Project name}}

## Context
This is a revision pass on an existing prototype, not a new build. A blind design-review panel
scored it {{blind baseline}}/10 and found the issues below. Fix them in place — do not redesign
screens that weren't flagged.

## Do not touch
Any screen or state not listed under "Fixes to make" below. Preserve intentional choices the
panel flagged as improvements rather than defects (see "Flagged as improvement, not touched").

## Fixes to make
{{One entry per confirmed finding, ordered highest-leverage first, grouped by screen:}}
### {{Screen name}}
- **[{{must-fix|should-fix|nice-to-have}}] {{defect}}** — {{exact fix}}

## Flagged as improvement, not touched
{{Any deviation from spec/system the panel called out as good — list so it's clear these are
intentional and should survive future passes too.}}

## Constraints and rules
- Only Zone UI Kit components; no new tokens; keep the shell/template intact.
- Do not restate colors or type — they're already loaded in this Claude Design project.

## Open questions to flag during the fix (do not solve)
{{Anything the panel flagged as a genuine open question rather than a clear defect.}}

## Final output
Re-render every screen touched by a fix (including any state that changed), so the next review
pass can byte-diff against this one.

=== PROMPT END ===

## Self-review (scorecard → prompt)
Map every must-fix and should-fix finding in the scorecard to a line under "Fixes to make." List
any finding with no prompt coverage. Confirm: no colors/type restated; untouched screens are
explicitly listed; nice-to-haves are present but clearly lower priority than must/should-fix.
