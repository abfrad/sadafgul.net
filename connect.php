<?php
$servername="localhost";
$username="sadafgul";
$password="13GoyeAabi";


//$servername="mysql9.mylogin.ie";
//$username="sadafdesign";
//$password="13GoyeSeya";
$dbname="sadafprojects";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}








?>