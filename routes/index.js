module.exports = function (data) {
	var express = require('express');
	var router = express.Router();
	var github = require("octonode");
	/* GET home page. */
	router.get('/', function(req, res) {
	
		// Build the authorization config and url
		var client = github.client('caf298682e6e30aa710cc07cffb9fda6835ed505');
		var ghme   = client.user('BClark-Grad-Project');
		ghme.events(1,10,["PushEvent", "CreateEvent"], function (err, git, headers) {
			if(err){console.error(err);}
			console.log(git);
			data.blog.recent(1, 'site', function(err, blog){
				if(err){console.error(err);}
			
				res.render('index', {git:git, blog:blog, title:"coming soon", user: req.session.user });
			});
		});
	});
	
	return router;
};