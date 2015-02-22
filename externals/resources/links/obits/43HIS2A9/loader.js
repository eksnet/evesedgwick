/**
 * Copyright 2012-2013 Echo.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Version: 3.0.15 (2013-11-18 11:09:48 UTC)
 */

if (!window.Echo) window.Echo = {};Echo._yepnope = window.yepnope;if (!Echo.yepnope) {(function(e,t,n){function L(e){return!e||e=="loaded"||e=="complete"||e=="uninitialized"}function A(e,n,r,o,u,a){var l=t.createElement("script"),c,h;o=o||k.errorTimeout,l.src=e;for(h in r)l.setAttribute(h,r[h]);n=a?M:n||f,l.onreadystatechange=l.onload=function(){!c&&L(l.readyState)&&(c=1,n(),l.onload=l.onreadystatechange=null)},i(function(){c||(c=1,n(1))},o),S(),u?l.onload():s.parentNode.insertBefore(l,s)}function O(e,n,r,o,u,a){var l=t.createElement("link"),c,h;o=o||k.errorTimeout,n=a?M:n||f,l.href=e,l.rel="stylesheet",l.type="text/css";for(h in r)l.setAttribute(h,r[h]);u||(S(),s.parentNode.insertBefore(l,s),i(n,0))}function M(){var e=u.shift();a=1,e?e.t?i(function(){(e["t"]=="c"?k.injectCss:k.injectJs)(e.s,0,e.a,e.x,e.e,1)},0):(e(),M()):a=0}function _(e,n,r,o,f,l,p){function y(t){if(!v&&L(d.readyState)){g.r=v=1,!a&&M();if(t){e!="img"&&i(function(){h.removeChild(d)},50);for(var r in T[n])T[n].hasOwnProperty(r)&&T[n][r].onload();d.onload=d.onreadystatechange=null}}}p=p||k.errorTimeout;var d=t.createElement(e),v=0,m=0,g={t:r,s:n,e:f,a:l,x:p};T[n]===1&&(m=1,T[n]=[]),e=="object"?(d.data=n,d.setAttribute("type","text/css")):(d.src=n,d.type=e),d.width=d.height="0",d.onerror=d.onload=d.onreadystatechange=function(){y.call(this,m)},u.splice(o,0,g),e!="img"&&(m||T[n]===2?(S(),h.insertBefore(d,c?null:s),i(y,p)):T[n].push(d))}function D(e,t,n,r,i){return a=0,t=t||"j",w(e)?_(t=="c"?g:m,e,t,this.i++,n,r,i):(u.splice(this.i++,0,e),u.length==1&&M()),this}function P(){var e=k;return e.loader={load:D,i:0},e}var r=t.documentElement,i=e.setTimeout,s=t.getElementsByTagName("script")[0],o={}.toString,u=[],a=0,f=function(){},l="MozAppearance"in r.style,c=l&&!!t.createRange().compareNode,h=c?r:s.parentNode,p=e.opera&&o.call(e.opera)=="[object Opera]",d=!!t.attachEvent&&!p,v="webkitAppearance"in r.style&&!("async"in t.createElement("script")),m=l?"object":d||v?"script":"img",g=d?"script":v?"img":m,y=Array.isArray||function(e){return o.call(e)=="[object Array]"},b=function(e){return Object(e)===e},w=function(e){return typeof e=="string"},E=function(e){return o.call(e)=="[object Function]"},S=function(){if(!s||!s.parentNode)s=t.getElementsByTagName("script")[0]},x=[],T={},N={timeout:function(e,t){return t.length&&(e.timeout=t[0]),e}},C,k;k=function(e){function s(e){var t=e.split("!"),n=x.length,r=t.pop(),i=t.length,s={url:r,origUrl:r,prefixes:t},o,u,a;for(u=0;u<i;u++)a=t[u].split("="),o=N[a.shift()],o&&(s=o(s,a));for(u=0;u<n;u++)s=x[u](s);return s}function o(e){var t=e.split("?")[0];return t.substr(t.lastIndexOf(".")+1)}function u(e,t,r,i,u){var a=s(e),f=a.autoCallback,l=o(a.url);if(a.bypass)return;t&&(t=E(t)?t:t[e]||t[i]||t[e.split("/").pop().split("?")[0]]);if(a.instead)return a.instead(e,t,r,i,u);T[a.url]&&a.reexecute!==!0?a.noexec=!0:T[a.url]=1,e&&r.load(a.url,a.forceCSS||!a.forceJS&&"css"==o(a["url"])?"c":n,a.noexec,a.attrs,a.timeout),(E(t)||E(f))&&r.load(function(){P(),t&&t(a.origUrl,u,i),f&&f(a.origUrl,u,i),T[a.url]=2})}function a(e,t){function h(e,r){if(""!==e&&!e)!r&&a();else if(w(e))r||(s=function(){var e=[].slice.call(arguments);o.apply(this,e),a()}),u(e,s,t,0,n);else if(b(e)){l=function(){var t=0,n;for(n in e)e.hasOwnProperty(n)&&t++;return t}();for(c in e)e.hasOwnProperty(c)&&(!r&&!--l&&(E(s)?s=function(){var e=[].slice.call(arguments);o.apply(this,e),a()}:s[c]=function(e){return function(){var t=[].slice.call(arguments);e&&e.apply(this,t),a()}}(o[c])),u(e[c],s,t,c,n))}}var n=!!e.test,r=n?e.yep:e.nope,i=e.load||e.both,s=e.callback||f,o=s,a=e.complete||f,l,c;h(r,!!i||!!e.complete),i&&h(i),!i&&!!e.complete&&h("")}var t,r,i=this.yepnope.loader;if(w(e))u(e,0,i,0);else if(y(e))for(t=0;t<e.length;t++)r=e[t],w(r)?u(r,0,i,0):y(r)?k(r):b(r)&&a(r,i);else b(e)&&a(e,i)},k.addPrefix=function(e,t){N[e]=t},k.addFilter=function(e){x.push(e)},k.errorTimeout=1e4,t.readyState==null&&t.addEventListener&&(t.readyState="loading",t.addEventListener("DOMContentLoaded",C=function(){t.removeEventListener("DOMContentLoaded",C,0),t.readyState="complete"},0)),e.yepnope=P(),e.yepnope.executeStack=M,e.yepnope.injectJs=A,e.yepnope.injectCss=O})(this,document);Echo.yepnope = window.yepnope;Echo.yepnope.injectCss = undefined;window.yepnope = Echo._yepnope;delete Echo._yepnope;}
(function(yepnope) {if (!yepnope.injectCss) {(function(e,t,n){yepnope.injectCss=function(e,n,r,i,s,o){var u=document.createElement("link"),a=function(){c||(c=1,u.removeAttribute("id"),setTimeout(n,0))},f="yn"+ +(new Date),l,c,h;n=o?yepnope.executeStack:n||function(){},i=i||yepnope.errorTimeout,u.href=e,u.rel="stylesheet",u.type="text/css",u.id=f;for(h in r)u.setAttribute(h,r[h]);var p="webkitAppearance"in t.documentElement.style;if(!s){setTimeout(a,i),l=document.getElementsByTagName("base")[0]||document.getElementsByTagName("script")[0],l.parentNode.insertBefore(u,l),u.onload=a;function d(){try{if(c)return;var e=document.styleSheets;for(var t=0,n=e.length;t<n;t++)if(e[t].ownerNode.id==f)if(p||e[t].cssRules.length)return a();throw new Error}catch(r){setTimeout(d,20)}}d()}}})(this,this.document);}})(Echo.yepnope);
(function(){"use strict";window.Echo||(window.Echo={});if(Echo.Cookie)return;var e=/\+/g,t=function(t){return decodeURIComponent(t.replace(e," "))};Echo.Cookie={},Echo.Cookie.get=function(e){var n=document.cookie.split("; ");for(var r=0,i=n.length;r<i;r++){var s=n[r].split("=");if(t(s.shift())===e)return t(s.join("="))}},Echo.Cookie.set=function(e,t,n){n=n||{};if(typeof n.expires=="number"){var r=n.expires,i=n.expires=new Date;i.setTime(i.getTime()+r*86400*1e3)}document.cookie=[encodeURIComponent(e),"=",encodeURIComponent(t),n.expires?"; expires="+n.expires.toUTCString():"",n.path?"; path="+n.path:"",n.domain?"; domain="+n.domain:"",n.secure?"; secure":""].join("")},Echo.Cookie.remove=function(e,t){t=t||{},typeof Echo.Cookie.get(e)!="undefined"&&(t.expires=-1,Echo.Cookie.set(e,"",t))}})();
(function(){"use strict";function t(e){return window.addEventListener?e:"on"+e}function n(e,n){var r=window.addEventListener||window.attachEvent,i=window.removeEventListener||window.detachEvent;e==="subscribe"?(r(t("scroll"),n),r(t("resize"),n)):e==="unsubscribe"&&(i(t("scroll"),n),i(t("resize"),n))}window.Echo||(window.Echo={});if(Echo.Loader)return;var e=/^https?/.test(window.location.protocol)?window.location.protocol:"http:";Echo.Loader={version:"3.0.15",debug:!1,config:{cdnBaseURL:e+"//cdn.echoenabled.com/",storageURL:{prod:e+"//dqspik3j3bxvu.cloudfront.net/",dev:e+"//s3.amazonaws.com/echo-canvases/"},errorTimeout:5e3},canvases:[],canvasesConfigById:{},overrides:{},vars:{state:{resources:{},queue:[]},processing:!1,syncQueue:[]}},Echo.Loader.getURL=function(e,t){return typeof t=="undefined"&&(t=!0),/^https?:\/\/|^\/\//.test(e)?e:Echo.Loader.config.cdnBaseURL+"sdk/v"+Echo.Loader.version+(t&&Echo.Loader.isDebug()?"/dev":"")+(!e||e.charAt(0)==="/"?"":"/")+e},Echo.Loader.download=function(e,t,n){n=n||{},t=t||function(){};if(!e||!e.length){t();return}var r=Echo.Loader.vars.state,i=Echo.Loader.vars.syncQueue,s=function(){var e=[];r.queue=Echo.Loader._map(r.queue,function(t){if(Echo.Loader._areResourcesReady(t.resources)){e.push(t.callback);return}return t}),Echo.Loader._map(e,function(e){e()})},o=function(){!Echo.Loader.vars.processing&&i.length&&(Echo.Loader.vars.processing=!0,Echo.yepnope(i.shift()))};r.queue.push({resources:e,callback:t});var u=Echo.Loader._map(e,function(e){var t=Echo.Loader.getURL(e.url);if(!Echo.Loader._areResourcesReady([e])&&r.resources[t]!=="loading")return r.resources[t]="loading",t});if(!u.length){s();return}var a="timeout="+(n.errorTimeout||Echo.Loader.config.errorTimeout)+"!";i.push({load:Echo.Loader._map(u,function(e){return a+e}),complete:function(){Echo.Loader._map(u,function(e){r.resources[e]="ready"}),s(),Echo.Loader.vars.processing=!1,o()}}),o()},Echo.Loader.isDebug=function(){return Echo.Loader.debug},function(){if(Echo.Loader.debug)return;var e,t="echo-debug",n={path:"/"},r=window.location.hash.match(/echo.debug:(true|false)/);r&&r.length&&(e=r[1]);if(typeof e!="undefined"){e==="true"?(Echo.Loader.debug=!0,Echo.Cookie.set(t,!0,n)):(Echo.Loader.debug=!1,Echo.Cookie.remove(t,n));return}Echo.Loader.debug=!!Echo.Cookie.get(t)}(),Echo.Loader.initEnvironment=function(e){var t=[{url:"backplane.js",loaded:function(){return!!window.Backplane}},{url:"third-party/jquery.pack.js",loaded:function(){return!!Echo.jQuery}},{url:"environment.pack.js",loaded:function(){return!!Echo.Utils}}];if(Echo.Loader._areResourcesReady(t)){e&&e();return}Echo.Loader.download(t,e)},Echo.Loader.override=function(e,t,n){var r=Echo.Loader.overrides;r[e]=r[e]||{},r[e][t]=n},Echo.Loader.init=function(e){Echo.Loader._lookupCanvases(e,function(e){Echo.Loader._map(e,function(e){Echo.Loader._initCanvas(e,e.getAttribute("data-canvas-init"),{target:e,overrides:Echo.Loader.overrides[e.getAttribute("data-canvas-id")]||{}})})})},Echo.Loader.initApplication=function(e){if(e.config&&e.config.target){var t=e.config.target.length?e.config.target[0]:e.config.target;Echo.Loader._initCanvas(t,e.init,{target:e.config.target,useSecureAPI:!!e.config.useSecureAPI,data:{apps:[e],backplane:e.backplane}})}},Echo.Loader._lookupCanvases=function(e,t){e=e||{};var n=e.canvases,r=e.target?e.target.length?e.target[0]:e.target:document;n&&!n.length&&(n=[n]),n?t(n):r.querySelectorAll?t(r.querySelectorAll(".echo-canvas")):Echo.Loader.initEnvironment(function(){t(Echo.jQuery(".echo-canvas",r))})},Echo.Loader._initCanvas=function(e,t,r){(function i(s){t!=="when-visible"||Echo.Loader._isInViewport(e)?(s&&n("unsubscribe",i),Echo.Loader.initEnvironment(function(){Echo.Loader.canvases.push(new Echo.Canvas(r))})):s||n("subscribe",i)})()},Echo.Loader._storeCanvasConfig=function(e,t){Echo.Loader._map(Echo.Loader.canvases,function(n){var r=n._getIds();~r.unique.indexOf(e)&&(Echo.Loader.canvasesConfigById[r.unique]=t)})},Echo.Loader._isInViewport=function(e){var t=document.documentElement.clientHeight||document.body.clientHeight,n=document.documentElement.scrollTop||document.body.scrollTop;return n+t>=e.offsetTop},Echo.Loader._map=function(e,t){var n=[];if(e&&e.length&&t)for(var r=0;r<e.length;r++){var i=t(e[r],r);if(i===!1)break;typeof i!="undefined"&&n.push(i)}return n},Echo.Loader._areResourcesReady=function(e){var t=Echo.Loader.vars.state,n=Echo.Loader._map(e,function(e){var n=Echo.Loader.getURL(e.url);return e.loaded&&e.loaded()||t.resources[n]&&t.resources[n]==="ready"});return e.length===n.length}})();