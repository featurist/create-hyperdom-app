import hyperdom from 'hyperdom'
import styles from './styles.css'
import logo from './hyperdom.png'

export default class App {
  render () {
    return (
      <main>
        <h1 class={styles.hello}>Hello from Hyperdom!</h1>
        <img class='logo' src={logo} width={120} />
      </main>
    )
  }
}
