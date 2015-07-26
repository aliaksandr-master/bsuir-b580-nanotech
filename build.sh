#!/usr/bin/env bash

NW_DIRNAME="nwjs-v0.12.2-linux-x64"
NW_APP_FILE="./.build/app.nw"

rm -rf ./.tmp
rm -rf ./build
mkdir ./.tmp
mkdir ./.build-nw-cache
mkdir ./build

cp -rf ./app ./.tmp
cp -rf ./lib ./.tmp
cp -rf ./node_modules ./.tmp
cp ./package.json ./.tmp
cp ./index.js ./.tmp

node ./build-nw.js
