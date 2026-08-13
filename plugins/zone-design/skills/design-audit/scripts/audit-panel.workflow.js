export const meta = {
  name: 'design-audit-panel',
  description:
    'Select which checklists apply, audit each against the screens/source, merge into one failed-items backlog',
  phases: [{ title: 'Select' }, { title: 'Audit' }],
}

// `args` arrives JSON-encoded as a string in this environment rather than already parsed —
// parse defensively so the rest of the script can use it as an object either way.
// Everything below this line must read from `params`, never `args` — `args` stays in scope
// as the original (possibly-string) value, and a stray `args.foo` silently evaluates to
// `undefined` instead of throwing, since strings auto-box in JS.
const params = typeof args === 'string' ? JSON.parse(args) : args

const STATUS_VALUES = ['present', 'partially-present', 'missing', 'not-needed', 'cant-tell']

const SELECT_SCHEMA = {
  type: 'object',
  required: ['applicableChecklists'],
  properties: {
    applicableChecklists: {
      type: 'array',
      items: {
        type: 'object',
        required: ['filename', 'reason'],
        properties: {
          filename: { type: 'string' },
          reason: { type: 'string' },
        },
      },
    },
  },
}

const AUDIT_SCHEMA = {
  type: 'object',
  required: ['checklistFile', 'findings'],
  properties: {
    checklistFile: { type: 'string' },
    findings: {
      type: 'array',
      items: {
        type: 'object',
        required: ['screen', 'item', 'status', 'reason'],
        properties: {
          screen: { type: 'string' },
          item: { type: 'string' },
          status: { type: 'string', enum: STATUS_VALUES },
          reason: { type: 'string' },
          fix: { type: 'string' },
        },
      },
    },
  },
}

function screenBlock(screens) {
  return screens
    .map(
      (s) =>
        `### ${s.name}\nScreenshot: ${s.screenshotPath}\nSource: ${
          (s.sourcePaths && s.sourcePaths.join(', ')) || '(none captured — source-only fallback)'
        }`
    )
    .join('\n\n')
}

phase('Select')
const selection = await agent(
  [
    'You are selecting which checklists apply to this Claude Design prototype under audit.',
    'You will not run the audit yourself here — only decide which checklists from the index below',
    'are worth checking against these specific screens.',
    '',
    'Only select a checklist if it clearly matches something present in scope: a component that',
    'exists, or a flow that exists. Skip anything speculative — no kanban-board checklist if there',
    'is no kanban board, no billing checklist if there is no billing screen.',
    '',
    'CHECKLIST INDEX:',
    params.checklistIndex,
    '',
    'SCREENS IN SCOPE:',
    screenBlock(params.screens),
    '',
    'Return your selections via the required structured output — filename must exactly match a',
    'filename in backticks from the index above.',
  ].join('\n'),
  { label: 'select', phase: 'Select', schema: SELECT_SCHEMA }
)

const checklistsToAudit = [
  { filename: 'ux-critique-framework.md', content: params.uxCritiqueFramework, alwaysOn: true },
  ...selection.applicableChecklists.map((c) => ({
    filename: c.filename,
    path: `${params.skillDir}/references/checklists/${c.filename}`,
    alwaysOn: false,
  })),
]

phase('Audit')
const auditResults = await parallel(
  checklistsToAudit.map((c) => () =>
    agent(
      [
        'You are running a design audit against exactly one checklist.',
        '',
        params.checklistAuditMode,
        '',
        c.alwaysOn
          ? `CHECKLIST (always-on general UX-critique framework):\n${c.content}`
          : `Read the full checklist file first: ${c.path}`,
        '',
        'SCREENS TO AUDIT:',
        screenBlock(params.screens),
        '',
        `Report on every item in this checklist. Set "checklistFile" to exactly "${c.filename}".`,
        'For every item, give one finding per screen it is relevant to (or a single finding with',
        'screen set to "all screens" if the item is uniform across every screen). Return your',
        'findings via the required structured output.',
      ].join('\n'),
      { label: `audit:${c.filename}`, phase: 'Audit', schema: AUDIT_SCHEMA }
    )
  )
)

function rank(finding) {
  if (finding.checklistFile.includes('accessibility')) return 0
  if (finding.status === 'missing') return 1
  if (finding.status === 'partially-present') return 2
  return 3 // cant-tell
}

function mergeFindings(results) {
  const all = results
    .filter(Boolean)
    .flatMap((r) => r.findings.map((f) => ({ ...f, checklistFile: r.checklistFile })))
  const failed = all.filter(
    (f) => f.status === 'missing' || f.status === 'partially-present' || f.status === 'cant-tell'
  )
  failed.sort((a, b) => rank(a) - rank(b))

  const byScreen = {}
  for (const f of failed) {
    byScreen[f.screen] = byScreen[f.screen] || []
    byScreen[f.screen].push(f)
  }

  return {
    checklistsApplied: results.filter(Boolean).length,
    itemsChecked: all.length,
    itemsFailed: failed.length,
    byScreen,
  }
}

function diffAgainstPriorRun(merged, priorRun) {
  const key = (f) => `${f.screen}::${f.checklistFile}::${f.item}`
  const priorItems = priorRun.failedItems || []
  const priorKeys = new Set(priorItems.map(key))
  const currentFlat = Object.values(merged.byScreen).flat()
  const currentKeys = new Set(currentFlat.map(key))

  const stillFailing = currentFlat.filter((f) => priorKeys.has(key(f)))
  const newThisRun = currentFlat.filter((f) => !priorKeys.has(key(f)))
  const fixedSinceLastRun = priorItems.filter((f) => !currentKeys.has(key(f)))

  return { stillFailing, newThisRun, fixedSinceLastRun }
}

const merged = mergeFindings(auditResults)
const diff = params.priorRun ? diffAgainstPriorRun(merged, params.priorRun) : null

return { selection, auditResults, merged, diff }
