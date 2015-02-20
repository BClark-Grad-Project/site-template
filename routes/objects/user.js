var getUserObj = function(req){
	var alias    = req.body.alias    ? req.body.alias    : undefined;
	var email    = req.body.email    ? req.body.email    : undefined;
	var password = req.body.password ? req.body.password : undefined;
	
	return {
			alias:    alias,
			email:    email,
			password: password
		};
};
var getDetailObj = function(req){
	var detail = {};
    var id     = req.body.detailId ? req.body.detailId : undefined;
    var first  = req.body.first    ? req.body.first    : undefined;
    var middle = req.body.middle   ? req.body.middle   : undefined;
    var last   = req.body.last     ? req.body.last     : undefined;
    var birth  = req.body.birth    ? req.body.birth    : undefined;
    var gender = req.body.gender   ? req.body.gender   : undefined;

    if(id){
    	detail.id = id;
    }
    if(first){
    	detail.first = first;
    }
    if(middle){
    	detail.middle = middle;
    }
    if(last){
    	detail.last = last;
    }
    if(birth){
    	detail.birth = birth;
    }
    if(gender){
    	detail.gender = gender;
    }
    
	return detail;
};
var getMobileContactObj = function(req){
	var contact = {};
	contact.type = 'mobile';
	
    var id      = req.body.mobileId      ? req.body.mobileId       : undefined;
    var carrier = req.body.carriermobile ? req.body.carriermobile  : undefined;
    var phone   = req.body.phonemobile   ? req.body.phonemobile    : undefined;

    if(id){
    	contact.id = id;
    }
    if(phone){
    	contact.phone = phone;
    }
    if(carrier){
    	contact.carrier = carrier;
    }
    
	return contact;
};

var getHomeContactObj = function(req){
	var contact = {};
	contact.type = 'home';
	
    var id      = req.body.homeId      ? req.body.homeId       : undefined;
    var phone   = req.body.phonehome   ? req.body.phonehome    : undefined;
    var addr    = req.body.addrhome    ? req.body.addrhome     : undefined;
    var addr_2  = req.body.addr_2home  ? req.body.addr_2home   : undefined;
    var city    = req.body.cityhome    ? req.body.cityhome     : undefined;
    var state   = req.body.statehome   ? req.body.statehome    : undefined;
    var zip     = req.body.ziphome     ? req.body.ziphome      : undefined;

    if(id){
    	contact.id = id;
    }
    if(phone){
    	contact.phone = phone;
    }
    if(addr){
    	contact.addr = addr;
    }
    if(addr_2){
    	contact.addr_2 = addr_2;
    }
    if(city){
    	contact.city = city;
    }
    if(state){
    	contact.state = state;
    }
    if(zip){
    	contact.zip = zip;
    }
    
	return contact;
};

var getOfficeContactObj = function(req){
	var contact = {};
	contact.type = 'office';
	
    var id      = req.body.officeId      ? req.body.officeId       : undefined;
    var phone   = req.body.phoneoffice   ? req.body.phoneoffice    : undefined;
    var ext     = req.body.extoffice     ? req.body.extoffice      : undefined;
    var addr    = req.body.addroffice    ? req.body.addroffice     : undefined;
    var addr_2  = req.body.addr_2office  ? req.body.addr_2office   : undefined;
    var city    = req.body.cityoffice    ? req.body.cityoffice     : undefined;
    var state   = req.body.stateoffice   ? req.body.stateoffice    : undefined;
    var zip     = req.body.zipoffice     ? req.body.zipoffice      : undefined;

    if(id){
    	contact.id = id;
    }
    if(phone){
    	contact.phone = phone;
    }
    if(ext){
    	contact.ext = ext;
    }
    if(addr){
    	contact.addr = addr;
    }
    if(addr_2){
    	contact.addr_2 = addr_2;
    }
    if(city){
    	contact.city = city;
    }
    if(state){
    	contact.state = state;
    }
    if(zip){
    	contact.zip = zip;
    }
    
	return contact;
};
var getContactsObj = function(req){
	var contacts = [];
	
	contacts.push(getHomeContactObj(req));
	contacts.push(getOfficeContactObj(req));
	contacts.push(getMobileContactObj(req));
	
	return contacts;
};

var getAuthentication = function(req){
	var auth = {};
	var service = req.locals.service_code;
	var access  = req.body.user_type ? req.body.user_type : 'general';
	
	auth.service = service;
	auth.access  = access;
	
	return auth;
};

module.exports.getAuthenticationObj = function(req){		
	var user     = req.body.user     ? req.body.user     : undefined;
	var password = req.body.password ? req.body.password : undefined;
	var remember = req.body.remember ? true : false;
	
	return {
			user:     user,
			password: password,
			remember: remember
		};
};

module.exports.getRegistrationObj = function(req){
	var registration = {};
	var user = getUserObj(req);
	var detail = getDetailObj(req);
	var contacts = getContactsObj(req);
	var authentication = getAuthentication(req);
	
	registration.authentication = authentication;
	registration.credentials = user;
	registration.detail = detail;
	registration.contact = contacts;
	
	return registration;
};

module.exports.getUserObj = function(req){
	var user = {id:req.session.user.id};
	var detail = getDetailObj(req);
	var contacts = getContactsObj(req);
	
	user.detail = detail;
	user.contact = contacts;
	
	return user;
};


module.exports.getNewAuthObj = function(req){
	var auth = {};
    var id      = req.body.userId;
    var active  = req.body.auth_active ? true : false;	
    auth.id		= id;
    auth.active = active;
    
	return auth;
};

module.exports.getSeachObj = function(req){
	var user   = {};
    var id     = req.body.userId ? req.body.userId : undefined;
    var alias  = req.body.alias  ? req.body.alias  : undefined;
    var type   = req.body.type   ? req.body.type   : undefined;
    var email  = req.body.email  ? req.body.email  : undefined;	
    var first  = req.body.first  ? req.body.first  : undefined;
    var middle = req.body.middle ? req.body.middle : undefined;
    var last   = req.body.last   ? req.body.last   : undefined;	

    if(id){
      user.id = id;
    }
    if(alias){
        user.credentials.alias = alias;
    }
    if(type){
        user.credentials.type = type;
    }
    if(email){
      user.credentials.email = email;
    }
    if(first){
      user.detail.first = first;
    }
    if(middle){
      user.detail.middle = middle;
    }
    if(last){
      user.detail.last = last;
    }
    
	return user;
};