// Setup an event listener to make an API call once auth is complete
function onLinkedInLoad() {
    IN.Event.on(IN, "auth", getProfileData);
}

// Handle the successful return from the API call
function onSuccess(data) {
    console.log(data);
}

// Handle an error response from the API call
function onError(error) {
    console.log(error);
}

function signinGplusCallback(authResult) {
  if (authResult['access_token']) {
    // Successfully authorized
	  var request = gapi.client.plus.people.get({
			      'userId': 'me'
	  });
	  request.execute(function (resp){
	      var email = '';
	      if(resp['emails']){
	          for(var i = 0; i < resp['emails'].length; i++){
	              if(resp['emails'][i]['type'] == 'account'){
	                  email = resp['emails'][i]['value'];
	              }
	          }
	      }
	      console.log('google suceess');
		//	   
		//	      var str = "Name:" + resp['displayName'] + "<br>";
		//	      str += "Image:" + resp['image']['url'] + "<br>";
		//	      str += "<img src='" + resp['image']['url'] + "' /><br>";
		//	   
		//	      str += "URL:" + resp['url'] + "<br>";
		//	      str += "Email:" + email + "<br>";
		//	      document.getElementById("profile").innerHTML = str;
	  });
  } else if (authResult['error']) {
    // There was an error.
    // Possible error codes:
    //   "access_denied" - User denied access to your app
    //   "immediate_failed" - Could not automatially log in the user
    // console.log('There was an error: ' + authResult['error']);
  }
}

// Use the API call wrapper to request the member's basic profile data
function getProfileData() {
    IN.API.Raw("/people/~").result(onSuccess).error(liAuth());
}

//function we link to the click on the custom login button through Twitter  
function twAuth() {  
  twttr.anywhere(function (T) {  
      T.signIn();  
  });  
}  

function gplusAuth(){
	var myParams = {
		    'clientid' : '162855488914-7i1o6qcl0uqffu6598ks74j0t0rm22qh.apps.googleusercontent.com', //You need to set client id
		    'cookiepolicy' : 'single_host_origin',
		    'scope' : 'https://www.googleapis.com/auth/plus.login',
		    'callback': signinGplusCallback,
		    'theme' : 'dark'
		  };
		  gapi.auth.signIn(myParams);
}

function liAuth(){
   IN.User.authorize(function(){
	   IN.API.Profile("me")
	   .fields("firstName", "lastName", "headline")
	   .result(function(){
		   console.log('Linked-in auth');
	   });
       //callback();
   });
}

function fbAuth(){
    FB.login(function(response) {

        if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            //console.log(response); // dump complete info
            access_token = response.authResponse.accessToken; //get access token
            user_id = response.authResponse.userID; //get FB UID

            FB.api('/me', function(response) {
            	console.log('facebook auth');      
            });
        }
    }, {
        scope: 'publish_stream,email'
    });
}