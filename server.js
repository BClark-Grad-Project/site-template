// Load "Site" components.
var data = require('site-data');

var app = require('./app.js')(data);
var http = require('http');

app.set('port', process.env.PORT || 80);

var httpServer = http.createServer(app).listen(app.get('port'));
