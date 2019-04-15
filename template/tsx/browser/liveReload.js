var ws
setInterval(function () {
  if (!ws) {
    ws = new window.WebSocket('ws://' + window.location.host)
    ws.onmessage = function (message) {
      if (message.data === 'reload') {
        window.location.reload()
      }
    }
    ws.onclose = function () {
      ws = undefined
    }
  }
}, 500)
