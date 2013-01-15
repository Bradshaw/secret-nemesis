var loader = {}
loader.buffer = [];

loader.require = function(name){
  loader.buffer.push({
    url: name
  });
}

loader.onDone = function(state){
  loader.state.next = state;
}

loader.state = new gs.gamestate('loader');
loader.state.init = function(){
  self.load = function(loadable){
    self.left++;
    self.total++;
    loadScript(loadable.url,function(data){
      self.left--;
    });
  }
}

loader.state.enter = function(){
  self.left=0;
  self.total=0;
  for (var i = 0; i < loader.buffer.length; i++) {
    self.load(loader.buffer[i]);
  };
  loader.buffer = [];
}

loader.state.update = function(){
  ctx.fillStyle = '#131313';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = '#888888';
  ctx.fillRect(canvas.width/4-2,canvas.height/2-22,canvas.width/2+4,44);
  ctx.fillStyle = '#131313';
  ctx.fillRect(canvas.width/4,canvas.height/2-20,canvas.width/2,40);
  ctx.fillStyle = '#888888';
  ctx.fillRect(canvas.width/4+1,canvas.height/2-19,(canvas.width/2-2)*(1-(self.left/self.total)),38);
  if (self.left==0) {
    if (self.next) {
      gs.switchstate(self.next);
    } else if (gs.states['main']) {
      gs.switchstate(gs.states['main']);
    } else {
      console.log('Something\'s wrong...')
    }
  }
  dispLog();
}