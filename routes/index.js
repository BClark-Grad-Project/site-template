module.exports = function (data) {
	var express = require('express');
	var router = express.Router();
	var github = require("octonode");
	var marked = require('marked');
	marked.setOptions({
		  highlight: function (code, lang, callback) {
		    require('pygmentize-bundled')({ lang: lang, format: 'html' }, code, function (err, result) {
		      callback(err, result.toString());
		    });
		  }
		});

	var client = github.client('OAUTHKEYENTRY');
	var ghme   = client.user('BClark-Grad-Project');
	/* GET home page. */
	router.get('/', function(req, res) {	
		// Build the authorization config and url
		ghme.events(1,10,["PushEvent", "CreateEvent"], function (err, git, headers) {
			if(err){console.error(err);}
			
			data.blog.recent(1, 'site', function(err, blog){
				if(err){console.error(err);}
				
				for(var i in blog){
			    	blog[i].article.description = marked(blog[i].article.description);
			    }
				data.project.read({active:true},function(err, project){
					if(err){console.error(err);}
					/*if(project.description){
					project.description = marked(project.description);
					}
					if(project.vision){
						project.vision = marked(project.vision);
					}*/
					
					res.render('index', {git:git, project:project, blog:blog, title:"Brandon Clark's MS Project | Mind Research", user: req.session.user });
				});
			});
		});
	});
	
	return router;
};