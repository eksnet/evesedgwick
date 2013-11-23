/*
 * jQuery JavaScript Library v1.3.2
 * http://jquery.com/
 *
 * Copyright (c) 2009 John Resig
 * Dual licensed under the MIT and GPL licenses.
 * http://docs.jquery.com/License
 *
 * Date: 2009-02-19 17:34:21 -0500 (Thu, 19 Feb 2009)
 * Revision: 6246
 */
(function(){var l=this,g,y=l.jQuery,p=l.$,o=l.jQuery=l.$=function(E,F){return new o.fn.init(E,F)},D=/^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,f=/^.[^:#\[\.,]*$/;o.fn=o.prototype={init:function(E,H){E=E||document;if(E.nodeType){this[0]=E;this.length=1;this.context=E;return this}if(typeof E==="string"){var G=D.exec(E);if(G&&(G[1]||!H)){if(G[1]){E=o.clean([G[1]],H)}else{var I=document.getElementById(G[3]);if(I&&I.id!=G[3]){return o().find(E)}var F=o(I||[]);F.context=document;F.selector=E;return F}}else{return o(H).find(E)}}else{if(o.isFunction(E)){return o(document).ready(E)}}if(E.selector&&E.context){this.selector=E.selector;this.context=E.context}return this.setArray(o.isArray(E)?E:o.makeArray(E))},selector:"",jquery:"1.3.2",size:function(){return this.length},get:function(E){return E===g?Array.prototype.slice.call(this):this[E]},pushStack:function(F,H,E){var G=o(F);G.prevObject=this;G.context=this.context;if(H==="find"){G.selector=this.selector+(this.selector?" ":"")+E}else{if(H){G.selector=this.selector+"."+H+"("+E+")"}}return G},setArray:function(E){this.length=0;Array.prototype.push.apply(this,E);return this},each:function(F,E){return o.each(this,F,E)},index:function(E){return o.inArray(E&&E.jquery?E[0]:E,this)},attr:function(F,H,G){var E=F;if(typeof F==="string"){if(H===g){return this[0]&&o[G||"attr"](this[0],F)}else{E={};E[F]=H}}return this.each(function(I){for(F in E){o.attr(G?this.style:this,F,o.prop(this,E[F],G,I,F))}})},css:function(E,F){if((E=="width"||E=="height")&&parseFloat(F)<0){F=g}return this.attr(E,F,"curCSS")},text:function(F){if(typeof F!=="object"&&F!=null){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(F))}var E="";o.each(F||this,function(){o.each(this.childNodes,function(){if(this.nodeType!=8){E+=this.nodeType!=1?this.nodeValue:o.fn.text([this])}})});return E},wrapAll:function(E){if(this[0]){var F=o(E,this[0].ownerDocument).clone();if(this[0].parentNode){F.insertBefore(this[0])}F.map(function(){var G=this;while(G.firstChild){G=G.firstChild}return G}).append(this)}return this},wrapInner:function(E){return this.each(function(){o(this).contents().wrapAll(E)})},wrap:function(E){return this.each(function(){o(this).wrapAll(E)})},append:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.appendChild(E)}})},prepend:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.insertBefore(E,this.firstChild)}})},before:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this)})},after:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this.nextSibling)})},end:function(){return this.prevObject||o([])},push:[].push,sort:[].sort,splice:[].splice,find:function(E){if(this.length===1){var F=this.pushStack([],"find",E);F.length=0;o.find(E,this[0],F);return F}else{return this.pushStack(o.unique(o.map(this,function(G){return o.find(E,G)})),"find",E)}},clone:function(G){var E=this.map(function(){if(!o.support.noCloneEvent&&!o.isXMLDoc(this)){var I=this.outerHTML;if(!I){var J=this.ownerDocument.createElement("div");J.appendChild(this.cloneNode(true));I=J.innerHTML}return o.clean([I.replace(/ jQuery\d+="(?:\d+|null)"/g,"").replace(/^\s*/,"")])[0]}else{return this.cloneNode(true)}});if(G===true){var H=this.find("*").andSelf(),F=0;E.find("*").andSelf().each(function(){if(this.nodeName!==H[F].nodeName){return}var I=o.data(H[F],"events");for(var K in I){for(var J in I[K]){o.event.add(this,K,I[K][J],I[K][J].data)}}F++})}return E},filter:function(E){return this.pushStack(o.isFunction(E)&&o.grep(this,function(G,F){return E.call(G,F)})||o.multiFilter(E,o.grep(this,function(F){return F.nodeType===1})),"filter",E)},closest:function(E){var G=o.expr.match.POS.test(E)?o(E):null,F=0;return this.map(function(){var H=this;while(H&&H.ownerDocument){if(G?G.index(H)>-1:o(H).is(E)){o.data(H,"closest",F);return H}H=H.parentNode;F++}})},not:function(E){if(typeof E==="string"){if(f.test(E)){return this.pushStack(o.multiFilter(E,this,true),"not",E)}else{E=o.multiFilter(E,this)}}var F=E.length&&E[E.length-1]!==g&&!E.nodeType;return this.filter(function(){return F?o.inArray(this,E)<0:this!=E})},add:function(E){return this.pushStack(o.unique(o.merge(this.get(),typeof E==="string"?o(E):o.makeArray(E))))},is:function(E){return !!E&&o.multiFilter(E,this).length>0},hasClass:function(E){return !!E&&this.is("."+E)},val:function(K){if(K===g){var E=this[0];if(E){if(o.nodeName(E,"option")){return(E.attributes.value||{}).specified?E.value:E.text}if(o.nodeName(E,"select")){var I=E.selectedIndex,L=[],M=E.options,H=E.type=="select-one";if(I<0){return null}for(var F=H?I:0,J=H?I+1:M.length;F<J;F++){var G=M[F];if(G.selected){K=o(G).val();if(H){return K}L.push(K)}}return L}return(E.value||"").replace(/\r/g,"")}return g}if(typeof K==="number"){K+=""}return this.each(function(){if(this.nodeType!=1){return}if(o.isArray(K)&&/radio|checkbox/.test(this.type)){this.checked=(o.inArray(this.value,K)>=0||o.inArray(this.name,K)>=0)}else{if(o.nodeName(this,"select")){var N=o.makeArray(K);o("option",this).each(function(){this.selected=(o.inArray(this.value,N)>=0||o.inArray(this.text,N)>=0)});if(!N.length){this.selectedIndex=-1}}else{this.value=K}}})},html:function(E){return E===g?(this[0]?this[0].innerHTML.replace(/ jQuery\d+="(?:\d+|null)"/g,""):null):this.empty().append(E)},replaceWith:function(E){return this.after(E).remove()},eq:function(E){return this.slice(E,+E+1)},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments),"slice",Array.prototype.slice.call(arguments).join(","))},map:function(E){return this.pushStack(o.map(this,function(G,F){return E.call(G,F,G)}))},andSelf:function(){return this.add(this.prevObject)},domManip:function(J,M,L){if(this[0]){var I=(this[0].ownerDocument||this[0]).createDocumentFragment(),F=o.clean(J,(this[0].ownerDocument||this[0]),I),H=I.firstChild;if(H){for(var G=0,E=this.length;G<E;G++){L.call(K(this[G],H),this.length>1||G>0?I.cloneNode(true):I)}}if(F){o.each(F,z)}}return this;function K(N,O){return M&&o.nodeName(N,"table")&&o.nodeName(O,"tr")?(N.getElementsByTagName("tbody")[0]||N.appendChild(N.ownerDocument.createElement("tbody"))):N}}};o.fn.init.prototype=o.fn;function z(E,F){if(F.src){o.ajax({url:F.src,async:false,dataType:"script"})}else{o.globalEval(F.text||F.textContent||F.innerHTML||"")}if(F.parentNode){F.parentNode.removeChild(F)}}function e(){return +new Date}o.extend=o.fn.extend=function(){var J=arguments[0]||{},H=1,I=arguments.length,E=false,G;if(typeof J==="boolean"){E=J;J=arguments[1]||{};H=2}if(typeof J!=="object"&&!o.isFunction(J)){J={}}if(I==H){J=this;--H}for(;H<I;H++){if((G=arguments[H])!=null){for(var F in G){var K=J[F],L=G[F];if(J===L){continue}if(E&&L&&typeof L==="object"&&!L.nodeType){J[F]=o.extend(E,K||(L.length!=null?[]:{}),L)}else{if(L!==g){J[F]=L}}}}}return J};var b=/z-?index|font-?weight|opacity|zoom|line-?height/i,q=document.defaultView||{},s=Object.prototype.toString;o.extend({noConflict:function(E){l.$=p;if(E){l.jQuery=y}return o},isFunction:function(E){return s.call(E)==="[object Function]"},isArray:function(E){return s.call(E)==="[object Array]"},isXMLDoc:function(E){return E.nodeType===9&&E.documentElement.nodeName!=="HTML"||!!E.ownerDocument&&o.isXMLDoc(E.ownerDocument)},globalEval:function(G){if(G&&/\S/.test(G)){var F=document.getElementsByTagName("head")[0]||document.documentElement,E=document.createElement("script");E.type="text/javascript";if(o.support.scriptEval){E.appendChild(document.createTextNode(G))}else{E.text=G}F.insertBefore(E,F.firstChild);F.removeChild(E)}},nodeName:function(F,E){return F.nodeName&&F.nodeName.toUpperCase()==E.toUpperCase()},each:function(G,K,F){var E,H=0,I=G.length;if(F){if(I===g){for(E in G){if(K.apply(G[E],F)===false){break}}}else{for(;H<I;){if(K.apply(G[H++],F)===false){break}}}}else{if(I===g){for(E in G){if(K.call(G[E],E,G[E])===false){break}}}else{for(var J=G[0];H<I&&K.call(J,H,J)!==false;J=G[++H]){}}}return G},prop:function(H,I,G,F,E){if(o.isFunction(I)){I=I.call(H,F)}return typeof I==="number"&&G=="curCSS"&&!b.test(E)?I+"px":I},className:{add:function(E,F){o.each((F||"").split(/\s+/),function(G,H){if(E.nodeType==1&&!o.className.has(E.className,H)){E.className+=(E.className?" ":"")+H}})},remove:function(E,F){if(E.nodeType==1){E.className=F!==g?o.grep(E.className.split(/\s+/),function(G){return !o.className.has(F,G)}).join(" "):""}},has:function(F,E){return F&&o.inArray(E,(F.className||F).toString().split(/\s+/))>-1}},swap:function(H,G,I){var E={};for(var F in G){E[F]=H.style[F];H.style[F]=G[F]}I.call(H);for(var F in G){H.style[F]=E[F]}},css:function(H,F,J,E){if(F=="width"||F=="height"){var L,G={position:"absolute",visibility:"hidden",display:"block"},K=F=="width"?["Left","Right"]:["Top","Bottom"];function I(){L=F=="width"?H.offsetWidth:H.offsetHeight;if(E==="border"){return}o.each(K,function(){if(!E){L-=parseFloat(o.curCSS(H,"padding"+this,true))||0}if(E==="margin"){L+=parseFloat(o.curCSS(H,"margin"+this,true))||0}else{L-=parseFloat(o.curCSS(H,"border"+this+"Width",true))||0}})}if(H.offsetWidth!==0){I()}else{o.swap(H,G,I)}return Math.max(0,Math.round(L))}return o.curCSS(H,F,J)},curCSS:function(I,F,G){var L,E=I.style;if(F=="opacity"&&!o.support.opacity){L=o.attr(E,"opacity");return L==""?"1":L}if(F.match(/float/i)){F=w}if(!G&&E&&E[F]){L=E[F]}else{if(q.getComputedStyle){if(F.match(/float/i)){F="float"}F=F.replace(/([A-Z])/g,"-$1").toLowerCase();var M=q.getComputedStyle(I,null);if(M){L=M.getPropertyValue(F)}if(F=="opacity"&&L==""){L="1"}}else{if(I.currentStyle){var J=F.replace(/\-(\w)/g,function(N,O){return O.toUpperCase()});L=I.currentStyle[F]||I.currentStyle[J];if(!/^\d+(px)?$/i.test(L)&&/^\d/.test(L)){var H=E.left,K=I.runtimeStyle.left;I.runtimeStyle.left=I.currentStyle.left;E.left=L||0;L=E.pixelLeft+"px";E.left=H;I.runtimeStyle.left=K}}}}return L},clean:function(F,K,I){K=K||document;if(typeof K.createElement==="undefined"){K=K.ownerDocument||K[0]&&K[0].ownerDocument||document}if(!I&&F.length===1&&typeof F[0]==="string"){var H=/^<(\w+)\s*\/?>$/.exec(F[0]);if(H){return[K.createElement(H[1])]}}var G=[],E=[],L=K.createElement("div");o.each(F,function(P,S){if(typeof S==="number"){S+=""}if(!S){return}if(typeof S==="string"){S=S.replace(/(<(\w+)[^>]*?)\/>/g,function(U,V,T){return T.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?U:V+"></"+T+">"});var O=S.replace(/^\s+/,"").substring(0,10).toLowerCase();var Q=!O.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!O.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||O.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!O.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!O.indexOf("<td")||!O.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!O.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||!o.support.htmlSerialize&&[1,"div<div>","</div>"]||[0,"",""];L.innerHTML=Q[1]+S+Q[2];while(Q[0]--){L=L.lastChild}if(!o.support.tbody){var R=/<tbody/i.test(S),N=!O.indexOf("<table")&&!R?L.firstChild&&L.firstChild.childNodes:Q[1]=="<table>"&&!R?L.childNodes:[];for(var M=N.length-1;M>=0;--M){if(o.nodeName(N[M],"tbody")&&!N[M].childNodes.length){N[M].parentNode.removeChild(N[M])}}}if(!o.support.leadingWhitespace&&/^\s/.test(S)){L.insertBefore(K.createTextNode(S.match(/^\s*/)[0]),L.firstChild)}S=o.makeArray(L.childNodes)}if(S.nodeType){G.push(S)}else{G=o.merge(G,S)}});if(I){for(var J=0;G[J];J++){if(o.nodeName(G[J],"script")&&(!G[J].type||G[J].type.toLowerCase()==="text/javascript")){E.push(G[J].parentNode?G[J].parentNode.removeChild(G[J]):G[J])}else{if(G[J].nodeType===1){G.splice.apply(G,[J+1,0].concat(o.makeArray(G[J].getElementsByTagName("script"))))}I.appendChild(G[J])}}return E}return G},attr:function(J,G,K){if(!J||J.nodeType==3||J.nodeType==8){return g}var H=!o.isXMLDoc(J),L=K!==g;G=H&&o.props[G]||G;if(J.tagName){var F=/href|src|style/.test(G);if(G=="selected"&&J.parentNode){J.parentNode.selectedIndex}if(G in J&&H&&!F){if(L){if(G=="type"&&o.nodeName(J,"input")&&J.parentNode){throw"type property can't be changed"}J[G]=K}if(o.nodeName(J,"form")&&J.getAttributeNode(G)){return J.getAttributeNode(G).nodeValue}if(G=="tabIndex"){var I=J.getAttributeNode("tabIndex");return I&&I.specified?I.value:J.nodeName.match(/(button|input|object|select|textarea)/i)?0:J.nodeName.match(/^(a|area)$/i)&&J.href?0:g}return J[G]}if(!o.support.style&&H&&G=="style"){return o.attr(J.style,"cssText",K)}if(L){J.setAttribute(G,""+K)}var E=!o.support.hrefNormalized&&H&&F?J.getAttribute(G,2):J.getAttribute(G);return E===null?g:E}if(!o.support.opacity&&G=="opacity"){if(L){J.zoom=1;J.filter=(J.filter||"").replace(/alpha\([^)]*\)/,"")+(parseInt(K)+""=="NaN"?"":"alpha(opacity="+K*100+")")}return J.filter&&J.filter.indexOf("opacity=")>=0?(parseFloat(J.filter.match(/opacity=([^)]*)/)[1])/100)+"":""}G=G.replace(/-([a-z])/ig,function(M,N){return N.toUpperCase()});if(L){J[G]=K}return J[G]},trim:function(E){return(E||"").replace(/^\s+|\s+$/g,"")},makeArray:function(G){var E=[];if(G!=null){var F=G.length;if(F==null||typeof G==="string"||o.isFunction(G)||G.setInterval){E[0]=G}else{while(F){E[--F]=G[F]}}}return E},inArray:function(G,H){for(var E=0,F=H.length;E<F;E++){if(H[E]===G){return E}}return -1},merge:function(H,E){var F=0,G,I=H.length;if(!o.support.getAll){while((G=E[F++])!=null){if(G.nodeType!=8){H[I++]=G}}}else{while((G=E[F++])!=null){H[I++]=G}}return H},unique:function(K){var F=[],E={};try{for(var G=0,H=K.length;G<H;G++){var J=o.data(K[G]);if(!E[J]){E[J]=true;F.push(K[G])}}}catch(I){F=K}return F},grep:function(F,J,E){var G=[];for(var H=0,I=F.length;H<I;H++){if(!E!=!J(F[H],H)){G.push(F[H])}}return G},map:function(E,J){var F=[];for(var G=0,H=E.length;G<H;G++){var I=J(E[G],G);if(I!=null){F[F.length]=I}}return F.concat.apply([],F)}});var C=navigator.userAgent.toLowerCase();o.browser={version:(C.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[0,"0"])[1],safari:/webkit/.test(C),opera:/opera/.test(C),msie:/msie/.test(C)&&!/opera/.test(C),mozilla:/mozilla/.test(C)&&!/(compatible|webkit)/.test(C)};o.each({parent:function(E){return E.parentNode},parents:function(E){return o.dir(E,"parentNode")},next:function(E){return o.nth(E,2,"nextSibling")},prev:function(E){return o.nth(E,2,"previousSibling")},nextAll:function(E){return o.dir(E,"nextSibling")},prevAll:function(E){return o.dir(E,"previousSibling")},siblings:function(E){return o.sibling(E.parentNode.firstChild,E)},children:function(E){return o.sibling(E.firstChild)},contents:function(E){return o.nodeName(E,"iframe")?E.contentDocument||E.contentWindow.document:o.makeArray(E.childNodes)}},function(E,F){o.fn[E]=function(G){var H=o.map(this,F);if(G&&typeof G=="string"){H=o.multiFilter(G,H)}return this.pushStack(o.unique(H),E,G)}});o.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(E,F){o.fn[E]=function(G){var J=[],L=o(G);for(var K=0,H=L.length;K<H;K++){var I=(K>0?this.clone(true):this).get();o.fn[F].apply(o(L[K]),I);J=J.concat(I)}return this.pushStack(J,E,G)}});o.each({removeAttr:function(E){o.attr(this,E,"");if(this.nodeType==1){this.removeAttribute(E)}},addClass:function(E){o.className.add(this,E)},removeClass:function(E){o.className.remove(this,E)},toggleClass:function(F,E){if(typeof E!=="boolean"){E=!o.className.has(this,F)}o.className[E?"add":"remove"](this,F)},remove:function(E){if(!E||o.filter(E,[this]).length){o("*",this).add([this]).each(function(){o.event.remove(this);o.removeData(this)});if(this.parentNode){this.parentNode.removeChild(this)}}},empty:function(){o(this).children().remove();while(this.firstChild){this.removeChild(this.firstChild)}}},function(E,F){o.fn[E]=function(){return this.each(F,arguments)}});function j(E,F){return E[0]&&parseInt(o.curCSS(E[0],F,true),10)||0}var h="jQuery"+e(),v=0,A={};o.extend({cache:{},data:function(F,E,G){F=F==l?A:F;var H=F[h];if(!H){H=F[h]=++v}if(E&&!o.cache[H]){o.cache[H]={}}if(G!==g){o.cache[H][E]=G}return E?o.cache[H][E]:H},removeData:function(F,E){F=F==l?A:F;var H=F[h];if(E){if(o.cache[H]){delete o.cache[H][E];E="";for(E in o.cache[H]){break}if(!E){o.removeData(F)}}}else{try{delete F[h]}catch(G){if(F.removeAttribute){F.removeAttribute(h)}}delete o.cache[H]}},queue:function(F,E,H){if(F){E=(E||"fx")+"queue";var G=o.data(F,E);if(!G||o.isArray(H)){G=o.data(F,E,o.makeArray(H))}else{if(H){G.push(H)}}}return G},dequeue:function(H,G){var E=o.queue(H,G),F=E.shift();if(!G||G==="fx"){F=E[0]}if(F!==g){F.call(H)}}});o.fn.extend({data:function(E,G){var H=E.split(".");H[1]=H[1]?"."+H[1]:"";if(G===g){var F=this.triggerHandler("getData"+H[1]+"!",[H[0]]);if(F===g&&this.length){F=o.data(this[0],E)}return F===g&&H[1]?this.data(H[0]):F}else{return this.trigger("setData"+H[1]+"!",[H[0],G]).each(function(){o.data(this,E,G)})}},removeData:function(E){return this.each(function(){o.removeData(this,E)})},queue:function(E,F){if(typeof E!=="string"){F=E;E="fx"}if(F===g){return o.queue(this[0],E)}return this.each(function(){var G=o.queue(this,E,F);if(E=="fx"&&G.length==1){G[0].call(this)}})},dequeue:function(E){return this.each(function(){o.dequeue(this,E)})}});
/*
 * Sizzle CSS Selector Engine - v0.9.3
 *  Copyright 2009, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){var R=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,L=0,H=Object.prototype.toString;var F=function(Y,U,ab,ac){ab=ab||[];U=U||document;if(U.nodeType!==1&&U.nodeType!==9){return[]}if(!Y||typeof Y!=="string"){return ab}var Z=[],W,af,ai,T,ad,V,X=true;R.lastIndex=0;while((W=R.exec(Y))!==null){Z.push(W[1]);if(W[2]){V=RegExp.rightContext;break}}if(Z.length>1&&M.exec(Y)){if(Z.length===2&&I.relative[Z[0]]){af=J(Z[0]+Z[1],U)}else{af=I.relative[Z[0]]?[U]:F(Z.shift(),U);while(Z.length){Y=Z.shift();if(I.relative[Y]){Y+=Z.shift()}af=J(Y,af)}}}else{var ae=ac?{expr:Z.pop(),set:E(ac)}:F.find(Z.pop(),Z.length===1&&U.parentNode?U.parentNode:U,Q(U));af=F.filter(ae.expr,ae.set);if(Z.length>0){ai=E(af)}else{X=false}while(Z.length){var ah=Z.pop(),ag=ah;if(!I.relative[ah]){ah=""}else{ag=Z.pop()}if(ag==null){ag=U}I.relative[ah](ai,ag,Q(U))}}if(!ai){ai=af}if(!ai){throw"Syntax error, unrecognized expression: "+(ah||Y)}if(H.call(ai)==="[object Array]"){if(!X){ab.push.apply(ab,ai)}else{if(U.nodeType===1){for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&(ai[aa]===true||ai[aa].nodeType===1&&K(U,ai[aa]))){ab.push(af[aa])}}}else{for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&ai[aa].nodeType===1){ab.push(af[aa])}}}}}else{E(ai,ab)}if(V){F(V,U,ab,ac);if(G){hasDuplicate=false;ab.sort(G);if(hasDuplicate){for(var aa=1;aa<ab.length;aa++){if(ab[aa]===ab[aa-1]){ab.splice(aa--,1)}}}}}return ab};F.matches=function(T,U){return F(T,null,null,U)};F.find=function(aa,T,ab){var Z,X;if(!aa){return[]}for(var W=0,V=I.order.length;W<V;W++){var Y=I.order[W],X;if((X=I.match[Y].exec(aa))){var U=RegExp.leftContext;if(U.substr(U.length-1)!=="\\"){X[1]=(X[1]||"").replace(/\\/g,"");Z=I.find[Y](X,T,ab);if(Z!=null){aa=aa.replace(I.match[Y],"");break}}}}if(!Z){Z=T.getElementsByTagName("*")}return{set:Z,expr:aa}};F.filter=function(ad,ac,ag,W){var V=ad,ai=[],aa=ac,Y,T,Z=ac&&ac[0]&&Q(ac[0]);while(ad&&ac.length){for(var ab in I.filter){if((Y=I.match[ab].exec(ad))!=null){var U=I.filter[ab],ah,af;T=false;if(aa==ai){ai=[]}if(I.preFilter[ab]){Y=I.preFilter[ab](Y,aa,ag,ai,W,Z);if(!Y){T=ah=true}else{if(Y===true){continue}}}if(Y){for(var X=0;(af=aa[X])!=null;X++){if(af){ah=U(af,Y,X,aa);var ae=W^!!ah;if(ag&&ah!=null){if(ae){T=true}else{aa[X]=false}}else{if(ae){ai.push(af);T=true}}}}}if(ah!==g){if(!ag){aa=ai}ad=ad.replace(I.match[ab],"");if(!T){return[]}break}}}if(ad==V){if(T==null){throw"Syntax error, unrecognized expression: "+ad}else{break}}V=ad}return aa};var I=F.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(T){return T.getAttribute("href")}},relative:{"+":function(aa,T,Z){var X=typeof T==="string",ab=X&&!/\W/.test(T),Y=X&&!ab;if(ab&&!Z){T=T.toUpperCase()}for(var W=0,V=aa.length,U;W<V;W++){if((U=aa[W])){while((U=U.previousSibling)&&U.nodeType!==1){}aa[W]=Y||U&&U.nodeName===T?U||false:U===T}}if(Y){F.filter(T,aa,true)}},">":function(Z,U,aa){var X=typeof U==="string";if(X&&!/\W/.test(U)){U=aa?U:U.toUpperCase();for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){var W=Y.parentNode;Z[V]=W.nodeName===U?W:false}}}else{for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){Z[V]=X?Y.parentNode:Y.parentNode===U}}if(X){F.filter(U,Z,true)}}},"":function(W,U,Y){var V=L++,T=S;if(!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("parentNode",U,V,W,X,Y)},"~":function(W,U,Y){var V=L++,T=S;if(typeof U==="string"&&!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("previousSibling",U,V,W,X,Y)}},find:{ID:function(U,V,W){if(typeof V.getElementById!=="undefined"&&!W){var T=V.getElementById(U[1]);return T?[T]:[]}},NAME:function(V,Y,Z){if(typeof Y.getElementsByName!=="undefined"){var U=[],X=Y.getElementsByName(V[1]);for(var W=0,T=X.length;W<T;W++){if(X[W].getAttribute("name")===V[1]){U.push(X[W])}}return U.length===0?null:U}},TAG:function(T,U){return U.getElementsByTagName(T[1])}},preFilter:{CLASS:function(W,U,V,T,Z,aa){W=" "+W[1].replace(/\\/g,"")+" ";if(aa){return W}for(var X=0,Y;(Y=U[X])!=null;X++){if(Y){if(Z^(Y.className&&(" "+Y.className+" ").indexOf(W)>=0)){if(!V){T.push(Y)}}else{if(V){U[X]=false}}}}return false},ID:function(T){return T[1].replace(/\\/g,"")},TAG:function(U,T){for(var V=0;T[V]===false;V++){}return T[V]&&Q(T[V])?U[1]:U[1].toUpperCase()},CHILD:function(T){if(T[1]=="nth"){var U=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(T[2]=="even"&&"2n"||T[2]=="odd"&&"2n+1"||!/\D/.test(T[2])&&"0n+"+T[2]||T[2]);T[2]=(U[1]+(U[2]||1))-0;T[3]=U[3]-0}T[0]=L++;return T},ATTR:function(X,U,V,T,Y,Z){var W=X[1].replace(/\\/g,"");if(!Z&&I.attrMap[W]){X[1]=I.attrMap[W]}if(X[2]==="~="){X[4]=" "+X[4]+" "}return X},PSEUDO:function(X,U,V,T,Y){if(X[1]==="not"){if(X[3].match(R).length>1||/^\w/.test(X[3])){X[3]=F(X[3],null,null,U)}else{var W=F.filter(X[3],U,V,true^Y);if(!V){T.push.apply(T,W)}return false}}else{if(I.match.POS.test(X[0])||I.match.CHILD.test(X[0])){return true}}return X},POS:function(T){T.unshift(true);return T}},filters:{enabled:function(T){return T.disabled===false&&T.type!=="hidden"},disabled:function(T){return T.disabled===true},checked:function(T){return T.checked===true},selected:function(T){T.parentNode.selectedIndex;return T.selected===true},parent:function(T){return !!T.firstChild},empty:function(T){return !T.firstChild},has:function(V,U,T){return !!F(T[3],V).length},header:function(T){return/h\d/i.test(T.nodeName)},text:function(T){return"text"===T.type},radio:function(T){return"radio"===T.type},checkbox:function(T){return"checkbox"===T.type},file:function(T){return"file"===T.type},password:function(T){return"password"===T.type},submit:function(T){return"submit"===T.type},image:function(T){return"image"===T.type},reset:function(T){return"reset"===T.type},button:function(T){return"button"===T.type||T.nodeName.toUpperCase()==="BUTTON"},input:function(T){return/input|select|textarea|button/i.test(T.nodeName)}},setFilters:{first:function(U,T){return T===0},last:function(V,U,T,W){return U===W.length-1},even:function(U,T){return T%2===0},odd:function(U,T){return T%2===1},lt:function(V,U,T){return U<T[3]-0},gt:function(V,U,T){return U>T[3]-0},nth:function(V,U,T){return T[3]-0==U},eq:function(V,U,T){return T[3]-0==U}},filter:{PSEUDO:function(Z,V,W,aa){var U=V[1],X=I.filters[U];if(X){return X(Z,W,V,aa)}else{if(U==="contains"){return(Z.textContent||Z.innerText||"").indexOf(V[3])>=0}else{if(U==="not"){var Y=V[3];for(var W=0,T=Y.length;W<T;W++){if(Y[W]===Z){return false}}return true}}}},CHILD:function(T,W){var Z=W[1],U=T;switch(Z){case"only":case"first":while(U=U.previousSibling){if(U.nodeType===1){return false}}if(Z=="first"){return true}U=T;case"last":while(U=U.nextSibling){if(U.nodeType===1){return false}}return true;case"nth":var V=W[2],ac=W[3];if(V==1&&ac==0){return true}var Y=W[0],ab=T.parentNode;if(ab&&(ab.sizcache!==Y||!T.nodeIndex)){var X=0;for(U=ab.firstChild;U;U=U.nextSibling){if(U.nodeType===1){U.nodeIndex=++X}}ab.sizcache=Y}var aa=T.nodeIndex-ac;if(V==0){return aa==0}else{return(aa%V==0&&aa/V>=0)}}},ID:function(U,T){return U.nodeType===1&&U.getAttribute("id")===T},TAG:function(U,T){return(T==="*"&&U.nodeType===1)||U.nodeName===T},CLASS:function(U,T){return(" "+(U.className||U.getAttribute("class"))+" ").indexOf(T)>-1},ATTR:function(Y,W){var V=W[1],T=I.attrHandle[V]?I.attrHandle[V](Y):Y[V]!=null?Y[V]:Y.getAttribute(V),Z=T+"",X=W[2],U=W[4];return T==null?X==="!=":X==="="?Z===U:X==="*="?Z.indexOf(U)>=0:X==="~="?(" "+Z+" ").indexOf(U)>=0:!U?Z&&T!==false:X==="!="?Z!=U:X==="^="?Z.indexOf(U)===0:X==="$="?Z.substr(Z.length-U.length)===U:X==="|="?Z===U||Z.substr(0,U.length+1)===U+"-":false},POS:function(X,U,V,Y){var T=U[2],W=I.setFilters[T];if(W){return W(X,V,U,Y)}}}};var M=I.match.POS;for(var O in I.match){I.match[O]=RegExp(I.match[O].source+/(?![^\[]*\])(?![^\(]*\))/.source)}var E=function(U,T){U=Array.prototype.slice.call(U);if(T){T.push.apply(T,U);return T}return U};try{Array.prototype.slice.call(document.documentElement.childNodes)}catch(N){E=function(X,W){var U=W||[];if(H.call(X)==="[object Array]"){Array.prototype.push.apply(U,X)}else{if(typeof X.length==="number"){for(var V=0,T=X.length;V<T;V++){U.push(X[V])}}else{for(var V=0;X[V];V++){U.push(X[V])}}}return U}}var G;if(document.documentElement.compareDocumentPosition){G=function(U,T){var V=U.compareDocumentPosition(T)&4?-1:U===T?0:1;if(V===0){hasDuplicate=true}return V}}else{if("sourceIndex" in document.documentElement){G=function(U,T){var V=U.sourceIndex-T.sourceIndex;if(V===0){hasDuplicate=true}return V}}else{if(document.createRange){G=function(W,U){var V=W.ownerDocument.createRange(),T=U.ownerDocument.createRange();V.selectNode(W);V.collapse(true);T.selectNode(U);T.collapse(true);var X=V.compareBoundaryPoints(Range.START_TO_END,T);if(X===0){hasDuplicate=true}return X}}}}(function(){var U=document.createElement("form"),V="script"+(new Date).getTime();U.innerHTML="<input name='"+V+"'/>";var T=document.documentElement;T.insertBefore(U,T.firstChild);if(!!document.getElementById(V)){I.find.ID=function(X,Y,Z){if(typeof Y.getElementById!=="undefined"&&!Z){var W=Y.getElementById(X[1]);return W?W.id===X[1]||typeof W.getAttributeNode!=="undefined"&&W.getAttributeNode("id").nodeValue===X[1]?[W]:g:[]}};I.filter.ID=function(Y,W){var X=typeof Y.getAttributeNode!=="undefined"&&Y.getAttributeNode("id");return Y.nodeType===1&&X&&X.nodeValue===W}}T.removeChild(U)})();(function(){var T=document.createElement("div");T.appendChild(document.createComment(""));if(T.getElementsByTagName("*").length>0){I.find.TAG=function(U,Y){var X=Y.getElementsByTagName(U[1]);if(U[1]==="*"){var W=[];for(var V=0;X[V];V++){if(X[V].nodeType===1){W.push(X[V])}}X=W}return X}}T.innerHTML="<a href='#'></a>";if(T.firstChild&&typeof T.firstChild.getAttribute!=="undefined"&&T.firstChild.getAttribute("href")!=="#"){I.attrHandle.href=function(U){return U.getAttribute("href",2)}}})();if(document.querySelectorAll){(function(){var T=F,U=document.createElement("div");U.innerHTML="<p class='TEST'></p>";if(U.querySelectorAll&&U.querySelectorAll(".TEST").length===0){return}F=function(Y,X,V,W){X=X||document;if(!W&&X.nodeType===9&&!Q(X)){try{return E(X.querySelectorAll(Y),V)}catch(Z){}}return T(Y,X,V,W)};F.find=T.find;F.filter=T.filter;F.selectors=T.selectors;F.matches=T.matches})()}if(document.getElementsByClassName&&document.documentElement.getElementsByClassName){(function(){var T=document.createElement("div");T.innerHTML="<div class='test e'></div><div class='test'></div>";if(T.getElementsByClassName("e").length===0){return}T.lastChild.className="e";if(T.getElementsByClassName("e").length===1){return}I.order.splice(1,0,"CLASS");I.find.CLASS=function(U,V,W){if(typeof V.getElementsByClassName!=="undefined"&&!W){return V.getElementsByClassName(U[1])}}})()}function P(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1&&!ac){T.sizcache=Y;T.sizset=W}if(T.nodeName===Z){X=T;break}T=T[U]}ad[W]=X}}}function S(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1){if(!ac){T.sizcache=Y;T.sizset=W}if(typeof Z!=="string"){if(T===Z){X=true;break}}else{if(F.filter(Z,[T]).length>0){X=T;break}}}T=T[U]}ad[W]=X}}}var K=document.compareDocumentPosition?function(U,T){return U.compareDocumentPosition(T)&16}:function(U,T){return U!==T&&(U.contains?U.contains(T):true)};var Q=function(T){return T.nodeType===9&&T.documentElement.nodeName!=="HTML"||!!T.ownerDocument&&Q(T.ownerDocument)};var J=function(T,aa){var W=[],X="",Y,V=aa.nodeType?[aa]:aa;while((Y=I.match.PSEUDO.exec(T))){X+=Y[0];T=T.replace(I.match.PSEUDO,"")}T=I.relative[T]?T+"*":T;for(var Z=0,U=V.length;Z<U;Z++){F(T,V[Z],W)}return F.filter(X,W)};o.find=F;o.filter=F.filter;o.expr=F.selectors;o.expr[":"]=o.expr.filters;F.selectors.filters.hidden=function(T){return T.offsetWidth===0||T.offsetHeight===0};F.selectors.filters.visible=function(T){return T.offsetWidth>0||T.offsetHeight>0};F.selectors.filters.animated=function(T){return o.grep(o.timers,function(U){return T===U.elem}).length};o.multiFilter=function(V,T,U){if(U){V=":not("+V+")"}return F.matches(V,T)};o.dir=function(V,U){var T=[],W=V[U];while(W&&W!=document){if(W.nodeType==1){T.push(W)}W=W[U]}return T};o.nth=function(X,T,V,W){T=T||1;var U=0;for(;X;X=X[V]){if(X.nodeType==1&&++U==T){break}}return X};o.sibling=function(V,U){var T=[];for(;V;V=V.nextSibling){if(V.nodeType==1&&V!=U){T.push(V)}}return T};return;l.Sizzle=F})();o.event={add:function(I,F,H,K){if(I.nodeType==3||I.nodeType==8){return}if(I.setInterval&&I!=l){I=l}if(!H.guid){H.guid=this.guid++}if(K!==g){var G=H;H=this.proxy(G);H.data=K}var E=o.data(I,"events")||o.data(I,"events",{}),J=o.data(I,"handle")||o.data(I,"handle",function(){return typeof o!=="undefined"&&!o.event.triggered?o.event.handle.apply(arguments.callee.elem,arguments):g});J.elem=I;o.each(F.split(/\s+/),function(M,N){var O=N.split(".");N=O.shift();H.type=O.slice().sort().join(".");var L=E[N];if(o.event.specialAll[N]){o.event.specialAll[N].setup.call(I,K,O)}if(!L){L=E[N]={};if(!o.event.special[N]||o.event.special[N].setup.call(I,K,O)===false){if(I.addEventListener){I.addEventListener(N,J,false)}else{if(I.attachEvent){I.attachEvent("on"+N,J)}}}}L[H.guid]=H;o.event.global[N]=true});I=null},guid:1,global:{},remove:function(K,H,J){if(K.nodeType==3||K.nodeType==8){return}var G=o.data(K,"events"),F,E;if(G){if(H===g||(typeof H==="string"&&H.charAt(0)==".")){for(var I in G){this.remove(K,I+(H||""))}}else{if(H.type){J=H.handler;H=H.type}o.each(H.split(/\s+/),function(M,O){var Q=O.split(".");O=Q.shift();var N=RegExp("(^|\\.)"+Q.slice().sort().join(".*\\.")+"(\\.|$)");if(G[O]){if(J){delete G[O][J.guid]}else{for(var P in G[O]){if(N.test(G[O][P].type)){delete G[O][P]}}}if(o.event.specialAll[O]){o.event.specialAll[O].teardown.call(K,Q)}for(F in G[O]){break}if(!F){if(!o.event.special[O]||o.event.special[O].teardown.call(K,Q)===false){if(K.removeEventListener){K.removeEventListener(O,o.data(K,"handle"),false)}else{if(K.detachEvent){K.detachEvent("on"+O,o.data(K,"handle"))}}}F=null;delete G[O]}}})}for(F in G){break}if(!F){var L=o.data(K,"handle");if(L){L.elem=null}o.removeData(K,"events");o.removeData(K,"handle")}}},trigger:function(I,K,H,E){var G=I.type||I;if(!E){I=typeof I==="object"?I[h]?I:o.extend(o.Event(G),I):o.Event(G);if(G.indexOf("!")>=0){I.type=G=G.slice(0,-1);I.exclusive=true}if(!H){I.stopPropagation();if(this.global[G]){o.each(o.cache,function(){if(this.events&&this.events[G]){o.event.trigger(I,K,this.handle.elem)}})}}if(!H||H.nodeType==3||H.nodeType==8){return g}I.result=g;I.target=H;K=o.makeArray(K);K.unshift(I)}I.currentTarget=H;var J=o.data(H,"handle");if(J){J.apply(H,K)}if((!H[G]||(o.nodeName(H,"a")&&G=="click"))&&H["on"+G]&&H["on"+G].apply(H,K)===false){I.result=false}if(!E&&H[G]&&!I.isDefaultPrevented()&&!(o.nodeName(H,"a")&&G=="click")){this.triggered=true;try{H[G]()}catch(L){}}this.triggered=false;if(!I.isPropagationStopped()){var F=H.parentNode||H.ownerDocument;if(F){o.event.trigger(I,K,F,true)}}},handle:function(K){var J,E;K=arguments[0]=o.event.fix(K||l.event);K.currentTarget=this;var L=K.type.split(".");K.type=L.shift();J=!L.length&&!K.exclusive;var I=RegExp("(^|\\.)"+L.slice().sort().join(".*\\.")+"(\\.|$)");E=(o.data(this,"events")||{})[K.type];for(var G in E){var H=E[G];if(J||I.test(H.type)){K.handler=H;K.data=H.data;var F=H.apply(this,arguments);if(F!==g){K.result=F;if(F===false){K.preventDefault();K.stopPropagation()}}if(K.isImmediatePropagationStopped()){break}}}},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(H){if(H[h]){return H}var F=H;H=o.Event(F);for(var G=this.props.length,J;G;){J=this.props[--G];H[J]=F[J]}if(!H.target){H.target=H.srcElement||document}if(H.target.nodeType==3){H.target=H.target.parentNode}if(!H.relatedTarget&&H.fromElement){H.relatedTarget=H.fromElement==H.target?H.toElement:H.fromElement}if(H.pageX==null&&H.clientX!=null){var I=document.documentElement,E=document.body;H.pageX=H.clientX+(I&&I.scrollLeft||E&&E.scrollLeft||0)-(I.clientLeft||0);H.pageY=H.clientY+(I&&I.scrollTop||E&&E.scrollTop||0)-(I.clientTop||0)}if(!H.which&&((H.charCode||H.charCode===0)?H.charCode:H.keyCode)){H.which=H.charCode||H.keyCode}if(!H.metaKey&&H.ctrlKey){H.metaKey=H.ctrlKey}if(!H.which&&H.button){H.which=(H.button&1?1:(H.button&2?3:(H.button&4?2:0)))}return H},proxy:function(F,E){E=E||function(){return F.apply(this,arguments)};E.guid=F.guid=F.guid||E.guid||this.guid++;return E},special:{ready:{setup:B,teardown:function(){}}},specialAll:{live:{setup:function(E,F){o.event.add(this,F[0],c)},teardown:function(G){if(G.length){var E=0,F=RegExp("(^|\\.)"+G[0]+"(\\.|$)");o.each((o.data(this,"events").live||{}),function(){if(F.test(this.type)){E++}});if(E<1){o.event.remove(this,G[0],c)}}}}}};o.Event=function(E){if(!this.preventDefault){return new o.Event(E)}if(E&&E.type){this.originalEvent=E;this.type=E.type}else{this.type=E}this.timeStamp=e();this[h]=true};function k(){return false}function u(){return true}o.Event.prototype={preventDefault:function(){this.isDefaultPrevented=u;var E=this.originalEvent;if(!E){return}if(E.preventDefault){E.preventDefault()}E.returnValue=false},stopPropagation:function(){this.isPropagationStopped=u;var E=this.originalEvent;if(!E){return}if(E.stopPropagation){E.stopPropagation()}E.cancelBubble=true},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=u;this.stopPropagation()},isDefaultPrevented:k,isPropagationStopped:k,isImmediatePropagationStopped:k};var a=function(F){var E=F.relatedTarget;while(E&&E!=this){try{E=E.parentNode}catch(G){E=this}}if(E!=this){F.type=F.data;o.event.handle.apply(this,arguments)}};o.each({mouseover:"mouseenter",mouseout:"mouseleave"},function(F,E){o.event.special[E]={setup:function(){o.event.add(this,F,a,E)},teardown:function(){o.event.remove(this,F,a)}}});o.fn.extend({bind:function(F,G,E){return F=="unload"?this.one(F,G,E):this.each(function(){o.event.add(this,F,E||G,E&&G)})},one:function(G,H,F){var E=o.event.proxy(F||H,function(I){o(this).unbind(I,E);return(F||H).apply(this,arguments)});return this.each(function(){o.event.add(this,G,E,F&&H)})},unbind:function(F,E){return this.each(function(){o.event.remove(this,F,E)})},trigger:function(E,F){return this.each(function(){o.event.trigger(E,F,this)})},triggerHandler:function(E,G){if(this[0]){var F=o.Event(E);F.preventDefault();F.stopPropagation();o.event.trigger(F,G,this[0]);return F.result}},toggle:function(G){var E=arguments,F=1;while(F<E.length){o.event.proxy(G,E[F++])}return this.click(o.event.proxy(G,function(H){this.lastToggle=(this.lastToggle||0)%F;H.preventDefault();return E[this.lastToggle++].apply(this,arguments)||false}))},hover:function(E,F){return this.mouseenter(E).mouseleave(F)},ready:function(E){B();if(o.isReady){E.call(document,o)}else{o.readyList.push(E)}return this},live:function(G,F){var E=o.event.proxy(F);E.guid+=this.selector+G;o(document).bind(i(G,this.selector),this.selector,E);return this},die:function(F,E){o(document).unbind(i(F,this.selector),E?{guid:E.guid+this.selector+F}:null);return this}});function c(H){var E=RegExp("(^|\\.)"+H.type+"(\\.|$)"),G=true,F=[];o.each(o.data(this,"events").live||[],function(I,J){if(E.test(J.type)){var K=o(H.target).closest(J.data)[0];if(K){F.push({elem:K,fn:J})}}});F.sort(function(J,I){return o.data(J.elem,"closest")-o.data(I.elem,"closest")});o.each(F,function(){if(this.fn.call(this.elem,H,this.fn.data)===false){return(G=false)}});return G}function i(F,E){return["live",F,E.replace(/\./g,"`").replace(/ /g,"|")].join(".")}o.extend({isReady:false,readyList:[],ready:function(){if(!o.isReady){o.isReady=true;if(o.readyList){o.each(o.readyList,function(){this.call(document,o)});o.readyList=null}o(document).triggerHandler("ready")}}});var x=false;function B(){if(x){return}x=true;if(document.addEventListener){document.addEventListener("DOMContentLoaded",function(){document.removeEventListener("DOMContentLoaded",arguments.callee,false);o.ready()},false)}else{if(document.attachEvent){document.attachEvent("onreadystatechange",function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",arguments.callee);o.ready()}});if(document.documentElement.doScroll&&l==l.top){(function(){if(o.isReady){return}try{document.documentElement.doScroll("left")}catch(E){setTimeout(arguments.callee,0);return}o.ready()})()}}}o.event.add(l,"load",o.ready)}o.each(("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error").split(","),function(F,E){o.fn[E]=function(G){return G?this.bind(E,G):this.trigger(E)}});o(l).bind("unload",function(){for(var E in o.cache){if(E!=1&&o.cache[E].handle){o.event.remove(o.cache[E].handle.elem)}}});(function(){o.support={};var F=document.documentElement,G=document.createElement("script"),K=document.createElement("div"),J="script"+(new Date).getTime();K.style.display="none";K.innerHTML='   <link/><table></table><a href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>';var H=K.getElementsByTagName("*"),E=K.getElementsByTagName("a")[0];if(!H||!H.length||!E){return}o.support={leadingWhitespace:K.firstChild.nodeType==3,tbody:!K.getElementsByTagName("tbody").length,objectAll:!!K.getElementsByTagName("object")[0].getElementsByTagName("*").length,htmlSerialize:!!K.getElementsByTagName("link").length,style:/red/.test(E.getAttribute("style")),hrefNormalized:E.getAttribute("href")==="/a",opacity:E.style.opacity==="0.5",cssFloat:!!E.style.cssFloat,scriptEval:false,noCloneEvent:true,boxModel:null};G.type="text/javascript";try{G.appendChild(document.createTextNode("window."+J+"=1;"))}catch(I){}F.insertBefore(G,F.firstChild);if(l[J]){o.support.scriptEval=true;delete l[J]}F.removeChild(G);if(K.attachEvent&&K.fireEvent){K.attachEvent("onclick",function(){o.support.noCloneEvent=false;K.detachEvent("onclick",arguments.callee)});K.cloneNode(true).fireEvent("onclick")}o(function(){var L=document.createElement("div");L.style.width=L.style.paddingLeft="1px";document.body.appendChild(L);o.boxModel=o.support.boxModel=L.offsetWidth===2;document.body.removeChild(L).style.display="none"})})();var w=o.support.cssFloat?"cssFloat":"styleFloat";o.props={"for":"htmlFor","class":"className","float":w,cssFloat:w,styleFloat:w,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",tabindex:"tabIndex"};o.fn.extend({_load:o.fn.load,load:function(G,J,K){if(typeof G!=="string"){return this._load(G)}var I=G.indexOf(" ");if(I>=0){var E=G.slice(I,G.length);G=G.slice(0,I)}var H="GET";if(J){if(o.isFunction(J)){K=J;J=null}else{if(typeof J==="object"){J=o.param(J);H="POST"}}}var F=this;o.ajax({url:G,type:H,dataType:"html",data:J,complete:function(M,L){if(L=="success"||L=="notmodified"){F.html(E?o("<div/>").append(M.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(E):M.responseText)}if(K){F.each(K,[M.responseText,L,M])}}});return this},serialize:function(){return o.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?o.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password|search/i.test(this.type))}).map(function(E,F){var G=o(this).val();return G==null?null:o.isArray(G)?o.map(G,function(I,H){return{name:F.name,value:I}}):{name:F.name,value:G}}).get()}});o.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(E,F){o.fn[F]=function(G){return this.bind(F,G)}});var r=e();o.extend({get:function(E,G,H,F){if(o.isFunction(G)){H=G;G=null}return o.ajax({type:"GET",url:E,data:G,success:H,dataType:F})},getScript:function(E,F){return o.get(E,null,F,"script")},getJSON:function(E,F,G){return o.get(E,F,G,"json")},post:function(E,G,H,F){if(o.isFunction(G)){H=G;G={}}return o.ajax({type:"POST",url:E,data:G,success:H,dataType:F})},ajaxSetup:function(E){o.extend(o.ajaxSettings,E)},ajaxSettings:{url:location.href,global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:function(){return l.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest()},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},ajax:function(M){M=o.extend(true,M,o.extend(true,{},o.ajaxSettings,M));var W,F=/=\?(&|$)/g,R,V,G=M.type.toUpperCase();if(M.data&&M.processData&&typeof M.data!=="string"){M.data=o.param(M.data)}if(M.dataType=="jsonp"){if(G=="GET"){if(!M.url.match(F)){M.url+=(M.url.match(/\?/)?"&":"?")+(M.jsonp||"callback")+"=?"}}else{if(!M.data||!M.data.match(F)){M.data=(M.data?M.data+"&":"")+(M.jsonp||"callback")+"=?"}}M.dataType="json"}if(M.dataType=="json"&&(M.data&&M.data.match(F)||M.url.match(F))){W="jsonp"+r++;if(M.data){M.data=(M.data+"").replace(F,"="+W+"$1")}M.url=M.url.replace(F,"="+W+"$1");M.dataType="script";l[W]=function(X){V=X;I();L();l[W]=g;try{delete l[W]}catch(Y){}if(H){H.removeChild(T)}}}if(M.dataType=="script"&&M.cache==null){M.cache=false}if(M.cache===false&&G=="GET"){var E=e();var U=M.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+E+"$2");M.url=U+((U==M.url)?(M.url.match(/\?/)?"&":"?")+"_="+E:"")}if(M.data&&G=="GET"){M.url+=(M.url.match(/\?/)?"&":"?")+M.data;M.data=null}if(M.global&&!o.active++){o.event.trigger("ajaxStart")}var Q=/^(\w+:)?\/\/([^\/?#]+)/.exec(M.url);if(M.dataType=="script"&&G=="GET"&&Q&&(Q[1]&&Q[1]!=location.protocol||Q[2]!=location.host)){var H=document.getElementsByTagName("head")[0];var T=document.createElement("script");T.src=M.url;if(M.scriptCharset){T.charset=M.scriptCharset}if(!W){var O=false;T.onload=T.onreadystatechange=function(){if(!O&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){O=true;I();L();T.onload=T.onreadystatechange=null;H.removeChild(T)}}}H.appendChild(T);return g}var K=false;var J=M.xhr();if(M.username){J.open(G,M.url,M.async,M.username,M.password)}else{J.open(G,M.url,M.async)}try{if(M.data){J.setRequestHeader("Content-Type",M.contentType)}if(M.ifModified){J.setRequestHeader("If-Modified-Since",o.lastModified[M.url]||"Thu, 01 Jan 1970 00:00:00 GMT")}J.setRequestHeader("X-Requested-With","XMLHttpRequest");J.setRequestHeader("Accept",M.dataType&&M.accepts[M.dataType]?M.accepts[M.dataType]+", */*":M.accepts._default)}catch(S){}if(M.beforeSend&&M.beforeSend(J,M)===false){if(M.global&&!--o.active){o.event.trigger("ajaxStop")}J.abort();return false}if(M.global){o.event.trigger("ajaxSend",[J,M])}var N=function(X){if(J.readyState==0){if(P){clearInterval(P);P=null;if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}}else{if(!K&&J&&(J.readyState==4||X=="timeout")){K=true;if(P){clearInterval(P);P=null}R=X=="timeout"?"timeout":!o.httpSuccess(J)?"error":M.ifModified&&o.httpNotModified(J,M.url)?"notmodified":"success";if(R=="success"){try{V=o.httpData(J,M.dataType,M)}catch(Z){R="parsererror"}}if(R=="success"){var Y;try{Y=J.getResponseHeader("Last-Modified")}catch(Z){}if(M.ifModified&&Y){o.lastModified[M.url]=Y}if(!W){I()}}else{o.handleError(M,J,R)}L();if(X){J.abort()}if(M.async){J=null}}}};if(M.async){var P=setInterval(N,13);if(M.timeout>0){setTimeout(function(){if(J&&!K){N("timeout")}},M.timeout)}}try{J.send(M.data)}catch(S){o.handleError(M,J,null,S)}if(!M.async){N()}function I(){if(M.success){M.success(V,R)}if(M.global){o.event.trigger("ajaxSuccess",[J,M])}}function L(){if(M.complete){M.complete(J,R)}if(M.global){o.event.trigger("ajaxComplete",[J,M])}if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}return J},handleError:function(F,H,E,G){if(F.error){F.error(H,E,G)}if(F.global){o.event.trigger("ajaxError",[H,F,G])}},active:0,httpSuccess:function(F){try{return !F.status&&location.protocol=="file:"||(F.status>=200&&F.status<300)||F.status==304||F.status==1223}catch(E){}return false},httpNotModified:function(G,E){try{var H=G.getResponseHeader("Last-Modified");return G.status==304||H==o.lastModified[E]}catch(F){}return false},httpData:function(J,H,G){var F=J.getResponseHeader("content-type"),E=H=="xml"||!H&&F&&F.indexOf("xml")>=0,I=E?J.responseXML:J.responseText;if(E&&I.documentElement.tagName=="parsererror"){throw"parsererror"}if(G&&G.dataFilter){I=G.dataFilter(I,H)}if(typeof I==="string"){if(H=="script"){o.globalEval(I)}if(H=="json"){I=l["eval"]("("+I+")")}}return I},param:function(E){var G=[];function H(I,J){G[G.length]=encodeURIComponent(I)+"="+encodeURIComponent(J)}if(o.isArray(E)||E.jquery){o.each(E,function(){H(this.name,this.value)})}else{for(var F in E){if(o.isArray(E[F])){o.each(E[F],function(){H(F,this)})}else{H(F,o.isFunction(E[F])?E[F]():E[F])}}}return G.join("&").replace(/%20/g,"+")}});var m={},n,d=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];function t(F,E){var G={};o.each(d.concat.apply([],d.slice(0,E)),function(){G[this]=F});return G}o.fn.extend({show:function(J,L){if(J){return this.animate(t("show",3),J,L)}else{for(var H=0,F=this.length;H<F;H++){var E=o.data(this[H],"olddisplay");this[H].style.display=E||"";if(o.css(this[H],"display")==="none"){var G=this[H].tagName,K;if(m[G]){K=m[G]}else{var I=o("<"+G+" />").appendTo("body");K=I.css("display");if(K==="none"){K="block"}I.remove();m[G]=K}o.data(this[H],"olddisplay",K)}}for(var H=0,F=this.length;H<F;H++){this[H].style.display=o.data(this[H],"olddisplay")||""}return this}},hide:function(H,I){if(H){return this.animate(t("hide",3),H,I)}else{for(var G=0,F=this.length;G<F;G++){var E=o.data(this[G],"olddisplay");if(!E&&E!=="none"){o.data(this[G],"olddisplay",o.css(this[G],"display"))}}for(var G=0,F=this.length;G<F;G++){this[G].style.display="none"}return this}},_toggle:o.fn.toggle,toggle:function(G,F){var E=typeof G==="boolean";return o.isFunction(G)&&o.isFunction(F)?this._toggle.apply(this,arguments):G==null||E?this.each(function(){var H=E?G:o(this).is(":hidden");o(this)[H?"show":"hide"]()}):this.animate(t("toggle",3),G,F)},fadeTo:function(E,G,F){return this.animate({opacity:G},E,F)},animate:function(I,F,H,G){var E=o.speed(F,H,G);return this[E.queue===false?"each":"queue"](function(){var K=o.extend({},E),M,L=this.nodeType==1&&o(this).is(":hidden"),J=this;for(M in I){if(I[M]=="hide"&&L||I[M]=="show"&&!L){return K.complete.call(this)}if((M=="height"||M=="width")&&this.style){K.display=o.css(this,"display");K.overflow=this.style.overflow}}if(K.overflow!=null){this.style.overflow="hidden"}K.curAnim=o.extend({},I);o.each(I,function(O,S){var R=new o.fx(J,K,O);if(/toggle|show|hide/.test(S)){R[S=="toggle"?L?"show":"hide":S](I)}else{var Q=S.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),T=R.cur(true)||0;if(Q){var N=parseFloat(Q[2]),P=Q[3]||"px";if(P!="px"){J.style[O]=(N||1)+P;T=((N||1)/R.cur(true))*T;J.style[O]=T+P}if(Q[1]){N=((Q[1]=="-="?-1:1)*N)+T}R.custom(T,N,P)}else{R.custom(T,S,"")}}});return true})},stop:function(F,E){var G=o.timers;if(F){this.queue([])}this.each(function(){for(var H=G.length-1;H>=0;H--){if(G[H].elem==this){if(E){G[H](true)}G.splice(H,1)}}});if(!E){this.dequeue()}return this}});o.each({slideDown:t("show",1),slideUp:t("hide",1),slideToggle:t("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"}},function(E,F){o.fn[E]=function(G,H){return this.animate(F,G,H)}});o.extend({speed:function(G,H,F){var E=typeof G==="object"?G:{complete:F||!F&&H||o.isFunction(G)&&G,duration:G,easing:F&&H||H&&!o.isFunction(H)&&H};E.duration=o.fx.off?0:typeof E.duration==="number"?E.duration:o.fx.speeds[E.duration]||o.fx.speeds._default;E.old=E.complete;E.complete=function(){if(E.queue!==false){o(this).dequeue()}if(o.isFunction(E.old)){E.old.call(this)}};return E},easing:{linear:function(G,H,E,F){return E+F*G},swing:function(G,H,E,F){return((-Math.cos(G*Math.PI)/2)+0.5)*F+E}},timers:[],fx:function(F,E,G){this.options=E;this.elem=F;this.prop=G;if(!E.orig){E.orig={}}}});o.fx.prototype={update:function(){if(this.options.step){this.options.step.call(this.elem,this.now,this)}(o.fx.step[this.prop]||o.fx.step._default)(this);if((this.prop=="height"||this.prop=="width")&&this.elem.style){this.elem.style.display="block"}},cur:function(F){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null)){return this.elem[this.prop]}var E=parseFloat(o.css(this.elem,this.prop,F));return E&&E>-10000?E:parseFloat(o.curCSS(this.elem,this.prop))||0},custom:function(I,H,G){this.startTime=e();this.start=I;this.end=H;this.unit=G||this.unit||"px";this.now=this.start;this.pos=this.state=0;var E=this;function F(J){return E.step(J)}F.elem=this.elem;if(F()&&o.timers.push(F)&&!n){n=setInterval(function(){var K=o.timers;for(var J=0;J<K.length;J++){if(!K[J]()){K.splice(J--,1)}}if(!K.length){clearInterval(n);n=g}},13)}},show:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.show=true;this.custom(this.prop=="width"||this.prop=="height"?1:0,this.cur());o(this.elem).show()},hide:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.hide=true;this.custom(this.cur(),0)},step:function(H){var G=e();if(H||G>=this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;var E=true;for(var F in this.options.curAnim){if(this.options.curAnim[F]!==true){E=false}}if(E){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;this.elem.style.display=this.options.display;if(o.css(this.elem,"display")=="none"){this.elem.style.display="block"}}if(this.options.hide){o(this.elem).hide()}if(this.options.hide||this.options.show){for(var I in this.options.curAnim){o.attr(this.elem.style,I,this.options.orig[I])}}this.options.complete.call(this.elem)}return false}else{var J=G-this.startTime;this.state=J/this.options.duration;this.pos=o.easing[this.options.easing||(o.easing.swing?"swing":"linear")](this.state,J,0,1,this.options.duration);this.now=this.start+((this.end-this.start)*this.pos);this.update()}return true}};o.extend(o.fx,{speeds:{slow:600,fast:200,_default:400},step:{opacity:function(E){o.attr(E.elem.style,"opacity",E.now)},_default:function(E){if(E.elem.style&&E.elem.style[E.prop]!=null){E.elem.style[E.prop]=E.now+E.unit}else{E.elem[E.prop]=E.now}}}});if(document.documentElement.getBoundingClientRect){o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}var G=this[0].getBoundingClientRect(),J=this[0].ownerDocument,F=J.body,E=J.documentElement,L=E.clientTop||F.clientTop||0,K=E.clientLeft||F.clientLeft||0,I=G.top+(self.pageYOffset||o.boxModel&&E.scrollTop||F.scrollTop)-L,H=G.left+(self.pageXOffset||o.boxModel&&E.scrollLeft||F.scrollLeft)-K;return{top:I,left:H}}}else{o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}o.offset.initialized||o.offset.initialize();var J=this[0],G=J.offsetParent,F=J,O=J.ownerDocument,M,H=O.documentElement,K=O.body,L=O.defaultView,E=L.getComputedStyle(J,null),N=J.offsetTop,I=J.offsetLeft;while((J=J.parentNode)&&J!==K&&J!==H){M=L.getComputedStyle(J,null);N-=J.scrollTop,I-=J.scrollLeft;if(J===G){N+=J.offsetTop,I+=J.offsetLeft;if(o.offset.doesNotAddBorder&&!(o.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(J.tagName))){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}F=G,G=J.offsetParent}if(o.offset.subtractsBorderForOverflowNotVisible&&M.overflow!=="visible"){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}E=M}if(E.position==="relative"||E.position==="static"){N+=K.offsetTop,I+=K.offsetLeft}if(E.position==="fixed"){N+=Math.max(H.scrollTop,K.scrollTop),I+=Math.max(H.scrollLeft,K.scrollLeft)}return{top:N,left:I}}}o.offset={initialize:function(){if(this.initialized){return}var L=document.body,F=document.createElement("div"),H,G,N,I,M,E,J=L.style.marginTop,K='<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';M={position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"};for(E in M){F.style[E]=M[E]}F.innerHTML=K;L.insertBefore(F,L.firstChild);H=F.firstChild,G=H.firstChild,I=H.nextSibling.firstChild.firstChild;this.doesNotAddBorder=(G.offsetTop!==5);this.doesAddBorderForTableAndCells=(I.offsetTop===5);H.style.overflow="hidden",H.style.position="relative";this.subtractsBorderForOverflowNotVisible=(G.offsetTop===-5);L.style.marginTop="1px";this.doesNotIncludeMarginInBodyOffset=(L.offsetTop===0);L.style.marginTop=J;L.removeChild(F);this.initialized=true},bodyOffset:function(E){o.offset.initialized||o.offset.initialize();var G=E.offsetTop,F=E.offsetLeft;if(o.offset.doesNotIncludeMarginInBodyOffset){G+=parseInt(o.curCSS(E,"marginTop",true),10)||0,F+=parseInt(o.curCSS(E,"marginLeft",true),10)||0}return{top:G,left:F}}};o.fn.extend({position:function(){var I=0,H=0,F;if(this[0]){var G=this.offsetParent(),J=this.offset(),E=/^body|html$/i.test(G[0].tagName)?{top:0,left:0}:G.offset();J.top-=j(this,"marginTop");J.left-=j(this,"marginLeft");E.top+=j(G,"borderTopWidth");E.left+=j(G,"borderLeftWidth");F={top:J.top-E.top,left:J.left-E.left}}return F},offsetParent:function(){var E=this[0].offsetParent||document.body;while(E&&(!/^body|html$/i.test(E.tagName)&&o.css(E,"position")=="static")){E=E.offsetParent}return o(E)}});o.each(["Left","Top"],function(F,E){var G="scroll"+E;o.fn[G]=function(H){if(!this[0]){return null}return H!==g?this.each(function(){this==l||this==document?l.scrollTo(!F?H:o(l).scrollLeft(),F?H:o(l).scrollTop()):this[G]=H}):this[0]==l||this[0]==document?self[F?"pageYOffset":"pageXOffset"]||o.boxModel&&document.documentElement[G]||document.body[G]:this[0][G]}});o.each(["Height","Width"],function(I,G){var E=I?"Left":"Top",H=I?"Right":"Bottom",F=G.toLowerCase();o.fn["inner"+G]=function(){return this[0]?o.css(this[0],F,false,"padding"):null};o.fn["outer"+G]=function(K){return this[0]?o.css(this[0],F,false,K?"margin":"border"):null};var J=G.toLowerCase();o.fn[J]=function(K){return this[0]==l?document.compatMode=="CSS1Compat"&&document.documentElement["client"+G]||document.body["client"+G]:this[0]==document?Math.max(document.documentElement["client"+G],document.body["scroll"+G],document.documentElement["scroll"+G],document.body["offset"+G],document.documentElement["offset"+G]):K===g?(this.length?o.css(this[0],J):null):this.css(J,typeof K==="string"?K:K+"px")}})})();;

