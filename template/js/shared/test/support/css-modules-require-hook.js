const hook = require('css-modules-require-hook')
const {remote} = require('electron')

const root = remote.app.getAppPath()

hook({
  rootDir: root,
  append: [
    require('postcss-url')({
      url: 'inline' // TODO: see if this works
    })
  ],
  processCss: function (css) {
    const style = document.createElement('style')
    style.type = 'text/css'
    style.innerHTML = css
    document.head.appendChild(style)
  }
})
