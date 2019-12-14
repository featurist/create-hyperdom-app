import createBrowser from 'browser-monkey/hyperdom'
import assert from 'assert'
import App from '../../browser/app'

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
