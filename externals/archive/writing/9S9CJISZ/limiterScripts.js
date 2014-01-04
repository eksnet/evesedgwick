var dateIndices = new Array();
var browseIndices = new Array();
var standAloneLimiters = new Array();
var FROM = "from";
var TO = "to";
var ALL_DATES = "0";
var BETWEEN = "4";
var OPERATOR_OR = "OR";

var rowNumberForPreviousSearches = 0;
var limiterFieldObject = "";


// Hides one limiter and shows another.
// Also sets global for the values to return to.
var toHide = '';
var toShow = '';
var returnPulldown;
var textToClear;


/*
 * TODO: The below three methods are tightly coupled limiterFieldControl,
 * fieldIndex are used across these methods.
 */
var browseWindow;
var limiterFieldControl;
var inputFieldControl;
var limiterChoosen = false;

function populateDateIndicesArray(formObj) {
    if (isValidObject(formObj)) {
        var dateIndexCollection = formObj.dateIndices;
        if (isValidObject(dateIndexCollection) && isValidObject(dateIndexCollection.length)) {
            for (var d = 0; d < dateIndexCollection.length; d++) {
                dateIndices[d] = dateIndexCollection[d].value;
            }
        } else if (isValidObject(dateIndexCollection)) {
            dateIndices[0] = dateIndexCollection.value;
        }
    }
}

function populateStandaloneLimitersArray(formObj) {
    if (isValidObject(formObj)) {
        var standaloneLimiterCollection = formObj.standAloneLimiters;
        if (isValidObject(standaloneLimiterCollection) && isValidObject(standaloneLimiterCollection.length)) {
            for (var d = 0; d < standaloneLimiterCollection.length; d++) {
                standAloneLimiters[d] = standaloneLimiterCollection[d].value;
            }
        } else if (isValidObject(standaloneLimiterCollection)) {
            standAloneLimiters[0] = standaloneLimiterCollection.value;
        }
    }
}


function initializeDateLimiters(formObj) {
    populateDateIndicesArray(formObj);

    var DL_PREFIX = "dateLimiterValue";
    // This is to disable or enable the date select box based on the option
	// selected, onload of the page.
    for (d = 0; d < dateIndices.length; d++) {
        var index = dateIndices[d];
        var dateMode = DL_PREFIX + "(" + index + ").dateMode";
        var dateModeObj = formObj.elements[dateMode];
        if (dateModeObj) {
            for (j = 0; j < dateModeObj.length; j++) {
                disableOrEnableDates(formObj, dateModeObj[j], index);
            }
        }
    }
}

function isValidDateInformation(formObj) {
    if (dateIndices.length > 0) {
        var index = dateIndices[0];
        var dropDownTest = formObj.elements[("dateLimiterValue(" + index + ")." + FROM + "Year")];
        
        /*
		 * EREF-650:Person search/Date of Death limiter: Date validation is not
		 * implemented for date of death
		 */
	    /*
		 * As dateLimiter.dateModesObj[0] refers the "All" option for Date of
		 * Birth , we need the "All" option for Date of Death. Temp fix hard
		 * coding the index "DOD"
		 */ 
        if (null != dropDownTest) {
        	var validFromDate = true;
            var validToDate = true;          
            
		    var allDateOfDeath = formObj.elements[("dateLimiterValue_DOD_dateMode_0")];
		    if(null != allDateOfDeath) {
		        if (!allDateOfDeath.checked) {
			        var dateOfDeathLimiter = new DateLimiter(formObj, "DOD");
			        validFromDate = isValidDate(dateOfDeathLimiter.fromDayVal, dateOfDeathLimiter.fromMonthVal, dateOfDeathLimiter.fromYearVal);
		            
		            if (!dateOfDeathLimiter.toDayObj.disabled) {
		                validToDate = isValidDate(dateOfDeathLimiter.toDayVal, dateOfDeathLimiter.toMonthVal, dateOfDeathLimiter.toYearVal);
		            }
		            return validFromDate && validToDate;
		        }
	        }
	        
            var dateLimiter = new DateLimiter(formObj, index);            
            if (!dateLimiter.dateModesObj[0].checked) {
                validFromDate = isValidDate(dateLimiter.fromDayVal, dateLimiter.fromMonthVal, dateLimiter.fromYearVal);
                
                if (!dateLimiter.toYearObj.disabled) {
                    validToDate = isValidDate(dateLimiter.toDayVal, dateLimiter.toMonthVal, dateLimiter.toYearVal);
                }
            }
            return validFromDate && validToDate;
        }
    }
    return true;
}

