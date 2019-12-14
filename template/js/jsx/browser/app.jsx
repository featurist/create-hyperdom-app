import hyperdom from 'hyperdom'
import {hello} from './styles.css'
import logo from './hyperdom.png'

export default class App {
  render () {
    return (
      <main>
        <h1 class={hello}>Hello from Hyperdom!</h1>
        <img class='logo' src={logo} width={120} />
      </main>
    )
  }
}