/**
 * Override jQuery.fn.init to guard against XSS attacks.
 *
 * See http://bugs.jquery.com/ticket/9521
 */
(function () {
  var jquery_init = jQuery.fn.init;
  jQuery.fn.init = function (selector, context, rootjQuery) {
    // If the string contains a "#" before a "<", treat it as invalid HTML.
    if (selector && typeof selector === 'string') {
      var hash_position = selector.indexOf('#');
      if (hash_position >= 0) {
        var bracket_position = selector.indexOf('<');
        if (bracket_position > hash_position) {
          throw 'Syntax error, unrecognized expression: ' + selector;
        }
      }
    }
    return jquery_init.call(this, selector, context, rootjQuery);
  };
  jQuery.fn.init.prototype = jquery_init.prototype;
})();

var Drupal = Drupal || { 'settings': {}, 'behaviors': {}, 'themes': {}, 'locale': {} };

/**
 * Set the variable that indicates if JavaScript behaviors should be applied
 */
Drupal.jsEnabled = true;

/**
 * Attach all registered behaviors to a page element.
 *
 * Behaviors are event-triggered actions that attach to page elements, enhancing
 * default non-Javascript UIs. Behaviors are registered in the Drupal.behaviors
 * object as follows:
 * @code
 *    Drupal.behaviors.behaviorName = function () {
 *      ...
 *    };
 * @endcode
 *
 * Drupal.attachBehaviors is added below to the jQuery ready event and so
 * runs on initial page load. Developers implementing AHAH/AJAX in their
 * solutions should also call this function after new page content has been
 * loaded, feeding in an element to be processed, in order to attach all
 * behaviors to the new content.
 *
 * Behaviors should use a class in the form behaviorName-processed to ensure
 * the behavior is attached only once to a given element. (Doing so enables
 * the reprocessing of given elements, which may be needed on occasion despite
 * the ability to limit behavior attachment to a particular element.)
 *
 * @param context
 *   An element to attach behaviors to. If none is given, the document element
 *   is used.
 */
