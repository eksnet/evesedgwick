function performNamedEntitySortBy() {
    var NAMED_ENTITY_SEARCH_SORT_LINK = document.forms[0].elements["baseSortLink"].value;
    var sortSelector = getElementById("namedEntity-SortBy");
    var sortOrder = sortSelector.options[sortSelector.selectedIndex].value
    var entity = document.forms[0].elements["entity"].value;
	var searchSortLink = NAMED_ENTITY_SEARCH_SORT_LINK + "&sortOrder=" + sortOrder + "&currentPosition=1" + "&entity=" + entity;
    window.location.href = searchSortLink;
}

function performSubjectGuideSearchSortBy() {
     var SUBJECT_GUIDE_BASE_URL =  getElementById("baseSortLink").value;
     var sortTypeValue = getSelectedValueForSelector("sortBy");
     var subjectParam = getElementById("subjectParam").value;
     var url = createParameter(SUBJECT_GUIDE_BASE_URL,"subjectParam", subjectParam);
     url = createParameter(url,"sortOrder",sortTypeValue);
     window.location.href = url;
}

function performEntitySearchOnFailOverTerms() {
    var failOverTerm = this.id;
    getElementById("inputFieldValue_0").value = failOverTerm;
    document.forms[0].submit();
    return false;
}

function validateSubjectGuideSearchResult(event) {
	var validForm = true;
	var formObj = document.forms[0];
	var inputFieldValue = "inputFieldValue(0)";
	var searchTermObj = formObj.elements[inputFieldValue];
	if(searchTermObj!=null && trim(searchTermObj.value)==""){
		alert("Please enter search term");
	    searchTermObj.focus();
	    cancelEvent(event);
	    return false;
	}
	return validForm;
}

function filterSubjectsByTermType() {
     var inputFieldName = getElementById("inputFieldName_0").value;
     var inputFieldValue = getElementById("inputFieldValue_0").value;
     var sortTypeValue = getSelectedValueForSelector("subjectGuide-termTypeSortSelector");
     var url = createParameter(SUBJECT_GUIDE_BASE_URL,"inputFieldName(0)",inputFieldName);
     url = createParameter(url,"inputFieldValue(0)",inputFieldValue);
     url = createParameter(url,"sortOrder",sortTypeValue);
     url = createParameter(url,"displaySubject",getElementById("displaySubject").value);
     if(termTypeValue != "All"){
		url = createParameter(url,"termType",termTypeValue);
     }
     window.location.href = url;
}

function filterSubjectsBySubdivisions() {
	if(isSubdivisionSortAvailable()){
	sortSubdivisionSubjects();
	}	
	showFilteredSubjects("li.subjectTerm-", "subjectGuide-subdivisionSelector");
}

function filterSubjectsByRelationship() {
	if(isRelationshipSortAvailable()) {
	sortRelatedSubjects();
	}	
	showFilteredSubjects("tr.subjectTerm-", "subjectGuide-relationshipSelector");
}

function showFilteredSubjects(classNamePrefix, selectorId){
	var selector = getElementById(selectorId);
    var selectedValue = getSelectedValueForSelector(selectorId);
    for(var i=0;i<selector.options.length;i++) {
		var className = "";
     	if(i != selector.options.selectedIndex && selectedValue != "All") {
     		className = " hide";
     	}
     	var elements = document.getElementsBySelector(classNamePrefix + selector.options[i].value);
     	for(var k=0; k<elements.length; k++){
     		if(elements[k].className.indexOf("hide") > -1) {
	     		elements[k].className = elements[k].className.replace(new RegExp("hide\\b"), className);
	     	}else{
	     		elements[k].className = elements[k].className +  className;
	     	}
		}
	}
}

//*******************************************SubjectGuide Sort Scripts*************************************************//
function sort(ulId, liClassName, fn) {
	var ulElement = getElementById(ulId);
	var liList = document.getElementsBySelector(liClassName);
	var originalArray = new Array();
	for(var i=0;i<liList.length;i++) {
		originalArray[i] = liList[i].cloneNode(true);
	}
	originalArray.sort(fn);
	for(var k=0; k<originalArray.length; k++) {
		ulElement.replaceChild(originalArray[k], liList[k]);
	}
}

