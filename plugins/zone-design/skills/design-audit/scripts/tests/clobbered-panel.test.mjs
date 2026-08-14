import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { readFile, rm } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const run = promisify(execFile)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

test('capture.mjs recovers a candidate whose panel was hidden by an earlier candidate click', async () => {
  const outDir = path.join(__dirname, '.tmp-clobbered-panel-test')
  await rm(outDir, { recursive: true, force: true })

  await run('node', [
    path.join(__dirname, '..', 'capture.mjs'),
    '--entry', path.join(__dirname, 'fixtures', 'clobbered-panel-fixture.html'),
    '--out', outDir,
  ])

  const manifest = JSON.parse(await readFile(path.join(outDir, 'manifest.json'), 'utf8'))
  const nested = manifest.find((m) => m.label === 'Nested Item')

  // "Nested Item" lives in panel-a, which is visible on initial load but gets hidden
  // once "Section B" is clicked earlier in the flat candidate sequence. Without a
  // reload-and-retry-from-a-clean-baseline recovery, this candidate fails as
  // "not visible" even though it's reachable in a single hop from a fresh load —
  // exactly the bug found auditing a real prototype with rail-nav/single-panel-active
  // navigation (Zone Force Shell: Settings clicked before Home's nested Dashboard/
  // Scheduled/All Agents, hiding the Home panel first).
  assert.ok(nested, 'expected a manifest entry for "Nested Item"')
  assert.ok(nested.file, `expected "Nested Item" to be captured successfully, got: ${JSON.stringify(nested)}`)
  assert.ok(!nested.error, `expected no error for "Nested Item", got: ${nested.error}`)

  await rm(outDir, { recursive: true, force: true })
})
