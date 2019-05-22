function statusChangeCallback(response) {
    	console.log('statusChangeCallback');
    	console.log(response);
    
	if (response.status === 'connected') 
	{   
	Inform();
	} else {
	 
	      document.getElementById('status').innerHTML = 'Zaloguj się za pomocą Facebooka.';
	    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '2554455168114808',
      cookie     : true,  
                          
      xfbml      : true, 
      version    : 'v3.3'
    });

   

    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    }, {scope: 'email,user_likes,user_gender,user_birthday'});

  };

  
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

 
  function Inform() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', {fields: 'last_name,email,birthday,gender'}, function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Dziękuję za zalogowanie się przy użyciu konta Facebook ;), ' + response.name + response.birthday + response.gender + '!';
    });
  }
    
	
