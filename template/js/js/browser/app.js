import './style.css'
import * as hyperdom from 'hyperdom'
import './liveReload'
const h = hyperdom.html

class App {
  render () {
    return h('h1.hello', 'Hello from Hyperdom!')
  }
}

hyperdom.append(document.body, new App())
