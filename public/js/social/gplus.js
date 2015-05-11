(function() {
       var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
       po.src = 'https://apis.google.com/js/client:plusone.js';
       var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
     })();

function initGplus(){
    gapi.client.setApiKey('AIzaSyDmiwYF0a2pPoqEg60HuDn-twPWfUxnGwQ'); //set your API KEY
    gapi.client.load('gmail', 'v1',function(){});//Load Google + API
}

function signinGplusCallback(authResult) {
  if (authResult['access_token']) {
	  var fieldObj = {};
    // Successfully authorized
	  var request = gapi.client.plus.people.get({
		  'userId' : 'me'
	  });
	  request.execute(function (resp){
	      if(resp['emails']){
	          for(var i = 0; i < resp['emails'].length; i++){
	              if(resp['emails'][i]['type'] == 'account'){
	                  email = resp['emails'][i]['value'];
	              }
	          }
	      }
	      console.log('Google Plus Registration');
	      resp['emailAddress'] = email;
	      resp['access_token'] = authResult['access_token'];
	      
	      fieldObj = setGPlusFields(resp);
	      setRegistrationForm(fieldObj);
	  });
  }
}

function getContacts(authResult) {
	  if (authResult['access_token']) {
		  var fieldObj = {};
	    // Successfully authorized
		  var request = gapi.client.plus.people.get({
			  'userId' : 'me'
		  });
		  request.execute(function (resp){
		      if(resp['emails']){
		          for(var i = 0; i < resp['emails'].length; i++){
		              if(resp['emails'][i]['type'] == 'account'){
		                  email = resp['emails'][i]['value'];
		              }
		          }
		      }
		      resp['emailAddress'] = email;
		      resp['access_token'] = authResult['access_token'];
				var getContacts = $.get( "https://www.google.com/m8/feeds/contacts/" + resp['emailAddress'] + "/full?access_token=" + resp['access_token'] + "&alt=json&max-results=99999", function(text, xhr)  {
					  contacts = [];
					  for (var i in text.feed.entry) {
						var entry = text.feed.entry[i];
					    var contact = {
					      'name' : entry['title']['$t'],
					      'id' : entry['id']['$t'],
					      'emails' : []
					    };

					    if (entry['gd$email']) {
					      var emails = entry['gd$email'];
					      for (var j = 0, email; email = emails[j]; j++) {
					        contact['emails'].push(email['address']);
					      }
					    }

					    if (!contact['name']) {
					      contact['name'] = contact['emails'][0] || "<Unknown>";
					    }
					    
					    contacts.push(contact);
					  }
					  addContactChoices(contacts);
				});
		      
		  });
	  }
}

function initGmail(params){
    gapi.client.setApiKey('AIzaSyDmiwYF0a2pPoqEg60HuDn-twPWfUxnGwQ');
    gapi.client.load('gmail', 'v1',function(){gapi.auth.authorize(params, getContacts);});
}

function gmailContacts(){
	var myParams = {
		  'clientid' : '162855488914-7i1o6qcl0uqffu6598ks74j0t0rm22qh.apps.googleusercontent.com', //You need to set client id
		  'cookiepolicy' : 'single_host_origin',
		  'scope' : 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read https://www.googleapis.com/auth/contacts.readonly',
		  'callback': getContacts,
	};
	
    gapi.client.setApiKey('AIzaSyDmiwYF0a2pPoqEg60HuDn-twPWfUxnGwQ');
    gapi.client.load('plus', 'v1');//Load Google + API
    gapi.auth.signIn(myParams);
}

function gplusAuth(){
	var myParams = {
		  'clientid' : '162855488914-7i1o6qcl0uqffu6598ks74j0t0rm22qh.apps.googleusercontent.com', 
		  'cookiepolicy' : 'single_host_origin',
		  'scope' : 'https://www.googleapis.com/auth/plus.profile.emails.read https://www.google.com/m8/feeds',
		  'callback': signinGplusCallback,
		  'theme' : 'dark'
		};

		initGplus();
		gapi.auth.signIn(myParams);
}

function loginGplusCallback(authResult){
	  if (authResult['access_token']) {
		  var fieldObj = {};
		  
		  console.log(authResult);
		  
		  fieldObj.social = {gplus:{}};
		  fieldObj.social.gplus.token = authResult['access_token'];
		  var request = gapi.client.plus.people.get({
			  'userId' : 'me'
		  });
		  request.execute(function (resp){
			  fieldObj.social.gplus.user = resp['id'];
			  setLoginForm(fieldObj);
		  });
		  
	  } else {
          // No access token could be retrieved, force the authorization flow.
		  gplusLogin();
      }
}

function gplusLogin(){
	var myParams = {
		  'client_id' : '162855488914-7i1o6qcl0uqffu6598ks74j0t0rm22qh.apps.googleusercontent.com',
		  'scope' : 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read',
		  'immediate' : false
		};

		initGplus();
		gapi.auth.authorize(myParams, loginGplusCallback);
}
