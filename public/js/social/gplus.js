(function() {
       var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
       po.src = 'https://apis.google.com/js/client:plusone.js';
       var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
     })();
function initGplus(){
    gapi.client.setApiKey('AIzaSyDmiwYF0a2pPoqEg60HuDn-twPWfUxnGwQ'); //set your API KEY
    gapi.client.load('plus', 'v1',function(){});//Load Google + API
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

function gplusAuth(){
	// Stop use of 'gapi.auth.authorize' anymore because of increased app discovery with over air support.
	var myParams = {
		  'clientid' : '162855488914-7i1o6qcl0uqffu6598ks74j0t0rm22qh.apps.googleusercontent.com', //You need to set client id
		  'cookiepolicy' : 'single_host_origin',
		  'scope' : 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read',
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
