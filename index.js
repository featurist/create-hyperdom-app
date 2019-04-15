#!/usr/bin/env node

const fs = require('fs-extra')
const path = require('path')
const {green, cyan} = require('colors/safe')
const argv = require('yargs')
  .boolean('jsx')
  .boolean('tsx')
  .demandCommand(1)
  .argv
const Shell = require('./shell')

const appName = argv._[0]
const appDir = path.resolve(process.cwd(), appName)
fs.ensureDirSync(appDir)

let templateDir
if (argv.tsx) {
  templateDir = path.resolve(__dirname, 'template', 'tsx')
} else {
  const sharedTemplateDir = path.resolve(__dirname, 'template', 'js', 'shared')
  fs.copySync(sharedTemplateDir, appDir)

  templateDir = path.resolve(__dirname, 'template', 'js', argv.jsx ? 'jsx' : 'js')
}

fs.copySync(templateDir, appDir)
fs.renameSync(`${appDir}/_gitignore`, `${appDir}/.gitignore`)

const sh = new Shell({cwd: appDir})

sh('git init').then(async () => {
  await sh(`perl -pi -e 's/appName/${appName}/g' README.md`)
  await sh('git add .')
}).then(() => {
  console.info('')
  // @ts-ignore
  console.info(green.bold('Success!'), `Created ${appName} at ${appDir}`)
  console.info('Inside that directory, you can run several commands:')
  console.info('')
  console.info('  ', cyan('yarn dev'))
  console.info('    ', 'Starts the development server with live reload.')
  console.info('')
  console.info('  ', cyan('yarn test'))
  console.info('    ', 'Runs fullstack/browser tests in electron.')
  console.info('')
  console.info('  ', cyan('yarn start'))
  console.info('    ', 'Starts server.')
  console.info('')
  console.info('  ', cyan('yarn build'))
  console.info('    ', 'Bundles the app into static files for production.')
  console.info('')
  console.info('  ', cyan('yarn lint'))
  console.info('    ', 'Lints with eslint.')
  console.info('')
  console.info('Get started with:')
  console.info('')
  console.info(`  cd ${appDir} && yarn install`)
  console.info('')
}).catch(e => {
  console.error(e)
  process.exit(1)
})
