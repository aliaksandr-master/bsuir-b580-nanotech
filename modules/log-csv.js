'use strict';

var _ = require('lodash');
var fs = require('fs');

module.exports = function (fileName) {
	var columns = null;
	var columnsLength = 0;

	var commit = function (str) {
		return new Promise(function (resolve, reject) {
			fs.appendFile(fileName, str + '\n', function (err) {
				if (err) {
					return reject(err);
				}

				resolve();
			});
		});
	};

	return {
		commit: function (data) {
			var promise;

			if (columns) {
				promise = Promise.resolve();
			} else {
				columns = _.keys(data);
				columnsLength = columns.length;
				promise = commit(columns.join(','));
			}

			return promise.then(function () {
				var elms = [];

				for(var i = 0; i < columnsLength; i++) {
					elms.push(String(data[columns[i]]).replace('.', ','));
				}

				return elms.join(',');
			}).then(commit);
		}
	};
};
