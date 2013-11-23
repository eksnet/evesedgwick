/**

  Pressly redirect script

  The Purpose of this script is to detect device support and redirect valid
  devices to the Pressly application. Redirects from homepage will go straigt
  to the application. Deep linking is also available, a user entering your site
  from a google link to an article will be redirected to the same article within
  Pressly if it exists.

  Usage:

    Place the following script tag within the head of your site. It should be
    included on every page if you wish deep linking to work on that content.

    <script type="text/javascript" src="http://api.pressly.com/redirect.js?key=<your-api-key>"></script>

  Finding the article uid for deep-linking content

    When not on the site root this script will attempt to find the current article
    ID and redirect directly to the same article within your Pressly application.

    A custom block of code can be specified within the dashboard to help find this uid.
    It might look something like:

    // Get UID from last segment of url in the format of /<uid>--the-article-slug
    var uid = window.location.href.split("/").pop().split("-")[0];
    return typeof uid !== "undefined" && uid.length ? uid : false;

    Alternatively you may add a meta tag to your site containing the uid in your
    feed for each article like:

    <meta property="pressly:uid" content="1075206" />

    * Please note that you must put this meta tag in the document <head> BEFORE
      the redirect script.

**/

(function() {

var applicationUrl = "http://read.thestar.com/";

// Store referrer URL
var redirectUrl = applicationUrl + "?origref=" + encodeURIComponent(document.referrer);

// Store referrer URL
redirectUrl += "?origref=" + encodeURIComponent(document.referrer);

// Deeplinking can be enabled or disabled from the dashboard
var deeplinking = true;

// Debugging options
var forceRedirect = window.location.search.indexOf("pressly-force-redirect=true") >= 0;
var spoofUrl = /spoof-url=([^&]+)/.test(window.location.search) && RegExp.$1;

// Make sure Modernizr is locally scoped so it does not trumph previously included versions
var Modernizr;

// Modernizr is used for required feature detection
Modernizr=function(a,n,r){function z(e,b){for(var c in e){var a=e[c];if(!~(""+a).indexOf("-")&&g[a]!==r)return"pfx"==b?a:!0}return!1}function p(e,b,c){var a=e.charAt(0).toUpperCase()+e.slice(1),d=(e+" "+w.join(a+" ")+a).split(" ");if("string"===typeof b||"undefined"===typeof b)b=z(d,b);else{d=(e+" "+m.join(a+" ")+a).split(" ");a:{e=d;for(var f in e)if(a=b[e[f]],a!==r){b=!1===c?e[f]:"function"===typeof a?a.bind(c||b):a;break a}b=!1}}return b}var c={},f=n.documentElement,d=n.createElement("modernizr"),
g=d.style,C=" -webkit- -moz- -o- -ms- ".split(" "),w=["Webkit","Moz","O","ms"],m=["webkit","moz","o","ms"],d={},q=[],h=q.slice,k,l=function(e,b,a,c){var d,h,g,m,j=n.createElement("div"),l=n.body,k=l||n.createElement("body");if(parseInt(a,10))for(;a--;)g=n.createElement("div"),g.id=c?c[a]:"modernizr"+(a+1),j.appendChild(g);return d=['&#173;<style id="smodernizr">',e,"</style>"].join(""),j.id="modernizr",(l?j:k).innerHTML+=d,k.appendChild(j),l||(k.style.background="",k.style.overflow="hidden",m=f.style.overflow,
f.style.overflow="hidden",f.appendChild(k)),h=b(j,e),l?j.parentNode.removeChild(j):(k.parentNode.removeChild(k),f.style.overflow=m),!!h},s,v={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};s=function(e,b){b=b||n.createElement(v[e]||"div");e="on"+e;var a=e in b;return a||(b.setAttribute||(b=n.createElement("div")),b.setAttribute&&b.removeAttribute&&(b.setAttribute(e,""),a="function"===typeof b[e],"undefined"===typeof b[e]||(b[e]=r),b.removeAttribute(e))),
a};var j={}.hasOwnProperty,x;"undefined"!==typeof j&&"undefined"!==typeof j.call?x=function(e,a){return j.call(e,a)}:x=function(e,a){return a in e&&"undefined"===typeof e.constructor.prototype[a]};Function.prototype.bind||(Function.prototype.bind=function(a){var b=this;if("function"!=typeof b)throw new TypeError;var c=h.call(arguments,1),d=function(){if(this instanceof d){var f=function(){};f.prototype=b.prototype;var f=new f,g=b.apply(f,c.concat(h.call(arguments)));return Object(g)===g?g:f}return b.apply(a,
c.concat(h.call(arguments)))};return d});d.touch=function(){var e;return"ontouchstart"in a||a.DocumentTouch&&n instanceof DocumentTouch?e=!0:l(["@media (",C.join("touch-enabled),("),"modernizr){#modernizr{top:9px;position:absolute}}"].join(""),function(a){e=9===a.offsetTop}),e};d.postmessage=function(){return!!a.postMessage};d.hashchange=function(){return s("hashchange",a)&&(n.documentMode===r||7<n.documentMode)};d.csstransforms3d=function(){var a=!!p("perspective");return a&&"webkitPerspective"in
f.style&&l("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(c){a=9===c.offsetLeft&&3===c.offsetHeight}),a};d.csstransitions=function(){return p("transition")};d.localstorage=function(){try{return localStorage.setItem("modernizr","modernizr"),localStorage.removeItem("modernizr"),!0}catch(a){return!1}};for(var t in d)x(d,t)&&(k=t.toLowerCase(),c[k]=d[t](),q.push((c[k]?"":"no-")+k));c.addTest=function(a,b){if("object"==typeof a)for(var d in a)x(a,
d)&&c.addTest(d,a[d]);else{a=a.toLowerCase();if(c[a]!==r)return c;b="function"==typeof b?b():b;"undefined"!=typeof enableClasses&&enableClasses&&(f.className+=" "+(b?"":"no-")+a);c[a]=b}return c};g.cssText="";return d=null,c._version="2.6.2",c._prefixes=C,c._domPrefixes=m,c._cssomPrefixes=w,c.mq=function(c){var b=a.matchMedia||a.msMatchMedia;if(b)return b(c).matches;var d;return l("@media "+c+" { #modernizr { position: absolute; } }",function(c){d="absolute"==(a.getComputedStyle?getComputedStyle(c,
null):c.currentStyle).position}),d},c.hasEvent=s,c.testProp=function(a){return z([a])},c.testAllProps=p,c.testStyles=l,c}(this,this.document);
(function(){var a=window.navigator.userAgent,n=window.navigator.platform,r=window.navigator.vendor,z=["csstransforms","csstransitions","hashchange","postmessage"],p={white:[],grey:[],black:[{os:"Android",osVersion:/^2./},{os:"Android",osVersion:/^1./}]};window.Pressly=window.Pressly||{};Pressly.Device={details:void 0,detect:function(){var c=[];z.forEach(function(a){Modernizr.hasOwnProperty(a)&&(Modernizr[a]||c.push(a))});0<c.length&&console.log("Doesnt support the required feature(s): "+c.join(", "));
var f=void 0!==window.orientation||/Android/.test(a)||/MSIE.+Touch.+Tablet/.test(a)||/Windows Phone/.test(a),d=Modernizr.touch||!!navigator.msMaxTouchPoints,g=/iPad|iPhone|iPod/.test(n),p=/Intel\sMac\sOS\sX/.test(a)&&"MacIntel"===n,w=/Silk/.test(a),m=/Android/.test(a)||w,q=/BlackBerry/.test(n),h=/Windows\sPhone/.test(a),k=/Windows\sNT/.test(a),l=/Linux/.test(a),p=g?"iOS":p?"OS X":m?"Android":q?"BlackBerry":h?"Windows Phone":k?"Windows NT":l?"Linux":void 0,s,m={iOS:/OS\s([\d\._]+)\slike\sMac\sOS\sX/,
Android:/Android\s([\d\.]+);/,BlackBerry:/OS\s([\d\.]+);/,"OS X":/Intel\sMac\sOS\sX\s([\d\._]+)/,"Windows Phone OS":/Windows\sPhone\sOS\s([\d\._]+)/,"Windows NT":/Windows\sNT\s([\d\._]+)/};m.hasOwnProperty(p)&&(m=a.match(m[p]))&&2===m.length&&(s=m[1]);s&&(s=s.replace(/_/g,"."));var q=(m=/Apple\s?WebKit/.test(a))&&"Google Inc."===r&&/Chrome/.test(a),v=m&&"Apple Computer, Inc."===r&&(g||j),j=/Firefox/.test(a),h=/Opera/.test(a),k=/MSIE/.test(a),q=q?"Chrome":v?"Safari":j?"Firefox":h?"Opera":m?"WebKit":
k?"IE":void 0,x,h={Chrome:/Chrome\/([\d\.]+)/,Safari:/Version\/([\d\.]+)/,WebKit:/Version\/([\d\.]+)/,Firefox:/Firefox\/([\d\.]+)/,Opera:/Version\/([\d\.]+)/,IE:/MSIE\s([\d\.]+)/};h.hasOwnProperty(q)&&(h=a.match(h[q]))&&2===h.length&&(x=h[1]);h="devicePixelRatio"in window?window.devicePixelRatio:1;if(j||k)h=Math.max(screen.width/window.innerWidth,1);var k=1<h,l=screen.width,t=screen.height;g?(l=screen.width,t=screen.height):(l=Math.floor(screen.width/h),t=Math.floor(screen.height/h));w&&(h=2);var w=
window.innerWidth<window.innerHeight?"portrait":"landscape",j=l<t?l:t,e=f&&d&&360>=j,f=f&&d&&360<=j&&!e,j=!e&&!f,b=e?"smartphone":f?"tablet":"desktop",y=v&&!/Safari/.test(a),A=window.navigator.standalone,v=g&&y&&!A,y=g&&y&&A,E=(A=!y&&!v)?"browser":y?"homescreen":v?"native":void 0,u;if(!(u=j))if(!(u="WebkitOverflowScrolling"in window.document.documentElement.style)){var D=(u=a.match(/AppleWebKit\/([0-9]+)/))&&u[1],B=u&&534<=D;u=a.match(/Android ([0-9]+)/)&&3<=RegExp.$1&&B||a.match(/ Version\/([0-9]+)/)&&
0<=RegExp.$1&&window.blackberry&&B||-1<a.indexOf(/PlayBook/)&&0<=RegExp.$1&&B||a.match(/Fennec\/([0-9]+)/)&&4<=RegExp.$1||a.match(/wOSBrowser\/([0-9]+)/)&&233<=RegExp.$1&&B||a.match(/NokiaBrowser\/([0-9\.]+)/)&&7.3===parseFloat(RegExp.$1)&&u&&533<=D}return this.details=d={type:b,isDesktop:j,isSmartphone:e,isTablet:f,isBrowser:A,isHomescreen:y,isNativeShell:v,userAgent:a,platform:n,vendor:r,os:p,osVersion:s,browser:q,browserVersion:x,isIOS:g,isWebkit:m,appEnv:E,touchEnabled:d,highDensity:k,screenSize:l+
"x"+t,initialOrientation:w,overflowScroll:u?"native":"polyfill",requiredFeatures:0===c.length,pixelRatio:h,list:void 0}},addFilter:function(a,f){"gray"===a&&(a="grey");p.hasOwnProperty(a)&&p[a].push(f)},is:function(a){if(this.details){var f=0,d=0,g;for(g in a)a.hasOwnProperty(g)&&(d++,a[g].constructor===RegExp&&a[g].test(this.details[g])?f++:a[g]===this.details[g]&&f++);return f===d}},runFilters:function(){var a=this,f="black",d;for(d in p)p.hasOwnProperty(d)&&p[d].forEach(function(g){a.is(g)&&(f=
d)});return this.details.list=f},isTablet:function(){return this.is({type:"tablet"})},isPhone:function(){return this.is({type:"smartphone"})},isDesktop:function(){return this.is({type:"desktop"})},isSupported:function(){return this.isWhiteListed()},isWhiteListed:function(){return this.is({list:"white"})},isGreyListed:function(){return this.is({list:"grey"})},isBlackListed:function(){return this.is({list:"black"})},isBrowser:function(){return this.is({appEnv:"browser"})},isNativeShell:function(){return this.is({appEnv:"native"})},
isHomescreen:function(){return this.is({appEnv:"homescreen"})},isFullscreen:function(){return this.isNativeShell()||this.isHomescreen()},rendersNicely:function(){return this.is({requiredFeatures:!0,isWebkit:!0})||this.is({requiredFeatures:!0,browser:"Firefox"})}}})();


function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');

  for (var i = 0, ii = ca.length; i < ii; i++) {
    var c = ca[i];

    while (c.charAt(0) === " ") {
      c = c.substring(1, c.length);
    }

    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }

  return null;
}

function createCookie(name, value, days) {
  var expires;

  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toGMTString();
  } else {
    expires = "";
  }

  document.cookie = name + "=" + value + expires + "; path=/";
}

