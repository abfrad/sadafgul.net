<?php

include 'connect.php';

$dir = $_GET['dir'];
$pj = $_GET['pj'];
$curr_art = $_GET['curart'];

$galquery ="SELECT * FROM gallery WHERE pj_id=".$pj;
$galresult=mysqli_query($conn, $galquery);
$pjrow;
$final;
$next;
$prev;
$curr;
$doloop;
//How many arts in one project
$numrows = mysqli_num_rows($galresult);


//Cur_art passes well
if ($dir=='start')
{
//next represents what to be outputed	
$final=mysqli_fetch_assoc($galresult);
 
	
}

else {
	
	

$doloop=true;
$counter=0;
	
		while ($doloop==true)
		{

			$pjrow = mysqli_fetch_assoc($galresult);
			//echo ($pjrow['art_id']);
			$counter ++;
			if ($pjrow['art_id']==$curr_art) 
			{
				
				$curr=$pjrow;
				//If pointer is at the last row the next element changes back to first
				if ($counter==$numrows)
				{
					mysqli_data_seek($galresult , 0);
					$next=mysqli_fetch_assoc($galresult);
				}
				else
				{
					$next=mysqli_fetch_assoc($galresult);
				}
				
				// If the pointer is at the begingin the previous is the last row
				if ($counter ==1)
				{
					mysqli_data_seek($galresult , $numrows-1);
					$prev=mysqli_fetch_assoc($galresult);
				}
				
				$doloop=false;

			}
			else{
			
				//This is set when the desired row is not found and the checked row is saved as previous for the next row
				
				$prev=$pjrow;
				
	
			}
		


		}
	
		if ($dir=='left')
		{

			$final=$prev;

		}


		if ($dir=='right')
		{

			
			$final=$next;
		}



}



//Url of the Artwork to be loaded 
$art_url=$final['url'];
//The id of art to be sent with HTML element so it will be used in future to call neighboring elements 
$curr_art=$final['art_id'];

//In case art is an Image
if ($final['type']=='img'){

$art_url=$final['url'];

	//curart property is used to transfer id if current artwork
echo "


<img id='art' curart='$curr_art' src='$art_url' >


";
	
}

//if the artwork is a Video
else if ($final['type']=='vid'){
	

echo "
<video id='art' curart='$curr_art' controls>

<source src='$art_url' >

</video>

";
	
	
}

//at lat draw left and right buttons

$fin_id=$final['art_id'];

















?>