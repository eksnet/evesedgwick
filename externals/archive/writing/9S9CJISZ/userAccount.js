$(document).ready(function(){		
	
		displayCorrectNamedUserDropDown();
		$('a#login_link').click(function(e){
			e.preventDefault();
			$(this).toggleClass('open');
			$('#signup_form').slideToggle('fast');
				
		})
		
		$('input#signin_password').keypress(function(event) {
			/* trigger on enter */
			if (event.keyCode == '13') {
				$('#signin_submit').trigger('click');
			}	  
		});
		

		/* Delete Saved Searches*/

		 $('a.delete').click(function (e){
			 e.preventDefault();
			 
				$.ajax({
					url: $(this).attr('href'),
					type: 'post',
					context: $(this),
					contentType: 'application/x-www-form-urlencoded',
					success: function(data, status, xhr) {
					    var jsonResponse = eval('(' + xhr.getResponseHeader("json-response") +")");		
						if(jsonResponse.status == "success"){	
							$('#namedUserSideBar').replaceWith(data);
							 $(this).parent().parent().remove();		
						} else {
							alert('Unable to delete');
							return false
						}
					},
					error: function(data) {
						alert('Error on deleting');
						return false;
					}
				});
			 	 
			 

		 });
		
		$('#signin_submit').click(function(e){
			$('span.loading').css({
				"display":"inline-block"
			});
			
			var url = jQuery('#named_user_url').val();
			var params = jQuery('#username').serialize();
			var prodId = jQuery('#prodId').serialize();
			var userGroupName = jQuery('#userGroupName').serialize();
			params  = params + "&" + jQuery('#signin_password').serialize();
			params  = params + "&" +  userGroupName;
			params  = params + "&" +  prodId;
			params  = params + "&" +  jQuery('#signInMethod').serialize();
			e.preventDefault();
			$.ajax({
				url: url,
				data: params,
				type: 'post',
				contentType: 'application/x-www-form-urlencoded',
				success: function(data, status, xhr) {
					var jsonResponse = eval('(' + xhr.getResponseHeader("xlogin-json") +")");
					if(jsonResponse == null){
						// redirect to session timeout page
						window.location = "/ps/pageDisplay.do?page=page/InvalidIntermediateRequestPage.jspx&"+prodId+"&"+userGroupName;
					}
					else if(jsonResponse.status == "success"){
						userLoginSuccess(jsonResponse);
						initSaveSearch();
					}else {
						userLoginFail(jsonResponse);
					}
				},
				error: function(data) {
					userLoginFail(null);
				}
			});
		})

		//tagging ui work	
		
		bindAddTag();
		bindEditSavedSearch();
		bindEditSearchAlert();
		/* close tag box */
		$('.ui-icon-closethick').live('click',function(evt) {
			evt.preventDefault();
			$('#add_tag_form').hide();
		});
		
		$('.close-edit-div').live('click',function(evt) {
			evt.preventDefault();
			$('#edit_save_search_form').hide();
		});
		
		$('.close-edit-div').live('click',function(evt) {
			evt.preventDefault();
			$('#edit_search_alert_form').hide();
		});
		
		/* remove tags */
		bindRemoveTag();
		
		//end  tags
		
		//start save search
		initSaveSearch();
		//end save search

		bindEventsForSignInLinks();
		bindEventsForDashLinks();
		bindRemoveMarkedItemEvents();
		bindRadioButtonClick();

});

var authRegExpression = /(namedUserRegistration\.do\?|namedUserForgotPassword\.do\?)/;
function checkIfAuthPage(path) {
	return ifMatch(path, authRegExpression);	
}

var sessionMarkListPageRegExpression=/(\/\marklist\.do\?)/;
function checkIfSessionMarkListPage(path) {
	return ifMatch(path, sessionMarkListPageRegExpression);
}

var oneSearchPageRegExpression = /(dispOneSearch\.do|oneSearch\.do)/;
function checkIfOneSearch(path) {
	return ifMatch(path, oneSearchPageRegExpression);
}

function bindRadioButtonClick() {
	
	$('input:radio[name=alertFrequency]').click(function (evt){		
		hideOrShowMail();	
	});	
}

function hideOrShowMail() {
	
	if($('input:radio[#alertFrequencyNoneRadio]:checked').val() == 1) {
		$('#email').hide();
	} else {
		$('#email').show();
	}
}

