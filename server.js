var fs = require('fs');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var config = require('./config.js');
var consolidate = require('consolidate');
var Handlebars = require('handlebars');

var db = require('orchestrate')(config.dbKey);

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.engine('html', consolidate.handlebars);
app.set('view engine', 'html');
app.set('views', __dirname + '/server-templates');

var partials = "./server-templates/partials/";
fs.readdirSync(partials).forEach(function (file) {
  var source = fs.readFileSync(partials + file, "utf8"),
      partial = /(.+)\.html/.exec(file).pop();

  Handlebars.registerPartial(partial, source);
});

// express routes

app.get('/', function (req, res) {
  res.render('./index.html');
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.get('/api/discogsUsers', function (req, res) {
  var rpUsers = [];
  db.list('rpUsers')
  .then(function (result) {
    result.body.results.forEach(function (item){
      rpUsers.push(item.value);
    });
    res.json(rpUsers);
  })
  .fail(function (err) {
    console.error(err);
  });
});

app.get('/api/discogsUsers/:id', function (req, res) {
  var rpUsers = [];
  db.get('rpUsers', req.body.id, req.body)
  .then(function (result) {
    result.body.results.forEach(function (item){
      rpUsers.push(item.value);
    });
    res.json(rpUsers);
  })
  .fail(function (err) {
    console.error(err);
  });
});

app.post('/api/discogsUsers', function (req, res){
  req.accepts('application/json');
  var rpUsers = req.body;
  db.put('rpUsers', rpUsers.id, rpUsers.user, false)
  .then(function (){
    res.send(200, 'Welcome Discogs User');
  })
  .fail(function (err) {
    console.error(err);
  });
});

app.put('/api/discogsUsers/:id', function (req, res){
  req.accepts('application/json');
  var rpUsers = req.body;
  db.put('rpUsers', rpUsers.id, rpUsers.user, false)
  .then(function (){
    res.send(200, 'Welcome Discogs User');
  })
  .fail(function (err) {
    res.send(err);
  });
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        // res.render('error', {
        //     message: err.message,
        //     error: err
        // });
    res.send(err);
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    // res.render('error', {
    //     message: err.message,
    //     error: {}
    // });
    res.send(err);
});

app.set('port', process.env.PORT || 3000);



app.listen(app.get('port'), function() {
  console.log('Express server listening on port # ' + app.get('port'));
});
