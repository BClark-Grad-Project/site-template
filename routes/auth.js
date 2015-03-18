module.exports = function (data) {
	var express = require('express');
	var router = express.Router();
	var createObj = require('./objects/user');
	var backURL;
	
	var registrationError = function(err){
		if(err.type == 'email_taken'){
			return {type:'email_taken', detail:'The email address has already been registered.'};
		} else if(err.type == 'email_null'){
			return {type:'email_null', detail:'The email adrress was not provided by social registration.'};
		} else if(err.type == 'alias_taken'){
			return {type:'alias_taken', detail:'The login name has already been registered.'};
		} else if(err.type == 'alias_null'){
			return {type:'alias_null', detail:'The alias was not provided by social registration.'};
		} else {
			return {type:'null', detail:'No authentication detail has been provided for social registration.'};
		}
	};
	
	var fixRegistration = function(req, err, user){
		var errType = registrationError(err);
		return {title: 'Please Retry Registration', user: req.session.user, retry: user, err: errType};
	};
	
	/* Login */
	router.post('/', function(req, res, next) {
		var authorization = createObj.getAuthenticationObj(req);
		data.profile.verify(req.session, authorization, function(err, user){
		    backURL=req.header('Referer') || '/';
			if(err){
				console.log('Login error: ', err);
				res.redirect(backURL);
			} else {
				console.log('Logged in:', user);
				res.redirect(backURL);
			}
		});
	});

	/* Logout */
	router.get('/logout', function(req, res, next) {
		data.secure.destroy(req.session, function(fail, success){
			if(fail){console.log(fail);}
			
			res.redirect('/');
		});
	}); 

	/* Register */
	router.post('/register', function(req, res, next) {
		var authorization = createObj.getRegistrationObj(req);
		var retry = {};
		if(!req.body.email && !req.body.alias){
			retry = fixRegistration(req, {}, authorization);
			res.render('auth/fixregistration', retry);
		} else if(!req.body.alias) {
			retry = fixRegistration(req, {type:'alias_null'}, authorization);
			res.render('auth/fixregistration', retry);
		} else if(!req.body.email) {
			retry = fixRegistration(req, {type:'email_null'}, authorization);
			res.render('auth/fixregistration', retry);
		} else {
			console.log('registering', authorization);
			data.profile.create(req.session, authorization,function(err, user){
				if(err){
					console.log('error : ', err);
					retry =	fixRegistration(req, err, user);
					res.render('auth/fixregistration', retry);
				} else {
					res.redirect('/account');
				}
			});
		}
	}).post('/register/add/social', function(req, res, next) {
		var authorization = createObj.getSocialRegistrationObj(req);
		
		console.log('registering new social', authorization);
		data.profile.create(req.session, authorization,function(err, user){
			if(err){
				console.log('social registration error : ', err);
				next(err);
			} else {
				console.log('social registration success: ', user);
				res.redirect('/account');
			}
		});
	}).post('/register/add/service', function(req, res, next) {
		var authorization = createObj.getServiceRegistrationObj(req);
		var retry = {};
		
		console.log('registering new service', authorization);
		data.profile.create(req.session, authorization,function(err, user){
			if(err){
				console.log('error : ', err);
				retry =	fixRegistration(req, err, user);
				res.render('auth/fixregistration', retry);
			} else {
				res.redirect('/account');
			}
		});
	});
	
	return router;
};