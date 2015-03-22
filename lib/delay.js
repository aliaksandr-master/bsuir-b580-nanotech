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

	setTimeout(function () {
		func(function (err) {
			if (err) {
				emitter.emit('error', err);
				return;
			}

			exports.reqTimer(timer, func);

			emitter.emit('click');
		});
	}, timer);

	return emitter;
};