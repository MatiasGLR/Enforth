
  function login() {
    var un = $('#username').val();
    var pw = $('#password').val();
    var username = "enforthadmin"; 
    var password = "enforth451";
    if ((un == username) && (pw == password)) {
        $('#exampleModal').modal('hide');
        alert ("Te has conectado como administrador.");
        Cookies.set('isadmin','12345',{expires: 5});
        return false;
    }
    else {
        alert ("Usuario y contraseña incorrectos");
    }
  }

  document.addEventListener("DOMContentLoaded", (event) => {
    if(isAdmin()){

    }
  });

  function isAdmin(){
    if(Cookies.get('isadmin') == "12345") return true;
    else return false;
  }