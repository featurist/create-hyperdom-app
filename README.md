# create-hyperdom-app

[Hyperdom](https://github.com/featurist/hyperdom) starter kit. With [exress](https://expressjs.com/) backend and [webpack](https://webpack.js.org/) assets management.

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
