'use strict';

module.exports = function (grunt, CFG) {

	this
		.copy({
			files: [
				{
					expand: true,
					cwd: CFG.SRC,
					src: [
						'bower_components/**/*.{js,css,less,png,jpg,gif,woff,otf,ttf,svg}'
					],
					dest: CFG.BUILD
				}
			]
		});
};
