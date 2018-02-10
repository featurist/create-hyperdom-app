const fs = require('fs-extra')
const path = require('path')
const {_: [appName]} = require('yargs')
  .demandCommand(1)
  .argv

const appDir = path.resolve(process.cwd(), appName)
fs.ensureDirSync(appDir)

const templateDir = path.resolve(__dirname, 'template')
fs.copySync(templateDir, appDir)

console.info('Done!')
