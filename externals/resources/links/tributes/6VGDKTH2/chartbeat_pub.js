(function(){var g=void 0,h=true,k=null,l=false,m,n=this;function aa(a){var b=o;function c(){}c.prototype=b.prototype;a.I=b.prototype;a.prototype=new c;a.prototype.constructor=a};function p(){if(q!==g)return q;try{var a=n.localStorage;if(a.removeItem)return q=a}catch(b){}return q=k}var q;function r(){var a="",b,c;for(c=0;c<16;c++)b=Math.floor(Math.random()*36).toString(36),a+=b;return a}
function s(a){var b=k;if(a){for(var b=k,a=document.getElementsByTagName("link"),c=0;c<a.length;++c)if(a[c].rel=="canonical")b=a[c].href,b=b.substring(b.indexOf("/",9));if(b)return b}c=n.location;b=c.pathname+(c.search||"");b=b.replace(/PHPSESSID=[^&]+/,"");a=/&utm_[^=]+=[^&]+/ig;(c=a.exec(c.search))&&(b=b.replace(a,""));a=/\?utm_[^=]+=[^&]+(.*)/i;(c=a.exec(b))&&(b=b.replace(a,c[1]!=""?"?"+c[1]:""));return b}function w(a,b){return function(){a.apply(b,arguments)}}
function x(a){return a.replace(/^www\./,"")}function y(a,b,c){a.addEventListener?a.addEventListener(b,c,l):a.attachEvent&&a.attachEvent("on"+b,c)}function z(a){return typeof a=="number"}function A(a){a=new Date(+a);return Date.UTC(a.getFullYear(),a.getMonth(),a.getDate())}function D(){return(new Date).getTime()}function E(a){return encodeURIComponent(a)}
function F(a,b){if((!!a&&a.constructor===Object)===h)for(var c in a){if(a.hasOwnProperty(c)&&b(c,a[c])===l)break}else{c=a.length;for(var d=0;d<c;d++)if(b(d,a[d])===l)break}}function ba(a){(!!a&&a.constructor===Object)===h&&(a="");var b={};F(a.split("&"),function(a,d){var e=d.split("::");e.length===2&&(b[decodeURIComponent(e[0])]=decodeURIComponent(e[1]))});return b};function G(){this.p=[];this.N=l;this.M=this.o=k;this.z=[];H(this,n,"onscroll");H(this,document.body,"onkeydown");H(this,document.body,"onmousemove");this.c()}G.prototype.c=function(){this.t={};this.f=0;ca(this);this.t.onmousemove=D()};function ca(a){a.U&&clearInterval(a.U);a.Z();a.U=setInterval(w(a.Z,a),1E3)}function I(a){for(var b=0;b<a.z.length;b++)if(da(a,a.z[b],5E3))return h;return l}
function H(a,b,c){var d=b[c]||function(){};a.z.push(c);b[c]=function(b){d.apply(this,arguments);if(b&&c=="onkeydown"){var f=b.keyCode?b.keyCode:b.which;if(f==32||f>36&&f<41){a.t.onscroll=D();return}}a.t[c]=D();if(a.N)a.o===k&&a.T(),n.clearTimeout(a.M),a.M=n.setTimeout(w(a.T,a),500)}}G.prototype.T=function(){var a=this;this.o=n.setTimeout(function(){n.clearTimeout(a.o);a.o=k},500);for(var b=0,c=this.p.length;b<c;b++)if(typeof this.p[b]==="function")this.p[b]()};
function da(a,b,c){a=a.t[b];if(a===g)return l;a=D()-a;return a<=(c||15E3)&&a>=0}G.prototype.Z=function(){I(this)&&this.f++};var ea=/[?&]__cb_debug=/i;function fa(){};function J(a,b,c){b=b||"*";c=c||document;if(typeof c.querySelectorAll==="function")return c.querySelectorAll(b+"["+a+"]");for(var d=[],b=c.getElementsByTagName(b),c=b.length;c--;)b[c].getAttribute(a)&&d.push(b[c]);return d}function K(a){var b=a.offsetHeight,c=a.offsetWidth;if(b<=1||c<=1)for(var a=a.getElementsByTagName("iframe"),d,e,f=0,i=a.length;f<i;f++)if(d=a[f].offsetHeight,e=a[f].offsetWidth,d>1&&e>1){b=d;c=e;break}return{height:b,width:c}}
function L(a){var b=document;return b[b.compatMode==="CSS1Compat"?"documentElement":"body"]["client"+a]||0}function M(a){a="scroll"+a;return Math.max(document.body[a],document.documentElement[a])||0}function ga(a,b,c){return a===g?l:c===g&&a.getAttribute(b)||a.getAttribute(b)===c?a:a===document.body?l:ga(a.parentNode,b,c)};function N(){this.s=h;ha(this,"focus","focusin",this.ha);ha(this,"blur","focusout",this.ga)}N.prototype.ha=function(){this.s=h};N.prototype.ga=function(){this.s=l};function ha(a,b,c,d){a=w(d,a);window.addEventListener?window.addEventListener(b,a,l):document.attachEvent&&document.attachEvent(c,a)}
function ia(a){var b=L("Height"),c=L("Width"),d=O(a,"Left"),e=O(a,"Top"),f=ja(),i=P(),j=K(a),a=j.height,j=j.width,c=Math.min(f+c,d+j)-Math.max(f,d),b=Math.min(i+b,e+a)-Math.max(i,e);return c<0||b<0?l:c*b>0.5*j*a}function P(){var a=document.body,b=document.documentElement;if(z(n.pageYOffset))return n.pageYOffset;else if(a&&a.scrollTop)return a.scrollTop;else if(b&&b.scrollTop)return b.scrollTop;return 0}
function ja(){var a=window,b=document.body,c=document.documentElement;if(z(a.pageXOffset))return a.pageXOffset;else if(b&&b.scrollLeft)return b.scrollLeft;else if(c&&c.scrollLeft)return c.scrollLeft;return 0}function O(a,b){for(var c=0,d=l;a;)c+=a["offset"+b],ka(a)==="fixed"&&(d=h),a=a.offsetParent;d&&(c+=b==="Left"?ja():P());return c}
function ka(a){n.getComputedStyle?(a=n.getComputedStyle(a,k),a=a.position||a.getPropertyValue("position")):a=a.currentStyle?a.currentStyle.position:a.style&&a.style.position;return a||""};function la(a){var b={};if(a){a.charAt(0)=="?"&&(a=a.substring(1));for(var a=a.replace("+"," "),a=a.split(/[&;]/g),c=0;c<a.length;c++){var d=a[c].split("=");b[decodeURIComponent(d[0])]=decodeURIComponent(d[1])}}return b}function ma(a,b,c){var d="",e=n.location.href.split("?");e.length&&(e=la(e[1]),b=c||b,e[b]&&(d="&"+a+"="+e[b]));return d};function R(a,b,c){a[b]=a[b]||c}function S(a,b,c){return a[c]?"&g"+b+"="+encodeURIComponent(a[c]):""};function T(a){a+="=";for(var b=document.cookie.split(";"),c=0;c<b.length;c++){for(var d=b[c];d.charAt(0)==" ";)d=d.substring(1,d.length);if(d.indexOf(a)==0)return d.substring(a.length,d.length)}return k}function na(a,b){var c=n._sf_async_config;if(!c||!c.noCookies)c=new Date,c.setTime(D()+2592E6),document.cookie=a+"="+b+("; expires="+c.toGMTString())+"; path=/"};function U(a,b,c,d){this.b=a;this.B=a.getAttribute("data-cb-ad-id")||a.id;this.J=b;this.k=c;this.ba=d;this.P=this.Q=g;this.h=k;this.R=0}function V(a){var b=K(a.b);return{id:a.B,engagedSeconds:a.R,positionLeft:O(a.b,"Left"),positionTop:O(a.b,"Top"),width:b.width,height:b.height,campaignId:a.P,creativeId:a.Q}}U.prototype.onload=function(){this.K=setInterval(w(this.$,this),1E3);this.$()};U.prototype.$=function(){I(this.J)&&this.k.s&&ia(this.b)&&(this.R+=1);this.ba&&oa(this)};
function pa(a,b,c){a.P=b;a.Q=c}
function oa(a){function b(a,b,c){var d=document.createElement("div"),e=document.createElement("span");e.setAttribute("style","font-weight: bold;");e.textContent=a;d.textContent=b;d.insertBefore(e,d.firstChild);c.appendChild(d)}var c=a.b;if(c){var d;if(a.h)d=document.getElementById(a.h);else{a.h="engagementLog-"+a.B+"-"+Math.floor(Math.random()*1E3);d=document.createElement("div");d.setAttribute("id",a.h);document.body.appendChild(d);var e=c.getAttribute("style")||"",f=ka(c),f=f==="fixed"||f==="absolute"||
f==="relative"?"":"position: relative;";e+="box-shadow: 0px 0px 0px 3px #49A2DC; z-index: 2000;"+f;c.setAttribute("style",e);var i="box-shadow: 0px 0px 0px 3px #5BC3BD, 10px 5px 5px #C8DAE8; z-index: 2000;"+f;d.onmouseover=function(){c.setAttribute("style",i)};d.onmouseout=function(){e?c.setAttribute("style",e):c.removeAttribute("style")}}d.innerHTML="";f="background-color: #F1F7FB; z-index: 9000000; position: absolute;padding: 10px; border-radius: 5px; font-size: 12px; color: #658BA1;border: 1px solid #C8DAE8; margin: 3px; font-family: 'Proxima-Nova','Helvetica Neue',Helvetica,Arial,sans-serif;top: "+
O(c,"Top")+"px;left: "+O(c,"Left")+"px;";d.setAttribute("style",f);f=V(a);b("Ad Name: ",f.id+" ["+f.width+"x"+f.height+"]",d);var j=f.campaignId;j&&b("Campaign: ",j,d);(j=f.creativeId)&&b("Creative: ",j,d);d.appendChild(document.createElement("br"));var j=I(a.J),u="Out Of View";a.k.s&&ia(a.b)&&(u=j?"Engaged In View":"In View");b(u,"",d);b("Engaged Time: ",f.engagedSeconds+" seconds",d)}};function o(a){this.a=n._sf_async_config||{};this.ca=w(this.ja,this);this.i=[];this.n=a;this.c();y(n,"unload",w(this.ia,this));for(var a=w(this.ka,this),b=n._cbq||[];b.length;)a(b.shift());n._cbq={push:a}}m=o.prototype;m.c=function(){this.D=this.d=0;this.H=D();this.G=r();this.l=h;this.V=72E5;this.j=this.f=0;this.n.c();var a=+this.a.sessionLength;if(!isNaN(a))this.V=a*6E4};m.ka=function(a){this.a[a[0]]=a[1];this.d=0};function W(a,b){var c;c=new Image(1,1);c.onerror=a.ca;c.src=b}
m.m=function(){var a=n._sf_startpt,b=n._sf_endpt;if(z(a))this.u=z(b)?b-a:D()-a;this.C=setInterval(w(this.W,this),15E3);this.W()};m.ja=function(){this.i.push(1);for(var a=0,b=0;b<this.i.length;++b)a+=this.i[b];a<3?(this.l=h,qa(this)):clearInterval(this.C)};function X(a){if(!T("_SUPERFLY_nosample"))a.fa?a.m():(a.fa=h,!n._sf_async_config&&!n._cbq?y(n,"load",w(a.m,a)):a.m())}m.ia=function(){var a=this.G,b=p();if(b)b._cb_cp+=(b._cb_cp?",":"")+a;else if(!n.name)n.name="_cb_cp"+a};
function qa(a){var b=a.d,b=b?Math.min(b*2,16):1;a.d=b}m.L=function(a,b){this.w=n.location.protocol+"//"+this.a.domain+this.a.path;this.a.path=a;b&&(this.a.title=b);clearInterval(this.C);this.c();X(this)};m.W=function(){var a=this.n,b=a.f;a.f=0;ca(a);this.j=b;this.f+=this.j;a=this.a.reading&&+this.a.reading||this.j>0;this.D<this.d&&!a?this.D++:(a?this.d=0:qa(this),this.D=0,this.i.push(0),this.i.length>18&&this.i.shift(),this.X(),D()-this.H>=this.V&&clearInterval(this.C))};
function Y(a){if(a.w)return h;a=(document.referrer||"").indexOf("://"+n.location.host+"/");return a!=-1&&a<9}function ra(a){return E(a.a.title.slice(0,100))};function Z(a,b){this.g=[];this.k=b;this.O=l;!!window.postMessage===h&&y(window,"message",w(this.ea,this));x(n.location.host);o.call(this,a)}aa(Z);var sa=l;m=Z.prototype;m.m=function(){Z.I.m.call(this);F(this.g,function(a,b){b.onload()});this.O=h};
m.X=function(){var a=P(),b=[];F(this.g,function(a,c){var d=V(c);b.push(encodeURIComponent(d.id)+"="+[d.engagedSeconds,d.positionLeft,d.positionTop,d.width,d.height,encodeURIComponent(d.campaignId||""),encodeURIComponent(d.creativeId||"")].join("::"))});var c=b.join("&"),d=this.a,e="",f="";if(this.l)this.l=l,e=(Y(this)?"&v=":"&r=")+encodeURIComponent(this.w||document.referrer||""),f="&i="+ra(this);var i=this.u?"&b="+this.u:"";fa("[a] ping with path: "+E(s(!!d.useCanonical)));var j=encodeURIComponent("ads."+
d.domain),u=n.location,t=[],B;for(B in d)B.charAt(0)=="_"&&t.push(B+"="+d[B]);W(this,(u.protocol||"http:")+"//"+d.pingServer+"/ping/ad?h="+j+"&p="+E(s(!!d.useCanonical))+"&u="+this.e+"&d="+E(x(u.host))+"&g="+d.uid+S(d,0,"sections")+S(d,1,"authors")+S(d,2,"zone")+S(d,3,"sponsorName")+"&n="+this.F+"&c="+Math.round((D()-this.H)/600)/100+"&x="+a+"&y="+M("Height")+"&o="+M("Width")+"&w="+L("Height")+"&j="+Math.round((this.d+2)*15E3/1E3)+"&E="+this.f+e+i+"&t="+this.G+f+(t.length?"&"+t.join("&"):"")+"&ad="+
encodeURIComponent(c)+"&_")};m.c=function(){Z.I.c.call(this);var a=n.location;R(this.a,"pingServer","ping.chartbeat.net");R(this.a,"title",document.title);R(this.a,"domain",a.host);R(this.a,"engaged",l);sa=!!s(l).match(ea)||l;this.q=this.a.adIdentifier||"data-cb-ad-id";this.r=x(a.host);this.a.domain=x(this.a.domain);this.F=(this.e=T("_chartbeat2"))?0:1;if(!this.e)this.e=r();this.e=this.e.split(".")[0];this.Y();a=this.n;a.p.push(w(this.Y,this));a.N=h;ta(this)};
m.Y=function(){for(var a=J(this.q,"div"),b=[],c,d=0,e=a.length;d<e;d++)c=K(a[d]),c.height>1&&c.width>1&&b.push(a[d]);c=0;for(d=b.length;c<d;c++)if(!ua(this,b[c])){var f=b[c],a=new U(f,this.n,this.k,sa);this.g.push(a);var e=f.getAttribute("data-cb-campaign-id"),i=f.getAttribute("data-cb-creative-id");if(e===k||i===k){var j=J("data-cb-campaign-id","*",f),f=J("data-cb-creative-id","*",f);j.length!==0&&(e=j[0].getAttribute("data-cb-campaign-id"));f.length!==0&&(i=f[0].getAttribute("data-cb-creative-id"))}e&&
i&&pa(a,e,i);V(a);if(this.O)a.onload()}va(this)};function va(a){var b=[];F(a.g,function(a,d){var e;typeof document.contains==="function"&&!document.contains(d.b)?e=l:(e=K(d.b),e=e.height>1&&e.width>1);if(e===h)b.push(d);else{if(d.K)clearInterval(d.K),d.K=k;d.b=k;d.J=k;d.k=k;d.h&&(e=document.getElementById(d.h),(e.parentElement?e.parentElement:e.parentNode).removeChild(e))}});a.g=b}function ua(a,b){var c=l;F(a.g,function(a,e){if(e.b===b)return c=h,l});return c}
m.ea=function(a){var b=ba(a.data),c=a.source;if(b.cbType==="campaignMessage"){var a=document.getElementsByTagName("iframe"),d=g;F(a,function(a,b){if(b.contentWindow===c)return d=b,l});var e=d.getAttribute(this.q);if(e===k){a=ga(d,this.q);if(a===l)return;e=a.getAttribute(this.q)}var f=g;F(this.g,function(a,b){if(e===b.B===h)return f=b,l});f!==g&&(pa(f,b.campaignId,b.creativeId),!!window.postMessage===h&&d.contentWindow.postMessage("cbdata::ack","*"))}};m.L=function(){};
function ta(a){if(sa){var b=document.createElement("div");b.setAttribute("style","position:fixed; left:0; right:0 ;top:0 ;bottom:0; background-color: rgba(0, 0, 0, 0.3); z-index:1000;");document.body.appendChild(b);var c=document.createElement("div");document.body.appendChild(c);var d=a.a;F(["sections","zone","sponsorName"],function(a,b){if(d[b]!==g){var i=document.createElement("div");i.textContent=b+": "+d[b];c.appendChild(i)}});c.children.length&&c.setAttribute("style","background-color: #F1F7FB; z-index: 9000000; position: fixed;padding: 10px; border-radius: 5px; font-size: 12px;color: #658BA1; border: 1px solid #C8DAE8;font-family: 'Proxima-Nova','Helvetica Neue',Helvetica,Arial,sans-serif;top: "+
Math.round(L("Height")*0.9)+"px;left: "+Math.round(L("Width")*0.45)+"px;")}};if(!wa){var wa,ya=wa=n.pSUPERFLY_pub=new Z(new G,new N);Z.prototype.virtualPage=Z.prototype.L;X(ya)};function $(a){o.call(this,a)}aa($);
$.prototype.c=function(){$.I.c.call(this);this.A=k;for(var a=this.a,b=document.getElementsByTagName("script"),c=0;c<b.length;++c)if(b[c].src.match(/chartbeat.js/)){b=la(b[c].src.split("?")[1]);R(a,"uid",b.uid);R(a,"domain",b.domain);break}a=n.location;R(this.a,"pingServer","ping.chartbeat.net");R(this.a,"title",document.title);R(this.a,"domain",a.host);R(this.a,"path",s(!!this.a.useCanonical));this.r=x(a.host);this.a.domain=x(this.a.domain);var a=(T("_chartbeat2")||"").split("."),b=D(),c=b-+(a[1]||
0),d="1",e=a&&+a[2],f=a&&a[3];if(a&&e&&f)if(d=Math.abs((A(b)-A(e))/864E5)){d=Math.min(d,16)-1;for(e="";d--;)e+=0;d=(f+e+"1").slice(-16)}else d=f;this.F=a[0]&&c>18E5?0:1;a[0]||(a[0]=r(),a[1]=b);a[2]=b;a[3]=d;this.v=a[0];this.e=a.join(".");na("_chartbeat2",this.e);this.a.utoken=this.v;var i;b=+a[1];c=+a[2];if((a=a[3])&&b&&c)i=(Math.min((Math.abs((A(c)-A(b))/864E5)||0)+1,16,a.length)-1).toString(16),i+=("0000"+parseInt(a,2).toString(16)).slice(-4);this.S=i;n.postMessage&&y(n,"message",w(this.da,this));
i=T("_chartbeat_uuniq")==="1";na("_chartbeat_uuniq","1");i||W(this,"//ping.chartbeat.net/uuniq?u="+this.v)};$.prototype.aa=function(a){this.A=a};
$.prototype.X=function(){var a=this.a,b=P(),c=Math.round((D()-this.H)/600)/100,d=0,e=0,f=0;da(this.n,"onkeydown")?e=1:this.a.reading&&+this.a.reading||this.j>0||c<0.09?d=1:f=1;var i="",j="",u="";if(this.l){this.l=l;var i=(Y(this)?"&v=":"&r=")+encodeURIComponent(this.w||document.referrer||""),j="&i="+ra(this),t=this.a.hudTrackable;t!==g&&(u="&L="+(t?"1":"0"))}var t=this.u?"&b="+this.u:"",B=this.A?"&A="+this.A:"",xa=this.S?"&f="+this.S:"",C,v=p();if(v)C=v._cb_cp,v._cb_cp="";else if(/_cb_cp[a-z0-9]{16}/.test(n.name))C=
n.name.substr(6),n.name="";C=C?"&D="+C:"";var v=[],Q;for(Q in a)Q.charAt(0)=="_"&&v.push(Q+"="+a[Q]);W(this,(n.location.protocol||"http:")+"//"+a.pingServer+"/ping?h="+encodeURIComponent(a.domain)+"&p="+encodeURIComponent(a.path)+"&u="+this.v+"&d="+encodeURIComponent(this.r)+"&g="+a.uid+S(a,0,"sections")+S(a,1,"authors")+(a.noCookies?"":"&n="+this.F)+xa+"&c="+c+"&x="+b+"&y="+M("Height")+"&o="+M("Width")+"&w="+L("Height")+"&j="+Math.round((this.d+2)*15E3/1E3)+"&R="+d+"&W="+e+"&I="+f+"&E="+this.f+"&e="+
this.j+i+t+B+ma("C","utm_campaign",a.campaignTag)+ma("M","utm_medium",a.mediumTag)+"&t="+this.G+"&V=16"+C+j+u+(v.length?"&"+v.join("&"):"")+"&_")};
$.prototype.da=function(a){var b=this.a;if(a.origin==="http://"+(b.playerdomain||this.r)){var c=a.data;if(typeof c=="string"&&c.indexOf("cbqpush::")===0){if(a=c.split("::"),a.length==3)a[1].indexOf("_")===0&&(b[a[1]]=a[2]),this.d=0}else c=="cbdata?"&&(b="domain="+encodeURIComponent(b.domain)+"&path="+encodeURIComponent(b.path)+"&title="+ra(this)+"&referrer="+encodeURIComponent(this.w||document.referrer||"")+"&internal="+(Y(this)?"1":"0")+"&subdomain="+encodeURIComponent(this.r)+"&utoken="+this.v,
a.source.postMessage(b,"*"))}};var za=(document.location.protocol=="https:"?"https://a248.e.akamai.net/chartbeat.download.akamai.com/102508/":"http://static.chartbeat.com/")+"js/inpage.js";function Aa(){var a=document.createElement("script");a.async=h;a.src=za;var b=document.getElementsByTagName("script")[0];b.parentNode.insertBefore(a,b)}function Ba(a){if(/[\/|\.]chartbeat\.com$/.test(a.origin)){var b=p(),c=String(a.data);if(b&&c.indexOf("_cb_ip")==0)b._cb_ip=1,a.source.postMessage(1,a.origin),Aa()}};if(!n.pSUPERFLY){var Ca=new G,Da=new $(Ca);n.pSUPERFLY=Da;$.prototype.virtualPage=$.prototype.L;$.prototype.activity=$.prototype.aa;X(Da);var Ea=p();Ea&&(y(n,"message",Ba),Ea._cb_ip&&Aa())};})();