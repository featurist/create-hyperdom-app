require('./style.css')
const hyperdom = require('hyperdom')
const h = hyperdom.html

class App {
  render () {
    return h('body',
      h('h1.hello', 'Hello from Hyperdom!')
    )
  }
}

hyperdom.append(document.body, new App())
