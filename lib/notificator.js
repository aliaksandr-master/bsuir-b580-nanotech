'use strict';

exports.writeLn = function (data) {
	return new Promise(function () {
		console.log(data);
	});
};
