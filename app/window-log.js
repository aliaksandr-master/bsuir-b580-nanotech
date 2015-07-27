'use strict';

var _ = require('lodash');
var utils = require('./utils');

module.exports = function ($element, options) {

	options = _.extend({
		containerMethod: 'append'
	}, options);

	return {
		commit: function (msg, type, stack) {
			var date = new Date();

			console.log(msg, type);

			if (stack) {
				console.log(stack);
			}

			type = type ? type : 'default';

			var template =
				'<div class="clearfix log-item -' + type + '">' +
					'<div class="log-item-date">' + utils.timeString(date) + '</div>' +
					'<div class="log-item-message">' + msg + '</div>' +
					(stack ? '<pre class="log-item-stack">' + require('util').inspect(stack, { depth: null, showHidden: true, colors: false }).replace(/\\n/g, '\n') + '</pre>' : '') +
				'</div>';

			$element[options.containerMethod](template);

			return Promise.resolve(msg);
		},
		reset: function () {
			$element.html('');

			return Promise.resolve();
		}
	};
};
