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
	
function imagePath (image, title) {
  var img = nameMerge(title) + '.' + imgExtention(image.type);
  return img;
}
	
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
	if(req.files.image){
		blog.article.image = 'https://blogguts.s3.amazonaws.com/' + imagePath(req.files.image, req.body.title);
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