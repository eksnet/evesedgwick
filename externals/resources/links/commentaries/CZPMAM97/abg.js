(function(){var f=function(a,b,c){return a.call.apply(a.bind,arguments)},k=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var e=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,e);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}},l=function(a,b,c){l=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?f:k;return l.apply(null,arguments)},n=Date.now||function(){return+new Date};var q=function(a,b,c,e){c=l(e,c);a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent&&a.attachEvent("on"+b,c)};var y=function(a,b,c,e,d,m,G,H,I,J,K,L,M,N,O,g,h,p,P){this.i=a;this.h=b;this.j=c;this.k=e;this.g=d;this.F=m;this.s=G;this.G=H;this.H=I;this.w=J;this.B=K;this.q=L;this.C=M;this.p=N;this.J=O;t:for(a=this.h,b="A",c=a.childNodes,e=0;e<c.length;e++)if(d=c.item(e),"undefined"!=typeof d.tagName&&d.tagName.toUpperCase()==b){a=d;break t}this.o=a;this.A="left"==h;this.n=this.l=null;h="undefined"!=typeof SVGElement&&"undefined"!=typeof document.createElementNS;"img"==p&&(h=!1);h?"adchoices"==g?(this.j.appendChild(r(s(),
t("0px"))),g=this.g-this.k+"px",this.l=u(this,this.B,5,this.q),this.o.appendChild(r(v(this,this.g,this.s),t(g),this.l))):"adsbygoogle"==g?(g=s(),p=w("0px"),this.j.appendChild(r(g,p)),this.A?(a=0,g=this.k+2,p=this.g-this.p-5):(h=0,g=5,p=this.g-this.p-2-h-this.k,a=this.g-this.k-h),h=v(this,this.g,this.s),this.l=u(this,this.B,g,this.q),""!=this.C&&(this.n=u(this,this.C,p,this.p)),g=w(a+"px"),null!=this.o&&(g=this.n?r(h,this.l,this.n,g):r(h,this.l,g),this.o.appendChild(g))):x(this):x(this);this.m=null;
this.v=0;P?this.u():(q(this.i,"mouseover",this,this.u),q(this.i,"mouseout",this,this.K),q(this.i,"touchstart",this,this.u),q(this.i,"touchend",this,this.D),q(this.i,"touchcancel",this,this.D),q(this.o,"click",this,this.I))},r=function(a){var b=document.createElementNS("http://www.w3.org/2000/svg","svg");b.setAttribute("width","100%");b.setAttribute("height","100%");for(var c=0;c<arguments.length;c++)b.appendChild(arguments[c]);return b},s=function(){var a=document.createElementNS("http://www.w3.org/2000/svg",
"rect");a.setAttribute("width","100%");a.setAttribute("height","100%");a.setAttribute("fill","lightgray");return a},v=function(a,b,c){var e=document.createElementNS("http://www.w3.org/2000/svg","path");e.setAttribute("fill","lightgray");var d="M0,0L"+b+",0",d=a.A?d+("L"+b+","+(c-4)+"s0,4,-4,4L0,"+c):d+("L"+b+","+c+"L4,"+c+"s-4,0,-4,-4");e.setAttribute("d",d+"z");return e},u=function(a,b,c,e){a=11+a.J;var d=document.createElementNS("http://www.w3.org/2000/svg","svg"),m=document.createElementNS("http://www.w3.org/2000/svg",
"text");b=document.createTextNode(b);d.setAttribute("overflow","visible");d.setAttribute("x",c+"px");d.setAttribute("y",a+"px");d.setAttribute("width",e+"px");m.setAttribute("fill","black");m.setAttribute("font-family","Arial");m.setAttribute("font-size","100px");d.appendChild(m);m.appendChild(b);return d},z=function(a,b){var c=a.childNodes.item(0),e=c.getComputedTextLength();0!=e&&c.setAttribute("transform","scale("+b/e+")")},t=function(a){var b=document.createElementNS("http://www.w3.org/2000/svg",
"svg"),c=document.createElementNS("http://www.w3.org/2000/svg","circle"),e=document.createElementNS("http://www.w3.org/2000/svg","path");b.appendChild(c);b.appendChild(e);b.setAttribute("fill","#00aecd");b.setAttribute("x",a);b.setAttribute("y","0.5px");c.setAttribute("cx","6.711px");c.setAttribute("cy","6.04px");c.setAttribute("r","0.483");e.setAttribute("d","M2.696,3.234c0-0.555,0.131-0.989,0.537-1.201c0.359-0.188,0.769-0.136,1.25,0.141l7.438,4.219c0.485,0.28,0.743,0.546,0.734,1c-0.009,0.456-0.271,0.771-0.766,1.032L7.78,10.519c-0.594,0.297-0.798,0.289-1.031,0.188C6.39,10.55,6.296,10.237,6.296,9.378l0.016-1.672c0-0.828,0.844-0.906,0.844,0l0.016,1.719C7.155,9.94,7.499,9.769,7.499,9.769L11.53,7.69c0.359-0.219,0.25-0.406,0.141-0.516c-0.024-0.024-0.188-0.12-0.25-0.156L4.233,2.987c-0.797-0.531-0.656,0.25-0.656,0.25s-0.016,7.182-0.016,7.625c0,0.797,0.094,0.672,1.062,0.156c0.95-0.506,1.156,0.422,0.516,0.75c0,0-0.869,0.473-1.297,0.641c-0.797,0.312-1.109-0.234-1.141-0.641C2.674,11.401,2.696,3.234,2.696,3.234z");
return b},x=function(a){var b=A(a.G,a.w,a.k,a.F);a.j.appendChild(b);b=A(a.H,a.w,a.g,a.s);a.o.appendChild(b);b.width=a.g},A=function(a,b,c,e){var d=document.createElement("img");d.src=a;d.alt=b;d.setAttribute("border","0");d.width=c;d.height=e;return d};
y.prototype.u=function(){window.clearTimeout(this.m);this.m=null;this.h&&"block"==this.h.style.display||(this.v=n(),this.g&&(this.i.style.width=this.g+"px"),this.j&&this.h&&(this.j.style.display="none",this.h.style.display="block"),this.l&&z(this.l,this.q),this.n&&z(this.n,this.p))};y.prototype.K=function(){B(this,500)};y.prototype.D=function(){B(this,4E3)};var B=function(a,b){window.clearTimeout(a.m);a.m=window.setTimeout(l(a.M,a),b)};
y.prototype.M=function(){window.clearTimeout(this.m);this.m=null;this.L&&(this.i.style.left=this.L+"px");this.k&&(this.i.style.width=this.k+"px");this.j&&this.h&&(this.j.style.display="block",this.h.style.display="none")};y.prototype.I=function(a){this.h&&"block"==this.h.style.display&&500>n()-this.v&&a.preventDefault()};
var w=function(a){var b=document.createElementNS("http://www.w3.org/2000/svg","svg"),c=document.createElementNS("http://www.w3.org/2000/svg","circle"),e=document.createElementNS("http://www.w3.org/2000/svg","circle"),d=document.createElementNS("http://www.w3.org/2000/svg","line");b.setAttribute("stroke","#00aecd");b.setAttribute("fill","#00aecd");b.setAttribute("x",a);b.setAttribute("y","0px");c.setAttribute("cx","7.5px");c.setAttribute("cy","7.5px");c.setAttribute("r","5.5px");c.setAttribute("fill",
"none");c.setAttribute("stroke-width","1.1px");e.setAttribute("cx","7.5px");e.setAttribute("cy","4.75px");e.setAttribute("r","1px");e.setAttribute("stroke","none");d.setAttribute("x1","7.5px");d.setAttribute("x2","7.5px");d.setAttribute("y1","6.5px");d.setAttribute("y2","11px");d.setAttribute("fill","none");d.setAttribute("stroke-width","1.75px");b.appendChild(c);b.appendChild(e);b.appendChild(d);return b},C=["abg"],D=this;C[0]in D||!D.execScript||D.execScript("var "+C[0]);
for(var E;C.length&&(E=C.shift());)C.length||void 0===y?D=D[E]?D[E]:D[E]={}:D[E]=y;if("undefined"!=typeof window.abgp){var F=window.abgp;new y(F.el,F.ael,F.iel,F.hw,F.sw,F.hh,F.sh,F.himg,F.simg,F.alt,F.t,F.tw,F.t2,F.t2w,F.tbo,F.att,F.halign,F.ff,F.fe)};})();