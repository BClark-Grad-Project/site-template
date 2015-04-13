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
		data.blog.recent(10, 'site', function(err, blog){
			if(err){console.error(err);}
			
			for(var i in blog){
		    	blog[i].article.description = marked(blog[i].article.description);
		    }
			res.render('index', {blog:blog, title:req.app.locals.service_name, user: req.session.user });
		});
	});
	
	router.get('/guide', function(req, res) {	
		res.render('guide', {title:req.app.locals.service_name, user: req.session.user });
	});
	
	router.get('/apidocs', function(req, res) {	
		res.render('apidocs', {title:req.app.locals.service_name, user: req.session.user });
	});
	
	return router;
};