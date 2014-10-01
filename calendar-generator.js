var htmlPageUrl = "Curricula/Tecnologiewebemultimediali_LaureatriennaleDM270_2_Corsogenerico_726.html";

$.get(
	htmlPageUrl,
	function(data){
		console.log("//////////////////////////////////////////Load performed");

		htmlPage = data;

		fetchData(htmlPage);
	}
);

function fetchData(htmlPage){
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

var OAUTHURL    =   'https://accounts.google.com/o/oauth2/auth?';
var VALIDURL    =   'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=';
var SCOPE       =   'https://www.googleapis.com/auth/userinfo.profile';
var CLIENTID    =   '221078581487-oph0qts3kh9bfppciv3u3r9h87liugdo.apps.googleusercontent.com';
var REDIRECT    =   'http://rkpasia.github.io/oauth2callback'
var TYPE        =   'token';
var _url        =   OAUTHURL + 'scope=' + SCOPE + '&client_id=' + CLIENTID + '&redirect_uri=' + REDIRECT + '&response_type=' + TYPE;


function login() {
  var win         =   window.open(_url, "windowname1", 'width=800, height=600'); 

  var pollTimer   =   window.setInterval(function() { 
      try {
          console.log(win.document.URL);
          if (win.document.URL.indexOf(REDIRECT) != -1) {
              window.clearInterval(pollTimer);
              var url =   win.document.URL;
              acToken =   gup(url, 'access_token');
              tokenType = gup(url, 'token_type');
              expiresIn = gup(url, 'expires_in');
              win.close();

              validateToken(acToken);
          }
      } catch(e) {
      }
  }, 100);
}

function validateToken(token) {
  $.ajax({
    url: VALIDURL + token,
    data: null,
    success: function(responseText){  
        getUserInfo();
    },  
    dataType: "jsonp"  
  });
}

//credits: http://www.netlobo.com/url_query_string_javascript.html
function gup(url, name) {
  name = name.replace(/[[]/,"\[").replace(/[]]/,"\]");
  var regexS = "[\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( url );
  if( results == null )
      return "";
  else
      return results[1];
}

function getUserInfo() {
    $.ajax({
        url: 'https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + acToken,
        data: null,
        success: function(resp) {
            user    =   resp;
            console.log(user);
            $('#uName').append(user.name);
            $('#imgHolder').attr('src', user.picture);
        },
        dataType: "jsonp"
    });
}

function startLogoutPolling() {
  $('#loginText').show();
  $('#logoutText').hide();
  loggedIn = false;
  $('#uName').text('Welcome ');
  $('#imgHolder').attr('src', 'none.jpg');
}

