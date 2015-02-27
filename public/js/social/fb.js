/**
 * New node file
 */
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '868098053257714',
      xfbml      : true,
      oauth      : true,
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      version    : 'v2.1'
    });
/*  FB.ui(
		  {
		   method: 'share_open_graph'
		 }, function(response){});*/
  };
	
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));