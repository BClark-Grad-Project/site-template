module.exports = function (data) {
	var express = require('express');
	var router = express.Router();
	var backURL;
	var getAuthenticationObj = function(req){		
		return userObj = {
				email: req.body.user,
				password: req.body.password,
				remember: req.body.remember
			};
	};
	
	/* GET home page. */
	router.post('/', function(req, res, next) {
		data.login(req.session, getAuthenticationObj(req), function(err, user){
			if(err){
				console.log(err);
			}
			res.render('index', {title:"coming soon", user: req.session.user });			
		});
	});

	/* GET home page. */
	router.get('/logout', function(req, res, next) {
		data.logout(req.session, function(err, success){
			backURL=req.header('Referer') || '/';
			res.redirect(backURL);
		});
	});
	
	return router;
};