const {spawn} = require('child_process')
const path = require('path')
const debug = require('debug')('create-hyperdom-app:shell')

module.exports = class Shell extends Function {
  constructor ({cwd}) {
    super()
    function shell (cmd, {bg = false} = {}) {
      debug('Running `%s`', cmd)
      return new Promise((resolve, reject) => {
        const sp = spawn(cmd, [], {cwd: shell.cwd, shell: true})

        sp.stdout.on('data', (data) => {
          debug('stdout', data.toString())
        })
        sp.stderr.on('data', (data) => {
          debug('stderr', data.toString())
        })
        sp.on('error', (err) => {
          reject(err)
        })

        if (bg) {
          return resolve(sp.pid)
        } else {
          sp.on('close', (code) => {
            if (code === 0) {
              resolve()
            } else {
              reject(new Error(`Non-zero exit code: ${code}`))
            }
          })
        }
      })
    }
    Object.setPrototypeOf(shell, Shell.prototype)
    shell.cwd = cwd
    // @ts-ignore
    return shell
  }

  cd (p) {
    this.cwd = path.isAbsolute(p) ? p : path.resolve(this.cwd, p)
  }
}
