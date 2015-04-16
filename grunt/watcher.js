'use strict';

module.exports = function (grunt, CFG) {

	this
		.watch({
			files: [
				CFG.SRC + '/**/*.js',
				CFG.SRC + '/**/*.jsx'
			],
			tasks: [
				'build/scripts'
			]
		})
		.watch({
			files: [
				CFG.SRC + '/**/*.{css,less}'
			],
			tasks: [
				'build/styles'
			]
		})
		.watch({
			files: [
				CFG.SRC + '/**/*.{svg,odt,ttf,woff}'
			],
			tasks: [
				'build/fonts'
			]
		})
		.watch({
			files: [
				CFG.SRC + '/**/*.{svg,png,jpg,jpeg,gif,ico}'
			],
			tasks: [
				'build/images'
			]
		})
		.watch({
			files: [
				CFG.SRC + '/index.html'
			],
			tasks: [
				'build/main'
			]
		});
};
