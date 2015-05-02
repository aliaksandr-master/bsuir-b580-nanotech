'use strict';

module.exports = require('grunto')(function (grunt) {
	var CWD = __dirname;

	grunt.file.expand([ 'grunt/tasks/**/*.js' ]).forEach(function (f) {
		require(CWD + '/' + f)(grunt);
	});

	var CFG = {
		CWD: CWD,
		GRUNT: 'web-client/grunt',
		SRC: 'web-client/src',
		BUILD: 'web-client/build'
	};

	this.context(CFG);

	this.scan([{
		cwd: CFG.GRUNT,
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
