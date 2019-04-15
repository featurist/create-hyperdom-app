# create-hyperdom-app

[Hyperdom](https://github.com/featurist/hyperdom) starter kit. With [express](https://expressjs.com/) backend and [webpack](https://webpack.js.org/) assets management.

Build Type | Status
------|------
Push to master | [![Build Status](https://semaphoreci.com/api/v1/featurist/create-hyperdom-app/branches/master/badge.svg)](https://semaphoreci.com/featurist/create-hyperdom-app)
Latest `create-hyperdom-app` npm module against latest dependencies (runs daily) | [![Build Status](https://travis-ci.org/featurist/create-hyperdom-app.svg?branch=master)](https://travis-ci.org/featurist/create-hyperdom-app)
 
## Creating new app

```bash
yarn create hyperdom-app myApp # npx create-hyperdom-app myApp
cd myApp
yarn install # npm install
```

### Options

- `--jsx`: generate jsx project instead of the default js one.
- `--tsx`: generate typescript project with tsx.

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
