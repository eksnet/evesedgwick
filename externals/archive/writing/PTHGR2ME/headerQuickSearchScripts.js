$(document).ready(function() {
	var searchAssist = new SearchAssist("KE", $('#header_quick_search_term'));
	searchAssist.attachSearchAssist();
	searchAssist.handleEnterKeyInInputField();
	searchAssist.honorSearchAssistOnOff();
});

/***************************************** Quick Search Event Binding *****************************************/

function attachHeaderQuickSearchEvents() {
	validateQuickSearchNew("header_quick_search_term_submit");
	validateQuickSearchOnEnter("header_quick_search_term");
}

addWindowLoadEvent(attachHeaderQuickSearchEvents);
