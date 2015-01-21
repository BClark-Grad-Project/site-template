module.exports = function (data) {
	var express = require('express');
	var router = express.Router();	
	var createObj = require('./objects/blog');

	/* GET & POST blog article form. */
	router.get('/manager', function(req, res) {
		res.render('blog/post/index', {title:"coming soon", user: req.session.user });
	});	

	/* GET & POST blog article form. */
	router.get('/create', function(req, res) {
		res.render('blog/post/create', {title:"coming soon", user: req.session.user });
	});
	router.post('/create', function(req, res) {
		var blogObj = createObj.newBlog(req);
		data.blog.create(blogObj, function(err, blog){
			if(err){console.error(err);}
			res.redirect('/blog/' + blog.id);			
		});
	});

	/* POST blog comment form. */
	router.post('/create/comment', function(req, res) {		
		var comment = createObj.newComment(req);
		data.blog.create(comment, function(err, blog){	
			if(err){console.error(err);}		
			res.redirect('/blog/' + blog.id);
		});
	});
	
	/* GET blog home page. */
	router.get('/', function(req, res) {
		data.blog.recent(100, 'site', function(err, blogs){
			if(err){console.error(err);}
			
			data.blog.top(10, 'site', function(err, top){
				if(err){console.error(err);}
			
				res.render('blog/index', {blogs: blogs, top: top, title:"coming soon", user: req.session.user });
			});
		});
	});

	/* GET blog article page. */
	router.get('/:id', function(req, res) {
		var id = req.params.id;
		data.blog.read(id, function(err, blog){
			if(err){console.error(err);}
			
			data.blog.recent(10, 'site', function(err, recent){
				if(err){console.error(err);}
				
				res.render('blog/article', {blog: blog, recent: recent, title:"coming soon", user: req.session.user });
			});
		});
	});

	/* POST article edit. */
	router.post('/update/:id', function(req, res) {
		var id = req.params.id;
		res.redirect('/blog/article/' + id);
	});

	/* POST article removal */
	router.post('/remove/:id', function(req, res) {
		var id = req.params.id;
		res.redirect('/blog');
	});
	
	/* POST article comment removal */
	router.post('/remove/comment/:id', function(req, res) {
		var id = req.params.id;
		res.redirect('/blog');
	});
	
	return router;
};