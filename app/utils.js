'use strict';

var s2 = function (d) {
	d = String(d);

	if (d.length < 2) {
		return '0' + d;
	}

	return d;
};

exports.dateString = function (date) {
	return date.getFullYear() + '-' + s2(date.getMonth()) + '-' + s2(date.getDay());
};

exports.timeString = function (date) {
	return s2(date.getHours()) + '-' + s2(date.getMinutes()) + '-' + s2(date.getSeconds());
};
