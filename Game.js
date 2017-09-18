


window.onload = function() {
    	console.log("Hello world!");
        let canvas;
let canvasContext;
 
	canvas = document.getElementById('tennisCanvas');
	canvasContext = canvas.getContext('2d');

   let ballPositionX=50;
   let ballPositionY=100;

   let ballDeltaPostionX=5;
   let ballDeltaPostionY=6.8;

   let frameRate=45;
 
  let LeftPaddlePositionY=250;
  let RightPaddlePositionY=250;

let LeftPaddleHeight=90;
let RightPaddleHeight=90;

let LeftPlayerScore=0;
let RightPlayerScore=0;

let LeftPaddleWidth=15; 
let RightPaddleWidth=15;

let LeftPaddlePositionX=0 
let RightPaddlePositionX=canvas.width-RightPaddleWidth;

let winningScore=3;

let ballRadius=10;

///////////////////////////////////////////////////////////////////////////////////////// 


function calcMousePosition(evt){

    let rect=canvas.getBoundingClientRect();   // Boundries of canvas Area 
let root=document.documentElement   // to access the HTML code;
let mouseX=evt.clientX-rect.left-root.scrollLeft; //don't care about canvas position on page 
let mouseY=evt.clientY-rect.top-root.scrollTop; //don't care about canvas position on page 
// Only care about position of mouse position (x,y) relataive to canvas area 
return{
    x:mouseX,
    y:mouseY
};

}


function computerMovement(){
var RightPaddleYCenter=RightPaddlePositionY+RightPaddleHeight/2;
if(RightPaddleYCenter<ballPositionY-RightPaddleHeight/2){

RightPaddlePositionY+=6.5  

}
else if(RightPaddleYCenter>ballPositionY+RightPaddleHeight/2){

RightPaddlePositionY-=6.5

}
}



setInterval(drawEverything,1000/frameRate);

function drawEverything(){

drawContainer();
drawBall()
drawLeftPaddle();

drawRightPaddle();
computerMovement();
drawSeperators();

if(LeftPlayerScore<=winningScore && RightPlayerScore<=winningScore)
{canvasContext.fillText(LeftPlayerScore,100,100);
canvasContext.fillText(RightPlayerScore,canvas.width-100,100);

}
if(LeftPlayerScore==winningScore && RightPlayerScore<winningScore){
 canvasContext.fillText(LeftPlayerScore,100,100);
canvasContext.fillText(RightPlayerScore,canvas.width-100,100);
 canvasContext.fillText(" You Have Won !!!",canvas.width/2-35,100),2000;
  canvasContext.fillText("Press Ctrl + R for a New Game",canvas.width/2-65,250);
ballPositionX=canvas.width/2+5;
ballPositionY=canvas.height/2;
LeftPaddlePosition=RightPaddlePositionY=canas.height/2;

}
 if(RightPlayerScore==winningScore && LeftPlayerScore<winningScore){
     canvasContext.fillText(LeftPlayerScore,100,100);
canvasContext.fillText(RightPlayerScore,canvas.width-100,100);
 canvasContext.fillText("The Computer Won !!!",canvas.width/2-35,100),2000 ;
    canvasContext.fillText("Press Ctrl + R for a New Game",canvas.width/2-65,250);

ballPositionX=canvas.width/2+5;
ballPositionY=canvas.height/2
LeftPaddlePosition=RightPaddlePositionY=canas.height/2;

}
 


}  

////////////////////////////////////////////////////////////////////////////////////////



canvas.addEventListener('mousemove',function(evt){

var mousePosition=calcMousePosition(evt);
LeftPaddlePositionY=mousePosition.y-LeftPaddleHeight/2;

});


function ballReset(){

ballPositionX=canvas.width/2;
ballPositionY=canvas.height/2
ballDeltaPostionX*=-1
}


function drawContainer(){
	canvasContext.fillStyle = 'black';
	canvasContext.fillRect(0,0,canvas.width,canvas.height);
}
function drawLeftPaddle (){
    canvasContext.fillStyle="blue";
    canvasContext.fillRect(LeftPaddlePositionX,LeftPaddlePositionY,LeftPaddleWidth,LeftPaddleHeight);
}
function drawRightPaddle(){
     canvasContext.fillStyle="red";
    canvasContext.fillRect(RightPaddlePositionX,RightPaddlePositionY,RightPaddleWidth,RightPaddleHeight);
}


function drawSeperators(){  
let wl=5;
let dy=0;

for(let i=0;dy<canvas.height-10-wl*3;i++){
canvasContext.fillStyle="white";

 canvasContext.fillRect(0.5*canvas.width-wl/2,10+dy,wl,wl*3);
dy+=50;
}

}

function drawBall() {
//////////////////////////////////////////////////////////////////////////////    
if(ballPositionX>RightPaddlePositionX){  

if(ballPositionY>RightPaddlePositionY && ballPositionY<RightPaddlePositionY+RightPaddleHeight){

ballDeltaPostionX*=-1;
}

else{

ballReset();
++LeftPlayerScore;
}
}

//////////////////////////////////////////////////////////////////////////////

if(ballPositionY>=canvas.height-ballRadius){   

ballDeltaPostionY*=-1;

}

  ballPositionX+=ballDeltaPostionX;   //to change Ball position in x axis

  ballPositionY+=ballDeltaPostionY;   // to change Ball position in y axis

if(ballPositionX<LeftPaddlePositionX+ballRadius){

if(ballPositionY>LeftPaddlePositionY && ballPositionY<LeftPaddlePositionY+LeftPaddleHeight){

ballDeltaPostionX*=-1;
}

else{

ballReset();
++RightPlayerScore;

}
}

if(ballPositionY<ballRadius){

    ballDeltaPostionY*=-1;
}

 canvasContext.fillStyle="green";

 canvasContext.beginPath();

    canvasContext.arc(ballPositionX,ballPositionY,ballRadius,0,Math.PI*2,true);  //context.arc(x,y,r,sAngle,eAngle,counterclockwise);
  canvasContext.fill();
}





}


