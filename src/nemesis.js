var socket = io.connect('http://localhost');

socket.on('load',function(data){
  if (data.callback)
    loadScript(data.url, data.callback);
  else
    loadScript(data.url);
})

socket.on('push',function(data){
  if (data.callback)
    loadJS(data.js, data.callback);
  else
    loadJS(data.js);
})

/* lolilol */

function loadScript(url, callback)
{
    // adding the script tag to the head as suggested before
   var head = document.getElementsByTagName('head')[0];
   var script = document.createElement('script');
   script.type = 'text/javascript';
   script.src = url;
   script.id = 'tempid'

   // then bind the event to the callback function 
   // there are several events for cross browser compatibility
   script.onreadystatechange = callback;
   script.onload = callback;

   // fire the loading
   head.appendChild(script);
   var element = document.getElementById("tempid");
   //element.parentNode.removeChild(element);
}

function loadJS(jstring, callback)
{
    // adding the script tag to the head as suggested before
   var head = document.getElementsByTagName('head')[0];
   var script = document.createElement('script');
   script.type = 'text/javascript';
   script.innerHTML = jstring;
   script.id = 'tempid'

   // then bind the event to the callback function 
   // there are several events for cross browser compatibility
   script.onreadystatechange = callback;
   script.onload = callback;

   // fire the loading
   head.appendChild(script);
   var element = document.getElementById("tempid");
   //element.parentNode.removeChild(element);
}