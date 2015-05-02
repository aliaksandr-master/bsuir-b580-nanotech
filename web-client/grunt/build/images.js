'use strict';

module.exports = function (grunt, CFG) {

	this
		.copy({
			files: [
				{
					expand: true,
					cwd: CFG.SRC,
					src: [
						'**/*.{svg,jpg,png,jpeg,gif,ico}',
						'!bower_components/**/*'
					],
					dest: CFG.BUILD
				}
			]
		});

};
