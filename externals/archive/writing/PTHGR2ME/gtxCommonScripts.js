if(!OMNI) {
	var OMNI = {};
	var GALE = {
		namespace : function(newNamespace, parent) {
			var parent = parent || GALE;
			var parts = newNamespace.split('.');
			// GALE is implied, so it is ignored if it is included
			var startIndex = parts[0] === 'GALE' ? 1 : 0;
			for ( var j = startIndex; j < parts.length; j++) {
				var part = parts[j];
				parent[part] = parent[part] || {};
				parent = parent[part];
			}
			return parent;
		}
	};
}

/*************************************  Common Variables *********************************************************/
BR_DOM  = (document.getElementById) ? true : false;
BR_NS4  = (document.layers) ? true : false;
BR_IE   = (document.all) ? true : false;
BR_IE4  =  BR_IE && !BR_DOM;
BR_Mac  = (navigator.appVersion.indexOf("Mac") != -1);
BR_IE4M =  BR_IE4 && BR_Mac;
BR_NS6  =  BR_DOM && !BR_IE;
BR_Safari  = (navigator.appVersion.indexOf("Safari") != -1);

/*************************************** Event Related Functions ************************************************/
function addEvent(obj, eventType, fn){
	if(obj == null) return false;
	if (obj.addEventListener){
		obj.addEventListener(eventType, fn,true );
		return true;
	} else if (obj.attachEvent){
		return obj.attachEvent("on"+eventType, fn);
	}
	return false;
}

function addWindowLoadEvent(func){
	addToCallStack(window,"onload",func,true);
}

function addLoadEvent(obj, fn){
	addEvent(obj, "load", fn);
}

function addKeyPressEvent(obj,fn){
	addEvent(obj, "keypress", fn);
}

function addKeyPressEventForId(id,fn){
	addKeyPressEvent(getElementById(id), fn);
}

function addClickEvent(obj, fn){
	addEvent(obj, "click", fn);

}

function addClickEventForId(id, fn){
	addClickEvent(getElementById(id), fn);
}

function addSubmitEvent(obj, func){
	addEvent(obj, "submit", func);
}

function addMouseOverEvent(id, fn){
	addEvent(getElementById(id), "mouseover", fn);
}

function addMouseOutEvent(id, fn){
	addEvent(getElementById(id), "mouseout", fn);
}

function addChangeEvent(obj,fn) {
	addEvent(obj, "change",fn);
}

function addChangeEventForId(id, fn){
	addChangeEvent(getElementById(id), fn);
}

function cancelEvent(evt) {
	if (document.layers){
		return false;
	}else if (evt.stopPropagation) {
		evt.stopPropagation();
		evt.preventDefault();
	}else if (window.event){
		return false;
	}
}

function addToCallStack(obj ,eventType,func,once){
	var prevFunc = obj[eventType];
	var prevFuncCopy = prevFunc;
	if(!(typeof (prevFunc) == "function" && prevFunc.callStack)){
		var prevFuncCopy = function(){
			var prevFuncCopyStack=prevFuncCopy.callStack;
			for(var i=0;i<prevFuncCopyStack.length;i++){
				if(prevFuncCopyStack[i].apply(this,arguments)===false){
					break;
				}
			}
			if(once){
				try{
					obj[eventType]=null;
				} catch(e){
				}
			}
		};
		prevFuncCopy.callStack = [];
		if(typeof (prevFunc)=="function"){
			prevFuncCopy.callStack.push(prevFunc);
		}
		obj[eventType]=prevFuncCopy;
	}
	prevFuncCopy.callStack.push(func);
}

function getTextNode(element)
{
	if (element != null)
	{
		var nodes = element.childNodes;
		for (var j = 0; j < nodes.length; j++)
		{
			var node = nodes[j];
			if (node.nodeType == 3)
			{
				return node;
			}
		}
	}
	return null;
}

/*********************************** Setting target attributes and child windows ***************************/

function setTargetForElementById(id, target){
	var element = getElementById(id);
	element.target = target;
}

