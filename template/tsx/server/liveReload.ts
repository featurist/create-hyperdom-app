import * as WebSocket from 'ws'
import * as chokidar from 'chokidar'
import * as http from 'http'
import {join} from 'path'

export default class LiveReload {
  private wss?: WebSocket.Server

  constructor (readonly server: http.Server) {}

  listen () {
    if (!this.wss) {
      this.wss = new WebSocket.Server({server: this.server})
      this.wss.on('connection', function connection (ws) {
        console.info('Live reload connected to the browser')
        const watcher = chokidar.watch(join(process.cwd(), 'browser', 'dist'))
        watcher.on('change', () => {
          console.info('Reloading browser')
          try {
            ws.send('reload')
          } catch (e) {
            console.warn(e)
            watcher.close()
          }
        })
      })
    }
  }
}
