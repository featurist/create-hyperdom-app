#!/usr/bin/env node

const fs = require('fs-extra')
const path = require('path')
const {green, cyan} = require('colors/safe')
const argv = require('yargs')
  .boolean('jsx')
  .demandCommand(1)
  .argv
const Shell = require('./shell')

const appName = argv._[0]
const appDir = path.resolve(process.cwd(), appName)
fs.ensureDirSync(appDir)

const sharedTemplateDir = path.resolve(__dirname, 'template', 'shared')
fs.copySync(sharedTemplateDir, appDir)
fs.renameSync(`${appDir}/_gitignore`, `${appDir}/.gitignore`)

let templateDir
if (argv.jsx) {
  templateDir = path.resolve(__dirname, 'template', 'js', 'jsx')
} else {
  templateDir = path.resolve(__dirname, 'template', 'js', 'js')
}

fs.copySync(templateDir, appDir)

const sh = new Shell({cwd: appDir})

sh('git init').then(() => {
  return sh('git add .')
}).then(() => {
  console.info('')
  // @ts-ignore
  console.info(green.bold('Success!'), `Created ${appName} at ${appDir}`)
  console.info('Inside that directory, you can run several commands:')
  console.info('')
  console.info('  ', cyan('yarn dev'))
  console.info('    ', 'Starts the development server with live reload.')
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
})
