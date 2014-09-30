var htmlPageUrl = "https://orari.uniud.it/EasyCourse/Orario/Polo_Scientifico/2014-2015/327/Curricula/Informatica_LaureatriennaleDM270_2_Corsogenerico_725.html";

var fetchedTable = {};

/*$.get(
	htmlPageUrl,
	function(data){
		console.log("//////////////////////////////////////////Load performed");

		htmlPage = data;

		fetchData(htmlPage);
	}
);*/


function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

// Helper method to parse the title tag from the response.
function getTitle(text) {
  return text.match('<title>(.*)?</title>')[1];
}

// Make the actual CORS request.
function makeCorsRequest() {
  // All HTML5 Rocks properties support CORS.
  

  var xhr = createCORSRequest('GET', htmlPageUrl);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
    var title = getTitle(text);
    alert('Response from CORS request to ' + htmlPageUrl + ': ' + title);
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  xhr.send();
  console.log('Ho fatto qualcosa');
}

makeCorsRequest();


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