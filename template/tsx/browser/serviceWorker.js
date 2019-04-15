self.addEventListener('install', function () {
  console.info('sw', 'installed')
})

self.addEventListener('activate', function () {
  console.info('sw', 'activate')
})

self.addEventListener('fetch', function () {
  console.info('sw', 'fetch')
})
