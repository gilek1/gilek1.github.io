window.fbAsyncInit = function() {
  FB.init({
    appId: "2554455168114808",
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
    console.log("Logged in and authenticated");
    setElements(true);
    testAPI();
  } else {
    console.log("Not authenticated");
    setElements(false);
  }
}
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}
function testAPI() {
  FB.api("/me?fields=name,email", function(response) {
    if (response && !response.error) {
      console.log(response);
      buildProfile(response);
    }
  });
}

function buildProfile(user) {
  let profile = `
        <h3>Cześć ${user.name}!</h3>
        <h3>Twoje ID: ${user.id}</h3>
        <h3>Twój email: ${user.email}</h3>
        <img src="${user.picture.data.url}"/>
      `;
  document.getElementById("profile").innerHTML = profile;
}
function setElements(isLoggedIn) {
  if (isLoggedIn) {
    document.getElementById("logout").style.display = "block";
    document.getElementById("profile").style.display = "block";
    document.getElementById("fb-btn").style.display = "none";
    // document.getElementById("heading").style.display = "none";
  } else {
    document.getElementById("logout").style.display = "none";
    document.getElementById("profile").style.display = "none";
    document.getElementById("fb-btn").style.display = "block";
    // document.getElementById("heading").style.display = "block";
  }
}
function logout() {
  FB.logout(function(response) {
    setElements(false);
  });
}
