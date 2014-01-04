
function showNext() {
	var obj = $('#dialog');
    var startPos = parseInt(document.dictionaryForm.startPos.value, 10);
    var pageSize = parseInt(document.dictionaryForm.pageSize.value, 10);
    document.dictionaryForm.currentPosition.value = startPos + pageSize;
    //document.dictionaryForm.queryTerm.value = DICTIONARY_QUERY_TERM;
	loadDictionaryResultDialog(obj);
}

function showPrevious() {
	var obj = $('#dialog');
    var startPos = parseInt(document.dictionaryForm.startPos.value, 10);
    var pageSize = parseInt(document.dictionaryForm.pageSize.value, 10);
    if(startPos < pageSize) {
            startPos = 0;
    } else {
        startPos = startPos - pageSize;
    }
    document.dictionaryForm.currentPosition.value = startPos;
    //document.dictionaryForm.queryTerm.value = DICTIONARY_QUERY_TERM;
	loadDictionaryResultDialog(obj);
}

function submitSearch() {
	var obj = $('#dialog');
	var titleText = obj.dialog("option", "title");
	obj.dialog("close");
	obj.dialog({title: titleText, height: 600, width: 800, position: 'auto', buttons: {}});
	loadDictionaryResultDialog(obj);
	obj.dialog("open");
	
}

function loadDictionaryResultDialog() {
	var obj = $('#dialog');
	obj.load(
			jQuery("#dictionaryForm").attr("action") + ' #jQueryDialogContainer',
			jQuery("#dictionaryForm").serialize(), 
				function(){
					attachDictionaryNavEvents(obj);
				}
			);
}

function validateSearchForm(event) {
    var validForm = true;
	var formObj = document.forms[0];
	var inputFieldValue = "queryTerm";
	var searchTermObj = formObj.elements[inputFieldValue];
	if(searchTermObj!=null && trim(searchTermObj.value)==""){
		alert(SEARCH_TERMS_EMPTY);
		searchTermObj.focus();
	    cancelEvent(event);
	    return false;
	}
    return validForm;
}

/***************************************** Dictionary Event Binding ******************************************/

function attachDictionarySearchEvents(){
	
	if(document.dictionaryForm){
		document.dictionaryForm.queryTerm.focus();	
		attachEventForLink("submitDictionarySearch" ,submitSearch);
		$('#dictionaryForm').submit(function() {
			submitSearch();
			  return false;
			});
	}
}

function attachDictionaryNavEvents(obj) {
	//alert("attachDictionaryNavEvents");
	attachEventForLink("goLink" , loadDictionaryResultDialog);
	attachEventForLink("showPrevious" ,showPrevious);
	attachEventForLink("showNext" ,showNext);
	$('#dictionaryForm').submit(function() {
		loadDictionaryResultDialog();
		  return false;
		});
}
