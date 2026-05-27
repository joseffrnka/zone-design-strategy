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
```
Check with `/plugin` → installed; if `superpowers` is listed, you're set.

## Install (one time)

In Claude Code:

1. Add this marketplace:
   ```
   /plugin marketplace add joseffrnka/zone-design-strategy
   ```
2. Install the plugin:
   ```
   /plugin install zone-design
   ```
3. Restart Claude Code if prompted.

## Use

In any project (or any folder), run:
```
/zone-design:design-spec
```

The skill will gather your inputs (docs, Figma links, screenshots), walk you through a
design-strategy-informed brainstorm, then write a design spec and a Claude Design prompt into
**your** chosen location (defaults to `./docs/superpowers/` in the current directory).

## Updating the design strategy

The design strategy lives in
`plugins/zone-design/skills/design-spec/references/design-strategy.md`. Edit it, bump the
`version` in `plugins/zone-design/.claude-plugin/plugin.json`, and PMs pick up the change on
their next plugin update.

## Notes
- Generated specs/prompts are saved to your own location — never to this repo.
- Visual identity (color, type, tokens) lives in the Zone design system in Claude Design and
  is intentionally never restated by the skill.
