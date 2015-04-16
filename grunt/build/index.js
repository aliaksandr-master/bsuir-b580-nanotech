'use strict';

module.exports = function (grunt, CFG) {

	this
		.copy({
			files: [
				{
					expand: true,
					cwd: CFG.SRC,
					src: [
						'index.html'
					],
					dest: CFG.BUILD
				}
			]
		});

};
