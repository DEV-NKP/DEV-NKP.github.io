<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__ . '/src/Exception.php';
require_once __DIR__ . '/src/PHPMailer.php';
require_once __DIR__ . '/src/SMTP.php';

$recName1=$_POST['uname'];
$recMail1=$_POST['uemail'];
$sub1=$_POST['usub'];
$body1=$_POST['umsg'];
mailer($recName1,$recMail1,$sub1, $body1 );

function mailer($recName,$recMail,$sub, $body )
{
$mail = new PHPMailer(true);

try {
    
    $mail->SMTPDebug = SMTP::DEBUG_SERVER; 
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    $mail->Username = 'raw.system.confirmation@gmail.com'; 
    $mail->Password = 'nhdzzoorwakobtfo';

   
    $mail->setFrom('raw.system.confirmation@gmail.com', 'DEV-NKP');
    $mail->addAddress($recMail, $recName);
    //$mail->addReplyTo('raw.helpdesk@gmail.com', 'Medic- M'); 

    
    $mail->IsHTML(true);
    $mail->Subject = $sub;
    $mail->Body = $body;

    $mail->send();
   // echo "Email message sent.";
   include './index.html';
} 

catch (Exception $e) {
    mailer($recName1,$recMail1,$sub1, $body1 ); 
}
}

?>
