(function() {
       var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
       po.src = 'https://apis.google.com/js/client:plusone.js';
       var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
     })();
function onGplusCallback()
{
    gapi.client.setApiKey('AIzaSyDmiwYF0a2pPoqEg60HuDn-twPWfUxnGwQ'); //set your API KEY
    gapi.client.load('plus', 'v1',function(){});//Load Google + API
}
