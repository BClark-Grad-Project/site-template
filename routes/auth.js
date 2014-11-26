module.exports = function (data) {
	var express = require('express');
	var router = express.Router();
	var backURL;
	var getAuthenticationObj = function(req){		
		var user     = req.body.user     ? req.body.user     : undefined;
		var password = req.body.password ? req.body.password : undefined;
		var remember = req.body.remember ? req.body.remember : undefined;
		
		return {
				user:     user,
				password: password,
				remember: remember
			};
	};
	var getUserObj = function(req){
		var name     = req.body.name     ? req.body.name     : undefined;
		var email    = req.body.email    ? req.body.email    : undefined;
		var password = req.body.password ? req.body.password : undefined;
		
		return {
				name:     name,
				email:    email,
				password: password,
				type:     'user'
			};
	};
	var getDetailObj = function(req){
	    var first  = req.body.first  ? req.body.first  : undefined;
	    var middle = req.body.middle ? req.body.middle : undefined;
	    var last   = req.body.last   ? req.body.last   : undefined;
	    var birth  = req.body.birth  ? req.body.birth  : undefined;
	    var gender = req.body.gender ? req.body.gender : undefined;
	    
		return {
		    first:  first,
		    middle: middle,
		    last:   last,
		    birth:	birth,
		    gender:	gender
		};
	};
	var getContactsObj = function(req){
	    var type    = req.body.type    ? req.body.type    : undefined;
	    var phone   = req.body.phone   ? req.body.phone   : undefined;
	    var addr    = req.body.addr    ? req.body.addr    : undefined;
	    var addr_2  = req.body.addr_2  ? req.body.addr_2  : undefined;
	    var city    = req.body.city    ? req.body.city    : undefined;
	    var state   = req.body.state   ? req.body.state   : undefined;
	    var zip     = req.body.zip     ? req.body.zip     : undefined;
	    var country = req.body.country ? req.body.country : undefined;
	    
		return {
		    type:     type,
		    phone:    phone,
		    addr:     addr,
		    addr_2:   addr_2,
		    city:     city,
		    state:    state,
		    zip:      zip,
		    country:  country
		};
	};
	var getRegistrationObj = function(req){
		var registration = {};
		var user = getUserObj(req);
		var detail = getDetailObj(req);
		var contacts = getContactsObj(req);
		
		registration.user = user;
		registration.detail = detail;
		registration.contact = contacts;
		
		return registration;
	};
	
	/* Login */
	router.post('/', function(req, res, next) {
		var authorization = getAuthenticationObj(req);
		data.login(req.session, authorization, function(err, user){
			if(err){console.log(err, user);}
			res.render('index', {title:"coming soon", user: req.session.user });			
		});
	});

	/* Logout */
	router.get('/logout', function(req, res, next) {
		data.logout(req.session, function(err, success){
			backURL=req.header('Referer') || '/';
			res.redirect(backURL);
		});
	}); 

	/* Register */
	router.post('/register', function(req, res, next) {
		var authorization = getRegistrationObj(req);
		data.register(req.session, authorization,function(err, user){
			if(err){console.log('error : ', err, user);}
			res.redirect('/');
		});
	});
	
	router.get('/admin', function(req, res, next){
		res.render('admin/user/users', {title:"coming soon", user: req.session.user });
	});
	
	return router;
};