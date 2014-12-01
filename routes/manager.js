module.exports = function (data) {
	var express = require('express');
	var router = express.Router();
	
	router.get('/content', function(req, res, next){
		res.render('admin/content/content', {title:"coming soon", user: req.session.user });
	});

	
	router.get('/users', function(req, res, next){
		res.render('admin/user/users', {title:"coming soon", user: req.session.user });
	});
	
	return router;
};