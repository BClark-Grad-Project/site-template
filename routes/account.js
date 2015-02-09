module.exports = function (data) {
	var express = require('express');
	var router = express.Router();
	var createObj = require('./objects/user');

	/* Manage Account Detail */
	router.get('/', data.auth.grantOwner, function(req, res, next) {
		data.profile.read(req.session.user.id, function(err, user){
			res.render('user/profile', {title:"Manage Account", user: user });
		});
	}).post('/', data.auth.grantOwner, data.auth.grantAdmin, function(req, res, next) {
		var userObj = createObj.getUserObj(req);
		
		data.profile.update(req.session, userObj, function(err, user){
			res.redirect('/account');
		});
	});

	return router;
};