"use strict";

var _ = require('lodash');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var config = require('./config');
var delay = require('./delay');
var logCsv = require('./log-csv');
var device = require('./device');

var ExitError = util.inherits(function ExitError() {}, Error);

module.exports = function (options) {
	var emitter = new EventEmitter();
	var manager = {};
	var isStarted = false;
	var currentConfig = config(options);
	var notice = require('./notificator')(currentConfig);

	manager.emitter = emitter;

	manager.stop = function () {
		if (!isStarted) {
			return Promise.reject();
		}

		isStarted = false;

		return device(currentConfig).reset().then(function () {
			notice.writeLn('stop');
			emitter.emit('stop');
		});
	};

	manager.start = function () {
		if (isStarted) {
			return Promise.reject();
		}

		isStarted = true;

		currentConfig = config(options);

		var logFile = logCsv(currentConfig.log.cvsFile);

		notice.writeLn('start');
		emitter.emit('start', currentConfig);

		var _device = device(currentConfig);

		return Promise.resolve()
			.then(_device.reset)
			.then(_device.init)
			.then(function () {
				notice.writeLn('start loop');

				var startedAt = Date.now();
				var prevDate = startedAt;
				var func = require('./function');
				//var func = require('../run/function');

				return delay.interval(currentConfig.device.checkInterval, {}, function (iteration, logData) {
					return Promise.all([
						_device.readCurrentValues({
							voltage: logData.voltage || 0,
							current: logData.current || 0
						}),
						_device.readSettingValues({
							voltage: logData.setting_voltage || 0,
							current: logData.setting_current || 0
						})
					]).then(function (results) {
						if (!isStarted) {
							throw new ExitError();
						}

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

						//notice.writeLn(logData);

						process.nextTick(function () {
							emitter.emit('data', logData);
						});

						if (_settingValues.voltage == newSettingValues.voltage && _settingValues.current == newSettingValues.current) {
							return logData;
						}

						return _device.writeSettingValues(newSettingValues).then(function () {
							return logData;
						});
					}).then(logFile.commit);
				});
			})
			.catch(function (err) {
				if (err instanceof ExitError) {
					return Promise.resolve();
				}

				return Promise.reject(err);
			})
			.then(function () {
				emitter.emit('end');

				return _device.reset();
			}, function (err) {
				emitter.emit('error', err);

				return _device.reset().then(function () {
					notice.writeLn('\nreset to zero\n');
					notice.writeLn('END:> !!!!', err, err.stack);
					process.exit();
				});
			});
	};

	process.on('SIGINT', function () {
		device(currentConfig).reset().then(function () {
			notice.writeLn('\nreset to zero\n');
			process.exit();
		});
	});

	return manager;
};
