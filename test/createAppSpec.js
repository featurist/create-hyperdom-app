const path = require('path')
const browse = require('browser-monkey/iframe')
const retry = require('trytryagain')
const Shell = require('./shell')
const TmpDir = require('./tmpDir')
const {bin} = require('../package.json')
const fs = require('fs').promises
const {expect} = require('chai')

const timeout = Number(process.env.TIMEOUT || 30000)

const yarnCreateHyperdomApp = process.env.TEST_NPM_MODULE
  ? 'yarn create hyperdom-app'
  : path.resolve(process.cwd(), bin)

describe('yarn create hyperdom-app', function () {
  let sh, tmpDir, pid, createCommand

  this.timeout(timeout + 2000)

  beforeEach(async function () {
    tmpDir = new TmpDir()
    sh = new Shell({cwd: tmpDir.path})
    await sh(`${createCommand} hell-o-world`)
    sh.cd('hell-o-world')
  })

  afterEach(async function () {
    if (pid) {
      await sh(`kill $(pgrep node | awk '$1>${pid}')`)
    }
    pid = undefined
    await tmpDir.remove()
  })

  function describeCreateHyperdomApp (opts = [], optsTests = () => {}) {
    describe(opts.length ? `with opts: "${opts.join(' ')}"` : 'with default options', function () {
      before(() => {
        createCommand = `${yarnCreateHyperdomApp} ${opts.join(' ')}`
      })

      it('creates a skeleton app that can be started with "yarn dev"', async function () {
        await sh('yarn install')
        pid = await sh('yarn dev', {bg: true})

        await retry(async () => {
          const page = browse('http://localhost:5000')
          await page.shouldHave({text: 'HELLO FROM HYPERDOM!'})
        }, {timeout})
      })

      it('has production mode', async function () {
        await sh('yarn install')
        await sh('yarn build')
        pid = await sh('yarn start', {bg: true})

        await retry(async () => {
          const page = browse('http://localhost:5000')
          await page.shouldHave({text: 'HELLO FROM HYPERDOM!'})
        }, {timeout})
      })

      optsTests({sh})
    })
  }

  describeCreateHyperdomApp()
  describeCreateHyperdomApp(['--jsx'], function () {
    it('generates jsx', async function () {
      const index = await fs.readFile(`${sh.cwd}/browser/app.jsx`, 'utf-8')
      expect(index).to.include('return <h1 class="hello">Hello from Hyperdom!</h1>')
    })
  })
})
