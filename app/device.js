"use strict";

var _ = require('lodash');
var fs = require('fs');
var path = require('path');

module.exports = function (config) {
	var MAX_CURRENT = config.device.maxCurrent;
	var MAX_VOLTAGE = config.device.maxVoltage;
	var exports = {};

	exports.isInvalidData = function (voltage, current) {
		if (!_.isNumber(voltage) || _.isNaN(voltage)) {
			return new TypeError('voltage is not a Number' + ', ' + voltage + ' given ' + Object.prototype.toString.call(voltage));
		}

		if (!_.isNumber(current) || _.isNaN(current)) {
			return new TypeError('current is not a Number' + ', ' + current + ' given ' + Object.prototype.toString.call(current));
		}

		if (voltage < 0) {
			return new Error('voltage < 0' + ', ' + voltage + ' given ' + Object.prototype.toString.call(voltage));
		}

		if (current < 0) {
			return new Error('current < 0' + ', ' + current + ' given ' + Object.prototype.toString.call(current));
		}

		if (voltage > MAX_VOLTAGE) {
			return new Error('voltage > ' + MAX_VOLTAGE + ', ' + voltage + ' given ' + Object.prototype.toString.call(voltage));
		}

		if (current > MAX_CURRENT) {
			return new Error('current > ' + MAX_CURRENT + ', ' + current + ' given ' + Object.prototype.toString.call(current));
		}

		return null;
	};

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

			var err = exports.isInvalidData(voltage, current);

			if (err) {
				if (defaults) {
					return defaults;
				}

				return reject(err);
			}

			resolve({
				voltage: voltage,
				current: current
			});
		});
	};

	exports.write = function (file, values) {
		return new Promise(function (resolve, reject) {
			var err = exports.isInvalidData(values.voltage, values.current);

			if (err) {
				return reject(err);
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
		return exports.write(config.detector.settingsFile, { voltage: 0, current: 0 });
	};

	exports.resetCurrentValues = function () {
		return exports.write(config.detector.logFile, { voltage: 0, current: 0 });
	};

	exports.reset = function () {
		return exports.resetSettings().then(function () {
			return exports.resetCurrentValues();
		});
	};

	exports.init = function () {
		return new Promise(function (done) {
			setTimeout(done, config.device.initDelay);
		});
	};

	return exports;
};
