/**
 * New node file
 */
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '868098053257714',
      xfbml      : true,
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
  
  window.twttr=(function(d,s,id){
	  var js,fjs=d.getElementsByTagName(s)[0],t=window.twttr||{};
	  if(d.getElementById(id))return;js=d.createElement(s);
	  js.id=id;js.src="https://platform.twitter.com/widgets.js";
	  fjs.parentNode.insertBefore(js,fjs);t._e=[];
	  t.ready=function(f){t._e.push(f);};
	  return t;
  }(document,"script","twitter-wjs"));
