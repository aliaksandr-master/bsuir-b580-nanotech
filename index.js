"use strict";

var _ = require('lodash');
var async = require('async');

var config = require('./config');

var detector = require('./modules/detector');
var device = require('./modules/device');

async.series([
	function (done) {
		device.writeSettings({ voltage: 0, current: 0 }, done);
	},
	function (done) {
		setTimeout(function () {
			done();
		}, config.device.initDelay);
	},
	function (done) {
		detector(function (err, dataEmitter) {
			if (err) {
				done(err);
				return;
			}

			console.log('init connect with sensors !');

			dataEmitter.on('error', done);
			dataEmitter.on('data', function (values) {
				console.log(values);
			});
		});
	}
], function (err) {
	console.error('!!!!', err);
	process.exit();
});
