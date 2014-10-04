var clientId = '221078581487-oph0qts3kh9bfppciv3u3r9h87liugdo.apps.googleusercontent.com';

var apiKey = 'AIzaSyAT9joTNAhFULvcoF95PgGv6_vs_3bdaq8';

var scopes = 'https://www.googleapis.com/auth/calendar';

function handleClientLoad(){
  gapi.client.setApiKey(apiKey);
  window.setTimeout(checkAuth,1);
}

function checkAuth(){
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
}

function handleAuthResult(authResult){
  var authorizeButton = $('#authorize-button');
  if (authResult && !authResult.error) {
    generationTemplate();
  } else {
    authorizationTemplate();
    authorizeButton.click(handleAuthClick);
  }
}

function handleAuthClick(event){
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
  return false;
}