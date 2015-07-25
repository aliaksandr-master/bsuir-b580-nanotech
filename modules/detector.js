"use strict";

var _ = require('lodash');
var five = require('johnny-five');
var async = require('async');
var config = require('../config');
var value = require('../lib/value');
var delay = require('../lib/delay');
var device = require('./device');

module.exports = function (callback) {
	var valueObj = value(config.detector.emitMinInterval);

	var current = valueObj.init('current');
	var voltage = valueObj.init('voltage');
	var settingVoltage = valueObj.init('settingVoltage');
	var settingMaxCurrent = valueObj.init('settingMaxCurrent');
	var externalLight = valueObj.init('externalLight');
	var externalTemperature = valueObj.init('externalTemperature');

	var readSetting = function (done) {
		device.readSettings(function (err, settings) {
			if (err) {
				done(err);
				return;
			}

			settingVoltage(null, settings.voltage);
			settingMaxCurrent(null, settings.current);
			done();
		});
	};

	var readLog = function (done) {
		device.readLog(function (err, log) {
			if (err) {
				done(err);
				return;
			}

			voltage(null, log.voltage);
			current(null, log.current);
			done();
		});
	};

	async.series([
		readSetting,
		readLog,
		function (done) {
			delay.reqTimer(config.detector.deviceRead/2, readLog).on('error', function (err) {
				valueObj.emitter.emit('error', err);
			});

			done();
		},
		function (done) {
			five.Board().on("ready", function () {
				new five.Sensor("A2").on("data", externalLight);
				new five.Sensor("A3").on("data", externalTemperature);

				done();
			}).on('error', function (err) {
				valueObj.emitter.emit('error', err);
			});
		}
	], function (err) {
		if (err) {
			callback(err);
			return;
		}

		callback(err, valueObj.emitter);
	});
};
