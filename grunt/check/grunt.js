'use strict';

module.exports = function (grunt, CFG) {
	var jsFiles = {
		expand: true,
		cwd: CFG.GRUNT,
		src: [
			'**/*.js'
		]
	};

	this

		.eslint({
			files: [ jsFiles ]
		});
};
