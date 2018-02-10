const express = require('express')
const morgan = require('morgan')

module.exports = function () {
  const app = express()
  app.use(morgan('dev'))

  app.use('/dist/', express.static(`${process.cwd()}/browser/dist/`))

  app.get('/', (req, res) => {
    res.set({'content-type': 'text/html'})
    res.send(
      `
<!DOCTYPE html>
<html>
  <head>
    <title>My Hyperdom App</title>
  </head>
  <body>
    <script src="/dist/bundle.js"></script>
  </body>
</html>
      `
    )
  })

  return app
}

if (!module.parent) {
  const port = process.env.PORT || 5000
  module.exports().listen(port, () => {
    console.info(`listening on http://localhost:${port}`)
  })
}