Drupal.attachBehaviors = function(context) {
  context = context || document;
  // Execute all of them.
  jQuery.each(Drupal.behaviors, function() {
    this(context);
  });
};

/**
 * Encode special characters in a plain-text string for display as HTML.
 */
Drupal.checkPlain = function(str) {
  str = String(str);
  var replace = { '&': '&amp;', '"': '&quot;', '<': '&lt;', '>': '&gt;' };
  for (var character in replace) {
    var regex = new RegExp(character, 'g');
    str = str.replace(regex, replace[character]);
  }
  return str;
};

/**
 * Translate strings to the page language or a given language.
 *
 * See the documentation of the server-side t() function for further details.
 *
 * @param str
 *   A string containing the English string to translate.
 * @param args
 *   An object of replacements pairs to make after translation. Incidences
 *   of any key in this array are replaced with the corresponding value.
 *   Based on the first character of the key, the value is escaped and/or themed:
 *    - !variable: inserted as is
 *    - @variable: escape plain text to HTML (Drupal.checkPlain)
 *    - %variable: escape text and theme as a placeholder for user-submitted
 *      content (checkPlain + Drupal.theme('placeholder'))
 * @return
 *   The translated string.
 */
Drupal.t = function(str, args) {
  // Fetch the localized version of the string.
  if (Drupal.locale.strings && Drupal.locale.strings[str]) {
    str = Drupal.locale.strings[str];
  }

  if (args) {
    // Transform arguments before inserting them
    for (var key in args) {
      switch (key.charAt(0)) {
        // Escaped only
        case '@':
          args[key] = Drupal.checkPlain(args[key]);
        break;
        // Pass-through
        case '!':
          break;
        // Escaped and placeholder
        case '%':
        default:
          args[key] = Drupal.theme('placeholder', args[key]);
          break;
      }
      str = str.replace(key, args[key]);
    }
  }
  return str;
};

/**
 * Format a string containing a count of items.
 *
 * This function ensures that the string is pluralized correctly. Since Drupal.t() is
 * called by this function, make sure not to pass already-localized strings to it.
 *
 * See the documentation of the server-side format_plural() function for further details.
 *
 * @param count
 *   The item count to display.
 * @param singular
 *   The string for the singular case. Please make sure it is clear this is
 *   singular, to ease translation (e.g. use "1 new comment" instead of "1 new").
 *   Do not use @count in the singular string.
 * @param plural
 *   The string for the plural case. Please make sure it is clear this is plural,
 *   to ease translation. Use @count in place of the item count, as in "@count
 *   new comments".
 * @param args
 *   An object of replacements pairs to make after translation. Incidences
 *   of any key in this array are replaced with the corresponding value.
 *   Based on the first character of the key, the value is escaped and/or themed:
 *    - !variable: inserted as is
 *    - @variable: escape plain text to HTML (Drupal.checkPlain)
 *    - %variable: escape text and theme as a placeholder for user-submitted
 *      content (checkPlain + Drupal.theme('placeholder'))
 *   Note that you do not need to include @count in this array.
 *   This replacement is done automatically for the plural case.
 * @return
 *   A translated string.
 */
Drupal.formatPlural = function(count, singular, plural, args) {
  var args = args || {};
  args['@count'] = count;
  // Determine the index of the plural form.
  var index = Drupal.locale.pluralFormula ? Drupal.locale.pluralFormula(args['@count']) : ((args['@count'] == 1) ? 0 : 1);

  if (index == 0) {
    return Drupal.t(singular, args);
  }
  else if (index == 1) {
    return Drupal.t(plural, args);
  }
  else {
    args['@count['+ index +']'] = args['@count'];
    delete args['@count'];
    return Drupal.t(plural.replace('@count', '@count['+ index +']'), args);
  }
};

/**
 * Generate the themed representation of a Drupal object.
 *
 * All requests for themed output must go through this function. It examines
 * the request and routes it to the appropriate theme function. If the current
 * theme does not provide an override function, the generic theme function is
 * called.
 *
 * For example, to retrieve the HTML that is output by theme_placeholder(text),
 * call Drupal.theme('placeholder', text).
 *
 * @param func
 *   The name of the theme function to call.
 * @param ...
 *   Additional arguments to pass along to the theme function.
 * @return
 *   Any data the theme function returns. This could be a plain HTML string,
 *   but also a complex object.
 */
Drupal.theme = function(func) {
  for (var i = 1, args = []; i < arguments.length; i++) {
    args.push(arguments[i]);
  }

  return (Drupal.theme[func] || Drupal.theme.prototype[func]).apply(this, args);
};

/**
 * Parse a JSON response.
 *
 * The result is either the JSON object, or an object with 'status' 0 and 'data' an error message.
 */
Drupal.parseJson = function (data) {
  if ((data.substring(0, 1) != '{') && (data.substring(0, 1) != '[')) {
    return { status: 0, data: data.length ? data : Drupal.t('Unspecified error') };
  }
  return eval('(' + data + ');');
};

/**
 * Freeze the current body height (as minimum height). Used to prevent
 * unnecessary upwards scrolling when doing DOM manipulations.
 */
Drupal.freezeHeight = function () {
  Drupal.unfreezeHeight();
  var div = document.createElement('div');
  $(div).css({
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '1px',
    height: $('body').css('height')
  }).attr('id', 'freeze-height');
  $('body').append(div);
};

/**
 * Unfreeze the body height
 */
Drupal.unfreezeHeight = function () {
  $('#freeze-height').remove();
};

/**
 * Wrapper around encodeURIComponent() which avoids Apache quirks (equivalent of
 * drupal_urlencode() in PHP). This function should only be used on paths, not
 * on query string arguments.
 */