function isValidDate(day, month, year) {
    if (year == "") {
        return false;
    }
 
    if (month == null && day == null) {
	return true;
    }

    if (((month < 1) && (day > 0)) || (month > 12)) {
        return false;
    }
    if (day < 0 || day > 31) {
        return false;
    }
    if ((month == 4 || month == 6 || month == 9 || month == 11) &&
        (day == 31)) {
        return false;
    }
    if (month == 2) {
        var leap = (year % 4 == 0 &&
                    (year % 100 != 0 || year % 400 == 0));
        if (day > 29 || (day == 29 && !leap)) {
            return false;
        }
    }
    return true;
}

function validateDateRange(formObj, index) {
    if (dateIndices.length > 1) {
        if (isValidObject(index)) {
            var index = dateIndices[index];
        } else {
            var index = dateIndices[0];
        }
        var dateLimiter = new DateLimiter(formObj, index);
        var flag = 0;
        if (!dateLimiter.fromDayObj.disabled && !dateLimiter.toDayObj.disabled && !dateLimiter.dateModesObj[0].checked) {
            var fromDate = new Date(dateLimiter.fromYearVal, dateLimiter.fromMonthVal, dateLimiter.fromDayVal);
            var toDate = new Date(dateLimiter.toYearVal, dateLimiter.toMonthVal, dateLimiter.toDayVal);
            if (dateLimiter.fromEraVal == "0" && dateLimiter.toEraVal == "0") {
                if (fromDate < toDate) {
                    return false;
                }
            } else if (dateLimiter.fromEraVal == "1" && dateLimiter.toEraVal == "1") {
                if (fromDate > toDate) {
                    return false;
                }
            } else if (dateLimiter.fromEraVal == "0" && dateLimiter.toEraVal == "1") {
                return true;
            } else if (dateLimiter.fromEraVal == "1" && dateLimiter.toEraVal == "0") {
                return false;
            } else {
                if (fromDate > toDate) {
                    return false;
                }
            }
        }
    }
    return true;
}

function hideDateFields(index, direction) {
	var day = $("#dateLimiterValue_" + index + "_" + direction + "Day");
	var month = $("#dateLimiterValue_" + index + "_" + direction + "Month");
	var year = $("#dateLimiterValue_" + index + "_" + direction + "Year");
	var era = $("#dateLimiterValue_" + index + "_" + direction + "Era");

	day.hide();
	month.hide();
	year.hide();
	era.hide();
}

function showDateFields(index, direction) {
	var day = $("#dateLimiterValue_" + index + "_" + direction + "Day");
	var month = $("#dateLimiterValue_" + index + "_" + direction + "Month");
	var year = $("#dateLimiterValue_" + index + "_" + direction + "Year");
	var era = $("#dateLimiterValue_" + index + "_" + direction + "Era");

	day.show();
	month.show();
	year.show();
	era.show();
}

function disableOrEnableDates(formObj, option, index) {
	var andDate = $("#limiterField_" + index + "_date #anddate");

	if (option.checked) {
		if (option.value == ALL_DATES) {
		    // Disable the from and to dates
		    modifyDate(formObj, index, true, FROM);
		    modifyDate(formObj, index, true, TO);
		    disableCenturyLimiter(formObj, false);
		    andDate.hide();
		    hideDateFields(index, FROM);
		    hideDateFields(index, TO);
		} else if (option.value == BETWEEN) {
		    // Enable the from and to dates
		    modifyDate(formObj, index, false, FROM);
		    modifyDate(formObj, index, false, TO);
		    disableCenturyLimiter(formObj, true);
		    andDate.attr('class', 'dateselect-and dateConjunction');
		    andDate.show();
		    showDateFields(index, FROM);
		    showDateFields(index, TO);
		} else {
		    // Enable the from date and Disable the to date
		    modifyDate(formObj, index, false, FROM);
		    modifyDate(formObj, index, true, TO);
		    disableCenturyLimiter(formObj, true);
		    andDate.hide();
		    showDateFields(index, FROM);
    	    hideDateFields(index, TO);
		}
   	}
}

