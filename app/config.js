"use strict";

var path = require('path');
var _ = require('lodash');
var utils = require('./utils');

module.exports = function (options) {
	options = options ? options : {};

	var d = new Date();

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
		name: utils.dateString(d) + '--' + utils.timeString(d),
		isWindowsPackage: isWindowsPackage,
		cwd: CWD,
		execPath: process.execPath,
		functionFile: path.join(RUN_DIR, 'function.js'),
		functionCopyFile: path.join(RUN_DIR, 'log/' + '' + utils.dateString(d) + '--' + utils.timeString(d) + '--function.js'),
		device: {
			checkInterval: Number(options.interval || 100),
			initDelay: Number(options.delay || 500),
			maxCurrent: Number(options['max-current'] || 4),
			maxVoltage: Number(options['max-voltage'] || 40)
		},
		log: {
			csvFile: path.join(RUN_DIR, 'log/' + utils.dateString(d) + '--' + utils.timeString(d) + '--data.csv')
		},
		detector: {
			emitMinInterval: 500,
			deviceRead: 200,

			settingsFile: path.join(RUN_DIR, 'runtime/settings.txt'),
			logFile: path.join(RUN_DIR, 'runtime/log.txt')
		}
	});
};
