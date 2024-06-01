var bd;
var cajaContactos;

function IniciarBaseDatos()
{
    var cajaContactos = document.querySelector(".caja-contactos")
    var BtnGuardar = document.querySelector("#btn-guardar");
    BtnGuardar.addEventListener("click", AlmacenarContacto);

    var solicitud = indexedDB.open("bestiario");

    solicitud.addEventListener("error", MostrarError);
    solicitud.addEventListener("success", Comenzar);
    solicitud.addEventListener("upgradeneeded", CrearAlmacen);
}

function MostrarError(evento){
    alert("ERROR: " + evento.code + " / " + evento.message);
}

function Comenzar(evento){
    bd = evento.target.result;
    Mostrar();
}

function CrearAlmacen(evento){
    var tempdb = evento.target.result;
    var almacen = tempdb.createObjectStore("Criaturas", {keyPath: "id"});
    almacen.createIndex("BuscarNombre", "nombre", {unique: false});
}

function AlmacenarContacto(){
    var N = document.querySelector("#nombre").value;
    var I = document.querySelector("#id").value;
    var E = document.querySelector("#edad").value;

    var transaccion = bd.transaction(["Criaturas"], "readwrite");
    var almacen = transaccion.objectStore("Criaturas");
    transaccion.addEventListener("complete", Mostrar);

    almacen.add({
        nombre: N,
        id: I,
        edad: E
    });

    document.querySelector("#nombre").value = "";
    document.querySelector("#id").value = "";
    document.querySelector("#edad").value = "";
}

function Mostrar(){
    cajaContactos.innerHTML = "";

    var transaccion = bd.transaction(["Criaturas"], "readonly");
    var almacen = transaccion.objectStore("Criaturas");

    var puntero = almacen.openCursor();
    puntero.addEventListener("success", MostrarBestias);
}

function MostrarBestias(evento){
    var puntero = evento.target.result;
    if(puntero){
        cajaContactos.innterHTML += "<div>" + 
        puntero.value.nombre + "/" + 
        puntero.value.id + "/" + 
        puntero.value.edad +
        "<input type='button' class='btn-editar' value='Editar' onclick='seleccionarContacto(\"" + puntero.value.id + "\")'>" +
        "</div>";
        puntero.continue();
    }
}

function seleccionarContacto(key){
    var transaccion = bd.transaction(["Criaturas"], "readwrite");
    var almacen = transaccion.objectStore("Criaturas");

    var solicitud = almacen.get(key);
    solicitud.addEventListener("success", function(){
        document.querySelector("#nombre").value = solicitud.result.nombre;
        document.querySelector("#id").value = solicitud.result.id;
        document.querySelector("#edad").value = solicitud.result.edad;
    });

    var padreBoton = document.querySelector('.padre-boton');
    padreBoton.innerHTML = "<input type='button' class='btn-actualizar' value='Actualizar' onclick='actualizarContacto()'>";

}

function actualizarContacto(){
    var N = document.querySelector("#nombre").value;
    var I = document.querySelector("#id").value;
    var E = document.querySelector("#edad").value;

    var transaccion = bd.transaction(["Criaturas"], "readwrite");
    var almacen = transaccion.objectStore("Criaturas");
    transaccion.addEventListener("complete", Mostrar);

    almacen.add({
        nombre: N,
        id: I,
        edad: E
    });

    document.querySelector("#nombre").value = "";
    document.querySelector("#id").value = "";
    document.querySelector("#edad").value = "";
}

window.addEventListener("load", IniciarBaseDatos);
