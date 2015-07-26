"use strict";

var _ = require('lodash');
var fs = require('fs');
var path = require('path');

module.exports = function (config) {
	var MAX_CURRENT = config.device.maxCurrent;
	var MAX_VOLTAGE = config.device.maxVoltage;
	var exports = {};

	exports.read = function (file, defaults) {
		return new Promise(function (resolve, reject) {
			var data;

			try {
				data = String(fs.readFileSync(file));
			} catch (e) {
				return reject(e);
			}

			var _data = data.trim().split(/\s+/);
			var voltage = Number(_data[0]) / 1000;
			var current = Number(_data[1]) / 1000;

			if (!_.isNumber(voltage) || !_.isNumber(current) || _.isNaN(voltage) || _.isNaN(current) || voltage < 0 || current < 0 || voltage > MAX_VOLTAGE || current > MAX_CURRENT) {
				if (defaults) {
					return defaults;
				}

				return reject(new Error('READ ERROR: file "' + path.basename(file) + '" v:' + voltage + ' i:' + current + ':::: "' + data + '"'));
			}

			resolve({
				voltage: voltage,
				current: current
			});
		});
	};

	exports.write = function (file, values) {
		return new Promise(function (resolve, reject) {
			if (!values || !_.isNumber(values.voltage) || _.isNaN(values.voltage) || !_.isNumber(values.current) || _.isNaN(values.current) || values.voltage < 0 || values.voltage > MAX_VOLTAGE || values.current < 0 || values.current > MAX_CURRENT) {
				return reject(new Error('WRITE ERROR: values must be object, values.voltage and values.current must be number' + '::::' + JSON.stringify(values)));
			}

			var data = (values.voltage * 1000).toFixed(0) + ' ' + (values.current * 1000).toFixed(0);

			try {
				fs.writeFileSync(file, data);
			} catch (e) {
				return reject(e);
			}

			resolve(values);
		});
	};

	exports.readCurrentValues = function (defaults) {
		return exports.read(config.detector.logFile, defaults);
	};

	exports.readSettingValues = function (defaults) {
		return exports.read(config.detector.settingsFile, defaults);
	};

	exports.writeSettingValues = function (values) {
		return exports.write(config.detector.settingsFile, values);
	};

	exports.resetSettings = function () {
		console.log('resetSettings', config.detector.settingsFile);
		return exports.write(config.detector.settingsFile, { voltage: 0, current: 0 });
	};

	exports.resetCurrentValues = function () {
		console.log('resetCurrentValues', config.detector.logFile);
		return exports.write(config.detector.logFile, { voltage: 0, current: 0 });
	};

	exports.reset = function () {
		console.log('reset');
		return exports.resetSettings().then(function () {
			return exports.resetCurrentValues();
		});
	};

	exports.init = function () {
		console.log('init');
		return new Promise(function (done) {
			setTimeout(done, config.device.initDelay);
		});
	};

	return exports;
};
