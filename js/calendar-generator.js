function calendarOptions(){
	var values = {};
	$.each($('#create-calendar').serializeArray(), function(i,field){
		values[field.name] = field.value;
	});
	createCalendar(values);
	return false;
}

function createCalendar(options){
	gapi.client.load('calendar','v3',function(){
		var req = gapi.client.calendars.insert({
			'summary': options.calendarName
		});
		req.execute(function(resp){
			fetchData(options.course,resp);
		})
	});
}

function getData(courseUrl){
	$.get(
		courseUrl,
		function(data){
			console.log("Page Load Performed");
			return data;
		}
	);
}

function fetchData(course,resp){
	var htmlPage = getData(course);
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