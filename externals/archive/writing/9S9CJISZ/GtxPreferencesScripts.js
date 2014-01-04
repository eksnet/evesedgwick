
function getPreferenceFormObj() {
	return document.getElementById('prefsForm');
}

function submitPreferences() {
	var preferenceURL = this.href;
	var type = getParamValueInURL(preferenceURL, "type");

	if(type == "ApplyPreferences") {
		if(selectedFlagRadio() == "On" ) {
			var highlightColorValue = getPreferenceFormObj().SearchTermHighLightColor.value;
			var highlightStyleValue = getPreferenceFormObj().SearchTermHighLightStyle.value;
		    preferenceURL = createParameter(preferenceURL, SEARCH_TERM_COLOR_PARAM, highlightColorValue);
		    preferenceURL = createParameter(preferenceURL, SEARCH_TERM_STYLE_PARAM, highlightStyleValue);
		}
	    preferenceURL = createParameter(preferenceURL, SEARCH_TERM_HILIGHT_PARAM, selectedFlagRadio());
		preferenceURL = createParameter(preferenceURL, 'resultsPerPage', getPreferenceFormObj().resultsPerPage.value);

        if (isValidObject(getPreferenceFormObj().limitToFulltext) && getPreferenceFormObj().limitToFulltext.checked) {
			preferenceURL = createParameter(preferenceURL,'limitToFulltext','On');
		} else {
			preferenceURL = createParameter(preferenceURL,'limitToFulltext','Off');
		}
		if (isValidObject(getPreferenceFormObj().limitToPeerReviewed) && getPreferenceFormObj().limitToPeerReviewed.checked) {
			preferenceURL = createParameter(preferenceURL,'limitToPeerReviewed','On');
		} else {
			preferenceURL = createParameter(preferenceURL,'limitToPeerReviewed','Off');
		}
		preferenceURL = createParameter(preferenceURL,'uiLanguage',getPreferenceFormObj().uiLanguage.value);		
	}
	this.href = preferenceURL; 
	if( type == "RestoreDefaults") 
		alert(PREFERENCES_RESTORED_MESSAGE); 
	else 
	   alert(PREFERENCES_APPLIED_MESSAGE);
	return true;
}

function buildPreferencesParameters() {
	var params = "";
	if(selectedFlagRadio() == "On" ) {
		var highlightColorValue = getPreferenceFormObj().SearchTermHighLightColor.value;
		var highlightStyleValue = getPreferenceFormObj().SearchTermHighLightStyle.value;
	    params = createParameter(params, SEARCH_TERM_COLOR_PARAM, highlightColorValue);
	    params = createParameter(params, SEARCH_TERM_STYLE_PARAM, highlightStyleValue);
	}
    params = createParameter(params, SEARCH_TERM_HILIGHT_PARAM, selectedFlagRadio());
	params = createParameter(params, 'resultsPerPage', getPreferenceFormObj().resultsPerPage.value);

    if (isValidObject(getPreferenceFormObj().limitToFulltext) && getPreferenceFormObj().limitToFulltext.checked) {
		params = createParameter(params,'limitToFulltext','On');
	} else {
		params = createParameter(params,'limitToFulltext','Off');
	}
	if (isValidObject(getPreferenceFormObj().limitToPeerReviewed) && getPreferenceFormObj().limitToPeerReviewed.checked) {
		params = createParameter(params,'limitToPeerReviewed','On');
	} else {
		params = createParameter(params,'limitToPeerReviewed','Off');
	}
	return params; 
}

function enableOrDisableSearchHilite() {
    if(selectedFlagRadio() == "On" ) {
	    getPreferenceFormObj().SearchTermHighLightStyle.disabled=false;
		getPreferenceFormObj().SearchTermHighLightColor.disabled = false;
	} else {
	    getPreferenceFormObj().SearchTermHighLightStyle.disabled=true;
		getPreferenceFormObj().SearchTermHighLightColor.disabled = true;
	}
}

function selectedFlagRadio(){
	return $("input[name=sthilite]:checked").val();
}

function closeWindow() {
 	window.close();
}

function changeOptionColor() {
	var initColor = $('#preferences-fontcolor select :selected').val();
	$('#preferences-fontcolor select').css({'color':initColor})
	
	$('#preferences-fontcolor select').live('change',function(e){
		var color = $(':selected',this).val()
		$(this).css({'color':color})
	})
}

/***************************************** Preferences Event Binding ******************************************/

function preferencesBodyOnLoad(){
	var type = getParamValueInURL(location.href, "type");		
	if("ShowPreferences" != type) {		
		var parentWindowLocation = window.opener.location.href;		
		if(!isParamInUrl(parentWindowLocation,"lang")){
			parentWindowLocation = parentWindowLocation + "&lang="+ getPreferenceFormObj().uiLanguage.value;
		}
		else{
			parentWindowLocation = replaceParamValueInURL(parentWindowLocation,"lang",getPreferenceFormObj().uiLanguage.value);
		}		
		window.opener.location.href="/ps/page/PreferenceStagingPage.jspx?target="+parentWindowLocation;		
	}
	enableOrDisableSearchHilite();
	window.focus();
}

function attachPreferencesEvents(){
	addClickEventForId("sthilite_on", enableOrDisableSearchHilite);
	addClickEventForId("sthilite_off", enableOrDisableSearchHilite);
	enableOrDisableSearchHilite();
	changeOptionColor();
}