function bindRemoveMarkedItemEvents() {	
	if($("ul#marklistCollectionList li a[id^='removeMarkedItem-']").length > 0) {
		$("ul#marklistCollectionList li a[id^='removeMarkedItem-']").live('click', function(evt) {
			evt.preventDefault();
			$.ajax({
				url: $(this).attr("href"),
				type: 'post',
				context: $(this),
				contentType: 'application/x-www-form-urlencoded',
				success: function(data, status, xhr) {
					adjustNextPaginationLinks();
					$('#namedUserSideBar').replaceWith(data);
					$(this).parent().remove();
					
					var totalDocuments = $("ul#marklistCollectionList li a[id^='removeMarkedItem-']").length;
					$('span#marklistCollectionSize').html(totalDocuments);
				},
				error: function(data) {
					alert('Error on deleting marked item');
					return false;
				}
			});
		});
	}
	
	$('#removeAll-marklist').click(function (evt) {
		evt.preventDefault();
		var removeAllUrl = $(this).attr("href");
		var buttons = {};
		buttons[I18N_CANCEL] = function(){$(this).dialog('close')}
		buttons[I18N_YES] = function(){window.location.href=removeAllUrl;$(this).dialog('close');}
	   $("#remove_all_marked_items_dialog").dialog({
		   resizable:false,
		   closeOnEscape:true,
		   height: 'auto', 
		   width: '300px',
		   display:'block',
		   position: [evt.pageX, evt.pageY + 15],
		   buttons:buttons 
	   });
	   $("#remove_all_marked_items_dialog").dialog( "widget").attr("id", "remove_all_confirmation_dialog");
	   $("#remove_all_confirmation_dialog button:contains(Cancel)").attr("id", "remove_all_cancel");
	   $("#remove_all_confirmation_dialog button:contains(Yes)").attr("id", "remove_all_yes");
	   $("#remove_all_marked_items_dialog").dialog("open");
	});
}

function adjustNextPaginationLinks() {
	$("div.iterator ul li.next a").each(function(){
		var url = $(this).attr("href");
		var currentPosition = getParamValueInURL(url, "currentPosition");
		if(isValidObject(currentPosition) && isNumeric(currentPosition)) {
			$(this).attr("href", replaceParamValueInURL(url, "currentPosition", (parseInt(currentPosition, 10) - 1)));
		}
	});	
}

function bindEditSavedSearch() {
	$('a.edit').live('click', function(evt){
		evt.preventDefault();	
		$('#searchTitle').val("");
		
		// Make sure edit search alert div is hidden
		var editDiv = $('#edit_search_alert_form');
		editDiv.css({"display":"none"});
		
		editDiv = $('#edit_save_search_form');
		editDiv.css({
			"top": evt.pageY + 15,
			"left": evt.pageX - 300,
			"display":"block"
		});
		
		$('#searchQueryId').val($(this).attr('rel'));
		$('#editSaveSearchUrl').val($(this).attr('href'));		
	});	
}

function bindEditSearchAlert() {
	
	$('input#saveSearchAlert').live('click', function(evt){
		saveSearchAlert($(this));
	})
	
	
	$('a.manage').live('click', function(evt){
		evt.preventDefault();		
		
		// make sure edit search div is hidden
		var editDiv = $('#edit_save_search_form');
		editDiv.css({"display":"none"});
		
		editDiv = $('#edit_search_alert_form');
		editDiv.css({
			"top": evt.pageY + 15,
			"left": evt.pageX - 300,
			"display":"block"
		});
						
		var searchQueryId = $(this).attr('rel');
		var frequencyId = $('#alertFrequency_'+ searchQueryId).val();
		var alertTitle = $('#alertTitle_'+ searchQueryId).val();
				
		$('#searchAlertTitle').val(alertTitle);		
		$('#email').show();
		
		if($('#alertFrequencyDailyRadio').val() == frequencyId) {		
			$('#alertFrequencyDailyRadio').attr('checked', 'checked');
		} else if($('#alertFrequencyWeeklyRadio').val() == frequencyId) {		
			$('#alertFrequencyWeeklyRadio').attr('checked', 'checked');
		} else if($('#alertFrequencyMonthlyRadio').val() == frequencyId) {		
			$('#alertFrequencyMonthlyRadio').attr('checked', 'checked');
		} else {		
			$('#alertFrequencyNoneRadio').attr('checked', 'checked');
			$('#email').hide();
		}
				
		var alertFormatId = $('#alertFormat_'+ searchQueryId).val();
		
		if($('#emailTypeHtmlRadio').val() == alertFormatId) {		
			$('#emailTypeHtmlRadio').attr('checked', 'checked');
		}else  {		
			$('#emailTypeTextRadio').attr('checked', 'checked');
		}
			
				
		$('#searchQueryId').val(searchQueryId);		
		$('#saveSearchAlertUrl').val($(this).attr('href'));		
			
	});	
}

