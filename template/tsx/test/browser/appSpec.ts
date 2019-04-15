const createBrowser = require('browser-monkey/hyperdom')
const createReloadButton = require('browser-monkey/lib/reloadButton')
import App from '../../browser/app'

describe('App', function() {
  let browser: any

  beforeEach(function() {
    createReloadButton()
    browser = createBrowser(new App())
  })

  it('renders', async function() {
    await browser.find('h1').shouldHave({text: 'HELLO FROM HYPERDOM!'})
  })
})
