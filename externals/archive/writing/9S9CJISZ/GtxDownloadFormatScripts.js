var DOWNLOAD_FORMAT_STRING = "downloadFormat";
function getSelectedDownloadFormat(formatName){
	var formatControl = $("input[name="+formatName+"]:checked").val();
	if(formatControl == undefined) {
		formatControl = $("#downloadFormat").val();
	}
	return formatControl;
}

function constructDownloadURL(){
	constructDownloadURLjq(this.href)
	return false;
}


function constructDownloadURLjq(href){
	document.location.href = constructAndReturnDownloadURL(href);
	return false;
}

function constructAndReturnDownloadURL(href) {
    var hrefURL = href;
	var selectedDownloadFormat = getSelectedDownloadFormat("downloadFormat");
	if(selectedDownloadFormat == undefined){
		alert(SELECT_FORMAT_MSG);
		return;
	}
	if((selectedDownloadFormat != "HTML") && (selectedDownloadFormat != "PLAIN_TEXT")
	                                      && (selectedDownloadFormat != "PDF")){
		alert(NOT_IMPLEMENTED_MSG+" " +selectedDownloadFormat);
		return;
	}
	
	if($.trim(DOWNLOAD_FORMAT_STRING) == "") {
		var DOWNLOAD_FORMAT_STRING = "downloadFormat";
	}
	hrefURL = createParameter(hrefURL ,DOWNLOAD_FORMAT_STRING ,selectedDownloadFormat);
	return hrefURL
}

function closeWindow(){
 	window.close();
}


/*********************************  Download Format Page Event Binding *******************************************/

function downloadFormatBodyOnLoad(){
	window.focus();
}

function attachDownloadFormatPageEvents(){
    addLoadEvent(document.body , downloadFormatBodyOnLoad);
	attachEventForLink("downloadPage" , constructDownloadURL);
	attachEventForLink("closeWindow" , closeWindow);
}

addWindowLoadEvent(attachDownloadFormatPageEvents);