function ingresar(){
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
        var key = snapshot.key;
        if(email != d.email){
           alert('Email incorrecto');
            return;
        }
        if(contra != d.password){
            alert('Contraseña incorrecta');
            return;
        }
        if(email == d.email && contra == d.password){
            firebase.database().ref("usuarios/"+key).update({'estado': 1});
            localStorage.setItem("key", key);
            localStorage.setItem("user", d.usuario);
            localStorage.setItem("clase", d.clase);
            localStorage.setItem("email", d.email);
            location.href = "dashboard";
        }
    });
}