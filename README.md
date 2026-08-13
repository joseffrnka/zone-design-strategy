# Zone Design Strategy — Claude Code plugin

Turn a feature idea into a Zone **design specification** + a ready-to-paste **Claude Design
prompt**, grounded in Zone's design strategy. Built on top of
[superpowers](https://github.com/obra/superpowers).

## Prerequisite: superpowers

This plugin uses superpowers as its engine, so install that first (most people already have
it). In Claude Code:
```
/plugin marketplace add anthropics/claude-plugins-official
/plugin install superpowers
/reload-plugins
```
**When prompted for a scope, choose "you" (user scope)** so it's available in every project.
Check with `/plugin` → installed; if `superpowers` is listed, you're set.

## Install (one time)

In Claude Code:

1. Add this marketplace:
   ```
   /plugin marketplace add joseffrnka/zone-design-strategy
   ```
2. Install the plugin and reload:
   ```
   /plugin install zone-design
   /reload-plugins
   ```
   **When prompted for a scope, choose "you" (user scope)** — same as superpowers — so the skill
   works in every project, not just the current folder.
3. `/zone-design:design-spec` should now be available. Restart Claude Code only if it isn't.

## Use

In any project (or any folder), run:
```
/zone-design:design-spec
```

The skill will gather your inputs (docs, Figma links, screenshots), walk you through a
design-strategy-informed brainstorm, then write a design spec and a Claude Design prompt into
**your** chosen location (defaults to `./docs/superpowers/` in the current directory).

> **Important:** during the brainstorm you'll be asked whether to enable the **Visual
> Companion** for this session — **say yes**. It renders mockups and diagrams that help shape
> the prototype.

## Use — auditing an existing prototype

In any project (or any folder), run:
```
/zone-design:design-audit
```

The screenshot pipeline (Playwright + Chromium) installs itself into the plugin's own directory
the first time it's needed, wherever that is on your machine — you don't need to find or `cd`
into it yourself. That install happens once per machine, not once per project.

The skill will ask for a Claude Design project link and the file(s) to audit, pull the source,
render and screenshot every screen it can find, then run a blind checklist-audit panel against
checklist.design's vendored checklists (Design system + Flows + Web app categories) plus a
general UX-critique framework. It publishes a visual-audit Artifact and writes a remediation
prompt you can paste back into the same Claude Design project — a list of every checklist item
that's missing, partial, or unclear, with a fix for each. There is no score.

## Updating the design strategy

The design strategy lives in
`plugins/zone-design/skills/design-spec/references/design-strategy.md`. Edit it, bump the
`version` in `plugins/zone-design/.claude-plugin/plugin.json`, and PMs pick up the change on
their next plugin update. `design-audit` proposes edits here automatically when its panel finds
the same failed checklist item twice across separate audits — those still need your approval before they land.

## Notes
- Generated specs/prompts are saved to your own location — never to this repo.
- Visual identity (color, type, tokens) lives in the Zone design system in Claude Design and
  is intentionally never restated by the skill.
- `design-audit`'s findings log (`plugins/zone-design/skills/design-audit/design-audit-log.md`)
  is shared across every prototype it audits — it lives in this repo, not in your project.
