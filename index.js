"use strict";

var _ = require('lodash');
var async = require('async');
var delay = require('./lib/delay');
var config = require('./config');
var logCsv = require('./modules/log-csv');

//var detector = require('./modules/detector');
var device = require('./modules/device');

var logFile = logCsv(config.log.cvsFile);

async.series([
	function (done) {
		device.reset().then(function () {
			console.log('\nreset to zero\n');
			done();
		}, done);
	},
	function (done) {
		setTimeout(done, config.device.initDelay);
	},
	function (done) {
		console.log('>> start loop');

		var startedAt = Date.now();
		var number = 0;
		var prevDate = startedAt;

		var func = require('./run/function');
		var data = {};

		delay
			.reqTimer(config.device.checkInterval, function () {
				return Promise.all([
					device.readCurrentValues({ voltage: data.voltage, current: data.current }),
					device.readSettingValues({ voltage: data.setting_voltage, current: data.setting_current })
				]).then(function (results) {
					number++;
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

					data = {
						n: number,
						time: date.time / 1000,
						voltage: currentValues.voltage,
						current: currentValues.current,
						setting_voltage: settingValues.voltage,
						setting_current: settingValues.current
					};

					var newSettingValues = func(settingValues, currentValues, date, number);

					data.func_voltage = newSettingValues.voltage;
					data.func_current = newSettingValues.current;

					prevDate = currentDate;

					console.log(date.interval, data);

					if (_settingValues.voltage != newSettingValues.voltage || _settingValues.current != newSettingValues.current) {
						return device.writeSettingValues(newSettingValues).then(function () {
							return logFile.commit(data);
						})
					}

					return logFile.commit(data);
				});
			})
			.on('error', done)
			.on('end', done);
	}/*,
	function (done) {
		detector(function (err, dataEmitter) {
			if (err) {
				done(err);
				return;
			}

			console.log('init connect with sensors !');

			dataEmitter.on('error', done);
			dataEmitter.on('data', function (values) {
				console.log(values);
			});
		});
	}*/
], function (err) {
	device.reset().then(function () {
		console.log('\nreset to zero\n');
		console.error('END:> !!!!', err);
		process.exit();
	});
});

process.on('SIGINT', function () {
	device.reset().then(function () {
		console.log('\nreset to zero\n');
		process.exit();
	});
});
