'use strict';

module.exports = function (grunt, CFG) {

	this
		.connect({
			options: {
				port: 3000,
				base: CFG.BUILD,
				keepalive: !/watch/.test(process.argv.join('')),
				open: true
			}
		});
};
