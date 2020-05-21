//localStorage.getItem("key_user");
function agregar(){
    var producto  = $('#myInput').val();
	var cantidad  = $('#cantidad').val();
	var precio 	  = $('#precio').val();

	if(producto == ""){
		alert("Ingrese su producto");
		return;
	}
	if(cantidad == ""){
		alert("Ingrese su cantidad");
		return;
	}
	if(precio == ""){
		alert("Ingrese su precio");
		return;
	}

	var databaseService = firebase.database();
	var referencia = databaseService.ref('usuarios');

	var referencia1 = databaseService.ref('usuarios/-M7kMx0D1D_A5uhzJF2K');

	referencia1.set({
      producto 		: producto,
	  cantidad		: cantidad,
	  precio 		: precio
	}).then(function() {
		console.log("Se agregó correctamente");
		$("input").val("");
    })
    .catch(function(error) {
        console.log('detectado un error', error);
    });
}