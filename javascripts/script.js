var tiles;
var openproject;
var currentitem;
var currentproject;
var tiledime;
var curr_art;
var spacer;
var scrollmax, scrollmin;
var scroled=false;
//holds scroll position of the window
var scy;
var scylogger;
//timer for the scroll
var scrltimer;
// for the size of filler on noth sides of the logo
var filrmaxwid;
var filrminwid;
// dfining some elements global to reduce javascript cals
var logo;
var logominwidth, logomaxwidth;
var lfiller;
var hedbar;
var hbminheight,hbmaxheight;
//minimize maximize speed
var mmspeed=500;
var largefont, smallfont;
var midcon;


function hov (evt) {    
    $(document).ready(function() {
        $(evt.target).animate ( {
           opacity:'1'
        } , 300 );
    });
}


function out (evt) {    
    $(document).ready(function() {
        $(evt.target).animate ( {
           opacity:'0'
        } , 100 );
    });
}


function scrlto(elem) {
    
    //y offset of the page on the top part of the screen
    var winpos=window.scrollY;
   
    // alert ("this is element top postion" + elem.offsetTop);
    $(document).ready( function(){
    
    //y offset of the element minus 58 pixels
		var eltop= ($(elem).offset().top) - scrollmin;

		$('html,body').animate ({

			scrollTop:eltop

		 }, 1000, function(){
			//Item in proper scroll
			scroled=true;
		});               
          
    });
}


//////////////////JQUERY LISTENERS

$(document).ready(function() {

 });


window.onscroll=function() {
     
	var hbht =(midcon.offsetTop - window.scrollY)-spacer;
	var logowidth=((hbht*291)/104);
	 var filrwid =((window.innerWidth - logowidth)/2);
	
	if (hbht<hbminheight)
	{
	hedbar.style.height	= hbminheight+'px';
	logo.style.width=logominwidth+'px';
	lfiller.style.width=filrminwid+'px';
	}
	else
	{
	hedbar.style.height	= hbht+'px';
	logo.style.width=logowidth+'px';
	lfiller.style.width=filrwid+'px';
	}

	
	/*
   //var scy=this.scrollY;
    scy=window.scrollY;
    scylogger=scylogger+" "+scy;
    // this clears the previous set timers, the only timer that will function would be the one that has one second time
    clearTimeout (scrltimer);

    scrltimer= setTimeout(function(){ 
		scrlCheck();
    }, 100); */

 } 
 
 
function scrlCheck () {
	 
     scy=window.scrollY;
	 
     if (scy<1){  
                 
     } 
	 
     else { 
                  
     }
    
 }
 
 

window.onkeyup= function(event){
    
   // scrlCheck ();
    if (event.keyCode==37){
    slide('left' , curr_art);
    }

    if (event.keyCode==39){
    slide('right' , curr_art);
    }
    
}


    
function expandproject() {
    
    
     
    
    //needed variables for this function
    var container = document.getElementById('midcontainer');
    var wid = container.offsetWidth;
	currentproject=this;
    
    var projtop;
    var pjplate;
    
     //to close previous open projects
    if (openproject==currentproject)
        return;
    
    if (openproject) {
        shrinkproject(openproject);   
    }  
    
	//this line is vital because the div needs to go to the new line and determine its new location on Y axis of the page to it is later prperly scorlled.
	currentproject.style.width=wid+'px';
    currentproject.style.marginLeft='0px';
	currentproject.style.backgroundImage='none';

    //AJAX to get data from the server 
    var httpreq= new XMLHttpRequest();  
    httpreq.onreadystatechange = function() {
        
		if (httpreq.readyState==4 && httpreq.status==200){
		 	currentproject.innerHTML=httpreq.responseText; 
        	pj=document.getElementById('pj');
        	
         	//background of the artwork
         	var artbg=document.getElementById('artbg');
			
			//setting the height of the background
			var ah=(window.innerHeight - scrollmin) +'px';
			artbg.style.height=ah;
			//this div is created to put the loaded art in it ... while conrtollers are also children of artbg
			//this is done to prevent fading of controllers while sliding meaning controllers are independent from art plate
			var artplate=document.createElement('div');
			artplate.id='artplate';
			artbg.appendChild(artplate);
		 	slide('start', '0');
			
		
          
		 	//JUQUERY BLOCK 
         
			$(document).ready(function() {

				//this part makes the screen scroll to a specific element, I know too cool. OffsetTop did not work tho. -70 is because we have a                  fixed         banner and we want element to scroll below it and not in the top of the window.
				//projtop= ($(currentproject).offset().top) - 60

				// hegiht of all project calcualted from height of inside elements In here I fixed the hiding contenct of pj div 
				var hgh2 =$('#pj').height();

						$(currentproject).animate({
								//height of project is animted open
								height:hgh2

								}, 1000 , function() {

												//this is when animation ends and mostlikely project load ends as well.
												openproject = currentproject;

						  });

			   scrlto (currentproject);

			}); //END OF JQUERY BLOCK
         
	 	}
    
       
    }
    
    //is should be sent outside the onreadystate 
    // In here we also send the id of the project to retrive from the database 
    httpreq.open ("GET", "controller.php?id="+ currentproject.id , true);
    httpreq.send();
  
   
 
}
	



