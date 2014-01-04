(function($, _parent) {
	
	
	var init = function(){	
		if(!_parent.citationToolsTracking.initComplete){
			registerCitationToolButtonTracking();
			$(document).bind('citationtools.dialogopen', registerCitationToolInternalTracking);
			_parent.citationToolsTracking.initComplete = true;
		}		
	};
	
	var trackClick = function(event) {		
		pageTracker._trackEvent('Citation Tools', event);
	};
	
	var registerCitationToolButtonTracking = function(){
		$('.citationToolsButton').click(function(){internal.trackClick('citationtools.click');});
	};
	
	var registerCitationToolInternalTracking = function(){		
		$('.citationToolsClickToSelect').click(function(){internal.trackClick('citationtools.select.click');});
		$('.citationToolsDownload').click(function(){internal.trackClick('citationtools.download.click');});
		$('#easyBibSubmitButton').click(function(){internal.trackClick('citationtools.easybib.click');});
		$('#endNoteSubmitButton').click(function(){internal.trackClick('citationtools.endnote.click');});
		$('#proCiteSubmitButton').click(function(){internal.trackClick('citationtools.procite.click');});
		$('#referenceManageSubmitButton').click(function(){internal.trackClick('citationtools.referencemanager.click');});
		$("#refWorksSubmitButton").click(function(){internal.trackClick('citationtools.refworks.click');});
		$(document).unbind('citationtools.dialogopen');
	};
	
	var internal = {
			trackClick : trackClick,
			registerCitationToolButtonTracking : registerCitationToolButtonTracking,
			registerCitationToolInternalTracking : registerCitationToolInternalTracking 
		};

	_.extend(_parent.namespace('citationToolsTracking'), {
			internal : internal,
			init : init	
		});	
	
	_parent.citationToolsTracking.initComplete = false;
	
}(jQuery, GALE));

	