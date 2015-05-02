'use strict';

module.exports = function (grunt, CFG) {

	this
		.uglify({
			files: [
				{
					expand: true,
					cwd: CFG.BUILD,
					src: [
						'**/*.js',
						'!bower_components/**/*.js'
					],
					dest: CFG.BUILD
				}
			]
		});
};
