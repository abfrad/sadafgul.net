<!DOCTYPE html>

<?php

include 'connect.php';
 
?>
<html class="no-js" lang="en"> 
	<head>
	
		<meta charset="utf-8" />
		<title>Sadaf Frahmand</title>
		<link rel="shortcut icon" href="img/icon.ico">
		<!-- Included CSS Files -->
	
		<link rel="stylesheet" href="stylesheets/mystyle.css" >

	</head>

	<body>
	<div id="container">

		
        
		<div id="hb"> 
            
			
			 <div id="logo">.</div>
           
            
        <!--    <div id="hbfiller" >
                
            </div> -->
           
        
        </div>
	
		
		  
    
        
    
		<div id="midcontainer">
        
			
				
				
				<?php
				
				$query= "SELECT * FROM projects";
				
				$result= mysqli_query($conn,$query);
				
				while ($row = mysqli_fetch_assoc($result))
				
				{
				$name=$row["name"];
				$descr=$row["description"];
				$nofitem=$row["numberofitems"];
				$id=$row["id"];
				$pjtype=$row["projecttype"];
				
				echo 
				"
				<div class='tile' id=$id>
					
					<div class='tileshade'>$pjtype </div>	
					
													
				</div>	 		
				";
				
				}
				
				?>
				
		</div>
		<br/>
	
		<?php
		include 'footer.php';
		?>

	</div>	
		<script type="text/javascript" src="javascripts/jquery-1.10.2.js"></script>
		<script type="text/javascript" src="javascripts/script.js"></script>
	</body>
	
</html>	