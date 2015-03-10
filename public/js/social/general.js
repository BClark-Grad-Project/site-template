// Set Registration Form
var setRegistrationForm = function(Obj){
	var form = document.createElement('form');
	
	// Authorization Fields
	var email = document.createElement('input');
	var alias = document.createElement('input');
	
	// Detail Fields
	var first = document.createElement('input');
	var last = document.createElement('input');
	var gender = document.createElement('input');
	var birth = document.createElement('input');
	
	// Social Fields
	//var linkedin_token = document.createElement('input');
	var linkedin_user = document.createElement('input');
	var gplus_token = document.createElement('input');
	var gplus_user = document.createElement('input');
	var facebook_token = document.createElement('input');
	var facebook_user = document.createElement('input');
	
	email.setAttribute('name', 'email');
	email.setAttribute('type', 'hidden');
	email.setAttribute('value', Obj.authorization.email);
	
	alias.setAttribute('name', 'alias');
	alias.setAttribute('type', 'hidden');
	alias.setAttribute('value', Obj.authorization.alias);
	
	form.setAttribute('action', '/authentication/register');
	form.setAttribute('method', 'POST');

	form.appendChild(email);
	form.appendChild(alias);

	if(Obj.detail.first){
		first.setAttribute('name', 'first');
		first.setAttribute('type', 'hidden');
		first.setAttribute('value', Obj.detail.first);
		
		form.appendChild(first);
	}
	if(Obj.detail.last){
		last.setAttribute('name', 'last');
		last.setAttribute('type', 'hidden');
		last.setAttribute('value', Obj.detail.last);
		
		form.appendChild(last);
	}
	if(Obj.detail.gender){
		gender.setAttribute('name', 'gender');
		gender.setAttribute('type', 'hidden');
		gender.setAttribute('value', Obj.detail.gender);
		
		form.appendChild(gender);
	}
	if(Obj.detail.birth){
		birth.setAttribute('name', 'birth');
		birth.setAttribute('type', 'date');
		birth.setAttribute('value', Obj.detail.birth);
		
		form.appendChild(birth);
	}
	if(Obj.social.linkedin){
		//linkedin_token.setAttribute('name', 'linkedin_token');
		//linkedin_token.setAttribute('type', 'hidden');
		//linkedin_token.setAttribute('value', Obj.social.linkedin.token);
		linkedin_user.setAttribute('name', 'linkedin_user');
		linkedin_user.setAttribute('type', 'hidden');
		linkedin_user.setAttribute('value', Obj.social.linkedin.user);
		
		//form.appendChild(linkedin_token);
		form.appendChild(linkedin_user);
	}
	if(Obj.social.gplus){
		gplus_token.setAttribute('name', 'gplus_token');
		gplus_token.setAttribute('type', 'hidden');
		gplus_token.setAttribute('value', Obj.social.gplus.token);
		gplus_user.setAttribute('name', 'gplus_user');
		gplus_user.setAttribute('type', 'hidden');
		gplus_user.setAttribute('value', Obj.social.gplus.user);
		
		form.appendChild(gplus_token);
		form.appendChild(gplus_user);
	}
	if(Obj.social.facebook){
		facebook_token.setAttribute('name', 'facebook_token');
		facebook_token.setAttribute('type', 'hidden');
		facebook_token.setAttribute('value', Obj.social.facebook.token);
		facebook_user.setAttribute('name', 'facebook_user');
		facebook_user.setAttribute('type', 'hidden');
		facebook_user.setAttribute('value', Obj.social.facebook.user);
		
		form.appendChild(facebook_token);
		form.appendChild(facebook_user);
	}
	console.log(form);
	
	//form.submit();
};

//Get Social Registration Fields
var setLinkedInFields = function(Obj){
	var user = {};
	var email = Obj.emailAddress;
	var alias = Obj.formattedName;
	var id = Obj.id;
	
	var auth = {
			email: email,
			alias: alias};
	var detail = {};
	var linkedin = {
			user:  id
	};
	
	if(Obj.firstName){
		detail.first = Obj.firstName;
	}	
	if(Obj.lastName){
		detail.last = Obj.lastName;
	}	
	//	if(Obj.gender){
	//		detail.gender = Obj.gender;
	//	}	
	//	if(Obj.birth){
	//		detail.birth = Obj.birth;
	//	}
	user = {
			authorization: auth,
			detail: detail,
			social: {
				linkedin: linkedin}
			};
	console.log("Linkedin Reg Object", JSON.stringify(user));
	
	return user;
};

var setGPlusFields = function(Obj){
	console.log(JSON.stringify(Obj)); 
	
	var auth = {
			email: Obj['emailAddress'],
			alias: Obj['displayName']};
	var detail = {};
	var gplus = {
			token: Obj['access_token'],
			user:  Obj['id']
	};
	
	if(Obj['name']['givenName']){
		detail.first = Obj['name']['givenName'];
	}	
	if(Obj['name']['familyName']){
		detail.last = Obj['name']['familyName'];
	}	
	if(Obj['gender']){
		detail.gender = Obj['gender'];
	}	
	if(Obj['birthday']){
		detail.birth = Obj['birthday'];
	}
	
	return {
		authorization: auth,
		detail: detail,
		social: {
			gplus: gplus}
		};
};

var setFacebookFields = function(Obj){
	console.log(JSON.stringify(Obj));
	
	var auth = {
			email: Obj.email,
			alias: Obj.name};
	var detail = {};
	var facebook = {
			token: Obj.access_token,
			user:  Obj.id
	};
	
	if(Obj.first_name){
		detail.first = Obj.first_name;
	}	
	if(Obj.last_name){
		detail.last = Obj.last_name;
	}	
	if(Obj.gender){
		detail.gender = Obj.gender;
	}	
	//	if(Obj.birth){
	//		detail.birth = Obj.birth;
	//	}
		
	return {
		authorization: auth,
		detail: detail,
		social: {
			facebook: facebook}
		};
}; 