function modifyDateField(fieldObj, disableFlag) {
	if(isValidObject(fieldObj)) {
		// While disabling, reset all the values
		if(disableFlag) {
			fieldObj.selectedIndex = 0;
		}
		fieldObj.disabled = disableFlag;
	}
}

function modifyDate(formObj, index, disableFlag, type) {
    var day = "dateLimiterValue(" + index + ")." + type + "Day";
    var month = "dateLimiterValue(" + index + ")." + type + "Month";
    var year = "dateLimiterValue(" + index + ")." + type + "Year";
    
    modifyDateField(formObj.elements[day], disableFlag);
    modifyDateField(formObj.elements[month], disableFlag);
    modifyDateField(formObj.elements[year], disableFlag);

    if (index == "DOB" || index == "DOD") {
        var eraElement = "dateLimiterValue_" + index + "_" + type + "Era";
        var yearElement = "dateLimiterValue_" + index + "_" + type + "Year";

        modifyDateField(formObj.elements[eraElement], disableFlag);
        modifyDateField(formObj.elements[yearElement], disableFlag);
    }

}

function getDateObj(formObj, index, datePart) {
	return formObj.elements["dateLimiterValue(" + index + ")." + datePart];
}

function getDateVal(formObj) {
    if (isValidObject(formObj)) {
    	return formObj.value;
    }
    else {
    	return null;
    }
}

function DateLimiter(formObj, index) {

    this.fromDayObj = getDateObj(formObj, index, FROM + "Day");
    this.fromMonthObj = getDateObj(formObj, index, FROM + "Month");
    this.fromYearObj = getDateObj(formObj, index, FROM + "Year");
    this.fromEraObj = getDateObj(formObj, index, FROM + "Era");

    this.toDayObj = getDateObj(formObj, index, TO + "Day");
    this.toMonthObj = getDateObj(formObj, index, TO + "Month");
    this.toYearObj = getDateObj(formObj, index, TO + "Year");
    this.toEraObj = getDateObj(formObj, index, TO + "Era");

    this.fromDayVal = getDateVal(this.fromDayObj);
    this.fromMonthVal = getDateVal(this.fromMonthObj);
    this.fromYearVal = getDateVal(this.fromYearObj);
    this.fromEraVal = getDateVal(this.fromEraObj);

    this.toDayVal = getDateVal(this.toDayObj);
    this.toMonthVal = getDateVal(this.toMonthObj);
    this.toYearVal = getDateVal(this.toYearObj);
    this.toEraVal = getDateVal(this.toEraObj);

    this.DATE_INDEX = index;
    this.dateMode = "dateLimiterValue" + "(" + this.DATE_INDEX + ").dateMode";
    this.dateModesObj = formObj.elements[this.dateMode];
}

function initializeStandAloneLimiterArray(formObj) {
    populateStandaloneLimitersArray(formObj);
}

