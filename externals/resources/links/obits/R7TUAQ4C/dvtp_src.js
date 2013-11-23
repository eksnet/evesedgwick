function dv_rolloutManager(handlersDefsArray, baseHandler) {
    this.handle = function () {
        var errorsArr = [];

        var handler = chooseEvaluationHandler(handlersDefsArray);
        if (handler) {
            var errorObj = handleSpecificHandler(handler);
            if (errorObj == null)
                return errorsArr;
            else {
                handler.onFailure();
                errorsArr.push(errorObj);
            }
        }

        var errorObjHandler = handleSpecificHandler(baseHandler);
        if (errorObjHandler) {
            errorObjHandler['dvp_isLostImp'] = 1;
            errorsArr.push(errorObjHandler);
        }
        return errorsArr;
    }

    function handleSpecificHandler(handler) {
        var url;
        var errorObj = null;

        try {
            url = handler.createRequest();
            if (url) {
                if (!handler.sendRequest(url))
                    errorObj = createAndGetError('sendRequest failed.', url, handler.getVersion(), handler.getVersionParamName(), handler.dv_script);
            }
            else
                errorObj = createAndGetError('createRequest failed.', url, handler.getVersion(), handler.getVersionParamName(), handler.dv_script);
        }
        catch (e) {
            errorObj = createAndGetError(e.name + ': ' + e.message, url, handler.getVersion(), handler.getVersionParamName(), (handler ? handler.dv_script : null));
        }

        return errorObj;
    }

    function createAndGetError(error, url, ver, versionParamName, dv_script) {
        var errorObj = {};
        errorObj[versionParamName] = ver;
        errorObj['dvp_jsErrMsg'] = encodeURIComponent(error);
        if (dv_script && dv_script.parentElement && dv_script.parentElement.tagName && dv_script.parentElement.tagName == 'HEAD')
            errorObj['dvp_isOnHead'] = '1';
        if (url)
            errorObj['dvp_jsErrUrl'] = url;
        return errorObj;
    }

    function chooseEvaluationHandler(handlersArray) {
        var rand = Math.random() * 100;
        for (var i = 0; i < handlersArray.length; i++) {
            if (rand >= handlersArray[i].minRate && rand < handlersArray[i].maxRate) {
                if (handlersArray[i].handler.isApplicable())
                    return handlersArray[i].handler;
                else
                    break;
            }
        }
        return null;
    }    
}

function dv_GetParam(url, name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    if (results == null)
        return null;
    else
        return results[1];
}

function dv_Contains(array, obj) {
    var i = array.length;
    while (i--) {
        if (array[i] === obj) {
            return true;
        }
    }
    return false;
}

function dv_GetDynamicParams(url) {
    try {
        var regex = new RegExp("[\\?&](dvp_[^&]*=[^&#]*)", "gi");
        var dvParams = regex.exec(url);

        var results = new Array();
        while (dvParams != null) {
            results.push(dvParams[1]);
            dvParams = regex.exec(url);
        }
        return results;
    }
    catch (e) {
        return [];
    }
}

function dv_createIframe() {
    var iframe;
    if (document.createElement && (iframe = document.createElement('iframe'))) {
        iframe.name = iframe.id = 'iframe_' + Math.floor((Math.random() + "") * 1000000000000);
        iframe.width = 0;
        iframe.height = 0;
        iframe.style.display = 'none';
        iframe.src = 'about:blank';
    }

    return iframe;
}

function dv_GetRnd() {
    return ((new Date()).getTime() + "" + Math.floor(Math.random() * 1000000)).substr(0, 16);
}

function dv_SendErrorImp(serverUrl, errorsArr) {

    for (var j = 0; j < errorsArr.length; j++) {
        var errorObj = errorsArr[j];
        var errorImp = dv_CreateAndGetErrorImp(serverUrl, errorObj);
        dv_sendImgImp(errorImp);
    }
}

