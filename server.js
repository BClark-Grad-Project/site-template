var data = require('authentication');
var app = require('./app.js')(data);
var https = require('https');
var http = require('http');

app.set('port-ssl', process.env.PORT || 3443);
app.set('port', process.env.PORT || 3000);

var server = https.createServer(data.https(), app).listen(app.get('port-ssl'));
var httpServer = http.createServer(app).listen(app.get('port'));