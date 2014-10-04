var apiKey = 'AIzaSyAT9joTNAhFULvcoF95PgGv6_vs_3bdaq8';
var access_token;

function signinCallback(authResult) {
  if (authResult['access_token']) {
    access_token = authResult['access_token'];
    gapi.client.setApiKey(apiKey);
    generationTemplate();
  } else if (authResult['error']) {
    //errorTemplate();
  }
}

function logout(access_token){
  var revokeUrl = 'https://accounts.google.com/o/oauth2/revoke?token=' +
      access_token;
  $.ajax({
    type: 'GET',
    url: revokeUrl,
    async: false,
    contentType: "application/json",
    dataType: 'jsonp',
    success: function(nullResponse) {
      logoutTemplate();
    },
    error: function(e) {
      console.log(e);
    }
  });
}