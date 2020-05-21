function registrar(){
	var nombre 	  = $('#nombre').val();
	var apellidos = $('#apellidos').val();
	var email 	  = $('#email').val();
	var password  = $('#password').val();
	var usuario   = $('#usuario').val();
	var clase     = $('#clase').val();

	if(nombre == ""){
		alert("Ingrese su nombre");
		return;
	}
	if(apellidos == ""){
		alert("Ingrese su apellido");
		return;
	}
	if(email == ""){
		alert("Ingrese su email");
		return;
	}
	if(password == ""){
		alert("Ingrese su password");
		return;
	}
	if(usuario == ""){
		alert("Ingrese su usuario");
		return;
	}
	if(clase == ""){
		alert("Ingrese su clase");
		return;
	}

	var databaseService = firebase.database();
	var referencia = databaseService.ref('usuarios');
	var refItem = referencia.push().getKey();

	var referencia1 = databaseService.ref('usuarios/'+refItem);

	referencia1.set({
	  nombre 		: nombre,
	  apellidos		: apellidos,
	  email 		: email,
	  password 		: password,
	  usuario 		: usuario,
	  clase 		: clase
	}).then(function() {
		console.log("Usuario creado");
		$("input").val("");
    })
    .catch(function(error) {
        console.log('detectado un error', error);
    });
}