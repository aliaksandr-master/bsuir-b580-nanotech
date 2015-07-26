'use strict';

module.exports = function (config) {
	var exports = {};

	exports.writeLn = function (data) {
		return new Promise(function () {
			console.log(data);
		});
	};

	return exports;
};