function setTargetForElementsWithClass(name, target){
	for(var i = 0; i < document.links.length; i++) {
		if(document.links[i].className == name){
			document.links[i].target = target;
		}
	}
}

function attachTarget(id, target){
	var obj = getElementById(id);
	if(obj != null){
		if(obj.tagName == "A"){
			obj.target = target;
		}else{
			var linkArray = obj.getElementsByTagName("A");
			for (i=0; i < linkArray.length; ++i) {
				if(linkArray[i].className != "primaryNavigation"){
					linkArray[i].target = target;
				}
			}
		}
	}
}

function openDOILink() {
	var link = $(this);
	var data = {'docId':link.data('doc-id'), 'moduleId':link.data('module-id'), 'resultClickType': link.data('result-click-type') };
	var infomarkSessionId = getParamValueInURL(location.href, 'asid');
	if(infomarkSessionId) {
		data.asid = infomarkSessionId;
	}
	if(isValidObject(data.moduleId)) {
		doAjaxCall('/ps/auditLog/resultClick', data, true);
	}
	var galeWindow = window.open(this.href,"galeChildWindow","toolbar=no, directories=no, status=no, location=no, resizable=yes, menubar=no, scrollbars=yes,screenX=50,screenY=50,top=50,left=50,width=750,height=550");
	galeWindow.focus();
	return false;
}

function doAjaxCall(url, params, isAsync, callback) {
	var dataMap = {u: $("#userGroupName").val(), p: $("#prodId").val()};
	_.extend(dataMap, params);
	 
	callback = callback || function() {};
	$.ajax({
		type : 'GET',
		timeout : 10000, // in milliseconds
		url : url,
		data : dataMap,
		cache : false,
		async:isAsync,
		success : callback
	});
}

function openGaleChildWindow(){
	return openGaleChildWindowForUrl(this.href);
}

function openGaleChildWindowForUrl(url) {
	var galeWindow = window.open(url,"galeChildWindow","toolbar=no, directories=no, status=no, location=no, resizable=yes, menubar=no, scrollbars=yes,screenX=50,screenY=50,top=50,left=50,width=750,height=550");
	galeWindow.focus();
	return false;
}

function openGoogleChildWindow(){
	var googleWindow = window.open(this.href,"googleChildWindow","toolbar=no, directories=no, status=no, location=no, resizable=yes, menubar=no, scrollbars=yes,screenX=50,screenY=50,top=50,left=50,width=750,height=550");
	googleWindow.focus();
	return false;
}

function openXreferPlusChildWindow(){
	window.open(this.href,"xreferplusChildWindow","toolbar=no, directories=no, status=no, location=no, resizable=yes, menubar=no, scrollbars=yes,screenX=50,screenY=50,top=50,left=50,width=750,height=550");
	return false;
}
function openPrintWindow(){
	var galeWindow = window.open(this.href,"galeChildWindow","toolbar=no, directories=no, status=no, location=no, resizable=yes, menubar=yes, scrollbars=yes,screenX=50,screenY=50,top=50,left=50,width=750,height=550");
	galeWindow.focus();
	return false;
}

function openInfomarkWindow(){
	var infomarkWindow = window.open(this.href,"infomarkWindow","menubar=yes,toolbar=no,resizable=yes,scrollbars=yes,width=850,height=500");
	infomarkWindow.focus();
	return false;
}

function openInChildWindowWithMenuBar(url, childWindowName){
	window.open(url, childWindowName,"toolbar=yes, directories=no, status=no, location=no, resizable=yes, menubar=yes, scrollbars=yes,screenX=50,screenY=50,top=50,left=50,width=750,height=550");
}

function openInChildWindow(url, childWindowName){
	window.open(url, childWindowName,"toolbar=no, directories=no, status=no, location=no, resizable=yes, menubar=no, scrollbars=yes,screenX=50,screenY=50,top=50,left=50,width=750,height=550");
}

function openNewWindow(){
	window.open(this.href, "new");
	return false;
}

