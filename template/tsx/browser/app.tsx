import * as hyperdom from 'hyperdom'
import styles from './styles.css'
import logo from './hyperdom.png'

export default class App extends hyperdom.RenderComponent {
  public render () {
    return (
      <main>
        <h1 className={styles.hello}>Hello from Hyperdom!</h1>
        <img class='logo' src={logo} width={120} />
      </main>
    )
  }
}
