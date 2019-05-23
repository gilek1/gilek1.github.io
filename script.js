window.fbAsyncInit = function() {
  FB.init({
    appId: "2554455168114808",
	cookie: true,
	  autoLogAppEvents : true,
    xfbml: true,
    version: "v3.3"
  });
  FB.AppEvents.logPageView();
};

(function(d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");

function statusChangeCallback(response) {
  if (response.status === "connected") {
    setElements(true);
    testAPI();
  } else {
    setElements(false);
  }
}
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}
function testAPI() {
	FB.login(function(response) {
	 if(response.authResponse)
	 {
		 console.log('');
		 FB.api("/me?fields=name,email,picture{url}", function(response) {
  FB.api("/me?fields=name,email,picture{url},user_friends", function(response) {
    if (response && !response.error) {
		console.log(response)
      buildProfile(response);
    }
	 });
	}
  else {
   console.log('');
  }
	
  },{scope:'email,pages_show_list'});
}

function buildProfile(user) {
  let profile = `
  <h3>Cześć ${user.name}!</h3>
  <h3>Email: ${user.email}</h3>
  <h3>ID: ${user.id}</h3>
  <center><img src="${user.picture.data.url}"></center>
<h3>ID: ${user.friends}</h3>
     
`;
  document.getElementById("profile").innerHTML = profile;
}
function setElements(isLoggedIn) {
  if (isLoggedIn) {
    document.getElementById("profile").style.display = "block";
    document.getElementById("fb-btn").style.display = "none";
  } else {
    document.getElementById("profile").style.display = "none";
    document.getElementById("fb-btn").style.display = "block";
  }
}
