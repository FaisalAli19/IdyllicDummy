process.title = "idyllic_app"; // Do Not Delete this line
var express = require('express'),
    path = require('path'),
    app = express(),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');

app.set('assets_path', (process.env.NODE_ENV === 'prod') ? 'dist' : 'build');

app.set('views', path.join(__dirname, app.get('assets_path') + '/views'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, app.get('assets_path'))));

// process.json_data = parseDataFiles();

var	routes = require('./routes/index'),
    nunjucks_init = require('./routes/nunjucks_init'),
    api_routes = require('./routes/api');

nunjucks_init(app);

app.set('port', process.env.PORT || 8000);

// serve index and view partials

app.use('/', routes);
app.use('/api/', api_routes);
app.use(express.static('public'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('404.html');
});


// Kick start our server
app.listen(app.get('port'), function() {
    console.log('Server started on port', app.get('port'));
});

module.exports = app;
