const hyperdom = require('hyperdom')
const {hello} = require('./style.css')

module.exports = class App {
  render () {
    return <h1 class={hello}>Hello from Hyperdom!</h1>
  }
}
