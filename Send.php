<?php
$usuario = $_POST['usuario'];
$comentario = $_POST['comentario'];
$producto   = $_POST['producto'];
$remitente = $_POST['email'];
$destinatario = $_POST['email_user'];
$asunto = "Muaway store - Venta/Compra";
$mensaje = "Hola, soy ".$usuario.' tengo el email: '.$remitente.' estoy interesado por el/la '+$producto+' me gustaría que me contactes.';
$headers = "From: $remitente\r\nReply-to: $remitente";

mail($destinatario, $asunto, $mensaje, $headers);
?>