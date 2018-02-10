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

### Development

```bash
yarn dev
```

Start the server on `http://localhost:5000`. It's going to watch and recompile browser assets on changes as well as watch and restart server app on server side changes.

### Production

```bash
yarn build # compiles browser assets
yarn start
```