// Optional meta tags. We look for them in this order:
// <meta property="pressly:on-site-homepage" content="true" />
// <meta property="pressly:section-title" content="Latest News" />
// <meta property="pressly:uid" content="7e8094db-dc11-4dc8-91ae-a0a49ae1fe97" />

function onUserDefinedRoot() {
  // (Optional) Meta tag -- allows the user to specify that the current page is
  // the homepage for their site, so we can redirect them to the root URL in Pressly.

  // <meta property="pressly:on-site-homepage" content="true" />
  // content must be "true".

  var meta = document.querySelector("meta[property='pressly:on-site-homepage']");
  if (meta) {
    return (meta.getAttribute("content").toLowerCase() === "true");
  } else {
    return false;
  }
}

function findSectionTitle() {
  // (Optional) Meta tag -- allows the user to specify that the current page is a section.

  // <meta property="pressly:section-title" content="Latest News" />
  // content is the exact section title as it appears in Pressly.

  var meta = document.querySelector("meta[property='pressly:section-title']");
  if (meta) {
    return meta.getAttribute("content")
  } else {
    return false;
  }
}

function findUid() {
  // (Optional) Meta tag -- First detect if a the pressly:uid meta tag was supplied
  // before running any custom code block. This is the best way of deep linking to content.

  // <meta property="pressly:uid" content="7e8094db-dc11-4dc8-91ae-a0a49ae1fe97" />
  // content is the guid of the article from their feed.

  var meta = document.querySelector("meta[property='pressly:uid']");
  if (meta) {
    return meta.getAttribute("content");
  }

  // (Optional) Custom code-block -- This can be configured in the dashboard to help
  // parse url or DOM for uid.
  

  // If no meta tag or custom uid helper was supplied default to find article by the
  // current article URL. This may fail if the article URL supplied in the feed is
  // different than the current article URL visitors see when visiting your site.
  return false;
}

