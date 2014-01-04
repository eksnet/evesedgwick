function getSelectedFormat(formatName) {
    var formatControl = document.forms[0].elements[formatName];
    for (i = 0; i < formatControl.length; i++) {
        if (formatControl[i].checked == true)
            return formatControl[i].value;
    }
}

function getPrintInfo() {
    var printAll = false;
    var recUrl = "";
    for (var k = 0; k < ENTRY_ARRAY.length; k++) {
        //recUrl = "";
        var marklistDivs = document.getElementsBySelector("div.marklistCollection-printselect");
        var totalRecord = marklistDivs.length;
        //var totalRecord = getCountOfMarkedPrintItem();
        for (var j = 0; j < totalRecord; j++) {
            if (!printAll) {
                if (getElementById(ENTRY_ARRAY[k] + "_" + j + "_REC")) {
                    if (!getElementById(ENTRY_ARRAY[k] + "_" + j + "_REC").checked) {
                        continue;
                    }
                } else {
                    continue;
                }
            }
            var isMultiPage = getElementById(ENTRY_ARRAY[k] + "_" + j + "_SP").value;
            var start = "0";
            var end = "0";
            if (isMultiPage == 1) {
                start = getElementById(ENTRY_ARRAY[k] + "_" + j + "_start").value;
                end = Math.ceil(getElementById(ENTRY_ARRAY[k] + "_" + j + "_end").value);
            }
            // no longer use document id, getElementById(tabArray[k]+"_"+j+"_docId").value, because
            // URLs got too long - jmarx
            recUrl += ENTRY_ARRAY[k] + "_" + (j + 1) + "_" + start + "_" + end + "^";
        }
    }
    return recUrl;
}

function updatePrintAllMarkList() {
    var chkBoxId = this.id;
    var partialchkBoxId = chkBoxId.substring(0, chkBoxId.indexOf('_'));
    // Check for total number of Marked & capture the status of each marked Checkboxes.
    var marklistDivs = document.getElementsBySelector("div.marklistCollection-printselect");
    for (var i = 0; i < marklistDivs.length; i++) {
        var element = marklistDivs[i].getElementsByTagName("INPUT")[0];
        var partialId = element.id.substring(0, element.id.indexOf('_'));
        if (partialchkBoxId == partialId) {
            if (this.checked == true) {  // If CheckAll is True, makes all of them as Checked.
                element.checked = true;
            } else {
                element.checked = false;
            }
        }
    }
	updateTotalEstimatedPages();
}

function updatePrintMarkList() {	
    var isAllChecked = true;
    var marklistDivs = document.getElementsBySelector("div.marklistCollection-printselect");
    var chkBoxId = this.id;
    var partialchkBoxId = chkBoxId.substring(0, chkBoxId.indexOf('_'));
    for (var i = 0; i < marklistDivs.length; i++) {
        var element = marklistDivs[i].getElementsByTagName("INPUT")[0];
        var partialId = element.id.substring(0, element.id.indexOf('_'));
        if (partialchkBoxId == partialId) {
            if (element.checked == false) {
                isAllChecked = false;
                break;
            }
        }
    }
    checkOrUncheckMarkAll(partialchkBoxId, isAllChecked);
	updateTotalEstimatedPages();
}

function checkOrUncheckMarkAll(partialchkBoxId, isChecked) {
    var printAllDivs = document.getElementsBySelector("div.marklistCollection-printall");
    for (var i = 0; i < printAllDivs.length; i++) {
        var printAll = printAllDivs[i].getElementsByTagName("INPUT")[0];
        var partialId = printAll.id.substring(0, printAll.id.indexOf('_'));
        if (partialchkBoxId == partialId) {
            printAll.checked = isChecked;
        }
    }
}


// Returns the current count of number of Items marked in the particular page.
function getCountOfMarkedPrintItem() {
    var element;
    var curCnt = 0;
    // Check for total number of Marked & capture the status of each marked Checkboxes.
    // If it exceeds the predefined count then it break.
    var marklistDivs = document.getElementsBySelector("div.marklistCollection-printselect");
    for (var i = 0; i < marklistDivs.length; i++) {
        var element = marklistDivs[i].getElementsByTagName("INPUT")[0];
        if (element.checked == true) {
            curCnt += 1;
        }
    }
    return curCnt;
}

/***************************************** PrepareMarkList Event Binding ******************************************/

////////////////////////////////////////////////////////////////////////////////
//
// This function attaches the updatePrintAllMarkList() method to the
// 'Print All' checkboxes via onclick.
//
// Find all <div> elements with class "marklistCollection-printall".  For the
// first child in each of type <input>, add the the updatePrintAllMarkList() via
// onclick.
//
// <div class="marklistCollection-printall">
//     <input checked="checked" id="T002_0_bucket" type="checkbox"/>
//     <label for="T002_0_bucket">Print All</label>
// </div>
//
////////////////////////////////////////////////////////////////////////////////
function attachPrintAllMarkListEvent() {
    var printAllDivs = document.getElementsBySelector("div.marklistCollection-printall");
    for (var i = 0; i < printAllDivs.length; i++) {
        var printAll = printAllDivs[i].getElementsByTagName("INPUT")[0];
        printAll.onclick = updatePrintAllMarkList;
    }
}


function attachPrintMarkListEvent() {
    var printDivs = document.getElementsBySelector("div.marklistCollection-printselect");
    for (var i = 0; i < printDivs.length; i++) {
        var printElement = printDivs[i].getElementsByTagName("INPUT")[0];		
        printElement.onclick = updatePrintMarkList;
    }
}

function updateTotalEstimatedPages(){
	var printDivs = document.getElementsBySelector("div.marklistCollection-printselect");
	var totalEstimatedPages = 0;
	var totalCitationPages = 0;
    for (var i = 0; i < printDivs.length; i++) {
        var printElements = printDivs[i].getElementsByTagName("INPUT");
		var checkboxElement = printDivs[i].getElementsByTagName("INPUT")[0];
		for(var j = 0; j < printElements.length; j++) {
			var printElement = printElements[j];			
			if(printElement.id.match("PG_COUNT") && checkboxElement.checked){
				totalEstimatedPages = totalEstimatedPages + parseInt(printElement.value);				
      		}
			if(printElement.id.match("CIT_COUNT") && checkboxElement.checked){
				totalCitationPages = totalCitationPages + parseInt(printElement.value);								
      		}							
		}		
    }
    //For Printing a Document we have Citation, Source Citation, Doc Number, Footer,etc which is not there in Doc response.
	//Hence adding 1
	if(totalEstimatedPages > 0){
		totalEstimatedPages = totalEstimatedPages + 1;
	}
	var totalEstFTSpan = getElementById("print-doc"); 
	$('#print-doc').text(totalEstimatedPages);

	//Assumption is we can print 10 citations per page
	var totalEstimatedCitationPages = 0;
	if(totalCitationPages > 0){
		if(totalCitationPages <=10){
			totalEstimatedCitationPages = 1; 
		}else{
			totalEstimatedCitationPages = Math.ceil(eval(totalCitationPages / 10));			
		}
	}
	var totalEstCitSpan = getElementById("print-cit"); 
	$('#print-cit').text(totalEstimatedCitationPages);
}

function attachPrepareMarkListEvents() {
	attachPrintMarkListEvent();
    attachPrintAllMarkListEvent();	
	openCitationExampleWindow($('a.citationExample'));
	updateTotalEstimatedPages();
}