// Returns boolean indicating if any stand alone limiters have been selected
// Currently handling for types: checkbox, text, List
function standAloneLimitersSelected(formObj) {
    var limiterSelected = false;
    for (var i = 0; i < standAloneLimiters.length && !limiterSelected; i++) {
        var limiter = formObj.elements["limiterFieldValue(" + standAloneLimiters[i] + ")"];
        if (!isValidObject(limiter)) limiter = formObj.elements["limiterQuery(" + standAloneLimiters[i] + ")"];
        var limiterType = limiter != null ? limiter.type : "";
        var isDateStandalone = false;
        for (var l = 0; l < dateIndices.length; l++) {
            if(dateIndices[l] == standAloneLimiters[i]) {
                isDateStandalone = true;
                break;
            }
        }
        if (isDateStandalone){
        	for (var j = 0; j < dateIndices.length; j++) {
	            var index = dateIndices[j];
	            var dateMode = "dateLimiterValue(" + index + ").dateMode";
	            var dateModeObj = formObj.elements[dateMode];
	            if (dateModeObj) {
	                for (k = 1; k < dateModeObj.length; k++) {
	                    if ((dateModeObj[k].checked == true)) {
	                        limiterSelected = true;
	                    }
	                }
	            } else {
	                var singleFieldDate = "dateLimiterValue(" + index + ").singleFieldDate";
	                var singleFieldDateObj = formObj.elements[singleFieldDate];
	                if (singleFieldDateObj && standAloneLimiters[i] == dateIndices[j] && trim(singleFieldDateObj.value) != "") {
	                    // if no space is there in both sides of '-',then we are
						// adding spaces in each side of '-'
	                    var singleFieldDateObjValue = trim(singleFieldDateObj.value);
	                    if (singleFieldDateObjValue.indexOf("-") > 1) {
	                        var dateArr = singleFieldDateObjValue.split("-");
	                        singleFieldDateObjValue = trim(dateArr[0]) + " - " + trim(dateArr[1]);
	                    }
	                    singleFieldDateObj.value = singleFieldDateObjValue;
	                    limiterSelected = true;
	                }
	            }
        	}
        }
        if ((limiter != null) && limiter.type == null && standAloneLimitersArraySelected(limiter)) {
            limiterSelected = true;
        }// For processing limiters that have the same name
        // an array is returned.
        if ((limiterType == "checkbox") && (limiter.checked == true)) {
            limiterSelected = true;
        } else if ((limiterType == "text") && (trim(limiter.value) != "")) {
            limiterSelected = true;
        } else if ((limiterType == "select-one") && (limiter.selectedIndex > 0)) {
            limiterSelected = true;
        } else if (limiterType == "select-multiple" && limiter.selectedIndex > 0) {
            var selections = limiter.options;
            for (var idx = 0; idx < selections.length; idx++) {
                if (selections[idx].selected && selections[idx].value != '') {
                    limiterSelected = true;
                }
            }
        }
    }
    return limiterSelected;
}


function standAloneLimitersArraySelected(limiters) {
    var limiterSelected = false;
    for (var i = 0; i < limiters.length; i++) {
        var limiter = limiters[i];
        var limiterType = limiter != null ? limiter.type : "";
        if ((limiterType == "checkbox") && (limiter.checked == true)) {
            limiterSelected = true;
        } else if ((limiterType == "text") && (trim(limiter.value) != "")) {
            limiterSelected = true;
        } else if ((limiterType == "select-one") && (limiter.selectedIndex > 0)) {
            limiterSelected = true;
        } else if (limiterType == "select-multiple" && limiter.selectedIndex > -1) {
            var selections = limiter.options;
            for (var idx = 0; idx < selections.length; idx++) {
                if (selections[idx].selected && selections[idx].value != '') {
                    limiterSelected = true;
                }
            }
        }
    }
    return limiterSelected;
}

function doLimiterBrowse() {
    var href = this.href;
    var formObj = getDynamicSearchFormObj();
    var index = getParamValueInURL(href, "terms");
    var LIMITER_SUFFIX = "_dynamicLimiterField";
    var searchType = formObj.searchType.value;
    var fieldId = index + LIMITER_SUFFIX;
    var inputField = getElementById(fieldId);

    limiterFieldObject = inputField;
    limiterChoosen = true;
    limiterFieldControl = inputField;

    var preselectOnLoad = '';
    if ((inputField.value != null) && (inputField.value.length > 0)) {
      preselectOnLoad = '&preselectOnLoad=Y';
    }
    var browseIndexUrl = href + "&searchType=" + searchType + preselectOnLoad;
	var limiterCookieValue = getBucketValue(inputField.value, getCookie("formatedValue"));
    if ((limiterCookieValue != null) && (limiterCookieValue != "")) {
		setCookie("selectRslts_" + index, limiterCookieValue);
	} 
    openInChildWindow(browseIndexUrl, "galeChildWindow");
    return false;
}

function doMultiLimiterBrowse(formObj, inputField, index, hide, show, returnVal, clearVal) {
    toHide = hide;
    toShow = show;
    returnPulldown = returnVal;
    textToClear = clearVal;

    if (inputField.name == null) {
        inputField = inputField[0];
    }// Deal with case when there are two limiters.

    limitFormField = inputField.name;
    var productId = formObj.prodId.value;
    var usrGrp = formObj.userGroupName.value;
    var fn = inputField.value;
    // var qt = index.toLowerCase();
    var qt = index;
    fieldIndex = -1;
    var name = BROWSE_INDEX_SELECTIONS;
    browseWindow = window.open(BASIC_BROWSE_INDEX_URL + "&query=" + fn + "&terms=" + qt + "&rowIndex=" + qt + "&fieldName=" + name, "galeChildWindow", "toolbar=no, directories=no, status=yes, location=no, resizable=yes, menubar=no, scrollbars=yes,width=700,height=450");
}

