$(function() {
	if(localStorage.getItem("key") == ""  || localStorage.getItem("key") == null || localStorage.getItem("key") == undefined) {
        location.href = "login";
		return;
    }else {

        var option  = '<select class="selectpicker" id="usuarioDrop" style="background: rgba(0,0,0,0.0); color: white; border: none;">'+
                          '<option disabled selected><span>'+localStorage.getItem("user")+'</span></option>'+
                          '<option value="cerrar" style="color: black !important">Cerrar</option>'+
                        '</select>';
        var img = '<img src="'+(localStorage.getItem("clase") == 1 ? 'img/bk.PNG' : localStorage.getItem("clase") == 2 ? 'img/mg.PNG' : localStorage.getItem("clase") == 3 ? 'img/mago.PNG' : 'img/elf.PNG')+'" style="max-width: 30px; border-radius: 50%">';
        $('#usuario').html(img+option);
    }

    $( "#usuarioDrop" ).change(function() {
      var opcion = $('#usuarioDrop').val();
      if(opcion == "cerrar") {
        firebase.database().ref("usuarios/"+localStorage.getItem("key")).update({'estado': 0});
        localStorage.clear();
        location.href = 'login';
      }
    });
	setTimeout(function(){ busca_user(); }, 1000);
});

//localStorage.getItem("key_user");
function agregar(){
    var producto  = $('#myInput').val();
	var cantidad  = $('#cantidad').val();
	var red 	  = $('#red').val();
	var fg 	  	  = $('#fg').val();
	var war 	  = $('#war').val();
	var style 	  = $('#style').val();
	var comprar   = $('#comprar').is(":checked");
	var vender    = $('#vender').is(":checked");

	if(comprar == false && vender == false){
		alert("Seleccione qué quiere hacer con el producto");
		return;
	}
	if(producto == ""){
		alert("Ingrese su producto");
		return;
	}
	if(cantidad == ""){
		alert("Ingrese su cantidad");
		return;
	}
	if(red == "" && fg == "" && war == "" && style == ""){
		alert("Ingrese su precio");
		return;
	}

	var databaseService = firebase.database();
	var referencia = databaseService.ref('usuarios');
	var refItem = referencia.push().getKey();

	if(comprar == true) {
		var referencia1 = databaseService.ref('usuarios/'+localStorage.getItem("key")+'/compras/'+refItem);
		referencia1.update({
	      	producto 		: producto.toUpperCase(),
			 cantidad		: cantidad,
			 red 		    : red,
			 fg 		    : fg,
			 war 		    : war,
			 style 		    : style,
			 status 		: 0
		}).then(function() {
			console.log("Se agregó correctamente");
			$("input").val("");
	    })
	    .catch(function(error) {
	        console.log('detectado un error', error);
	    });
	}else {
		var referencia1 = databaseService.ref('usuarios/'+localStorage.getItem("key")+'/ventas/'+refItem);
		referencia1.update({
	      	producto 		: producto.toUpperCase(),
			 cantidad		: cantidad,
			 red 		    : red,
			 fg 		    : fg,
			 war 		    : war,
			 style 		    : style,
			 status 		: 0
		}).then(function() {
			console.log("Se agregó correctamente");
			$("input").val("");
	    })
	    .catch(function(error) {
	        console.log('detectado un error', error);
	    });
	}
}

var rank=1;
var rank2=1;
function busca_user() {
var db = firebase.database();
var ref = db.ref('usuarios/'+localStorage.getItem("key")+'/ventas/');
var ref2 = db.ref('usuarios/'+localStorage.getItem("key")+'/compras/');
//console.log(localStorage.getItem("key"));
 //con esta función recorre todos los datos almacenados en FB ordenados por mi child(tipo)
ref.on("child_added", function(snapshot){
	var none = "";
	var tabla = '';
    var d = snapshot.val();

    //console.log(d.producto);
    $('.table_body').html("");

    if(d.status == 0) {
    	none = "display: none";
    }else {
    	none = "";
    }

    tabla += '<tr>'+
	              '<th scope="row">'+rank+'</th>'+
	              '<td>'+d.producto+'</td>'+
	              '<td>'+d.cantidad+'</td>'+
	              '<td>'+(d.style == '' ? '' : d.style+' style ')+(d.war == '' ? '' : d.war+' war ')+(d.fg == '' ? '' : d.fg+' fg ')+(d.red == '' ? '' : d.red+' red box')+'</td>'+
	              '<td><button type="button" onclick="eliminarProd(&#39;'+snapshot.key+'&#39; , &#39;ventas&#39;)" class="btn btn-danger px-3"><i class="fas fa-trash" aria-hidden="true"></i></button><button type="button" style="'+none+'" class="btn btn-success px-3" onclick="mostrarModal(&#39;'+snapshot.key+'&#39; , &#39;ventas&#39;)"><i class="far fa-thumbs-up" aria-hidden="true"></i></button></td>'+
	            '</tr>';
    $( ".table_body_ventas" ).append(tabla);
    rank++;
 
        
});

ref2.on("child_added", function(snapshot){
	var none = "";
	var tabla2 = '';
    var d = snapshot.val();

    $('.table_body').html("");

    if(d.status == 0) {
    	none = "display: none";
    }else {
    	none = "";
    }

    tabla2 += '<tr>'+
	              '<th scope="row">'+rank2+'</th>'+
	              '<td>'+d.producto+'</td>'+
	              '<td>'+d.cantidad+'</td>'+
	              '<td>'+(d.style == '' ? '' : d.style+' style ')+(d.war == '' ? '' : d.war+' war ')+(d.fg == '' ? '' : d.fg+' fg ')+(d.red == '' ? '' : d.red+' red box')+'</td>'+
	              '<td><button type="button" onclick="eliminarProd(&#39;'+snapshot.key+'&#39; , &#39;compras&#39;)" class="btn btn-danger px-3"><i class="fas fa-trash" aria-hidden="true"></i></button><button type="button" style="'+none+'" onclick="mostrarModal(&#39;'+snapshot.key+'&#39; , &#39;compras&#39;)" class="btn btn-success px-3"><i class="far fa-thumbs-up" aria-hidden="true"></i></button></td>'+
	            '</tr>';

    $( ".table_body_compras" ).append(tabla2);
    rank2++;
 
        
});
 
}

var clave_prod = "";
var tipo_prod = "";
function mostrarModal(clave, prod){
	$("#exampleModalCenter").modal();
	clave_prod = clave;
	tipo_prod  = prod;
}

function venderProducto(){
	firebase.database().ref("usuarios/"+localStorage.getItem("key")+'/'+tipo_prod+'/'+clave_prod).remove();
	$('#exampleModalCenter').modal('hide');
	location.href = "";
	  //let userRef = this.database.ref('users/' + userId);
    //userRef.remove()
}

function eliminarProd(clave, prod){
	firebase.database().ref("usuarios/"+localStorage.getItem("key")+'/'+prod+'/'+clave).remove();
	location.href = "";
}