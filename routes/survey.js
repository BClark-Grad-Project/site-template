module.exports = function (data) {
	var express = require('express');
	var router = express.Router();
	
	/* GET home page. */
	/* Note: For now the following three routes can lead to the same page so long as it filters 
	 * these sections.  If time permits try and make the page dynamic in its presentation*/
	router.get('/', function(req, res, next) {
		res.render('survey/index', {title:req.app.locals.service_name, user: req.session.user });
	});
	router.get('/open', function(req, res, next) {
		res.render('survey/index', {title:req.app.locals.service_name, user: req.session.user });
	});
	router.get('/closed', function(req, res, next) {
		res.render('survey/index', {title:req.app.locals.service_name, user: req.session.user });
	});
	
	/* GET CCA pages. */
	router.get('/create', function(req, res, next) { // Create
		res.render('survey/create', {title:req.app.locals.service_name, user: req.session.user });
	});
	router.get('/conduct', function(req, res, next) { // Conduct
		res.render('survey/conduct', {title:req.app.locals.service_name, user: req.session.user });
	});
	router.get('/analyze', function(req, res, next) { //Analyze
		res.render('survey/analyze', {title:req.app.locals.service_name, user: req.session.user });
	});

	/* GET questionnaire list */	
	router.get('/user', function(req, res, next) { // Open & Closed
		res.render('survey/manage', {title:req.app.locals.service_name, user: req.session.user });
	});	
	router.get('/open/user', function(req, res, next) { // Open
		res.render('survey/manageopen', {title:req.app.locals.service_name, user: req.session.user });
	});	
	router.get('/closed/user', function(req, res, next) { // Closed
		res.render('survey/manageclosed', {title:req.app.locals.service_name, user: req.session.user });
	});	
	
	return router;
};   