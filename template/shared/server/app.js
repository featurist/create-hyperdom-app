const http = require('http')
const express = require('express')
const morgan = require('morgan')
const loadManifest = require('./loadManifest')

function renderIndexHtml () {
  const manifest = loadManifest()
  const maybeLiveReload = process.env.NODE_ENV !== 'production'
    ? `<script type="text/javascript" src="/dist/${manifest['liveReload.js']}"></script>`
    : ''

  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>My Hyperdom App</title>
  </head>
  <body>
    <script type="text/javascript" src="/dist/${manifest['app.js']}"></script>
    <script type="text/javascript" src="/dist/${manifest['registerServiceWorker.js']}"></script>
    ${maybeLiveReload}
  </body>
</html>
  `
}

module.exports = function () {
  const app = express()
  app.use(morgan('dev'))

  app.get('/service-worker.js', (req, res) => {
    const manifest = loadManifest()
    res.sendFile(`${process.cwd()}/browser/dist/${manifest['serviceWorker.js']}`)
  })
  app.use('/dist/', express.static(
    `${process.cwd()}/browser/dist/`,
    {maxAge: process.env.NODE_ENV === 'production' ? '1y' : 0}
  ))

  app.get('/', (req, res) => {
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
    const LiveReload = require('./liveReload')
    new LiveReload({server}).listen()
  }

  server.listen(port, () => {
    console.info(`listening on http://localhost:${port}`)
  })
}
