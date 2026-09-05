import { test, expect } from '@playwright/test'
import { createServer, type Server } from 'node:http'
import { readFile } from 'node:fs/promises'
import { resolve, extname } from 'node:path'
import type { AddressInfo } from 'node:net'

let server: Server
let origin: string
let updated = false
const root = resolve('dist')
const mime: Record<string, string> = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.webmanifest': 'application/manifest+json'
}

test.beforeAll(async () => {
  server = createServer(async (request, response) => {
    const url = new URL(request.url!, 'http://localhost')
    if (!url.pathname.startsWith('/e-check/')) { response.writeHead(404).end(); return }
    const name = url.pathname.slice('/e-check/'.length) || 'index.html'
    const path = resolve(root, name)
    if (!path.startsWith(root + '/') && !path.startsWith(root + '\\')) { response.writeHead(403).end(); return }
    try {
      let body = await readFile(path)
      // Two releases of the built shell, with a matching precache revision.
      // Keep this fixture in memory; never modify the production artifacts.
      if (updated && name === 'index.html') body = Buffer.from(body.toString().replace('<title>E-Check</title>', '<title>E-Check Update-Test</title>'))
      if (updated && name === 'sw.js') {
        const previous = body.toString()
        const next = previous.replace(/(url:"index.html",revision:")[^"]+/, '$1e2e-release-b')
        if (previous === next) throw new Error('Fixture cannot locate shell precache revision')
        body = Buffer.from(next)
      }
      response.writeHead(200, { 'Content-Type': mime[extname(name)] ?? 'application/octet-stream', 'Cache-Control': 'no-store' })
      response.end(body)
    } catch { response.writeHead(404).end() }
  })
  await new Promise<void>((done) => server.listen(0, '127.0.0.1', done))
  origin = `http://127.0.0.1:${(server.address() as AddressInfo).port}/e-check/`
})

test.afterAll(async () => {
  await new Promise<void>((done, reject) => server.close((error) => error ? reject(error) : done()))
})

for (const viewport of [{ width: 360, height: 740 }, { width: 412, height: 915 }, { width: 390, height: 844 }]) {
  test(`offline startup, navigation and controlled update at ${viewport.width}px`, async ({ browser }) => {
    updated = false
    const context = await browser.newContext({ viewport, isMobile: true, hasTouch: true, serviceWorkers: 'allow' })
    let page = await context.newPage()
    try {
      await page.goto(origin)
      await page.getByRole('button', { name: 'Verstanden', exact: true }).click()
      await page.evaluate(async () => { await navigator.serviceWorker.ready })
      await page.reload()
      await expect.poll(() => page.evaluate(() => Boolean(navigator.serviceWorker.controller))).toBe(true)
      await page.getByRole('button', { name: 'SK', exact: true }).click()
      await expect(page.getByText('Čo chceš skontrolovať?')).toBeVisible()
      await context.setOffline(true)
      await page.close()
      page = await context.newPage()
      await page.goto(origin)
      await expect(page.getByText('Čo chceš skontrolovať?')).toBeVisible()
      await page.getByRole('textbox').fill('istič')
      await page.getByRole('button', { name: /Kontrola poistky/ }).click()
      await expect(page.getByRole('heading', { name: 'Kontrola poistky / ističa', exact: true })).toBeVisible()
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
      await page.getByRole('button', { name: 'Domov', exact: true }).click()
      await page.getByRole('button', { name: /Motor nebeží/ }).click()
      await expect(page.getByRole('heading', { name: 'Má motor frekvenčný menič?' })).toBeVisible()
      await page.getByRole('button', { name: 'Áno', exact: true }).click()
      await page.getByRole('button', { name: 'Začať odznova', exact: true }).click()
      await expect(page.getByRole('heading', { name: 'Má motor frekvenčný menič?' })).toBeVisible()
      // Cached asset remains readable without network.
      expect(await page.evaluate(async () => (await fetch('./icon.svg')).ok)).toBe(true)
      await page.reload()
      await expect(page.getByText('Čo chceš skontrolovať?')).toBeVisible()
      await page.getByRole('button', { name: 'DE', exact: true }).click()
      updated = true
      await context.setOffline(false)
      await expect(page.getByText('Neue E-Check-Version verfügbar')).toBeVisible({ timeout: 30_000 })
      await expect(page).toHaveTitle('E-Check')
      await page.getByRole('button', { name: 'Aktualisieren', exact: true }).click()
      await expect(page).toHaveTitle('E-Check Update-Test', { timeout: 30_000 })
      await context.setOffline(true)
      await page.reload()
      await expect(page).toHaveTitle('E-Check Update-Test')
      await expect(page.getByText('Was möchtest du prüfen?')).toBeVisible()
    } finally { await context.close() }
  })
}
