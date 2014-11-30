module.exports = function (data) {
	var express = require('express');
	var router = express.Router();
	var createObj = require('./objects/user');

	/* Manage Account Detail */
	router.get('/', function(req, res, next) {
		data.user.get.profile(req.session.user.id, function(err, user){
			res.render('user/profile', {title:"Manage Account", user: user });
		});
	}).post('/', function(req, res, next) {
		var userObj = createObj.getUserObj(req);
		
		data.updateProfile(userObj, function(err, user){
			res.redirect('/');
		});
	});

	return router;
};