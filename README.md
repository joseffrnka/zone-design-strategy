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

## Use — reviewing an existing prototype

In any project (or any folder), run:
```
/zone-design:design-review
```

One-time setup for this skill's screenshot pipeline:
```
cd plugins/zone-design/skills/design-review/scripts && npm install && npx playwright install chromium
```
(Run this once per machine — the plugin's own `scripts/` folder, not your project.)

The skill will ask for a Claude Design project link and the file(s) to review, pull the source,
render and screenshot every screen it can find, run a blind 4-critic panel against the design
strategy, then publish a visual-review Artifact and write a remediation prompt you can paste
back into the same Claude Design project.

## Updating the design strategy

The design strategy lives in
`plugins/zone-design/skills/design-spec/references/design-strategy.md`. Edit it, bump the
`version` in `plugins/zone-design/.claude-plugin/plugin.json`, and PMs pick up the change on
their next plugin update. `design-review` proposes edits here automatically when its panel finds
the same miss twice across separate reviews — those still need your approval before they land.

## Notes
- Generated specs/prompts are saved to your own location — never to this repo.
- Visual identity (color, type, tokens) lives in the Zone design system in Claude Design and
  is intentionally never restated by the skill.
- `design-review`'s findings log (`plugins/zone-design/skills/design-review/design-review-log.md`)
  is shared across every prototype it reviews — it lives in this repo, not in your project.
