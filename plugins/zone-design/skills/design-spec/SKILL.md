---
name: design-spec
description: Use when a Zone PM or designer starts shaping a new feature, screen, redesign, or product flow and needs a design specification and/or a Claude Design prompt grounded in Zone's design strategy. Use when asked to "design", "spec out", "write a PRD for", or "make a Claude Design prompt for" a Zone product surface.
---

# Zone Design Spec

## Overview
A front-end for superpowers. This skill **collects** the project context and **loads** Zone's
design strategy plus the two output templates, writes them into a single **design brief file**,
then **hands off to superpowers by path** — which takes over and drives the work to two
deliverables: a **design specification** and a ready-to-paste **Claude Design prompt**.

**superpowers is in charge once you hand off.** This skill only prepares the brief — it does
not drive the outcome, retain control, or override superpowers' flow.

## Workflow

Announce: "Using the Zone design-spec skill to prepare your design brief."

1. **Load Zone context.** Read all three `references/` files — `design-strategy.md`,
   `design-spec-template.md`, `claude-design-prompt-template.md`. Their content goes into the
   brief.
2. **Intake — one question at a time.** Open: "I'll ask a few short questions one at a time —
   paste a link, file path, or text for each, or type **skip**. The more you share, the less
   I'll ask later." Ask these in order, one by one, waiting for each answer (never dump the
   list); accept **skip** for any:
   - Project name + tracker ID (the Jira design ticket)?
   - In 1–2 sentences: what are we building, for which finance persona/job? What does success
     look like?
   - Functional design doc?
   - Technical design doc?
   - PRD / user stories / acceptance criteria?
   - Other context — research, Gong calls, Slack threads, prior decisions?
   - Which existing screens does this touch? Figma links for them?
   - Screenshots of the current screens?
   - Any POC, competitor, or inspiration references?

   Ingest each item as it's given (Atlassian MCP = Jira/Confluence, Google Drive MCP =
   Docs/Slides, Figma MCP = Figma, WebFetch = public URLs, Read = local files/images). Save
   screenshots to `docs/superpowers/specs/screenshots/`. Summarize captured-vs-missing.
3. **Write the design brief to a FILE.** Do not build an in-message prompt. Write the brief to
   `docs/superpowers/<topic>-brief.md` in the user's project (create `docs/superpowers/` if
   missing; `<topic>` = a short slug from the project name). *Why a file: the Skill tool only
   carries a short args string, and a fresh/subagent context won't have your loaded references —
   a local path survives the handoff and beats GitHub links (no network/auth, no version drift,
   no public exposure of finance content).* The brief must contain, in this order:
   a. **A mandatory-brainstorming instruction** — superpowers MUST run
      `/superpowers:brainstorming` first and never skip it. Intake "skip" answers skip only that
      one intake question, never the brainstorming phase. Do not fabricate context or jump
      straight to the deliverables.
   b. **The two deliverables and their save paths** — (1) a design spec at
      `docs/superpowers/specs/<topic>-design.md` using the spec template, then (2) a Claude
      Design prompt at `docs/superpowers/prompts/<topic>-claude-design-prompt.md` using the
      prompt template — stated as **replacing the usual writing-plans step** (not code, not a
      plan).
   c. **`design-strategy.md` inlined verbatim** — the Zone lens; it carries the 4 Core Values,
      4 Interface Principles, Ant / ZIN UI Kit, voice rules, and the "never restate visual
      identity" rule. It is the single source of truth — don't re-list these separately.
   d. **`design-spec-template.md` and `claude-design-prompt-template.md` inlined verbatim** — the
      required output formats.
   e. **All ingested intake context**, with links/paths (screenshots under
      `docs/superpowers/specs/screenshots/`).
4. **Hand off to superpowers — the brief's absolute path is mandatory.** Invoke
   `/superpowers:using-superpowers`; the handoff string MUST point it to the brief and tell it
   to read it first. Use the **absolute** path so it resolves from any context, e.g.:
   > "Read the full design brief at `<abs-path>/docs/superpowers/<topic>-brief.md` — it contains
   > the Zone design strategy, both output templates verbatim, and all ingested context. Run
   > brainstorming first (do NOT skip it — any skipped intake questions become open questions),
   > then produce the two deliverables it specifies, in place of the writing-plans step."

   **From here, superpowers drives** — let it run brainstorming and produce the two deliverables.
   Do not micromanage, override, or take control back. Tell the user to say **yes** when
   brainstorming offers the **Visual Companion** — its mockups and diagrams help shape the
   prototype.

## The brief (`docs/superpowers/<topic>-brief.md`) must carry
- A **mandatory-brainstorming instruction**: superpowers runs `/superpowers:brainstorming` first
  and never skips it; "skip" applies only to a single intake question, never the phase.
- The two deliverables (design spec + Claude Design prompt) and their save paths — stated as
  replacing the writing-plans step.
- `design-strategy.md` inlined verbatim (the Zone lens + "never restate visual identity" rule —
  the single source of truth for the 4 Values, 4 Principles, Ant / ZIN UI Kit, voice rules).
- `design-spec-template.md` and `claude-design-prompt-template.md` inlined verbatim.
- All ingested intake context, with links/paths.

Its **absolute path** is a required part of the step-4 handoff string.
