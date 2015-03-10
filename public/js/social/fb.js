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
	      console.log('Welcome!  Fetching your information.... ');
	      //console.log(response); // dump complete info
	      access_token = response.authResponse.accessToken; //get access token
	
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