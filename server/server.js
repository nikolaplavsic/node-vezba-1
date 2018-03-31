var express = require('express');
var consolidate = require('consolidate');

var app = express();

// some dummy data
var nikola = require('./../params.js');
var nemanja = {
    name: "Nemke22",
    age: 31,
    nationality: 'Serbian'
};
var vera = {
    name: "Vera",
    age: 25,
    nationality: 'Serbian'
};


// set handlebars as default template engine for html extension
app.engine('html', consolidate.handlebars);

// set /views as default template location
app.set('views', __dirname + '/../views');

// set html as default template extension
app.set('view engine', 'html');

// use express static router for serving static files
var staticRouter = express.static(__dirname + '/../public');
app.use(staticRouter);

// handle GET Request at /test URL
app.get('/test', function (request, response) {
    // response.sendFile(__dirname + '/views/index.html');
    response.render('index', {
        nikola: nikola,
        nemanja: nemanja,
        vera: vera,
        list: [1, 2, 3, 4, 5]
    });
});





app.listen(8080, function () {
    console.log('server started');
});



