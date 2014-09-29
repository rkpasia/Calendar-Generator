var url = "https://orari.uniud.it/EasyCourse/Orario/Polo_Scientifico/2014-2015/327/Curricula/Tecnologiewebemultimediali_LaureatriennaleDM270_2_Corsogenerico_726.html";

httpGet();

function httpGet(url){
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false );
    xmlHttp.send( null );
    console.log(xmlHttp.responseText);
    return xmlHttp.responseText;
}