function doBrowse() {
    var id = this.id;
    var temp = id.split("_");
    var inputRowNumber = temp[1];
    
    rowNumberForPreviousSearches = inputRowNumber;
    limiterChoosen = false;
    inputFieldControl = jQuery("#inputFieldValue_" + inputRowNumber)[0];
	var index = jQuery("#inputFieldName_" + inputRowNumber).val();
	var inputQueryTerms = jQuery("#inputFieldValue_" + inputRowNumber).val();
	var searchType = jQuery("input[name=searchType]").val();
	var suffix = inputRowNumber + index;
	var browseTerm = getBrowseTermFromCookie(suffix);
	var browseIndexUrl = this.href + "&query=" + browseTerm + "&searchType=" + searchType + "&rowIndex=" + suffix;
	var cookieValue = getBucketValue(inputQueryTerms, getCookie("formatedValue"));
	if ((cookieValue != null) && (cookieValue != "")) {
		setCookie("selectRslts_" + inputRowNumber + index, cookieValue);
	}
	openInChildWindow(browseIndexUrl, "galeChildWindow");
	return false;
}

function getBucketValue(inputQueryTerms, formatedValue) {
	while((inputQueryTerms != null) && (formatedValue != null) && (inputQueryTerms.length > 0) && (formatedValue.length > 0)){
		var cookieTerms = formatedValue.split("OR");
		var terms = "";
		var temp = "";
		
		for (var i=0; i<cookieTerms.length; i++) {
			temp = inputQueryTerms.split(cookieTerms[i]);
			if(temp != null) {
				terms += cookieTerms[i];
				if (i < cookieTerms.length-1) {
					terms += "OR"; 
				} 				
			}	
		}
		terms.indexOf('"') > -1 ? terms.substring(1,terms.length-1) : terms;		
		return terms;
	}
	return null;
} 

function doPreviousSearches() {
    var id = this.id;
    var temp = id.split("_");
    limiterChoosen = false;
    rowNumberForPreviousSearches = temp[1];
   // openInChildWindow(this.href + "&brwIdx=PS", "galeChildWindow");
    return false;
}

function setSearchString(value) {
    if (limiterChoosen && limiterFieldObject != "") {
        if(isValidObject(value)) {
			appendOR(limiterFieldObject, value);
		}
    } else {
    	var inputFieldObj = jQuery("#inputFieldValue_" + rowNumberForPreviousSearches)[0];
		appendOR(inputFieldObj, value);
    }
}

function setFieldValue(selectionValues) {
    if (limiterChoosen) {
        appendOR(limiterFieldControl, selectionValues);
    } else {
        appendOR(inputFieldControl, selectionValues);
    }
}

function clearLimiter() {
    limiterFieldControl.value = '';
}

function getLimiter() {
    return limiterFieldControl.value;
}

function appendOR(fieldObj, value) {
    if (value.length > 0) {
        if (fieldObj.value.length == 0) {
            fieldObj.value = value;
        } else {
            fieldObj.value = fieldObj.value + OPERATOR_OR + value;
        }
    }
}

function getBrowseTermFromCookie(suffix) {
    var cookieId = formCookieId("browseTerm", suffix);
    var browseTerm = getCookie(cookieId);
    if (browseTerm == null) {
        return "";
    }
    return browseTerm;
}

function formCookieId(name, suffix) {
    return name + "_" + suffix;
}

/*
 * This function is used for Date Validation when configured DisplayFormat as
 * 'SINGLE_FIELD' text box & not an option box
 */
