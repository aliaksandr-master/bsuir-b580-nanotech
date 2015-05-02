'use strict';

require.config({

	baseUrl: '/',

	paths: {
		'bootstrap': 'bower_components/react-bootstrap/lib'
	},

	map: {
		'*': {
			react: 'bower_components/react/react-with-addons',
			'react-router': 'bower_components/react-router/build/global/ReactRouter.js',
			classnames: 'bower_components/classnames/index',

			//jquery: 'bower_components/jquery/jquery',
			//backbone: 'bower_components/backbone/backbone',
			//handlebars: 'bower_components/handlebars/handlebars',
			//lodash: 'bower_components/lodash/dist/lodash',
			//underscore: 'bower_components/lodash/dist/lodash',
			//bootstrap: 'bower_components/bootstrap/bootstrap',

			'text': 'bower_components/requirejs-text/text',
			'css': 'bower_components/require-css/css'
		}
	},

	shim: {
		'global/bower_components/jquery/jquery': {
			init: function () {
				return window.jQuery;
			}
		},
		'bower_components/bootstrap/bootstrap': {
			deps: [ 'bower_components/jquery/jquery' ]
		},
		'bower_components/classnames/index': {
			init: function () {
				return window.classNames;
			}
		}
	}

});
