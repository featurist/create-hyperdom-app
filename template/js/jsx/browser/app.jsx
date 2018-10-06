import './style.css'
import * as hyperdom from 'hyperdom'

class App {
  render () {
    return <h1 class="hello">Hello from Hyperdom!</h1>
  }
}

hyperdom.append(document.body, new App())
