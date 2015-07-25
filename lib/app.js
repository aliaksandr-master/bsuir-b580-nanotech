"use strict";

var _ = require('lodash');
var delay = require('./delay');
var config = require('./config');
var logCsv = require('./log-csv');
var device = require('./device');

var logFile = logCsv(config.log.cvsFile);

Promise.resolve()
	.then(device.reset)
	.then(device.init)
	.then(function () {
		console.log('>> start loop');

		var startedAt = Date.now();
		var prevDate = startedAt;
		var func = require('../run/function');

		return delay.reqTimer(config.device.checkInterval, {}, function (iteration, logData) {
			return Promise.all([
				device.readCurrentValues({
					voltage: logData.voltage || 0,
					current: logData.current || 0
				}),
				device.readSettingValues({
					voltage: logData.setting_voltage || 0,
					current: logData.setting_current || 0
				})
			]).then(function (results) {
				var currentValues = results[0];
				var settingValues = results[1];
				var _settingValues = _.clone(results[1]);
				var currentDate = Date.now();

				var date = {
					start: startedAt,
					time: Date.now() - startedAt,
					interval: currentDate - prevDate,
					prev: prevDate
				};

				logData.n = iteration + 1;
				logData.time = date.time / 1000;
				logData.voltage = currentValues.voltage;
				logData.current = currentValues.current;
				logData.setting_voltage = settingValues.voltage;
				logData.setting_current = settingValues.current;

				var newSettingValues = func(settingValues, currentValues, date, iteration);

				logData.func_voltage = newSettingValues.voltage;
				logData.func_current = newSettingValues.current;

				prevDate = currentDate;

				console.log(date.interval, logData);

				if (_settingValues.voltage != newSettingValues.voltage || _settingValues.current != newSettingValues.current) {
					return device.writeSettingValues(newSettingValues).then(function () {
						return logFile.commit(logData);
					});
				}

				return logFile.commit(logData);
			});
		});
	})
	.then(device.reset, function (err) {
		return device.reset().then(function () {
			console.log('\nreset to zero\n');
			console.error('END:> !!!!', err, err.stack);
			process.exit();
		});
	});

process.on('SIGINT', function () {
	device.reset().then(function () {
		console.log('\nreset to zero\n');
		process.exit();
	});
});
