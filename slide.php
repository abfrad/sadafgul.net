


<?php

include 'connect.php';

$itemnr=$_GET['itemnr'];
$id = $_GET['id'];


// in php to combine strings and variables "," is needed
//echo "this is the ID:". $id;










$itemnr=$itemnr-1;

$arts = scandir("Projects_Gallery/$id");

//$forbs=array (".","..","_","_notes","cover.jpg");

  
  echo "<img id='artp' src='Projects_Gallery/$id/", $arts[$itemnr] , " >";

 //echo "love";


?>