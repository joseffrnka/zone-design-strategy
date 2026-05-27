---
name: design-spec
description: Use when a Zone PM or designer starts shaping a new feature, screen, redesign, or product flow and needs a design specification and/or a Claude Design prompt grounded in Zone's design strategy. Use when asked to "design", "spec out", "write a PRD for", or "make a Claude Design prompt for" a Zone product surface.
---

# Zone Design Spec

## Overview
Layer Zone's design strategy onto superpowers, then produce two artifacts: a **design
specification** and a ready-to-paste **Claude Design prompt**. This skill orchestrates; it
does not reimplement brainstorming.

**REQUIRED SUB-SKILL:** Use superpowers:brainstorming as the conversation engine.
**Visual identity (color, type, tokens) lives in Claude Design — never restate it.**

## Workflow

Announce: "Using the Zone design-spec skill."

1. **Load Zone context.** Read all three files in `references/` (design strategy, spec
   template, Claude Design prompt template) before asking anything.
2. **Confirm save location.** Outputs go to the user's own location — never to the skill's
   repo. Default to `./docs/superpowers/{specs,prompts}` in the current directory; if not in
   a project directory, fall back to `~/zone-design-specs/<slug>/`. Confirm before writing.
   Create `plans/` and `roadmap/` only on demand.
3. **Guided intake.** Open with: "Before we design, let's gather what you've already got.
   Share whatever exists — links, files, screenshots. Anything you don't have, just say
   'skip' and we'll treat it as an open question." Then ask (gather-and-proceed — never
   block):
   - Project name + tracker ID (Jira design ticket)?
   - Functional design doc? Technical design doc? PRD / user stories / acceptance criteria?
     Other context (research, Gong, Slack, prior decisions)?
   - In 1–2 sentences: what are we building, for which finance persona/job? What does success
     look like?
   - Which existing screens does this touch? Figma links for them? Screenshots of the current
     screens? POC / competitor / inspiration references?
   **Ingest what's provided** using available tools (Atlassian MCP for Jira/Confluence,
   Google Drive MCP for Docs/Slides, Figma MCP for Figma, WebFetch for public URLs, Read for
   local files/images). Save screenshots into `specs/screenshots/`. Pre-fill the spec from
   what you ingest rather than re-asking. Summarize captured-vs-missing.
4. **Brainstorm with Zone lenses.** Invoke `/superpowers:using-superpowers`, which routes into
   `/superpowers:brainstorming`. Inject Zone-specific questions the stock flow omits: which of
   the 4 Core Values / 4 Interface Principles apply, the target finance persona/job, design-
   system implications (Ant / ZIN UI Kit components, gaps), every state (empty/loading/error/
   success), and UI copy against the voice rules. With intake done, mostly confirm.
5. **Write the design spec** to `specs/` using `references/design-spec-template.md`. Fill the
   header, tag open questions (🚦/🧭/💼/✅), and map acceptance criteria.
6. **Generate the Claude Design prompt automatically** once the spec is approved. Write it to
   `prompts/` using `references/claude-design-prompt-template.md`. Then run the spec→prompt
   self-review: map every spec section to a prompt section; confirm no color/type is restated,
   out-of-scope mirrors the spec, and named states match. For extending an existing prototype,
   use the follow-up prompt pattern.
7. **Stop here.** Hand the user the spec + prompt. If they want an implementation plan, point
   them to `/superpowers:writing-plans`. Do not produce a plan yourself.

## Red flags — STOP
- Restating colors, fonts, or tokens in a spec or prompt → they live in Claude Design.
- Writing outputs into the skill's own plugin repo → they go to the user's location.
- Skipping intake and asking cold mid-brainstorm → run intake first.
- Producing the implementation plan here → that's `/superpowers:writing-plans`.
