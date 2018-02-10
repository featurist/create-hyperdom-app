const os = require('os')
const fs = require('fs-extra')
const debug = require('debug')('create-hyperdom-app:tmpDir')

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

function makeTempDir () {
  const path = `${os.tmpdir()}/${getRandomInt(1, 9999999)}`
  debug(`Creating ${path}`)

  fs.ensureDirSync(path)
  return path
}

module.exports = class TmpDir {
  constructor () {
    this.path = makeTempDir()
  }

  remove () {
    debug(`Removing ${this.path}`)
    fs.removeSync(this.path)
  }
}
