'use strict';

module.exports = function (grunt, CFG) {

	this
		.clean([
			CFG.BUILD
		])

		.include([
			'build/index',
			'build/vendor',
			'build/images',
			'build/styles',
			'build/scripts'
		]);

};