function isValidDateOption(dateEntered) {
    var regEx = /^(\d{1,2})(\/)(\d{1,2})(\/)(\d{4})$/;
    var regEx2 = /^((\d{1,2})(\/)(\d{1,2})(\/)(\d{4}) \- (\d{1,2})(\/)(\d{1,2})(\/)(\d{4}))*$/;
    var regEx3 = /^(\d{4})$/;
    var regEx4 = /^((=|<|>) \d{1,2})(\/)(\d{1,2})(\/)(\d{4})$/;
    var regEx5 = /^((=|<|>) \d{4})$/;
    if (regEx.test(dateEntered)) {
        var month = dateEntered.split("/")[0];
        var day = dateEntered.split("/")[1];
        var year = dateEntered.split("/")[3];
        if (isValidDate(day, month, year)) {
            return true;
        }
    } else if (regEx2.test(dateEntered)) {
        return validateDateRangeForSingleField(dateEntered);
    } else if (regEx3.test(dateEntered)) {
        return true;
    } else if (regEx4.test(dateEntered)) {
        return true;
    } else if (regEx5.test(dateEntered)) {
        return true;
    }

    return false;
}


function validateDateRangeForSingleField(dateEntered) {
    var fromDate = dateEntered.split("-")[0];
    var toDate = dateEntered.split("-")[1];

    var fromMonth = fromDate.split("/")[0];
    var fromDay = fromDate.split("/")[1];
    var fromYear = fromDate.split("/")[2];
	if(isValidObject(toDate)){	
    var toMonth = toDate.split("/")[0];
    var toDay = toDate.split("/")[1];
    var toYear = toDate.split("/")[2];
    }

    var validFromDate = isValidDate(fromDay, fromMonth, fromYear);
    var validToDate = isValidDate(toDay, toMonth, toYear);

    if (validFromDate && validToDate) {
        var fromDateEntered = new Date(fromYear, fromMonth, fromDay);
        var toDateEntered = new Date(toYear, toMonth, toDay);
        if (fromDateEntered > toDateEntered) {
            return false;
        }
        return true;
    }
    return false;
}

/** ***********************Search Results Limit Expand**************** */

function validateLimiters(formObj, event) {
    if (!isValidDateInformation(formObj)) {
        alert(INVALID_DATE_MSG);
        cancelEvent(event);
        return false;
    }
    else if (!validateDateRange(formObj)) {
        alert(INVALID_DATE_RANGE);
        cancelEvent(event);
        return false;
    }
    return true;
}

function showMoreOptions() {
    getElementById("searchOptions").className = "hide";
    this.className = "hideSearchOptions hide";
    getElementById("searchForm-moreSearch").className = "moreSearchOptions";

    var btmFrmBtns = getElementById("formElementBtm");
    if (btmFrmBtns) {
        btmFrmBtns.className = "hide";
    }

}

function hideMoreOptions() {
    getElementById("searchOptions").className = "";
    this.className = "moreSearchOptions hide";
    getElementById("searchForm-hideSearch").className = "hideSearchOptions";

    var btmFrmBtns = getElementById("formElementBtm");
    if (btmFrmBtns) {
        btmFrmBtns.className = "";
    }
}

function attachFieldBrowseEvent() {
    var anchorlinks = document.links;
    var fieldBrowseIdPattern = "^browseField_.+_.+$";
    var fieldBrowseExp = new RegExp(fieldBrowseIdPattern);
    var prevIndexSuffix = "__";
    for (var i = 0; i < anchorlinks.length; i++) {
        var anchorId = anchorlinks[i].id;
        if (fieldBrowseExp.test(anchorId) && prevIndexSuffix == anchorId.substring(anchorId.length - prevIndexSuffix.length)) {
            anchorlinks[i].onclick = doPreviousSearches;
        } else if (fieldBrowseExp.test(anchorId)) {
            anchorlinks[i].onclick = doBrowse;
        }
    }
}

function attachLimiterBrowseEvent() {
    var anchorlinks = document.links;
    var limiterBrowseIdPattern = "^browseField_[a-zA-Z0-9]+$";
    var limiterBrowseExp = new RegExp(limiterBrowseIdPattern);
    for (var i = 0; i < anchorlinks.length; i++) {
        if (limiterBrowseExp.test(anchorlinks[i].id)) {
            anchorlinks[i].onclick = doLimiterBrowse;
        }
    }
}

