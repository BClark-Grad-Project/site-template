module.exports = function (data) {
	var express = require('express');
	var router = express.Router();
	var createObj = require('./objects/user');
	var backURL;
	
	/* Login */
	router.post('/', function(req, res, next) {
		var authorization = createObj.getAuthenticationObj(req);
		data.login(req.session, authorization, function(err, user){
			if(err){console.log(err, user);}
			res.render('index', {title:"coming soon", user: req.session.user });			
		});
	});

	/* Logout */
	router.get('/logout', function(req, res, next) {
		data.logout(req.session, function(err, success){
			backURL=req.header('Referer') || '/';
			res.redirect(backURL);
		});
	}); 

	/* Register */
	router.post('/register', function(req, res, next) {
		var authorization = createObj.getRegistrationObj(req);
		data.register(req.session, authorization,function(err, user){
			if(err){console.log('error : ', err, user);}
			res.redirect('/');
		});
	});
	
	router.get('/admin', function(req, res, next){
		res.render('admin/user/users', {title:"coming soon", user: req.session.user });
	});
	
	return router;
};