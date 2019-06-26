const {html: h} = require('hyperdom')
const {hello} = require('./styles.css')
const logo = require('./hyperdom.png')

module.exports = class App {
  render () {
    return h('main', [
      h(`h1.${hello}`, 'Hello from Hyperdom!'),
      h('img.logo', {src: logo, width: 120}),
    ])
  }
}
