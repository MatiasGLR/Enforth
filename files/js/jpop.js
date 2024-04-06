
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
    if(isAdmin()) {
      $('#ingresar').parent().css('display', 'none');
      $('#logged').css('display', 'block');
      $('#administracion').css('display','block');
    } else {
      if(!isAdmin()) { 
        $('#administracion').css('display','none');
      }
    }
  });

  function isAdmin(){
    if(Cookies.get('isadmin') == "12345") return true;
    else return false;
  }

  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  function bugcoll(id) {
    $(id).children().collapse('hide');
  }