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