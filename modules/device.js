"use strict";

var _ = require('lodash');
var fs = require('fs');
var config = require('../config');

var device = module.exports;

device.read = function (file, callback) {
	var data;

	try {
		data = fs.readFileSync(file);
	} catch (e) {
		callback(e.message);
		return;
	}

	data = String(data);

	var numbers = _.map(data.trim().split(/\s+/), function (val) {
		return parseInt(val, 10);
	});

	var voltage = numbers[0]/1000;
	var current = numbers[1]/1000;

	if (!_.isNumber(voltage) || _.isNaN(voltage) || !_.isNumber(current) || _.isNaN(current) || voltage < 0 || voltage > 40 || current < 0 || current > 4) {
		callback('incorrect read file "' + file + '" v:' + voltage + ' i:' + current);
		return;
	}

	callback(null, {
		voltage: voltage,
		current: current
	});
};

device.write = function (file, values, callback) {
	if (!values || !_.isNumber(values.voltage) || _.isNaN(values.voltage) || !_.isNumber(values.current) || _.isNaN(values.current) || values.voltage < 0 || values.voltage > 40 || values.current < 0 || values.current > 4) {
		callback('values must be object, values.voltage and values.current must be number');
		return;
	}

	values = {
		voltage: values.voltage,
		current: values.current
	};

	var numbers = _.map([ values.voltage, values.current ], function (val) {
		return (val * 1000).toFixed(0);
	});

	var data = numbers.join(' ').trim();

	try {
		fs.writeFileSync(file, data);
	} catch (e) {
		callback(e.message);
		return;
	}

	callback(null, values);
};

device.readLog = function (callback) {
	device.read(config.detector.logFile, callback);
};

device.readSettings = function (callback) {
	device.read(config.detector.settingsFile, callback);
};

device.writeSettings = function (values, callback) {
	device.write(config.detector.settingsFile, values, callback);
};
