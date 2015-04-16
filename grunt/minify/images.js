'use strict';

module.exports = function (grunt, CFG) {

	this

		.svgmin({
			options: {
				plugins: [
					{
						removeViewBox: false
					},
					{
						removeUselessStrokeAndFill: false
					},
					{
						convertPathData: {
							straightCurves: false
						}
					}
				]
			},
			files: [
				{
					expand: true,
					cwd: CFG.BUILD,
					src: '**/*.svg',
					dest: CFG.BUILD
				}
			]
		});

};
