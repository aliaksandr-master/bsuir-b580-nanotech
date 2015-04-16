'use strict';

module.exports = function (grunt, CFG) {

	this
		.less({
			options: {
				strictUnits: true,
				sourceMap: true,
				relativeUrls: true,
				report: false
			},
			files: [
				{
					expand: true,
					cwd: CFG.SRC,
					dest: CFG.BUILD,
					src: [
						'**/*.less',
						'!bower_components/**/*.less',
						'!**/base/**/*.less',
						'!**/inc/**/*.less'
					],
					ext: '.css'
				}
			]
		})

		.autoprefixer({
			options: {
				sourceMap: true,
				browsers: [ 'last 3 version', 'android 4' ],
				diff: false,
				map: false
			},
			files: [
				{
					expand: true,
					cwd: CFG.BUILD,
					dest: CFG.BUILD,
					src: [
						'**/*.css',
						'!bower_components/**/*.css'
					]
				}
			]
		});
};
