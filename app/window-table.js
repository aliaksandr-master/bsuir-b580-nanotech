'use strict';

var _ = require('lodash');

module.exports = function ($table, options) {
	var columns = null;
	var columnsLength = 0;

	var hasHead = false;

	options = _.extend({
		containerMethod: 'append'
	}, options);

	$table.append('<thead></thead><tbody></tbody>');

	var $head = $table.children('thead').eq(0);
	var $body = $table.children('tbody').eq(0);

	var commit = function (array) {
		return new Promise(function (resolve, reject) {
			var $elem = hasHead ? $body : $head;

			hasHead = true;

			var template = '<tr><td>' + array.join('</td><td>') + '</td></tr>';

			$elem[options.containerMethod](template);

			resolve(array);
		});
	};

	var prepareData = function (data) {
		var elms = [];
		var i;

		for(i = 0; i < columnsLength; i++) {
			elms.push(data[columns[i]]);
		}

		return elms;
	};

	var runChain = function (data) {
		if (columns) {
			return Promise.resolve(data);
		}

		columns = _.keys(data);
		columnsLength = columns.length;

		return commit(columns).then(function () { return data; });
	};

	return {
		commit: function (data) {
			return runChain(data).then(prepareData).then(commit).then(function () { return data; });
		},
		reset: function () {
			$body.html('');

			return Promise.resolve();
		}
	};
};
