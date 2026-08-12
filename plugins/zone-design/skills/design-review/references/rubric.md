# Design-review rubric

Scorecard lines and hard gates the critic panel grades against. Weighted toward what the model
tends to miss (taste, coherence, craft) and away from what it already nails (does the layout
technically hold together) — per the eval-loop method.

## Scorecard (1-10 per line, per critic's lens)

1. **System fidelity** — every color, size, type style, and component traces back to the token
   reference (project `_ds/` files, or the Figma ZIN UI Kit as fallback).
2. **Coherence** — reads as one intentional product, not a stitched-together template.
3. **Craft** — spacing, states, and the small deliberate details are right.
4. **UX judgment** — states are handled, hierarchy is clear, tap targets are large enough.
5. **Accessibility** — text contrast is high enough to read, nothing depends on color alone,
   interactive elements carry the aria/keyboard support their role requires.

## Hard gates (block "done" regardless of score)

- Text contrast meets WCAG AA (4.5:1 body text, 3:1 large text/headings).
- Interactive targets are at least 44x44px.
- No banned characters or UI-as-glyph substitutions in copy.
- No two states that should differ rendering byte-identical to each other, or to a prior run's
  capture of the same screen (only checked when a prior run was given at intake) — a
  byte-identical pair means one of them never actually re-rendered.

## Promotion thresholds (for the memory/log step, not the score)

- A finding logged in `design-review-log.md` becomes a candidate to promote once it (or its
  general form) appears in **2 or more** separate review runs, across any project.
- A finding that is mechanically gate-checkable (contrast, tap size, banned characters) on its
  2nd occurrence is proposed as an addition to the **hard gates** above instead of prose in
  `design-strategy.md`.