function sortAll(ulId, liClassNames, fn) {
	var ulElement = getElementById(ulId);
	var originalArray = new Array();
	var liList = new Array();
	var originalArrayCount = 0;
	var liCount=0;
	var classNames = liClassNames.split(";");
	for(var n=0; n<classNames.length; n++){
		var lis = document.getElementsBySelector(classNames[n]);
		if(lis.length > 0) {
			liList[liCount] = lis;
			for(var i=0;i<liList[liCount].length;i++) {
				originalArray[originalArrayCount] = liList[liCount][i].cloneNode(true);
				originalArrayCount = originalArrayCount + 1;
			}
			liCount = liCount + 1;
		}
	}
	originalArray.sort(fn);
	var x=0;
	var y=0;
	var cnt=liList[x].length;

	for(var k=0; k<originalArray.length; k++) {
		if(cnt == k) {
			x=x+1;y=0;cnt = cnt + liList[x].length;
		}
		//alert("x="+x+" y="+y+" " + liList[x] + " X " + liList[x][y]);
		ulElement.removeChild(liList[x][y]);
		y=y+1;
	}
	for(var k=0; k<originalArray.length; k++) {
		ulElement.appendChild(originalArray[k]);
	}	
}

function sortByAplabeticalOrder(row1 ,row2) {
	var text1 = getInnerText(row1);
	var text2 = getInnerText(row2);
	if(text1 < text2) {
		return -1;
	} else {
		return 1;
	}
}

function sortByHitCount(row1 ,row2) {
	var hitCountElement1 = row1.getElementsByTagName("SPAN")[0];
	var hitCountElement2 = row2.getElementsByTagName("SPAN")[0];
	var hitCount1=0;
	var hitCount2=0;
	if(isValidObject(hitCountElement1)) {
		hitCount1 = parseInt(getInnerText(hitCountElement1));
		if (isNaN(hitCount1)) hitCount1 = 99999999;
	}
	 if(isValidObject(hitCountElement2)) {
		hitCount2 = parseInt(getInnerText(hitCountElement2));
		if (isNaN(hitCount2)) hitCount2 = 99999999;
	}
	if(hitCount1 == hitCount2) {
		return sortByAplabeticalOrder(row1, row2);
	}
	return hitCount2-hitCount1;
}

function getInnerText(element) {
	var innerText = "";
	var childNodes = element.childNodes;
	for (var i = 0; i < childNodes.length; i++) {
		if (1 == childNodes[i].nodeType && childNodes[i].nodeName !="IMG") { // ELEMENT NODE
			innerText += getInnerText(childNodes[i]);
			break;
		} else if (3 == childNodes[i].nodeType) { //TEXT_NODE
			innerText += childNodes[i].nodeValue;
			break;
		}
	}
	return innerText;
}

function sortSubjects(sortType, ulId, liClassName) {
    if(sortType == "Alphabetical"){
	    sort(ulId , liClassName, sortByAplabeticalOrder);
    }else{
		sort(ulId, liClassName, sortByHitCount);
    }
}

function sortAllSubjects(sortType, ulId, liClassNames) {
    if(sortType == "Alphabetical"){
	    sortAll(ulId , liClassNames, sortByAplabeticalOrder);
    }else{
		sortAll(ulId, liClassNames, sortByHitCount);
    }
}

/*function sortTermTypeSubjects() {
	var sortType = getSelectedValueForSelector("subjectGuide-termTypeSortSelector");
	var selectedTermType = getSelectedValueForSelector("subjectGuide-termTypeSelector");
	var liClassName = "";
	if("All" == selectedTermType) {
		var selector = getElementById("subjectGuide-termTypeSelector");
	     for(var i=0;i<selector.options.length;i++) {
	     	liClassName = liClassName + "li.subjectTerm-" + resolveTermTypeClassName(selector.options[i].value);
	     	if(i+1 != selector.options.length) liClassName = liClassName + ";";
		}
		sortAllSubjects(sortType, "subjectGuide-termList", liClassName);
	} else {
		sortSubjects(sortType, "subjectGuide-termList", "li.subjectTerm-" + selectedTermType);
	}
}*/

/*function resolveTermTypeClassName(termTypeGroup) {
   	if(termTypeGroup.indexOf(",") > -1)
     	return termTypeGroup.split(",")[0];
	if(termTypeGroup.indexOf(" ") > -1)
		return termTypeGroup.split(" ")[0];
	return termTypeGroup;
}*/

function getClassNames(selectorId) {
	var liClassNames = "";
	var selector = getElementById(selectorId);
	for(var i=0;i<selector.options.length;i++) {
		liClassNames = liClassNames + "li.subjectTerm-" + selector.options[i].value;
     	if(i+1 != selector.options.length) liClassNames = liClassNames + ";";
	}
	return liClassNames;
}

