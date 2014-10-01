var htmlPageUrl = "Curricula/Tecnologiewebemultimediali_LaureatriennaleDM270_2_Corsogenerico_726.html";

$.get(
	htmlPageUrl,
	function(data){
		console.log("//////////////////////////////////////////Load performed");

		htmlPage = data;

		fetchData(htmlPage);
	}
);

function fetchData(htmlPage){
	var timeTable = $(htmlPage).find('table.timegrid');
	var rows = $('table.timegrid tr',htmlPage).not('table.timegrid tr td table tbody tr');
	var cols = $('table.timegrid tr td',htmlPage).not('table.timegrid tr td table tbody tr td');
	var contentTable = [];
	for(var i = 1; i < rows.length; i++){
		contentTable[i] = [];
		for(var j = (i * 6)+1; j < (i*6)+6; j++){
			var cell = cols[j];
			if($(cell).find('table')){
				var data = {
					corso: $('.subject_pos1',cell).text(),
					insegnante: $('.subject_pos2',cell).text(),
					aula: $('.subject_pos3',cell).text()
				};
				contentTable[i][j] = data;
			}
		}
	}
	console.log(contentTable);
}

function signinCallback(authResult) {
  if (authResult['access_token']) {
    // Autorizzazione riuscita
    // Nascondi il pulsante di accesso ora che l'utente è autorizzato. Ad esempio: 
    document.getElementById('signinButton').setAttribute('style', 'display: none');
  } else if (authResult['error']) {
    // Si è verificato un errore.
    // Possibili codici di errore:
    //   "access_denied" - L'utente ha negato l'accesso alla tua app
    //   "immediate_failed" - Impossibile eseguire l'accesso automatico dell'utente
    // console.log('There was an error: ' + authResult['error']);
  }
}