function dv_CreateAndGetErrorImp(serverUrl, errorObj) {
    var errorQueryString = '';
    for (key in errorObj) {
        if (errorObj.hasOwnProperty(key)) {
            if (key.indexOf('dvp_jsErrUrl') == -1) {
                errorQueryString += '&' + key + '=' + errorObj[key];
            }
            else {
                var params = ['ctx', 'cmp', 'plc', 'sid'];
                for (var i = 0; i < params.length; i++) {
                    var pvalue = dv_GetParam(errorObj[key], params[i]);
                    if (pvalue) {
                        errorQueryString += '&dvp_js' + params[i] + '=' + pvalue;
                    }
                }
            }
        }
    }

    var errorImp = window._dv_win.location.protocol + '//' + serverUrl + errorQueryString;
    return errorImp;
}

function dv_sendImgImp(url) {
    (new Image()).src = url;
}

function dv_getPropSafe(obj, propName) {
    try {
        if (obj)
            return obj[propName];
    } catch (e) { }
}

function dvType() {
    var that = this;
    this.pubSub = new function () {

        var subscribers = [];

        this.subscribe = function (eventName, uid, actionName, func) {
            if (!subscribers[eventName + uid])
                subscribers[eventName + uid] = [];
            subscribers[eventName + uid].push({ Func: func, ActionName: actionName });
        }

        this.publish = function (eventName, uid) {
            var actionsResults = [];
            if (eventName && uid && subscribers[eventName + uid] instanceof Array)
                for (var i = 0; i < subscribers[eventName + uid].length; i++) {
                    var funcObject = subscribers[eventName + uid][i];
                    if (funcObject && funcObject.Func && typeof funcObject.Func == "function" && funcObject.ActionName) {
                        var isSucceeded = runSafely(function () { return funcObject.Func(uid); });
                        actionsResults.push(encodeURIComponent(funcObject.ActionName) + '=' + (isSucceeded ? '1' : '0'));
                    }
                }
            return actionsResults.join('&');
        }
    }

    this.domUtilities = new function () {

        this.addImage = function (url, parentElement) {
            var image = parentElement.ownerDocument.createElement("img");
            image.width = 0;
            image.height = 0;
            image.style.display = 'none';            
            image.src = appendCacheBuster(url);
            parentElement.insertBefore(image, parentElement.firstChild);
        }
        
        this.addScriptResource = function (url, parentElement) {
            var scriptElem = parentElement.ownerDocument.createElement("script");
            scriptElem.type = 'text/javascript';
            scriptElem.src = appendCacheBuster(url);
            parentElement.insertBefore(scriptElem, parentElement.firstChild);   
        }

        this.addScriptCode = function (srcCode, parentElement) {
            var scriptElem = parentElement.ownerDocument.createElement("script");
            scriptElem.type = 'text/javascript';
            scriptElem.innerHTML = srcCode;
            parentElement.insertBefore(scriptElem, parentElement.firstChild);
        }

        this.addHtml = function (srcHtml, parentElement) {
            var divElem = parentElement.ownerDocument.createElement("div");
            divElem.style = "display: inline";
            divElem.innerHTML = srcHtml;
            parentElement.insertBefore(divElem, parentElement.firstChild);
        }
    }

    this.resolveMacros = function (str, tag) {
        var viewabilityData = tag.getViewabilityData();
        var viewabilityBuckets = viewabilityData && viewabilityData.buckets ? viewabilityData.buckets : {};
        var upperCaseObj = objectsToUpperCase(tag, viewabilityData, viewabilityBuckets);
        var newStr = str.replace('[DV_PROTOCOL]', upperCaseObj.DV_PROTOCOL);
        newStr = newStr.replace('[PROTOCOL]', upperCaseObj.PROTOCOL);
        newStr = newStr.replace(/\[(.*?)\]/g, function (match, p1) {
            var value = upperCaseObj[p1];
            if (value === undefined || value === null)
                value = '[' + p1 + ']';
            return encodeURIComponent(value);
        });
        return newStr;
    }

    this.settings = new function () {
    }

    this.tagsType = function () { };

    this.tagsPrototype = function () {
        this.add = function (tagKey, obj) {
            if (!that.tags[tagKey])
                that.tags[tagKey] = new that.tag();
            for (var key in obj)
                that.tags[tagKey][key] = obj[key];
        }
    }

    this.tagsType.prototype = new this.tagsPrototype();
    this.tagsType.prototype.constructor = this.tags;
    this.tags = new this.tagsType();

    this.tag = function () { }
    this.tagPrototype = function () {
        this.set = function (obj) {
            for (var key in obj)
                this[key] = obj[key];
        }

        this.getViewabilityData = function () {
        }
    }

    this.tag.prototype = new this.tagPrototype();
    this.tag.prototype.constructor = this.tag;

    var runSafely = function (action) {
        try {
            var ret = action();
            return ret !== undefined ? ret : true;
        } catch (e) { return false; }
    }

    var objectsToUpperCase = function () {
        var upperCaseObj = {};
        for (var i = 0; i < arguments.length; i++) {
            var obj = arguments[i];
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    upperCaseObj[key.toUpperCase()] = obj[key];
                }
            }
        }
        return upperCaseObj;
    }

    var appendCacheBuster = function (url) {
        if (url !== undefined && url !== null && url.match("^http") == "http") {
            if (url.indexOf('?') !== -1) {
                if (url.slice(-1) == '&')
                    url += 'cbust=' + dv_GetRnd();
                else
                    url += '&cbust=' + dv_GetRnd();
            }
            else
                url += '?cbust=' + dv_GetRnd();
        }
        return url;
    }
}

