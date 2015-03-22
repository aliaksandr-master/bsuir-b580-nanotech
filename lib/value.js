"use strict";

var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;

module.exports = function (interval) {
	var values = {};
	var emitter = new EventEmitter();
	interval = interval == null ? 100 : interval;

	var trigger = _.throttle(function () {
		emitter.emit('data', values);
	}, interval, {
		leading: false,
		trailing: true
	});

	return {
		init: function (name) {
			values[name] = {
				name: name,
				current: null,
				max: null,
				min: null
			};

			var valObj = values[name];

			return function setter (err, value) {
				if (err) {
					emitter.emit('error', name + ': ' + err);
					return;
				}

				if (!_.isNumber(value)) {
					emitter.emit('error', name + ': value is not a number (' + value + ')');
					return;
				}

				if (_.isNaN(value)) {
					return;
				}

				if (valObj.current === value) {
					return;
				}

				valObj.current = value;

				if (valObj.max === null) {
					valObj.max = value;
					valObj.min = value;
				}

				if (valObj.min > value) {
					valObj.min = value;
				}

				if (valObj.max < value) {
					valObj.max = value;
				}

				trigger();
			};
		},
		emitter: emitter
	};
};

