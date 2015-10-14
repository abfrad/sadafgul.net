<?php
session_start();
include '../connect.php';

$name= $_POST["name"];
$pass= $_POST["pass"];

if ($name != "" and $pass != "") {
    
$sql = "SELECT * FROM admin WHERE username ='$name'
and password ='$pass'";


$result = mysqli_query($conn,$sql);
$count = mysqli_num_rows($result);


if($count == 1) {
    $_SESSION['name'] = $name;
    $_SESSION['pass'] = $pass;
    header('location:home.php');	
	
}
    else {
    echo "<div class='err'>Wrong Username or Password!</div>" ;
}

}







?>