function openCitationExampleWindow(obj){
	obj.click(function(e){
		e.preventDefault();
		window.open($(this).attr('href'),"new","toolbar=no, directories=no, status=no, location=no, resizable=yes, menubar=no, scrollbars=yes,screenX=50,screenY=50,top=50,left=50,width=750,height=550");
	});


	return false;
}


function attachEventForLink(id, fn){
	var obj = getElementById(id);
	if(obj != null){
		if(obj.tagName == "A"){
			obj.onclick = fn;
		}else{
			attachEventToChildLinks(obj, fn);
		}
	}
}

function attachPopup(id, fn){
	attachEventForLink(id, fn);
}

function attachPopupForSelector(selector, fn){
	var obj = document.getElementsBySelector(selector);
	if(isValidObject(obj) && obj.length >0){
		if(obj[0].tagName == "UL"){
			for(var i=0;i<obj.length;i++){
				var liCollection = obj[i].getElementsByTagName("LI");
				for(var j=0;j<liCollection.length;j++){
					attachEventToChildLinks(liCollection[j], fn);
				}
			}
		}else if(obj[0].tagName == "LI"){
			for(var j=0;j<obj.length;j++){
				attachEventToChildLinks(obj[j], fn);
			}
		}
		else if( obj[0].tagName == "A" )
		{
			for( var j=0; j<obj.length; j++ )
			{
				obj[j].onclick = fn;
			}
		}
		else{
			attachEventToChildLinks(obj, fn);
		}
	}
}

function attachEventToChildLinks(obj, fn){
	var linkArray = obj.getElementsByTagName("A");
	for (i=0; i < linkArray.length; ++i) {
		linkArray[i].onclick = fn;
	}
}

function getXmlHttpRequest() {
	var xmlHttpReq = false;
	if (window.XMLHttpRequest) {
		xmlHttpReq = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		try {
			xmlHttpReq = new ActiveXObject("MSXML2.XMLHttp");
		} catch (ex) {
			try{
				xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
			}catch (execp){
			}
		}
	}
	return xmlHttpReq;
}

function postRequest(url) {
	postRequest(url, true)
}

function postRequest(url, isAsynchronous) {
	url = unescape(url);
	var urlParams = "";
	var baseURL = url;
	var ipos = url.indexOf('?');
	if (ipos > -1) {
		urlParams = url.substr(ipos+1);
		baseURL = url.substr(0, ipos);
	}

	var xmlhttp = getXmlHttpRequest();
	xmlhttp.open("POST", baseURL, isAsynchronous);
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	xmlhttp.send(urlParams);
	if (xmlhttp.status == 500) {
		return false; 
	} else {
		return true;
	}

}
/************************************************ Common Scripts *************************************************/

function getElementById(name) {
	var thisObj;
	if (document.getElementById) {
		thisObj = document.getElementById(name);
	} else if (document.all) {
		thisObj = document.all[name];
	} else if (document.layers) {
		thisObj = document.layers[name];
	}
	return thisObj;
}

function getElementByName(name) {
	var thisObj;
	if (document.getElementByName) {
		thisObj = document.getElementByName(name);
	} else if (document.all) {
		thisObj = document.all[name];
	} else if (document.layers) {
		thisObj = document.layers[name];
	}
	return thisObj;
}

function getElementsByName(name) {
	var thisObj;
	if (document.getElementsByName) {
		thisObj = document.getElementsByName(name);
	} else if (document.all) {
		thisObj = document.all[name];
	} else if (document.layers) {
		thisObj = document.layers[name];
	}
	return thisObj;
}

function trim(stringValue){
	return stringValue.replace( /^\s*/, "" ).replace( /\s*$/, "" );
}

function lTrim(stringValue){
	return stringValue.replace( /^\s*/, "" );
}

function rTrim(stringValue){
	return stringValue.replace( /\s*$/, "" );
}

