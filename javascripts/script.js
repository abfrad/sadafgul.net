var tiles;
var openproject;
var currentitem;
var currentproject;
var nofitems;
var tiledime;
var curr_art;
var spacer;
var scroled=false;
var minimized=false;
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
var lfiller;
var hedbar;


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
		var eltop= ($(elem).offset().top) - 57;

		$("body").animate ({

			scrollTop: eltop

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
     
    //var scy=this.scrollY;
    scy=document.body.scrollTop;
    scylogger=scylogger+" "+scy;
    // this clears the previous set timers, the only timer that will function would be the one that has one second time
    clearTimeout (scrltimer);

    scrltimer= setTimeout(function(){ 
		scrlCheck();
    }, 100);

 } 
 
 
function scrlCheck () {
	 
     scy=document.body.scrollTop;
	 
     if (scy<1){  
         maximize();         
     } 
	 
     else { 
         minimize();          
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
    
    
     minimize();
    
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
        	pj.style.backgroundImage="url('Projects_Gallery/"+ currentproject.id +"/cover.jpg')";
		 	//I pass a value by an arbitrary named attribute
		 	nofitems=pj.getAttribute("nofitems");
         	//background of the artwork
         	var artbg=document.getElementById('artbg');
			
			//setting the height of the background
			var ah=(window.innerHeight - 50) +'px';
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
				projtop= ($(currentproject).offset().top) - 60

				// hegiht of all project calcualted from height of inside elements 
				var hgh2 =$('#desc').height()+$('#artbg').height()+120;

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
		
			 curr_art = art.getAttribute('curart');
			//alert(curr_art);
			//alert(curart);
			
			art.onclick=function(){
                    
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
function minimize () {
	
	 minimized=true;
	 hedbar.style.height='53px';
	 logo.style.width='148px'
	 logo.style.backgroundImage="url('img/logas.fw.png')";
	 lfiller.style.width=filrminwid;

    } 




function maximize () {
	
	 minimized=false;
	 hedbar.style.height='104px';
	 logo.style.width='291px'
	 logo.style.backgroundImage="url('img/loga.fw.png')";
	 lfiller.style.width=filrmaxwid;
	
    } 




function shrinkproject (tile) {
  
    
    tile.style.height=tiledime;
    tile.style.width=tiledime;
	tile.style.marginLeft=spacer;
    var pjname =document.getElementById('pjtype');
    var name=pjname.innerHTML;
	// as project is it block to remove animation jumps, but as small tile its back to inline-blocks
    //tile.style.display='iblock';
    tile.style.backgroundImage="url('img/"+ tile.id + ".png')";
	
    
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
	
	
     var midcon=document.getElementById("midcontainer");
	
	//set the width of the fillers
	filrmaxwid =((window.innerWidth - 291)/2)+'px';
	filrminwid=((window.innerWidth - 148)/2)+'px';
	lfiller.style.width=filrmaxwid;
	
    //title click handler
     hedbar.onclick=function(){
    
       
       alert (scylogger);
     
    }
    
	 
	// alert(midcon.offsetWidth);
    i=0;
	var freeSpace=midcon.offsetWidth/20;
	spacer =(freeSpace/6)+'px';
    tiledime=((midcon.offsetWidth-freeSpace-20)/5)+'px';
     
    
    do
    {
         
        //passing the id that had been set by php to the drwaproject function in order to fetch relevant data for each project    
        tiles[i].addEventListener("click", expandproject);
        
        //adding hover funtions from Jquery
       
        shades[i].onmouseover=hov;
        shades[i].onmouseout=out;
        tiles[i].style.backgroundImage="url('img/"+ tiles[i].id + ".png')";
        tiles[i].style.height=tiledime;
        tiles[i].style.width=tiledime;
        tiles[i].style.marginLeft=spacer;
		tiles[i].style.marginBottom=spacer;
        i++;
       
    }
    
    while (tiles);
 
    
}


	
window.onload= draw;


 