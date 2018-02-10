const {spawn} = require('child_process')
const path = require('path')
const debug = require('debug')('create-hyperdom-app:shell')
const debugStdout = require('debug')('create-hyperdom-app:shell:stdout')
const debugStderr = require('debug')('create-hyperdom-app:shell:stderr')

module.exports = class Shell extends Function {
  constructor ({cwd}) {
    async function shell (cmd, {bg} = {}) {
      debug('Running `%s`', cmd)
      await new Promise((resolve, reject) => {
        const result = []
        const sp = spawn(cmd, [], {cwd: shell.cwd, shell: true})

        sp.stdout.on('data', (data) => {
          result.push(data)
          debugStdout(data.toString())
        })
        sp.stderr.on('data', (data) => {
          result.push(data)
          debugStderr(data.toString())
        })

        if (bg) {
          resolve(sp.pid)
        } else {
          sp.on('close', (code) => {
            if (code === 0) {
              resolve(result.toString())
            } else {
              reject(new Error(`Non-zero exit code: ${code}`))
            }
          })
        }
        sp.on('error', (err) => {
          reject(err)
        })
      })
    }
    Object.setPrototypeOf(shell, Shell.prototype)
    shell.cwd = cwd
    return shell
  }

  cd (p) {
    if (path.isAbsolute(p)) {
      this.cwd = p
    } else {
      this.cwd = path.resolve(this.cwd, p)
    }
  }
}
