// Load "Site" components.
var data = require('site-data');
//var secure = data.secure;

var app = require('./app.js')(data);
var http = require('http');
//var https = require('https');

app.set('port', process.env.PORT || 80);
//app.set('secure', secure.port());

var httpServer = http.createServer(app).listen(app.get('port'));
//var server = https.createServer(secure.options(), app).listen(app.get('secure'));