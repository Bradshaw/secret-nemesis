app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs');

var repl = require('repl');

say = function(s){
  console.log('Saying "'+s+'"');
}

var rep = repl.start({
  prompt: "server> ",
  input: process.stdin,
  output: process.stdout,
  useGlobal: true,
  ignoreUndefined: true
});

rep.on('exit', function () {
  console.log('Got "exit" event from repl!');
  process.exit();
});

io.set('log level',1)

app.listen(1986);

function handler (req, res) {
  var filename = req.url;
  if (filename === '/') {
    filename = '/index.html';
  }
  fs.readFile(__dirname + '/../client' + filename,
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end(__dirname+ ' ' +filename);
    }

    res.writeHead(200);
    res.end(data);
  });
}
function clock(){
  return (new Date()).getMilliseconds();
}

io.sockets.on('connection', function (socket) {
  socket.set('pos', {x: 150, y:150});
  socket.set('rect', {x1: 10, y1:10, x2: 20, y2:20});

  // Update loop
  setInterval(function(){
    // Get the current position
    socket.get('pos', function (err, data) {
      // And send it to the client
      socket.emit('move', data);
    });
    socket.get('rect', function (err, data) {
      // And send it to the client
      socket.emit('rect', data);
    });
  },50);

  /* Ping testing */
  // Every second
  setInterval(function(){
    // Request a response
    socket.emit('ping');
    // And start the clock
    socket.set('pingstart', clock());
  },1000);
  // When we get a response
  socket.on('pong',function(){
    // Check the clock
    socket.get('pingstart', function (err, data) {
      // Set the new ping to new time
      socket.set('ping',clock()-data);
      // Inform the client of his current ping
      socket.get('ping', function (err, data) {
        socket.emit('currentPing', {ping: data});
      });
    });
  });


  socket.on('click', function (data) {
    // Update our memory of it
  });

  socket.on('realclick', function (data) {
    // Update our memory of it
    socket.set('pos', {x: data.x, y:data.y});
  });

  // When the client informs us of his new position
  socket.on('mousedown', function (data) {
    // Update our memory of it
  });
  
  socket.on('mouseup', function (data) {
    // Update our memory of it
  });


  socket.on('selectybox', function (data) {
    socket.set('rect', data);
  });




});