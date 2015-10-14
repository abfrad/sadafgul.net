<?php
//you should always start session to use the global variables
session_start();
include '../connect.php';

//if logged in this will take direclty to home page
if(isset($_SESSION['name']))
{
    header('location:home.php');
}

?>


<html>
    <head>
        
    <link rel="stylesheet" href="../stylesheets/mystyle.css">
    <link rel="shortcut icon" href="../img/icon.ico">
        
        
    </head>
    
    
    <body>
    
        <div id="container">
            
            
                <div id="hb"> 

                    <div id="logo"></div>

                    <div id="hbfiller" >

                    </div>

                </div>

                <div id="login">

                    <form method="post" action="login.php">
                        Username <input type="text" autofocus name="name">
                        Password <input type="password" name="pass">
                        <input type="submit" value="Log In" >
                    </form>

                </div>

        </div>
        
    
    </body>

</html>