function bindAddTag() {
	$('a.add_tag').live('click', function(evt){
		evt.preventDefault();
		/* create form object */
		var form = $('#add_tag_form');
		$('#tagName').val("");
		attachSearchAssistTags('#tagName',form);
		/* add documet info to add form */
		$('#docInfoHidden').val($(this).attr('rel'));
		$('#addTagUrl').val($(this).attr('href'));
		/* display form */
		form.css({
			"top": evt.pageY + 15,
			"left": evt.pageX,
			"display":"block"
		});
		$('div.inlinemsg').hide();
		$('#tagName').focus();
	});
	
	$('input#submitTag').live('click', function(evt){
		submitTag($(this));
	})
	
	$('input#saveTitle').live('click', function(evt){
		saveTitle($(this));
	})
	
	$('input#saveTitle').keypress(function(event) {
		/* trigger on enter */
		if (event.keyCode == '13') {
			saveTitle($(this));
		}	  
	});	
	
	$('input#tagName').keypress(function(event) {
		/* trigger on enter */
		if (event.keyCode == '13') {
			submitTag($(this));
		}	  
	});		
}

function bindRemoveTag() {
	$('.tag_wrapper li a').live('click', function(evt){
		evt.preventDefault();
				
		var url = $(this).attr('href')			
		
		//need to add ajax logic to remove from DB
		$.ajax({
			url: url,
			type: 'post',
			context: $(this),
			contentType: 'application/x-www-form-urlencoded',
			success: function(data, status, xhr) {
			    var jsonResponse = eval('(' + xhr.getResponseHeader("json-response") +")");		
				if(jsonResponse.status == "success"){	
					$('#namedUserSideBar').replaceWith(data);
					$(this).parent().remove();					
				} else {
					alert('Unable to delete');
					return false
				}
			},
			error: function(data) {
				//obj.remove();
				alert('Error on deleting');
				return false;
			}
		});
	});
}


function isLoggedIn() {
	return eval(IS_NU_LG);
}

function bindEventsForDashboardLinks(){
	$("#dash_links li a").removeAttr("target")
}

function displayCorrectNamedUserDropDown() {
	if (isLoggedIn()) {
		$('li.user_account').hide();
		$('li.user_account.loggedin').show();

		$('#userLink').click(function(evt){
			evt.preventDefault(); 
			bindEventsForDashboardLinks();
			$('a#userLink').toggleClass('open');
			$('#dash_links').slideToggle();
		})
	} 
	else {
		$('li.user_account').show();
		$('li.user_account.loggedin').hide();
	}
}

function bindEventsForSignInLinks() {
	if($("#signin p a").length > 0) {
		$("#signin p a").each(function(){
			$(this).click(function(e) {
				e.preventDefault();
				window.location = $(this).attr('href');	
			});
		});
	}
	
	if($("#namedUserForgotPasswordForm").length > 0) {
		$("#namedUserForgotPasswordForm").validate();
	}
}


function bindEventsForDashLinks() {
	if($("#dash_links li#logout a").length > 0) {
		$("#dash_links li#logout a").click(function(e){
			e.preventDefault();
			$.get($(this).attr("href"),function(data, status, xhr) {
				var path = populateSessionParams(window.location.toString());
				if(path.indexOf("mg") < 0) {
					path = addParamToURL(path, "mg", true);
				}
				if(path.indexOf("nuSignout") < 0) {
					path = addParamToURL(path, "nuSignout", "true");
				}
				if(checkIfOneSearch(path) == true) {
					path = path.replace(oneSearchPageRegExpression,'start.do?');
				}
				window.location = path;
			});
		});
	}
}

