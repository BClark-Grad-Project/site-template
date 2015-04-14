module.exports = function (data) {
	var express = require('express');
	var router = express.Router();
	
	/* GET home page. */
	router.get('/', function(req, res) {
		res.render('survey/index', {title:req.app.locals.service_name, user: req.session.user });
	});

	router.get('/user', function(req, res) {
		res.render('survey/manage', {title:req.app.locals.service_name, user: req.session.user });
	});

	router.get('/create', function(req, res) {
		res.render('survey/create', {title:req.app.locals.service_name, user: req.session.user });
	});

	router.get('/conduct', function(req, res) {
		res.render('survey/conduct', {title:req.app.locals.service_name, user: req.session.user });
	});

	router.get('/analyze', function(req, res) {
		res.render('survey/analyze', {title:req.app.locals.service_name, user: req.session.user });
	});

	router.get('/open', function(req, res) {
		res.render('survey/index', {title:req.app.locals.service_name, user: req.session.user });
	});
	
	router.get('/open/user', function(req, res) {
		res.render('survey/manageopen', {title:req.app.locals.service_name, user: req.session.user });
	});

	router.get('/closed', function(req, res) {
		res.render('survey/index', {title:req.app.locals.service_name, user: req.session.user });
	});
	
	router.get('/closed/user', function(req, res) {
		res.render('survey/manageclosed', {title:req.app.locals.service_name, user: req.session.user });
	});
	
	return router;
};   