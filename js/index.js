$(function() {
    busca_user();
    if(localStorage.getItem("key") == ""  || localStorage.getItem("key") == null || localStorage.getItem("key") == undefined) {
        var option = '<a href="login"><i class="fa fa-user mr-2"></i>Ingresar</a>';
        $('#usuario').html(option);
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
        location.href = '';
      }
    });

    $("#searchButton").click(function(){
        _this = this;
        $.each($(".buscar"), function() {
        if($(this).text().toLowerCase().indexOf($('#searchText').val().toLowerCase()) === -1)
        $(this).hide();
        else
        $(this).show();
        });
    });

    $("#searchButton1").click(function(){
        _this = this;
        $.each($(".buscar"), function() {
        if($(this).text().toLowerCase().indexOf($('#searchText1').val().toLowerCase()) === -1)
        $(this).hide();
        else
        $(this).show();
        });
    });
});

function busca_user() {  
setTimeout(function(){
var db = firebase.database();
var ref = db.ref('usuarios');
var html = '';
var html2 = '';
var keys = []

ref.on("child_added", function(snapshot){
	var none = "";
    $('#ventas').html("");
    $('#compras').html("");
    var d = snapshot.val();
    var key = snapshot.key

    firebase.database().ref("usuarios/"+key+'/compras/').on("child_added", function(snapshot2){
        //console.log(snapshot2.key);
        var clave = snapshot2.key;
        var m = snapshot2.val();

        html += '<div class="card buscar">'+
                  '<div class="card-body">'+
                    '<div class="row">'+
                      '<div class="col-md-4">'+
                        '<div style="border-radius: 50%; border-color: #ABB1BA; width: 50px;">'+
                          '<img src="img/articulos/'+m.producto+'.webp'+'" style="max-width: 100px;">'+
                        '</div>'+
                      '</div>'+
                     ' <div class="col-md-4 mt-4">'+
                        '<h5><a href="">'+m.producto+'</a></h5>'+
                        ' <h5>'+m.cantidad+' <i class="fa fa-puzzle-piece"></i></h5>'+
                         '<h5>'+(m.style == '' ? '' : m.style+' style')+' '+(m.war == '' ? '' : m.war+' war')+' '+(m.fg == '' ? '' : m.fg+' fg')+' '+(m.red == '' ? '' : m.red+' red box')+'</h5>'+
                      '</div>'+
                      '<div class="col-md-4 mt-5">'+
                        '<button type="button" class="btn btn-primary" onclick="vender(&#39;'+clave+'&#39; , &#39;'+m.producto+'&#39; , &#39;'+m.email+'&#39; , &#39;'+key+'&#39;)">VENDER</button>'+
                      '</div>'+
                    '</div>'+
                  '</div>'+
                  '<div class="rounded-bottom mdb-color lighten-3 text-left pt-3">'+
                    '<ul class="list-unstyled list-inline font-small ml-4">'+
                      '<li class="list-inline-item"><img src="'+(d.clase == 1 ? 'img/bk.PNG' : d.clase == 2 ? 'img/mg.PNG' : d.clase == 3 ? 'img/mago.PNG' : 'img/elf.PNG')+'" style="max-width: 50px; border-radius: 50%"></li>'+
                      '<li class="list-inline-item"><a href="">'+d.usuario+'</a></li>'+
                      '<li class="list-inline-item pr-2 black-text">'+(d.estado == 1 ? 'EN LÍNEA AHORA <i class="fa fa-circle" style="color: green"></i>' : 'FUERA DE LÍNEA <i class="fa fa-circle" style="color: red"></i>')+'</li>'+
                    '</ul>'+
                  '</div>'+
                '</div>'+
                '<br>';

    });

    firebase.database().ref("usuarios/"+key+'/ventas/').on("child_added", function(snapshot2){
        //console.log(snapshot2.key);
        var clave = snapshot2.key;
        var m = snapshot2.val();

        html2 += '<div class="card buscar">'+
                  '<div class="card-body">'+
                    '<div class="row">'+
                      '<div class="col-md-4">'+
                        '<div style="border-radius: 50%; border-color: #ABB1BA; width: 50px;">'+
                          '<img src="img/articulos/'+m.producto+'.webp'+'" style="max-width: 100px;">'+
                        '</div>'+
                      '</div>'+
                     ' <div class="col-md-4 mt-4">'+
                        '<h5><a href="">'+m.producto+'</a></h5>'+
                        ' <h5>'+m.cantidad+' <i class="fa fa-puzzle-piece"></i></h5>'+
                         '<h5>'+(m.style == '' ? '' : m.style+' style')+' '+(m.war == '' ? '' : m.war+' war')+' '+(m.fg == '' ? '' : m.fg+' fg')+' '+(m.red == '' ? '' : m.red+' red box')+'</h5>'+
                      '</div>'+
                      '<div class="col-md-4 mt-5">'+
                        '<button type="button" class="btn btn-primary" onclick="comprar(&#39;'+clave+'&#39; , &#39;'+m.producto+'&#39; , &#39;'+m.email+'&#39; , &#39;'+key+'&#39;)">COMPRAR</button>'+
                      '</div>'+
                    '</div>'+
                  '</div>'+
                  '<div class="rounded-bottom mdb-color lighten-3 text-left pt-3">'+
                    '<ul class="list-unstyled list-inline font-small ml-4">'+
                      '<li class="list-inline-item"><img src="'+(d.clase == 1 ? 'img/bk.PNG' : d.clase == 2 ? 'img/mg.PNG' : d.clase == 3 ? 'img/mago.PNG' : 'img/elf.PNG')+'" style="max-width: 50px; border-radius: 50%"></li>'+
                      '<li class="list-inline-item"><a href="">'+d.usuario+'</a></li>'+
                      '<li class="list-inline-item pr-2 black-text">'+(d.estado == 1 ? 'EN LÍNEA AHORA <i class="fa fa-circle" style="color: green"></i>' : 'FUERA DE LÍNEA <i class="fa fa-circle" style="color: red"></i>')+'</li>'+
                    '</ul>'+
                  '</div>'+
                '</div>'+
                '<br>';

    })
    $('#ventas').append(html2);
    $('#compras').append(html);
        
});

}, 1000);
 
}

