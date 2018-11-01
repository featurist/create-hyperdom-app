self.addEventListener('install', () => {
  console.info('sw', 'installed')
})

self.addEventListener('activate', () => {
  console.info('sw', 'activate')
})

self.addEventListener('fetch', () => {
  console.info('sw', 'fetch')
})
