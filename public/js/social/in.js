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

// Use the API call wrapper to request the member's basic profile data
function getProfileData() {
    IN.API.Raw("/people/~").result(onSuccess).error(onError);
}

function liAuth(){
   IN.User.authorize(function(){
	   IN.API.Profile("me")
	   .fields("id", "formattedName", "firstName", "lastName", "emailAddress")
	   .result(function(data){
		   var fieldObj = {};
			  
		   console.log('LinkedIn Registration');
		   //console.log(JSON.stringify(data));

		   fieldObj = setLinkedInFields(data.values[0]);
		   setRegistrationForm(fieldObj);
	   });
   });
}