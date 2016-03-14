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

if ($dir=='start')
{
//next represents what to be outputed	
$final=mysqli_fetch_assoc($galresult);
 
	
}

else {
	
	

$doloop=true;
	
		while ($pjrow=mysqli_fetch_assoc($galresult) && $doloop==true)
		{

			if ($pjrow['art_id']==$curr_art) 
			{
				$curr=$pjrow;
				//one step ahead
				$next=mysqli_fetch_assoc($galresult);
				$doloop=false;

			}
			else{
			
				//to save for the next round
				$prev=$pjrow;
	
			}
		


		}
	
		if ($dir=='left')
		{

			echo "LEFT";
			
			$final=$prev;

		}


		if ($dir=='right')
		{

			echo "RIGHT";
			$final=$next;
		}



}


if ($final['type']=='img'){

$art_url=$final['url'];
	
echo "


<img id='art' src='$art_url' >


";
	
}

else if ($final['type']=='vid'){
	
$art_url=$final['url'];

echo "
<video id='art' controls>

<source src='$art_url' >

</video>

";
	
	
}

//at lat draw left and right buttons

$fin_id=$final['art_id'];

echo "

<div id='left' ></div>

<div id='right' ></div>


";
















?>