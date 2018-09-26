#!/usr/bin/env bash

if [ "$NODE_ENV" = 'production' ]; then
  node ./server/app.js
else
  nodemon --ignore ./browser --inspect ./server/app.js
fi
