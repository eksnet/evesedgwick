 var TiqiqElem = document.getElementById('TiqiqWidget');  if (TiqiqElem == null)  document.write('<div id="TiqiqWidget"></div>');  (function () {  var e = document.createElement('script');  e.src = 'http://dbs1.tiqiq.com/JScripts/TiqiqWidgetWatchdog.aspx?Run=' + escape(document.location.href);  e.async = true;   document.getElementById('TiqiqWidget').appendChild(e);  }()); 