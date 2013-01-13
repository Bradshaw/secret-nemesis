var loader = {}
loader.buffer = [];

loader.require = function(name){
  loader.buffer.push({
    url: name,
    func: function(data){
      eval(data);
    }
  });
}

loader.onDone = function(state){
  loader.state.next = state;
}

loader.state = new gs.gamestate('loader');
loader.state.init = function(){
  self.load = function(loadable){
     if (toType(loadable)==='array') {
      for (var i = 0; i < loadable.length; i++) {
        self.load(loadable[i]);
      };
     } else if (toType(loadable)==='object') {
      self.left++;
      self.total++;
      if (loadable.type === 'js') {
        need(loadable.url,function(data){
          eval(data);
          self.left--;
        });
      } else {
        need(loadable.url,function(data){
          loadable.func(data);
          self.left--;
        });
      }
    } 
  }
  console.log('Initialised loader state')
}

loader.state.enter = function(loadables){
  self.left=0;
  self.total=0;
  for (var i = 0; i < loadables.length; i++) {
    self.load(loadables[i]);
  };
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
      //gs.switchstate(self.next);
    } else if (gs.states['main']) {
      gs.switchstate(gs.states['main']);
    } else {
      console.log('Something\'s wrong...')
    }
  }
  dispLog();
}