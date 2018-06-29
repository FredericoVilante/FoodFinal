var express = require('express');
var session = require('express-session');
var bodyParser= require('body-parser');
var path = require('path');
var engine = require('consolidate');

var app = express();

app.use(session({secret: 'ssshhhhh',
                 resave: false,
                 saveUninitialized: true
                }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));


var index = require('./routes/index');
app.use('/', index);
var admin = require('./routes/admin');
app.use('/admin', admin);
var user = require('./routes/user');
app.use('/user', user);
var establecimento = require('./routes/establecimento');
app.use('/establecimento', establecimento);
var estafeta = require('./routes/estafeta');
app.use('/estafeta', estafeta);

app.set('views', __dirname + '/public');
app.engine('html', engine.mustache);
app.set('view engine', 'html');


app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

app.listen(3000, console.log('Food.pt running on port 3000!'));


module.exports = app;
