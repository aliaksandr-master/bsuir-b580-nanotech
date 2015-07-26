'use strict';

var app = require('./lib/app');

app(require('optimist').argv).start();
