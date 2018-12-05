let g:ale_linters = {
    \'javascript': ['eslint'],
  \}

let g:vigun_commands = [
  \ {
  \   'pattern': '.*Spec.js$',
  \   'normal': 'DEBUG=create-hyperdom-app:* electron-mocha --renderer',
  \   'debug': 'DEBUG=create-hyperdom-app:* electron-mocha --interactive --no-timeouts',
  \ },
  \]
