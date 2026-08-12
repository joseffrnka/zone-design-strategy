import { test } from 'node:test'
import assert from 'node:assert/strict'
import { chromium } from 'playwright'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { detectScreens } from '../detect-screens.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

test('detectScreens finds nav candidates by label, deduped across matching selectors', async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  const fixture = pathToFileURL(path.join(__dirname, 'fixtures', 'nav-fixture.html')).href
  await page.goto(fixture)

  const candidates = await detectScreens(page)
  const labels = candidates.map((c) => c.label).sort()

  assert.deepEqual(labels, ['Dashboard', 'Landing', 'Settings'])
  await browser.close()
})