Drupal.encodeURIComponent = function (item, uri) {
  uri = uri || location.href;
  item = encodeURIComponent(item).replace(/%2F/g, '/');
  return (uri.indexOf('?q=') != -1) ? item : item.replace(/%26/g, '%2526').replace(/%23/g, '%2523').replace(/\/\//g, '/%252F');
};

/**
 * Get the text selection in a textarea.
 */
Drupal.getSelection = function (element) {
  if (typeof(element.selectionStart) != 'number' && document.selection) {
    // The current selection
    var range1 = document.selection.createRange();
    var range2 = range1.duplicate();
    // Select all text.
    range2.moveToElementText(element);
    // Now move 'dummy' end point to end point of original range.
    range2.setEndPoint('EndToEnd', range1);
    // Now we can calculate start and end points.
    var start = range2.text.length - range1.text.length;
    var end = start + range1.text.length;
    return { 'start': start, 'end': end };
  }
  return { 'start': element.selectionStart, 'end': element.selectionEnd };
};

/**
 * Build an error message from ahah response.
 */
Drupal.ahahError = function(xmlhttp, uri) {
  if (xmlhttp.status == 200) {
    if (jQuery.trim(xmlhttp.responseText)) {
      var message = Drupal.t("An error occurred. \n@uri\n@text", {'@uri': uri, '@text': xmlhttp.responseText });
    }
    else {
      var message = Drupal.t("An error occurred. \n@uri\n(no information available).", {'@uri': uri });
    }
  }
  else {
    var message = Drupal.t("An HTTP error @status occurred. \n@uri", {'@uri': uri, '@status': xmlhttp.status });
  }
  return message.replace(/\n/g, '<br />');
}

// Global Killswitch on the <html> element
$(document.documentElement).addClass('js');
// Attach all behaviors.
$(document).ready(function() {
  Drupal.attachBehaviors(this);
});

/**
 * The default themes.
 */
Drupal.theme.prototype = {

  /**
   * Formats text for emphasized display in a placeholder inside a sentence.
   *
   * @param str
   *   The text to format (plain-text).
   * @return
   *   The formatted text (html).
   */
  placeholder: function(str) {
    return '<em>' + Drupal.checkPlain(str) + '</em>';
  }
};
;
// $Id: googleanalytics.js,v 1.9.2.8 2011/02/05 19:53:32 hass Exp $

//define for all browsers
function gotoUrl(url) {
  setTimeout('document.location = "' + url + '"', 100);
}

//re-define for IE
function gotoUrlIE(url) {
  var referLink = document.createElement('a');
  referLink.href = url;
  document.body.appendChild(referLink);
  // setTimeout(function() { referLink.click(); }, 100);
  referLink.click();
}

$(document).ready(function() {
	
  // Attach onclick event to document only and catch clicks on all elements.
  $(document.body).click(function(event) {
    // Catch only the first parent link of a clicked element.
    $(event.target).parents("a:first,area:first").andSelf().filter("a,area").each(function() {

      var ga = Drupal.settings.googleanalytics;
      // Expression to check for absolute internal links.
      var isInternal = new RegExp("^(https?):\/\/" + window.location.host, "i");
      // Expression to check for special links like gotwo.module /go/* links.
      var isInternalSpecial = new RegExp("(\/go\/.*)$", "i");
      // Expression to check for download links.
      var isDownload = new RegExp("\\.(" + ga.trackDownloadExtensions + ")$", "i");

      // Is the clicked URL internal?
      if (isInternal.test(this.href)) {
        // Is download tracking activated and the file extension configured for download tracking?
        if (ga.trackDownload && isDownload.test(this.href)) {
          // Download link clicked.
          var extension = isDownload.exec(this.href);
          _gaq.push(["_trackEvent", "Downloads", extension[1].toUpperCase(), this.href.replace(isInternal, '')]);
        }
        else if (isInternalSpecial.test(this.href)) {
          // Keep the internal URL for Google Analytics website overlay intact.
          _gaq.push(["_trackPageview", this.href.replace(isInternal, '')]);
          setTimeout('document.location = "' + this.href + '"', 100);
        }
      }
      else {
        if (ga.trackMailto && $(this).is("a[href^=mailto:],area[href^=mailto:]")) {
          // Mailto link clicked.
          _gaq.push(["_trackEvent", "Mails", "Click", this.href.substring(7)]);
        }
        else if (ga.trackOutgoing && this.href) {
          
          //use browser sniffing to determine if IE or Opera (ugly, but required)
          // var isOpera, isIE = false;
          var hasBoxModel = $.support.boxModel;
          // if (typeof(window.opera) != 'undefined') { 
          //   isOpera = true; 
          // }
          // if (!isOpera && navigator.userAgent.indexOf('Internet Explorer')) { 
          //  isIE = true; 
          //}
          
          if (ga.trackOutboundAsPageview) {
            // Track all external links as page views after URL cleanup.
            // Currently required, if click should be tracked as goal.
            _gaq.push(["_trackPageview", '/outbound/' + this.href.replace(/^(https?|ftp|news|nntp|telnet|irc|ssh|sftp|webcal):\/\//i, '').split('/').join('--')]);
            if(hasBoxModel) {
              gotoUrl(this.href);
            }
            else {
              gotoUrlIE(this.href);
            }
          }
          else {
            // External link clicked.
            _gaq.push(["_trackEvent", "Outbound links", "Click", this.href]);
  
            // First, delay the outbound click by a fraction of a second.
            // This delay will hardly be noticeable by the user, but it will provide the
            // browser more time load the tracking code. Without this method, it's possible
            // that a user can click on the outbound link before the tracking code loads,
            // in which case the event will not be recorded.
            // See http://www.google.com/support/analytics/bin/answer.py?hl=en&answer=55527
            if(hasBoxModel) {
              gotoUrl(this.href);
            }
            else {
              gotoUrlIE(this.href);
            }
          }
        }
      }
    });
  });
});
;
/* $Id: img_assist.js,v 1.6 2008/04/06 16:43:18 sun Exp $ */

var currentMode;

function onChangeBrowseBy(el) {
	frames['img_assist_main'].window.location.href = BASE_URL + 'index.php?q=img_assist/thumbs/' + el.value;
}

function onClickUpload() {
  frames['img_assist_main'].window.location.href = BASE_URL + 'index.php?q=img_assist/upload';
}

function onClickStartOver() {
  frames['img_assist_main'].window.location.href = BASE_URL + 'index.php?q=img_assist/thumbs/myimages';
}

function updateCaption() {
  var caption = frames['img_assist_main'].document.getElementById('caption');
  var title = frames['img_assist_main'].document.img_assist['edit-title'].value;
  var desc = frames['img_assist_main'].document.img_assist['edit-desc'].value;
  if (desc != '') {
    title = title + ': ';
  }
  caption.innerHTML = '<strong>' + title + '</strong>' + desc;
}

function onChangeHeight() {
  var formObj = frames['img_assist_main'].document.forms[0];
  var aspect = formObj['edit-aspect'].value;
  var height = formObj['edit-height'].value;
  formObj['edit-width'].value = Math.round(height * aspect);
}

function onChangeWidth() {
  var formObj = frames['img_assist_main'].document.forms[0];
  var aspect = formObj['edit-aspect'].value;
  var width = formObj['edit-width'].value;
  formObj['edit-height'].value = Math.round(width / aspect);
}

function onChangeLink() {
  var formObj = frames['img_assist_main'].document.forms[0];
	if (formObj['edit-link-options-visible'].value == 1) {
		if (formObj['edit-link'].value == 'url') {
			showElement('edit-url', 'inline');
		}
		else {
			hideElement('edit-url');
		}
	}
}

function onChangeSizeLabel() {
  var formObj = frames['img_assist_main'].document.forms[0];
  if (formObj['edit-size-label'].value == 'other') {
    showElement('size-other', 'inline');
  }
  else {
    hideElement('size-other');
    // get the new width and height
    var size = formObj['edit-size-label'].value.split('x');
    // this array is probably a bounding box size, not an actual image
    // size, so now we use the known aspect ratio to find the actual size
    var aspect = formObj['edit-aspect'].value;
    var width = size[0];
    var height = size[1];
    if (Math.round(width / aspect) <= height) {
    	// width is controlling factor
      height = Math.round(width / aspect);
    }
    else {
    	// height is controlling factor
      width = Math.round(height * aspect);
    }
    // fill the hidden width and height textboxes with these values
    formObj['edit-width'].value = width;
    formObj['edit-height'].value = height;
  }
}

function setHeader(mode) {
	if (currentMode != mode) {
		frames['img_assist_header'].window.location.href = BASE_URL + 'index.php?q=img_assist/header/' + mode;
	}
	currentMode = mode;
}

function showElement(id, format) {
  var docObj = frames['img_assist_main'].document;
  format = (format) ? format : 'block';
  if (docObj.layers) {
    docObj.layers[id].display = format;
  }
  else if (docObj.all) {
    docObj.all[id].style.display = format;
  }
  else if (docObj.getElementById) {
    docObj.getElementById(id).style.display = format;
  }
}

function hideElement(id) {
  var docObj = frames['img_assist_main'].document;
  if (docObj.layers) {
    docObj.layers[id].display = 'none';
  }
  else if (docObj.all) {
    docObj.all[id].style.display = 'none';
  }
  else if (docObj.getElementById) {
    docObj.getElementById(id).style.display = 'none';
  }
}

function launch_popup(nid, mw, mh) {
	var ox = mw;
	var oy = mh;
	if((ox>=screen.width) || (oy>=screen.height)) {
		var ox = screen.width-150;
		var oy = screen.height-150;
		var winx = (screen.width / 2)-(ox / 2);
		var winy = (screen.height / 2)-(oy / 2);
		var use_scrollbars = 1;
	}
	else {
		var winx = (screen.width / 2)-(ox / 2);
		var winy = (screen.height / 2)-(oy / 2);
		var use_scrollbars = 0;
	}
	var win = window.open(BASE_URL + 'index.php?q=img_assist/popup/' + nid, 'imagev', 'height='+oy+'-10,width='+ox+',top='+winy+',left='+winx+',scrollbars='+use_scrollbars+',resizable');
}

function insertImage() {
  if (window.opener) {
    // Get variables from the fields on the properties frame
    var formObj = frames['img_assist_main'].document.forms[0];
		// Get mode	(see img_assist.module for detailed comments)
		if (formObj['edit-insertmode'].value == 'html') {
			// return so the page can submit normally and generate the HTML code
			return true;
		}
		else if (formObj['edit-insertmode'].value == 'html2') {
			// HTML step 2 (processed code, ready to be inserted)
			var content = getHTML(formObj);
		}
		else {
			var content = getFilterTag(formObj);
		}
		insertToEditor(content);
		return false;
		
  }
  else {
		alert('The image cannot be inserted because the parent window cannot be found.');
		return false;
	}
}

function getHTML(formObj) {
	var html = frames['img_assist_main'].document.getElementById('finalhtmlcode').value;
	return html;
}
;
// $Id: extlink.js,v 1.4.2.9 2009/12/20 00:20:25 quicksketch Exp $
(function ($) {

function extlinkAttach(context) {
  // Strip the host name down, removing subdomains or www.
  var host = window.location.host.replace(/^(([^\/]+?\.)*)([^\.]{4,})((\.[a-z]{1,4})*)$/, '$3$4');
  var subdomain = window.location.host.replace(/^(([^\/]+?\.)*)([^\.]{4,})((\.[a-z]{1,4})*)$/, '$1');

  // Determine what subdomains are considered internal.
  if (Drupal.settings.extlink.extSubdomains) {
    var subdomains = "([^/]*\\.)?";
  }
  else if (subdomain == 'www.' || subdomain == '') {
    var subdomains = "(www\\.)?";
  }
  else {
    var subdomains = subdomain.replace(".", "\\.");
  }

  // Build regular expressions that define an internal link.
  var internal_link = new RegExp("^https?://" + subdomains + host, "i");

  // Extra internal link matching.
  var extInclude = false;
  if (Drupal.settings.extlink.extInclude) {
    extInclude = new RegExp(Drupal.settings.extlink.extInclude.replace(/\\/, '\\'));
  }

  // Extra external link matching.
  var extExclude = false;
  if (Drupal.settings.extlink.extExclude) {
    extExclude = new RegExp(Drupal.settings.extlink.extExclude.replace(/\\/, '\\'));
  }

  // Find all links which are NOT internal and begin with http (as opposed
  // to ftp://, javascript:, etc. other kinds of links.
  // When operating on the 'this' variable, the host has been appended to
  // all links by the browser, even local ones.
  // In jQuery 1.1 and higher, we'd use a filter method here, but it is not
  // available in jQuery 1.0 (Drupal 5 default).
  var external_links = new Array();
  var mailto_links = new Array();
  $("a:not(." + Drupal.settings.extlink.extClass + ", ." + Drupal.settings.extlink.mailtoClass + ")", context).each(function(el) {
    try {
      var url = this.href.toLowerCase();
      if (url.indexOf('http') == 0 && (!url.match(internal_link) || (extInclude && url.match(extInclude))) && !(extExclude && url.match(extExclude))) {
        external_links.push(this);
      }
      else if (url.indexOf('mailto:') == 0) {
        mailto_links.push(this);
      }
    }
    // IE7 throws errors often when dealing with irregular links, such as:
    // <a href="node/10"></a> Empty tags.
    // <a href="http://user:pass@example.com">example</a> User:pass syntax.
    catch(error) {
      return false;
    }
  });

  if (Drupal.settings.extlink.extClass) {
    // Apply the "ext" class to all links not containing images.
    if (parseFloat($().jquery) < 1.2) {
      $(external_links).not('[img]').addClass(Drupal.settings.extlink.extClass).each(function() { if ($(this).css('display') == 'inline') $(this).after('<span class=' + Drupal.settings.extlink.extClass + '></span>'); });
    }
    else {
      $(external_links).not($(external_links).find('img').parents('a')).addClass(Drupal.settings.extlink.extClass).each(function() { if ($(this).css('display') == 'inline') $(this).after('<span class=' + Drupal.settings.extlink.extClass + '></span>'); });
    }
  }

  if (Drupal.settings.extlink.mailtoClass) {
    // Apply the "mailto" class to all mailto links not containing images.
    if (parseFloat($().jquery) < 1.2) {
      $(mailto_links).not('[img]').addClass(Drupal.settings.extlink.mailtoClass).each(function() { if ($(this).css('display') == 'inline') $(this).after('<span class=' + Drupal.settings.extlink.mailtoClass + '></span>'); });
    }
    else {
      $(mailto_links).not($(mailto_links).find('img').parents('a')).addClass(Drupal.settings.extlink.mailtoClass).each(function() { if ($(this).css('display') == 'inline') $(this).after('<span class=' + Drupal.settings.extlink.mailtoClass + '></span>'); });
    }
  }

  if (Drupal.settings.extlink.extTarget) {
    // Apply the target attribute to all links.
    $(external_links).attr('target', Drupal.settings.extlink.extTarget);
  }

  if (Drupal.settings.extlink.extAlert) {
    // Add pop-up click-through dialog.
    $(external_links).click(function(e) {
     return confirm(Drupal.settings.extlink.extAlertText);
    });
  }

}

Drupal.behaviors.extlink = function(context) {
  extlinkAttach(context);
}

})(jQuery);
;

Drupal.behaviors.comment = function (context) {
  var parts = new Array("name", "homepage", "mail");
  var cookie = '';
  for (i=0;i<3;i++) {
    cookie = Drupal.comment.getCookie('comment_info_' + parts[i]);
    if (cookie != '') {
      $("#comment-form input[name=" + parts[i] + "]:not(.comment-processed)", context)
        .val(cookie)
        .addClass('comment-processed');
    }
  }
};

Drupal.comment = {};

Drupal.comment.getCookie = function(name) {
  var search = name + '=';
  var returnValue = '';

  if (document.cookie.length > 0) {
    offset = document.cookie.indexOf(search);
    if (offset != -1) {
      offset += search.length;
      var end = document.cookie.indexOf(';', offset);
      if (end == -1) {
        end = document.cookie.length;
      }
      returnValue = decodeURIComponent(document.cookie.substring(offset, end).replace(/\+/g, '%20'));
    }
  }

  return returnValue;
};
;
(function ($) {

/**
 * Open links to Mollom.com in a new window.
 *
 * Required for valid XHTML Strict markup.
 */
Drupal.behaviors.mollomTarget = function (context) {
  $(context).find('.mollom-target').click(function () {
    this.target = '_blank';
  });
};

/**
 * Attach click event handlers for CAPTCHA links.
 */
Drupal.behaviors.mollomCaptcha = function (context) {
  $('a.mollom-switch-captcha', context).click(getMollomCaptcha);
};

/**
 * Fetch a Mollom CAPTCHA and output the image or audio into the form.
 */
function getMollomCaptcha() {
  // Get the current requested CAPTCHA type from the clicked link.
  var newCaptchaType = $(this).hasClass('mollom-audio-captcha') ? 'audio' : 'image';

  var context = $(this).parents('form');

  // Extract the form build ID and Mollom content ID from the form.
  var formBuildId = $('input[name="mollom[mollom_build_id]"]', context).val();
  var mollomContentId = $('input.mollom-content-id', context).val();

  var path = 'mollom/captcha/' + newCaptchaType + '/' + formBuildId;
  if (mollomContentId) {
    path += '/' + mollomContentId;
  }

  // Retrieve a new CAPTCHA.
  $.ajax({
    url: Drupal.settings.basePath + path,
    type: 'POST',
    dataType: 'json',
    success: function (data) {
      if (!(data && data.content)) {
        return;
      }
      // Inject new CAPTCHA.
      $('.mollom-captcha-content', context).parent().html(data.content);
      // Update CAPTCHA ID.
      $('input[name="mollom[captchaId]"]', context).val(data.captchaId);
      // Add an onclick-event handler for the new link.
      Drupal.attachBehaviors(context);
      // Focus on the CAPTCHA input.
      $('input[name="mollom[captcha]"]', context).focus();
    }
  });
  return false;
}

})(jQuery);
;

Drupal.behaviors.textarea = function(context) {
  $('textarea.resizable:not(.textarea-processed)', context).each(function() {
    // Avoid non-processed teasers.
    if ($(this).is(('textarea.teaser:not(.teaser-processed)'))) {
      return false;  
    }
    var textarea = $(this).addClass('textarea-processed'), staticOffset = null;

    // When wrapping the text area, work around an IE margin bug.  See:
    // http://jaspan.com/ie-inherited-margin-bug-form-elements-and-haslayout
    $(this).wrap('<div class="resizable-textarea"><span></span></div>')
      .parent().append($('<div class="grippie"></div>').mousedown(startDrag));

    var grippie = $('div.grippie', $(this).parent())[0];
    grippie.style.marginRight = (grippie.offsetWidth - $(this)[0].offsetWidth) +'px';

    function startDrag(e) {
      staticOffset = textarea.height() - e.pageY;
      textarea.css('opacity', 0.25);
      $(document).mousemove(performDrag).mouseup(endDrag);
      return false;
    }

    function performDrag(e) {
      textarea.height(Math.max(32, staticOffset + e.pageY) + 'px');
      return false;
    }

    function endDrag(e) {
      $(document).unbind("mousemove", performDrag).unbind("mouseup", endDrag);
      textarea.css('opacity', 1);
    }
  });
};
;
// TEXT RESIZE TOOL
$(document).ready(function(){
	// $('#hidden-top').css("display", "none");
		
	if ($.cookie('font_size')) {
		
		$('#text-size li.active').removeClass('active');
		
		var cookie = $.cookie('font_size');
		switch (cookie) {
			
			case 'plus1':
			$('body').addClass('fontsize1').removeClass('fontsize2');
			$('#text-size li.plus1').addClass('active');
			break;
			
			case 'plus2':
			$('body').addClass('fontsize2').removeClass('fontsize1');
			$('#text-size li.plus2').addClass('active');
			break;
			
			case '':
			$('body').removeClass('fontsize1 fontsize2');
			$('#text-size li.original').addClass('active');
			break;
		}
			
	}
		
	$('#text-size li.plus1 a').click(function() {
		$('body').addClass('fontsize1').removeClass('fontsize2');
		$.cookie('font_size', 'plus1', { path: '/'});
		return false;
	});
	
	$('#text-size li.plus2 a').click(function() {
		$('body').addClass('fontsize2').removeClass('fontsize1');
		$.cookie('font_size', 'plus2', { path: '/'});
		return false;
	});
	
	$('#text-size li.original a').click(function() {
		$('body').removeClass('fontsize1 fontsize2');
		$.cookie('font_size', null, { expires: -1, path: '/'});
		return false;
	});
	
	
	$('#text-size li a').click(function() {
		$('#text-size li.active').removeClass('active');
		$(this).parent().addClass('active');
		return false;
	});
	
});;
$(document).ready(function(){
  
  var defaultInputText = 'Find books, music, movies and more';
  var defaultInputText2 = 'NYPL events, locations and more';
  
  $('input#search-block-form-input, input#catalog-search-form-input').css('color', '#999999').val(defaultInputText);
  
  if ($('input#search-block-form-input, input#catalog-search-form-input').val() != defaultInputText) {
    $('input#search-block-form-input, input#catalog-search-form-input').css('color', '#000000');
  }
  
  $('input#search-block-form-input, input#catalog-search-form-input').focus(function() {
    if (($(this).val() == defaultInputText) || ($(this).val() == defaultInputText2)) { 
      $(this).val('');
    }
    $(this).css('color', '#000000');
  });
      
  $('.searchOptions input').click(function() {
    var radioId = $(this).attr('id');
    var textField = $('input#search-block-form-input, input#catalog-search-form-input');
    var textFieldValue = $(textField).val();
    switch (radioId) {
      case 'search-zone-catalog':
        if (textFieldValue == defaultInputText2) {
          $(textField).val(defaultInputText);
        }
        if (typeof _gaq == "object") {
          _gaq.push(['_trackEvent', 'searchform', 'Click', 'Catalog search button']);
        }
        $('.searchOptions label[for="search-zone-site"]').removeClass('active-option');
        $('.searchOptions label[for="search-zone-catalog"]').addClass('active-option');
        $('select#t').css('visibility', 'visible');
        break;
      case 'search-zone-site':
        if (textFieldValue == defaultInputText) {
          $(textField).val(defaultInputText2);
        }
        if (typeof _gaq == "object") {
          _gaq.push(['_trackEvent', 'searchform', 'Click', 'Site search button']);
        }
        $('.searchOptions label[for="search-zone-catalog"]').removeClass('active-option');
        $('.searchOptions label[for="search-zone-site"]').addClass('active-option');
        $('select#t').css('visibility', 'hidden');
        break;
    }
  });
    
  $('#search-block-form').submit(function() {
    var checkedOption = $(this).find("input[name='search-zone']:checked");
    var searchZone = $(checkedOption).attr('id');
    var searchTerm = $(this).find('input#search-block-form-input').val();
    switch (searchZone) {
      case 'search-zone-catalog':
        var bibcomSearch_t = $('select#t > option:selected').val();
        var formAction = 'http://nypl.bibliocommons.com/search?t=' + bibcomSearch_t + '&q='
          + searchTerm + '&commit=Search&searchOpt=catalogue';
        var catalogRedirect = formAction;
        window.location = catalogRedirect;
        return false;
        break;
      case 'search-zone-site':
        var base_url = window.location.protocol + '//' + window.location.host;
        window.location = base_url + '/search/apachesolr_search/' + searchTerm;
        return false;
        break;
    }
  });
  
  $('#catalog-redirect-form').submit(function() {
    var searchTerm = $(this).find('input#catalog-search-form-input').val();
    var formAction = $(this).attr('action');
    var catalogRedirect = formAction + '?t=smart&q=' + searchTerm + '&commit=Search&searchOpt=catalogue';
    window.location = catalogRedirect;
    return false;
  });
});;
// GA for Cross Domain Profile handling
$(document).ready(function() {
  if (typeof _gaq == "object") {
    _gaq.push(['_setDomainName', '.nypl.org']);
    _gaq.push(['_setAllowHash', false]);
    // All link handler for GA Cross Domain Profile 
    $('a').click(function() {
        _gaq.push(['_link', $(this).attr('href')]);
    });
    // All downloadables with Drupal allowed extensions
    if (Drupal.settings.nyplContentExtensions) {
      var nyplContentExtList = new Array(Drupal.settings.nyplContentExtensions);
    }
    else {
      var nyplContentExtList = new Array('jpg','jpeg','gif','png','txt','doc','xls','pdf','ppt','pps','odt','ods','odp','csv','xml','rdf','kmz','kml','rtf');
    }
    for (i = 0 ; i < nyplContentExtList.length ; i++) {
      $('a[href$="'+ nyplContentExtList[i] +'"]').click(function() {
        $('div').text(nyplContentExtList[i]);
          _gaq.push(['_trackEvent', 'Download', nyplContentExtList[i].toUpperCase(), $(this).attr('href')]);
      });
    }
  }
});

// Add WiFi location cookie for GA user segmentation
$(document).ready(function() {
  if (typeof _gaq == "object") {
    if ($.cookie('nyplSeg') != null) { // get cookie
        var nyplSeg = $.cookie('nyplSeg');
      }
      else { // Do the AJAX call and set cookie
        var url = '/sites/all/themes/nypl_new/includes/ga_segments.php';
        var nyplSeg = $.ajax({ type: 'GET', url: url, async: false }).responseText;
        $.cookie('nyplSeg', nyplSeg, { path: '/' });
      }
    _gaq.push(['_setCustomVar', 1, 'NYPL_Segment', nyplSeg, 1]);
  
    // Destroy the bad __utmv cookies by removing the extraneous comma that GA javascript adds
    if ($.cookie('__utmv')) { // get cookie
      var regExp = /,$/g;
      var thisCookieValue = $.cookie('__utmv');
      if (thisCookieValue.search(regExp) != -1) {
        var newCookieValue = thisCookieValue.replace(regExp, '');
        newCookieValue = unescape(newCookieValue);
        $.cookie('__utmv', newCookieValue, { path: '/', domain: 'dev.new.nypl.org' });
      }
    }
  }
});

// FOR BLOG POSTS
$(document).ready(function(){
  $('.blog-post-preview').each(function() {
    // ASSIGN TEASER DIV TO VARIABLE
    var teaserDiv = $(this).find('.teaser-text');
    var fullBody = $(this).find('.body-full');
    
    // GET FIRST IMAGE IN BODY
    
    var image = $(fullBody).find('img:first');
    
    if ((image.length == 1) && !($(teaserDiv).hasClass('no-image'))) {      
      
      // PLACE IMAGE IN .thumbnail DIV
      var thumbnailWrapper = $(this).find('.thumbnail-wrapper');
      var thumbnail = $(thumbnailWrapper).find('.thumbnail');
      var thumbnailLink = $(thumbnail).find('a');
      $(thumbnailLink).empty();
      $(image).appendTo(thumbnailLink);
      $(thumbnailWrapper).removeClass('hidden');
      $(this).removeClass('content-no-image').addClass('content');
    
    }
    
    if (image.length == 1) {    
      // GET IMAGE DIMENSIONS, DETERMINE IF HORIZ OR VERT, & RESIZE
      var imgWidth = $(image).width();
      var imgHeight = $(image).height();
      
      // REMOVE SIZE ATTRIBUTES TO AVOID SQUISHING
      $(image).removeAttr('width').removeAttr('height');
      // REMOVE BULLSHIT ATTRIBUTES THAT SHOULDN'T BE THERE
      $(image).removeAttr('align').removeAttr('vspace').removeAttr('hspace');
      
      // variables to account for different styling of 'first' posts
      var isFirst = $(this).hasClass('first');
      var resizeVal = isFirst ? 250 : 100;
      
      if (imgHeight > imgWidth) {
        var imgFormat = 'vertical';
        $(image).width(resizeVal);
      } else if (imgWidth > imgHeight) {
        var imgFormat = 'horizontal';
        $(image).height(resizeVal);
      } else {
        var imgFormat = 'square';
        $(image).height(resizeVal);
      }
      
      // OFFSETS
      if (imgFormat == 'vertical') {
        var newHeight = $(image).height();
        var offset =  isFirst ? (newHeight-resizeVal)/2 : (newHeight/4)-25;
        $(image).css('top', '-'+offset+'px');
      }
      
      if (imgFormat == 'horizontal') {
        var newWidth = $(image).width();
        var offset =  isFirst ? (newWidth-resizeVal)/2 : (newWidth/2)-50;
        $(image).css('left', '-'+offset+'px');
      }
      
    }
    
    $(fullBody).remove();

  });
  
});

// ADD "Read More" LINK TO TEASERS
$(document).ready(function(){
  $('div.teaser-text').each(function() {
    var readMore = $(this).children('a.readmore[class!=inserted]');
    var teaser = $(readMore).prev();
    $(readMore).addClass("inserted");
    $(readMore).appendTo(teaser);
    $(readMore).before(" ");
  });
});


// TOGGLE COLLAPSABLE ELEMENTS
$(document).ready(function(){
  $('div.collapsible').each(function() {
    if ($(this).hasClass('collapsible-closed')) {
      $(this).children('div').hide();
      $(this).children('.trigger').addClass('fake-link closed');
    } else if ($(this).hasClass('collapsible-open')) {
      $(this).children('.trigger').addClass('fake-link open');
    }
    
    $(this).find('div h3:first').addClass('first');
    
    $(this).children('.trigger').click(function() {
      $(this).next('div').slideToggle('normal');
      $(this).toggleClass('closed').toggleClass('open');
      return false;
    });
  });
});


// QWIDGET POP-UP
$(document).ready(function(){
  $('div#qwidget-launch').removeAttr('class');
  $('div#qwidget-launch a').click(function(){
    var path = $(this).attr('href');
    window.open (path,"qwidget","status=no, toolbar=no, location=no, menubar=no, scrollbars=no, resizable=no, width=170, height=334");
    window.name = "main";
    return false;
  });
});


// FIX WIDTH OF INLINE IMAGES WITH CAPTIONS
$(document).ready(function(){
  $('span.inline:not(.inline-center)').each(function() {
    var width = $(this).find('img').width();
    $(this).width(width);
  });
}); 


// automenu
$(document).ready(function(){
  $('form.automenu select').change(function() {
    var destination = $(this).find('option:selected').val();
    window.location.href = destination;
  });
});   

// GA target link tagging
$(document).ready(function(){
  if (typeof _gaq == "object") {
    // Add onClick to Fundraising link for Analytics
    $('#donate_button').click(function(){
      var path = $(this).attr('class');
      var googlepath = '/goal/fundraising/tipjar/' + path;
      _gaq.push(['_trackPageview', googlepath]);
    });

    // Add onClick to My Account link for Analytics
    $('div#account-login a').click(function(){
      var googlepath = '/goal/top-nav/my-account';
      _gaq.push(['_trackEvent', 'top nav', 'Click', googlepath]);
    });

    // Add onClick to Normal Font Size link for Analytics
    $('li.original a').click(function(){
      var googlepath = '/goal/top-nav/normal-font-size';
      _gaq.push(['_trackEvent', 'top nav', 'Click', googlepath]);
    });

    // Add onClick to Larger Font Size link for Analytics
    $('li.plus1 a').click(function(){
      var googlepath = '/goal/top-nav/larger-font-size';
      _gaq.push(['_trackEvent', 'top nav', 'Click', googlepath]);
    });

    // Add onClick to Largest Font Size link for Analytics
    $('li.plus2 a').click(function(){
      var googlepath = '/goal/top-nav/largest-font-size';
      _gaq.push(['_trackEvent', 'top nav', 'Click', googlepath]);
    });

    // Add onClick to Breadcrumb links for Analytics
    $('#breadcrumb a').click(function(){
      var path = $(this).attr('href');
      var googlepath = '/goal/breadcrumb/' + path;
      _gaq.push(['_trackEvent', 'breadcrumb', 'Click', googlepath]);
    });

    // Add onClick to Donate link in right sidebar for Analytics
    $('#donate-campaign a').click(function() {
      var googlepath = '/goal/right-column/donate-now';
      _gaq.push(['_trackEvent', 'right column', 'Click', googlepath]);
    });

    // Add onClick to ASK NYPL link in right sidebar for Analytics
    $('#qwidget-launch a').click(function() {
      var googlepath = '/goal/right-column/ask-nypl';
      _gaq.push(['_trackEvent', 'right column', 'Click', googlepath]);
    });

    // Add onClick to Related links in right sidebar for Analytics
    $('#related-links a').click(function() {
      var googlepath = '/goal/right-column/related-links';
      _gaq.push(['_trackEvent', 'right column', 'Click', googlepath]);
    });

    // Add onClick for Media Center block; including readmore
    $('div.view-id-media_center.view-display-id-block_3 a').click(function() {
      var googlepath = '/goal/footer/media-center';
      _gaq.push(['_trackEvent', 'footer', 'Click', googlepath]);
    });

    // Add onClick event for footer block (block_nypl_grouper_5 [latest blog post]); including readmore
    $('#block-nypl_grouper-5 a').click(function() {
      var googlepath = '/goal/footer/latest-blog-post';
      _gaq.push(['_trackEvent', 'footer', 'Click', googlepath]);
    });

    // Add onClick event to Newsletter Signup Form
    $('input#ACTION_SUBMIT_SURVEY_RESPONSE').click(function() {
      var googlepath = 'goal/footer/newsletter';
      _gaq.push(['_trackEvent', 'footer', 'Click', googlepath]);
    });

    // Add onClick events to Footer Bottom links for Analytics
    $('#footer-bottom a').click(function() {
      var path = $(this).attr('href');
      var googlepath = '/goal/footer-bottom/' + path;
      _gaq.push(['_trackEvent', 'footer', 'Click', googlepath]);
    });
  }
});

// Implement Cycle plugin
$(document).ready(function(){
    $('.image-cycle').show();
  $('.image-cycle').cycle({
    fx: 'fade', // choose your transition type, ex: fade, scrollUp, shuffle, etc...
    timeout: 4000,
    speed: 1000
  });
  $('.image-cycle2').cycle({
    fx: 'fade', // choose your transition type, ex: fade, scrollUp, shuffle, etc...
    timeout: 4000,
    speed: 1000,
    delay: 1500
  });
  
});


// Image viewer via colorbox (selectors includes olf thickbox version
$(document).ready(function () {
  $("a.thickbox-image-link, a.popup-image-link").colorbox();
  $("input.thickbox, a.thickbox").colorbox();
});


// Scrollables
$(document).ready( function() {
  $('#rotating_quotes').scrollable({ circular: true, speed: 800 }).click(function() {
    $(this).data('scrollable').next();
  }).autoscroll({ interval: 7000 });
});

// Colorbox for summer reading donation page
$(document).ready(function() {
  $('input#summer_reading_donate').colorbox({
    height: 600,
    width: 900,
    iframe: 'true',
    href: function() {
      return $(this).attr('alt');
    },
    onOpen: function() {
      $('#cboxClose').css('right', '17px');
    }
  });
});

// colorbox for CLP thing
$(document).ready(function() {
  $('span.clp-image-description').hide();
  
  $('.clp-image a[rel="clp-gallery"]').each(function(index) {
    $(this).addClass('img-' + index);
  });
  
  $('.clp-image a[rel="clp-gallery"]').colorbox({
    maxWidth: $(window).width(),
    maxHeight: $(window).height(),
    previous: '<',
    next: '>',
    html: function() {
      var img_index = $(this).attr('class').split(' ')[0].replace('img-', '');
      var img_size = Drupal.settings.clp.sizes[img_index];
      var cb_img = new Image;
      cb_img.src = $(this).attr('href');
      var $cb_inner = $('<div class="clp-cb-inner">');
      var $caption = $('<p>').append($(this).find('.clp-image-description').html());
      var $cb_img = $('<img>').attr('src', cb_img.src)
      if (img_size) {
        $cb_img.attr('height', img_size.height).attr('width', img_size.width);
      }
      $cb_inner.append($cb_img).append($caption);
      return $cb_inner.html();
    }
  });
});

// Read data attributes for GA Event tracking info and fire tracking function
function clickTrack(link) {
  "use strict";
  if (window.hasOwnProperty('_gaq')) {
    var lmnt = $(link),
      event_fields = ['ga_event_category', 'ga_event_action',
        'ga_event_label'],
      items = {},
      found = 0,
      i;

    for (i = 0; i < event_fields.length; i += 1) {
      if (lmnt.data(event_fields[i]) !== undefined) {
        items[event_fields[i]] = lmnt.data(event_fields[i]);
        found += 1;
      }
    }


    if (found === event_fields.length) {
      _gaq.push(['_trackEvent', items.ga_event_category,
        items.ga_event_action, items.ga_event_label]);
    }
  }
}

function clickCustomVar(link) {
  "use strict";
  if (window.hasOwnProperty('_gaq')) {
    var lmnt = $(link),
      custom_fields = ['ga_custom_index', 'ga_custom_name', 'ga_custom_value',
        'ga_custom_scope'],
      items = {},
      found = 0,
      i;

    for (i = 0; i < custom_fields.length; i += 1) {
      if (lmnt.data(custom_fields[i]) !== undefined) {
        items[custom_fields[i]] = lmnt.data(custom_fields[i]);
        found += 1;
      }
    }

    if (found === custom_fields.length) {
      _gaq.push(['_setCustomVar', items.ga_custom_index, items.ga_custom_name,
        items.ga_custom_value, items.ga_custom_scope]);
    }
  }
}

$(document).ready(function () {
  $('.ga-event').live('click', function () {
    clickTrack(this);
  });
  $('.ga-custom').live('click', function () {
      clickCustomVar(this);
  });
});
;
/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * Create a cookie with the given name and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String name The name of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given name.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String name The name of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};;
/**
 * Galleria (http://monc.se/kitchen)
 *
 * Galleria is a javascript image gallery written in jQuery. 
 * It loads the images one by one from an unordered list and displays thumbnails when each image is loaded. 
 * It will create thumbnails for you if you choose so, scaled or unscaled, 
 * centered and cropped inside a fixed thumbnail box defined by CSS.
 * 
 * The core of Galleria lies in it's smart preloading behaviour, snappiness and the fresh absence 
 * of obtrusive design elements. Use it as a foundation for your custom styled image gallery.
 *
 * MAJOR CHANGES v.FROM 0.9
 * Galleria now features a useful history extension, enabling back button and bookmarking for each image.
 * The main image is no longer stored inside each list item, instead it is placed inside a container
 * onImage and onThumb functions lets you customize the behaviours of the images on the site
 *
 * Tested in Safari 3, Firefox 2, MSIE 6, MSIE 7, Opera 9
 * 
 * Version 1.0
 * Februari 21, 2008
 *
 * Copyright (c) 2008 David Hellsing (http://monc.se)
 * Licensed under the GPL licenses.
 * http://www.gnu.org/licenses/gpl.txt
 **/

(function($){

var $$;


/**
 * 
 * @desc Convert images from a simple html <ul> into a thumbnail gallery
 * @author David Hellsing
 * @version 1.0
 *
 * @name Galleria
 * @type jQuery
 *
 * @cat plugins/Media
 * 
 * @example $('ul.gallery').galleria({options});
 * @desc Create a a gallery from an unordered list of images with thumbnails
 * @options
 *   insert:   (selector string) by default, Galleria will create a container div before your ul that holds the image.
 *             You can, however, specify a selector where the image will be placed instead (f.ex '#main_img')
 *   history:  Boolean for setting the history object in action with enabled back button, bookmarking etc.
 *   onImage:  (function) a function that gets fired when the image is displayed and brings the jQuery image object.
 *             You can use it to add click functionality and effects.
 *             f.ex onImage(image) { image.css('display','none').fadeIn(); } will fadeIn each image that is displayed
 *   onThumb:  (function) a function that gets fired when the thumbnail is displayed and brings the jQuery thumb object.
 *             Works the same as onImage except it targets the thumbnail after it's loaded.
 *
**/

$$ = $.fn.galleria = function($options) {
	
	// check for basic CSS support
	if (!$$.hasCSS()) { return false; }
	
	// init the modified history object
	$.historyInit($$.onPageLoad);
	
	// set default options
	var $defaults = {
		insert      : '.galleria_container',
		history     : true,
		clickNext   : true,
		onImage     : function(image,caption,thumb) {},
		onThumb     : function(thumb) {}
	};
	

	// extend the options
	var $opts = $.extend($defaults, $options);
	
	// bring the options to the galleria object
	for (var i in $opts) {
		if (i) {
			$.galleria[i]  = $opts[i];
		}
	}
	
	// if no insert selector, create a new division and insert it before the ul
	var _insert = ( $($opts.insert).is($opts.insert) ) ? 
		$($opts.insert) : 
		jQuery(document.createElement('div')).insertBefore(this);
		
	// create a wrapping div for the image
	var _div = $(document.createElement('div')).addClass('galleria_wrapper');
	
	// create a caption span
	var _span = $(document.createElement('span')).addClass('caption');
	
	// inject the wrapper in in the insert selector
	_insert.addClass('galleria_container').append(_div).append(_span);
	
	//-------------
	
	return this.each(function(){
		
		// add the Galleria class
		$(this).addClass('galleria');
		
		// loop through list
		$(this).children('li').each(function(i) {
			
			// bring the scope
			var _container = $(this);
			                
			// build element specific options
			var _o = $.meta ? $.extend({}, $opts, _container.data()) : $opts;
			
			// remove the clickNext if image is only child
			_o.clickNext = $(this).is(':only-child') ? false : _o.clickNext;
			
			// try to fetch an anchor
			var _a = $(this).find('a').is('a') ? $(this).find('a') : false;
			
			// reference the original image as a variable and hide it
			var _img = $(this).children('img').css('display','none');
			
			// extract the original source
			var _src = _a ? _a.attr('href') : _img.attr('src');
			
			// find a title
			var _title = _a ? _a.attr('title') : _img.attr('title');
			
			// create loader image            
			var _loader = new Image();
			
			// check url and activate container if match
			if (_o.history && (window.location.hash && window.location.hash.replace(/\#/,'') == _src)) {
				_container.siblings('.active').removeClass('active');
				_container.addClass('active');
			}
		
			// begin loader
			$(_loader).load(function () {
				
				// try to bring the alt
				$(this).attr('alt',_img.attr('alt'));
				
				//-----------------------------------------------------------------
				// the image is loaded, let's create the thumbnail
				
				var _thumb = _a ? 
					_a.find('img').addClass('thumb noscale').css('display','none') :
					_img.clone(true).addClass('thumb').css('display','none');
				
				if (_a) { _a.replaceWith(_thumb); }
				
				if (!_thumb.hasClass('noscale')) { // scaled tumbnails!
					var w = Math.ceil( _img.width() / _img.height() * _container.height() );
					var h = Math.ceil( _img.height() / _img.width() * _container.width() );
					if (w < h) {
						_thumb.css({ height: 'auto', width: _container.width(), marginTop: -(h-_container.height())/2 });
					} else {
						_thumb.css({ width: 'auto', height: _container.height(), marginLeft: -(w-_container.width())/2 });
					}
				} else { // Center thumbnails.
					// a tiny timer fixed the width/height
					window.setTimeout(function() {
						_thumb.css({
							marginLeft: -( _thumb.width() - _container.width() )/2, 
							marginTop:  -( _thumb.height() - _container.height() )/2
						});
					}, 1);
				}
				
				// add the rel attribute
				_thumb.attr('rel',_src);
				
				// add the title attribute
				_thumb.attr('title',_title);
				
				// add the click functionality to the _thumb
				_thumb.click(function() {
					$.galleria.activate(_src);
				});
				
				// hover classes for IE6
				_thumb.hover(
					function() { $(this).addClass('hover'); },
					function() { $(this).removeClass('hover'); }
				);
				_container.hover(
					function() { _container.addClass('hover'); },
					function() { _container.removeClass('hover'); }
				);

				// prepend the thumbnail in the container
				_container.prepend(_thumb);
				
				// show the thumbnail
				_thumb.css('display','block');
				
				// call the onThumb function
				_o.onThumb(jQuery(_thumb));
				
				// check active class and activate image if match
				if (_container.hasClass('active')) {
					$.galleria.activate(_src);
					//_span.text(_title);
				}
				
				//-----------------------------------------------------------------
				
				// finally delete the original image
				_img.remove();
				
			}).error(function () {
				
				// Error handling
			    _container.html('<span class="error" style="color:red">Error loading image: '+_src+'</span>');
			
			}).attr('src', _src);
		});
	});
};

/**
 *
 * @name NextSelector
 *
 * @desc Returns the sibling sibling, or the first one
 *
**/

$$.nextSelector = function(selector) {
	return $(selector).is(':last-child') ?
		   $(selector).siblings(':first-child') :
    	   $(selector).next();
    	   
};

/**
 *
 * @name previousSelector
 *
 * @desc Returns the previous sibling, or the last one
 *
**/

$$.previousSelector = function(selector) {
	return $(selector).is(':first-child') ?
		   $(selector).siblings(':last-child') :
    	   $(selector).prev();
    	   
};

/**
 *
 * @name hasCSS
 *
 * @desc Checks for CSS support and returns a boolean value
 *
**/

$$.hasCSS = function()  {
	$('body').append(
		$(document.createElement('div')).attr('id','css_test').css({ width:'1px', height:'1px', display:'none' })
	);
	var _v = ($('#css_test').width() != 1) ? false : true;
	$('#css_test').remove();
	return _v;
};

/**
 *
 * @name onPageLoad
 *
 * @desc The function that displays the image and alters the active classes
 *
 * Note: This function gets called when:
 * 1. after calling $.historyInit();
 * 2. after calling $.historyLoad();
 * 3. after pushing "Go Back" button of a browser
 *
**/

$$.onPageLoad = function(_src) {	
	
	// get the wrapper
	var _wrapper = $('.galleria_wrapper');
	
	// get the thumb
	var _thumb = $('.galleria img[rel="'+_src+'"]');
	
	if (_src) {
		
		// new hash location
		if ($.galleria.history) {
			window.location = window.location.href.replace(/\#.*/,'') + '#' + _src;
		}
		
		// alter the active classes
		_thumb.parents('li').siblings('.active').removeClass('active');
		_thumb.parents('li').addClass('active');
	
		// define a new image
		var _img   = $(new Image()).attr('src',_src).addClass('replaced');

		// empty the wrapper and insert the new image
		_wrapper.empty().append(_img);

		// insert the caption
		_wrapper.siblings('.caption').text(_thumb.attr('title'));
		
		// fire the onImage function to customize the loaded image's features
		$.galleria.onImage(_img,_wrapper.siblings('.caption'),_thumb);
		
		// add clickable image helper
		if($.galleria.clickNext) {
			_img.css('cursor','pointer').click(function() { $.galleria.next(); });
		}
		
	} else {
		
		// clean up the container if none are active
		_wrapper.siblings().andSelf().empty();
		
		// remove active classes
		$('.galleria li.active').removeClass('active');
	}

	// place the source in the galleria.current variable
	$.galleria.current = _src;
	
};

/**
 *
 * @name jQuery.galleria
 *
 * @desc The global galleria object holds four constant variables and four public methods:
 *       $.galleria.history = a boolean for setting the history object in action with named URLs
 *       $.galleria.current = is the current source that's being viewed.
 *       $.galleria.clickNext = boolean helper for adding a clickable image that leads to the next one in line
 *       $.galleria.next() = displays the next image in line, returns to first image after the last.
 *       $.galleria.prev() = displays the previous image in line, returns to last image after the first.
 *       $.galleria.activate(_src) = displays an image from _src in the galleria container.
 *       $.galleria.onImage(image,caption) = gets fired when the image is displayed.
 *
**/

$.extend({galleria : {
	current : '',
	onImage : function(){},
	activate : function(_src) { 
		if ($.galleria.history) {
			$.historyLoad(_src);
		} else {
			$$.onPageLoad(_src);
		}
	},
	next : function() {
		var _next = $($$.nextSelector($('.galleria img[rel="'+$.galleria.current+'"]').parents('li'))).find('img').attr('rel');
		$.galleria.activate(_next);
	},
	prev : function() {
		var _prev = $($$.previousSelector($('.galleria img[rel="'+$.galleria.current+'"]').parents('li'))).find('img').attr('rel');
		$.galleria.activate(_prev);
	}
}
});

})(jQuery);


/**
 *
 * History extension for jQuery
 * Credits to http://www.mikage.to/
 *
**/


/*
 * jQuery history plugin
 *
 * Copyright (c) 2006 Taku Sano (Mikage Sawatari)
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Modified by Lincoln Cooper to add Safari support and only call the callback once during initialization
 * for msie when no initial hash supplied.
 */


jQuery.extend({
	historyCurrentHash: undefined,
	
	historyCallback: undefined,
	
	historyInit: function(callback){
		jQuery.historyCallback = callback;
		var current_hash = location.hash;
		
		jQuery.historyCurrentHash = current_hash;
		if(jQuery.browser.msie) {
			// To stop the callback firing twice during initilization if no hash present
			if (jQuery.historyCurrentHash === '') {
			jQuery.historyCurrentHash = '#';
		}
		
			// add hidden iframe for IE
			$("body").prepend('<iframe id="jQuery_history" style="display: none;"></iframe>');
			var ihistory = $("#jQuery_history")[0];
			var iframe = ihistory.contentWindow.document;
			iframe.open();
			iframe.close();
			iframe.location.hash = current_hash;
		}
		else if ($.browser.safari) {
			// etablish back/forward stacks
			jQuery.historyBackStack = [];
			jQuery.historyBackStack.length = history.length;
			jQuery.historyForwardStack = [];
			
			jQuery.isFirst = true;
		}
		jQuery.historyCallback(current_hash.replace(/^#/, ''));
		setInterval(jQuery.historyCheck, 100);
	},
	
	historyAddHistory: function(hash) {
		// This makes the looping function do something
		jQuery.historyBackStack.push(hash);
		
		jQuery.historyForwardStack.length = 0; // clear forwardStack (true click occured)
		this.isFirst = true;
	},
	
	historyCheck: function(){
		if(jQuery.browser.msie) {
			// On IE, check for location.hash of iframe
			var ihistory = $("#jQuery_history")[0];
			var iframe = ihistory.contentDocument || ihistory.contentWindow.document;
			var current_hash = iframe.location.hash;
			if(current_hash != jQuery.historyCurrentHash) {
			
				location.hash = current_hash;
				jQuery.historyCurrentHash = current_hash;
				jQuery.historyCallback(current_hash.replace(/^#/, ''));
				
			}
		} else if ($.browser.safari) {
			if (!jQuery.dontCheck) {
				var historyDelta = history.length - jQuery.historyBackStack.length;
				
				if (historyDelta) { // back or forward button has been pushed
					jQuery.isFirst = false;
					var i;
					if (historyDelta < 0) { // back button has been pushed
						// move items to forward stack
						for (i = 0; i < Math.abs(historyDelta); i++) {
							jQuery.historyForwardStack.unshift(jQuery.historyBackStack.pop());
						}
					} else { // forward button has been pushed
						// move items to back stack
						for (i = 0; i < historyDelta; i++) {
							jQuery.historyBackStack.push(jQuery.historyForwardStack.shift());
						}
					}
					var cachedHash = jQuery.historyBackStack[jQuery.historyBackStack.length - 1];
					if (cachedHash !== undefined) {
						jQuery.historyCurrentHash = location.hash;
						jQuery.historyCallback(cachedHash);
					}
				} else if (jQuery.historyBackStack[jQuery.historyBackStack.length - 1] === undefined && !jQuery.isFirst) {
					// back button has been pushed to beginning and URL already pointed to hash (e.g. a bookmark)
					// document.URL doesn't change in Safari
					if (document.URL.indexOf('#') >= 0) {
						jQuery.historyCallback(document.URL.split('#')[1]);
					} else {
						current_hash = location.hash;
						jQuery.historyCallback('');
					}
					jQuery.isFirst = true;
				}
			}
		} else {
			// otherwise, check for location.hash
			current_hash = location.hash;
			if(current_hash != jQuery.historyCurrentHash) {
				jQuery.historyCurrentHash = current_hash;
				jQuery.historyCallback(current_hash.replace(/^#/, ''));
			}
		}
	},
	historyLoad: function(hash){
		var newhash;
		
		if (jQuery.browser.safari) {
			newhash = hash;
		}
		else {
			newhash = '#' + hash;
			location.hash = newhash;
		}
		jQuery.historyCurrentHash = newhash;
		
		if(jQuery.browser.msie) {
			var ihistory = $("#jQuery_history")[0];
			var iframe = ihistory.contentWindow.document;
			iframe.open();
			iframe.close();
			iframe.location.hash = newhash;
			jQuery.historyCallback(hash);
		}
		else if (jQuery.browser.safari) {
			jQuery.dontCheck = true;
			// Manually keep track of the history values for Safari
			this.historyAddHistory(hash);
			
			// Wait a while before allowing checking so that Safari has time to update the "history" object
			// correctly (otherwise the check loop would detect a false change in hash).
			var fn = function() {jQuery.dontCheck = false;};
			window.setTimeout(fn, 200);
			jQuery.historyCallback(hash);
			// N.B. "location.hash=" must be the last line of code for Safari as execution stops afterwards.
			//      By explicitly using the "location.hash" command (instead of using a variable set to "location.hash") the
			//      URL in the browser and the "history" object are both updated correctly.
			location.hash = newhash;
		}
		else {
		  jQuery.historyCallback(hash);
		}
	}
});;
jQuery.extend({
  // Map recentering code
  setMapCenter: function(center) {
    var map = Drupal.gmap.getMap('all_locations').map;
    var ctrManLat = 40.7831411;	var ctrManLon = -73.965111;
    var ctrBrxLat = 40.8579672;	var ctrBrxLon = -73.873100;
    var ctrStaLat = 40.5884067;	var ctrStaLon = -74.149818;

    if (center == 'Bx') {
    var X = ctrBrxLat;
    var Y = ctrBrxLon;
    }
    if (center == 'Man') {
    var X = ctrManLat;
    var Y = ctrManLon;
    }
    if (center == 'Sta') {
    var X = ctrStaLat;
    var Y = ctrStaLon;
    }
     map.setCenter(new GLatLng(X,Y), 12);
     window.setTimeout(function() { map.panTo(new GLatLng(X,Y)); }, 1000); 
    }
  
});

// GA tracking events for main Google Map v3
;
/*!
 * jQuery Cycle Plugin (core engine)
 * Examples and documentation at: http://jquery.malsup.com/cycle/
 * Copyright (c) 2007-2010 M. Alsup
 * Version: 2.88 (08-JUN-2010)
 * Dual licensed under the MIT and GPL licenses.
 * http://jquery.malsup.com/license.html
 * Requires: jQuery v1.2.6 or later
 */
;(function($) {

var ver = '2.88';

// if $.support is not defined (pre jQuery 1.3) add what I need
if ($.support == undefined) {
	$.support = {
		opacity: !($.browser.msie)
	};
}

function debug(s) {
	if ($.fn.cycle.debug)
		log(s);
}		
function log() {
	if (window.console && window.console.log)
		window.console.log('[cycle] ' + Array.prototype.join.call(arguments,' '));
};

// the options arg can be...
//   a number  - indicates an immediate transition should occur to the given slide index
//   a string  - 'pause', 'resume', 'toggle', 'next', 'prev', 'stop', 'destroy' or the name of a transition effect (ie, 'fade', 'zoom', etc)
//   an object - properties to control the slideshow
//
// the arg2 arg can be...
//   the name of an fx (only used in conjunction with a numeric value for 'options')
//   the value true (only used in first arg == 'resume') and indicates
//	 that the resume should occur immediately (not wait for next timeout)

$.fn.cycle = function(options, arg2) {
	var o = { s: this.selector, c: this.context };

	// in 1.3+ we can fix mistakes with the ready state
	if (this.length === 0 && options != 'stop') {
		if (!$.isReady && o.s) {
			log('DOM not ready, queuing slideshow');
			$(function() {
				$(o.s,o.c).cycle(options,arg2);
			});
			return this;
		}
		// is your DOM ready?  http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
		log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
		return this;
	}

	// iterate the matched nodeset
	return this.each(function() {
		var opts = handleArguments(this, options, arg2);
		if (opts === false)
			return;

		opts.updateActivePagerLink = opts.updateActivePagerLink || $.fn.cycle.updateActivePagerLink;
		
		// stop existing slideshow for this container (if there is one)
		if (this.cycleTimeout)
			clearTimeout(this.cycleTimeout);
		this.cycleTimeout = this.cyclePause = 0;

		var $cont = $(this);
		var $slides = opts.slideExpr ? $(opts.slideExpr, this) : $cont.children();
		var els = $slides.get();
		if (els.length < 2) {
			log('terminating; too few slides: ' + els.length);
			return;
		}

		var opts2 = buildOptions($cont, $slides, els, opts, o);
		if (opts2 === false)
			return;

		var startTime = opts2.continuous ? 10 : getTimeout(els[opts2.currSlide], els[opts2.nextSlide], opts2, !opts2.rev);

		// if it's an auto slideshow, kick it off
		if (startTime) {
			startTime += (opts2.delay || 0);
			if (startTime < 10)
				startTime = 10;
			debug('first timeout: ' + startTime);
			this.cycleTimeout = setTimeout(function(){go(els,opts2,0,(!opts2.rev && !opts.backwards))}, startTime);
		}
	});
};

// process the args that were passed to the plugin fn
function handleArguments(cont, options, arg2) {
	if (cont.cycleStop == undefined)
		cont.cycleStop = 0;
	if (options === undefined || options === null)
		options = {};
	if (options.constructor == String) {
		switch(options) {
		case 'destroy':
		case 'stop':
			var opts = $(cont).data('cycle.opts');
			if (!opts)
				return false;
			cont.cycleStop++; // callbacks look for change
			if (cont.cycleTimeout)
				clearTimeout(cont.cycleTimeout);
			cont.cycleTimeout = 0;
			$(cont).removeData('cycle.opts');
			if (options == 'destroy')
				destroy(opts);
			return false;
		case 'toggle':
			cont.cyclePause = (cont.cyclePause === 1) ? 0 : 1;
			checkInstantResume(cont.cyclePause, arg2, cont);
			return false;
		case 'pause':
			cont.cyclePause = 1;
			return false;
		case 'resume':
			cont.cyclePause = 0;
			checkInstantResume(false, arg2, cont);
			return false;
		case 'prev':
		case 'next':
			var opts = $(cont).data('cycle.opts');
			if (!opts) {
				log('options not found, "prev/next" ignored');
				return false;
			}
			$.fn.cycle[options](opts);
			return false;
		default:
			options = { fx: options };
		};
		return options;
	}
	else if (options.constructor == Number) {
		// go to the requested slide
		var num = options;
		options = $(cont).data('cycle.opts');
		if (!options) {
			log('options not found, can not advance slide');
			return false;
		}
		if (num < 0 || num >= options.elements.length) {
			log('invalid slide index: ' + num);
			return false;
		}
		options.nextSlide = num;
		if (cont.cycleTimeout) {
			clearTimeout(cont.cycleTimeout);
			cont.cycleTimeout = 0;
		}
		if (typeof arg2 == 'string')
			options.oneTimeFx = arg2;
		go(options.elements, options, 1, num >= options.currSlide);
		return false;
	}
	return options;
	
	function checkInstantResume(isPaused, arg2, cont) {
		if (!isPaused && arg2 === true) { // resume now!
			var options = $(cont).data('cycle.opts');
			if (!options) {
				log('options not found, can not resume');
				return false;
			}
			if (cont.cycleTimeout) {
				clearTimeout(cont.cycleTimeout);
				cont.cycleTimeout = 0;
			}
			go(options.elements, options, 1, (!opts.rev && !opts.backwards));
		}
	}
};

function removeFilter(el, opts) {
	if (!$.support.opacity && opts.cleartype && el.style.filter) {
		try { el.style.removeAttribute('filter'); }
		catch(smother) {} // handle old opera versions
	}
};

// unbind event handlers
function destroy(opts) {
	if (opts.next)
		$(opts.next).unbind(opts.prevNextEvent);
	if (opts.prev)
		$(opts.prev).unbind(opts.prevNextEvent);
	
	if (opts.pager || opts.pagerAnchorBuilder)
		$.each(opts.pagerAnchors || [], function() {
			this.unbind().remove();
		});
	opts.pagerAnchors = null;
	if (opts.destroy) // callback
		opts.destroy(opts);
};

// one-time initialization
function buildOptions($cont, $slides, els, options, o) {
	// support metadata plugin (v1.0 and v2.0)
	var opts = $.extend({}, $.fn.cycle.defaults, options || {}, $.metadata ? $cont.metadata() : $.meta ? $cont.data() : {});
	if (opts.autostop)
		opts.countdown = opts.autostopCount || els.length;

	var cont = $cont[0];
	$cont.data('cycle.opts', opts);
	opts.$cont = $cont;
	opts.stopCount = cont.cycleStop;
	opts.elements = els;
	opts.before = opts.before ? [opts.before] : [];
	opts.after = opts.after ? [opts.after] : [];
	opts.after.unshift(function(){ opts.busy=0; });

	// push some after callbacks
	if (!$.support.opacity && opts.cleartype)
		opts.after.push(function() { removeFilter(this, opts); });
	if (opts.continuous)
		opts.after.push(function() { go(els,opts,0,(!opts.rev && !opts.backwards)); });

	saveOriginalOpts(opts);

	// clearType corrections
	if (!$.support.opacity && opts.cleartype && !opts.cleartypeNoBg)
		clearTypeFix($slides);

	// container requires non-static position so that slides can be position within
	if ($cont.css('position') == 'static')
		$cont.css('position', 'relative');
	if (opts.width)
		$cont.width(opts.width);
	if (opts.height && opts.height != 'auto')
		$cont.height(opts.height);

	if (opts.startingSlide)
		opts.startingSlide = parseInt(opts.startingSlide);
	else if (opts.backwards)
		opts.startingSlide = els.length - 1;

	// if random, mix up the slide array
	if (opts.random) {
		opts.randomMap = [];
		for (var i = 0; i < els.length; i++)
			opts.randomMap.push(i);
		opts.randomMap.sort(function(a,b) {return Math.random() - 0.5;});
		opts.randomIndex = 1;
		opts.startingSlide = opts.randomMap[1];
	}
	else if (opts.startingSlide >= els.length)
		opts.startingSlide = 0; // catch bogus input
	opts.currSlide = opts.startingSlide || 0;
	var first = opts.startingSlide;

	// set position and zIndex on all the slides
	$slides.css({position: 'absolute', top:0, left:0}).hide().each(function(i) {
		var z;
		if (opts.backwards)
			z = first ? i <= first ? els.length + (i-first) : first-i : els.length-i;
		else
			z = first ? i >= first ? els.length - (i-first) : first-i : els.length-i;
		$(this).css('z-index', z)
	});

	// make sure first slide is visible
	$(els[first]).css('opacity',1).show(); // opacity bit needed to handle restart use case
	removeFilter(els[first], opts);

	// stretch slides
	if (opts.fit && opts.width)
		$slides.width(opts.width);
	if (opts.fit && opts.height && opts.height != 'auto')
		$slides.height(opts.height);

	// stretch container
	var reshape = opts.containerResize && !$cont.innerHeight();
	if (reshape) { // do this only if container has no size http://tinyurl.com/da2oa9
		var maxw = 0, maxh = 0;
		for(var j=0; j < els.length; j++) {
			var $e = $(els[j]), e = $e[0], w = $e.outerWidth(), h = $e.outerHeight();
			if (!w) w = e.offsetWidth || e.width || $e.attr('width')
			if (!h) h = e.offsetHeight || e.height || $e.attr('height');
			maxw = w > maxw ? w : maxw;
			maxh = h > maxh ? h : maxh;
		}
		if (maxw > 0 && maxh > 0)
			$cont.css({width:maxw+'px',height:maxh+'px'});
	}

	if (opts.pause)
		$cont.hover(function(){this.cyclePause++;},function(){this.cyclePause--;});

	if (supportMultiTransitions(opts) === false)
		return false;

	// apparently a lot of people use image slideshows without height/width attributes on the images.
	// Cycle 2.50+ requires the sizing info for every slide; this block tries to deal with that.
	var requeue = false;
	options.requeueAttempts = options.requeueAttempts || 0;
	$slides.each(function() {
		// try to get height/width of each slide
		var $el = $(this);
		this.cycleH = (opts.fit && opts.height) ? opts.height : ($el.height() || this.offsetHeight || this.height || $el.attr('height') || 0);
		this.cycleW = (opts.fit && opts.width) ? opts.width : ($el.width() || this.offsetWidth || this.width || $el.attr('width') || 0);

		if ( $el.is('img') ) {
			// sigh..  sniffing, hacking, shrugging...  this crappy hack tries to account for what browsers do when
			// an image is being downloaded and the markup did not include sizing info (height/width attributes);
			// there seems to be some "default" sizes used in this situation
			var loadingIE	= ($.browser.msie  && this.cycleW == 28 && this.cycleH == 30 && !this.complete);
			var loadingFF	= ($.browser.mozilla && this.cycleW == 34 && this.cycleH == 19 && !this.complete);
			var loadingOp	= ($.browser.opera && ((this.cycleW == 42 && this.cycleH == 19) || (this.cycleW == 37 && this.cycleH == 17)) && !this.complete);
			var loadingOther = (this.cycleH == 0 && this.cycleW == 0 && !this.complete);
			// don't requeue for images that are still loading but have a valid size
			if (loadingIE || loadingFF || loadingOp || loadingOther) {
				if (o.s && opts.requeueOnImageNotLoaded && ++options.requeueAttempts < 100) { // track retry count so we don't loop forever
					log(options.requeueAttempts,' - img slide not loaded, requeuing slideshow: ', this.src, this.cycleW, this.cycleH);
					setTimeout(function() {$(o.s,o.c).cycle(options)}, opts.requeueTimeout);
					requeue = true;
					return false; // break each loop
				}
				else {
					log('could not determine size of image: '+this.src, this.cycleW, this.cycleH);
				}
			}
		}
		return true;
	});

	if (requeue)
		return false;

	opts.cssBefore = opts.cssBefore || {};
	opts.animIn = opts.animIn || {};
	opts.animOut = opts.animOut || {};

	$slides.not(':eq('+first+')').css(opts.cssBefore);
	if (opts.cssFirst)
		$($slides[first]).css(opts.cssFirst);

	if (opts.timeout) {
		opts.timeout = parseInt(opts.timeout);
		// ensure that timeout and speed settings are sane
		if (opts.speed.constructor == String)
			opts.speed = $.fx.speeds[opts.speed] || parseInt(opts.speed);
		if (!opts.sync)
			opts.speed = opts.speed / 2;
		
		var buffer = opts.fx == 'shuffle' ? 500 : 250;
		while((opts.timeout - opts.speed) < buffer) // sanitize timeout
			opts.timeout += opts.speed;
	}
	if (opts.easing)
		opts.easeIn = opts.easeOut = opts.easing;
	if (!opts.speedIn)
		opts.speedIn = opts.speed;
	if (!opts.speedOut)
		opts.speedOut = opts.speed;

	opts.slideCount = els.length;
	opts.currSlide = opts.lastSlide = first;
	if (opts.random) {
		if (++opts.randomIndex == els.length)
			opts.randomIndex = 0;
		opts.nextSlide = opts.randomMap[opts.randomIndex];
	}
	else if (opts.backwards)
		opts.nextSlide = opts.startingSlide == 0 ? (els.length-1) : opts.startingSlide-1;
	else
		opts.nextSlide = opts.startingSlide >= (els.length-1) ? 0 : opts.startingSlide+1;

	// run transition init fn
	if (!opts.multiFx) {
		var init = $.fn.cycle.transitions[opts.fx];
		if ($.isFunction(init))
			init($cont, $slides, opts);
		else if (opts.fx != 'custom' && !opts.multiFx) {
			log('unknown transition: ' + opts.fx,'; slideshow terminating');
			return false;
		}
	}

	// fire artificial events
	var e0 = $slides[first];
	if (opts.before.length)
		opts.before[0].apply(e0, [e0, e0, opts, true]);
	if (opts.after.length > 1)
		opts.after[1].apply(e0, [e0, e0, opts, true]);

	if (opts.next)
		$(opts.next).bind(opts.prevNextEvent,function(){return advance(opts,opts.rev?-1:1)});
	if (opts.prev)
		$(opts.prev).bind(opts.prevNextEvent,function(){return advance(opts,opts.rev?1:-1)});
	if (opts.pager || opts.pagerAnchorBuilder)
		buildPager(els,opts);

	exposeAddSlide(opts, els);

	return opts;
};

// save off original opts so we can restore after clearing state
function saveOriginalOpts(opts) {
	opts.original = { before: [], after: [] };
	opts.original.cssBefore = $.extend({}, opts.cssBefore);
	opts.original.cssAfter  = $.extend({}, opts.cssAfter);
	opts.original.animIn	= $.extend({}, opts.animIn);
	opts.original.animOut   = $.extend({}, opts.animOut);
	$.each(opts.before, function() { opts.original.before.push(this); });
	$.each(opts.after,  function() { opts.original.after.push(this); });
};

function supportMultiTransitions(opts) {
	var i, tx, txs = $.fn.cycle.transitions;
	// look for multiple effects
	if (opts.fx.indexOf(',') > 0) {
		opts.multiFx = true;
		opts.fxs = opts.fx.replace(/\s*/g,'').split(',');
		// discard any bogus effect names
		for (i=0; i < opts.fxs.length; i++) {
			var fx = opts.fxs[i];
			tx = txs[fx];
			if (!tx || !txs.hasOwnProperty(fx) || !$.isFunction(tx)) {
				log('discarding unknown transition: ',fx);
				opts.fxs.splice(i,1);
				i--;
			}
		}
		// if we have an empty list then we threw everything away!
		if (!opts.fxs.length) {
			log('No valid transitions named; slideshow terminating.');
			return false;
		}
	}
	else if (opts.fx == 'all') {  // auto-gen the list of transitions
		opts.multiFx = true;
		opts.fxs = [];
		for (p in txs) {
			tx = txs[p];
			if (txs.hasOwnProperty(p) && $.isFunction(tx))
				opts.fxs.push(p);
		}
	}
	if (opts.multiFx && opts.randomizeEffects) {
		// munge the fxs array to make effect selection random
		var r1 = Math.floor(Math.random() * 20) + 30;
		for (i = 0; i < r1; i++) {
			var r2 = Math.floor(Math.random() * opts.fxs.length);
			opts.fxs.push(opts.fxs.splice(r2,1)[0]);
		}
		debug('randomized fx sequence: ',opts.fxs);
	}
	return true;
};

// provide a mechanism for adding slides after the slideshow has started
function exposeAddSlide(opts, els) {
	opts.addSlide = function(newSlide, prepend) {
		var $s = $(newSlide), s = $s[0];
		if (!opts.autostopCount)
			opts.countdown++;
		els[prepend?'unshift':'push'](s);
		if (opts.els)
			opts.els[prepend?'unshift':'push'](s); // shuffle needs this
		opts.slideCount = els.length;

		$s.css('position','absolute');
		$s[prepend?'prependTo':'appendTo'](opts.$cont);

		if (prepend) {
			opts.currSlide++;
			opts.nextSlide++;
		}

		if (!$.support.opacity && opts.cleartype && !opts.cleartypeNoBg)
			clearTypeFix($s);

		if (opts.fit && opts.width)
			$s.width(opts.width);
		if (opts.fit && opts.height && opts.height != 'auto')
			$slides.height(opts.height);
		s.cycleH = (opts.fit && opts.height) ? opts.height : $s.height();
		s.cycleW = (opts.fit && opts.width) ? opts.width : $s.width();

		$s.css(opts.cssBefore);

		if (opts.pager || opts.pagerAnchorBuilder)
			$.fn.cycle.createPagerAnchor(els.length-1, s, $(opts.pager), els, opts);

		if ($.isFunction(opts.onAddSlide))
			opts.onAddSlide($s);
		else
			$s.hide(); // default behavior
	};
}

// reset internal state; we do this on every pass in order to support multiple effects
$.fn.cycle.resetState = function(opts, fx) {
	fx = fx || opts.fx;
	opts.before = []; opts.after = [];
	opts.cssBefore = $.extend({}, opts.original.cssBefore);
	opts.cssAfter  = $.extend({}, opts.original.cssAfter);
	opts.animIn	= $.extend({}, opts.original.animIn);
	opts.animOut   = $.extend({}, opts.original.animOut);
	opts.fxFn = null;
	$.each(opts.original.before, function() { opts.before.push(this); });
	$.each(opts.original.after,  function() { opts.after.push(this); });

	// re-init
	var init = $.fn.cycle.transitions[fx];
	if ($.isFunction(init))
		init(opts.$cont, $(opts.elements), opts);
};

// this is the main engine fn, it handles the timeouts, callbacks and slide index mgmt
function go(els, opts, manual, fwd) {
	// opts.busy is true if we're in the middle of an animation
	if (manual && opts.busy && opts.manualTrump) {
		// let manual transitions requests trump active ones
		debug('manualTrump in go(), stopping active transition');
		$(els).stop(true,true);
		opts.busy = false;
	}
	// don't begin another timeout-based transition if there is one active
	if (opts.busy) {
		debug('transition active, ignoring new tx request');
		return;
	}

	var p = opts.$cont[0], curr = els[opts.currSlide], next = els[opts.nextSlide];

	// stop cycling if we have an outstanding stop request
	if (p.cycleStop != opts.stopCount || p.cycleTimeout === 0 && !manual)
		return;

	// check to see if we should stop cycling based on autostop options
	if (!manual && !p.cyclePause && !opts.bounce &&
		((opts.autostop && (--opts.countdown <= 0)) ||
		(opts.nowrap && !opts.random && opts.nextSlide < opts.currSlide))) {
		if (opts.end)
			opts.end(opts);
		return;
	}

	// if slideshow is paused, only transition on a manual trigger
	var changed = false;
	if ((manual || !p.cyclePause) && (opts.nextSlide != opts.currSlide)) {
		changed = true;
		var fx = opts.fx;
		// keep trying to get the slide size if we don't have it yet
		curr.cycleH = curr.cycleH || $(curr).height();
		curr.cycleW = curr.cycleW || $(curr).width();
		next.cycleH = next.cycleH || $(next).height();
		next.cycleW = next.cycleW || $(next).width();

		// support multiple transition types
		if (opts.multiFx) {
			if (opts.lastFx == undefined || ++opts.lastFx >= opts.fxs.length)
				opts.lastFx = 0;
			fx = opts.fxs[opts.lastFx];
			opts.currFx = fx;
		}

		// one-time fx overrides apply to:  $('div').cycle(3,'zoom');
		if (opts.oneTimeFx) {
			fx = opts.oneTimeFx;
			opts.oneTimeFx = null;
		}

		$.fn.cycle.resetState(opts, fx);

		// run the before callbacks
		if (opts.before.length)
			$.each(opts.before, function(i,o) {
				if (p.cycleStop != opts.stopCount) return;
				o.apply(next, [curr, next, opts, fwd]);
			});

		// stage the after callacks
		var after = function() {
			$.each(opts.after, function(i,o) {
				if (p.cycleStop != opts.stopCount) return;
				o.apply(next, [curr, next, opts, fwd]);
			});
		};

		debug('tx firing; currSlide: ' + opts.currSlide + '; nextSlide: ' + opts.nextSlide);
		
		// get ready to perform the transition
		opts.busy = 1;
		if (opts.fxFn) // fx function provided?
			opts.fxFn(curr, next, opts, after, fwd, manual && opts.fastOnEvent);
		else if ($.isFunction($.fn.cycle[opts.fx])) // fx plugin ?
			$.fn.cycle[opts.fx](curr, next, opts, after, fwd, manual && opts.fastOnEvent);
		else
			$.fn.cycle.custom(curr, next, opts, after, fwd, manual && opts.fastOnEvent);
	}

	if (changed || opts.nextSlide == opts.currSlide) {
		// calculate the next slide
		opts.lastSlide = opts.currSlide;
		if (opts.random) {
			opts.currSlide = opts.nextSlide;
			if (++opts.randomIndex == els.length)
				opts.randomIndex = 0;
			opts.nextSlide = opts.randomMap[opts.randomIndex];
			if (opts.nextSlide == opts.currSlide)
				opts.nextSlide = (opts.currSlide == opts.slideCount - 1) ? 0 : opts.currSlide + 1;
		}
		else if (opts.backwards) {
			var roll = (opts.nextSlide - 1) < 0;
			if (roll && opts.bounce) {
				opts.backwards = !opts.backwards;
				opts.nextSlide = 1;
				opts.currSlide = 0;
			}
			else {
				opts.nextSlide = roll ? (els.length-1) : opts.nextSlide-1;
				opts.currSlide = roll ? 0 : opts.nextSlide+1;
			}
		}
		else { // sequence
			var roll = (opts.nextSlide + 1) == els.length;
			if (roll && opts.bounce) {
				opts.backwards = !opts.backwards;
				opts.nextSlide = els.length-2;
				opts.currSlide = els.length-1;
			}
			else {
				opts.nextSlide = roll ? 0 : opts.nextSlide+1;
				opts.currSlide = roll ? els.length-1 : opts.nextSlide-1;
			}
		}
	}
	if (changed && opts.pager)
		opts.updateActivePagerLink(opts.pager, opts.currSlide, opts.activePagerClass);
	
	// stage the next transition
	var ms = 0;
	if (opts.timeout && !opts.continuous)
		ms = getTimeout(els[opts.currSlide], els[opts.nextSlide], opts, fwd);
	else if (opts.continuous && p.cyclePause) // continuous shows work off an after callback, not this timer logic
		ms = 10;
	if (ms > 0)
		p.cycleTimeout = setTimeout(function(){ go(els, opts, 0, (!opts.rev && !opts.backwards)) }, ms);
};

// invoked after transition
$.fn.cycle.updateActivePagerLink = function(pager, currSlide, clsName) {
   $(pager).each(function() {
       $(this).children().removeClass(clsName).eq(currSlide).addClass(clsName);
   });
};

// calculate timeout value for current transition
function getTimeout(curr, next, opts, fwd) {
	if (opts.timeoutFn) {
		// call user provided calc fn
		var t = opts.timeoutFn.call(curr,curr,next,opts,fwd);
		while ((t - opts.speed) < 250) // sanitize timeout
			t += opts.speed;
		debug('calculated timeout: ' + t + '; speed: ' + opts.speed);
		if (t !== false)
			return t;
	}
	return opts.timeout;
};

// expose next/prev function, caller must pass in state
$.fn.cycle.next = function(opts) { advance(opts, opts.rev?-1:1); };
$.fn.cycle.prev = function(opts) { advance(opts, opts.rev?1:-1);};

// advance slide forward or back
function advance(opts, val) {
	var els = opts.elements;
	var p = opts.$cont[0], timeout = p.cycleTimeout;
	if (timeout) {
		clearTimeout(timeout);
		p.cycleTimeout = 0;
	}
	if (opts.random && val < 0) {
		// move back to the previously display slide
		opts.randomIndex--;
		if (--opts.randomIndex == -2)
			opts.randomIndex = els.length-2;
		else if (opts.randomIndex == -1)
			opts.randomIndex = els.length-1;
		opts.nextSlide = opts.randomMap[opts.randomIndex];
	}
	else if (opts.random) {
		opts.nextSlide = opts.randomMap[opts.randomIndex];
	}
	else {
		opts.nextSlide = opts.currSlide + val;
		if (opts.nextSlide < 0) {
			if (opts.nowrap) return false;
			opts.nextSlide = els.length - 1;
		}
		else if (opts.nextSlide >= els.length) {
			if (opts.nowrap) return false;
			opts.nextSlide = 0;
		}
	}

	var cb = opts.onPrevNextEvent || opts.prevNextClick; // prevNextClick is deprecated
	if ($.isFunction(cb))
		cb(val > 0, opts.nextSlide, els[opts.nextSlide]);
	go(els, opts, 1, val>=0);
	return false;
};

function buildPager(els, opts) {
	var $p = $(opts.pager);
	$.each(els, function(i,o) {
		$.fn.cycle.createPagerAnchor(i,o,$p,els,opts);
	});
	opts.updateActivePagerLink(opts.pager, opts.startingSlide, opts.activePagerClass);
};

$.fn.cycle.createPagerAnchor = function(i, el, $p, els, opts) {
	var a;
	if ($.isFunction(opts.pagerAnchorBuilder)) {
		a = opts.pagerAnchorBuilder(i,el);
		debug('pagerAnchorBuilder('+i+', el) returned: ' + a);
	}
	else
		a = '<a href="#">'+(i+1)+'</a>';
		
	if (!a)
		return;
	var $a = $(a);
	// don't reparent if anchor is in the dom
	if ($a.parents('body').length === 0) {
		var arr = [];
		if ($p.length > 1) {
			$p.each(function() {
				var $clone = $a.clone(true);
				$(this).append($clone);
				arr.push($clone[0]);
			});
			$a = $(arr);
		}
		else {
			$a.appendTo($p);
		}
	}

	opts.pagerAnchors =  opts.pagerAnchors || [];
	opts.pagerAnchors.push($a);
	$a.bind(opts.pagerEvent, function(e) {
		e.preventDefault();
		opts.nextSlide = i;
		var p = opts.$cont[0], timeout = p.cycleTimeout;
		if (timeout) {
			clearTimeout(timeout);
			p.cycleTimeout = 0;
		}
		var cb = opts.onPagerEvent || opts.pagerClick; // pagerClick is deprecated
		if ($.isFunction(cb))
			cb(opts.nextSlide, els[opts.nextSlide]);
		go(els,opts,1,opts.currSlide < i); // trigger the trans
//		return false; // <== allow bubble
	});
	
	if ( ! /^click/.test(opts.pagerEvent) && !opts.allowPagerClickBubble)
		$a.bind('click.cycle', function(){return false;}); // suppress click
	
	if (opts.pauseOnPagerHover)
		$a.hover(function() { opts.$cont[0].cyclePause++; }, function() { opts.$cont[0].cyclePause--; } );
};

// helper fn to calculate the number of slides between the current and the next
$.fn.cycle.hopsFromLast = function(opts, fwd) {
	var hops, l = opts.lastSlide, c = opts.currSlide;
	if (fwd)
		hops = c > l ? c - l : opts.slideCount - l;
	else
		hops = c < l ? l - c : l + opts.slideCount - c;
	return hops;
};

// fix clearType problems in ie6 by setting an explicit bg color
// (otherwise text slides look horrible during a fade transition)
function clearTypeFix($slides) {
	debug('applying clearType background-color hack');
	function hex(s) {
		s = parseInt(s).toString(16);
		return s.length < 2 ? '0'+s : s;
	};
	function getBg(e) {
		for ( ; e && e.nodeName.toLowerCase() != 'html'; e = e.parentNode) {
			var v = $.css(e,'background-color');
			if (v.indexOf('rgb') >= 0 ) {
				var rgb = v.match(/\d+/g);
				return '#'+ hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
			}
			if (v && v != 'transparent')
				return v;
		}
		return '#ffffff';
	};
	$slides.each(function() { $(this).css('background-color', getBg(this)); });
};

// reset common props before the next transition
$.fn.cycle.commonReset = function(curr,next,opts,w,h,rev) {
	$(opts.elements).not(curr).hide();
	opts.cssBefore.opacity = 1;
	opts.cssBefore.display = 'block';
	if (w !== false && next.cycleW > 0)
		opts.cssBefore.width = next.cycleW;
	if (h !== false && next.cycleH > 0)
		opts.cssBefore.height = next.cycleH;
	opts.cssAfter = opts.cssAfter || {};
	opts.cssAfter.display = 'none';
	$(curr).css('zIndex',opts.slideCount + (rev === true ? 1 : 0));
	$(next).css('zIndex',opts.slideCount + (rev === true ? 0 : 1));
};

// the actual fn for effecting a transition
$.fn.cycle.custom = function(curr, next, opts, cb, fwd, speedOverride) {
	var $l = $(curr), $n = $(next);
	var speedIn = opts.speedIn, speedOut = opts.speedOut, easeIn = opts.easeIn, easeOut = opts.easeOut;
	$n.css(opts.cssBefore);
	if (speedOverride) {
		if (typeof speedOverride == 'number')
			speedIn = speedOut = speedOverride;
		else
			speedIn = speedOut = 1;
		easeIn = easeOut = null;
	}
	var fn = function() {$n.animate(opts.animIn, speedIn, easeIn, cb)};
	$l.animate(opts.animOut, speedOut, easeOut, function() {
		if (opts.cssAfter) $l.css(opts.cssAfter);
		if (!opts.sync) fn();
	});
	if (opts.sync) fn();
};

// transition definitions - only fade is defined here, transition pack defines the rest
$.fn.cycle.transitions = {
	fade: function($cont, $slides, opts) {
		$slides.not(':eq('+opts.currSlide+')').css('opacity',0);
		opts.before.push(function(curr,next,opts) {
			$.fn.cycle.commonReset(curr,next,opts);
			opts.cssBefore.opacity = 0;
		});
		opts.animIn	   = { opacity: 1 };
		opts.animOut   = { opacity: 0 };
		opts.cssBefore = { top: 0, left: 0 };
	}
};

$.fn.cycle.ver = function() { return ver; };

// override these globally if you like (they are all optional)
$.fn.cycle.defaults = {
	fx:			  'fade', // name of transition effect (or comma separated names, ex: 'fade,scrollUp,shuffle')
	timeout:	   4000,  // milliseconds between slide transitions (0 to disable auto advance)
	timeoutFn:     null,  // callback for determining per-slide timeout value:  function(currSlideElement, nextSlideElement, options, forwardFlag)
	continuous:	   0,	  // true to start next transition immediately after current one completes
	speed:		   1000,  // speed of the transition (any valid fx speed value)
	speedIn:	   null,  // speed of the 'in' transition
	speedOut:	   null,  // speed of the 'out' transition
	next:		   null,  // selector for element to use as event trigger for next slide
	prev:		   null,  // selector for element to use as event trigger for previous slide
//	prevNextClick: null,  // @deprecated; please use onPrevNextEvent instead
	onPrevNextEvent: null,  // callback fn for prev/next events: function(isNext, zeroBasedSlideIndex, slideElement)
	prevNextEvent:'click.cycle',// event which drives the manual transition to the previous or next slide
	pager:		   null,  // selector for element to use as pager container
	//pagerClick   null,  // @deprecated; please use onPagerEvent instead
	onPagerEvent:  null,  // callback fn for pager events: function(zeroBasedSlideIndex, slideElement)
	pagerEvent:	  'click.cycle', // name of event which drives the pager navigation
	allowPagerClickBubble: false, // allows or prevents click event on pager anchors from bubbling
	pagerAnchorBuilder: null, // callback fn for building anchor links:  function(index, DOMelement)
	before:		   null,  // transition callback (scope set to element to be shown):	 function(currSlideElement, nextSlideElement, options, forwardFlag)
	after:		   null,  // transition callback (scope set to element that was shown):  function(currSlideElement, nextSlideElement, options, forwardFlag)
	end:		   null,  // callback invoked when the slideshow terminates (use with autostop or nowrap options): function(options)
	easing:		   null,  // easing method for both in and out transitions
	easeIn:		   null,  // easing for "in" transition
	easeOut:	   null,  // easing for "out" transition
	shuffle:	   null,  // coords for shuffle animation, ex: { top:15, left: 200 }
	animIn:		   null,  // properties that define how the slide animates in
	animOut:	   null,  // properties that define how the slide animates out
	cssBefore:	   null,  // properties that define the initial state of the slide before transitioning in
	cssAfter:	   null,  // properties that defined the state of the slide after transitioning out
	fxFn:		   null,  // function used to control the transition: function(currSlideElement, nextSlideElement, options, afterCalback, forwardFlag)
	height:		  'auto', // container height
	startingSlide: 0,	  // zero-based index of the first slide to be displayed
	sync:		   1,	  // true if in/out transitions should occur simultaneously
	random:		   0,	  // true for random, false for sequence (not applicable to shuffle fx)
	fit:		   0,	  // force slides to fit container
	containerResize: 1,	  // resize container to fit largest slide
	pause:		   0,	  // true to enable "pause on hover"
	pauseOnPagerHover: 0, // true to pause when hovering over pager link
	autostop:	   0,	  // true to end slideshow after X transitions (where X == slide count)
	autostopCount: 0,	  // number of transitions (optionally used with autostop to define X)
	delay:		   0,	  // additional delay (in ms) for first transition (hint: can be negative)
	slideExpr:	   null,  // expression for selecting slides (if something other than all children is required)
	cleartype:	   !$.support.opacity,  // true if clearType corrections should be applied (for IE)
	cleartypeNoBg: false, // set to true to disable extra cleartype fixing (leave false to force background color setting on slides)
	nowrap:		   0,	  // true to prevent slideshow from wrapping
	fastOnEvent:   0,	  // force fast transitions when triggered manually (via pager or prev/next); value == time in ms
	randomizeEffects: 1,  // valid when multiple effects are used; true to make the effect sequence random
	rev:		   0,	 // causes animations to transition in reverse
	manualTrump:   true,  // causes manual transition to stop an active transition instead of being ignored
	requeueOnImageNotLoaded: true, // requeue the slideshow if any image slides are not yet loaded
	requeueTimeout: 250,  // ms delay for requeue
	activePagerClass: 'activeSlide', // class name used for the active pager link
	updateActivePagerLink: null, // callback fn invoked to update the active pager link (adds/removes activePagerClass style)
	backwards:     false  // true to start slideshow at last slide and move backwards through the stack
};

})(jQuery);
;
// ColorBox v1.3.16 - a full featured, light-weight, customizable lightbox based on jQuery 1.3+
// Copyright (c) 2011 Jack Moore - jack@colorpowered.com
// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
(function ($, document, window) {
	var
	// ColorBox Default Settings.	
	// See http://colorpowered.com/colorbox for details.
	defaults = {
		transition: "elastic",
		speed: 300,
		width: false,
		initialWidth: "600",
		innerWidth: false,
		maxWidth: false,
		height: false,
		initialHeight: "450",
		innerHeight: false,
		maxHeight: false,
		scalePhotos: true,
		scrolling: true,
		inline: false,
		html: false,
		iframe: false,
		fastIframe: true,
		photo: false,
		href: false,
		title: false,
		rel: false,
		opacity: 0.9,
		preloading: true,
		current: "image {current} of {total}",
		previous: "<",
		next: ">",
		close: "close",
		open: false,
		returnFocus: true,
		loop: true,
		slideshow: false,
		slideshowAuto: true,
		slideshowSpeed: 2500,
		slideshowStart: "start slideshow",
		slideshowStop: "stop slideshow",
		onOpen: false,
		onLoad: false,
		onComplete: false,
		onCleanup: false,
		onClosed: false,
		overlayClose: true,		
		escKey: true,
		arrowKey: true
	},
	
	// Abstracting the HTML and event identifiers for easy rebranding
	colorbox = 'colorbox',
	prefix = 'cbox',
	
	// Events	
	event_open = prefix + '_open',
	event_load = prefix + '_load',
	event_complete = prefix + '_complete',
	event_cleanup = prefix + '_cleanup',
	event_closed = prefix + '_closed',
	event_purge = prefix + '_purge',
	
	// Special Handling for IE
	isIE = $.browser.msie && !$.support.opacity, // feature detection alone gave a false positive on at least one phone browser and on some development versions of Chrome.
	isIE6 = isIE && $.browser.version < 7,
	event_ie6 = prefix + '_IE6',

	// Cached jQuery Object Variables
	$overlay,
	$box,
	$wrap,
	$content,
	$topBorder,
	$leftBorder,
	$rightBorder,
	$bottomBorder,
	$related,
	$window,
	$loaded,
	$loadingBay,
	$loadingOverlay,
	$title,
	$current,
	$slideshow,
	$next,
	$prev,
	$close,
	$groupControls,

	// Variables for cached values or use across multiple functions
	settings = {},
	interfaceHeight,
	interfaceWidth,
	loadedHeight,
	loadedWidth,
	element,
	index,
	photo,
	open,
	active,
	closing = false,
	
	publicMethod,
	boxElement = prefix + 'Element';
	
	// ****************
	// HELPER FUNCTIONS
	// ****************

	// jQuery object generator to reduce code size
	function $div(id, cssText) { 
		var div = document.createElement('div');
		if (id) {
            div.id = prefix + id;
        }
		div.style.cssText = cssText || false;
		return $(div);
	}

	// Convert % values to pixels
	function setSize(size, dimension) {
		dimension = dimension === 'x' ? $window.width() : $window.height();
		return (typeof size === 'string') ? Math.round((/%/.test(size) ? (dimension / 100) * parseInt(size, 10) : parseInt(size, 10))) : size;
	}
	
	// Checks an href to see if it is a photo.
	// There is a force photo option (photo: true) for hrefs that cannot be matched by this regex.
	function isImage(url) {
		return settings.photo || /\.(gif|png|jpg|jpeg|bmp)(?:\?([^#]*))?(?:#(\.*))?$/i.test(url);
	}
	
	// Assigns function results to their respective settings.  This allows functions to be used as values.
	function process(settings) {
		for (var i in settings) {
			if ($.isFunction(settings[i]) && i.substring(0, 2) !== 'on') { // checks to make sure the function isn't one of the callbacks, they will be handled at the appropriate time.
			    settings[i] = settings[i].call(element);
			}
		}
		settings.rel = settings.rel || element.rel || 'nofollow';
		settings.href = $.trim(settings.href || $(element).attr('href'));
		settings.title = settings.title || element.title;
	}

	function trigger(event, callback) {
		if (callback) {
			callback.call(element);
		}
		$.event.trigger(event);
	}

	// Slideshow functionality
	function slideshow() {
		var
		timeOut,
		className = prefix + "Slideshow_",
		click = "click." + prefix,
		start,
		stop,
		clear;
		
		if (settings.slideshow && $related[1]) {
			start = function () {
				$slideshow
					.text(settings.slideshowStop)
					.unbind(click)
					.bind(event_complete, function () {
						if (index < $related.length - 1 || settings.loop) {
							timeOut = setTimeout(publicMethod.next, settings.slideshowSpeed);
						}
					})
					.bind(event_load, function () {
						clearTimeout(timeOut);
					})
					.one(click + ' ' + event_cleanup, stop);
				$box.removeClass(className + "off").addClass(className + "on");
				timeOut = setTimeout(publicMethod.next, settings.slideshowSpeed);
			};
			
			stop = function () {
				clearTimeout(timeOut);
				$slideshow
					.text(settings.slideshowStart)
					.unbind([event_complete, event_load, event_cleanup, click].join(' '))
					.one(click, start);
				$box.removeClass(className + "on").addClass(className + "off");
			};
			
			if (settings.slideshowAuto) {
				start();
			} else {
				stop();
			}
		}
	}

	function launch(elem) {
		if (!closing) {
			
			element = elem;
			
			process($.extend(settings, $.data(element, colorbox)));
			
			$related = $(element);
			
			index = 0;
			
			if (settings.rel !== 'nofollow') {
				$related = $('.' + boxElement).filter(function () {
					var relRelated = $.data(this, colorbox).rel || this.rel;
					return (relRelated === settings.rel);
				});
				index = $related.index(element);
				
				// Check direct calls to ColorBox.
				if (index === -1) {
					$related = $related.add(element);
					index = $related.length - 1;
				}
			}
			
			if (!open) {
				open = active = true; // Prevents the page-change action from queuing up if the visitor holds down the left or right keys.
				
				$box.show();
				
				if (settings.returnFocus) {
					try {
						element.blur();
						$(element).one(event_closed, function () {
							try {
								this.focus();
							} catch (e) {
								// do nothing
							}
						});
					} catch (e) {
						// do nothing
					}
				}
				
				// +settings.opacity avoids a problem in IE when using non-zero-prefixed-string-values, like '.5'
				$overlay.css({"opacity": +settings.opacity, "cursor": settings.overlayClose ? "pointer" : "auto"}).show();
				
				// Opens inital empty ColorBox prior to content being loaded.
				settings.w = setSize(settings.initialWidth, 'x');
				settings.h = setSize(settings.initialHeight, 'y');
				publicMethod.position(0);
				
				if (isIE6) {
					$window.bind('resize.' + event_ie6 + ' scroll.' + event_ie6, function () {
						$overlay.css({width: $window.width(), height: $window.height(), top: $window.scrollTop(), left: $window.scrollLeft()});
					}).trigger('resize.' + event_ie6);
				}
				
				trigger(event_open, settings.onOpen);
				
				$groupControls.add($title).hide();
				
				$close.html(settings.close).show();
			}
			
			publicMethod.load(true);
		}
	}

	// ****************
	// PUBLIC FUNCTIONS
	// Usage format: $.fn.colorbox.close();
	// Usage from within an iframe: parent.$.fn.colorbox.close();
	// ****************
	
	publicMethod = $.fn[colorbox] = $[colorbox] = function (options, callback) {
		var $this = this, autoOpen;
		
		if (!$this[0] && $this.selector) { // if a selector was given and it didn't match any elements, go ahead and exit.
			return $this;
		}
		
		options = options || {};
		
		if (callback) {
			options.onComplete = callback;
		}
		
		if (!$this[0] || $this.selector === undefined) { // detects $.colorbox() and $.fn.colorbox()
			$this = $('<a/>');
			options.open = true; // assume an immediate open
		}
		
		$this.each(function () {
			$.data(this, colorbox, $.extend({}, $.data(this, colorbox) || defaults, options));
			$(this).addClass(boxElement);
		});
		
		autoOpen = options.open;
		
		if ($.isFunction(autoOpen)) {
			autoOpen = autoOpen.call($this);
		}
		
		if (autoOpen) {
			launch($this[0]);
		}
		
		return $this;
	};

	// Initialize ColorBox: store common calculations, preload the interface graphics, append the html.
	// This preps colorbox for a speedy open when clicked, and lightens the burdon on the browser by only
	// having to run once, instead of each time colorbox is opened.
	publicMethod.init = function () {
		// Create & Append jQuery Objects
		$window = $(window);
		$box = $div().attr({id: colorbox, 'class': isIE ? prefix + (isIE6 ? 'IE6' : 'IE') : ''});
		$overlay = $div("Overlay", isIE6 ? 'position:absolute' : '').hide();
		
		$wrap = $div("Wrapper");
		$content = $div("Content").append(
			$loaded = $div("LoadedContent", 'width:0; height:0; overflow:hidden'),
			$loadingOverlay = $div("LoadingOverlay").add($div("LoadingGraphic")),
			$title = $div("Title"),
			$current = $div("Current"),
			$next = $div("Next"),
			$prev = $div("Previous"),
			$slideshow = $div("Slideshow").bind(event_open, slideshow),
			$close = $div("Close")
		);
		$wrap.append( // The 3x3 Grid that makes up ColorBox
			$div().append(
				$div("TopLeft"),
				$topBorder = $div("TopCenter"),
				$div("TopRight")
			),
			$div(false, 'clear:left').append(
				$leftBorder = $div("MiddleLeft"),
				$content,
				$rightBorder = $div("MiddleRight")
			),
			$div(false, 'clear:left').append(
				$div("BottomLeft"),
				$bottomBorder = $div("BottomCenter"),
				$div("BottomRight")
			)
		).children().children().css({'float': 'left'});
		
		$loadingBay = $div(false, 'position:absolute; width:9999px; visibility:hidden; display:none');
		
		$('body').prepend($overlay, $box.append($wrap, $loadingBay));
		
		$content.children()
		.hover(function () {
			$(this).addClass('hover');
		}, function () {
			$(this).removeClass('hover');
		}).addClass('hover');
		
		// Cache values needed for size calculations
		interfaceHeight = $topBorder.height() + $bottomBorder.height() + $content.outerHeight(true) - $content.height();//Subtraction needed for IE6
		interfaceWidth = $leftBorder.width() + $rightBorder.width() + $content.outerWidth(true) - $content.width();
		loadedHeight = $loaded.outerHeight(true);
		loadedWidth = $loaded.outerWidth(true);
		
		// Setting padding to remove the need to do size conversions during the animation step.
		$box.css({"padding-bottom": interfaceHeight, "padding-right": interfaceWidth}).hide();
		
                // Setup button events.
                $next.click(function () {
                        publicMethod.next();
                });
                $prev.click(function () {
                        publicMethod.prev();
                });
                $close.click(function () {
                        publicMethod.close();
                });
		
		$groupControls = $next.add($prev).add($current).add($slideshow);
		
		// Adding the 'hover' class allowed the browser to load the hover-state
		// background graphics.  The class can now can be removed.
		$content.children().removeClass('hover');
		
		$('.' + boxElement).live('click', function (e) {
			// checks to see if it was a non-left mouse-click and for clicks modified with ctrl, shift, or alt.
			if (!((e.button !== 0 && typeof e.button !== 'undefined') || e.ctrlKey || e.shiftKey || e.altKey)) {
				e.preventDefault();
				launch(this);
			}
		});
		
		$overlay.click(function () {
			if (settings.overlayClose) {
				publicMethod.close();
			}
		});
		
		// Set Navigation Key Bindings
		$(document).bind('keydown.' + prefix, function (e) {
                        var key = e.keyCode;
			if (open && settings.escKey && key === 27) {
				e.preventDefault();
				publicMethod.close();
			}
			if (open && settings.arrowKey && $related[1]) {
				if (key === 37) {
					e.preventDefault();
					$prev.click();
				} else if (key === 39) {
					e.preventDefault();
					$next.click();
				}
			}
		});
	};
	
	publicMethod.remove = function () {
		$box.add($overlay).remove();
		$('.' + boxElement).die('click').removeData(colorbox).removeClass(boxElement);
	};

	publicMethod.position = function (speed, loadedCallback) {
		var
		animate_speed,
		// keeps the top and left positions within the browser's viewport.
		posTop = Math.max(document.documentElement.clientHeight - settings.h - loadedHeight - interfaceHeight, 0) / 2 + $window.scrollTop(),
		posLeft = Math.max($window.width() - settings.w - loadedWidth - interfaceWidth, 0) / 2 + $window.scrollLeft();
		
		// setting the speed to 0 to reduce the delay between same-sized content.
		animate_speed = ($box.width() === settings.w + loadedWidth && $box.height() === settings.h + loadedHeight) ? 0 : speed;
		
		// this gives the wrapper plenty of breathing room so it's floated contents can move around smoothly,
		// but it has to be shrank down around the size of div#colorbox when it's done.  If not,
		// it can invoke an obscure IE bug when using iframes.
		$wrap[0].style.width = $wrap[0].style.height = "9999px";
		
		function modalDimensions(that) {
			// loading overlay height has to be explicitly set for IE6.
			$topBorder[0].style.width = $bottomBorder[0].style.width = $content[0].style.width = that.style.width;
			$loadingOverlay[0].style.height = $loadingOverlay[1].style.height = $content[0].style.height = $leftBorder[0].style.height = $rightBorder[0].style.height = that.style.height;
		}
		
		$box.dequeue().animate({width: settings.w + loadedWidth, height: settings.h + loadedHeight, top: posTop, left: posLeft}, {
			duration: animate_speed,
			complete: function () {
				modalDimensions(this);
				
				active = false;
				
				// shrink the wrapper down to exactly the size of colorbox to avoid a bug in IE's iframe implementation.
				$wrap[0].style.width = (settings.w + loadedWidth + interfaceWidth) + "px";
				$wrap[0].style.height = (settings.h + loadedHeight + interfaceHeight) + "px";
				
				if (loadedCallback) {
					loadedCallback();
				}
			},
			step: function () {
				modalDimensions(this);
			}
		});
	};

	publicMethod.resize = function (options) {
		if (open) {
			options = options || {};
			
			if (options.width) {
				settings.w = setSize(options.width, 'x') - loadedWidth - interfaceWidth;
			}
			if (options.innerWidth) {
				settings.w = setSize(options.innerWidth, 'x');
			}
			$loaded.css({width: settings.w});
			
			if (options.height) {
				settings.h = setSize(options.height, 'y') - loadedHeight - interfaceHeight;
			}
			if (options.innerHeight) {
				settings.h = setSize(options.innerHeight, 'y');
			}
			if (!options.innerHeight && !options.height) {				
				var $child = $loaded.wrapInner("<div style='overflow:auto'></div>").children(); // temporary wrapper to get an accurate estimate of just how high the total content should be.
				settings.h = $child.height();
				$child.replaceWith($child.children()); // ditch the temporary wrapper div used in height calculation
			}
			$loaded.css({height: settings.h});
			
			publicMethod.position(settings.transition === "none" ? 0 : settings.speed);
		}
	};

	publicMethod.prep = function (object) {
		if (!open) {
			return;
		}
		
		var speed = settings.transition === "none" ? 0 : settings.speed;
		
		$window.unbind('resize.' + prefix);
		$loaded.remove();
		$loaded = $div('LoadedContent').html(object);
		
		function getWidth() {
			settings.w = settings.w || $loaded.width();
			settings.w = settings.mw && settings.mw < settings.w ? settings.mw : settings.w;
			return settings.w;
		}
		function getHeight() {
			settings.h = settings.h || $loaded.height();
			settings.h = settings.mh && settings.mh < settings.h ? settings.mh : settings.h;
			return settings.h;
		}
		
		$loaded.hide()
		.appendTo($loadingBay.show())// content has to be appended to the DOM for accurate size calculations.
		.css({width: getWidth(), overflow: settings.scrolling ? 'auto' : 'hidden'})
		.css({height: getHeight()})// sets the height independently from the width in case the new width influences the value of height.
		.prependTo($content);
		
		$loadingBay.hide();
		
		// floating the IMG removes the bottom line-height and fixed a problem where IE miscalculates the width of the parent element as 100% of the document width.
		//$(photo).css({'float': 'none', marginLeft: 'auto', marginRight: 'auto'});
		
                $(photo).css({'float': 'none'});
                
		// Hides SELECT elements in IE6 because they would otherwise sit on top of the overlay.
		if (isIE6) {
			$('select').not($box.find('select')).filter(function () {
				return this.style.visibility !== 'hidden';
			}).css({'visibility': 'hidden'}).one(event_cleanup, function () {
				this.style.visibility = 'inherit';
			});
		}
		
		function setPosition(s) {
			publicMethod.position(s, function () {
				var prev, prevSrc, next, nextSrc, total = $related.length, iframe, complete;
				
				if (!open) {
					return;
				}
				
				complete = function () {
					$loadingOverlay.hide();
					trigger(event_complete, settings.onComplete);
				};
				
				if (isIE) {
					//This fadeIn helps the bicubic resampling to kick-in.
					if (photo) {
						$loaded.fadeIn(100);
					}
				}
				
				$title.html(settings.title).add($loaded).show();
				
				if (total > 1) { // handle grouping
					if (typeof settings.current === "string") {
						$current.html(settings.current.replace(/\{current\}/, index + 1).replace(/\{total\}/, total)).show();
					}
					
					$next[(settings.loop || index < total - 1) ? "show" : "hide"]().html(settings.next);
					$prev[(settings.loop || index) ? "show" : "hide"]().html(settings.previous);
					
					prev = index ? $related[index - 1] : $related[total - 1];
					next = index < total - 1 ? $related[index + 1] : $related[0];
					
					if (settings.slideshow) {
						$slideshow.show();
					}
					
					// Preloads images within a rel group
					if (settings.preloading) {
						nextSrc = $.data(next, colorbox).href || next.href;
						prevSrc = $.data(prev, colorbox).href || prev.href;
						
						nextSrc = $.isFunction(nextSrc) ? nextSrc.call(next) : nextSrc;
						prevSrc = $.isFunction(prevSrc) ? prevSrc.call(prev) : prevSrc;
						
						if (isImage(nextSrc)) {
							$('<img/>')[0].src = nextSrc;
						}
						
						if (isImage(prevSrc)) {
							$('<img/>')[0].src = prevSrc;
						}
					}
				} else {
					$groupControls.hide();
				}
				
				if (settings.iframe) {
					iframe = $('<iframe/>').addClass(prefix + 'Iframe')[0];
					
					if (settings.fastIframe) {
						complete();
					} else {
						$(iframe).load(complete);
					}
					iframe.name = prefix + (+new Date());
					iframe.src = settings.href;
					
					if (!settings.scrolling) {
						iframe.scrolling = "no";
					}
					
					if (isIE) {
                        iframe.frameBorder=0;
						iframe.allowTransparency = "true";
					}
					
					$(iframe).appendTo($loaded).one(event_purge, function () {
						iframe.src = "//about:blank";
					});
				} else {
					complete();
				}
				
				if (settings.transition === 'fade') {
					$box.fadeTo(speed, 1, function () {
						$box[0].style.filter = "";
					});
				} else {
                     $box[0].style.filter = "";
				}
				
				$window.bind('resize.' + prefix, function () {
					publicMethod.position(0);
				});
			});
		}
		
		if (settings.transition === 'fade') {
			$box.fadeTo(speed, 0, function () {
				setPosition(0);
			});
		} else {
			setPosition(speed);
		}
	};

	publicMethod.load = function (launched) {
		var href, setResize, prep = publicMethod.prep;
		
		active = true;
		
		photo = false;
		
		element = $related[index];
		
		if (!launched) {
			process($.extend(settings, $.data(element, colorbox)));
		}
		
		trigger(event_purge);
		
		trigger(event_load, settings.onLoad);
		
		settings.h = settings.height ?
				setSize(settings.height, 'y') - loadedHeight - interfaceHeight :
				settings.innerHeight && setSize(settings.innerHeight, 'y');
		
		settings.w = settings.width ?
				setSize(settings.width, 'x') - loadedWidth - interfaceWidth :
				settings.innerWidth && setSize(settings.innerWidth, 'x');
		
		// Sets the minimum dimensions for use in image scaling
		settings.mw = settings.w;
		settings.mh = settings.h;
		
		// Re-evaluate the minimum width and height based on maxWidth and maxHeight values.
		// If the width or height exceed the maxWidth or maxHeight, use the maximum values instead.
		if (settings.maxWidth) {
			settings.mw = setSize(settings.maxWidth, 'x') - loadedWidth - interfaceWidth;
			settings.mw = settings.w && settings.w < settings.mw ? settings.w : settings.mw;
		}
		if (settings.maxHeight) {
			settings.mh = setSize(settings.maxHeight, 'y') - loadedHeight - interfaceHeight;
			settings.mh = settings.h && settings.h < settings.mh ? settings.h : settings.mh;
		}
		
		href = settings.href;
		
		$loadingOverlay.show();

		if (settings.inline) {
			// Inserts an empty placeholder where inline content is being pulled from.
			// An event is bound to put inline content back when ColorBox closes or loads new content.
			$div().hide().insertBefore($(href)[0]).one(event_purge, function () {
				$(this).replaceWith($loaded.children());
			});
			prep($(href));
		} else if (settings.iframe) {
			// IFrame element won't be added to the DOM until it is ready to be displayed,
			// to avoid problems with DOM-ready JS that might be trying to run in that iframe.
			prep(" ");
		} else if (settings.html) {
			prep(settings.html);
		} else if (isImage(href)) {
			$(photo = new Image())
			.addClass(prefix + 'Photo')
			.error(function () {
				settings.title = false;
				prep($div('Error').text('This image could not be loaded'));
			})
			.load(function () {
				var percent;
				photo.onload = null; //stops animated gifs from firing the onload repeatedly.
				
				if (settings.scalePhotos) {
					setResize = function () {
						photo.height -= photo.height * percent;
						photo.width -= photo.width * percent;	
					};
					if (settings.mw && photo.width > settings.mw) {
						percent = (photo.width - settings.mw) / photo.width;
						setResize();
					}
					if (settings.mh && photo.height > settings.mh) {
						percent = (photo.height - settings.mh) / photo.height;
						setResize();
					}
				}
				
				if (settings.h) {
					photo.style.marginTop = Math.max(settings.h - photo.height, 0) / 2 + 'px';
				}
				
				if ($related[1] && (index < $related.length - 1 || settings.loop)) {
					photo.style.cursor = 'pointer';
					photo.onclick = function () {
                                                publicMethod.next();
                                        };
				}
				
				if (isIE) {
					photo.style.msInterpolationMode = 'bicubic';
				}
				
				setTimeout(function () { // A pause because Chrome will sometimes report a 0 by 0 size otherwise.
					prep(photo);
				}, 1);
			});
			
			setTimeout(function () { // A pause because Opera 10.6+ will sometimes not run the onload function otherwise.
				photo.src = href;
			}, 1);
		} else if (href) {
			$loadingBay.load(href, function (data, status, xhr) {
				prep(status === 'error' ? $div('Error').text('Request unsuccessful: ' + xhr.statusText) : $(this).contents());
			});
		}
	};
        
	// Navigates to the next page/image in a set.
	publicMethod.next = function () {
		if (!active && $related[1] && (index < $related.length - 1 || settings.loop)) {
			index = index < $related.length - 1 ? index + 1 : 0;
			publicMethod.load();
		}
	};
	
	publicMethod.prev = function () {
		if (!active && $related[1] && (index || settings.loop)) {
			index = index ? index - 1 : $related.length - 1;
			publicMethod.load();
		}
	};

	// Note: to use this within an iframe use the following format: parent.$.fn.colorbox.close();
	publicMethod.close = function () {
		if (open && !closing) {
			
			closing = true;
			
			open = false;
			
			trigger(event_cleanup, settings.onCleanup);
			
			$window.unbind('.' + prefix + ' .' + event_ie6);
			
			$overlay.fadeTo(200, 0);
			
			$box.stop().fadeTo(300, 0, function () {
                                
				$box.add($overlay).css({'opacity': 1, cursor: 'auto'}).hide();
				
				trigger(event_purge);
				
				$loaded.remove();
				
				setTimeout(function () {
					closing = false;
					trigger(event_closed, settings.onClosed);
				}, 1);
			});
		}
	};

	// A method for fetching the current element ColorBox is referencing.
	// returns a jQuery object.
	publicMethod.element = function () {
		return $(element);
	};

	publicMethod.settings = defaults;

	// Initializes ColorBox when the DOM has loaded
	$(publicMethod.init);

}(jQuery, document, this));;
/*
 * jQuery Tools 1.2.5 - The missing UI library for the Web
 * 
 * [scrollable, scrollable.autoscroll]
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/
 * 
 * File generated: Fri Mar 18 21:29:15 GMT 2011
 */
(function(e){function p(f,c){var b=e(c);return b.length<2?b:f.parent().find(c)}function u(f,c){var b=this,n=f.add(b),g=f.children(),l=0,j=c.vertical;k||(k=b);if(g.length>1)g=e(c.items,f);e.extend(b,{getConf:function(){return c},getIndex:function(){return l},getSize:function(){return b.getItems().size()},getNaviButtons:function(){return o.add(q)},getRoot:function(){return f},getItemWrap:function(){return g},getItems:function(){return g.children(c.item).not("."+c.clonedClass)},move:function(a,d){return b.seekTo(l+
a,d)},next:function(a){return b.move(1,a)},prev:function(a){return b.move(-1,a)},begin:function(a){return b.seekTo(0,a)},end:function(a){return b.seekTo(b.getSize()-1,a)},focus:function(){return k=b},addItem:function(a){a=e(a);if(c.circular){g.children("."+c.clonedClass+":last").before(a);g.children("."+c.clonedClass+":first").replaceWith(a.clone().addClass(c.clonedClass))}else g.append(a);n.trigger("onAddItem",[a]);return b},seekTo:function(a,d,h){a.jquery||(a*=1);if(c.circular&&a===0&&l==-1&&d!==
0)return b;if(!c.circular&&a<0||a>b.getSize()||a<-1)return b;var i=a;if(a.jquery)a=b.getItems().index(a);else i=b.getItems().eq(a);var r=e.Event("onBeforeSeek");if(!h){n.trigger(r,[a,d]);if(r.isDefaultPrevented()||!i.length)return b}i=j?{top:-i.position().top}:{left:-i.position().left};l=a;k=b;if(d===undefined)d=c.speed;g.animate(i,d,c.easing,h||function(){n.trigger("onSeek",[a])});return b}});e.each(["onBeforeSeek","onSeek","onAddItem"],function(a,d){e.isFunction(c[d])&&e(b).bind(d,c[d]);b[d]=function(h){h&&
e(b).bind(d,h);return b}});if(c.circular){var s=b.getItems().slice(-1).clone().prependTo(g),t=b.getItems().eq(1).clone().appendTo(g);s.add(t).addClass(c.clonedClass);b.onBeforeSeek(function(a,d,h){if(!a.isDefaultPrevented())if(d==-1){b.seekTo(s,h,function(){b.end(0)});return a.preventDefault()}else d==b.getSize()&&b.seekTo(t,h,function(){b.begin(0)})});b.seekTo(0,0,function(){})}var o=p(f,c.prev).click(function(){b.prev()}),q=p(f,c.next).click(function(){b.next()});if(!c.circular&&b.getSize()>1){b.onBeforeSeek(function(a,
d){setTimeout(function(){if(!a.isDefaultPrevented()){o.toggleClass(c.disabledClass,d<=0);q.toggleClass(c.disabledClass,d>=b.getSize()-1)}},1)});c.initialIndex||o.addClass(c.disabledClass)}c.mousewheel&&e.fn.mousewheel&&f.mousewheel(function(a,d){if(c.mousewheel){b.move(d<0?1:-1,c.wheelSpeed||50);return false}});if(c.touch){var m={};g[0].ontouchstart=function(a){a=a.touches[0];m.x=a.clientX;m.y=a.clientY};g[0].ontouchmove=function(a){if(a.touches.length==1&&!g.is(":animated")){var d=a.touches[0],h=
m.x-d.clientX;d=m.y-d.clientY;b[j&&d>0||!j&&h>0?"next":"prev"]();a.preventDefault()}}}c.keyboard&&e(document).bind("keydown.scrollable",function(a){if(!(!c.keyboard||a.altKey||a.ctrlKey||e(a.target).is(":input")))if(!(c.keyboard!="static"&&k!=b)){var d=a.keyCode;if(j&&(d==38||d==40)){b.move(d==38?-1:1);return a.preventDefault()}if(!j&&(d==37||d==39)){b.move(d==37?-1:1);return a.preventDefault()}}});c.initialIndex&&b.seekTo(c.initialIndex,0,function(){})}e.tools=e.tools||{version:"1.2.5"};e.tools.scrollable=
{conf:{activeClass:"active",circular:false,clonedClass:"cloned",disabledClass:"disabled",easing:"swing",initialIndex:0,item:null,items:".items",keyboard:true,mousewheel:false,next:".next",prev:".prev",speed:400,vertical:false,touch:true,wheelSpeed:0}};var k;e.fn.scrollable=function(f){var c=this.data("scrollable");if(c)return c;f=e.extend({},e.tools.scrollable.conf,f);this.each(function(){c=new u(e(this),f);e(this).data("scrollable",c)});return f.api?c:this}})(jQuery);
(function(b){var f=b.tools.scrollable;f.autoscroll={conf:{autoplay:true,interval:3E3,autopause:true}};b.fn.autoscroll=function(c){if(typeof c=="number")c={interval:c};var d=b.extend({},f.autoscroll.conf,c),g;this.each(function(){var a=b(this).data("scrollable");if(a)g=a;var e,h=true;a.play=function(){if(!e){h=false;e=setInterval(function(){a.next()},d.interval)}};a.pause=function(){e=clearInterval(e)};a.stop=function(){a.pause();h=true};d.autopause&&a.getRoot().add(a.getNaviButtons()).hover(a.pause,
a.play);d.autoplay&&a.play()});return d.api?g:this}})(jQuery);
;
/*
 * Thickbox 3.1 - One Box To Rule Them All.
 * By Cody Lindley (http://www.codylindley.com)
 * Copyright (c) 2007 cody lindley
 * Licensed under the MIT License: http://www.opensource.org/licenses/mit-license.php
*/
      
var tb_pathToImage = "/sites/all/themes/nypl_new/images/loadingAnimation.gif";
/*!!!!!!!!!!!!!!!!! edit below this line at your own risk !!!!!!!!!!!!!!!!!!!!!!!*/
//on page load call tb_init
$(document).ready(function(){   
  tb_init('a.thickbox, area.thickbox, input.thickbox');//pass where to apply thickbox
  imgLoader = new Image();// preload image
  imgLoader.src = tb_pathToImage;
});
//add thickbox to href & area elements that have a class of .thickbox
function tb_init(domChunk){
  $(domChunk).click(function(){
  var t = this.title || this.name || null;
  var a = this.href || this.alt;
  var g = this.rel || false;
  tb_show(t,a,g);
  this.blur();
  return false;
  });
}
function tb_show(caption, url, imageGroup) {//function called when the user clicks on a thickbox link
  try {
    if (typeof document.body.style.maxHeight === "undefined") {//if IE 6
      $("body","html").css({height: "100%", width: "100%"});
      $("html").css("overflow","hidden");
      if (document.getElementById("TB_HideSelect") === null) {//iframe to hide select elements in ie6
        $("body").append("<iframe id='TB_HideSelect'></iframe><div id='TB_overlay'></div><div id='TB_window'></div>");
        $("#TB_overlay").click(tb_remove);
      }
    }else{//all others
      if(document.getElementById("TB_overlay") === null){
        $("body").append("<div id='TB_overlay'></div><div id='TB_window'></div>");
        $("#TB_overlay").click(tb_remove);
      }
    }
    
    if(tb_detectMacXFF()){
      $("#TB_overlay").addClass("TB_overlayMacFFBGHack");//use png overlay so hide flash
    }else{
      $("#TB_overlay").addClass("TB_overlayBG");//use background and opacity
    }
    
    if(caption===null){caption="";}
    $("body").append("<div id='TB_load'><img src='"+imgLoader.src+"' /></div>");//add loader to the page
    $('#TB_load').show();//show loader
    
    var baseURL;
     if(url.indexOf("?")!==-1){ //ff there is a query string involved
      baseURL = url.substr(0, url.indexOf("?"));
     }else{ 
         baseURL = url;
     }
     
     var urlString = /\.jpg$|\.jpeg$|\.png$|\.gif$|\.bmp$/;
     var urlType = baseURL.toLowerCase().match(urlString);
    if(urlType == '.jpg' || urlType == '.jpeg' || urlType == '.png' || urlType == '.gif' || urlType == '.bmp'){//code to show images
        
      TB_PrevCaption = "";
      TB_PrevURL = "";
      TB_PrevHTML = "";
      TB_NextCaption = "";
      TB_NextURL = "";
      TB_NextHTML = "";
      TB_imageCount = "";
      TB_FoundURL = false;
      if(imageGroup){
        TB_TempArray = $("a[@rel="+imageGroup+"]").get();
        for (TB_Counter = 0; ((TB_Counter < TB_TempArray.length) && (TB_NextHTML === "")); TB_Counter++) {
          var urlTypeTemp = TB_TempArray[TB_Counter].href.toLowerCase().match(urlString);
            if (!(TB_TempArray[TB_Counter].href == url)) {            
              if (TB_FoundURL) {
                TB_NextCaption = TB_TempArray[TB_Counter].title;
                TB_NextURL = TB_TempArray[TB_Counter].href;
                TB_NextHTML = "<span id='TB_next'>&nbsp;&nbsp;<a href='#'>Next &gt;</a></span>";
              } else {
                TB_PrevCaption = TB_TempArray[TB_Counter].title;
                TB_PrevURL = TB_TempArray[TB_Counter].href;
                TB_PrevHTML = "<span id='TB_prev'>&nbsp;&nbsp;<a href='#'>&lt; Prev</a></span>";
              }
            } else {
              TB_FoundURL = true;
              TB_imageCount = "Image " + (TB_Counter + 1) +" of "+ (TB_TempArray.length);                      
            }
        }
      }
      imgPreloader = new Image();
      imgPreloader.onload = function(){    
      imgPreloader.onload = null;
        
      // Resizing large images - orginal by Christian Montoya edited by me.
      var pagesize = tb_getPageSize();
      var x = pagesize[0] - 150;
      var y = pagesize[1] - 150;
      var imageWidth = imgPreloader.width;
      var imageHeight = imgPreloader.height;
      if (imageWidth > x) {
        imageHeight = imageHeight * (x / imageWidth); 
        imageWidth = x; 
        if (imageHeight > y) { 
          imageWidth = imageWidth * (y / imageHeight); 
          imageHeight = y; 
        }
      } else if (imageHeight > y) { 
        imageWidth = imageWidth * (y / imageHeight); 
        imageHeight = y; 
        if (imageWidth > x) { 
          imageHeight = imageHeight * (x / imageWidth); 
          imageWidth = x;
        }
      }
      // End Resizing
      
      TB_WIDTH = imageWidth + 30;
      TB_HEIGHT = imageHeight + 60;
      $("#TB_window").append("<a href='' id='TB_ImageOff' title='Close'><img id='TB_Image' src='"+url+"' width='"+imageWidth+"' height='"+imageHeight+"' alt='"+caption+"'/></a>" + "<div id='TB_caption'>"+caption+"<div id='TB_secondLine'>" + TB_imageCount + TB_PrevHTML + TB_NextHTML + "</div></div><div id='TB_closeWindow'>Press Esc Key | <a href='#' id='TB_closeWindowButton' title='Close'>CLOSE X</a></div>");     
      
      $("#TB_closeWindowButton").click(tb_remove);
      
      if (!(TB_PrevHTML === "")) {
        function goPrev(){
          if($(document).unbind("click",goPrev)){$(document).unbind("click",goPrev);}
          $("#TB_window").remove();
          $("body").append("<div id='TB_window'></div>");
          tb_show(TB_PrevCaption, TB_PrevURL, imageGroup);
          return false;  
        }
        $("#TB_prev").click(goPrev);
      }
      
      if (!(TB_NextHTML === "")) {    
        function goNext(){
          $("#TB_window").remove();
          $("body").append("<div id='TB_window'></div>");
          tb_show(TB_NextCaption, TB_NextURL, imageGroup);        
          return false;  
        }
        $("#TB_next").click(goNext);
        
      }
      document.onkeydown = function(e){   
        if (e == null) { // ie
          keycode = event.keyCode;
        } else { // mozilla
          keycode = e.which;
        }
        if(keycode == 27){ // close
          tb_remove();
        } else if(keycode == 190){ // display previous image
          if(!(TB_NextHTML == "")){
            document.onkeydown = "";
            goNext();
          }
        } else if(keycode == 188){ // display next image
          if(!(TB_PrevHTML == "")){
            document.onkeydown = "";
            goPrev();
          }
        }  
      };
      
      tb_position();
      $("#TB_load").remove();
      $("#TB_ImageOff").click(tb_remove);
      $("#TB_window").css({display:"block"}); //for safari using css instead of show
      };
      
      imgPreloader.src = url;
    }else{//code to show html
      
      var queryString = url.replace(/^[^\?]+\??/,'');
      var params = tb_parseQuery( queryString );
      TB_WIDTH = (params['width']*1) + 30 || 630; //defaults to 630 if no paramaters were added to URL
      TB_HEIGHT = (params['height']*1) + 40 || 440; //defaults to 440 if no paramaters were added to URL
      ajaxContentW = TB_WIDTH - 30;
      ajaxContentH = TB_HEIGHT - 45;
      
      if(url.indexOf('TB_iframe') != -1){// either iframe or ajax window    
          urlNoQuery = url.split('TB_');
          $("#TB_iframeContent").remove();
          if(params['modal'] != "true"){//iframe no modal
            //$("#TB_window").append("<div id='TB_title'><div id='TB_ajaxWindowTitle'>"+caption+"</div><div id='TB_closeAjaxWindow'>Press Esc Key | <a href='#' id='TB_closeWindowButton' title='Close'>CLOSE X</a></div></div><iframe frameborder='0' hspace='0' src='"+urlNoQuery[0]+"' id='TB_iframeContent' name='TB_iframeContent"+Math.round(Math.random()*1000)+"' onload='tb_showIframe()' style='width:"+(ajaxContentW + 29)+"px;height:"+(ajaxContentH + 17)+"px;' > </iframe>");
            //try without caption
            $("#TB_window").append("<div id='TB_title'><div id='TB_closeAjaxWindow'>Press Esc Key | <a href='#' id='TB_closeWindowButton' title='Close'>CLOSE X</a></div></div><iframe frameborder='0' hspace='0' src='"+urlNoQuery[0]+"' id='TB_iframeContent' name='TB_iframeContent"+Math.round(Math.random()*1000)+"' onload='tb_showIframe()' style='width:"+(ajaxContentW + 29)+"px;height:"+(ajaxContentH + 17)+"px;' > </iframe>");
          }else{//iframe modal
          $("#TB_overlay").unbind();
            $("#TB_window").append("<iframe frameborder='0' hspace='0' src='"+urlNoQuery[0]+"' id='TB_iframeContent' name='TB_iframeContent"+Math.round(Math.random()*1000)+"' onload='tb_showIframe()' style='width:"+(ajaxContentW + 29)+"px;height:"+(ajaxContentH + 17)+"px;'> </iframe>");
          }
      }else{// not an iframe, ajax
          if($("#TB_window").css("display") != "block"){
            if(params['modal'] != "true"){//ajax no modal
            //$("#TB_window").append("<div id='TB_title'><div id='TB_ajaxWindowTitle'>"+caption+"</div><div id='TB_closeAjaxWindow'>Press Esc Key | <a href='#' id='TB_closeWindowButton'>CLOSE X</a></div></div><div id='TB_ajaxContent' style='width:"+ajaxContentW+"px;height:"+ajaxContentH+"px'></div>");
            $("#TB_window").append("<div id='TB_title'><div id='TB_closeAjaxWindow'>Press Esc Key | <a href='#' id='TB_closeWindowButton'>CLOSE X</a></div></div><div id='TB_ajaxContent' style='width:"+ajaxContentW+"px;height:"+ajaxContentH+"px'></div>");
            }else{//ajax modal
            $("#TB_overlay").unbind();
            $("#TB_window").append("<div id='TB_ajaxContent' class='TB_modal' style='width:"+ajaxContentW+"px;height:"+ajaxContentH+"px;'></div>");  
            }
          }else{//this means the window is already up, we are just loading new content via ajax
            $("#TB_ajaxContent")[0].style.width = ajaxContentW +"px";
            $("#TB_ajaxContent")[0].style.height = ajaxContentH +"px";
            $("#TB_ajaxContent")[0].scrollTop = 0;
            $("#TB_ajaxWindowTitle").html(caption);
          }
      }
          
      $("#TB_closeWindowButton").click(tb_remove);
      
        if(url.indexOf('TB_inline') != -1){  
          $("#TB_ajaxContent").append($('#' + params['inlineId']).children());
          $("#TB_window").unload(function () {
            $('#' + params['inlineId']).append( $("#TB_ajaxContent").children() ); // move elements back when you're finished
          });
          tb_position();
          $("#TB_load").remove();
          $("#TB_window").css({display:"block"}); 
        }else if(url.indexOf('TB_iframe') != -1){
          tb_position();
          if($.browser.safari){//safari needs help because it will not fire iframe onload
            $("#TB_load").remove();
            $("#TB_window").css({display:"block"});
          }
        }else{
          $("#TB_ajaxContent").load(url += "&random=" + (new Date().getTime()),function(){//to do a post change this load method
            tb_position();
            $("#TB_load").remove();
            tb_init("#TB_ajaxContent a.thickbox");
            $("#TB_window").css({display:"block"});
          });
        }
      
    }
    if(!params['modal']){
      document.onkeyup = function(e){   
        if (e == null) { // ie
          keycode = event.keyCode;
        } else { // mozilla
          keycode = e.which;
        }
        if(keycode == 27){ // close
          tb_remove();
        }  
      };
    }
    
  } catch(e) {
    //nothing here
  }
}
//helper functions below
function tb_showIframe(){
  $("#TB_load").remove();
  $("#TB_window").css({display:"block"});
}
function tb_remove() {
  $("#TB_imageOff").unbind("click");
  $("#TB_closeWindowButton").unbind("click");
  $("#TB_window").fadeOut("fast",function(){$('#TB_window,#TB_overlay,#TB_HideSelect').trigger("unload").unbind().remove();});
  $("#TB_load").remove();
  if (typeof document.body.style.maxHeight == "undefined") {//if IE 6
    $("body","html").css({height: "auto", width: "auto"});
    $("html").css("overflow","");
  }
  document.onkeydown = "";
  document.onkeyup = "";
  return false;
}
function tb_position() {
$("#TB_window").css({marginLeft: '-' + parseInt((TB_WIDTH / 2),10) + 'px', width: TB_WIDTH + 'px'});
  if ( !(jQuery.browser.msie && jQuery.browser.version < 7)) { // take away IE6
    $("#TB_window").css({marginTop: '-' + parseInt((TB_HEIGHT / 2),10) + 'px'});
  }
}
function tb_parseQuery ( query ) {
   var Params = {};
   if ( ! query ) {return Params;}// return empty object
   var Pairs = query.split(/[;&]/);
   for ( var i = 0; i < Pairs.length; i++ ) {
      var KeyVal = Pairs[i].split('=');
      if ( ! KeyVal || KeyVal.length != 2 ) {continue;}
      var key = unescape( KeyVal[0] );
      var val = unescape( KeyVal[1] );
      val = val.replace(/\+/g, ' ');
      Params[key] = val;
   }
   return Params;
}
function tb_getPageSize(){
  var de = document.documentElement;
  var w = window.innerWidth || self.innerWidth || (de&&de.clientWidth) || document.body.clientWidth;
  var h = window.innerHeight || self.innerHeight || (de&&de.clientHeight) || document.body.clientHeight;
  arrayPageSize = [w,h];
  return arrayPageSize;
}
function tb_detectMacXFF() {
  var userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.indexOf('mac') != -1 && userAgent.indexOf('firefox')!=-1) {
    return true;
  }
}
;
var currentTab = 0; // Set to a different number to start on a different tab.

function openTab(clickedTab) {
   var thisTab = $(".tabbed-box .tabs a").index(clickedTab);
   $(".tabbed-box .tabs li a").removeClass("active");
   $(".tabbed-box .tabs li a:eq("+thisTab+")").addClass("active");
   $(".tabbed-box .tabbed-content").hide();
   $(".tabbed-box .tabbed-content:eq("+thisTab+")").show();
   currentTab = thisTab;
}

$(document).ready(function() {
   $(".tabs li:eq(0) a").css("border-left", "none");
   
   $(".tabbed-box .tabs li a").click(function() { 
      openTab($(this)); return false; 
   });
   
   $(".tabbed-box .tabs li a:eq("+currentTab+")").click();
   
	// Set default behavior for tabbed search boxen
	var ebookDefaultText = "keyword";
	$('#FullTextCriteria').css('color', '#999999').val(ebookDefaultText);
	$('#FullTextCriteria').focus(function() {
		if (($(this).val() == ebookDefaultText)) { 
			$(this).val('');
		}
		$(this).css('color', '#000000');
	});
	
	var articlesdbDefaultText = "database title or description";
	$('#DBkeyword').css('color', '#999999').val(articlesdbDefaultText);
	$('#DBkeyword').focus(function() {
		if (($(this).val() == articlesdbDefaultText)) { 
			$(this).val('');
		}
		$(this).css('color', '#000000');
	});	
	
	var digitalgalDefaultText = "image keyword";
	$('#dg_keyword').css('color', '#999999').val(digitalgalDefaultText);
	$('#dg_keyword').focus(function() {
		if (($(this).val() == digitalgalDefaultText)) { 
			$(this).val('');
		}
		$(this).css('color', '#000000');
	});	
});;
/**
* hoverIntent r6 // 2011.02.26 // jQuery 1.5.1+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne brian(at)cherne(dot)net
*/
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev])}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev])};var handleHover=function(e){var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t)}if(e.type=="mouseenter"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)},cfg.timeout)}}};return this.bind('mouseenter',handleHover).bind('mouseleave',handleHover)}})(jQuery);
;
$(document).ready(function() {
  // Dropdown behavior for Bibliocommons top nav
  // Adapted from "jQuery Simple Drop-Down Menu Plugin"
  // (http://javascript-array.com/scripts/jquery_simple_drop_down_menu/)
  var dd_outer = 0;
  var dd_inner = 0;
    
  function topnav_close() {
    if (dd_outer && dd_inner) {
      dd_inner.removeClass('openDropDown');
      dd_outer.removeClass('openDropDown');
    }
  }
  
  function topnav_open() {
    topnav_close();
    dd_outer = $(this).addClass('openDropDown');
    dd_inner = $(this).find('div.dropDownContent').addClass('openDropDown');
  }

  $('#primary-links > ul > li').hoverIntent({
    over: topnav_open,
    timeout: 100,
    out: topnav_close
  });
});
;
/**
 * @file jquery.autocomplete.js
 * @brief overrides Drupal's default autocomplete behavior so we don't get annoying errors
 * more info at http://drupal.org/node/627834
 */

