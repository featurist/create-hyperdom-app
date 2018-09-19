let g:ale_linters = {
    \'javascript': ['eslint'],
  \}

let g:vigun_commands = [
  \ {
  \   'pattern': '.*Spec.js$',
  \   'normal': 'electron-mocha --renderer',
  \   'debug': 'electron-mocha --interactive --no-timeouts',
  \ },
  \]