function dv_baseHandler(){function k(c){var a;if(document.createElement&&(a=document.createElement("iframe")))a.name=a.id=window._dv_win.dv_config.emptyIframeID||"iframe_"+Math.floor(1E12*(Math.random()+"")),a.width=0,a.height=0,a.style.display="none",a.src=c;return a}function u(c){try{if(1>=c.depth)return{url:"",depth:""};var a,d=[];d.push({win:window._dv_win.top,depth:0});for(var e,i=1,g=0;0<i&&100>g;){try{if(g++,e=d.shift(),i--,0<e.win.location.toString().length&&e.win!=c)return 0==e.win.document.referrer.length||
0==e.depth?{url:e.win.location,depth:e.depth}:{url:e.win.document.referrer,depth:e.depth-1}}catch(l){}a=e.win.frames.length;for(var h=0;h<a;h++)d.push({win:e.win.frames[h],depth:e.depth+1}),i++}return{url:"",depth:""}}catch(b){return{url:"",depth:""}}}function n(c){new String;var a=new String,d,e,i;for(d=0;d<c.length;d++)i=c.charAt(d),e="!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~".indexOf(i),0<=e&&(i="!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~".charAt((e+
47)%94)),a+=i;return a}this.createRequest=function(){var c=!1,a=window._dv_win,d=0,e=!1;try{for(dv_i=0;10>=dv_i;dv_i++)if(null!=a.parent&&a.parent!=a)if(0<a.parent.location.toString().length)a=a.parent,d++,c=!0;else{c=!1;break}else{0==dv_i&&(c=!0);break}}catch(i){c=!1}0==a.document.referrer.length?c=a.location:c?c=a.location:(c=a.document.referrer,e=!0);var g=null,l=null;null!=window._dv_win.external&&(g=void 0!=window._dv_win.external.QueuePageID?window._dv_win.external.QueuePageID:null,l=void 0!=
window._dv_win.external.CrawlerUrl?window._dv_win.external.CrawlerUrl:null);window._dv_win._dvScripts||(window._dv_win._dvScripts=[]);var h=document.getElementsByTagName("script");for(dv_i in h){var b=h[dv_i].src,m=window._dv_win.dv_config.reqex||/^[ \t]*(http(s)?:\/\/)?[a-z\-]*cdn(s)?\.doubleverify\.com:?[0-9]*\/dvtp_src.js/;if(b&&b.match(m)&&!dv_Contains(window._dv_win._dvScripts,h[dv_i])){this.dv_script=h[dv_i];window._dv_win._dvScripts.push(h[dv_i]);var h=dv_GetParam(b,"region")||"",p="http:",
m="0";"https"==b.match("^https")&&"https"==window._dv_win.location.toString().match("^https")&&(p="https:",m="1");var k="https"==window._dv_win.location.toString().match("^https")?"https:":"http:";try{for(var v=a,q=a,r=0;10>r&&q!=window._dv_win.top;)r++,q=q.parent;v.depth=r;var t=u(a),j="&aUrl="+encodeURIComponent(t.url),s="&aUrlD="+t.depth,f=a.depth+d;e&&a.depth--}catch(x){s=j=f=a.depth=""}d=dv_GetDynamicParams(b);"41"==h&&(h=50>100*Math.random()?"41":"8",d.push("dvp_region="+h));d=d.join("&");b=
p+"//"+(window._dv_win.dv_config.tpsAddress||"tps"+h+".doubleverify.com")+"/visit.js?ctx="+(dv_GetParam(b,"ctx")||"")+"&cmp="+(dv_GetParam(b,"cmp")||"")+"&ipos="+(dv_GetParam(b,"ipos")||"")+"&sid="+(dv_GetParam(b,"sid")||"")+"&plc="+(dv_GetParam(b,"plc")||"")+"&adid="+(dv_GetParam(b,"adid")||"")+"&crt="+(dv_GetParam(b,"crt")||"")+"&dvtagver=6.1.src&srcurlD="+a.depth+"&curl="+(null==l?"":encodeURIComponent(l))+"&qpgid="+(null==g?"":g)+"&btreg="+(dv_GetParam(b,"btreg")||"")+"&btadsrv="+(dv_GetParam(b,
"btadsrv")||"")+"&adsrv="+(dv_GetParam(b,"adsrv")||"")+"&advid="+(dv_GetParam(b,"advid")||"")+"&num="+(dv_GetParam(b,"num")||"")+"&pid="+(dv_GetParam(b,"pid")||"")+"&crtname="+(dv_GetParam(b,"crtname")||"")+"&unit="+(dv_GetParam(b,"unit")||"")+"&chnl="+(dv_GetParam(b,"chnl")||"")+"&ssl="+m+"&uid="+(dv_GetParam(b,"uid")||"")+"&scusrid="+(dv_GetParam(b,"scusrid")||"")+"&refD="+f;"http:"==b.match("^http:")&&"https"==window._dv_win.location.toString().match("^https")&&(b+="&dvp_diffSSL=1");d&&(b+="&"+
d);a="srcurl="+encodeURIComponent(c);if((f=window._dv_win[n("=@42E:@?")][n("2?46DE@C~C:8:?D")])&&0<f.length){c=[];c[0]=window._dv_win.location.protocol+"//"+window._dv_win.location.hostname;for(g=0;g<f.length;g++)c[g+1]=f[g];f=c.reverse().join(",")}else f=null;f&&(a+="&ancChain="+encodeURIComponent(f));f=dv_GetParam(b,"uid");null==f?(f=dv_GetRnd(),b+="&uid="+f):(f=dv_GetRnd(),b=b.replace(/([?&]uid=)(?:[^&])*/i,"$1"+f));f=4E3;/MSIE (\d+\.\d+);/.test(navigator.userAgent)&&7>=new Number(RegExp.$1)&&
(f=2E3);c=navigator.userAgent.toLowerCase();if(-1<c.indexOf("webkit")||-1<c.indexOf("chrome"))c="&referrer="+encodeURIComponent(window._dv_win.location),b.length+c.length<=f&&(b+=c);j.length+s.length+b.length<=f&&(b+=s,a+=j);var b=b+("&"+this.getVersionParamName()+"="+this.getVersion()),b=b+("&eparams="+encodeURIComponent(n(a))),j="dvCallback_"+(window._dv_win.dv_config&&window._dv_win.dv_config.dv_GetRnd?window._dv_win.dv_config.dv_GetRnd():dv_GetRnd()),w=this.dv_script;window._dv_win[j]=function(a,
c,d){c.$uid=d;var e;var c=b,f={};try{for(var h=RegExp("[\\?&]([^&]*)=([^&#]*)","gi"),g=h.exec(c);null!=g;)"eparams"!==g[1]&&(f[g[1]]=g[2]),g=h.exec(c);e=f}catch(i){e=f}a.tags.add(d,e);a.tags[d].set({tagElement:w,dv_protocol:p,protocol:k,uid:d});a.tags[d].ImpressionServedTime=(new Date).getTime();a.tags[d].getTimeDiff=function(){return(new Date).getTime()-this.ImpressionServedTime}};return b+"&jsCallback="+j}}};this.sendRequest=function(c){var a;a=this.getVersionParamName();var d=this.getVersion(),
e={};e[a]=d;e.dvp_jsErrUrl=c;e.dvp_jsErrMsg=encodeURIComponent("Error loading visit.js");window._dv_win.dv_config=window._dv_win.dv_config||{};window._dv_win.dv_config.tpsErrAddress=window._dv_win.dv_config.tpsAddress||"tps30.doubleverify.com";a='try{ script.onerror = function(){ try{(new Image()).src = "'+dv_CreateAndGetErrorImp(window._dv_win.dv_config.tpsErrAddress+"/visit.jpg?ctx=818052&cmp=1619415&dvtagver=6.1.src&dvp_isLostImp=1",e)+'";}catch(e){}}}catch(e){}';a='<html><head></head><body><script type="text/javascript" src="'+
c+'"><\/script><script type="text/javascript">var script = document.getElementsByTagName("script")[0]; if (script.readyState) { script.onreadystatechange = function() { if (script.readyState == "complete") document.close(); } } else document.close(); '+a+"<\/script></body></html>";d=k("about:blank");this.dv_script.id=d.id.replace("iframe","script");dv_GetParam(c,"uid");document.body.insertBefore(d,document.body.firstChild);if(c=dv_getPropSafe(d,"contentDocument")||dv_getPropSafe(dv_getPropSafe(d,
"contentWindow"),"document")||dv_getPropSafe(window._dv_win.frames[d.name],"document")){c.open();if(d=d.contentWindow||window._dv_win.frames[d.name])d.$dv=window._dv_win.$dv;c.write(a)}else c='javascript: (function(){document.open(); document.domain="'+window.document.domain+"\"; window.$dv = window.parent.$dv; document.write('"+encodeURIComponent(a)+"');})()",d=k(c),this.dv_script.id=d.id.replace("iframe","script"),document.body.insertBefore(d,document.body.firstChild);return!0};this.isApplicable=
function(){return!0};this.onFailure=function(){var c=window._dv_win._dvScripts,a=this.dv_script;null!=c&&(void 0!=c&&a)&&(a=c.indexOf(a),-1!=a&&c.splice(a,1))};this.getVersionParamName=function(){return"jsver"};this.getVersion=function(){return"13"}};