function getCookie(name) {
	var cookieName = name + "=";
	var cookieString = document.cookie;
	var cookieValue = null;
	if (cookieString.length > 0) {
		begin = cookieString.indexOf(cookieName);
		if (begin!= -1) {
			begin += cookieName.length;
			end = cookieString.indexOf(";", begin);
			if (end == -1)  end = cookieString.length;
			cookieValue = unescape(cookieString.substring(begin, end));
		}
	}
	return cookieValue;
}

function setCookie(name, value) {
	document.cookie = name + "=" + escape (value);
}

/************************************ get Element by selector *****************************************************/
function getAllChildren(e) {
	return e.all ? e.all : e.getElementsByTagName('*');
}

document.getElementsBySelector = function(selector) {
	if (!document.getElementsByTagName) {
		return new Array();
	}
	var tokens = selector.split(' ');
	var currentContext = new Array(document);
	for (var i = 0; i < tokens.length; i++) {
		token = tokens[i].replace(/^\s+/,'').replace(/\s+$/,'');;
		if (token.indexOf('#') > -1) {
			var bits = token.split('#');
			var tagName = bits[0];
			var id = bits[1];
			var element = document.getElementById(id);
			if (tagName && element.nodeName.toLowerCase() != tagName) {
				return new Array();
			}
			currentContext = new Array(element);
			continue;
		}
		if (token.indexOf('.') > -1) {
			var bits = token.split('.');
			var tagName = bits[0];
			var className = bits[1];
			if (!tagName) {
				tagName = '*';
			}
			var found = new Array;
			var foundCount = 0;
			for (var h = 0; h < currentContext.length; h++) {
				var elements;
				if (tagName == '*') {
					elements = getAllChildren(currentContext[h]);
				} else {
					elements = currentContext[h].getElementsByTagName(tagName);
				}
				for (var j = 0; j < elements.length; j++) {
					found[foundCount++] = elements[j];
				}
			}
			currentContext = new Array;
			var currentContextIndex = 0;
			for (var k = 0; k < found.length; k++) {
				if (found[k].className && found[k].className.match(new RegExp('\\b'+className+'\\b'))) {
					currentContext[currentContextIndex++] = found[k];
				}
			}
			continue;
		}
		if (token.match(/^(\w*)\[(\w+)([=~\|\^\$\*]?)=?"?([^\]"]*)"?\]$/)) {
			var tagName = RegExp.$1;
			var attrName = RegExp.$2;
			var attrOperator = RegExp.$3;
			var attrValue = RegExp.$4;
			if (!tagName) {
				tagName = '*';
			}
			var found = new Array;
			var foundCount = 0;
			for (var h = 0; h < currentContext.length; h++) {
				var elements;
				if (tagName == '*') {
					elements = getAllChildren(currentContext[h]);
				} else {
					elements = currentContext[h].getElementsByTagName(tagName);
				}
				for (var j = 0; j < elements.length; j++) {
					found[foundCount++] = elements[j];
				}
			}
			currentContext = new Array;
			var checkFunction;
			switch (attrOperator) {
			case '=':
				checkFunction = function(e) { return (e.getAttribute(attrName) == attrValue); };
				break;
			case '~':
				checkFunction = function(e) { return (e.getAttribute(attrName).match(new RegExp('\\b'+attrValue+'\\b'))); };
				break;
			case '|':
				checkFunction = function(e) { return (e.getAttribute(attrName).match(new RegExp('^'+attrValue+'-?'))); };
				break;
			case '^':
				checkFunction = function(e) { return (e.getAttribute(attrName).indexOf(attrValue) == 0); };
				break;
			case '$':
				checkFunction = function(e) { return (e.getAttribute(attrName).lastIndexOf(attrValue) == e.getAttribute(attrName).length - attrValue.length); };
				break;
			case '*':
				checkFunction = function(e) { return (e.getAttribute(attrName).indexOf(attrValue) > -1); };
				break;
			default :
				checkFunction = function(e) { return e.getAttribute(attrName); };
			}
			currentContext = new Array;
			var currentContextIndex = 0;
			for (var k = 0; k < found.length; k++) {
				if (checkFunction(found[k])) {
					currentContext[currentContextIndex++] = found[k];
				}
			}
			continue;
		}
		tagName = token;
		var found = new Array;
		var foundCount = 0;
		for (var h = 0; h < currentContext.length; h++) {
			var elements = currentContext[h].getElementsByTagName(tagName);
			for (var j = 0; j < elements.length; j++) {
				found[foundCount++] = elements[j];
			}
		}
		currentContext = found;
	}
	return currentContext;
};

