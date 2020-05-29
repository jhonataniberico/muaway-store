$(function() {
    busca_user(10);
    if(localStorage.getItem("key") == ""  || localStorage.getItem("key") == null || localStorage.getItem("key") == undefined) {
        var option = '<a href="login"><i class="fa fa-user mr-2"></i>Ingresar</a>';
        $('#registroDisabled').css('display', '');
        $('#usuario').html(option);
    }else {
        $('#panelDisabled').css('display', '');
        $('#registroDisabled').css('display', 'none');
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

    $("#txtStyle").change(function(){
        _this = this;
        $.each($(".buscar"), function() {
        if($(this).text().toLowerCase().indexOf($('#txtStyle').val().toLowerCase()) === -1)
        $(this).hide();
        else
        $(this).show();
        });
    });

    $("#txtWar").change(function(){
        _this = this;
        $.each($(".buscar"), function() {
        if($(this).text().toLowerCase().indexOf($('#txtWar').val().toLowerCase()) === -1)
        $(this).hide();
        else
        $(this).show();
        });
    });

    $("#txtFG").change(function(){
        _this = this;
        $.each($(".buscar"), function() {
        if($(this).text().toLowerCase().indexOf($('#txtFG').val().toLowerCase()) === -1)
        $(this).hide();
        else
        $(this).show();
        });
    });

    $("#txtRed").change(function(){
        _this = this;
        $.each($(".buscar"), function() {
        if($(this).text().toLowerCase().indexOf($('#txtRed').val().toLowerCase()) === -1)
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

var limite = 10;
var countries = ["SET MAJESTICK 2.0","SET LIGTH HAWK","SET RAVEN","SET WAR 2.0","SET GHOST","SET CHRISTMAS SPIRIT","SET SNOW MASCULINO","SET CANDY","SET DARKNES","SET DEATH 2.0","SET ANGEL","SET X MAS","SET HALLOWEEN MASCULINO","SET LOVE 2.0","SET CUP"
    ,"SET STEL","SET 01 BLACK","SET PLATE BLACK","SET DRAGON BLACK","SET GOD CLASSE (BK)","SET JACK CLASSE( BK )","SET LEGENDARIO BLACK CLASSE SM","SET GRAND SOUL BLACK CLASSE SM","SET LEGENDARIO PVP 2.0 CLASSE SM"
    ,"SET HURRICANE PVP 2.0 CLASSE MG","SET THUNDER BLACK CLASSE MG","SET STORN BLACK CLASSE MG","SET OF RABBIT DE ELF","SET LIGTH HAWK DE ELF"
    ,"SET HALLOWEN PARA ELF","SET RAVEN DE ELF","SET JACK PARA ELF","SET DEATH 2.O PARA ELF","SET CHRISTMAS PARA ELF","SET X MAS PARA ELF","SET SNOW PARA ELF"
    ,"SET CANDY PARA ELF","SET LOVE 2.0 PARA ELF","SET RUDOLPH PARA ELF","SET DEATH 1,0 PARA ELF","CAPA LIGTH HAWK","CAPA MAJESTICK 2.0","CAPA GHOST","CAPA RAVEN","ASA SNOW"
    ,"ASA RAVEN","CAPA WAR 2.0","ASA GHOST","ASA LIGTH HAWK","CAPA SNOW","ASA CHRISTMAS SPIRIT","ASA JACK","ASA ANGEL","CAPA JACK","ASA WAR STEL","ASA WAR CUP"
    ,"ASA WAR NORMAL","ASA CANDY","ASA DEATH 2.0","ASA DARKNES","CAPA DARKNES","ASA PVP GREEN","ASA PVP BLUE","ASA PVP RED","ASA GOD","ASA LOVE 2.0","CAPA CHRISTMAS","CAPA ANGEL"
    ,"CAPA STEL","ASA STEL","ASA DEATH 1.0","CAPA STYLE","ASA STYLE","CAPA WAR 1.0","ASA SANTA","ASA BLACK","ASA LOVE 1.0","ASA WARLOCK","ASA X MAS","ASA MAJESTICK 1.0","ASA NEW 2.0","ASA NEW 1.0"
    ,"KIT MACE MAJESTICK 2.0","KIT MACE LIGTH HAWK","KIT SW RAVEN","KIT MACE WAR 2.0","KIT SW GHOST","KIT MACE GHOST","KIT MACE SNOW","KIT SPEAR SNOW","KIT HAMMER SNOW","KIT SW SNOW"
    ,"KIT SW DARKNES","KIT SW DEATH 2.0","KIT SW CANDY","KIT MACE CHRISTMAS SPIRIT","KIT SW CHRISTMAS SPIRIT","KIT SW LOVE 2.0","MACE HALLOWEEN","SHHALLOWEEN","KIT MACE HALLOWEEN"
    ,"KIT SW HALLOWEEN","MACE X MAS","SHILD X MAS","KIT MACE XMAS","KIT SW XMAS","KIT MACE CHRISTMAS","KIT HAMMER CHRISTMAS","KIT SW CHRISTMAS","KIT ANÉIS MAJESTICK 2.0","KIT ANÉIS WAR 2.0"
    ,"KIT ANEIS RAVEN","KIT ANÉIS LIGTH HAWK","KIT ANÉIS SNOW","KIT ANÉIS GHOST","KIT ANEIS CUP","KIT ANÉIS CANDY","KIT ANEÍS X MAS","KIT ANEIS RUDOLPH","KIT ANÉIS CHRISTMAS SPIRIT"
    ,"KIT ANEISMAJESTICK 1.0","KIT ANEÍS CHRISTMAS","KIT ANEIS STEL","KIT ANEIS GOD","KIT ANEIS WAR 1.0","KIT ANEÍS LOVE","KIT ANEIS NEW","KIT ANEIS DEATH 1.0","KIT ANÉIS STYLE","KIT ANÉIS DARKNES"
    ,"RABBIT BOY PET","PET MAJESTICK 2.0","CORVO LIGHT HAWK","FENRIR GHOST SKIN 2","CORVO SKIN 1","CORVO SKIN 2","FENRIR RED","FENRIR GHOST SKIN 1","FENRIR STEL","FENRIR STEL SKIN 2","FENRIR BLACK"
    ,"FENRIR GOLD","PET WAR 2.0","HORSE NORMAL","HORSE CHRISTMAS","LITTLE MUSE ELF PET","Nigeria","LITTLE BLADE KNIGTH PET","LITTLE SOUL MASTER PET","LITTLE SKULL PET","SNOWMAN PET"
    ,"PET LOVE","SNOWFLAKE PET","IMP OLYMPICK","PET HALLOWEEN GIRL","PET HALLOWEEN","PET STELL","PET CHRISTMAS","IMP BLUE","IMP RED","PET ANGEL","PET DEATH 1.0","ANGEL PET OLYMPICK","ANGEL PET"
    ,"PET DEATH 2.0 SKIN 1","DINO GREEN","DINO GOLD","DINO NORMAL","DINO RED","DINO STEL","DINO RED TRANSPARENTE","DINO PINK"];

function busca_user(limit) {  
var db = firebase.database();
var ref = db.ref('usuarios');
var html = '';
var html2 = '';
var keys = []

var limite1 = 1;
var limite2 = 1;

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
        if(limite1 <= limit){
             html += '<div class="card buscar">'+
                  '<div class="card-body">'+
                    '<div class="row">'+
                      '<div class="col-md-4">'+
                        '<div style="border-radius: 50%; border-color: #ABB1BA; width: 50px;">'+
                          '<img src="'+(keyExists(m.producto, countries) == false ? 'img/articulos/noimage.png': 'img/articulos/'+m.producto+'.webp')+'" style="max-width: 100px;">'+
                        '</div>'+
                      '</div>'+
                     ' <div class="col-md-4 mt-4">'+
                        '<h5><a href="" style="pointer-events: none;">'+m.producto+'</a></h5>'+
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
                      '<li class="list-inline-item"><a href="" style="pointer-events: none;">'+d.usuario+'</a></li>'+
                      '<li class="list-inline-item pr-2 black-text">'+(d.estado == 1 ? 'EN LÍNEA AHORA <i class="fa fa-circle" style="color: green"></i>' : 'FUERA DE LÍNEA <i class="fa fa-circle" style="color: red"></i>')+'</li>'+
                    '</ul>'+
                  '</div>'+
                '</div>'+
                '<br>';
        }else {
            return;
        }
       
        limite1++;

    });

    firebase.database().ref("usuarios/"+key+'/ventas/').on("child_added", function(snapshot2){
        //console.log(snapshot2.key);
        var clave = snapshot2.key;
        var m = snapshot2.val();

        if(limite2 <= limit){
            html2 += '<div class="card buscar">'+
                  '<div class="card-body">'+
                    '<div class="row">'+
                      '<div class="col-md-4">'+
                        '<div style="border-radius: 50%; border-color: #ABB1BA; width: 50px;">'+
                          '<img src="'+(keyExists(m.producto, countries) == false ? 'img/articulos/noimage.png': 'img/articulos/'+m.producto+'.webp')+'" style="max-width: 100px;">'+
                        '</div>'+
                      '</div>'+
                     ' <div class="col-md-4 mt-4">'+
                        '<h5><a href="" style="pointer-events: none;">'+m.producto+'</a></h5>'+
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
                      '<li class="list-inline-item"><a href="" style="pointer-events: none;">'+d.usuario+'</a></li>'+
                      '<li class="list-inline-item pr-2 black-text">'+(d.estado == 1 ? 'EN LÍNEA AHORA <i class="fa fa-circle" style="color: green"></i>' : 'FUERA DE LÍNEA <i class="fa fa-circle" style="color: red"></i>')+'</li>'+
                    '</ul>'+
                  '</div>'+
                '</div>'+
                '<br>';
        }else {
            return;
        }

        limite2++;


    })
    $('#ventas').append(html2);
    $('#compras').append(html);
        
});
 
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

function keyExists(key, search) {
    if (!search || (search.constructor !== Array && search.constructor !== Object)) {
        return false;
    }
    for (var i = 0; i < search.length; i++) {
        if (search[i] === key.toUpperCase() ) {
            return true;
        }
    }
    return key in search;
}

function verMas(){
    limite = limite+10;
    busca_user(limite);
}

function verMenos(){
    if(limite == 10) {
        return;
    }else {
        limite = limite-10;
        busca_user(limite);
    }
}