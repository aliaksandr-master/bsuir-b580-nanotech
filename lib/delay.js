"use strict";

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

exports.reqTimer = function reqTimer (timer, initData, func) {
	return new Promise(function (resolve, reject) {
		var intervalId;

		var emitError = function (err) {
			clearInterval(intervalId);
			reject(err);
		};

		var done = function (newData) {
			initData = newData;

			return initData;
		};

		var iteration = 0;

		intervalId = setInterval(function () {
			func(iteration++, initData).then(done, emitError);
		}, timer);
	});
};
