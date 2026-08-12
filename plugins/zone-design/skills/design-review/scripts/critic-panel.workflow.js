export const meta = {
  name: 'design-review-critic-panel',
  description:
    'Run the 4-critic blind adversarial design-review panel and reconcile into one baseline score',
  phases: [{ title: 'Critique' }, { title: 'Reconcile' }],
}

// `args` arrives JSON-encoded as a string in this environment rather than already parsed —
// parse defensively so the rest of the script can use it as an object either way.
const params = typeof args === 'string' ? JSON.parse(args) : args

const CRITIC_SCHEMA = {
  type: 'object',
  required: ['critic', 'score', 'findings', 'blindSpot'],
  properties: {
    critic: { type: 'string' },
    score: { type: 'integer', minimum: 0, maximum: 10 },
    findings: {
      type: 'array',
      items: {
        type: 'object',
        required: ['screen', 'defect', 'fix', 'severity'],
        properties: {
          screen: { type: 'string' },
          defect: { type: 'string' },
          fix: { type: 'string' },
          severity: { type: 'string', enum: ['must-fix', 'should-fix', 'nice-to-have'] },
        },
      },
    },
    blindSpot: { type: 'string' },
  },
}

const OPPORTUNITY_SCHEMA = {
  type: 'object',
  required: ['reach', 'proposals'],
  properties: {
    reach: { type: 'integer', minimum: 0, maximum: 10 },
    proposals: {
      type: 'array',
      items: {
        type: 'object',
        required: ['screen', 'proposal', 'builtFrom'],
        properties: {
          screen: { type: 'string' },
          proposal: { type: 'string' },
          builtFrom: { type: 'string' },
        },
      },
    },
  },
}

const RECONCILE_SCHEMA = {
  type: 'object',
  required: ['blindBaseline', 'perDimension', 'hardGates', 'backlog'],
  properties: {
    blindBaseline: { type: 'integer', minimum: 0, maximum: 10 },
    perDimension: {
      type: 'array',
      items: {
        type: 'object',
        required: ['dimension', 'score'],
        properties: { dimension: { type: 'string' }, score: { type: 'integer' } },
      },
    },
    hardGates: {
      type: 'array',
      items: {
        type: 'object',
        required: ['gate', 'pass', 'detail'],
        properties: {
          gate: { type: 'string' },
          pass: { type: 'boolean' },
          detail: { type: 'string' },
        },
      },
    },
    backlog: {
      type: 'array',
      items: {
        type: 'object',
        required: ['screen', 'defect', 'fix', 'severity'],
        properties: {
          screen: { type: 'string' },
          defect: { type: 'string' },
          fix: { type: 'string' },
          severity: { type: 'string', enum: ['must-fix', 'should-fix', 'nice-to-have'] },
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

function gradingDiscipline() {
  return [
    "Grade BLIND: you were not shown any self-score or any other critic's output.",
    '"Looks good" is a 6, not a 9. A 9 or 10 is work that would survive senior critique untouched.',
    'A dimension scores 8+ ONLY if you actually verified it from what you were given (rendered, measured, contrast-checked, keyboard-tested) — never credit something only because the code looks right.',
    'Cite evidence: name the screen and be specific about the exact fix, not just the defect.',
  ].join('\n')
}

phase('Critique')
const critiqueResults = await parallel(
  params.critics.map((critic) => () =>
    agent(
      [
        critic.persona,
        '',
        gradingDiscipline(),
        '',
        'RUBRIC:',
        params.rubric,
        '',
        'TOKEN REFERENCE (compare against this — design-strategy.md has no literal values):',
        params.tokenReference,
        '',
        'SCREENS TO REVIEW:',
        screenBlock(params.screens),
        '',
        'Read every screenshot and source file listed above before scoring. Return your findings via the required structured output.',
      ].join('\n'),
      {
        label: `critic:${critic.key}`,
        phase: 'Critique',
        schema: critic.key === 'opportunity' ? OPPORTUNITY_SCHEMA : CRITIC_SCHEMA,
      }
    )
  )
)

const [craft, ux, tokens, opportunity] = critiqueResults

phase('Reconcile')
const reconciled = await agent(
  [
    'You are reconciling three independent blind adversarial critics (craft/brand/fidelity, UX/a11y/motion, tokens/code/content) plus one generative opportunity critic into ONE official scorecard for this design review.',
    "The three adversarial scores set the blind baseline — average them; do not let the generative critic's reach score raise it. The generative critic's proposals are direction for next time, not part of the score.",
    'Apply these hard gates from the rubric; a failure blocks "done" regardless of score:',
    params.rubric,
    '',
    'CRAFT CRITIC RESULT:',
    JSON.stringify(craft),
    'UX CRITIC RESULT:',
    JSON.stringify(ux),
    'TOKENS CRITIC RESULT:',
    JSON.stringify(tokens),
    'OPPORTUNITY CRITIC RESULT:',
    JSON.stringify(opportunity),
    '',
    params.priorRun
      ? `PRIOR RUN (for the byte-diff / did-it-actually-change gate): ${JSON.stringify(params.priorRun)}`
      : 'No prior run given — skip the byte-diff gate.',
    '',
    'Merge overlapping findings from the three adversarial critics into one backlog, ordered highest-leverage first. Mark hard-gate failures as must-fix.',
  ].join('\n'),
  { label: 'reconcile', phase: 'Reconcile', schema: RECONCILE_SCHEMA }
)

return { critics: { craft, ux, tokens, opportunity }, reconciled }