function attachLimiterDefaultSelectorEvent() {
    if (isValidObject(document.forms[0])) {
        var limiterElements = document.forms[0].elements;
    }
    var selectMultiple = null;

    if (isValidObject(limiterElements)) {
        for (i = 0; i < limiterElements.length; i++) {
            var flag = true;
            selectMultiple = limiterElements[i];
            if (selectMultiple.type == "select-multiple") {
                for (j = 1; j < selectMultiple.length; j++) {
                    if (selectMultiple[j].selected) {
                        flag = false;
                    }
                }
                selectMultiple[0].selected = flag;
            }
        }
    }
}

function disableCenturyLimiter(formObj, disableFlag) {
	var centuryLimiter = getElementById("limit-publicationcentury");
	if ( isValidObject(centuryLimiter) ) {
		var centuryListLimiter = getElementById("PC_dynamicLimiterField");
		var queryId = getElementById("defaultFlag");
		if(isValidObject(queryId) && queryId.value == "true"){
		if(centuryListLimiter != null ){
		centuryListLimiter.selectedIndex = 0;
		}
		}
		if(centuryListLimiter != null ){
		centuryListLimiter.disabled = disableFlag;
		}
	}
}



function disablePublicationDateLimiter() {
	var pubDateLimiter = getElementById("limiterField_DA");
	var centuryLimiter = getElementById("PC_dynamicLimiterField");
	var dateLimiterField = getElementById("DA_dynamicLimiterField");
	if ( isValidObject(pubDateLimiter) && isValidObject(centuryLimiter) ) {
		if ( centuryLimiter.selectedIndex == 0 ) {
			if(isValidObject(dateLimiterField)) {
				dateLimiterField.disabled = false;
			}	
		} else {
			if(isValidObject(dateLimiterField)) {
				dateLimiterField.disabled = true;
			}
		}
		
	}
}

function attachLimiterScriptEvents() {

    var hideOption = getElementById("searchForm-hideSearch");
    if (isValidObject(hideOption)) {
        hideOption.onclick = showMoreOptions;
    }
    var showOption = getElementById("searchForm-moreSearch");
    if (isValidObject(showOption)) {
        showOption.onclick = hideMoreOptions;
    }
    addClickEventForId("limit-publicationcentury",disablePublicationDateLimiter);
    attachFieldBrowseEvent();
    attachLimiterBrowseEvent();
    attachLimiterDefaultSelectorEvent();
    // attachDateModeSelectEvents();
}

// /////////////////////////////////// OPENER SCRIPTS
// //////////////////////////////////////////////

function toggleHideShow() {
    getElementById(toHide).style.display = "none";
    getElementById(toShow).style.display = "";
    dynamicPulldown = getElementById(returnPulldown);
    clear = getElementById(textToClear);
    clear.value = '';
}

// For dynamic pulldown limiter GVRL style.
// Global variable for pulldown
var dynamicPulldown = null;
function setPulldownFieldValue(nameArray, valueArray) {
    toggleHideShow();

    nameArray = nameArray.substring(0, nameArray.lastIndexOf(' OR'));
    valueArray = valueArray.substring(0, valueArray.lastIndexOf(' OR'));

    var names = nameArray.split("OR");
    var value = valueArray.split(" OR ");

    dynamicPulldown.size = names.length;

    for (i = 0; i < names.length; i++) {
        var option = document.createElement("option");
        var name = names[i];
        if (name.length > 30) {
            name = name.substring(0, 30);
            name = name.substring(0, name.lastIndexOf(' '));
        }

        option.text = name;
        option.value = value[i];
        option.selected = true;
        dynamicPulldown.options.add(option);
    }
}

function showBool() {
    var display = document.getElementById("boolInfo").style.display;
    var bool = document.getElementById("moreBool");
    if (display != 'block')
    {
        document.getElementById("boolInfo").style.display = "block";
        bool.innerHTML = LESS_INFO
    }
    else
    {
        document.getElementById("boolInfo").style.display = 'none';
        bool.innerHTML = MORE_INFO
    }
}

function showBoolEvent() {
    var bool = document.getElementById("moreBool");
    if (bool != null) {
        bool.onclick = showBool;
        attachPopup("search-help", openGaleChildWindow);
    }
}

addWindowLoadEvent(attachLimiterScriptEvents);
addWindowLoadEvent(showBoolEvent);