/**
 * Performs a cached and delayed search
 */
if (Drupal.ACDB) {
  Drupal.ACDB.prototype.search = function (searchString) {
    var db = this;
    this.searchString = searchString;

    // See if this key has been searched for before
    if (this.cache[searchString]) {
      return this.owner.found(this.cache[searchString]);
    }

    // Initiate delayed search
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(function() {
      db.owner.setStatus('begin');

      // Ajax GET request for autocompletion
      $.ajax({
        type: "GET",
        url: db.uri +'/'+ Drupal.encodeURIComponent(searchString),
        dataType: 'json',
        success: function (matches) {
          if (typeof matches['status'] == 'undefined' || matches['status'] != 0) {
            db.cache[searchString] = matches;
            // Verify if these are still the matches the user wants to see
            if (db.searchString == searchString) {
              db.owner.found(matches);
            }
            db.owner.setStatus('found');
          }
        },
        error: function (xmlhttp) {
          // output "HTTP error 0" errors to the console instead of as alerts
          var error = Drupal.ahahError(xmlhttp, db.uri);
          if (error.indexOf("An HTTP error 0 occurred.") == -1) {
            alert(error);
          }
          else {
            console.log(error);
          }
        }
      });
    }, this.delay);
  };
};
// /*jslint browser: true, indent: 4, maxlen: 80 */
// /*global  $, Drupal*/
// $(document).ready(function() {
//     "use strict";
//     var sso_login_manager = {
//         default_form_action: $('.login-form form').attr('action'),
//         mobile_login_button_control: function() {
//             // Extract the php generated variable holding login/logout button
//             var elementMarkup = $('#mobile-signon').html();
//             // Append the element markup to the end of the mobile navigation
//             $('#primary-links > ul').append(elementMarkup);
//         },
//         set_remember_me: function($target){
//             // If User has checked the Remember Me Checkbox
//             if( $target.attr('checked') ) {
//                 // Extract Username from user input field
//                 var username_cookie = $('#username').attr('value');
//                 // Set the UserName Cookie to Expire in 14 Days
//                 $.cookie('remember_user', username_cookie, { expires: 14 , path: '/' });
//             }
//             else{
//                 // Clear Cookie if checkbox is not checked
//                 $.cookie('remember_user', null);
//             }
//         },
//         check_remember_me: function($username_inputfield){
//             // Extract UserName Cookie on page load
//             var remember_user = $.cookie('remember_user');
//             // Check if the UserName Remember Cookie is set
//             if (remember_user){
//                 // Insert value to Input Field & Mark Checked for Remember Checkbox
//                 $username_inputfield.attr('value', remember_user);
//                 $('#remember_me').attr('checked', 'checked');
//             }
//         },
//         set_destination: function(attr, $target, hash) {
//             var base_attr = $target.attr(attr);
//             var destination = Drupal.settings.destination !== 'destination=node' ?
//                 '?destination=' + Drupal.settings.base_url + '/' + Drupal.settings.destination.split(/=/)[1] :
//                 '?destination=' + Drupal.settings.base_url;
//             destination += hash ? hash : '';
//             $target.attr(attr, base_attr + destination);
//         },
//         display_form: function(message, href) {
//             var loginForm = $('.login-form');
//             if (!$("#login-message").text()) {
//                 loginForm.find('#login-form-help').append("<p id='login-message'>" + message + "<p>");
//                 loginForm.append('<a id="login-form-close"' + 
//                 'style="top: 0; right: 0; position: absolute; padding: 5px;" href="#">Close</a>');
//             }
//             loginForm.addClass('popup visible');
//             loginForm.find('form').attr('action', href);
//         },
//         valid_session: function() {
//             $.ajax({
//                 url: "/bc_sso/validate",
//                 type: "GET",
//                 beforeSend: function() {
//                     // display gif loader
//                 },
//                 success: function(data) {
//                     var data = JSON.parse(data);
//                     console.log(data);
//                     // if (valid session) {
//                     //     return true;
//                     // } else {
//                     //     return false;
//                     // }
//                 }
//             });
//         },
//         listeners: function() {
//             $('#login-form-close').live('click', function(e) {
//                 e.preventDefault();
//                 var loginForm = $('.login-form');
                
