"use strict";

var path = require('path');
var argv = require('optimist').argv;

var d = new Date();

var s = function (d) {
	d = String(d);
	if (d.length < 2) {
		return '0' + d;
	}

	return d;
};

module.exports = {
	device: {
		checkInterval: Number(argv.interval || 100),
		initDelay: Number(argv.delay || 500),
		maxCurrent: Number(argv['max-current'] || 4),
		maxVoltage: Number(argv['max-voltage'] || 40)
	},
	log: {
		cvsFile: __dirname + '/run/log--' + d.getFullYear() + '-' + s(d.getMonth()) + '-' + s(d.getDay()) + '--' + s(d.getHours()) + '-' + s(d.getMinutes()) + '-' + s(d.getSeconds()) + '.csv'
	},
	detector: {
		emitMinInterval: 500,
		deviceRead: 200,

		settingsFile: path.normalize(__dirname + '/run/runtime/settings.txt'),
		logFile: path.normalize(__dirname + '/run/runtime/log.txt')
	}
};
