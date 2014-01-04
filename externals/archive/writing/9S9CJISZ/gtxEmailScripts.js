/**
 * contentOption - radio button object.
 * optionMsgFlag - Flag that says whether the content option message has to be shown or not.
 */
function validateContentOptions(contentOption, optionMsgFlag) {
    if(contentOption.value=="FULL_TEXT" || contentOption.value=="ABSTRACT") { 
    	enableAttachment();
    }
  	if(contentOption.value=="PDF") {
		window.document.emailForm.attachment.checked=true;
    	validatePdfContentOptions();
	}
	if(contentOption.value=="CITATION") {
    	enableAttachment();
	}
	if(optionMsgFlag) {
  		//showSentOptionMsg();
	}
}

function validateForm(formObj, isMarkList) {

  //# var result = validateEmailForm(formObj);
   var result = validateRecipientEmail(formObj);
   result = result && validateEmailFormat(formObj);
   result = result && validateContentOption(formObj);
   if(result && isMarkList) {
       result = result && populateMarkedString();
        enableAttachment();//enable the attachment on submit.
   }
   return result;
}


function  validateRecipientEmail(formObj) {
  var strEmailList;
  var strEmailValues;
  strEmailList = trim(formObj.recipientEmailList.value);
  
  strEmailValues=strEmailList.split(";");  
  if(strEmailValues.length > 6) {
     alert(LIMIT_EXCEEDED);     
     return false;
  }

  var isAnyInvalidEmail = true;
  for(i=0;i<strEmailValues.length;i++) {
        if(trim(strEmailValues[i]).length == 0) {
          continue;
        }
        if(!checkEmail(trim(strEmailValues[i]))) {
           isAnyInvalidEmail = true;
           break;
        }  
        else {
           isAnyInvalidEmail = false; 
        }
   }  
   if(isAnyInvalidEmail) {
       alert(INVALID_EMAIL);
       formObj.recipientEmailList.focus();       
   }         
   return !(isAnyInvalidEmail);    
}

function disableBibliographicCitationFormat() {
    for(i=0;i<emailForm.citationFormats.length;i++) {
        window.document.emailForm.citationFormats[i].disabled=true
    }
}

function enableBibliographicCitationFormat() {
    for(i=0;i<emailForm.citationFormats.length;i++) {
        window.document.emailForm.citationFormats[i].disabled=false
    }
}

function validatePdfContentOptions() {
   // window.document.emailForm.emailFormats[2].disabled=true
   // enableBibliographicCitationFormat();
    disableAttachment();
}

function enablePTBTags() {
    window.document.emailForm.emailFormats[2].disabled=false
}
function disableAttachment() {
  window.document.emailForm.attachment.disabled=true;
}
function enableAttachment() {
  window.document.emailForm.attachment.disabled=false;
}


//this function iterate over all the check boxes whose names ends with _child
// and concat each check box values seperated by ^
function populateMarkedString() {
	var elements = document.emailForm.elements;
	var elementName;
	var endIndx;
    var markedString="";
    var found = false;
	for(var indx = 0; indx < elements.length; ++indx) {
		elementName = elements[indx].name;
		endIndx = elementName.indexOf("_child");
		if(elementName != null && endIndx > 0) {
			elementName = elementName.substring(0, endIndx);
			if(elements[indx].type == "checkbox") {
				if(elements[indx].checked) {
					markedString=markedString+elements[indx].value+"^";
					//var docType = elements[indx+1].value;
                    //markedString = markedString.replace(/~/g,docType);
                    found = true;
				}
			}
		}

	}
    if(found) {
        document.emailForm.markedItems.value = markedString;
    }
    else {
        alert(ONE_ITEM);
        return false;
    }
    
	return true;
}

function selectOrDeselectAll() {
	var obj = getElementById("sendAllEmailOption");
    if(obj.checked) {
        perform(obj , true);
    }
    else {
        perform(obj , false);
    }

}

