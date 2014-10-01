var access_token = "";

$('#disconnectButton').click(disconnectUser);

function disconnectUser(access_token) {
  var revokeUrl = 'https://accounts.google.com/o/oauth2/revoke?token=' +
      access_token;

  // Esecuzione di una richiesta GET asincrona.
  $.ajax({
    type: 'GET',
    url: revokeUrl,
    async: false,
    contentType: "application/json",
    dataType: 'jsonp',
    success: function(nullResponse) {
      // Esegui un'azione, l'utente è disconnesso
      // La risposta è sempre indefinita.
    },
    error: function(e) {
      // Gestione dell'errore
      // console.log(e);
      // Puoi indirizzare gli utenti alla disconnessione manuale in caso di esito negativo
      // https://plus.google.com/apps
    }
  });
  console.log('ho fatto qualcosa');
}

function signinCallback(authResult) {
  if (authResult['access_token']) {
    // Autorizzazione riuscita
    // Nascondi il pulsante di accesso ora che l'utente è autorizzato. Ad esempio: 
    access_token = authResult['access_token'];
    document.getElementById('signinButton').setAttribute('style', 'display: none');
  } else if (authResult['error']) {
    // Si è verificato un errore.
    // Possibili codici di errore:
    //   "access_denied" - L'utente ha negato l'accesso alla tua app
    //   "immediate_failed" - Impossibile eseguire l'accesso automatico dell'utente
    // console.log('There was an error: ' + authResult['error']);
  }
}