/* That revolting regular expression explained
/^(\w+)\[(\w+)([=~\|\^\$\*]?)=?"?([^\]"]*)"?\]$/
  \---/  \---/\-------------/    \-------/
    |      |         |               |
    |      |         |           The value
    |      |    ~,|,^,$,* or =
    |   Attribute
   Tag
 */

/* document.getElementsBySelector(selector)
   - returns an array of element objects from the current document
     matching the CSS selector. Selectors can contain element names,
     class names and ids and can be nested. For example:

       elements = document.getElementsBySelect('div#main p a.external')

     Will return an array of all 'a' elements with 'external' in their
     class attribute that are contained inside 'p' elements that are
     contained inside the 'div' element which has id="main"
 */


function isValidObject(obj) {
	return (obj == null || obj == undefined ? false : true);
}

function getParamValueInURL(url, paramName){
	paramName = paramName + "=";
	var startIndex = url.indexOf(paramName) + paramName.length;
	var endIndex = url.indexOf("&", startIndex);
	if(endIndex == -1)
		endIndex=url.length;
	var paramValue = url.substring(startIndex, endIndex);
	return paramValue;

}

function addParamToURL(url, paramName, paramValue) {
	var appender = "";
	if(isValidObject(url) && url != "") {
		if(url.toString().indexOf("?") >= 0) {
			appender = url + "&";
		} else {
			appender = url + "?";
		}
	}
	return appender + paramName + "=" + paramValue;
}

function createParameter(params, paramName, paramValue) {
	var appender = "";
	if(isValidObject(params) && params != "") {
		appender = params + "&";
	}
	return appender + paramName + "=" + paramValue;
}

function replaceParamValueInURL(url, paramName, newValue){
	paramName = paramName + "=";
	var startIndex = url.indexOf(paramName) + paramName.length;
	var endIndex = url.indexOf("&", startIndex);
	if(endIndex == -1)
		endIndex=url.length;
	var paramValue = url.substring(startIndex, endIndex);
	return url.replace(paramName + paramValue, paramName + newValue);
}

function isParamInUrl(url, paramName) {
	paramName = paramName + "=";
	if(url.indexOf(paramName) > 0)
		return true;
	return false;
}

function isNumeric(numberString){
	if (numberString && numberString.length == 0 || isNaN(numberString) ) return false;
	var numericPattern = "^[0-9]+$";
	var numericExp = new RegExp(numericPattern);
	return numericExp.test(numberString);
}

/*********************************** Common Search form/field Validation functions ***************************/
function isValidWildCardSearch(searchTerm){
	if(searchTerm.match(/"([^"\\]|\\.)*"/)){
		return true;
	}
	var validSearch = true;
	var nonWildCardChars = searchTerm.replace(/\?|!|\*/g, "*");
	var wildpos = nonWildCardChars.indexOf('*');
	while ((wildpos) > -1) {
		for (var i = 0;  i < 3; ++i) {
			var checkpos = wildpos - i - 1;
			if (checkpos < 0) {
				return false;
			}
			if (" \"()".indexOf(nonWildCardChars.charAt(checkpos)) > -1) {
				return false;
			}
		}
		wildpos = nonWildCardChars.indexOf('*', wildpos+1);
	}
	return validSearch;
}

