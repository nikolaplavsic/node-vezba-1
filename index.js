var nodemon = require('nodemon');
var path = require('path');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');

var compiler = webpack(webpackConfig);

// We give notice in the terminal when it starts bundling and
// set the time it started
compiler.plugin('compile', function () {
    console.log('Bundling...');
    bundleStart = Date.now();
});

// We also give notice when it is done compiling, including the
// time it took. Nice to have
compiler.plugin('done', function () {
    console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
});

var watcher = compiler.watch({}, function (err, stats) {
    // Print watch/build results
    // console.log(stats);
});

// process.on('SIGINT', function () {
//     console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
//     // some other closing procedures go here
//     process.exit(1);
//     // watcher.close(function () {
//     //     console.log('webpack watch stopped');
//     // });
// });

nodemon(
    {
        script: path.join(__dirname, 'server', 'server.js'),
        watch: ['server/*']
    }
)
.on('restart', function(){
    console.log('server restarted');
})
.on('SIGTERM', function() {
    console.log('SIGTERM');
})
.on('SIGINT', function () {
    console.log('SIGINT');
});