function saveTitle(obj) {
	
	var editSaveSearchUrl = $('#editSaveSearchUrl').val()+"&searchTitle="+$('#searchTitle').val()+"&searchQueryId="+$('#searchQueryId').val();
	var searchQueryId = $('#searchQueryId').val();

	$.ajax({
		url: editSaveSearchUrl,
		type: 'post',
		context: obj,		
		contentType: 'application/x-www-form-urlencoded',
		success: function(data, status, xhr) {
		    var jsonResponse = eval('(' + xhr.getResponseHeader("json-response") +")");		
			if(jsonResponse.status == "success"){
				$('div.citationBlock[rel=' + searchQueryId +'] a.documentLink').text($('#searchTitle').val());
				$('#alertTitle_'+ searchQueryId).val($('#searchTitle').val());
				$('#edit_save_search_form').hide();
			} else {
				alert('Unable to update title');
			}
		},
		error: function(data) {
			alert('Error on update title');
		}
	});
}

function saveSearchAlert(obj) {
	var searchQueryId = $('#searchQueryId').val();	
	var title = $('#searchAlertTitle').val();
		
	var searchAlertUrl = createParameter($('#saveSearchAlertUrl').val(), "searchQueryId", searchQueryId);	
		searchAlertUrl = createParameter(searchAlertUrl, "alertTitle", encodeURIComponent(title));
		searchAlertUrl = createParameter(searchAlertUrl, "frequencyId", $('input:radio[name=alertFrequency]:checked').val());
		searchAlertUrl = createParameter(searchAlertUrl, "emailFormatId",$('input:radio[name=emailFormat]:checked').val());
		
	$.ajax({
		url: searchAlertUrl,
		type: 'post',
		context: obj,
		contentType: 'application/x-www-form-urlencoded',
		success: function(data, status, xhr) {
		    var jsonResponse = eval('(' + xhr.getResponseHeader("json-response") +")");		
			if(jsonResponse.status == "success"){
				$('#edit_search_alert_form').hide();
				$('div.citationBlock[rel=' + searchQueryId +'] a.documentLink').text(title);
				$('#alertFrequency_'+ searchQueryId).val($('input:radio[name=alertFrequency]:checked').val());		
				$('#alertFormat_'+ searchQueryId).val($('input:radio[name=emailFormat]:checked').val());
				$('#alertTitle_'+ searchQueryId).val(title);
				
				alert('Search Alert updated successfully.');
			} else {
				alert('Unable to update search alert');
			}
		},
		error: function(data) {
			alert('Error on updating search alert');
		}
	});
	
}

function submitTag(obj) {
	var tagName = trim($('#tagName').val());  
	if(tagName.length > 0) {
		if(tagName.length >50){
			alert('Tag name can not be more than 50 characters.');
		}else{
		var addTagUrl = createParameter($('#addTagUrl').val(), "tagName", tagName);
		var isSavedSearchRequest = isParamInUrl(addTagUrl, "searchQueryId");
		/*if(isSavedSearchRequest) {
			addTagUrl = replaceParamValueInURL(addTagUrl, "searchQueryId", $('#docInfoHidden').val());
		}*/
		
		$.ajax({
			url: addTagUrl,
			type: 'post',
			context: obj,
			contentType: 'application/x-www-form-urlencoded',
			success: function(data, status, xhr) {
			    var jsonResponse = eval('(' + xhr.getResponseHeader("json-response") +")");		
				if(jsonResponse.status == "success"){	
					$('#namedUserSideBar').replaceWith(data);	
					var id = $('#docInfoHidden').val();
					var row = $('div.citationBlock[rel=' + id +']');
					var tag = $('#tagName');
					var removeTagLink = replaceParamValueInURL($('#removeTagUrl').val(), "rTagId", jsonResponse.tagId);
					var idParamName = isSavedSearchRequest ? "searchQueryId" : "markedItemId"; 
					removeTagLink = replaceParamValueInURL(removeTagLink, idParamName, id);
					var li = "<li>"+ tag.val() +"<a href='" + removeTagLink +"' title='remove "+ tag.val() +" tag'>Remove "+ tag.val() +" Tag</a></li>";
					$('div.tag_holder ul',row).append(li);
					tag.val("");
					$('div.inlinemsg').hide();
				} else if(jsonResponse.status == "failed"){
					$('div.inlinemsg').show();
				} else {
					alert('Unable to Add tag');
				}
			},
			error: function(data) {
				alert('Error on Adding Tag');
			}
		});
		}
	}
}

function attachSearchAssistTags(id,form) {
	/* get a list of tags for the current user */
	var current_tags = $('#tag_data option');
	var data = [];
	current_tags.each(function(index){
		
			data[index] = $(this).text();
			//alert($(this).text());
	});
	/*remove No Tags from array */
	//data.splice(0,1);
	
	 /* add auto complete */
	form.find(id).autocomplete({
		source: data,
		select: function( event, ui ) {
			//console.log(ui.item.value)
		}
	});
}


