module.exports = function (data) {
	var express = require('express');
	var router = express.Router();

	/* Manage Account Detail */
	router.get('/', function(req, res, next) {
		data.user.get.profile(req.session.user.id, function(err, user){
			res.render('user/profile', {title:"Manage Account", user: user });
		});
	});

	return router;
};