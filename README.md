# create-hyperdom-app

[Hyperdom](https://github.com/featurist/hyperdom) starter kit. With [express](https://expressjs.com/) backend and [webpack](https://webpack.js.org/) assets management.

Build Type | Status
------|------
Push to master | [![Build Status](https://semaphoreci.com/api/v1/featurist/create-hyperdom-app/branches/master/badge.svg)](https://semaphoreci.com/featurist/create-hyperdom-app)
Latest `create-hyperdom-app` npm module against latest dependencies (runs daily) | [![Build Status](https://travis-ci.org/featurist/create-hyperdom-app.svg?branch=master)](https://travis-ci.org/featurist/create-hyperdom-app)
 
## Usage

```bash
yarn create hyperdom-app myApp # npx create-hyperdom-app myApp
cd myApp
yarn install # npm install
```

Add `--jsx` flag if you prefer using jsx.

### Development

```bash
yarn dev
```

Starts the server on `http://localhost:5000`. This features:

- watch and recompile frontend assets on browser code changes
- reload browser on frontend assets change
- watch and restart backend on server side code changes
- debug server side in Chrome (via `chrome://inspect`)

There is also `yarn lint` based on `eslint:recommended` and with few extras added.

### Production

Make sure `NODE_ENV` is set to `production` when both building assets and starting the server.

```bash
yarn build # compiles browser assets
yarn start
```

The app is ready to be pushed to [heroku](https://www.heroku.com/).

## Contributing

Run tests:

```
yarn test
```

Run tests with browser window:

```
yarn test --debug
```

Tests run `yarn install` which is pretty slow. Set `CACHE_NODE_MODULES=1` when running `yarn test` to speed things up a bit.
