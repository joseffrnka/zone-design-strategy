# Zone Design Strategy

The lens for every Zone design spec and Claude Design prompt. **Visual identity (color,
type, tokens) is intentionally NOT here — it lives in the Zone design system in Claude
Design. Never re-specify it in a spec or prompt; mentioning it twice confuses the model.**

## Brand cornerstone
- **Vision:** Make finance run itself.
- **Mission:** Modernize financial operations — unify workflows, operationalize data, make
  complex processes effortless.

## Users & context
Finance teams and finance leaders on a NetSuite-native platform (complex billing & revenue
recognition, AP automation, FP&A reporting). Enterprise software; high stakes; low tolerance
for operational missteps.

## 4 Core Design Values
- **Natural** — interactions feel simple and intuitive, inspired by natural behavior.
- **Certain** — consistent, predictable rules that reduce cognitive load.
- **Meaningful** — every interaction has a purpose, with clear goals and immediate feedback.
- **Growing** — designed for discoverability so users leverage more value over time.

## 4 Interface Principles
- **Proximity & Alignment** — group related items; align elements to ease consumption.
- **Contrast** — create hierarchy so users find information fast.
- **Repetition** — reuse patterns to lower the learning curve.
- **Direct Manipulation** — let users act in place rather than disrupting flow with reloads.

## UI system
- **Ant Design** is the UI library.
- Zone components = **ZIN UI Kit** (Figma key `hm0cTxC2h13Hv3RgdpOEek`).
- Canonical tokens/components live in **Claude Design** — reference them, never redraw them.

## Confirmation convention
Use blocking overlay modals for consequential actions (destructive, or rewriting state) —
not Popconfirm. Popconfirm is reserved for lightweight in-context confirms.

## Voice & content rules (for UI copy)
- Follow the AP Stylebook.
- Sentence case everywhere **except Title Case for button copy**.
- Contractions OK — friendly, human tone.
- Short, impactful sentences; periods over run-ons.
- En-dash with surrounding spaces ( – ), not em-dash.
- Ampersands only where space is tight (headlines, buttons); not in body copy.
- Numbers one–nine spelled out; 10 and above as numerals.

## The one rule that overrides convenience
Visual identity = the Zone design system in Claude Design. Do not re-specify color, type, or
tokens in any spec or prompt this skill produces.
