
/****************************************** For Dictionary ********************************************************/
var selectedString = "";
function autodict() {
	if (document.selection && document.selection.createRange) {
        if (event.srcElement.tagName == "A" || event.srcElement.tagName == "IMG" ||
            event.srcElement.tagName == "INPUT") {
            return false;
        }
        if(document.selection.type == "Text"){
           	var range = document.selection.createRange();
            selectedString = range.text;
        }
    }
    else if(window.getSelection){
       	selectedString=window.getSelection();
     }else if(BR_NS6 || BR_NS4){
       	selectedString=document.getSelection();
     }
    if (selectedString.length > 50)
          selectedString = "";
}

function openDictionary() {
    var link = this.href ;//+'&queryTerm='+str;
    if (selectedString != "") {
        link=link.replace("=List","=Lookup");
    }
    link = link +'&queryTerm='+selectedString+"&currentPosition=-1";
    var remote = window.open(link,"galeChildWindow","alwaysRaised=yes,toolbar=no,width=720,height=520,screenX=50,screenY=50,top=50,left=50,resizable=yes,scrollbars=yes,menubar=no,status=no");
    return false;
    
    
    
    
    
}

function setMediumFont(){
    var size = getDefaultFontSize();
    setCookie("base-font", size);
    setBaseFontSize(size);
    return false;
}

function setLargeFont(){
	var size = getBaseFontSize()
    size = parseInt(size) + 12;
 	if (size >= 134) {
  		size = 132;
 	}
	setCookie("base-font", size);
    setBaseFontSize(size);
    return false;
}

function setSmallFont(){
	var size = getBaseFontSize()
    size = parseInt(size) - 12;
	if (size <= 14) {
	  size = 14;
	}
	setCookie("base-font", size);
    setBaseFontSize(size);
    return false;
}


function brandingMouseOver(){
	var sfEls = getElementById("brandingMenu").getElementsByTagName("LI");
	for (var i=0; i<sfEls.length; i++) {
		sfEls[i].onmouseover = 	function() {
									this.className+=" sfhover";
								}
	}
}

function brandingMoverOut(){
	var sfEls = getElementById("brandingMenu").getElementsByTagName("LI");
	for (var i=0; i<sfEls.length; i++) {
		sfEls[i].onmouseout = 	function() {
									this.className=this.className.replace(new RegExp("sfhover\\b"), "");
								}
	}
}

function attachTargetForBrandingMenu(){
	var brandingMenuElement = getElementById("brandingMenu");
	if(brandingMenuElement != null){
		var sfEls = brandingMenuElement.getElementsByTagName("LI");
		var returnToLibraryElementId = "brandingMenu-return";
		for (var i=0; i<sfEls.length; i++) {
			if(returnToLibraryElementId == sfEls[i].id){
				attachTarget("brandingMenu-return", "_self");
			}else{
				attachTarget("brandingMenu", "_blank");
			}
		}
	}
}

function attachMouseEventForAutoDictionary() {
// Detect if the browser is IE or not.
// If it is not IE, we assume that the browser is NS.
	var readSpeakerValue = $('#readSpeakerAuto').val();
	if(_(readSpeakerValue).isBlank()) {
		var IE = document.all? true : false;
		if (!IE) {
			if (window.Event){
		   		document.captureEvents (Event.MOUSEUP);
			}
		}
		document.onmouseup = autodict;
	}
}
function openSupportEmailWindow() {
	if(getElementById("supportEmailURL")) {
		if(navigator.appName == "Netscape") {
			window.location.href = getElementById("supportEmailURL").value;
		}else {
			this.location.href = getElementById("supportEmailURL").value;
		}
	}
}
addWindowLoadEvent(openSupportEmailWindow); 
/******************************************* For Infomark Tools ***************************************************/
/*function openMarkListInfomarkWindow(url){
	processInfoMark(url, "galeChildWindow");
}*/


/******************************** Setting base font for the page **********************************************/
 
function setBaseFontSize(size){
    //document.getElementsByTagName("html")[0].style.fontSize = size + "%";
}

function getDefaultFontSize(){
    return "";
}

function getBaseFontSize() {
    var size = getCookie("base-font");
 	if(!isValidObject(size)){
		size = getDefaultFontSize();
    }
    return size;
}

function setInitialFontSize(){
	var size = getCookie("base-font");
	if(!isValidObject(size)){
		size = getDefaultFontSize();
        setCookie("base-font", size);
    }
	setBaseFontSize(size);
}
addWindowLoadEvent(setInitialFontSize);



/*********************************************Event Binding*********************************************************/

				
function attachHeaderEvents(){
	attachTargetForBrandingMenu();
	//attachPopup("titleBar-preferences", openGaleChildWindow);	
	attachPopup("searchBar-help", openGaleChildWindow);
	attachPopup("globalTools-infomark", openInfomarkWindow);
	//attachPopup("globalTools-dictionary", openDictionary);
	attachPopup("globalTools-toolbox", openGaleChildWindow);
	attachPopup("globalTools-tour", openGaleChildWindow);
	attachPopup("globalTools-titleList", openGaleChildWindow);
	attachPopup("globalTools-help",openGaleChildWindow);
	attachPopup("searchForm-helpLink", openGaleChildWindow);
	addClickEventForId("fontSize-small", setSmallFont);
	addClickEventForId("fontSize-medium", setMediumFont);
	addClickEventForId("fontSize-large", setLargeFont);
	addMouseOutEvent("brandingMenu", brandingMoverOut);
	addMouseOverEvent("brandingMenu", brandingMouseOver);
	attachMouseEventForAutoDictionary();
}
function submitForBanner(event){
	return validateBannerSearch(event);
    return true;
}

function validateBannerSearch(event) {
    var searchTerm = document.getElementById("quickSearchTermBanner").value;
    if (searchTerm == "") {
        alert(SEARCH_TERMS_EMPTY);
        document.getElementById("quickSearchTermBanner").focus();
        cancelEvent(event);
        return false;
    } else if (!isValidWildCardSearch(searchTerm)) {
        alert(WILDCARD_SEARCH_TERMS);
        document.getElementById("quickSearchTermBanner").focus();
        cancelEvent(event);
        return false;
    }
    
}

function addBannerSearchEvents(){
 addSubmitEvent(document.getElementById("dynamicSearchFormBanner"),submitForBanner);
}
addWindowLoadEvent(attachHeaderEvents);
addWindowLoadEvent(addBannerSearchEvents);
function attachFooterEvents(){
	attachTarget("footer-corporate", "footerWindow");
	attachTarget("footer-product", "footerWindow");
	attachTarget("footer-copyright", "footerWindow");
}
addWindowLoadEvent(attachFooterEvents);
