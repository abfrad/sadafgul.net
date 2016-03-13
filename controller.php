

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

/*
$path ="Projects_Gallery/$id";
$files = scandir($path);


for ($i=0 ; $i< count($files); $i++)
{
	
	if ($files[$i] !='.' && $files[$i] !='..'&& $files[$i] !='_notes')
	{
//print($files[$i]);
$file=pathinfo($path . $files[$i]);
	//if ($file['extension']=='png')
	//{
	//	print($file['extension']);
	//	print($files[$i]);
		//echo ('<iframe width="560" height="315" src="https://www.youtube.com/embed/2hffbFKHJS4" frameborder="0" allowfullscreen></iframe>');
		//echo($file);
	//}
	}
}

*/
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