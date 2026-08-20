import { chromium } from 'playwright-core'

const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true })
const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' })
await page.getByRole('button', { name: 'Open menu' }).click()
await page.waitForTimeout(100)
const firstItemFocused = await page.getByRole('link', { name: 'Home', exact: true }).evaluate(element => element === document.activeElement)
const activeAfterOpen = await page.evaluate(() => document.activeElement?.outerHTML)
await page.keyboard.press('Escape')
const escapeReturnedFocus = await page.getByRole('button', { name: 'Open menu' }).evaluate(element => element === document.activeElement)
const menuClosed = await page.getByRole('button', { name: 'Open menu' }).getAttribute('aria-expanded') === 'false'
await browser.close()
const result = { firstItemFocused, activeAfterOpen, escapeReturnedFocus, menuClosed }
console.log(JSON.stringify(result, null, 2))
if (!firstItemFocused || !escapeReturnedFocus || !menuClosed) process.exitCode = 1
