module.exports = function (data) {
	var express = require('express');
	var router = express.Router();	
	var createObj = require('./objects/blog');
	var marked = require('marked');
	var fs = require('fs');

	var AWS = require('aws-sdk'); 


 
	marked.setOptions({
		  highlight: function (code, lang, callback) {
		    require('pygmentize-bundled')({ lang: lang, format: 'html' }, code, function (err, result) {
		      callback(err, result.toString());
		    });
		  }
		});

	var Path = __dirname;

	function nameMerge (title) {
	  title = title.replace(/[/\.../]/gi, '');
	  var merged = title.split(' ').join('_');
	  return merged;
	}

	function imgExtention (type) {
	  var extention;
	  if (type == 'image/jpeg') {
	    extention='jpg';
	  } else if (type == 'image/png') {
	    extention='png';
	  } else if (type == 'image/gif') {
	    extention='gif';
	  } else {
	    // default image
	    extention = 'png';
	  }
	  return extention;
	}

	function writeImage (image, title) {
	  var imageName = nameMerge(title) + '.' + imgExtention(image.type);
	  return imageName;
	}

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
			
			// if blog post success upload image to aws s3 storage
			if(req.files.image){
				var image = writeImage(req.files.image, req.body.title);
				var s3 = new AWS.S3({params: {Bucket: 'blogguts', Key: image}}); 
				s3.upload({Body: fs.createReadStream(req.files.image.path), ACL:'public-read'}).on('httpUploadProgress', function(evt) { console.log(evt); }).send(function(err, data) { console.log(err, data) });
			}
			console.log(blog);
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
			    for(var i in blogs){
			    	blogs[i].article.description = marked(blogs[i].article.description);
			    }
				res.render('blog/index', {blogs: blogs, top: top, title:"coming soon", user: req.session.user});
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
				blog.article.description = marked(blog.article.description);
				console.log(marked(blog.article.description));
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
		res.redirect('/blog');
	});
	
	/* POST article comment removal */
	router.post('/remove/comment/:id', function(req, res) {
		res.redirect('/blog');
	});
	
	return router;
};