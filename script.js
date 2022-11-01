var googleButton = document.getElementById("signin-button");
var userInfo = document.querySelector(".user-info");
var userWrapper = document.querySelector(".user-wrapper");

function handleCredentialResponse(response) {
  var responsePayload = decodeJwtResponse(response.credential);
  var userdata = `<img src=${responsePayload.picture} alt="">
  <p>Name: ${responsePayload.name}</p>
  <p>Email: ${responsePayload.email}</p>`;
  userInfo.innerHTML = userdata;
  userWrapper.style.display = "block";
  googleButton.style.display = "none";
}

window.onload = function () {
  google.accounts.id.initialize({
    client_id:
      "2287727663-73irlrmiqh7utp8pbs48mmfc2m1f932j.apps.googleusercontent.com",
    callback: handleCredentialResponse,
  });

  google.accounts.id.renderButton(
    googleButton,
    { theme: "filled_blue", size: "medium", width: 200 } // customization attributes
  );
  google.accounts.id.prompt(); // also display the One Tap dialog
};

function signOut() {
  google.accounts.id.disableAutoSelect();
  location.reload();
}

function decodeJwtResponse(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
}
