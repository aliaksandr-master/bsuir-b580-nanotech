"use strict";

var path = require('path');
var _ = require('lodash');

module.exports = function (options) {
	options = options ? options : {};

	var d = new Date();

	var s = function (d) {
		d = String(d);

		if (d.length < 2) {
			return '0' + d;
		}

		return d;
	};

	options = _.extend({
		window: false
	}, options);

	var isWindowsPackage = /\.exe$/.test(process.execPath);

	var CWD = path.dirname(process.execPath);

	var RUN_DIR = path.normalize(__dirname + '/../run');

	if (isWindowsPackage) {
		RUN_DIR = CWD;
	}

	return _.extend({}, _.pick(options, [ 'window' ]), {
		isWindowsPackage: isWindowsPackage,
		cwd: CWD,
		execPath: process.execPath,
		functionFile: path.join(RUN_DIR, 'function.js'),
		device: {
			checkInterval: Number(options.interval || 100),
			initDelay: Number(options.delay || 500),
			maxCurrent: Number(options['max-current'] || 4),
			maxVoltage: Number(options['max-voltage'] || 40)
		},
		log: {
			cvsFile: path.join(RUN_DIR, 'log/' + d.getFullYear() + '-' + s(d.getMonth()) + '-' + s(d.getDay()) + '--' + s(d.getHours()) + '-' + s(d.getMinutes()) + '-' + s(d.getSeconds()) + '.csv')
		},
		detector: {
			emitMinInterval: 500,
			deviceRead: 200,

			settingsFile: path.join(RUN_DIR, 'runtime/settings.txt'),
			logFile: path.join(RUN_DIR, 'runtime/log.txt')
		}
	});
};
