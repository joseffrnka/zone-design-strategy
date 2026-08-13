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

    const candidates = await detectScreens(page)
    const requested = args.screens ? args.screens.split(',').map((s) => s.trim()) : null

    for (const candidate of candidates) {
      if (requested && !requested.includes(candidate.label)) continue
      try {
        await page.click(candidate.selector, { timeout: 2000 })
        await page.waitForTimeout(150)
        manifest.push(await capture(candidate.label))
      } catch (err) {
        manifest.push({ label: candidate.label, error: String((err && err.message) || err) })
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
