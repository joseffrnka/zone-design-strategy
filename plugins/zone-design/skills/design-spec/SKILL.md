---
name: design-spec
description: Use when a Zone PM or designer starts shaping a new feature, screen, redesign, or product flow and needs a design specification and/or a Claude Design prompt grounded in Zone's design strategy. Use when asked to "design", "spec out", "write a PRD for", or "make a Claude Design prompt for" a Zone product surface.
---

# Zone Design Spec

## Overview
A front-end for superpowers. This skill **collects** the project context and **loads** Zone's
design strategy plus the two output templates, packs them into a single **design brief**, then
**hands off to superpowers** — which takes over and drives the work to two deliverables: a
**design specification** and a ready-to-paste **Claude Design prompt**.

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
3. **Assemble the design brief.** Build ONE prompt that contains:
   - the **Zone design strategy** — the lens (4 Core Values, 4 Interface Principles, Ant / ZIN
     UI Kit, voice rules) and the rule that **visual identity (color/type/tokens) lives in
     Claude Design and must never be restated**;
   - the **design-spec template** and the **Claude Design prompt template** verbatim, as the
     required output formats;
   - everything captured in intake (ingested content summarized, with links/paths);
   - the **deliverables**: (1) a design specification using the spec template, then (2) a
     Claude Design prompt using the prompt template — written to `docs/superpowers/{specs,
     prompts}/` in the user's project. These are the outcome **in place of the usual
     writing-plans step**; not code, not an implementation plan.
4. **Hand off to superpowers.** Invoke `/superpowers:using-superpowers` and give it the
   assembled brief as the task. **From here, superpowers drives** — let it run brainstorming
   and produce the two deliverables. Do not micromanage, override, or take control back. Tell
   the user to say **yes** when brainstorming offers the **Visual Companion** — its mockups and
   diagrams help shape the prototype.

## The brief must carry
- The two deliverables (design spec + Claude Design prompt) and where they're saved — stated as
  replacing the writing-plans step.
- The "never restate visual identity — it lives in Claude Design" rule.
- The Zone lens: 4 Core Values, 4 Interface Principles, Ant / ZIN UI Kit, voice rules.
- All ingested context, with links/paths.
