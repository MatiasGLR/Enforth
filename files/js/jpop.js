


  function checkCookie() {
    let user = getCookie("username");
    if (user != "") {
      alert("Welcome again " + user);
    } else {
      user = prompt("Please enter your name:", "");
      if (user != "" && user != null) {
        setCookie("username", user, 365);
      }
    }
  }

  function hash(string) {
    const utf8 = new TextEncoder().encode(string);
    return crypto.subtle.digest('SHA-256', utf8).then((hashBuffer) => {
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map((bytes) => bytes.toString(16).padStart(2, '0'))
        .join('');
      return hashHex;
    });
  }

  function login() {
    var un = $('#username').val();
    var pw = $('#password').val();
    var username = "enforthadmin"; 
    var password = "enforth451";
    if ((un == username) && (pw == password)) {
        $('#exampleModal').modal('hide');
        alert ("Te has conectado como administrador.");
        Cookies.set('isadmin','12345',{expires: 5});
        alert ("Cookie: " + Cookies.get('isadmin') + "");
        return false;
    }
    else {
        alert ("Login was unsuccessful, please check your username and password");
    }
  }

  window = function() {isAdmin()};
  window = function() {isAdmin()};

  document.addEventListener("DOMContentLoaded", (event) => {
    isAdmin();
  });

  function isAdmin(){
    var cookie = Cookies.get('isadmin');
    if(cookie == "12345") {
        $('#ingresar').innerHTML = "Administrador";
    } else {
        alert('No eres administrador (Cookie: ' + Cookies.get("isadmin") + ')');
    }
  }