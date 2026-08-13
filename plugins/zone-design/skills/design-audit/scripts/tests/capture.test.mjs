import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { readFile, rm } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const run = promisify(execFile)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

test('capture.mjs screenshots the initial load plus every detected nav candidate', async () => {
  const outDir = path.join(__dirname, '.tmp-capture-test')
  await rm(outDir, { recursive: true, force: true })

  await run('node', [
    path.join(__dirname, '..', 'capture.mjs'),
    '--entry', path.join(__dirname, 'fixtures', 'nav-fixture.html'),
    '--out', outDir,
  ])

  const manifest = JSON.parse(await readFile(path.join(outDir, 'manifest.json'), 'utf8'))
  const captured = manifest.filter((m) => m.file).map((m) => m.label).sort()

  assert.deepEqual(captured, ['Dashboard', 'Landing', 'Settings', 'landing'].sort())
  await rm(outDir, { recursive: true, force: true })
})
