#!/usr/bin/env node

var fs = require('fs-extra')
var path = require('path')
var argv = require('yargs')
  .demandCommand(1)
  .argv

var appDir = path.resolve(process.cwd(), argv._[0])
fs.ensureDirSync(appDir)

var templateDir = path.resolve(__dirname, 'template')
fs.copySync(templateDir, appDir)

console.info('Done!')