function initSaveSearch() {
		$('#docTools-save a').live('click', function(evt){
			evt.preventDefault();
			if(isLoggedIn()) {
				loadSavedSearchForm($(this).attr('href'),$(this).text());
			} else {
				loadSavedSearchNotice(SAVE_SEARCH_SS,$(this).text());
			}
		});
}

function loadSavedSearchForm(url,title) {
	var $dialog = jQuery('#dialog');
	
	$dialog.load(url+ ' #contentcontainer', [], function(){
		   var buttons = {};
		   buttons[I18N_CLOSE]=function(){$(this).dialog('close')}
		   buttons[NU_SAVED_SEARCH]=function(){
			   alertname_length = $("#savedSearchName").val().length;
				if($('#saveSearchesForm').length > 0 && alertname_length > 0) {
					 
					 if (alertname_length > 50)  {
						   alert(NU_SAVED_SEARCH_NAME_SIZE_ERR_MSG);
					   } else {
							$.post($('#saveSearchesForm').attr("action"), $('#saveSearchesForm').serialize());
							alert(NU_SAVED_SEARCH_MSG);
							$dialog.dialog("close");
					   }
				} else {
					alert(NU_SAVED_SEARCH_NAME_MISSING_ERR_MSG);
				}
		   }
		   $dialog.dialog({
			   title: title, 
			   height: 'auto', 
			   width: 800, 
			   position: 'auto',
			   buttons:buttons 
		   });
		   $dialog.dialog("open");
		   $("#saveAlert").click(function() {
				var style = $(this).is(':checked') ? "" : "display:none";
				$("#salertdiv").attr('style', style);
			});
		   
		   $('input#savedSearchName').keypress(function(event) {
				if (event.keyCode == '13') {
					event.preventDefault();
					$dialog.dialog("option", "buttons")[NU_SAVED_SEARCH].apply();
				}	  
			});		   
	   });
	}

function loadSavedSearchNotice(str,title) {
	$('#dialog').empty();
	$('<p>'+ str +'</p>').appendTo('#dialog');
	$('#dialog').dialog({
		modal: true,
		title: title,
		width: '400px',
		buttons: {
			Register: function () {/*must put stuff in here to save search or add method*/},
			Login: function(){},
			Close: function(){$('#dialog').dialog('close');}
		}
	});
	$('#dialog').dialog('open');
}


function ifMatch(data, expression){
	var str = data.match(expression);
	if(str != null)
		return true;
	else
		return false;
}


function userLoginSuccess(data) {
	
	$('a#login_link').toggleClass('open');
	$('#signup_form').slideUp('fast');
	$('#loggedinuserid').html(data.username);
	
	displayCorrectNamedUserDropDown();
	
	/*reload page to make sure session is up to date*/
	
	var path = populateSessionParams(window.location.href);

	if(checkIfAuthPage(path) == true) {
		window.location = path.replace(authRegExpression,'start.do?');
	} else if(checkIfOneSearch(path) == true) {
		window.location = path.replace(oneSearchPageRegExpression,'start.do?');
	} else if(checkIfSessionMarkListPage(path) == true) {
		var namedUserMarkListPagePath = path.replace(sessionMarkListPageRegExpression,'/namedUserMarkList.do?method=retrieveSavedDocuments&');
		window.location = namedUserMarkListPagePath;
	} else {
		if(!isParamInUrl(path, "mg")) {
			path = addParamToURL(path, "mg", true);
		}
		window.location.href = path;
	}
}

function populateSessionParams(url) {
	if(url.indexOf("prodId") < 0 && url.indexOf("p=") < 0) {
		url = addParamToURL(url, "prodId", PRODUCT_ID);
	}
	if(url.indexOf("userGroupName") < 0 && url.indexOf("u=") < 0) {
		url = addParamToURL(url, "userGroupName", USER_GROUP_NAME);
	}
	return url;
}

function userLoginFail(data){
	$("#error_msg p span.msg").empty();
	$('span.loading').hide();
	$("#error_msg p span.msg").append("Invalid Username or Password");
	$("#error_msg").show();
	
	$('#signin input[type=text],#signin input[type=password]').focus(function(){
		$('#error_msg').hide();
		$("#error_msg p span.msg").empty();
	})
}