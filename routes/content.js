module.exports = function (data) {
	var express = require('express');
	var router = express.Router();
	
	router.get('/', function(req, res, next){
		res.render('admin/content/content', {title:"coming soon", user: req.session.user });
	});
	
	return router;
};