////////////////////////////////////////////////////////////////////////////////
//
// This function checks or unchecks all checkboxes within a "Send All" grouping.
//
// Find all <span> elements with class "citation-send".  For the
// first child in each of type <input> with id NOT EQUAL "sendAllEmailOption",
// check to see if the partial name of the "Send All" checkbox matches the
// partial name of the "Send" checkbox.
//
// Partial name "Books"
// <span class="citation-send">
//     <input id="sendAllEmailOption" checked="checked" name="Books_T003_0" type="checkbox" />
//     <label for="send_all">Send All</label>
// </span>
//
// Partial name "Books"
// <span class="citation-send">
//     <input id="send_0" checked="checked" value="T003_0_GALE|3427300239___" class="sendEmailOption" name="Books_T003_0_child" type="checkbox" />
//    <label for="send_0">Send</label>
// </span>
//
////////////////////////////////////////////////////////////////////////////////
function updateEmailAllMarkList()	{
    var chkBoxId = this.name;
    var partialchkBoxId = chkBoxId.substring(0,chkBoxId.indexOf('_'));
    // Check for total number of Marked & capture the status of each marked Checkboxes.
	var emailAllDivs = document.getElementsBySelector("span.citation-send");
	for(var i=0;i<emailAllDivs.length;i++){
		var emailAll = emailAllDivs[i].getElementsByTagName("INPUT")[0];
        if ("sendAllEmailOption" != emailAll.id) {
            var partialId = emailAll.name.substring(0,emailAll.name.indexOf('_'));
            if (partialchkBoxId == partialId) {
                if (this.checked ==true) {  // If CheckAll is True, makes all of them as Checked.
                    emailAll.checked = true;
                } else {
                    emailAll.checked = false;
                }
            }
        }
    }
}

function perform(object,operation) {
    var elements = document.emailForm.elements;
    for(var indx = 0; indx < elements.length; ++indx) {
		elementName = elements[indx].name;
        var objName = object.name+"_child";
        if(elementName == objName)  {
            elements[indx].checked = operation;
        }
	}

}

function showSentOptionMsg() {
	var sent0 = new getObj('send8items');
	var sent1 = new getObj('sendlist');
	var sent2 = new getObj('sendPDF');
	
	if (document.emailForm.contentOptions[0].checked == true) {
		sent0.style.display = "inline";
		sent1.style.display = "none";
		sent2.style.display = "none";
	} else if (document.emailForm.contentOptions[1].checked == true) {
		sent0.style.display = "none";
		sent1.style.display = "inline";
		sent2.style.display = "none";
	} else if (document.emailForm.contentOptions[2].checked == true) {
		sent0.style.display = "none";
		sent1.style.display = "none";
		sent2.style.display = "inline";
	}
}

function submitEmailForm() {	
	if ($("#sendAllEmailOption").length) {
		if (!populateMarkedString()) {
			return false;
		}
		enableAttachment();
	}
	
	if ($("#sendEmail").valid()) {
		$dialog.load($('#sendEmail').attr("action") + ' #contentcontainer', $('#sendEmail').serialize(), function(){
			$dialog.dialog("option", "title", EMAIL_CONFIRMATION_MSG);
			var buttons = {};
			buttons[I18N_CLOSE]=function(){$(this).dialog('close')}
			$dialog.dialog("option", "buttons", buttons);
			$dialog.dialog("open");
		});
	}
	
   return false;
}

function submitEmailInfomarkForm() {
	if ($("#infomarkEmailForm").valid()) {
		//$dialog = $("#dialog");
		$dialog.load($('#infomarkEmailForm').attr("action") + ' #contentcontainer', $('#infomarkEmailForm').serialize(), function(){
			$dialog.dialog("option", "title", EMAIL_CONFIRMATION_MSG);
			var buttons = {};
			buttons[I18N_CLOSE]=function(){$(this).dialog('close')}
			$dialog.dialog("option", "buttons", buttons);
			$dialog.dialog("open");
		});
	}
	return false;	
}

function submitEmailMarklistForm() {
	var emailMarklistForm = document.forms[0];
	if(validateForm(emailMarklistForm, true)) {
		emailMarklistForm.submit();
	}
	return false;
}


function closeEmailWindow() {
	window.close();
}

function goBookmarkWindow() {
	history.go(-1);
}

