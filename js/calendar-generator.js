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