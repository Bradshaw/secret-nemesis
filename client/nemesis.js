var ctx;
var socket = io.connect('http://localhost');

socket.on('ping',function(){
  socket.emit('pong');
});
 
function init() {
  ctx = $('#canvas')[0].getContext("2d");
}


/**/ //Temp function for pretty things to look at
var t = 0;
var t2 = 0;
function drawSqu() {
  ctx.fillStyle="#222222";
  t+=0.01;
  t2=Math.sin(t)
  for (var i=0;i<80;i++) {
    ctx.fillRect(i*10,200+(Math.sin((i/10)+t))*50+(Math.sin((i/6)+t2))*50,10,10);  
  }
}
/**/

function draw() {
  ctx.fillStyle="#131313";
  ctx.fillRect(0,0,800,400);
  drawSqu();
}
 
init();
setInterval(draw,10);