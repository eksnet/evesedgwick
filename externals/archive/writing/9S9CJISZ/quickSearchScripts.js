
/*************************************** Event Related Functions ************************************************/

function getQuickSearchFormObj(){
	return document.getElementById("dynamicSearchForm");
}

/*function attachCheckBoxEventForMLADocument(){
	if(document.getElementById("prodId") != null && document.getElementById("pageType") != null ) {
		var prodId = document.getElementById("prodId").value;
		var pageType = document.getElementById("pageType").value;
		if(prodId == "MLA" && pageType == "Document") {
			document.getElementById("stw-publication").className = "hide";
		}else {
			document.getElementById("stw-publication").className = "show";
		}
	}
}*/

function attachCheckBoxEvent(){
	var checkBoxElements = document.getElementsByTagName("input");
   	for(var i=0;i<checkBoxElements.length;i++){
		var chkBoxId = checkBoxElements[i].id;
	    if(chkBoxId.match("stw.option-")){
    		checkBoxElements[i].onclick = stwOptionChanged;
        	// checkBoxElements[i].onchange = stwOptionChanged;
		}
	}
}

function toggleCheckBoxes(boolCnt,boolSearchType,disable) {
  	for(var idx = 0; idx < boolCnt; idx++) {
		var checkBox = getElementById("stw.option-"+boolSearchType);
		checkBox.disabled = disable;
 	}
}

function toggleRadioButtons(boolSearchType,disable){
    var radioBtnElements = document.getElementsByTagName("input");
    for(var i=0;i<radioBtnElements.length;i++){
    	var radioBtnElement = radioBtnElements[i].id;
		if(radioBtnElement.match("stw."+boolSearchType+".option-")){
        	radioBtnElements[i].disabled  = disable;
      	}
	}
}

function isFuzzyAvailable(active,disable){
	var isfuzzy = getQuickSearchFormObj().isFuzzy.value;
    if(isfuzzy == "true"){
    	var fuzzyActive = getElementById("stw.fuzzy.active");
       	fuzzyActive.value = active;
       	var fuzzyDropDown = getElementById("stw.fuzzy");
       	fuzzyDropDown.disabled = disable;
	}
}

function stwOptionChanged() {
	var boolCnt = getQuickSearchFormObj().boolCnt.value;
	var boolSearchType = this.id.split("-")[1];
	for(var idx = 0; idx < boolCnt; idx++) {
    	var checkBox = getElementById("stw.option-"+boolSearchType);
        if ( checkBox.checked ) {
        	toggleCheckBoxes(boolCnt,boolSearchType,true);
	        checkBox.disabled = false;
    	    isFuzzyAvailable("active",false);
       		var subOptionsCnt = getQuickSearchFormObj().optionIndex.value;
		    for(var subIdx = 0; subIdx < subOptionsCnt; subIdx++) {
		    	toggleRadioButtons(boolSearchType,false);
		    }
        } else {
			toggleCheckBoxes(boolCnt,boolSearchType,false);
            isFuzzyAvailable("",true);
            var subOptionsCnt = getQuickSearchFormObj().optionIndex.value;
            for(var subIdx = 0; subIdx < subOptionsCnt; subIdx++) {
            	toggleRadioButtons(boolSearchType,true);
		    }
       	}
	}
}

function submitForQuickSearch(event){
	 var searchTerm = $('#quickSearchTerm').val();
    if(searchTerm == ""){
		alert(QUICK_SEARCH_EMPTY);
		getQuickSearchFormObj().quickSearchTerm.focus();
		cancelEvent(event);
		return false;
	}else if(!isValidWildCardSearch(searchTerm)){
        alert(WILDCARD_SEARCH_TERMS);
		getQuickSearchFormObj().quickSearchTerm.focus();
	    cancelEvent(event);
        return false;
    }
    /* EREF-13314 - JMx - Not real happy about this fix as its adding non-needed class 'loading' to NON-GTX products as well */
    if(jQuery('#go').length > 0) {
    	jQuery('#go').addClass('loading');
    }
	return true;
}

/***************************************** Quick Search Event Binding *****************************************/

function attachQuickSearchEvents() {
	attachCheckBoxEvent();
	addSubmitEvent(getQuickSearchFormObj(),submitForQuickSearch);
	//attachCheckBoxEventForMLADocument();
}

addWindowLoadEvent(attachQuickSearchEvents);
