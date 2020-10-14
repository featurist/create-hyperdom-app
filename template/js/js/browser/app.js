const {html: h} = require('hyperdom')
// This is because we require css/png differently (not via webpack) in electron tests
// and the latter generates cjs modules, whereas the former is es6.
const {hello} = require('./styles.css').default || require('./styles.css')
const logo = require('./hyperdom.png').default || require('./hyperdom.png')

module.exports = class App {
  render () {
    return h('main', [
      h(`h1.${hello}`, 'Hello from Hyperdom!'),
      h('img.logo', {src: logo, width: 120}),
    ])
  }
}
