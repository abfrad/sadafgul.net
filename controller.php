

<?php
include 'connect.php';

$id = $_GET['id'];


// in php to combine strings and variables "," is needed
//echo "this is the ID:". $id;


//but you need "." when you assembly in a variable
$pjquery ="SELECT * FROM projects WHERE id=".$id;

$pjresult = mysqli_query($conn, $pjquery);


while ($pjrow = mysqli_fetch_assoc($pjresult)) {
    
    $name = $pjrow["name"];
    $desc= $pjrow["description"];
    $pjid=$pjrow["id"];
    $nofitems = $pjrow["numberofitems"];
    $pjtype= $pjrow["projecttype"];


}




echo "


<div id='pj' nofitems='$nofitems'>


 <div id='desc'>       

        <div id='pjtitle' >
            <div id='pjname'> $name </div>

            <div id='pjtype'> $pjtype </div>

        </div>

            <div id='pjdesc'> <p> $desc </p> </div> 
</div>            
    
    ";

//for ($i=1; $i<=$nofitems; $i++)
    
//{
    
  //  echo"
    
  //  <div class='art'> <img src='Projects_Gallery/$pjid/image$i.jpg'> </div>
    
 //   ";
   
//}

echo "

</div>


";



?>