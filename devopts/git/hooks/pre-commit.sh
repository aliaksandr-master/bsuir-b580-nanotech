#!/usr/bin/env bash

txtgry='\e[0;90m'
txtdef='\e[0;00m'

PROJECT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )/../.." && pwd )
cd $PROJECT_DIR;

echo -e "${txtgry}>> Git Pre-Commit Hook!${txtdef}\n";

npm test

exit $?
