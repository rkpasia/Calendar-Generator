function authorizationTemplate(){
	$.get('/templates/authorization-template.mst',function(template){
		var rend = Mustache.render(template);
		$('.app-container section').append(rend).addClass('info-authorization');
	});
}


function generationTemplate(){
	$('.info-authorization').empty().removeClass('info-authorization');
	$.get('/templates/creation-template.mst', function(template){
		var rend = Mustache.render(template);
		$('.app-container section').append(rend).addClass('calendar-creation');
	});
	var logoutButton = Mustache.render('<button id="logout-button">Logout</button>')
	$('footer').append(logoutButton);
	$('#logout-button').click(function(){logout(access_token);});
}

function processingTemplate(){
	$('.calendar-creation').empty();
	var message = Mustache.render("<p><strong>L'applicazione sta processando la tua richiesta, attendi.</strong></p>");
	$('.calendar-creation').append(message);
}

function terminateTemplate(){
	$('.calendar-creation').empty();
	$.get('/templates/terminate-template.mst', function(template){
		var rend = Mustache.render(template);
		$('.app-container section').append(rend).addClass('end-creation');
	});
}

function errorTemplate(message){
	$('.app-container section').empty();
	var message = Mustache.render("<p><strong><span class=\"error\">{{ messaggio }}</span></strong></p><p><strong>Se fosse comparsa una richiesta di comparsa di popup acconsenti alla comparsa, serve all'autenticazione nell'applicazione</stong></p>",{messaggio: message});
	$('.app-container section').append(message);
}

function logoutTemplate(){
	$('.app-container section').empty();
	var message = Mustache.render("<p><strong>Hai effettuato con successo il logout.</stong></p>");
	$('.app-container section').append(message);
}