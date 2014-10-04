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
	var logoutButton = Mustache.render('<button id="logout-button">Logout</button>')
	$('footer').append(logoutButton);
	$('#logout-button').click(logout);
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

function errorTemplate(){
	$('.app-container section').empty();
	var message = Mustache.render("<p><strong><span class=\"error\">C'è stato un errore durante la richiesta di autenticazione, riprova.</span></strong></p><p><strong>Se fosse comparsa una richiesta di comparsa di popup acconsenti alla comparsa, serve all'autenticazione nell'applicazione</stong></p>");
	$('.app-container section').append(message);
}