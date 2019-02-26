let g:ale_linters = {
    \'javascript': ['eslint'],
  \}

let g:vigun_commands = [
  \ {
  \   'pattern': '.*Spec.js$',
  \   'normal': 'DEBUG=create-hyperdom-app:* ./node_modules/.bin/electron-mocha --renderer',
  \   'debug': 'DEBUG=create-hyperdom-app:* ./node_modules/.bin/electron-mocha --interactive --no-timeouts',
  \ },
  \]
