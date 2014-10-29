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
			if(resp.error){
				if(resp.error.code === 400){
					errorTemplate("La tua richiesta non è andata a buon fine, ci sono stati dei problemi. Ti invitiamo a riprovare!");
				}
				if(resp.error.code === 401){
					errorTemplate("C'è stato un problema di autenticazione. Effettua il logout per sicurezza (a fondo pagina), successivamente ricarica la pagina e accedi nuovamente. Ci scusiamo per l'accaduto.");
				}
			}else{
				getData(options.course,resp);
			}
		})
	});
}

function getData(courseUrl,resp){
	$.get(
		'/Calendar-Generator/'+courseUrl,
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
							dateTime: startDate.toISOString(),
							timeZone: "Europe/Rome"
						},
						"end": {
							dateTime: endDate.toISOString(),
							timeZone: "Europe/Rome"
						},
						"recurrence": [
						"RRULE:FREQ=WEEKLY;UNTIL=20150123T230000Z"
						],
						summary: $('.subject_pos1',cell).text(),
						description: 'Professore del corso: ' + $('.subject_pos2',cell).text(),
						location: $('.subject_pos3',cell).text()
					});
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
	createEvents(0,reqObjects);
}

function createEvents(i,reqObjects){	
	if(!(reqObjects.length == i)){
		reqObjects[i].execute(function(resp){
			if(resp.error){
				if(resp.error.code == 500){
					createEvents(i,reqObjects);
				}else{
					errorTemplate("Qualcosa è andato storto, effettua il logout e aggiorna la pagina. Ci scusiamo per l'accaduto.");
				}
			}else{
				createEvents(i+1,reqObjects);
			}
		});
	}else{
		terminateTemplate();
	}
}