module.exports = function (data) {
	var express = require('express');
	var router = express.Router();
	var createObj = require('./objects/user');
	
	// EDIT CONTENT VIEWS
	// Main View
	router.get('/content', function(req, res, next){
		res.render('admin/content/content', {title:"coming soon", user: req.session.user });
	});
	
	// EDIT USER PROFILE
	// Main view
	router.get('/users', function(req, res, next){
		res.render('admin/user/users', {title:"coming soon", user: req.session.user });
	});
	
	// Search view
	router.post('/users/search', function(req, res, next){
		var search = createObj.getSearchObj(req);
		data.searchUsers(search, function(err, userlist){
			res.render('admin/user/search', {title:"User Search Results", user: req.session.user, userlist: userlist});			
		});
	});
	
	// Edit View
	router.get('/users/edit/:profile', function(req, res, next){		
		data.user.get.profile(req.params.profile, function(err, user){
			res.render('user/profile', {title:'Edit ' + user.user.name, user: req.session.user, useraccount: user});			
		});
	}).post('/users/edit', function(req, res, next){
		var userObj    = createObj.getUserObj(req);
		var userAuths  = createObj.getNewAuthObj(req);
		userObj.user   = userAuths;
		
		data.updateProfile(null, userObj, function(err, user){
			console.log(user);
			res.render('user/profile', {title:'Edit ' + user.user.name, user: req.session.user, useraccount: user});			
		});
	});
	
	// Create View
	router.post('/users/create', function(req, res, next){
		res.render('user/profile', {title:"coming soon", user: req.session.user });
	});
	
	return router;
};