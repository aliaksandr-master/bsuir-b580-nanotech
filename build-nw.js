var NwBuilder = require('nw-builder');

var nw = new NwBuilder({
	buildDir: './build',
	cacheDir: './.build-nw-cache',
	files: './.tmp/**/*', // use the glob format
	platforms: [ 'win32', 'win64' ]
});

//Log stuff you want

nw.on('log',  console.log);

// Build returns a promise
nw.build()
	.then(function () {
		console.log('all done!');
	}, function (err) {
		console.error(err);
	});
