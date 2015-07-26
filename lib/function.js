'use strict';

var prevDate = Date.now();
var phase = true;

module.exports = function (setting, values, date, number) {
	if (prevDate + 5000 < Date.now()) {
		prevDate = Date.now();

		phase = !phase;
	}

	if (phase) {
		setting.voltage += 4;

		if (setting.voltage > 18) {
			setting.voltage = 0;
		}

		phase = false;
	}

	setting.current = 0.8;

	return setting;
};
