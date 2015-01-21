var getComment = function(req, id){
	var comment = {
			  id:            req.body.id,
			  comment:{
				blog:        req.body.blog,
                author:      req.session.user.credentials.alias,
			    description: req.body.description}
	};
	
	return comment;
};

var getBlog = function(req){
	var blog = {
		  author:        req.session.user.credentials.alias,
		  type:          req.body.type,
		  notice:{
			visits:      req.body.visits,
			favorites:   req.body.favorites},
		  article:{
		    title:       req.body.title,
		    description: req.body.description}
	};

	if(req.body.written){
		blog.written = req.body.written;
	}
	
	if(req.body.editId){
		blog.edit    = {
			id:   req.body.editId,
			last: req.body.last
		};
	}

	if(req.body.tags){
		blog.tags    =  req.body.tags;
	}
	
	if(req.body.image){
		blog.article = {image: req.body.image};
	}
	
	return blog;	
};

module.exports.newBlog = function(req){
	var blog = getBlog(req);
	
	return blog;
};

module.exports.newComment = function(req){
	var comment = getComment(req);
	
	return comment;
};