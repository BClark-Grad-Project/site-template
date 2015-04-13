module.exports = function (data) {
	var express = require('express');
	var router = express.Router();
	
	/* GET home page. */
	router.get('/', function(req, res) {
		res.render('survey/index', {title:req.app.locals.service_name, user: req.session.user });
	});
	
	return router;
};   