module.exports = function (data) {
	var express = require('express');
	var router = express.Router();
	var createObj = require('./objects/user');
	var backURL;
	
	var registrationError = function(err){
		if(err){
			return {type:'email_taken', detail:''};
		} else if(err.type == 'email_null'){
			return {type:'email_null', detail:'The email adrress was not provided by social registration.'};
		} else if(err){
			return {type:'alias_taken', detail:''};
		} else if(err.type == 'alias_null'){
			return {type:'alias_null', detail:'The alias was not provided by social registration.'};
		} else {
			return {type:'null', detail:'No authentication detail has been provided for social registration.'};
		}
	};
	
	var fixRegistration = function(res, err, user){
		res.render('auth/fixregistration', {title: 'Please Retry Registration', user: req.session.user, retry: user, err: registrationError(err)});
	};
	
	/* Login */
	router.post('/', function(req, res, next) {
		var authorization = createObj.getAuthenticationObj(req);
		data.profile.verify(req.session, authorization, function(err, user){
			if(err){
				console.log(err);
			} else {
				backURL=req.header('Referer') || '/';
				res.redirect(backURL);
			}
		});
	});

	/* Logout */
	router.get('/logout', function(req, res, next) {
		data.secure.destroy(req.session, function(fail, success){
			if(fail){console.log(fail);}
			backURL=req.header('Referer') || '/';
			res.redirect(backURL);
		});
	}); 

	/* Register */
	router.post('/register', function(req, res, next) {
		var authorization = createObj.getRegistrationObj(req);
		if(!req.body.email && !req.body.alias){
			fixRegistration(req, {}, authorization);
		} else if(!req.body.alias) {
			fixRegistration(req, {type:'alias_null'}, authorization);
		} else if(!req.body.email) {
			fixRegistration(req, {type:'email_null'}, authorization);
		}
		console.log('registering', authorization);
		data.profile.create(req.session, authorization,function(err, user){
			if(err){
				console.log('error : ', err);
				fixRegistration(res, err, user);
			} else {
				backURL=req.header('Referer') || '/';
				res.redirect(backURL);
			}
		});
	});
	
	return router;
};