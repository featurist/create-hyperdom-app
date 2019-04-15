#!/usr/bin/env bash

if [ "$NODE_ENV" = 'production' ]; then
  ts-node ./server/app.ts
else
  ts-node-dev --transpileOnly --respawn --inspect -- ./server/app.ts
fi
