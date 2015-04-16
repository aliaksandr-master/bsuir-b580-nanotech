'use strict';

module.exports = require('grunto')(function (grunt) {
	var CWD = __dirname;

	grunt.file.expand([ 'grunt/tasks/**/*.js' ]).forEach(function (f) {
		require(CWD + '/' + f)(grunt);
	});

	this.context({
		CWD: CWD,
		GRUNT: 'grunt',
		SRC: 'src',
		BUILD: 'build'
	});

	this.scan([{
		cwd: 'grunt/',
		src: [
			'**/*.js',
			'!tasks/**/*.js',
			'!**/_*.js',
			'!**/_*/**/*.js'
		]
	}]);

	return {
		watch: {
			options: {
				livereload: true,
				nospawn: true,
				interrupt: true
			}
		}
	};
});