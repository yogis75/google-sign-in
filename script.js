function handleCredentialResponse(response) {
  var responsePayload = decodeJwtResponse(response.credential);
  console.log(responsePayload);
}

window.onload = function () {
  google.accounts.id.initialize({
    client_id:
      "2287727663-73irlrmiqh7utp8pbs48mmfc2m1f932j.apps.googleusercontent.com",
    callback: handleCredentialResponse,
  });

  google.accounts.id.renderButton(
    document.getElementById("signin-button"),
    { theme: "outline", size: "medium" } // customization attributes
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
