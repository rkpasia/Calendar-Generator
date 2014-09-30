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



var invocation = new XMLHttpRequest();
var url = htmlPageUrl;
var invocationHistoryText;

callOtherDomain();

function callOtherDomain(){
    if(invocation)
    {    
        invocation.open('GET', url, true);
        invocation.onreadystatechange = handler;
        invocation.send();
        fetchData(invocation.getAllResponseHeaders()); 
    }
    else
    {
        invocationHistoryText = "No Invocation TookPlace At All";
        var textNode = document.createTextNode(invocationHistoryText);
        var textDiv = document.getElementById("textDiv");
        textDiv.appendChild(textNode);
    }
    
}
function handler(evtXHR)
{
    if (invocation.readyState == 4)
    {
            if (invocation.status == 200)
            {
                var response = invocation.responseXML;
                var invocationHistory = response.getElementsByTagName('invocationHistory').item(0).firstChild.data;
                invocationHistoryText = document.createTextNode(invocationHistory);
                var textDiv = document.getElementById("textDiv");
                textDiv.appendChild(invocationHistoryText);
                
            }
            else
                alert("Invocation Errors Occured");
    }
    else
        dump("currently the application is at" + invocation.readyState);
}




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