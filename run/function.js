'use strict';

var prevDate = Date.now();
var phase = true;

module.exports = function (setting, values, date, number) {
	if (prevDate + 5000 < Date.now()) {
		prevDate = Date.now();

		phase = !phase;
	}

	console.log('phase', phase);

	if (phase) {
		setting.voltage += 2;

		if (setting.voltage > 16) {
			setting.voltage = 0;
		}

		phase = false;
	}

	setting.current = 0.8;

	return setting;
};
