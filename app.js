module.exports = function (data) {		
	var express      = require('express');
	var path         = require('path');
	var favicon      = require('serve-favicon');
	var logger       = require('morgan');
	var cookieParser = require('cookie-parser');
	var bodyParser   = require('body-parser');
	var multer       = require('multer');
	
	var routeHome    = require('./routes/index')(data);
	var routeAuth    = require('./routes/auth')(data);
	var routeAcct    = require('./routes/account')(data);
	var routeManager = require('./routes/manager')(data);
	var routeBlog    = require('./routes/blog')(data);
	var routeProject = require('./routes/project')(data);
	
	var app = express();
	
	// App description
	app.locals.service_code = 'gradhome';
	app.locals.service_name = 'Brandon\'s Graduate Project';
	
	// view engine setup
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');
	
	app.use(favicon(__dirname + '/public/favicon.ico'));
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(multer({ dest: './uploads/'}));
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, 'public')));
	
	//For session handling.
	app.use(data.secure.create());
	app.use(data.secure.register);
	
	// Force HTTPS connections
	function ensure(req, res, next){
		var port = app.get('port') === 80 ? '' : ':' + app.get('secure'); // Only for testing under local ENV
		
		if(req.secure){
		  // OK, continue
		  return next();
		};
		res.redirect('https://' + req.hostname + port + req.url); 
	};
	app.all('*', ensure); // Top of routes. (Required to push HTTPS on all routes.)
	
	// Route to data manipulation and content
	app.use('/', routeHome);
	app.use('/authentication', routeAuth);
	app.use('/account', routeAcct);
	app.use('/manager', routeManager);
	app.use('/blog', routeBlog);
	app.use('/project', routeProject);
	
	
	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
	    var err = new Error('Not Found');
	    err.status = 404;
	    next(err);
	});
	
	// error handlers
	
	// development error handler
	// will print stacktrace
	if (app.get('env') === 'dev') {
	    app.use(function(err, req, res, next) {
	        res.status(err.status || 500);
	        res.render('error', {
	            message: err.message,
	            error: err,
	            user: req.session.user
	        });
	    });
	}
	
	// production error handler
	// no stacktraces leaked to user
	app.use(function(err, req, res, next) {
	    res.status(err.status || 500);
	    res.render('error', {
	        message: err.message,
	        error: {},
            user: req.session.user
	    });
	});
	
	return app;
};

