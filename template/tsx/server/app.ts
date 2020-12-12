import * as http from 'http'
import express from 'express'
import morgan from 'morgan'
import loadManifest from './loadManifest'
import LiveReload from './liveReload'

function renderIndexHtml (): String {
  const manifest = loadManifest()
  const styles = Object.values(manifest).filter(url => String(url).match(/\.css$/))
  const scripts = Object.values(manifest).filter(url => String(url).match(/\.js$/))

  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>My Hyperdom App</title>
    ${styles.map(url => `<link rel="stylesheet" href="/dist/${url}" />`).join('\n')}
  </head>
  <body>
    ${scripts.map(url => `<script type="text/javascript" src="/dist/${url}"></script>`).join('\n')}
  </body>
</html>
  `
}

module.exports = function () {
  const app = express()
  // @ts-ignore
  app.use(morgan('dev'))

  app.get('/service-worker.js', (_, res) => {
    const manifest = loadManifest()
    res.sendFile(`${process.cwd()}/browser/dist/${manifest['serviceWorker.js']}`)
  })
  app.use('/dist/', express.static(
    `${process.cwd()}/browser/dist/`,
    {maxAge: process.env.NODE_ENV === 'production' ? '1y' : 0}
  ))

  app.get('/*', (_, res) => {
    res.type('html')
    res.send(renderIndexHtml())
  })

  return app
}

if (!module.parent) {
  const port = process.env.PORT || 5000
  const app = module.exports()
  const server = http.createServer(app)

  if (process.env.NODE_ENV !== 'production') {
    new LiveReload(server).listen()
  }

  server.listen(port, () => {
    console.info(`listening on http://localhost:${port}`)
  })
}
