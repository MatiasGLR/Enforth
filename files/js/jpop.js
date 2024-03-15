
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

  function openAdm() {
    if(isAdmin()) {
      alert("Ya estás conectado como administrador");
    } else {
      $('#exampleModal').modal('show');
    }
  }

  document.addEventListener("DOMContentLoaded", (event) => {
    
      $('#ingresar').text('Administrador');
      $('#ingresar').parent().css('display', 'none');
      $('#logged').css('display', 'block');
  });

  function isAdmin(){
    if(Cookies.get('isadmin') == "12345") return true;
    else return false;
  }