import * as hyperdom from 'hyperdom'
const {hello} = require('./styles.css')

export default class App extends hyperdom.RenderComponent {
  public render () {
    return <h1 className={hello}>Hello from Hyperdom!</h1>
  }
}
