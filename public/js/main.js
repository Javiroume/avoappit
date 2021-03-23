
// LOAD MAIN
$("#dynamicContent").load("./home/contenido_home.html");

var firstName=localStorage.getItem("firstName");
var lastName=localStorage.getItem("lastName");

if(!firstName || !lastName){
  
  window.location="index.html";

}else if(firstName){

  $("#userProfileName").text(firstName + " " + lastName);

}

// OBTENER VARIABLE DE URL
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable) {
            return pair[1];
        }
    }
    return false;
 }

//  VALIDA URL NAVIGATION MENU
 switch (getQueryVariable('pg')) {
    case 'vc':
      $("#dynamicContent").load("./validar_ciud/validar.html");
      break;
    case 'pdv':
        $("#dynamicContent").load("./timeline/timeline.html");
      break;
    case 'fq':
        $("#dynamicContent").load("./faqs/faqs.html");
      break;
    case 'pr':
        $("#dynamicContent").load("./partners/partners.html");
      break;
  }

  $("#closeSession").click(function(){
			
    close();

  });

  function close(){

    localStorage.clear();

  }

  



