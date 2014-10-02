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
	var message = Mustache.render("<p><strong>L'applicazione sta processando la tua richiesta, attendi.</strong></p>");
	$('.calendar-creation').empty().removeClass('calendar-creation');
}

function terminateTemplate(){
	$.get('templates/terminate-template.mst', function(template){
		var rend = Mustache.render(template);
		$('.app-container section').append(rend).addClass('end-creation');
	});
}