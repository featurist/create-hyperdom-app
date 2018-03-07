const path = require('path')
const browse = require('browser-monkey/iframe')
const retry = require('trytryagain')
const Shell = require('./shell')
const TmpDir = require('./tmpDir')
const {bin} = require('../package.json')

const timeout = Number(process.env.TIMEOUT || 30000)

const yarnCreateHyperdomApp = process.env.TEST_NPM_MODULE
  ? 'yarn create hyperdom-app'
  : path.resolve(process.cwd(), bin)

describe('yarn create-hyperdom-app', function () {
  let sh, tmpDir, pid

  this.timeout(timeout + 2000)

  beforeEach(async function () {
    tmpDir = new TmpDir()
    sh = new Shell({cwd: tmpDir.path})
    await sh(`${yarnCreateHyperdomApp} hell-o-world`)
    sh.cd('hell-o-world')
    await sh('yarn install')
  })

  afterEach(async function () {
    await sh(`kill $(pgrep node | awk '$1>${pid}')`)
    await tmpDir.remove()
  })

  it('creates a skeleton app that can be started with "yarn dev"', async function () {
    pid = await sh('yarn dev', {bg: true})

    await retry(async () => {
      const page = browse('http://localhost:5000')
      await page.shouldHave({text: 'HELLO FROM HYPERDOM!'})
    }, {timeout})
  })

  it('has production mode', async function () {
    await sh('yarn build')
    pid = await sh('yarn start', {bg: true})

    await retry(async () => {
      const page = browse('http://localhost:5000')
      await page.shouldHave({text: 'HELLO FROM HYPERDOM!'})
    }, {timeout})
  })
})
