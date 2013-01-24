mime = require('mime')
  , app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs');


/**/
repl = require('repl');
rep = repl.start({
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
/**/


io.set('log level',1)

app.listen(1986);

function handler (req, res) {
  var filename = req.url;
  if (filename === '/') {
    filename = '/index.html';
  }
  fs.readFile(__dirname + filename,
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Mistakes were made...');
    }
    res.writeHead(200, {'Content-Type': mime.lookup(filename)});
    res.end(data);
  });
}



function clock(){
  return (new Date()).getMilliseconds();
}

io.sockets.on('connection', function (socket) {

  socket.emit('load',{url: 'nemeload.js', callback: function(){ console.log("called"); }});

  /*
  setTimeout(function(){
    socket.emit('push',{js: 'console.log("works?");'});
  }
  ,5000);
  */

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
    });
  });

  socket.on('zap',function(data){
    socket.emit('zap',data)
  })
});
