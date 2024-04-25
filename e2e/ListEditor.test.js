import puppeteer from 'puppeteer'

jest.setTimeout(600000)

describe('test', () => {
  let browser
  let page

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      devtools: true,
    })

    page = await browser.newPage()
  })

  // eslint-disable-next-line jest/expect-expect
  test('app should render on page', async () => {
    await page.goto('http://localhost:8080')

    await page.waitForSelector('[class*="app"]')
  })

  // eslint-disable-next-line jest/expect-expect
  test('add form should open and close', async () => {
    await page.goto('http://localhost:8080')

    await page.waitForSelector('[class*="app"]')

    const app = await page.$('[class*="app"]')
    const btnAdd = await app.$('[class*="btnAdd"]')
    await btnAdd.click()

    const form = await app.$('[class*="formItem"]')
    const btnCancel = await form.$('[class*="btnCancel"]')
    await btnCancel.click()
  })

  // eslint-disable-next-line jest/expect-expect
  test('show custom errors', async () => {
    await page.goto('http://localhost:8080')

    await page.waitForSelector('[class*="app"]')

    const app = await page.$('[class*="app"]')
    const btnAdd = await app.$('[class*="btnAdd"]')
    await btnAdd.click()

    const form = await app.$('[class*="formItem"]')
    const inputName = await form.$('[name="name"]')
    const inputPrice = await form.$('[name="price"]')
    const btnSubmit = await form.$('[class*="btnSave"]')
    await btnSubmit.click()

    await inputName.type('test')
    await btnSubmit.click()

    await inputPrice.type('00')
    await btnSubmit.click()

    const btnCancel = await form.$('[class*="btnCancel"]')
    await btnCancel.click()
  })

  // eslint-disable-next-line jest/expect-expect
  test('add new item', async () => {
    await page.goto('http://localhost:8080')

    await page.waitForSelector('[class*="app"]')

    const app = await page.$('[class*="app"]')
    const btnAdd = await app.$('[class*="btnAdd"]')
    await btnAdd.click()

    const form = await app.$('[class*="formItem"]')
    const inputName = await form.$('[name="name"]')
    const inputPrice = await form.$('[name="price"]')
    const btnSubmit = await form.$('[class*="btnSave"]')

    await inputName.type('test')
    await inputPrice.type('100000')
    await btnSubmit.click()
  })

  // eslint-disable-next-line jest/expect-expect
  test('edit item', async () => {
    await page.goto('http://localhost:8080')

    await page.waitForSelector('[class*="app"]')

    const app = await page.$('[class*="app"]')
    const btnEdit = await app.$('[class*="btnEdit"]')
    await btnEdit.click()

    const form = await app.$('[class*="formItem"]')
    const inputName = await form.$('[name="name"]')
    const inputPrice = await form.$('[name="price"]')
    const btnSubmit = await form.$('[class*="btnSave"]')

    await inputName.type('test')
    await inputPrice.type('100000')
    await btnSubmit.click()
  })

  // eslint-disable-next-line jest/expect-expect
  test('delete item', async () => {
    await page.goto('http://localhost:8080')

    await page.waitForSelector('[class*="app"]')

    const app = await page.$('[class*="app"]')
    const itemsList = await app.$('[class*="itemsList"]')
    const btnDelete = await itemsList.$('[class*="btnDelete"]')
    await btnDelete.click()

    const modalConfirm = await app.$('[class*="confirmDelete"]')
    const btnConfirmDelete = await modalConfirm.$('[class*="btnDelete"]')
    await btnConfirmDelete.click()
  })

  afterEach(async () => {
    await browser.close()
  })
})
