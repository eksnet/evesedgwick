

function addSubmitRequest() {
    loadSearchLimiters("SU", "docRelSubjects");
    performTabLimitersSearch();
}

function loadSearchLimiters(browseIndex, targetDivId) {
	targetDivId = "#" + targetDivId;
	var browsePagination = 25;
	
    $(targetDivId).parent().find('h4').addClass('loading');
    
    var contextPath = $('#requestContextPath').text();
    var url = contextPath + "/documentRelatedSubjectsCount.do";
	var usrGrp = $('#hiddenDocCriteria input[name="userGroupName"]:first').attr('value');
	var productId = $('#hiddenDocCriteria input[name="prodId"]:first').attr('value');
	var searchType = $('#hiddenDocCriteria input[name="searchType"]:first').attr('value');
    var searchId = $('#hiddenDocCriteria input[name="searchId"]:first').attr('value');
    var tabID = $('#hiddenDocCriteria input[name="tabIDForDocDisplay"]:first').attr('value');
    var docId = $('#hiddenDocCriteria input[name="docId"]:first').attr('value');
    var relatedSubjects = $('#hiddenDocCriteria input[name="relatedSubjects"]:first').attr('value');
    var pubMcode = $('#hiddenDocCriteria input[name="pubMcode"]:first').attr('value');
    var params = {userGroupName: usrGrp,inPS: "true", buildLimiterValues: "true", prodId: productId, searchType: searchType, searchId: searchId, 
        	tabID: tabID, browsePagination: browsePagination, browseIndex: browseIndex, docId: docId, relatedSubjects: relatedSubjects, pubMcode: pubMcode};
    var infomarkSessionId = getURLParam('asid');
	if(!_(infomarkSessionId).isBlank()) {
		params.asid = infomarkSessionId;
	}
   // alert("usrGrp " +usrGrp +"  productId "+ productId + "  searchId  "+ searchId +"docId "+docId + " relatedSubjects " +relatedSubjects );

    $(targetDivId).load(url, params, function() {
   	 
    	$(this).parent().find('h4').removeClass('loading').end().parent().find('.moreResults').show();
    	
    	$items = $(this).find('li');
    	if ($items.size() == null || $items.size() == 0) {
    		$(this).parent().css("display", "none");
    	}

    });
    

}


function attachLimitExpandEvents() {
    addSubmitRequest();
}

addWindowLoadEvent(attachLimitExpandEvents);

function performTabLimitersSearch() {
    var elements = document.forms[1].elements;
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].id.match("dynamicLimiterField")) {
            elements[i].onclick = submitLimitExpandForm;
        }
    }
}