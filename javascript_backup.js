var tiles;
var openproject;
var currentitem;
var currentproject;
var nofitems;
var tiledime;
var spacer;
var scroled=false;
var minimized=false;
//holds scroll position of the window
var scy;
var scylogger;
//timer for the scroll
var scrltimer;


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
    var winpos=window.pageYOffset;
    
    // alert ("this is element top postion" + elem.offsetTop);
    $(document).ready( function(){
    
    //y offset of the element minus 55 pixels
    var eltop= ($(elem).offset().top) - 55;
         
		
   
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
    slide('left');
    }

    if (event.keyCode==39){
    slide('right');
    }

    
}


    
function expandproject() {
    
    
     minimize();
	
	 //  $(document).ready(function(){
               

           // $("#logo").animate({
           // height:'53px',
          //  width: '148px'
          //  }, 1000 , function() {

        //        $(hedbar).css({

                    //'backgroundImage':"url('img/logas.fw.png')",
					//'height':'53px',
					//'width': '148px'
         //       });
               

          //  });
        
          /*  $("#hbfiller").animate({
            height: '53px'
            }, 1000); */
  
     //   });
    
    //needed variables for this function
    
    var container = document.getElementById('midcontainer');
    var wid = container.offsetWidth;
        currentproject=this;
    var idd= "#"+ currentproject.id;
    var projtop;
    var pjplate;
    
     //to close previous open projects
    
    if (openproject==currentproject)
        return;
    
    if (openproject) {
        shrinkproject(openproject);   
    }
    
    currentproject.style.backgroundImage='none';
	
	//this line is vital because the div needs to go to the new line and determine its new location on Y axis of the page to it is later prperly scorlled.
	currentproject.style.width=wid+'px';
    currentproject.style.marginLeft='0px';
   
    
    
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
         var artbg=document.createElement('div');
         artbg.id='artbg';
         
         //setting the height of the background
           var ah=(window.innerHeight - 50) +'px';
         artbg.style.height=ah;
         
         //creating the artwork holder
         var art=document.createElement('div');
         art.id='art';
         
         //left button
         var left=document.createElement('div');
         left.id ='left';
          
         //right button
          var right=document.createElement('div');
         right.id='right';
         
         //adding handeler for the click of the left and right
        left.onclick=function(){
        slide ('left')
        };
        right.onclick=function(){
        slide ('right')
        };
         
         //adding hover and leave effects
         right.addEventListener( "mouseover" , hov );
         left.addEventListener( "mouseover" , hov  );
         left.onmouseout = out;
         right.onmouseout = out;
         
         
         //if clicked on the artwork screen is scrolled to the picture
         art.onclick=function(){
                    
                 scrlto(this);
         
         };
      
            //left.onmouseout = hov();
        
        
       
         
       
         
         //to the first picture
         currentitem =1;
         //setting the first picture
         art.style.backgroundImage="url('Projects_Gallery/"+ currentproject.id +"/"+currentitem+ ".png')";
         
         
        //appending created elements to the page
         pj.appendChild(artbg);
         artbg.appendChild(art); 
         artbg.appendChild(left);
         artbg.appendChild(right);
        //JQuery
         
         
         
         
         
        //JUQUERY BLOCK 
         
        $(document).ready(function() {


            //this part makes the screen scroll to a specific element, I know too cool. OffsetTop did not work tho. -70 is because we have a                  fixed         banner and we want element to scroll below it and not in the top of the window.
            projtop= ($(idd).offset().top) - 60


         
               
               // hegiht of all project calcualted from height of inside elements 
                    var hgh2 =$('#desc').height()+$('#art').height()+300;
               

                    $(idd).animate({
                            //height of project is animted open
                            height:hgh2

                            }, 1000 , function() {

                                            //this is when animation ends and mostlikely project load ends as well.
                                            openproject = currentproject;

                      });

        

           scrlto (idd);
			

        }); //END OF JQUERY BLOCK
         
         
      
     }
    
       
    }
    
    //is should be sent outside the onreadystate 
    // In here we also send the id of the project to retrive from the database 
    httpreq.open ("GET", "controller.php?id="+ currentproject.id , true);
    httpreq.send();
  
   
 
}
	



