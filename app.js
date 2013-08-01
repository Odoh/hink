var connect = require('connect')
  , resource = require('resource-router')
  , config = require('./config');

var app = connect.createServer();
app.use(connect.bodyParser());

//Custom middleware to set all response types to JSON
//Doesn't seem to work, though.
app.use(function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  next();
});

// Assign controllers for different prefixes
app.use('/notes', resource(require('./controllers/Notes')));

app.listen(config.port);

module.exports = app;
