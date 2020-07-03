<?php
/*
THIS FILE USES PHPMAILER INSTEAD OF THE PHP MAIL() FUNCTION
AND ALSO SMTP TO SEND THE EMAILS
*/

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
/*
*  CONFIGURE EVERYTHING HERE
*/

// an email address that will be in the From field of the email.
$fromEmail = 'tourmaletservice@gmail.com';
$fromName = 'Stoltz Trails Online';

// an email address that will receive the email with the output of the form
$sendToEmail = 'conradstoltz@me.com';
$sendToName = 'Conrad Stoltz';

// subject of the email
$subject = 'Testing smtp';

// smtp credentials and server

$smtpHost = 'smtp.gmail.com';
$smtpUsername = 'tourmaletservice@gmail.com';
$smtpPassword = 'f75daf7f';

$requestedFrom = $_POST['email'];
//$requestedFrom = 'dehan@rocketmail.com';

// form field names and their translations.
// array variable name => Text to appear in the email
//$fields = array('name' => 'Name', 'surname' => 'Surname', 'need' => 'Need', 'email' => 'Email', 'message' => 'Message');


// if you are not debugging and don't need error reporting, turn this off by error_reporting(0);
error_reporting(E_ALL & ~E_NOTICE);
//error_reporting(0);

try {
    
    
    $emailTextHtml = "<h1>A follow up has been requested on stoltztrails.com</h1><hr>";
    $emailTextHtml .= "<p>Please get back to them at ".$requestedFrom."<br>Regards<br>Stoltz Trails Online</p>";

  
  $mail = new PHPMailer;
    
  //$mail->setFrom($fromEmail, $fromName);
  //$mail->addAddress($sendToEmail, $sendToName); // you can add more addresses by simply adding another line with $mail->add$mail = new PHPMailer;
  //Tell PHPMailer to use SMTP
  $mail->isSMTP();
  //Enable SMTP debugging
  // 0 = off (for production use)
  // 1 = client messages
  // 2 = client and server messages
  $mail->SMTPDebug = 2;
  //Set the hostname of the mail server
  $mail->Host = $smtpHost;
  //Set the SMTP port number - likely to be 25, 465 or 587
  //$mail->Port = 25;
   //Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission  
  $mail->Port = 587;
  $mail->SMTPSecure = 'tls';
  //Whether to use SMTP authentication
  $mail->SMTPAuth = true;
  //Username to use for SMTP authentication
  $mail->Username = $smtpUsername;
  //Password to use for SMTP authentication
  $mail->Password = $smtpPassword;
  //Set who the message is to be sent from
  $mail->setFrom($fromEmail , $fromName);
  //Set an alternative reply-to address
  $mail->addReplyTo($requestedFrom, 'name');
  //Set who the message is to be sent to
  $mail->addAddress($sendToEmail, $sendToName);
  //Set the subject line
  $mail->Subject = $subject;
  //Read an HTML message body from an external file, convert referenced images to embedded,
  //convert HTML into a basic plain-text alternative body

  $mail->msgHTML($emailTextHtml);
    
    if (!$mail->send()) {
        throw new \Exception('I could not send the email.' . $mail->ErrorInfo);
    }
    
  $responseArray = array('type' => 'success', 'message' => $okMessage);
  
} catch (\Exception $e) {
    // $responseArray = array('type' => 'danger', 'message' => $errorMessage);
    $responseArray = array('type' => 'danger', 'message' => $e->getMessage());
}

$encoded = json_encode($responseArray);  
header('Content-Type: application/json');
echo $encoded;
