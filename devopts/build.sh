#!/usr/bin/env bash

function checkGoodEndOfPriviousCommand() {
	if [ "$?" -ne "0" ]; then
		exit $?
	fi
}

## RUN

THIS_DIR=$(cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PROJECT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )
cd $PROJECT_DIR;

ENV=$1;

buildName="";

case "${ENV}" in
	prod )
		buildName=prod ;;
	qa )
		buildName=qa ;;
	dev )
		buildName=dev ;;
	*)
		echo "invalid environment name '${ENV}'";
esac

if [ -z "${buildName}" ]; then
	exit 1;
fi

echo ">> will compile client with '${buildName}' environment";

rm -rf ./node_modules/
rm -rf ./src/bower_components/

npm run prepare;
checkGoodEndOfPriviousCommand;

npm test;
checkGoodEndOfPriviousCommand;

case "${buildName}" in
	prod )
		grunt build minify ;;
	qa )
		grunt build minify ;;
	dev )
		grunt build ;;
esac

checkGoodEndOfPriviousCommand;