function slide(direc, curart) {
    
	
	  //AJAX to get data from the server NOTE: since this is async connection you might want to write follow up adjusments that are depedandt of the output of the AJAX request in the onreadystate change only, if you try to wirte it after the method call, it might not work.
    var httpreq= new XMLHttpRequest();  
    httpreq.onreadystatechange = function() {
        
		if (httpreq.readyState==4 && httpreq.status==200){
			
		 	document.getElementById('artplate').innerHTML=httpreq.responseText; 
			
			$(document).ready (function(){
			
			  $('#art').animate ({
			  
				  
				  opacity: '1'
			  
			  }, 1000);
			
			
			});
        	
			//adding hover and leave effects to left adn right buttons
			 var right=document.getElementById('right');
			var left=document.getElementById('left');
			var art=document.getElementById('art');
			var artbg=document.getElementById('artbg');
		
			 curr_art = art.getAttribute('curart');
			//alert(curr_art);
			//alert(curart);
			
			artbg.onclick=function(){
                    
                 scrlto(this);
         
         };
			
				//adding handeler for the click of the left and right
				left.onclick=function(){
				slide ('left', curr_art )
				};
				right.onclick=function(){
				slide ('right', curr_art )
				};
			
			
			 right.addEventListener( "mouseover" , hov );
			 left.addEventListener( "mouseover" , hov  );
			 left.onmouseout = out;
			 right.onmouseout = out; 
			

			
	 	}
    
       
    }
    
    //is should be sent outside the onreadystate 
    // In here we also send the id of the project to retrive from the database 
    httpreq.open ("GET", "art.php?dir="+ direc + "&pj="+currentproject.id +"&curart=" + curart , true);
    httpreq.send();
  
	
}



//the problem is when minimize is running maximise starts executing 









function shrinkproject (tile) {
  
    
    tile.style.height=tiledime+'px';
    tile.style.width=tiledime+'px';
	tile.style.marginLeft=spacer+'px';
    var pjname =document.getElementById('pjtype');
    var name=pjname.innerHTML;
	// as project is it block to remove animation jumps, but as small tile its back to inline-blocks
    //tile.style.display='iblock';
    tile.style.backgroundImage="url('img/"+ tile.id + ".jpg')";
    //replacing the shade 
    var shad=document.createElement('div');
    shad.className='tileshade';
    shad.innerHTML=name;
    shad.onmouseover=hov;
    shad.onmouseout=out;
    tile.innerHTML="";
    tile.appendChild(shad);
    openproject=null;
}

	



function draw() {
     
    //this one works, tiles are added to an array
    tiles=document.getElementsByClassName('tile');
    shades=document.getElementsByClassName('tileshade');
	
	//defining some global elemnts
    hedbar=document.getElementById("hb");
	lfiller=document.getElementById('lfiller');
	logo=document.getElementById('logo');
     midcon=document.getElementById("midcontainer");
	var footer=document.getElementById('footer');
	var body=document.getElementsByTagName('body')[0];
	
	// Seting the tiles size
    i=0;
	var freeSpace=midcon.offsetWidth/20;
	spacer=(freeSpace/6);
	//-20 is for scrollbar
	tiledime=((midcon.offsetWidth-freeSpace-20)/5);
	
	hbmaxheight=tiledime/2.5;
	logomaxwidth=((hbmaxheight*291)/104);
	var footerheight=hbmaxheight+(hbmaxheight/1.6); 
	
	hbminheight=tiledime/4;
    logominwidth=((hbminheight*291)/104);
	
	//setting scroll space for both conditions
	scrollmax=spacer+hbmaxheight;
	var small_spacer=spacer/2;	
	scrollmin=small_spacer+hbminheight;

	//set the headbar and logo sizes
	filrmaxwid =((window.innerWidth - logomaxwidth)/2);
	filrminwid=((window.innerWidth - logominwidth)/2);
	
	//setting font sizes
	largefont=((tiledime*18)/255);
	smallfont=((tiledime*15)/255);
	
	
	
	lfiller.style.width=filrmaxwid+'px';
	logo.style.width=logomaxwidth+'px';
	hedbar.style.height=hbmaxheight+'px';
	midcon.style.marginTop=scrollmax+'px';
	footer.style.height=footerheight+'px';
	body.style.fontSize=smallfont+'px';
	body.style.lineHeight=largefont+'px';
	
    //title click handler
     hedbar.onclick=function(){
    
     window.scrollTo(0, 0);

     
    }
    
	 
	
    
    do
    {
         
        //passing the id that had been set by php to the drwaproject function in order to fetch relevant data for each project    
        tiles[i].addEventListener("click", expandproject);
        
        //adding hover funtions from Jquery
       
        shades[i].onmouseover=hov;
        shades[i].onmouseout=out;
        tiles[i].style.backgroundImage="url('img/"+ tiles[i].id + ".jpg')";
        tiles[i].style.height=tiledime+'px';
        tiles[i].style.width=tiledime+'px';
        tiles[i].style.marginLeft=spacer+'px';
		tiles[i].style.marginBottom=spacer+'px';
        i++;
       
    }
    
    while (tiles);
 
    
}


	
window.onload= draw;


 