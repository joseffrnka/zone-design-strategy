#!/usr/bin/env node
import { chromium } from 'playwright'
import { createHash } from 'node:crypto'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { detectScreens } from './detect-screens.mjs'

function parseArgs(argv) {
  const args = { width: 1440, height: 900 }
  for (let i = 0; i < argv.length; i += 2) {
    const key = argv[i].replace(/^--/, '')
    args[key] = argv[i + 1]
  }
  if (!args.entry) throw new Error('--entry <path-to-html> is required')
  if (!args.out) throw new Error('--out <screenshots-dir> is required')
  return args
}

function hashBuffer(buf) {
  return createHash('sha256').update(buf).digest('hex')
}

function slugify(label) {
  return (
    label
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .slice(0, 60) || 'screen'
  )
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  await mkdir(args.out, { recursive: true })

  const browser = await chromium.launch()
  try {
    const page = await browser.newPage({
      viewport: { width: Number(args.width), height: Number(args.height) },
    })

    const entryUrl = pathToFileURL(path.resolve(args.entry)).href
    await page.goto(entryUrl, { waitUntil: 'load' })

    const manifest = []
    const seenHashes = new Set()

    async function capture(label) {
      const buf = await page.screenshot({ fullPage: true })
      const hash = hashBuffer(buf)
      if (seenHashes.has(hash)) {
        return { label, skipped: true, reason: 'byte-identical to a prior capture' }
      }
      seenHashes.add(hash)
      const filename = `${String(manifest.length + 1).padStart(2, '0')}-${slugify(label)}.png`
      await writeFile(path.join(args.out, filename), buf)
      return { label, file: filename, hash }
    }

    manifest.push(await capture('landing'))

    let candidates = await detectScreens(page)
    const requested = args.screens ? args.screens.split(',').map((s) => s.trim()) : null

    for (let i = 0; i < candidates.length; i++) {
      const candidate = candidates[i]
      if (requested && !requested.includes(candidate.label)) continue
      try {
        await page.click(candidate.selector, { timeout: 2000 })
        await page.waitForTimeout(150)
        manifest.push(await capture(candidate.label))
      } catch (err) {
        // This candidate may have become unreachable because an earlier candidate's
        // click switched the page away from the single-active-panel state it depends
        // on (common in rail-nav/tab shells where only one second-level panel is
        // visible at a time). Reload resets to a clean baseline, but it also wipes
        // every previously injected candidate tag — including for candidates not yet
        // attempted — so re-detecting replaces `candidates` for the rest of this loop
        // too, not just this one retry. Then retry this candidate once from that clean
        // baseline before giving up; a candidate that's genuinely nested two levels
        // deep (needs a different parent clicked first, not just a fresh reload) will
        // still fail here, and that's an honest failure, not a bug in this retry.
        try {
          await page.goto(entryUrl, { waitUntil: 'load' })
          candidates = await detectScreens(page)
          const retryTarget = candidates[i]
          if (!retryTarget || retryTarget.label !== candidate.label) throw err
          await page.click(retryTarget.selector, { timeout: 2000 })
          await page.waitForTimeout(150)
          manifest.push(await capture(candidate.label))
        } catch (retryErr) {
          manifest.push({ label: candidate.label, error: String((retryErr && retryErr.message) || retryErr) })
        }
      }
    }

    await writeFile(path.join(args.out, 'manifest.json'), JSON.stringify(manifest, null, 2))

    const failed = manifest.filter((m) => m.error)
    console.log(
      `Captured ${manifest.filter((m) => m.file).length} screen(s), ${failed.length} failed, ${
        manifest.filter((m) => m.skipped).length
      } skipped as duplicates.`
    )
    if (failed.length) console.log('Failed:', failed.map((f) => f.label).join(', '))
  } finally {
    await browser.close()
  }
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
