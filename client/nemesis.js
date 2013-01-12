var x = 150;
var y = 150;
var sx = 150;
var sy = 150;
var ctx;
var socket = io.connect('http://localhost');

socket.on('move',function(data){
  sx = data.x;
  sy = data.y;
});
socket.on('rect',function(data){
  r2 = data;
});
socket.on('ping',function(){
  socket.emit('pong');
});

socket.on('currentPing', function(data){
  document.getElementById('ping').innerHTML ='<a href="server.js">Da servor!</a>  Ping: '+data.ping+'ms';
});
 
function init() {
  ctx = $('#canvas')[0].getContext("2d");
}

jQuery(document).ready(function(){
   $(document).mousemove(function(e){
    if (tracking) {
      r.x2 = x;
      r.y2 = y;
    }
    x = e.pageX-$('#canvas').offset().left;
    y = e.pageY-$('#canvas').offset().top;
   });
  $(document).click(function(e){
    x = e.pageX-$('#canvas').offset().left;
    y = e.pageY-$('#canvas').offset().top;
    socket.emit('click', { x: x, y: y});
    tracking = false;
   });
  $(document).mousedown(function(e){
    track = setTimeout(function(){
      track = false;
      tracking = true;
    },150);
    r.x1 = x;
    r.y1 = y;
    r.x2 = x;
    r.y2 = y;
    x = e.pageX-$('#canvas').offset().left;
    y = e.pageY-$('#canvas').offset().top;
    socket.emit('mousedown', { x: x, y: y});
   });
  $(document).mouseup(function(e){
    x = e.pageX-$('#canvas').offset().left;
    y = e.pageY-$('#canvas').offset().top;
    socket.emit('mouseup', { x: x, y: y});
    tracking = false;
    if (track) {
      clearTimeout(track);
      track = false;
      socket.emit('realclick', { x: r.x1, y: r.y1});
    } else {
      r.x2 = x;
      r.y2 = y;
      socket.emit('selectybox', r);
    }
   });
})

var track = false;
var tracking = false;

var r = {x1: 10, x2: 20, y1: 10, y2: 20};
var r2 = {x1: 10, x2: 20, y1: 10, y2: 20};

function draw() {
  ctx.fillStyle="#131313";
  ctx.fillRect(0,0,800,400);
  ctx.fillStyle="#222222";
  ctx.fillRect(r.x1,r.y1,r.x2-r.x1,r.y2-r.y1);
  ctx.fillStyle="#444444";
  ctx.fillRect(r2.x1,r2.y1,r2.x2-r2.x1,r2.y2-r2.y1);
  ctx.fillStyle="#DDDDDD";
  ctx.fillRect(sx-3,sy-3,6,6);
  ctx.closePath();
  ctx.fill();
}
 
init();
setInterval(draw,10);