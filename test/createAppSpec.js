const path = require('path')
const browse = require('browser-monkey/iframe')
const retry = require('trytryagain')
const Shell = require('./shell')
const TmpDir = require('./tmpDir')
const {bin} = require('../package.json')
// @ts-ignore
const {promises: fs, existsSync: exists} = require('fs')
const {expect} = require('chai')

const timeout = Number(process.env.TIMEOUT || 40000)

const yarnCreateHyperdomApp = process.env.TEST_NPM_MODULE
  ? 'yarn create hyperdom-app'
  : path.resolve(process.cwd(), bin)

async function wait (ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

describe('yarn create hyperdom-app', function () {
  let sh, tmpDir, pid

  this.timeout(timeout + 5000)

  afterEach(async function () {
    if (pid) {
      await sh(`kill $(pgrep node | awk '$1>${pid}')`)
    }
    pid = undefined
  })

  function describeCreateHyperdomApp (opts = [], optsTests = () => {}) {
    const cacheKey = opts.length ? opts.join('_') : 'default'
    const cacheDir = `${__dirname}/cached_node_modules/${cacheKey}`

    describe(opts.length ? `with opts: "${opts.join(' ')}"` : 'with default options', function () {
      before(async () => {
        tmpDir = new TmpDir()
        sh = new Shell({cwd: tmpDir.path})

        const createCommand = `${yarnCreateHyperdomApp} ${opts.join(' ')}`
        await sh(`${createCommand} hell-o-world`)

        sh.cd('hell-o-world')
        // adding to git so that `yarn lint` can pick up files to lint
        await sh('git init')
        await sh('git config user.email "me@example.com"')
        await sh('git config user.name "me"')
        await sh('git add .')
        await sh('git commit -m "init"')

        if (process.env.CACHE_NODE_MODULES) {
          if (exists(cacheDir)) {
            await sh(`cp -R ${cacheDir}/node_modules ./node_modules`)
            await sh(`cp ${cacheDir}/yarn.lock .`)
          } else {
            await sh('yarn install')
            await sh(`mkdir -p ${cacheDir}`)
            await sh(`cp -R ./node_modules ${cacheDir}`)
            await sh(`cp ./yarn.lock ${cacheDir}`)
          }
        } else {
          await sh('yarn install')
        }
      })

      after(async () => {
        await tmpDir.remove()
      })

      afterEach(async function () {
        await sh('git reset --hard HEAD')
      })

      it('creates a skeleton app that can be started with "yarn dev"', async function () {
        pid = await sh('yarn dev', {bg: true})

        await retry(async () => {
          const page = browse('http://localhost:5000')
          await page.shouldHave({text: 'HELLO FROM HYPERDOM!'})
        }, {timeout})
      })

      it('reloads browser when frontend code changes', async function () {
        pid = await sh('yarn dev', {bg: true})

        let page
        await retry(async () => {
          page = browse('http://localhost:5000')
          await page.shouldHave({text: 'HELLO FROM HYPERDOM!'})
        }, {timeout})

        await wait(2000)
        await sh("perl -pi -e 's/dom!/doom!/' browser/app.js*")

        await retry(async () => {
          await page.shouldHave({text: 'HELLO FROM HYPERDOOM!'})
        }, {timeout})
      })

      it('lints', async function () {
        await sh('yarn lint')
      })

      context('production', function () {
        before(async function () {
          await sh('yarn install --production')
          await sh('NODE_ENV=production yarn build')
        })
        after(async function () {
          await sh('yarn install')
        })

        it('runs in production mode', async function () {
          pid = await sh('NODE_ENV=production yarn start', {bg: true})

          await retry(async () => {
            const page = browse('http://localhost:5000')
            await page.shouldHave({text: 'HELLO FROM HYPERDOM!'})
          }, {timeout})
        })
      })

      optsTests()
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
