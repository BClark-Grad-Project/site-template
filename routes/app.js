module.exports = function(data) {
	var express = require('express');
	var router = express.Router();
	var createObj = require('./objects/app.js');
	
	router.get('/', data.auth.grantOwner, function(req, res, next) {
		
		data.api.read({user:req.session.user.id}, function(err, appsData){
			if(err){
				console.log('Application search error: ', err);
				req.redirect('/app');
			} else res.render('app/index', { title:req.app.locals.service_name, user: req.session.user, apps: appsData });
		});
	});

	router.get('/new', data.auth.grantOwner, function(req, res, next) {
		res.render('app/create', { title:req.app.locals.service_name, user: req.session.user });
	}).post('/new', data.auth.grantOwner, function(req, res, next) {
		var app = createObj.newApp(req);
		
		data.api.create(app, function(err, appData){
			if(err) {
				console.log('Application create error: ', err);
				req.redirect('/app');
			} else res.render('app/app', { title:req.app.locals.service_name, user: req.session.user, app: appData });			
		});
	});

	router.get('/edit/:id', data.auth.grantOwner, function(req, res, next) {
		data.api.read({id:req.params.id}, function(err, appData){
			if(err){
				console.log('Application search error: ', err);
				req.redirect('/app');
			} else res.render('app/app', { title:req.app.locals.service_name, user: req.session.user, app: appData[0] });
		});
	}).post('/edit', data.auth.grantOwner, function(req, res, next) {
		var app = createObj.updateApp(req);
		
		data.api.update(app, function(err, appData){
			if(err) {
				console.log('Application update error: ', err);
				req.redirect('/app');
			} else res.render('app/app', { title:req.app.locals.service_name, user: req.session.user, app: appData });			
		});
	});
	
	router.get('/delete/:id', data.auth.grantOwner, function(req, res, next) {
		data.api.remove({id:req.params.id}, function(err, result){
			if(err) {
				console.log('Application delete error: ', err);
				req.redirect('/app');
			} else res.redirect('/app');
		});
	});

	router.get('/rekey/:id', data.auth.grantOwner, function(req, res, next) {		
		data.api.rekey({id:req.params.id}, function(err, appData){
			if(err) {
				console.log('Application rekey error: ', err);
				req.redirect('/app');
			} else res.render('app/app', { title:req.app.locals.service_name, user: req.session.user, app: appData });			
		});
	});
	
	return router;
};