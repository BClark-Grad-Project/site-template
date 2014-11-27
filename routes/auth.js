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
	var getMobileContactObj = function(req){
	    var carrier = req.body.carriermobile ? req.body.carriermobile  : undefined;
	    var phone   = req.body.phonemobile   ? req.body.phonemobile    : undefined;
	    var ext     = req.body.extmobile     ? req.body.extmobile      : undefined;
	    
		return {
			type:     'mobile',
		    carrier:  carrier,
		    phone:    phone,
		    ext:      ext
		};
	};

	var getHomeContactObj = function(req){
	    var phone   = req.body.phonehome   ? req.body.phonehome    : undefined;
	    var addr    = req.body.addrhome    ? req.body.addrhome     : undefined;
	    var addr_2  = req.body.addr_2home  ? req.body.addr_2home   : undefined;
	    var city    = req.body.cityhome    ? req.body.cityhome     : undefined;
	    var state   = req.body.statehome   ? req.body.statehome    : undefined;
	    var zip     = req.body.ziphome     ? req.body.ziphome      : undefined;
	    
		return {
			type:     'home',
		    phone:    phone,
		    addr:     addr,
		    addr_2:   addr_2,
		    city:     city,
		    state:    state,
		    zip:      zip
		};
	};

	var getOfficeContactObj = function(req){
	    var phone   = req.body.phoneoffice   ? req.body.phoneoffice    : undefined;
	    var ext     = req.body.extoffice     ? req.body.extoffice      : undefined;
	    var addr    = req.body.addroffice    ? req.body.addroffice     : undefined;
	    var addr_2  = req.body.addr_2office  ? req.body.addr_2office   : undefined;
	    var city    = req.body.cityoffice    ? req.body.cityoffice     : undefined;
	    var state   = req.body.stateoffice   ? req.body.stateoffice    : undefined;
	    var zip     = req.body.zipoffice     ? req.body.zipoffice      : undefined;
	    
		return {
			type:     'office',
		    phone:    phone,
		    ext:      ext,
		    addr:     addr,
		    addr_2:   addr_2,
		    city:     city,
		    state:    state,
		    zip:      zip
		};
	};
	var getContactsObj = function(req){
		var contacts = [];
		
		contacts.push(getHomeContactObj(req));
		contacts.push(getOfficeContactObj(req));
		contacts.push(getMobileContactObj(req));
		
		return contacts;
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
		console.log(authorization);
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