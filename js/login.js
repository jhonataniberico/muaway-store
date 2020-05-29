function ingresar(){
    var Obj = {              
        arrayOne: [], 
        arrayTwo: [] 
    };
    var clave = "";
    var usuario = "";
    var clase = "";
	var db = firebase.database();
    var ref = db.ref("usuarios");
    var email = $('#email').val();
    var contra = $('#password').val();
    if(email == ""){
        alert('Ingrese su email');
        return;
    }
    if(contra == ""){
        alert('Ingrese su contraseña');
        return;
    }
    ref.orderByChild("email").on("child_added", function(snapshot){
        var d = snapshot.val();
        clave = snapshot.key;
        Obj.arrayOne.push(d.email); 
        Obj.arrayTwo.push(d.password);
        usuario = d.usuario;
        clase = d.clase;
    });
    setTimeout(function(){
        if(keyExists(email, Obj.arrayOne) == false) {
            alert('Email incorrecto');
            return;
        }
        if(keyExists(contra, Obj.arrayTwo) == false) {
            alert('Contraseña incorrecta');
            return;
        }
        if(keyExists(email, Obj.arrayOne) == true && keyExists(contra, Obj.arrayTwo) == true) {
            firebase.database().ref("usuarios/"+clave).update({'estado': 1});
            localStorage.setItem("key", clave);
            localStorage.setItem("user", usuario);
            localStorage.setItem("clase", clase);
            localStorage.setItem("email", email);
            location.href = "dashboard";
        }
    }, 2000);
}

function keyExists(key, search) {
    for (var i = 0; i < search.length; i++) {
        if (search[i] === key) {
            return true;
        }
    }
    return key in search;
}