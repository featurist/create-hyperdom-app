const http = require('http')
const express = require('express')
const morgan = require('morgan')

module.exports = function () {
  const app = express()
  app.use(morgan('dev'))

  app.get('/service-worker.js', (req, res) => {
    res.sendFile(`${process.cwd()}/browser/dist/serviceWorker.bundle.js`)
  })
  app.use('/dist/', express.static(`${process.cwd()}/browser/dist/`))

  app.get('/', (req, res) => {
    res.type('html')
    res.send(
      `
<!DOCTYPE html>
<html>
  <head>
    <title>My Hyperdom App</title>
  </head>
  <body>
    <script type="text/javascript" src="/dist/app.bundle.js"></script>
    <script type="text/javascript" src="/dist/registerServiceWorker.bundle.js"></script>
    ${process.env.NODE_ENV !== 'production' ? '<script type="text/javascript" src="/dist/liveReload.bundle.js"></script>' : ''}
  </body>
</html>
      `
    )
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