function isValidWildCardSearchForCCL(searchTerm){
	var validSearch = true;
	if(searchTerm.indexOf('AND') > -1 || searchTerm.indexOf(' OR ') > -1 || searchTerm.indexOf('NOT') > -1){
	}else{
		if(searchTerm.indexOf('*') > -1 || searchTerm.indexOf('?') > -1 || searchTerm.indexOf('!') > -1){
			var searchWordArr=searchTerm.split(" ");
			var searchWord=searchWordArr[1];
			var nonWildCardChars = searchWord.replace(/\?|!|\*/g, "");
			var nonWildCardCharsLen = trim(nonWildCardChars).length;
			if(nonWildCardCharsLen < 3){
				validSearch = false;
			}
		}
	}
	return validSearch; 
}

function hideBoxWithClass(name){
	var closeLinks = document.getElementsBySelector("a."+name);
	var obj;
	for(var i = 0; i < closeLinks.length; i++) {

		obj = closeLinks[i];
		obj.onclick = function() {
			obj.parentNode.style.display='none';
		};

	}
	return false;
}

/////////////////////////////////////////////////////////////////////////////
//methods for Back to previous page link
/////////////////////////////////////////////////////////////////////////////
function goBacktoPreviousPage() {
	history.back();
}
function hideBacktoPreviousPage() {
	var url = this.location.href;
	var infomarkVersionParam = url.indexOf("&v=");
	var legacyInfomarkVersionParam = url.indexOf("&version=");
	if (infomarkVersionParam != -1 || legacyInfomarkVersionParam != -1) {
		hideNavigationLink();
	}
}

function hideNavigationLink() {
	var id = "navigation";
	var navObj = getElementById(id);
	if (isValidObject(navObj)) {
		navObj.className = "hide";
	}
	var contentObj = getElementById("content");	
	if (isValidObject(contentObj)) {
		contentObj.className = "infoMark";
	}			
	return;
}


function openNewWindowForVideo() {
	$('.new_window').live('click',openGaleChildWindow);
}
/////////////////////////////////////////////////////////////////////////////
//add events to popup new windows on certain links
/////////////////////////////////////////////////////////////////////////////
function attachPopupEvents(){
	attachPopupForSelector("a.xreferplusChildWindow", openXreferPlusChildWindow);
	attachPopupForSelector("a.galeChildWindow", openGaleChildWindow);
	openNewWindowForVideo();
	attachPopupForSelector("a.newWindow", openNewWindow);
	hideBoxWithClass("closeXsm");
	attachPopup("searchtips-help",openGaleChildWindow);
}
addWindowLoadEvent(attachPopupEvents);
addWindowLoadEvent(hideBacktoPreviousPage);
///////////////////////////////////////////////////////////////////////////////////

function validateImageRange() {
	var totalNoOfImagesValue = document.getElementById("totalNoOfImages").value;
	var totalNoOfImages = parseInt(totalNoOfImagesValue);
	var range = document.getElementById("PRINT_NEXT_EIGHT_IMAGE").value;
	var rangeParams = range.split(',');
	var total = 0 ;
	var firstElement = 0;
	var secondElement = 0;
	var alertMSG = "The numbers entered have exceeded the maximum allowed, Please enter a valid number or range which would be fewer than or equal to 8 images";
	if (range == "" || parseInt(rangeParams)==0){
		alert("Enter a valid Number");
		return false;
	}
	if (parseInt(rangeParams) > totalNoOfImages && rangeParams.length == 1) {
		alert("Enter the valid range");
		return false;	
	}
	for(var i=0;i<rangeParams.length;i++) {
		if (rangeParams[i].indexOf('-') >= 0) {
			var arr = rangeParams[i].split('-');

			if (arr.length > 2 || arr[0] =='' || arr[1] =='') {
				alert("Enter the valid range");
				return false;
			}

			firstElement = parseInt(arr[0]);
			secondElement = parseInt(arr[1]);
			if(firstElement >= secondElement) {
				alert("Enter the valid range");
				return false;
			}
			if (firstElement > totalNoOfImages || secondElement > totalNoOfImages) {
				alert("Enter the valid range");
				return false;	
			}
			if ((secondElement - firstElement) > 8 ) {
				alert(alertMSG);
				return false;
			}else {
				for (var index=firstElement;index <= secondElement ;index++) {
					total += 1;
				}
			}
		}else {
			if (rangeParams[i]== '' || parseInt(rangeParams[i]) > totalNoOfImages) {
				alert("Enter the valid range");
				return false;	
			}else {
				total += 1;
			}
		}
	}
	if ( parseInt(totalNoOfImages ) <  total  ) {
		alert("Enter the valid range");
		return false;
	}else if (total < parseInt(totalNoOfImages ) && total > 8) {
		alert(alertMSG);
		return false;
	}
	return true;
}

