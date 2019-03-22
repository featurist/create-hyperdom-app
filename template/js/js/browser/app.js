const {html: h} = require('hyperdom')
const {hello} = require('./styles.css')

module.exports = class App {
  render () {
    return h(`h1.${hello}`, 'Hello from Hyperdom!')
  }
}
