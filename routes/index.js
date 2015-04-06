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
	
	/* GET home page. */
	router.get('/', function(req, res) {	
		// Build the authorization config and url
		
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
					
					res.render('index', {project:project, blog:blog, title:req.app.locals.service_name, user: req.session.user });
				});
			});
	});
	
	return router;
};