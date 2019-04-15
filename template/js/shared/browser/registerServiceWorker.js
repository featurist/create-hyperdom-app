// To learn more about the benefits of this model and instructions on how to
// opt-in, read http://bit.ly/CRA-PWA

function register (doRegister) {
  if ('serviceWorker' in navigator) {
    if (doRegister) {
      navigator.serviceWorker.register('service-worker.js').then(() => {
        console.info('Service worker is registered. To learn more, visit http://bit.ly/CRA-PWA')
      })
    } else {
      navigator.serviceWorker.ready.then(registration => {
        registration.unregister()
      })
    }
  }
}

// change false -> true to enable service worker
register(false)
