# {{Project name}} — Design Spec

**Project:** {{tracker ID / Jira}} · {{stage, e.g. Stage 1}}
**Owner (UX):** {{name}} · **PM:** {{name}}
**Date:** {{YYYY-MM-DD}}
**Status:** Draft for review

> **Stage boundary.** This spec covers {{this stage}} only. {{What is explicitly deferred}}.
> See the roadmap for later stages. When in doubt, default to "out of scope — flag it."

---

## 1 · Purpose
{{1–2 paragraphs: what this delivers and for which finance persona/job. Tie to the mission.}}

**Reference documents**
- Functional design: {{link}}
- Technical design: {{link}}
- Tracker: {{Jira ID}}
- Other context: {{Gong / research / Slack}}

## 2 · Success criteria
| # | Criterion | How the design supports it |
|---|-----------|----------------------------|
| AC1 | {{criterion}} | {{how}} |

## 3 · Scope of designs
### 3.1 In scope
1. {{screen / change}}
### 3.2 Out of scope
- {{deferred item — why}}

## 4 · Information architecture & flow
{{ASCII flow diagram of entry points → screens → outcomes}}

**Entry points:** {{A, B, …}}
**States:** {{table of step → user action → system response}}

## 5 · Reference: existing screens
For each existing screen this design touches:
- **{{Screen}}** — Figma: {{link}} · Screenshot: `./screenshots/{{file}}.png`
- **Component source of truth:** ZIN UI Kit (Figma `hm0cTxC2h13Hv3RgdpOEek`). List the kit
  components this spec relies on.

## 6 · {{Screen / change}} — detail
{{Layout, behavior tables, named states (A/B/C…). Apply the 4 values + 4 principles.}}

## 7 · Interaction / submit flow & per-state visuals
{{Per-state visuals; loading/empty/error/success; Direct-Manipulation choices.}}

## 8 · Confirmations (overlay modals)
{{Each modal: trigger, title, body, buttons. Blocking overlay, not Popconfirm.}}

## 9 · Open questions
Tag each: 🚦 V1-blocker · 🧭 V2-consideration · 💼 Business · ✅ Resolved.
1. {{question}} 🚦

## 10 · Mapping to acceptance criteria
| AC | Where addressed |
|----|-----------------|
| AC1 | §{{n}} |

## 11 · Deliverables checklist
- [ ] {{frame / state to produce}}

## 12 · Glossary
| Term | Meaning |
|------|---------|
| {{term}} | {{definition}} |
