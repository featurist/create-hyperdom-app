# balls

## Description

This is balls.

## Usage

### Development

#### `yarn dev`

Starts the server on `http://localhost:5000`. This is going to:

- watch and recompile frontend assets on browser code changes
- reload browser on frontend assets change
- watch and restart backend on server side code changes
- make backend available for debugging in Chrome (via `chrome://inspect`)

#### `yarn lint`

Lints js code based on `eslint:recommended` with few handy extras.

#### `yarn test`

Runs browser tests headlessly in electron. Add `--interactive` to see the browser.

### Production

The app is ready to be pushed to [heroku](https://www.heroku.com/).

Alternatively, integrate the following into the deploy pipeline:

#### `yarn build`

Compiles browser assets.

#### `yarn start`

Starts express server.

Make sure `NODE_ENV` is set to `production` for both of the above.
