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

				resolve(str);
			});
		});
	};

	var prepareNumber = function (number) {
		return String(number).replace('.', ','); // for excel
	};

	var dataToString = function (data) {
		var elms = [];
		var i;

		for(i = 0; i < columnsLength; i++) {
			elms.push(prepareNumber(data[columns[i]]));
		}

		return elms.join(';');
	};

	var runChain = function (data) {
		if (columns) {
			return Promise.resolve(data);
		}

		columns = _.keys(data);
		columnsLength = columns.length;

		return commit(columns.join(';')).then(function () { return data; });
	};

	return {
		commit: function (data) {
			return runChain(data).then(dataToString).then(commit).then(function () { return data; });
		}
	};
};
