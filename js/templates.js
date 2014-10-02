function authorizationTemplate(){
	$.get('templates/authorization-template.mst',function(template){
		var rend = Mustache.render(template);
		$('.app-container section').append(rend).addClass('info-authorization');
	});
}


function generationTemplate(){
	$('.info-authorization').empty().removeClass('info-authorization');
	$.get('templates/creation-template.mst', function(template){
		var rend = Mustache.render(template);
		$('.app-container section').append(rend).addClass('calendar-creation');
	});
}

function processingTemplate(){
	$('.calendar-creation').empty();
	var message = Mustache.render("<p><strong>L'applicazione sta processando la tua richiesta, attendi.</strong></p>");
	$('.calendar-creation').append(message);
}

function terminateTemplate(){
	$('.calendar-creation').empty();
	$.get('templates/terminate-template.mst', function(template){
		var rend = Mustache.render(template);
		$('.app-container section').append(rend).addClass('end-creation');
	});
}