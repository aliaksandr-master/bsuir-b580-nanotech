'use strict';

module.exports = function (grunt, CFG) {

	this

		.react({
			options: {
				sourceMap: true,
				es6module: true,
				nonStrictEs6module: true
			},
			files: [
				{
					expand: true,
					cwd: CFG.SRC,
					src: [
						'**/*.jsx',
						'!bower_components/**/*.jsx'
					],
					dest: CFG.BUILD,
					ext: '.jsx'
				}
			]
		})

		.babel('scriptsWithModules', {
			options: {
				sourceMap: true,
				modules: 'amd'
			},
			files: [
				{
					expand: true,
					cwd: CFG.SRC,
					src: [
						'**/*.js',
						'**/*.jsx',
						'!bower_components/**/*.jsx',
						'!bower_components/**/*.js',
						'!require.js'
					],
					dest: CFG.BUILD,
					ext: '.js'
				}
			]
		})

		.babel('scriptsWithoutModules', {
			options: {
				sourceMap: true,
				modules: 'common'
			},
			files: [
				{
					expand: true,
					cwd: CFG.SRC,
					src: [
						'require.js'
					],
					dest: CFG.BUILD,
					ext: '.js'
				}
			]
		})

		.clean([
			CFG.BUILD + '/**/*.jsx'
		]);
};
