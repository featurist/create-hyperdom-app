#!/usr/bin/env bash

if [ "$NODE_ENV" = 'production' ]; then
  ts-node ./server/app.ts
else
  ts-node-dev --transpile-only --respawn --inspect -- ./server/app.ts
fi
