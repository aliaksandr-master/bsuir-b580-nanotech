"use strict";

exports.interval = function reqTimer (timer, initData, func) {
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