//                 $("#login-message").remove();
//                 $(this).remove(); 
//                 loginForm.removeClass('popup visible');
//                 loginForm.find('form').attr('action', sso_login_manager.default_form_action);
//             });

//             // show/hide the login form in DESKTOP context
//             $("#account-login .login-button").click(function() {
//                 if (!$(this).hasClass('user-logged-in')) {
//                     $('.login-form, .logged-in-menu').toggleClass("visible"); // Added toggle class for User Navigation once logged in

//                     if ($('.login-form').hasClass("mobile-login")) {
//                         $('.login-form').removeClass("mobile-login");
//                     }
//                     if (!$('.login-form').hasClass("desktop-login")){
//                         $('.login-form').addClass("desktop-login");
//                     }

//                     if (typeof _gaq == "object") {
//                       _gaq.push(['_trackEvent', 'SSO', 'Open login form', 'click']);
//                     }
//                 }
//             });
    
//             // show/hide the login form in MOBILE context
//             $("#primary-links .mobile-login-button").click(function(e) {
//                 e.preventDefault();

//                 $('.login-form').toggleClass("visible");
//                 if ($('.login-form').hasClass("desktop-login")) {
//                     $('.login-form').removeClass("desktop-login");
//                 }
//                 if (!$('.login-form').hasClass("mobile-login")){
//                     $('.login-form').addClass("mobile-login");
//                 }

