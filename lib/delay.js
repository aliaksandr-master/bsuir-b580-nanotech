"use strict";

var EventEmitter = require('events').EventEmitter;

exports.delay = function (time, func) {
	var _prev = 0;

	return function () {
		var t = Date.now();
		var c = t - _prev;

		if (time < c) {
			_prev = t;
			func.apply(this, arguments);
		}
	}
};

exports.reqTimer = function reqTimer (timer, func) {
	var emitter = new EventEmitter();
	var intervalId;

	var emitClick = function () {
		emitter.emit('click');
	};

	var emitError = function (err) {
		clearInterval(intervalId);
		emitter.emit('error', err);
	};

	intervalId = setInterval(function () {
		func().then(emitClick, emitError);
	}, timer);

	return emitter;
};