function goBack() {
	if(navigator.appName == "Microsoft Internet Explorer") {
		history.go(-history.length);				
 	}else if(navigator.appName == "Opera") {
		history.go(-history.length);				
 	}else {
		history.go(-(history.length - 1));				
	}
}

////////////////////////////////////////////////////////////////////////////////
//
// This function updates the "Send All" checkbox for a grouping when a "Send"
// checkbox in the grouping is clicked.
//
// Find all <span> elements with class "citation-send".  For the
// first child in each of type <input> with id NOT EQUAL "sendAllEmailOption",
// check to see if the partial name of the "Send All" checkbox matches the
// partial name of the "Send" checkbox.  If one is false, "Send All" should
// be false.
//
// Partial name "Books"
// <span class="citation-send">
//     <input id="sendAllEmailOption" checked="checked" name="Books_T003_0" type="checkbox" />
//     <label for="send_all">Send All</label>
// </span>
//
// Partial name "Books"
// <span class="citation-send">
//     <input id="send_0" checked="checked" value="T003_0_GALE|3427300239___" class="sendEmailOption" name="Books_T003_0_child" type="checkbox" />
//    <label for="send_0">Send</label>
// </span>
//
////////////////////////////////////////////////////////////////////////////////
function updateEmailMarkList() {
	var isAllChecked  = true;
    var chkBoxId = this.name;
    var partialchkBoxId = chkBoxId.substring(0,chkBoxId.indexOf('_'));
    var emailAllDivs = document.getElementsBySelector("span.citation-send");
	for(var i=0;i<emailAllDivs.length;i++){
		var emailAll = emailAllDivs[i].getElementsByTagName("INPUT")[0];
        if ("sendAllEmailOption" != emailAll.id) {
            var partialId = emailAll.name.substring(0,emailAll.name.indexOf('_'));
            if (partialchkBoxId == partialId) {
                if (emailAll.checked == false){
                    isAllChecked  = false;
                    break;
                }
            }
        }
    }
	$("#sendAllEmailOption").attr('checked', isAllChecked);
}

////////////////////////////////////////////////////////////////////////////////
//
// This function attaches the updateEmailAllMarkList() method to the 'Send All'
// checkboxes or the updateEmailMarkList() method to the 'Send' checkboces
// via onclick.
//
// Find all <span> elements with class "citation-send".  For the
// first child in each of type <input> with id="sendAllEmailOption", add the
// the updateEmailAllMarkList() via onclick, otherwise add the
// updateEmailMarkList() via onclick.
//
// Attach updateEmailAllMarkList()
// <span class="citation-send">
//     <input id="sendAllEmailOption" checked="checked" name="Books_T003_0" type="checkbox" />
//     <label for="send_all">Send All</label>
// </span>
//
// Attach updateEmailMarkList()
// <span class="citation-send">
//     <input id="send_0" checked="checked" value="T003_0_GALE|3427300239___" class="sendEmailOption" name="Books_T003_0_child" type="checkbox" />
//    <label for="send_0">Send</label>
// </span>
//
////////////////////////////////////////////////////////////////////////////////
function attachEmailAllMarkListEvent(){
	var emailAllDivs = document.getElementsBySelector("span.citation-send");
	for(var i=0;i<emailAllDivs.length;i++){
		var emailAll = emailAllDivs[i].getElementsByTagName("INPUT")[0];
        if ("sendAllEmailOption" == emailAll.id) {
            emailAll.onclick = updateEmailAllMarkList;
        } else {
            emailAll.onclick = updateEmailMarkList;
        }
    }
}
function submitContentOption() {
	var contentOption = null;
	if (document.emailForm.contentOptions[0].checked == true) {
		contentOption = document.emailForm.contentOptions[0];
	} else if (document.emailForm.contentOptions[1].checked == true) {
		contentOption = document.emailForm.contentOptions[1];
	} else if (document.emailForm.contentOptions[2].checked == true) {
		contentOption = document.emailForm.contentOptions[2];		
	}
	if(contentOption != null)
	   validateContentOptions(contentOption, true);
}



function attachEmailScripts() {

	if(getElementById("sendAllEmailOption")) {
		attachEmailAllMarkListEvent();
	}
}

//addWindowLoadEvent(attachEmailScripts);