function handleKeyPressForPrint(e){
	var characterCode;
	var src;

	if(window.event)
	{
		characterCode = e.keyCode;
		src = e.srcElement;
	}
	else if(e.which)
	{
		characterCode = e.which;
		src = e.target;
	}

	if( (characterCode <= 47 || characterCode > 57) && characterCode != 8 && characterCode != 13 && characterCode != 44 && characterCode != 45) {
		if(src.id == 'PRINT_NEXT_EIGHT_IMAGE' ) {
			return false;
		}
	}
	if (characterCode == 13) {
		if(src.id == 'PRINT_NEXT_EIGHT_IMAGE' ) {
			constructURLandSubmit();
			return false;
		}
	}
}

function validateCalendarRange() {
	var totalNoOfCalendarPage = Number(document.getElementById("totalNoOfCalendarPage").value);
	var range = document.getElementById("PRINT_NEXT_CALENDAR").value;
	var rangeParams = range.split(',');
	var total = 0 ;
	var firstElement = 0;
	var secondElement = 0;
	var alertMSG = "The numbers entered have exceeded the maximum allowed, Please enter a valid number or range which would be fewer than or equal to 8 images";
	if (range == ""){
		alert("Enter a valid Number");
		return false;
	}
	if (Number(rangeParams) >totalNoOfCalendarPage && Number(rangeParams.length) == 1) {
		alert("Enter the valid range");
		return false;	
	}
	for(var i=0;i<rangeParams.length;i++) {
		if (rangeParams[i].indexOf('-') > 0) {
			var arr = rangeParams[i].split('-');
			firstElement = Number(arr[0]);
			secondElement = Number(arr[1]);
			if (Number(firstElement) >totalNoOfCalendarPage ||Number(secondElement) >totalNoOfCalendarPage) {
				alert("Enter the valid range");
				return false;	
			}
			if ((secondElement - firstElement) > 100 ) {
				alert(alertMSG);
				return false;
			}else {
				for (var index=firstElement;index <= secondElement ;index++) {
					total += 1;
				}
			}
		}else {
			total += 1;
		}
	}
	if (totalNoOfCalendarPage <  total  ) {
		alert("Enter the valid range");
		return false;
	}else if (total < totalNoOfCalendarPage && total > 100) {
		alert(alertMSG);
		return false;
	}
	return true;
}

function handleKeyPress(e) {
	var characterCode;
	var src;

	if(window.event)
	{
		characterCode = e.keyCode;
		src = e.srcElement;
	}
	else if(e.which)
	{
		characterCode = e.which;
		src = e.target;
	}

	if( (characterCode < 48 || characterCode > 57) && characterCode != 8 && characterCode != 13 && characterCode != 44 && characterCode != 45) {
		if(src.id == 'PRINT_NEXT_CALENDAR') {
			return false;
		}
	}
}
function toggleDisplayOfSpan(spanIdToDisplay,spanIdToHide){

	document.getElementById(spanIdToDisplay).style.display="block";
	document.getElementById(spanIdToHide).style.display="none";

}

function getURLParam(name) {
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( window.location.href );
	if( results == null )
		return "";
	else
		return results[1];
}

