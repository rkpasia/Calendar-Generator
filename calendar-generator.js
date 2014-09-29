var htmlPage = "";

$.get(
	"http://orari.uniud.it/EasyCourse/Orario/Polo_Scientifico/2014-2015/327/Curricula/Tecnologiewebemultimediali_LaureatriennaleDM270_2_Corsogenerico_726.html",
	function(data){
		console.log("Load performed");
		//console.log(data);
		htmlPage = data;
		fetchData(htmlPage);
	}
);

function fetchData(htmlPage){
	console.log(htmlPage);
}