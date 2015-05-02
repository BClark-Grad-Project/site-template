module.exports = function (data) {
	var express = require('express');
	var router = express.Router();
	var marked = require('marked');
	marked.setOptions({
		  highlight: function (code, lang, callback) {
		    require('pygmentize-bundled')({ lang: lang, format: 'html' }, code, function (err, result) {
		      callback(err, result.toString());
		    });
		  }
		});
	
	/* GET home page. */
	router.get('/', function(req, res, next) {	
		// Build the authorization config and url
		
			data.blog.recent(5, 'site', function(err, blog){
				if(err){console.error(err);}
				else data.survey.R.recentSurveys(blog.length + 2, function(err, surveys){					
					for(var i in blog){
				    	blog[i].article.description = marked(blog[i].article.description);
				    }
					res.render('index', {blog:blog, title:req.app.locals.service_name, user: req.session.user, surveys: surveys });
				});
			});
	});

	router.get('/about', function(req, res, next) {
		res.render('about', {title:req.app.locals.service_name, user: req.session.user });
	});

	router.get('/guide', function(req, res, next) {
		res.render('guide', {title:req.app.locals.service_name, user: req.session.user });
	});
	
	return router;
};