var clave_global = "";
var producto_global = "";
var email_global = "";
var key_user_global = "";
var global_negocio = "";
function vender(clave, producto, email, key_user){
    if(localStorage.getItem("key") == ""  || localStorage.getItem("key") == null || localStorage.getItem("key") == undefined) {
        location.href = "login";
        return;
    }else {
        $("#myModal").modal();
        $('#tituloModal').text('VENDER PRODUCTO');
        $('#textoModal').text('¿Está seguro que quiere vender '+producto+'?');
        producto_global = producto;
        email_global    = email;
        key_user_global = key_user;
        clave_global    = clave;
        global_negocio  = 'compras';
    }
}

function comprar(clave, producto, email, key_user){
    if(localStorage.getItem("key") == ""  || localStorage.getItem("key") == null || localStorage.getItem("key") == undefined) {
        location.href = "login";
        return;
    }else {
        $("#myModal").modal();
        $('#tituloModal').text('COMPRAR PRODUCTO');
        $('#textoModal').text('¿Está seguro que quiere comprar '+producto+'?');
        producto_global = producto;
        email_global    = email;
        key_user_global = key_user;
        clave_global    = clave;
        global_negocio  = 'ventas';
    }
}

function enviarDatos(){
    var comment = $('#comment').val();
    $.ajax({
        data : {id          : localStorage.getItem("key"),
                usuario     : localStorage.getItem("user"),
                email       : localStorage.getItem("email"),
                producto    : producto_global,
                email_user  : email_global,
                comentario  : comment},
        url  : 'Send.php',
        type : 'POST'
    }).done(function(data){
        firebase.database().ref("usuarios/"+key_user_global+'/'+global_negocio+'/'+clave_global).update({'status': 1});
        $('#myModal').modal('hide');
       alert('Sugerencia enviada! Cuando el otro usuario tenga una respuesta le llegará un correo.');
       $("comment").val("");
       location.href = "";
    });
}