function attachMultiSearchAssist(element,limiter, options) {
	var p = jQuery("#prodId").attr('value');
	var u = jQuery("#userGroupName").attr('value');
	options =  options || {};
	var limiterValue = $('#' + limiter + '_dynamicLimiterField').val();
	if(!_(limiterValue).isBlank()) {
		var limiterValueList = _.words(limiterValue, ' OR ');
		options.prePopulate = _.reduce(limiterValueList, function(prepopulate, val){val = _.trim(val, '"'); prepopulate.push({'id':val, 'name':val}); return prepopulate; }, []);
	}
	$(element).tokenInput("/ps/searchAssist?limiter="+limiter+"&userGroupName="+ u + "&prodId="+p, options);
}

function logit(str) {
	if(window.console && window.console.firebug) {
		console.log(str);
	}
}

function attachMultipleLimiterEvent (indexName) {

	var query = "";
	var context = indexName + "_brwsInput";
	$('.token-input-token p','#'+context).each(function(i){
		if (i > 0) {
			query += ' OR "';
		} else {
			query += '"';
		}
		query += $(this).text();
		query += '"';
	});

	$('.token-input-input-token input','#'+context).each(function(i){
		if($(this).val().length > 0){
			if (i > 0 || query.length > 0) {
				query += ' OR "';
			} else {
				query += '"';
			}
			query += $(this).val();
			query += '"';
		}
	});

	var typed_in = $('#search_assist','#'+context).val();
	if(typed_in != null && typed_in.length > 0) {

		if (query.length > 0) {
			query += ' OR "';
		} else {
			query += '"';
		}

		query += typed_in;
		query += '"';

	}
	$('#'+indexName+'_dynamicLimiterField').val(query);

}

function attachSearchTips() {
	var next = $('.search_tips a.st_next');
	var prev = $('.search_tips a.st_prev');
	var numTips = $('.search_tips ul.tips > li').length;
	var currNum = 1;

	if(numTips > 1) {
		if(currNum >= 1) {prev.hide();}
		next.click(function(e){
			e.preventDefault();
			currNum++;
			if(currNum > 0) {prev.show();}
			if(currNum >= numTips) {next.hide();}

			$('.inner_slider').animate({
				left: '-=300px'
			}, 300);

		});

		prev.click(function(e){
			e.preventDefault();
			currNum--;
			if(currNum <= 1) {prev.hide();}
			if(currNum < numTips) {next.show();}

			$('.inner_slider').animate({
				left: '+=300px'
			}, 300);
		});
	} else {
		prev.hide();
		next.hide();
	}

}


function validateQuickSearchOnEnter(id) { 
	$('#'+id).keydown(function(event){
		if(event.which == 13){
			event.preventDefault();
			var searchTerm = $.trim($(this).val());
			if (searchTerm == "") {
				alert(SEARCH_TERMS_EMPTY);
				$(this).focus();
				cancelEvent(event);
				return false;
			} else if (!isValidWildCardSearch(searchTerm)) {
				alert(WILDCARD_SEARCH_TERMS);
				$(this).focus();
				cancelEvent(event);
				return false;
			}

			$('form#header_quick_search_form').submit();
		}
	});
}

function validateQuickSearchNew(id) {
	$('#'+id).click(function(event){
		var searchField	= $('#' + $('#'+id).siblings("input[type=text]").get(0).id);
		if (validateQuickSearchFieldValue(searchField, event)) {
			$('input#'+id).addClass('loading');
		} else {
			return false;
		}
	});
}

function validateQuickSearchFieldValue(searchField, event) {
	var searchTerm = $.trim(searchField.val());
	if (searchTerm === "" || searchTerm === searchField.attr('placeholder')) {
		alert(SEARCH_TERMS_EMPTY);
		searchField.focus();
		cancelEvent(event);
		return false;
	} else if (!isValidWildCardSearch(searchTerm)) {
		alert(WILDCARD_SEARCH_TERMS);
		searchField.focus();
		cancelEvent(event);
		return false;
	}
	return true;
}
$(document).ready(function() {
	var citationDocUrl = $('span.docUrl');
	if(citationDocUrl.length != 0) {
		var docUrl = decodeURIComponent(citationDocUrl.html());
		citationDocUrl.html(docUrl);
	}
});