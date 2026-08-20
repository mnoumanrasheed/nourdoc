import { chromium } from 'playwright-core'
import fs from 'node:fs/promises'
import path from 'node:path'

const root = path.resolve('.')
const output = path.join(root, 'qa-audit')
await fs.mkdir(output, { recursive: true })

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
})

const routes = [
  ['home', '/'],
  ['why-nourdoc', '/why-nourdoc'],
  ['product', '/product'],
  ['healthcare-impact', '/healthcare-impact'],
  ['security-compliance', '/security-compliance'],
  ['partners', '/partners'],
  ['about', '/about'],
  ['contact', '/contact'],
]

const viewports = [
  ['desktop', { width: 1440, height: 1000 }],
  ['tablet', { width: 820, height: 900 }],
  ['mobile', { width: 390, height: 844 }],
  ['mobile-320', { width: 320, height: 800 }],
]

const results = []

for (const [viewportName, viewport] of viewports) {
  const context = await browser.newContext({ viewport, reducedMotion: 'reduce' })
  for (const [routeName, route] of routes) {
    const page = await context.newPage()
    const messages = []
    const badResponses = []
    page.on('console', message => {
      if (['warning', 'error'].includes(message.type())) messages.push(`${message.type()}: ${message.text()}`)
    })
    page.on('pageerror', error => messages.push(`pageerror: ${error.message}`))
    page.on('response', response => {
      if (response.status() >= 400) badResponses.push(`${response.status()} ${response.url()}`)
    })
    await page.goto(`http://127.0.0.1:4173${route}`, { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)

    const audit = await page.evaluate(() => {
      const viewportWidth = document.documentElement.clientWidth
      const overflowElements = [...document.querySelectorAll('body *')]
        .filter(element => {
          const rect = element.getBoundingClientRect()
          const style = getComputedStyle(element)
          return style.position !== 'fixed' && style.visibility !== 'hidden' && style.display !== 'none' && (rect.right > viewportWidth + 1 || rect.left < -1)
        })
        .slice(0, 20)
        .map(element => {
          const rect = element.getBoundingClientRect()
          return {
            tag: element.tagName.toLowerCase(),
            className: typeof element.className === 'string' ? element.className : '',
            text: element.textContent?.trim().slice(0, 70),
            left: Math.round(rect.left),
            right: Math.round(rect.right),
          }
        })

      const headings = [...document.querySelectorAll('h1,h2,h3')].map(node => ({
        level: Number(node.tagName[1]),
        text: node.textContent?.trim(),
      }))
      const headingSkips = headings.filter((heading, index) => index > 0 && heading.level > headings[index - 1].level + 1)
      const duplicateIds = [...document.querySelectorAll('[id]')]
        .map(node => node.id)
        .filter((id, index, ids) => ids.indexOf(id) !== index)
      const imagesMissingAlt = [...document.images].filter(image => !image.hasAttribute('alt')).length
      const unlabeledControls = [...document.querySelectorAll('input,select,textarea')].filter(control => {
        const id = control.getAttribute('id')
        return !control.closest('label') && !(id && document.querySelector(`label[for="${id}"]`)) && !control.getAttribute('aria-label')
      }).length
      const clippedText = [...document.querySelectorAll('h1,h2,h3,p,a,button,span')]
        .filter(element => element.scrollWidth > element.clientWidth + 2 && getComputedStyle(element).overflow !== 'visible')
        .slice(0, 15)
        .map(element => ({ tag: element.tagName.toLowerCase(), className: element.className, text: element.textContent?.trim().slice(0, 70) }))
      const main = document.querySelector('main')
      const footer = document.querySelector('footer')
      return {
        title: document.title,
        h1Count: document.querySelectorAll('h1').length,
        viewportWidth,
        bodyScrollWidth: document.body.scrollWidth,
        documentScrollWidth: document.documentElement.scrollWidth,
        overflowElements,
        headingSkips,
        duplicateIds,
        imagesMissingAlt,
        unlabeledControls,
        clippedText,
        mainBottom: main ? Math.round(main.getBoundingClientRect().bottom + scrollY) : null,
        footerTop: footer ? Math.round(footer.getBoundingClientRect().top + scrollY) : null,
      }
    })

    if (viewportName !== 'mobile-320') {
      await page.evaluate(async () => {
        for (let top = 0; top < document.body.scrollHeight; top += innerHeight * .8) {
          scrollTo(0, top)
          await new Promise(resolve => setTimeout(resolve, 60))
        }
        scrollTo(0, 0)
        await new Promise(resolve => setTimeout(resolve, 150))
      })
      await page.screenshot({ path: path.join(output, `${routeName}-${viewportName}.png`), fullPage: true })
    }

    if (routeName === 'home' && viewportName === 'mobile') {
      await page.getByRole('button', { name: 'Open menu' }).click()
      await page.waitForTimeout(100)
      await page.screenshot({ path: path.join(output, 'mobile-menu.png') })
      audit.mobileMenu = await page.evaluate(() => {
        const menu = document.querySelector('#mobile-navigation')
        const rect = menu?.getBoundingClientRect()
        return { visible: !!rect && rect.width > 0, left: rect?.left, right: rect?.right, scrollWidth: menu?.scrollWidth, clientWidth: menu?.clientWidth, firstItemFocused: document.activeElement?.textContent?.trim() === 'Home' }
      })
      await page.keyboard.press('Escape')
      audit.mobileMenu.escapeClosed = await page.getByRole('button', { name: 'Open menu' }).evaluate(element => element === document.activeElement)
    }

    results.push({ viewportName, routeName, messages, badResponses, ...audit })
    await page.close()
  }
  await context.close()
}

await browser.close()
await fs.writeFile(path.join(output, 'results.json'), JSON.stringify(results, null, 2))
const issues = results.filter(result => result.messages.length || result.badResponses.length || result.h1Count !== 1 || result.bodyScrollWidth > result.viewportWidth || result.overflowElements.length || result.headingSkips.length || result.duplicateIds.length || result.imagesMissingAlt || result.unlabeledControls || result.clippedText.length || result.mainBottom !== result.footerTop)
console.log(JSON.stringify({ tested: results.length, issueCount: issues.length, issues }, null, 2))