function canonicalUrl() {
  var link = document.querySelector("link[rel='canonical']");
  return link ? link.getAttribute("href") : false;
}

// Device filters
Pressly.Device.addFilter("white", { type: "tablet", requiredFeatures: true, isDesktop: false });
Pressly.Device.addFilter("black", { type: "smartphone", os: "BlackBerry" });
Pressly.Device.addFilter("black", { "os": "BlackBerry" }); Pressly.Device.addFilter("black", { "os": /Windows/ }); 

Pressly.articleLookupCallback = function(content) {
  if (content.exists) {
    window.location = redirectUrl + "#!/article/" + content.id;
  }
};

Pressly.sectionLookupCallback = function(section) {
  if (section.uid) {
    window.location = redirectUrl + "#!/section/" + section.uid;
  }
}

Pressly.redirect = function() {
  // Users reaching the site from the Pressly application by clicking on the
  // 'View Desktop Version' link will have fullsite=true param set. Set a cookie
  // we can check to prevent them from being redirected back to the Pressly
  // application. (Cookie expiry is 1 day)
  if (window.location.search.substr(1).indexOf('fullsite=true') !== -1) {
    createCookie("pressly-view-full-site", "true", 1);
    return;
  } else if (readCookie("pressly-view-full-site") === "true") {
    return;
  }

  // Detect device
  Pressly.Device.detect();

  // Run device filters
  Pressly.Device.runFilters();

  if (Pressly.Device.isSupported() || forceRedirect) {
    var rootUrl = "www.thestar.com";

    // Adjust the rootUrl if the rootUrl includes www but the location does not and no other subdomain is given
    if (rootUrl.indexOf("www.") === 0 && window.location.host.indexOf("www.") !== 0 && rootUrl.split('www.')[1] === window.location.host) {
      rootUrl = rootUrl.split("www.")[1];
    }

    var currentUrl = decodeURIComponent(spoofUrl || canonicalUrl() || (window.location.host + window.location.pathname));
    var path = window.location.href.split(rootUrl)[1];
    var atRoot = typeof path !== "undefined" && (path === "" || path === "/" || /\/index\./.test(path)) || onUserDefinedRoot();
    var sectionTitle = findSectionTitle();

    // Handle deep linked content or simply redirect to the Pressly application root
    if (atRoot) {
      // Goto the site directly
      window.location = redirectUrl;
    } else if (sectionTitle) {
      var jsonp = document.createElement("script");

      jsonp.setAttribute("type", "text/javascript");
      jsonp.setAttribute("src", applicationUrl + "content/?section_lookup=" + encodeURIComponent(sectionTitle) + "&callback=Pressly.sectionLookupCallback");

      document.head.appendChild(jsonp);
    } else if (deeplinking) {
      var uid = findUid();
      var jsonp = document.createElement("script");

      jsonp.setAttribute("type", "text/javascript");
      jsonp.setAttribute("src", applicationUrl + "content/?lookup=" + encodeURIComponent(uid || currentUrl) + "&callback=Pressly.articleLookupCallback");

      // Execute the JSONP request
      document.head.appendChild(jsonp);
    }
  }
};

}());

Pressly.redirect();
