#!/usr/bin/env node

const fs = require('fs-extra')
const path = require('path')
const argv = require('yargs')
  .boolean('jsx')
  .demandCommand(1)
  .argv

const appDir = path.resolve(process.cwd(), argv._[0])
fs.ensureDirSync(appDir)

const sharedTemplateDir = path.resolve(__dirname, 'template', 'shared')
fs.copySync(sharedTemplateDir, appDir)

let templateDir
if (argv.jsx) {
  templateDir = path.resolve(__dirname, 'template', 'js', 'jsx')
} else {
  templateDir = path.resolve(__dirname, 'template', 'js', 'js')
}

fs.copySync(templateDir, appDir)

console.info('Done!')
