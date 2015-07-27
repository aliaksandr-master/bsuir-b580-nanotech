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

mkdir ./build/bsuir-b580-nanotech/win32/log/
mkdir ./build/bsuir-b580-nanotech/win32/program/
cp -r ./run/driver ./build/bsuir-b580-nanotech/win32/
cp -r ./run/runtime ./build/bsuir-b580-nanotech/win32/
cp ./run/program/Project1.exe ./build/bsuir-b580-nanotech/win32/program/Application.exe

mkdir ./build/bsuir-b580-nanotech/win64/log/
mkdir ./build/bsuir-b580-nanotech/win64/program/
cp -r ./run/driver ./build/bsuir-b580-nanotech/win64/
cp -r ./run/runtime ./build/bsuir-b580-nanotech/win64/
cp ./run/program/Project1.exe ./build/bsuir-b580-nanotech/win64/program/Application.exe
