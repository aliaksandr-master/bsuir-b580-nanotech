#!/usr/bin/env bash

txtred='\e[0;31m'
txtgrn='\e[0;32m'
txtdef='\e[00m'

THIS_DIR=$(cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PROJECT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )
cd $PROJECT_DIR;

function simLink() {
	local destFile=$1
	local soruceFile=$2

	if [ -L ${destFile} ];
	then
		rm -f ${destFile}
	fi

	if [ -f ${destFile} ];
	then
		echo -e "${txtred}>> ERROR! File ${destFile} is EXISTS! and this is regular${txtdef}"
		exit 1;
	else
		ln -s ${soruceFile} ${destFile}
		echo -e "${txtgrn}>> File '${destFile}' Created as symLink of '${2}'${txtdef}"
	fi
}

GIT_HOOKS_DIR=$PROJECT_DIR/.git/hooks;
ENV_GIT_HOOKS_DIR=$THIS_DIR/git/hooks;

for hookFile in `ls -1 $ENV_GIT_HOOKS_DIR`; do
	filename=$(basename "${hookFile}");
	extension="${hookFile##*.}";
	filename="${filename%.*}"

	if [ ! -x $ENV_GIT_HOOKS_DIR/$hookFile ];
	then
		echo -e "${txtred}>> ERROR! File ${hookFile} hasn't execute permissions${txtdef}"
		exit 1;
	fi

	simLink $GIT_HOOKS_DIR/$filename $ENV_GIT_HOOKS_DIR/$filename.$extension
done





