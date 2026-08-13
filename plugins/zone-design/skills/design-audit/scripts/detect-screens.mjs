export async function detectScreens(page) {
  const candidates = await page.evaluate(() => {
    const seen = new Set()
    const results = []

    function pushCandidate(el) {
      const label = (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 80)
      if (!label || seen.has(label)) return
      seen.add(label)
      el.setAttribute('data-design-review-candidate', String(results.length))
      results.push({ index: results.length, label })
    }

    const selectors = [
      '[role="tab"]',
      '[data-screen]',
      'nav a[href]',
      'nav button',
      '[role="tablist"] [role="button"]',
    ]
    for (const selector of selectors) {
      document.querySelectorAll(selector).forEach(pushCandidate)
    }
    return results
  })

  return candidates.map((c) => ({
    label: c.label,
    selector: `[data-design-review-candidate="${c.index}"]`,
  }))
}
