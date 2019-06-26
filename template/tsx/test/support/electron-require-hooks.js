require('ts-node/register')

require('asset-require-hook')({
  extensions: ['png', 'svg', 'gif', 'jpg'],
  limit: 0 // `limit: 0` turns on data URI mode
})

require('css-modules-require-hook')({
  append: [
    require('postcss-url')({
      url: 'inline'
    })
  ],
  processCss: function (css) {
    const style = document.createElement('style')
    style.type = 'text/css'
    style.innerHTML = css
    document.head.appendChild(style)
  }
})