function dv_src_main(dv_baseHandlerIns, dv_handlersDefs) {

    this.baseHandlerIns = dv_baseHandlerIns;
    this.handlersDefs = dv_handlersDefs;

    this.exec = function () {
        try {
            window._dv_win = (window._dv_win || window);
            window._dv_win.$dv = (window._dv_win.$dv || new dvType());
            
            window._dv_win.dv_config = window._dv_win.dv_config || {};
            window._dv_win.dv_config.tpsErrAddress = window._dv_win.dv_config.tpsAddress || 'tps30.doubleverify.com';
            
            var errorsArr = (new dv_rolloutManager(this.handlersDefs, this.baseHandlerIns)).handle();
            if (errorsArr && errorsArr.length > 0)
                dv_SendErrorImp(window._dv_win.dv_config.tpsErrAddress + '/visit.jpg?ctx=818052&cmp=1619415&dvtagver=6.1.src', errorsArr);
        }
        catch (e) {
            try {
                dv_SendErrorImp(window._dv_win.dv_config.tpsErrAddress + '/visit.jpg?ctx=818052&cmp=1619415&dvtagver=6.1.src&jsver=0&dvp_isLostImp=1', { dvp_jsErrMsg: encodeURIComponent(e) });
            } catch (e) { }
        }
    }
}

try {
    window._dv_win = window;
    var dv_baseHandlerIns = new dv_baseHandler();
	

    var dv_handlersDefs = [];
    (new dv_src_main(dv_baseHandlerIns, dv_handlersDefs)).exec();
} catch (e) { }
