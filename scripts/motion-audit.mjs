import { chromium } from 'playwright-core'

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
})
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' })
const routes = ['/', '/why-nourdoc', '/product', '/healthcare-impact', '/security-compliance', '/partners', '/about', '/contact']
const issues = []

for (const route of routes) {
  const page = await context.newPage()
  const messages = []
  page.on('console', message => {
    if (['warning', 'error'].includes(message.type())) messages.push(`${message.type()}: ${message.text()}`)
  })
  page.on('pageerror', error => messages.push(`pageerror: ${error.message}`))
  await page.goto(`http://127.0.0.1:4173${route}`, { waitUntil: 'networkidle' })
  for (let top = 0; top < await page.evaluate(() => document.body.scrollHeight); top += 620) {
    await page.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), top)
    await page.waitForTimeout(120)
  }
  await page.waitForTimeout(800)
  const stuck = await page.evaluate(() => [...document.querySelectorAll('[style*="opacity"]')]
    .filter(element => getComputedStyle(element).opacity === '0' && element.getBoundingClientRect().height > 20)
    .map(element => ({ className: element.className, text: element.textContent?.trim().slice(0, 80) })))
  if (messages.length || stuck.length) issues.push({ route, messages, stuck })
  await page.close()
}

await context.close()
await browser.close()
console.log(JSON.stringify({ tested: routes.length, issueCount: issues.length, issues }, null, 2))