function sortSubdivisionSubjects() {
	var sortType = getSelectedValueForSelector("subjectGuide-subdivisionSortSelector");
	var selectedSubdivision = getSelectedValueForSelector("subjectGuide-subdivisionSelector");
	if(selectedSubdivision == "All") {
		sortAllSubjects(sortType, "subjectGuide-termList", getClassNames("subjectGuide-subdivisionSelector"));
	} else {
		sortSubjects(sortType, "subjectGuide-termList" , "li.subjectTerm-" + selectedSubdivision);
	}
}

function sortRelatedSubjects() {
	var sortType = getSelectedValueForSelector("subjectGuide-relationshipSortSelector");
	var selectedRelation = getSelectedValueForSelector("subjectGuide-relationshipSelector");
	if(selectedRelation == "All") {
		sortAllSubjects(sortType, "subjectGuide-termList", getClassNames("subjectGuide-relationshipSelector"));
	} else {
		sortSubjects(sortType, "subjectGuide-termList" , "li.subjectTerm-" + selectedRelation);
	}
}

function getSelectedValueForSelector(id) {
	var selector = getElementById(id);
	var selectedIndex = selector.options.selectedIndex;
    return selector.options[selectedIndex].value;
}

function isRelationshipSortAvailable() {
	return isValidObject(getElementById("subjectGuide-relationshipSortSelector"));
}

function isSubdivisionSortAvailable() {
	return isValidObject(getElementById("subjectGuide-subdivisionSortSelector"));
}

function isTermTypeSelectorAvailable() {
	return isValidObject(getElementById("sortBy"));
}


function attachOnClickEventForNavigation() {
	var navigators = document.getElementsBySelector("div.iterator");
	for(var i =0;i < navigators.length; i++){
		var navigationNodes = navigators[i].getElementsByTagName("A");
		for(var j =0; j < navigationNodes.length; j++){
			if(navigationNodes[j].className != "disabled"){
				navigationNodes[j].onclick = function() {
									var link = this.href;
									link = createParameter(link, "sortOrder",getSelectedValueForSelector("sortBy"));
									/*var termTypeValue = getSelectedValueForSelector("subjectGuide-termTypeSelector")
									if(termTypeValue != "All"){
										link  = createParameter(link,"termType",termTypeValue);
    								}*/
									window.location.href = link;
									return false;
								}
			}
		}
	}
}

//***************************************** SubjectGuideResult Event Binding ******************************************//
/*
function attachLimiter(){
	var formObj = document.forms[0];
    initializeDateLimiters(formObj);
}   */

function loadSubjectLinks(url,id) {
	// jquery to retrieve div
	// ajax call to load links
	
	var sdid = id;
	$('#'+sdid).load(url,function(){
		$('.subjectTerm-locations,.subjectTerm-dates').hide()
	});
	
	
}

function attachSubdivisions() {
	if($('.subdivisions').length > 0) {
		$('.subdivisions').click(function(e){
			e.preventDefault();
			loadSubjectLinks($(this).attr('href'),$(this).attr('rel'))
		})
	}
}

function attachSubjectGuideResultsEvents(){
    addSubmitEvent(document.forms[0], validateSubjectGuideSearchResult);
    addChangeEventForId("subjectGuide-subdivisionSelector", filterSubjectsBySubdivisions);
    addChangeEventForId("subjectGuide-termTypeSelector", filterSubjectsByTermType);
    addChangeEventForId("subjectGuide-relationshipSelector", filterSubjectsByRelationship);
    addChangeEventForId("subjectGuide-subdivisionSortSelector", sortSubdivisionSubjects);
    addChangeEventForId("subjectGuide-termTypeSortSelector", filterSubjectsByTermType);
    addChangeEventForId("subjectGuide-relationshipSortSelector", sortRelatedSubjects);
    addChangeEventForId("sortBy", performSubjectGuideSearchSortBy);
	addChangeEventForId("namedEntity-SortBy", performNamedEntitySortBy);
    if(isSubdivisionSortAvailable()) {
    	sortSubdivisionSubjects();
    }
    if(isRelationshipSortAvailable()) {
    	sortRelatedSubjects();
    }
    if(isTermTypeSelectorAvailable()) {
    	attachOnClickEventForNavigation();
	}
    attachPopupForSelector("a.suggestionTerm", performEntitySearchOnFailOverTerms);
  //  attachLimiter();
    attachSubdivisions();
}

addWindowLoadEvent(attachSubjectGuideResultsEvents);