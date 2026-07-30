import { test, expect } from '@playwright/test'

// Las APIs externas se interceptan para que los tests sean deterministas
// y no dependan de la red ni de la API key.
async function mockApis(page) {
  await page.route('**/api.currencyfreaks.com/**', (route) =>
    route.fulfill({
      json: { rates: { EUR: '1', USD: '1.08', JPY: '150' } },
    }),
  )
  await page.route('**/api.el-tiempo.net/**', (route) =>
    route.fulfill({
      json: {
        ciudades: [
          {
            id: ['33044'],
            name: 'Oviedo',
            temperatures: { max: 21, min: 12 },
            stateSky: { description: 'Despejado' },
          },
        ],
      },
    }),
  )
}

test.beforeEach(async ({ page }) => {
  await mockApis(page)
  await page.goto('/')
})

test('la calculadora suma 5 + 3 = 8', async ({ page }) => {
  await page.getByRole('button', { name: '5', exact: true }).click()
  await page.getByRole('button', { name: '+', exact: true }).click()
  await page.getByRole('button', { name: '3', exact: true }).click()
  await page.getByRole('button', { name: '=', exact: true }).click()

  await expect(page.locator('.calc__number')).toHaveText('8')
})

test('la memoria guarda con M+ y recupera con MR', async ({ page }) => {
  await page.getByRole('button', { name: '7', exact: true }).click()
  await page.getByRole('button', { name: 'M+' }).click()
  await page.getByRole('button', { name: 'CE' }).click()
  await expect(page.locator('.calc__number')).toHaveText('0')

  await page.getByRole('button', { name: 'MR' }).click()
  await expect(page.locator('.calc__number')).toHaveText('7')
})

test('el conversor convierte EUR a USD', async ({ page }) => {
  await page.getByPlaceholder('Cantidad').fill('10')

  await expect(page.locator('.currency__result')).toContainText('10.80 USD')
})

test('la card del tiempo muestra Oviedo con su icono', async ({ page }) => {
  await expect(page.locator('.weather__temp')).toContainText('21°')
  await expect(page.locator('.weather__desc')).toContainText('Despejado · Oviedo')
  await expect(page.locator('.weather__icon')).toBeVisible()
})
