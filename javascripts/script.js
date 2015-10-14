var tiles;
var openproject;
var currentitem;
var currentproject;
var nofitems;
var tiledime;
var scroled=false;
var minimized=false;


function hov (evt) {
    
$(document).ready(function() {
    
   
 // var i=0;
                      // alert(gag.target);
   // var tim=setInterval(function(){
    
    //i++;
    //if 
    //}, 100);
                       $(evt.target).animate ( {
                           
                           
                           opacity:'1'

                      } , 300 );
   

   
});

}



function out (evt) {
    
$(document).ready(function() {
    
   

                      // alert(gag.target);
    
    
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
       
        //checking wether scroll postion of window is different from position of element math.abs absolute value
          var diff = Math.abs (eltop-winpos);
        //if scroll position difference is smaller thant 3 pixels it will not scroll this prevents extra scroll commands when an element is in position
        if (diff < 3)
        {
            return;
        }
        else
        {
        
        $("body").animate ({

           scrollTop: eltop
           

            }, 1000, function(){
        
            //Item in proper scroll
        scroled=true;
        });
            
             
    
        }
    
    });




}



window.onscroll=function() {

    scy=this.scrollY;
    
    if (scy==0){   
    maximize();
        if (openproject)
    shrinkproject(openproject);  
    
    } 
    
    
    
    //item out of proper scroll
    scroled=false;
    
    
    
 }  

window.onkeyup= function(event){

if (event.keyCode==37){
slide('left');
}

if (event.keyCode==39){
slide('right');
}

}


    
function expandproject() {
    
    
     minimize();
    
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
    currentproject.style.display='block';
    currentproject.style.margin='0px';
    currentproject.style.marginBottom='5px';
    
    
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
         
         
         
         
         
         
         
        $(document).ready(function() {


            //this part makes the screen scroll to a specific element, I know too cool. OffsetTop did not work tho. -70 is because we have a                  fixed         banner and we want element to scroll below it and not in the top of the window.
            projtop= ($(idd).offset().top) - 60


           $(idd).animate({

               //animate to the width of the window
            width: wid+'px'

            } , 100, function(){
               
               // hegiht of all project calcualted from height of inside elements 
                    var hgh2 =$('#desc').height()+$('#art').height()+300;
               

                    $(idd).animate({
                            //height of project is animted open
                            height:hgh2

                            }, 1000 , function() {

                                            //this is when animation ends and mostlikely project load ends as well.
                                            openproject = currentproject;

                                            });

           });

            scrlto (idd);


        });
         
         
      
     }
    
       
    }
    
    //is should be sent outside the onreadystate 
    // In here we also send the id of the project to retrive from the database 
    httpreq.open ("GET", "controller.php?id="+ currentproject.id , true);
    httpreq.send();
  
   
    //Jquery animation
    
   
    
    // headbar shrinks
    
    
    
   
    //and replace the old one with new one  should be the last thing to happen to avoid errors  however it changes before animations are ov 
       
 
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
    
  /*  
    var slide =new XMLHttpRequest();
    
     slide.onreadystatechange = function() {
        
         if (slide.readyState==4 && slide.status==200){
          document.getElementById('art').innerHTML=slide.responseText; 

         }
         
     }
     
      slide.open ("GET", "slide.php?id="+ currentproject.id+"&itemnr="+currentitem , true);
      slide.send();
      */
    var art= document.getElementById('art');
    
    //when slided it scroles to the art
    if (minimized==false)
        minimize();
    
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




function minimize () {

    $(document).ready(function(){
               
           /* $("#hbfshadow").animate({
             height:'3px',   
            }); */

            $("#logo").animate({
            height:'56px',
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

    $(document).ready(function(){
       
            $("#logo").css({    
                'backgroundImage':"url('img/loga.fw.png')"
            });


           /* $("#hbfshadow").animate({
             height:'6px',    
            });   */

            $("#logo").animate({
            height:'112px',
            width: '291px'
            }, 500 );

            $("#hbfiller").animate({
            height: '104px',

            }, 500, function(){
            
            
            minimized=false;
            
            });
        
        });
    
    } 




function shrinkproject (proj) {
  
    
    proj.style.height=tiledime;
    proj.style.width=tiledime;
    proj.style.margin='3px';
    var pjname =document.getElementById('pjtype');
    var name=pjname.innerHTML;
// as project is it block to remove animation jumps, but as small tile its back to inline-blocks
    proj.style.display='inline-block';
    proj.style.backgroundImage="url('img/"+ proj.id + ".png')";
    
    
    
    //replacing the shade 
    var shad=document.createElement('div');
    shad.className='tileshade';
    shad.innerHTML=name;
    shad.onmouseover=hov;
    shad.onmouseout=out;
    proj.innerHTML="";
    //proj.innerHTML="<div class='tileshade'>"+name+"</div>";
    proj.appendChild(shad);
    openproject=null;
}

	
function bganimate() {

var ba=setInterval(function(){
    //between 1 ans 1000
    var x=((Math.random())*700)+((Math.random())*(-500));
    //between -200 and -400
    var y=((Math.random())*200)-400;
    //var bg=
    var bod=document.body;
   //bod.style.backgroundColor='red';
   bod.style.backgroundPositionX=x+"px";
    bod.style.backgroundPositionY=y+"px";
    //bod.style.backgroundSize=y+"%";

}, 1000);
   

}


function draw() {
    
    //alert("here");
   //  bganimate(); 
  
    
    //this one works, tiles are added to an array
    tiles=document.getElementsByClassName('tile');
    shades=document.getElementsByClassName('tileshade');
    
    i=0;
    tiledime=((window.innerWidth/5)-18)+'px';
     
    
    do
    {
         
        //passing the id that had been set by php to the drwaproject function in order to fetch relevant data for each project    
        tiles[i].addEventListener("click", expandproject);
        
        //adding hover funtions from Jquery
       
       
       //alert(shades[i].className);
        shades[i].onmouseover=hov;
        shades[i].onmouseout=out;
        tiles[i].style.backgroundImage="url('img/"+ tiles[i].id + ".png')";
        tiles[i].style.height=tiledime;
        tiles[i].style.width=tiledime;
        i++;
       
    }
    
    while (tiles)
    
   alert("here");
    
    /* $(document).ready(function(){
            
        $(shades[i]).mouseenter(function(){
            
        $(shades[i]).animate ( {
                           opacity:'1'

                      } , 300 );
            
        
        });
        
        }); */
    
    //scroll to the top
  
    
}


	
window.onload= draw;


 