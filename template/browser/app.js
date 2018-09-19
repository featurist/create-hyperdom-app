import './style.css'
import * as hyperdom from 'hyperdom'
const h = hyperdom.html

class App {
  render () {
    return h('h1.hello', 'Hello from Hyperdom!')
  }
}

hyperdom.append(document.body, new App())
