// Load "Site" components.
var data = require('site-data');
var secure = data.secure;

var app = require('./app.js')(data);
var https = require('https');
var http = require('http');

// Secured port uses 'secure' namespace.
app.set('secure', secure.port());
app.set('port', process.env.PORT || 80);

var server = https.createServer(secure.options(), app).listen(app.get('secure'));
var httpServer = http.createServer(app).listen(app.get('port'));
