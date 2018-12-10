const createBrowser = require('browser-monkey/hyperdom')
const App = require('../../browser/app')

describe('App', function() {
  let browser

  beforeEach(function() {
    browser = createBrowser(new App())
  })

  it('renders', async function() {
    await browser.find('h1').shouldHave({text: 'HELLO FROM HYPERDOM!'})
  })
})
