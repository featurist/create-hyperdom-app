const hyperdom = require('hyperdom')
const {hello} = require('./styles.css')
const logo = require('./hyperdom.png')

module.exports = class App {
  render () {
    return (
      <main>
        <h1 class={hello}>Hello from Hyperdom!</h1>
        <img class='logo' src={logo} width={120} />
      </main>
    )
  }
}
