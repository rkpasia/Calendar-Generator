var clientId = '221078581487-oph0qts3kh9bfppciv3u3r9h87liugdo.apps.googleusercontent.com';

var apiKey = 'AIzaSyAT9joTNAhFULvcoF95PgGv6_vs_3bdaq8';

var scopes = 'https://www.googleapis.com/auth/calendar';

function handleClientLoad(){
  gapi.client.setApiKey(apiKey);
  window.setTimeout(checkAuth,1);
}

function checkAuth(){
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
}

function handleAuthResult(authResult){
  var authorizeButton = document.getElementById('authorize-button');
  if (authResult && !authResult.error) {
    authorizeButton.style.visibility = 'hidden';
  } else {
    authorizeButton.style.visibility = '';
    authorizeButton.onclick = handleAuthClick;
  }
}

function handleAuthClick(event){
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
  return false;
}