//                 if (typeof _gaq == "object") {
//                   _gaq.push(['_trackEvent', 'SSO', 'Open login form (mobile)', 'click']);
//                 }
//                 //$("#primary-links .login-button span").toggleClass("login-tab");
//             });

//             $(".login-form #login-form-submit").click(function () {
//                 // Remember Me Function
//                 sso_login_manager.set_remember_me($('#remember_me'));

//                 if (typeof _gaq == "object") {
//                   _gaq.push(['_trackEvent', 'SSO', 'Log in', 'click']);
//                 }
//             });
    
//             $(".logged-in-menu #sso-logout").click(function () {
//                 if (typeof _gaq == "object") {
//                   _gaq.push(['_trackEvent', 'SSO', 'Log out', 'click']);
//                 }
//             });

//             $("#mobile-login-element #sso-logout-mobile").click(function () {
//                 if (typeof _gaq == "object") {
//                   _gaq.push(['_trackEvent', 'SSO', 'Log out (mobile)', 'click']);
//                 }
//             });

//             //hide the login form if mobile nav is clicked
//             $('.nav-open-button').click(function() {
//                 $('.login-form').removeClass("visible");
//              });

//             //Toggle Between Desktop/Mobile Login for BiblioCommons depending on Media Query Trigger
//             $(window).resize(function(){
//                 if ($('.header-buttons').css("display") == "none" ){
//                     if ($('.login-form').hasClass("desktop-login")) {
//                         $('.login-form').removeClass("desktop-login");
//                     }
//                     if (!$('.login-form').hasClass("mobile-login")){
//                         $('.login-form').addClass("mobile-login");
//                     }
//                 }
//                 else if ($('.header-buttons').css("display") == "block" ){
//                     if ($('.login-form').hasClass("mobile-login")) {
//                         $('.login-form').removeClass("mobile-login");
//                     }
//                     if (!$('.login-form').hasClass("desktop-login")){
//                         $('.login-form').addClass("desktop-login");
//                     }
//                 }
//             });


