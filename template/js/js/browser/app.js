const {html: h} = require('hyperdom')
const {hello} = require('./style.css')

module.exports = class App {
  render () {
    return h(`h1.${hello}`, 'Hello from Hyperdom!')
  }
}
