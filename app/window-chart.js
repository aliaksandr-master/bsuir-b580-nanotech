'use strict';

var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;

module.exports = function ($chartWr, options) {
	options = _.extend({
		name: ''
	}, options);

	var emitter = new EventEmitter();

	$chartWr.highcharts({
		chart: {
			//zoomType: 'x',
			type: 'area',
			spacing: [0, 0, 0, 0],
			animation: false,
			events: {
				load: function () {
					var that = this;

					emitter.on('reset', function () {
						_.each(that.series, function (series) {
							series.setData([{ x: 0, y: 0 }]);
						});
					});

					emitter.on('data', function (seriesN, data) {
						that.series[seriesN].addPoint([ data.x, data.y ]);
					});
				}
			}
		},
		title: {
			text: options.name
		},
		xAxis: {
			min: 0
		},
		yAxis: {
			title: false,
			min: 0,
			plotLines: [
				{
					value: 0,
					width: 1,
					color: '#808080'
				}
			]
		},
		legend: {
			enabled: false
		},
		series: options.series
	});

	return {
		commit: function (seriesN, data) {
			emitter.emit('data', seriesN, data);

			return Promise.resolve(data);
		},
		reset: function () {
			emitter.emit('reset');

			return Promise.resolve();
		}
	};
};

