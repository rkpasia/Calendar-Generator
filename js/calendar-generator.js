function calendarOptions(){
	var values = {};
	$.each($('#create-calendar').serializeArray(), function(i,field){
		values[field.name] = field.value;
	});
	processingTemplate();
	createCalendar(values);
}

function createCalendar(options){
	gapi.client.load('calendar','v3',function(){
		var req = gapi.client.calendar.calendars.insert({
			'summary': options.calendarName
		});
		req.execute(function(resp){
			getData(options.course,resp);
		})
	});
}

function getData(courseUrl,resp){
	$.get(
		courseUrl,
		function(data){
			fetchData(data,resp);
		}
	);
}

function fetchData(htmlPage,resp){
	var rows = $('table.timegrid tr',htmlPage).not('table.timegrid tr td table tbody tr');
	var cols = $('table.timegrid tr td',htmlPage).not('table.timegrid tr td table tbody tr td');

	var currentDate = new Date(Date.now());
	var startDate = new Date(currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDate()-currentDate.getDay()+1,8,30,0);
	var endDate = new Date(currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDate()-currentDate.getDay()+1,9,30,0);

	var reqObjects = [];
	var req;

	for(var i = 1; i < rows.length; i++){
		for(var j = (i * 6)+1; j < (i*6)+6; j++){
			var cell = cols[j];
			if($(cell).find('table')){
				if(!($('.subject_pos1',cell).text() === "")){
					req = gapi.client.calendar.events.insert({
						"calendarId": resp.id,
						"start": {
							dateTime: startDate,
							timeZone: "Europe/Rome"
						},
						"end": {
							dateTime: endDate,
							timeZone: "Europe/Rome"
						},
						"recurrence": [
						"RRULE:FREQ=WEEKLY;UNTIL=20150123T230000Z"
						],
						summary: $('.subject_pos1',cell).text(),
						description: 'Professore del corso: ' + $('.subject_pos2',cell).text(),
						location: $('.subject_pos3',cell).text()
					});
					console.log(req);
					reqObjects.push(req);
				}
			}
			startDate.setDate(startDate.getDate() + 1);
			endDate.setDate(endDate.getDate() + 1);
		}
		startDate.setHours(startDate.getHours()+1);
		endDate.setHours(endDate.getHours()+1);
		startDate.setDate(startDate.getDate() - 5);
		endDate.setDate(endDate.getDate() - 5);	
	}
	console.log(reqObjects);
	createEvents(0,reqObjects);
}

function createEvents(i,reqObjects){	
	if(!(reqObjects.length == i)){
		reqObjects[i].execute(function(resp){
			if(resp.error){
				createEvents(i,reqObjects);
			}else{
				createEvents(i+1,reqObjects);
			}
		});
	}else{
		terminateTemplate();
	}
}