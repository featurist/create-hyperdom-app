const createBrowser = require('browser-monkey/hyperdom')
import * as assert from 'assert'
import App from '../../browser/app'

describe('App', function() {
  let browser: any

  beforeEach(function() {
    browser = createBrowser(new App())
  })

  it('renders', async function() {
    await browser.find('h1').shouldHave({text: 'HELLO FROM HYPERDOM!'})

    const logo = document.querySelector('img.logo')! as HTMLImageElement
    assert.ok(logo.naturalWidth > 0)
  })
})