//         },
//         run: function() {
//             this.mobile_login_button_control();
//             this.set_destination('action', $('#login-form form'), '#loggedin');
//             this.set_destination('href', $('.forgotpin-button'), null);
//             this.check_remember_me($('#username'));
//             this.listeners();
//         }
//     };
    
//     sso_login_manager.run();
//     $('footer').click(function(e) {
//         e.preventDefault();
//         //if (sso_login_manager.valid_session()) {
//             sso_login_manager.display_form('Please log in', $(this).attr('href'));
//         //}
//     });
//     $('.dod-item h2 a').click(function(e) {
//         sso_login_manager.display_form('Please log in to access the site', $(this).attr('href'));
//         return false;
//     });
// });
;
$(document).ready(function() {
    $('#cboxOverlay').css('opacity','0.6');

    var return_city_council = function() {
        var address =  $('input[name="address_1"]').val();
        var state = $('select[name="state_province_region"]').val();
        var zip =  $('input[name="zip_postal_code"]').val();

        $('.personal_info').removeClass('advocacy_error');
        $('.personal_info').each(function() {
            if ($(this).val() === "") {
                $(this).addClass('advocacy_error');
            }
        });

        if (address !== "" && state !== "" && zip !== "") {
            $.ajax({
                // for some reason the 'data: { address_1: address, zip_postal_code: zip }' does not seem to work
                url: "nypl_advocacy/cc_lookup?country=US&state_province_region=" + state + "&address_1="+ address+"&zip_postal_code="+zip,
                type: "post",
                dataType: "json",
                beforeSend: function() {
                    $("#advocacy_loader").show();
                },
                success: function(data) {
                    //if (data === "") { console.log("empty data"); }

                    $("#advocacy_loader").hide();
                    if (data !== undefined) {
                        var council_name = data.name,
                            council_email = data.email;

                        $('input[name="council_name"]').val(council_name);
                        $('input[name="council_email"]').val(council_email);
                        $("#council_name").text(council_name);
                        $(".council_person").show();

                        $(".letter_sent_to").show();
                    } else {
                        $(".not_ny").show();
                        $(".letter_sent_to").show();
                    }
                },
                error: function (request, status, error) {
                    $("#advocacy_loader").hide();
                    $('input[name="council_name"]').val("");
                    $('input[name="council_email"]').val("");
                    $("#council_name").text("");
                    $(".council_person").hide();

                    $(".not_ny").show();
                    $(".letter_sent_to").css("height","65px").show();
                }
            });
        }
    }

    $("#next_btn").live('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass("first_screen")) {
            $('.personal_info').removeClass('advocacy_error');
            $('.personal_info').each(function() {
                if ($(this).val() === "") {
                    $(this).addClass('advocacy_error');
                }
            });

            if ($('input[name="first_name"]').val() !== "" &&
                $('input[name="last_name"]').val() !== "" &&
                $('input[name="address_1"]').val() !== "" &&
                $('input[name="city_town"]').val() !== "" &&
                $('input[name="zip_postal_code"]').val() !== "") {
                
                $(".main_form").css("padding-top", "20px");

                if (typeof _gaq == "object") {
                    _gaq.push(['_trackEvent', 'Advocacy', 'Click', 'First Screen']);
                    _gaq.push(['_setCustomVar', 5, 'Advocacy', 'Overlay Letter Intent', 2]);
                }

                $(this).removeClass("first_screen").addClass("second_screen");
                $('#refresh_address').show();
                $('#refresh_label').show();


                $(".top").hide();
                
                return_city_council();
            }
        } else if ($(this).hasClass("second_screen")) {
            if ($('select[name="country"]').val() !== "NULL") {
                if (typeof _gaq == "object") {
                    _gaq.push(['_trackEvent', 'Advocacy', 'Click', 'Second Screen']);
                }

                var letter = "Dear Mayor Bloomberg and Speaker Quinn,\n\n";
                if ($('input[name="council_name"]').val() !== "" &&
                    $('input[name="council_name"]').val() !== "Christine Quinn" ) {
                    letter = "Dear Mayor Bloomberg, Speaker Quinn, and Council Member " + $('input[name="council_name"]').val() + ",\n\n";
                }

                letter += "I love my library and am very worried that if the proposed City " +
                    "funding cuts go through, the services that I and so many others rely " +
                    "on will be severely reduced.\n\n" +
                    "I urge you to stop the cuts! Without your help, The New York Public " +
                    "Library will lose tens of millions of dollars of City support. Thousands of " + 
                    "essential and irreplaceable services for children, teens, " +
                    "and seniors would be eliminated, including job search help, computer " +
                    "training, English classes, and more. Hundreds of librarians and other " +
                    "staff would also lose their jobs.\n\n" +
                    "Libraries have never been more important. They are lifelines that make " +
                    "neighborhoods stronger. Considering their key role, libraries should " +
                    "receive more city funding—not face crippling cuts for the fifth year " +
                    "in a row.\n\n" +
                    "Please restore funding to public libraries. No place does more for " +
                    "more New Yorkers.\n\n" +
                    "Sincerely,\n\n" + 
                    $('input[name="first_name"]').val() + " " + $('input[name="last_name"]').val() + "\n" + 
                    $('input[name="address_1"]').val() + "\n" + 
                    $('input[name="city_town"]').val() + ", " + $('select[name="state_province_region"]').val() + " " + $('input[name="zip_postal_code"]').val();


                $('select[name="country"]').removeClass('advocacy_error');
                $(".speakout_header").hide();
                $("#enter_personal_info").hide();
                $('#letter_form textarea').val(letter);
                $("#letter_form").show();
            } else {
                $('select[name="country"]').addClass('advocacy_error');
            }
        }
    });

    $("#back_btn").live('click', function(e) {
        $('#letter_form textarea').val("");
        $("#letter_form").hide();
        $(".speakout_header").show();
        $("#enter_personal_info").show();
    });

    $('#refresh_address').live('click', function(e) {
        e.preventDefault();
        return_city_council();
    });

    $("#send_btn").live('click', function(e) {
        e.preventDefault();
        $('input[name="email"]').removeClass('advocacy_error');

        if ($('input[name="email"]').val() !== "") {  
            var donateURL = Drupal.settings.convio_url;
						           
            var serializedData = $("#advocacy_form").serialize();
            var thank_you_screen = '<div id="submit_loader_to_convio"></div>';

            if (typeof _gaq == "object") {
                _gaq.push(['_trackEvent', 'Advocacy', 'Click', 'Letter Sent']);
            }

            $('input[name="email"]').removeClass('advocacy_error');
            $('form').hide();
            
            $.ajax({
                url: "/nypl_advocacy/submit",
                type: "post",
                data: serializedData,
                beforeSend: function() {
										if (typeof(Drupal.settings.exacttarget) !== undefined) {
											var exacttarget = Drupal.settings.exacttarget;
											$(".main_form").append(exacttarget);
											//console.log('added exacttarget');
										}
                    $(".main_form").append(thank_you_screen);
                },
                success: function() {
                    //console.log("Form successfully submitted.");
                },
                error: function (request, status, error) {
                    //console.log("Status: " + status);
                    //console.log("Error: " + error);
                },
                complete: function() {
                    //setTimeout(function() {
                        window.location.href = donateURL;
                    //}, 1000);
                }
            });
        } else {
            if ($('input[name="email"]').val() === "") 
                $('input[name="email"]').addClass('advocacy_error');
        }
    });
    
    $('.send_letter_btn').live('click', function(e) {
        e.preventDefault();
        $.colorbox({
            onOpen: function() {
                if (typeof _gaq == "object") {
                    _gaq.push(['_trackEvent', 'Advocacy', 'Click', 'Open']);
                    _gaq.push(['_setCustomVar', 5, 'Advocacy', 'Landing Page Letter Intent', 2]);
                }
            },
            href: "/snippet/homepage_hijack"
        });   
    });
});;
/*jslint devel: false, ass: false, stupid: false, vars: true, indent: 2
todo: true nomen: true*/
/* global jQuery _gaq */

(function ($) {
  "use strict";

  // ## sso_status
  // Manage login related cookies.
  //

  var methods = {
    init: function () {
      return this;
    },

    // ### SSO-related
    // Using BiblioCommons as our Single Sign-On source, a user is logged in
    // if they have a bc_username cookie.

    // Return the username for the logged in user, or `null` if they are not
    // logged in.
    login: function () {
      return $.cookie('bc_username');
    },

    // Check whether the user is logged in. Return true if they are, false 
    // otherwise.
    logged_in: function () {
      return methods.login() !== null;
    },

    // ### “Remember Me”
    // The login form offers a “remember me” option. The following function
    // manage cookies related to this.


    // Get or set a remembered username. Without a `name` parameter, return
    // the remembered username, or `null` if the user is not remembered.
    remember: function (name) {
      if (name !== undefined) {
        return $.cookie('remember_me', name, {expires: 365, path: '/'});
      }
      return $.cookie('remember_me');
    },

    // Forget the user, i.e. delete the cookie
    forget: function () {
      return $.cookie('remember_me', null);
    },

    // Check whether the user previously wanted to be remembered. Return
    // `true` or `false`.
    remembered: function () {
      return $.cookie('remember_me') !== null;
    },

    valid_session: function (url) {
      return $.ajax({
        url: url,
        type: "GET",
        dataType: "JSON"
        // beforeSend: function () {
        //   // display gif loader
        // },
        // success: function (data) {
        //   var result = JSON.parse(data);
        //   return result['validSession'] === true ? true : false;
        // },
        // error: function (request, status, error) {
        // }
      });
      // return JSON.parse(data)['validSession'] === true ? true : false;
    }
  };

  $.sso_status = function (method) {


    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    }

    if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    }

    $.error('Method ' +  method + ' does not exist');
  };
}(jQuery));

(function ($) {
  "use strict";

  // ## sso_details
  // Desc: Manage initialization of login events including remember me functionality
  //
  var methods = {
    // Initialize the widget with set defaults and methods
    init: function (options) {
      var defaults = {
          username: '#username',
          remember_checkbox: '#remember_me',
          login_button: '#login-form-submit'
        },
        settings = $.extend({}, defaults, options);

      if (options === undefined) {
        options = {};
      }

      return this.each(function () {
        $(this).data('sso_details', settings);
        if ($.sso_status('logged_in')) {
          $(this).addClass('logged-in');
        }

        methods.init_form($(settings.username), $(settings.remember_checkbox), $(settings.login_button));

      });
    },

    // Sets the state of login form dependent on sso_status
    // Sets the event handler for logging in
    // GA Tracking on login form submission
    init_form: function (username, checkbox, button) {
      // Check if the remember cookie has been set
      if ($.sso_status('remembered')) {
        username.val($.sso_status('remember')); // Fill in username
        checkbox.attr("checked", true); // Mark the checkbox
      }

      // If the checkbox is unchecked, remove the cookie
      checkbox.click(function () {
        if (!$(this).is(':checked')) {
          $.sso_status('forget');
        }
      });

      // Submit the login form
      button.click(function () {
        // Save Cookie
        if (checkbox.is(':checked')) {
          $.sso_status('remember', username.val());
        }
        // GA event tracker
        if (typeof _gaq === "object") {
          _gaq.push(['_trackEvent', 'SSO', 'Log in', 'click']);
        }
      });
    },

    // Show the container
    show: function () {
      $(this).addClass('visible');

      // TODO: Next Sprint
      /* if (options !== undefined) {
        if (options.popup === true) {
          if (!form.hasClass('visible')) {
            form.addClass('visible');
          }
          form.addClass('popup');

          popup_close.show();
        }
        if (options.message !== undefined) {
          msg.text(options.message);
        }
      } */

    },
    // Hide the container
    hide: function () {
      $(this).removeClass('visible');
    }
  };

  $.fn.sso_details = function (method) {

    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    }

    if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    }

    $.error('Method ' +  method + ' does not exist');
  };
}(jQuery));

(function ($) {
  "use strict";

  // ### sso_user_button
  // Manages button related events  

  var login,
    logged_in = false,
    defaults = {
      logged_in_menu: '.logged-in-menu',
      login_form: '.login-form',
      mobile: false,
      navBtn: $('.nav-open-button'),
      formClass: ''
    },
    methods = {
      init: function (options) {
        // Extend the default with user options.
        var settings = $.extend({}, defaults, options);
        $(this).data('sso_user_button', settings);

        // login is the username if the user is logged in, or null
        login = $.sso_status('login');
        logged_in = (login !== null);

        return this.each(function () {
          var lmnt = $(this);

          // Set the button label
          if (logged_in === true) {
            lmnt.find('.label').text(options.label());
            lmnt.addClass('logged-in');
          } else {
            $(this).find('.label').text("Log In");
          }
          lmnt.click(options.click);

          // the mobile nav button should close the login form on mobile
          settings.navBtn.click(function () {
            settings.details.sso_details('hide');
          });
          methods.logout('#sso-logout');
        });
      },

      destroy: function () {
        return $(this).each(function () {
          $(this).removeData('sso_user_button');
        });
      },

      // Add GA event handler to the logout link in the logged in menu.
      logout: function (link) {
        $(link).click(function () {
          if (typeof _gaq === "object") {
            _gaq.push(['_trackEvent', 'SSO', 'Log out', 'click']);
          }
        });
      }
    };

  // To initialize:
  // $('.login-button').sso_user_button({details: details, status: status});
  // where stat = $.sso_status(), details = $('.sso-login').sso_details({status: stat});
  $.fn.sso_user_button = function (method) {

    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    }

    if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    }

    $.error('Method ' +  method + ' does not exist');
  };
}(jQuery));



// SSO
$(document).ready(function () {
  var stat = $.sso_status(),
      details = $('.sso-login').sso_details({status: stat});
      sso_button = $('.login-button').sso_user_button({
        details: details,
        label: function () { return $.sso_status('login'); },

        click: function (e) { 
          var details = $(this).data('sso_user_button').details; 
          e.preventDefault(); 
          if (details.hasClass('visible') === true) {
            details.sso_details('hide');
          } else {
            details.sso_details('show');
            if (typeof _gaq === "object") {
              _gaq.push(['_trackEvent', 'SSO', 'Open login form', 'click']);
            }
          }
          return false; 
        }
      }),
      mobile_button_markup = '<li id="mobile-login-element">' +
        '<a class="mobile-login-button" href="" title="Log in"' +
        ' id="sso-logout-mobile"><span class="label">Log in</span></a></li>';

  $('#primary-links > ul').append(mobile_button_markup);
  var mobile_button = $('.mobile-login-button').sso_user_button({
    details: details,
    label: function () { return "Log Out"; },

    click: function (e) { 
      var details = $(this).data('sso_user_button').details; 
      e.preventDefault();

      if (!$.sso_status('logged_in')) {
        details.sso_details('show');
        if (typeof _gaq === "object") {
          _gaq.push(['_trackEvent', 'SSO', 'Open login form', 'click']);
        }
      } else {
        window.location.href = "http://www.nypl.org/bc_sso/logout";
      }
      return false;
    },
    mobile: true
  });
});

;
