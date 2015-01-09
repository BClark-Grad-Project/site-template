module.exports = function (data) {
	var express = require('express');
	var router = express.Router();
	var createObj = require('./objects/user');
	var backURL;
	
	/* Login */
	router.post('/', function(req, res, next) {
		var authorization = createObj.getAuthenticationObj(req);
		data.profile.verify(req.session, authorization, function(err, user){
			if(err){console.log(err);}
			res.redirect('/');			
		});
	});

	/* Logout */
	router.get('/logout', function(req, res, next) {
		data.secure.destroy(req.session, function(fail, success){
			if(fail){console.log(fail);}
			backURL= '/';
			res.redirect(backURL);
		});
	}); 

	/* Register */
	router.post('/register', function(req, res, next) {
		var authorization = createObj.getRegistrationObj(req);
		data.profile.create(req.session, authorization,function(err, user){
			if(err){console.log('error : ', err, user);}
			res.redirect('/');
		});
	});
	
	return router;
};