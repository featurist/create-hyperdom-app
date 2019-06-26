const createBrowser = require('browser-monkey/hyperdom')
const assert = require('assert')
const App = require('../../browser/app')

describe('App', function() {
  let browser

  beforeEach(function() {
    browser = createBrowser(new App())
  })

  it('renders', async function() {
    await browser.find('h1').shouldHave({text: 'HELLO FROM HYPERDOM!'})
    assert.ok(document.querySelector('img.logo').naturalWidth > 0)
  })
})
