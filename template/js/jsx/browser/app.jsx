import './style.css'
import * as hyperdom from 'hyperdom'
import './liveReload'

class App {
  render () {
    return <h1 class="hello">Hello from Hyperdom!</h1>
  }
}

hyperdom.append(document.body, new App())
