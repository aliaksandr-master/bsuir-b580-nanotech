'use strict';

module.exports = require('grunto')(function (grunt) {
	var CWD = __dirname;

	grunt.file.expand([ 'grunt/tasks/**/*.js' ]).forEach(function (f) {
		require(CWD + '/' + f)(grunt);
	});

	this.context({
		CWD: CWD,
		GRUNT: 'web-client/grunt',
		SRC: 'web-client/src',
		BUILD: 'web-client/build'
	});

	this.scan([{
		cwd: 'web-client/grunt/',
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
