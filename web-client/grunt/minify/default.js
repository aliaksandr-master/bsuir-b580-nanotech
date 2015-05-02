'use strict';

module.exports = function (grunt, CFG) {

	this
		.include([
			'minify/index',
			'minify/vendor',
			'minify/images',
			'minify/styles',
			'minify/scripts'
		]);
};