function slide(direc) {
    
    //if no project is open this function will not be processed
    if(!openproject)
    return;
    
    
    if (direc=='left')
    {
        //go backwards in the list of arts
        currentitem--;
        
        //if clicked left when the 1st art is showing it starts all over from the end
        if(currentitem==0)
        currentitem=nofitems;
                
    }
    
    if (direc=='right')
    {
        
        currentitem++;
        //if the last art is showing it starts from the begining 
        if(currentitem>nofitems)
        currentitem=1;
    }
    
 
    var art= document.getElementById('art');
    
    //when slided it scroles to the art
   // if (minimized==false)
   //     minimize();
    
    //if not properly scrolled then scroll first
    
    scrlto (art);
	
    $(document).ready(function(){
    
		$(art).animate({

		//current art fades away
		opacity:0

		}, 500, function(){

			//art is changed and opacity is recovered
		art.style.backgroundImage="url('Projects_Gallery/"+ currentproject.id +"/"+currentitem+".png')";
		art.style.opacity='1';

		});
 
    });
    
    
    //alert(currentitem);
    
    
}


function maximize () {
	
	/* minimized=false;
	 hedbar.style.height='104px';
	 logo.style.width='291px'
	 logo.style.backgroundImage="url('img/loga.fw.png')";
	 lfiller.style.width=filrmaxwid;
	 */
	
	   $(document).ready(function(){
               
           $(logo).css({
                    'backgroundImage':"url('img/logo.png')"
                });

            $(logo).animate({
				
            	width: logomaxwidth+'px'
				
            }, mmspeed , function() {

                minimized=false;
				 $(logo).css({
                    'backgroundImage':"url('img/logo.png')"
                });

            });
        
            $(hedbar).animate({
            height: hbmaxheight+'px'
            }, mmspeed);
		   
		    $(lfiller).animate({
            width: filrmaxwid+'px'
            }, mmspeed);
  
        });
	
	
	
	
	
    } 



function minimize () {
	
	/* minimized=true;
	 hedbar.style.height='53px';
	 logo.style.width='148px'
	 logo.style.backgroundImage="url('img/logas.fw.png')";
	 lfiller.style.width=filrminwid; */
	
	 $(document).ready(function(){
               
           

            $(logo).animate({
				
           width: logominwidth+'px'
				
            }, mmspeed , function() {

                $(logo).css({

                   'backgroundImage':"url('img/logas.fw.png')"
                });
                minimized=true;

            });
        
            $(hedbar).animate({
            height: hbminheight+'px'
            }, mmspeed);
		   
		    $(lfiller).animate({
            width: filrminwid+'px'
            }, mmspeed);
  
        });
	
	

    } 

//the problem is when minimize is running maximise starts executing 
function minimize () {

    $(document).ready(function(){
               
           

            $("#logo").animate({
            height:'53px',
            width: '148px'
            }, 1000 , function() {

                $("#logo").css({

                    'backgroundImage':"url('img/logas.fw.png')"
                });
                minimized=true;

            });
        
            $("#hbfiller").animate({
            height: '53px'
            }, 1000);
  
        });
    } 




function maximize () {
	
	
	
   // $(document).ready(function(){
       //the problem is this step executes before last step of minimize which changes the background back to small
		
         //   $(hedbar).css({    
                //'backgroundImage':"url('img/loga.fw.png')",
		//		'height':"104px",
            	//'width': "291px"
          //  });
		//	minimized=false;


           // $("#logo").animate({
           // height:'104px',
           // width: '291px'
          //  }, 500 , function(){
            //doing it again so the background changes back to lagre despite the interference of the minimize method 
          //  $("#logo").css({    
            //   'backgroundImage':"url('img/loga.fw.png')"
           // });

           // } );

          /*  $("#hbfiller").animate({
            height: '104px',

            }, 500, function(){
            
            
            
            
            }); */
        
    //    });

    $(document).ready(function(){
       //the problem is this step executes before last step of minimize which changes the background back to small
            $("#logo").css({    
                'backgroundImage':"url('img/loga.fw.png')"
            });


            $("#logo").animate({
            height:'104px',
            width: '291px'
            }, 500 , function(){
            //doing it again so the background changes back to lagre despite the interference of the minimize method 
            $("#logo").css({    
                'backgroundImage':"url('img/loga.fw.png')"
            });

            } );

            $("#hbfiller").animate({
            height: '104px',

            }, 500, function(){
            
            
            minimized=false;
            
            });
        
        });
    
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
    var title=document.getElementById("hb");
     var midcon=document.getElementById("midcontainer");
    
    //title click handler
     title.onclick=function(){
    
       
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


 