var nodemon = require('nodemon');
var path = require('path');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');

var compiler = webpack(webpackConfig);

var watcher = compiler.watch({}, function (err, stats) {
    // Print watch/build results
    // console.log(stats);
});

process.on('exit', function () {
    watcher.close(function () {
        console.log('webpack watch stopped');
    });
});

nodemon(
    {
        script: path.join(__dirname, 'server', 'server.js'),
        watch: ['server/*']
    }
).on('restart', function(){
    console.log('server restarted');
});