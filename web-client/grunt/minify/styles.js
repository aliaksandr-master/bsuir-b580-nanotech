'use strict';

module.exports = function (grunt, CFG) {

	this

		.csscomb({
			options: {
				config: '.csscomb.json'
			},
			files: [
				{
					expand: true,
					cwd: CFG.BUILD,
					src: [
						'**/*.css',
						'!bower_components/**/*.css'
					],
					dest: CFG.BUILD
				}
			]
		})

		.cmq({
			options: {
				log: true
			},
			files: [
				{
					expand: true,
					cwd: CFG.BUILD,
					src: [
						'**/*.css',
						'!bower_components/**/*.css'
					],
					dest: CFG.BUILD
				}
			]
		})

		.less({
			options: {
				cleancss: true,
				report: true
			},
			files: [
				{
					expand: true,
					cwd: CFG.BUILD,
					src: [
						'**/*.css',
						'!bower_components/**/*.css'
					],
					dest: CFG.BUILD
				}
			]
		});
};
