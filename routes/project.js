module.exports = function (data) {
	var express = require('express');
	var router = express.Router();

	/* GET about */
	router.get('/', function(req, res) {
		res.render('project/index', { title:"Project Status", user: req.session.user });
	});

	/* GET status */
	router.get('/status', function(req, res) {
		res.render('project/detail', { title:"Project Status", user: req.session.user });
	});

	/* GET-POST project */
	router.post('/create/sdl', function(req, res) {
		res.redirect('/project/manage');
	});

	/* GET-POST sprint */
	router.post('/create/sprint', function(req, res) {
		res.redirect('/project/manage');
	});

	/* GET-POST sprint task */
	router.post('/create/task', function(req, res) {
		res.redirect('/project/manage');
	});

	/* GET-POST story */
	router.post('/create/story', function(req, res) {
		res.redirect('/project/manage');
	});

	/* GET project manager */
	router.get('/manage', function(req, res) {
		res.render('project/manage', { title:"Manage Project", user: req.session.user });
	});
	
	return router;
};