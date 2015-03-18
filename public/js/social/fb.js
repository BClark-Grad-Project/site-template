/**
 * New node file
 */
window.fbAsyncInit = function() {
  FB.init({
      appId      : '884951464905706', // <-- Test App ID, replace with "'868098053257714'," on go live
	  xfbml      : true,
	  oauth      : true,
	  status     : true, // check login status
	  cookie     : true, // enable cookies to allow the server to access the session
	  version    : 'v2.1'
  });
};
	
(function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function fbAuth(){
  FB.login(function(response) {
      if (response.authResponse){
	      console.log('Welcome!  Completing registration.... ');
	      access_token = response.authResponse.accessToken; 
	
	      FB.api('/me', function(profile) {
	    	var fieldObj = {};
	      	console.log('facebook register');
	      	profile.access_token = access_token;
	      	
	      	fieldObj = setFacebookFields(profile);
	      	setRegistrationForm(fieldObj);
	      });
      }
  }, {
      scope: 'publish_stream,email'
  });
}

function fbLogin(){
  FB.login(function(response) {
      if (response.authResponse){
	      console.log('Welcome!  Signing in.... ');
	      var fieldObj = {};
	      
	      access_token   = response.authResponse.accessToken; 
	      access_user    = response.authResponse.userID;
	      fieldObj.social = {facebook:{}};
	      fieldObj.social.facebook.user  = access_user;
	      fieldObj.social.facebook.token = access_token;
	      
	      setLoginForm(fieldObj);
      }
  }, {
      scope: 'publish_stream,email'
  });
}