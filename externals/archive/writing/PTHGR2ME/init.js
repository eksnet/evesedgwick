function getIndexToPromptMap() {
	var indexToPromptMap = new Object;

	indexToPromptMap[SEARCH_KEYWORD_INDEX] = SEARCH_KEYWORD_PROMPT;
	indexToPromptMap[SEARCH_KEYWORD_STEMMING_INDEX] = SEARCH_KEYWORD_PROMPT;
	indexToPromptMap[SEARCH_SUBJECT_INDEX] = SEARCH_KEYWORD_PROMPT;
	indexToPromptMap[SEARCH_PUBLICATION_INDEX] = SEARCH_PUBLICATION_PROMPT;
	indexToPromptMap[SEARCH_FULLTEXT_INDEX] = SEARCH_KEYWORD_PROMPT;
	indexToPromptMap[SEARCH_QUICKSEARCH_INDEX] = SEARCH_QUICKSEARCH_PROMPT;
	indexToPromptMap[SEARCH_PERSON_INDEX] = SEARCH_PERSON_PROMPT;

	return indexToPromptMap;
}

$(document)
		.ready(
				function() {
					if (OMNI.MarkList) {
						OMNI.MarkList.init();
					}

					if (OMNI.Anime) {
						OMNI.Anime.init();
					}

					appendRequiredParamsToRemoveLimitersLink();

					$('.citation-sfxServices, .citation-libraryHoldings, .citation-libraryLoan').live('click', function(e) {
						openInChildWindow($(this).attr('href'), 'Citation');
						return false;
					});

					var addthis_config = {
						ui_language : CURRENT_LANGUAGE
					}

					jQuery.extend(jQuery.validator.messages, {
						required : VALIDATE_REQUIRED,
						email : VALID_EMAIL_ADDRESS
					});

					if (typeof (defaultValue) == "undefined") {
						defaultValue = "";
					}

					if ($('#dialog').length < 1) {
						var div = $('<div />').attr({
							"id" : "dialog"
						});
						$('body').append(div);
					}

					function preload(arrayOfImages) {
						$(arrayOfImages).each(function() {
							$('<img/>')[0].src = this;
						});
					}

					preload([ '../ps/images/icons/white_loader.gif' ]);

					if ($('a.pubPop').length > 0) {
						$('a.pubPop').pubhover();
					}

					$('form#dynamicSearchForm input[type="submit"]').not('#go').click(function(e) {
						e.preventDefault();
						$('form#dynamicSearchForm input[type="submit"]').addClass('loading');
						$('form#dynamicSearchForm').submit();
					});

					if ($('#homePage,#subjectSearch,#PublicationSearchPage,#oneSearch').length > 0) {
						$(window).unload(function() {
							return true;
						});
					}

					var readSpeaker = $("#ReadSpeakerWrapper");
					if (readSpeaker.length > 0) {
						readSpeaker.detach();
						$("#docSummary").after(readSpeaker);
						readSpeaker.show();
					}
					;

					if ($('#quickSearchTerm,#header_quick_search_term').length > 0) {
						$('.searchBox input').focus(function() {
							var promptMap = getIndexToPromptMap();

							defaultValue = "";
							if (this.value == promptMap[$('.searchBox input').attr('rel')]) {
								defaultValue = promptMap[$('.searchBox input').attr('rel')];
								this.value = "";
							}
						}).blur(function() {
							if (!this.value.length) {
								this.value = defaultValue;
							}
						});
					}

					$("#header_quick_search_term_submit").click(function(e) {
						if ($("#header_quick_search_term").val() == "Search within results...") {
							e.preventDefault();
							alert(SEARCH_TERMS_EMPTY);
						}
						;
					});

					if ($('#loc_brandinging_link ul li').length > 0) {
						$('#loc_brandinging_link > a').addClass('down');

						$('#loc_brandinging_link').hoverIntent(function() {
							$(this).addClass('hover');
							$(this).find('ul').slideDown();

						}, function() {
							$(this).removeClass('hover');
							$(this).find('ul').slideUp();
						});
					}

					if ($('#tools_menu ul li').length > 0) {

						$('#tools_menu > a').addClass('down');

						$('#tools_menu').hoverIntent(function() {
							$(this).addClass('hover');
							$(this).find('ul').slideDown();
						}, function() {
							$(this).removeClass('hover');
							$(this).find('ul').slideUp();
						});
					}

					if ($('#ui_language ul li').length > 0) {
						preload([ '../ps/images/flags/flag_sprite.png' ]);

						$('#ui_language > a').addClass('down');

						$('#ui_language').hoverIntent(function() {
							$(this).addClass('hover');
							$(this).find('ul').slideDown();
						}, function() {
							$(this).removeClass('hover');
							$(this).find('ul').slideUp();
						});
					}

					$('#homePage #docTools-bookmark a').click(function(e) {
						bookmarkPopup($(this), e);
					});

					$('#subjectSearch #docTools-bookmark a').click(function(e) {
						bookmarkPopup($(this), e);
					});

					$('#PublicationSearchPage #docTools-bookmark a').click(function(e) {
						bookmarkPopup($(this), e);
					});

					$('#advSearch #docTools-bookmark a').click(function(e) {
						bookmarkPopup($(this), e);
					});

					if ($('#homePage').length > 0 || $('#oneSearch').length > 0 || $('#subjectSearch').length > 0
							|| $('#PublicationSearchPage').length > 0) {

						$('input#inputFieldValue_0').focus(function() {
							var promptMap = getIndexToPromptMap();

							if (this.value == promptMap[$('.search_tabs li.selected').attr('rel')]) {
								defaultValue = promptMap[$('.search_tabs li.selected').attr('rel')];
								this.value = "";
							}
							$(this).addClass('activated');
						}).blur(function() {
							if (!this.value.length) {
								this.value = defaultValue;
							}
							$(this).removeClass('activated');
						});
					}

					if ($('#my_folder').length > 0) {
						if ($('span.citation-snippet').length > 0) {
							var elip = "...";
							var snip = $('span.citation-snippet');
							snip.append(elip);
						}

						jQuery("body").append("<ul id='fixed_messages'></ul>");
						offset = $('#my_folder').offset();
						$('#fixed_messages').css({
							'top' : offset.top,
							'left' : offset.left
						});
						/*
						 * var url = $('#get_small_list_link').attr('href');
						 * $('#mark_cont').load(url, [], function() { var total =
						 * getTotalMarkedCount(); if(total < 1) {
						 * $('#my_folder_total_marked_items').text('')
						 * $('#mark_link').hide(); } else { displayTotalMarkedCount(total)
						 * if($('#mark_cont').length > 0) { $('.noItems').hide();
						 * $('#my_folder').show(); } } });
						 */
					}

					if ($("#titleBar-moreDatabases").length > 0) {
						$("#titleBar-moreDatabases").click(function(e) {
							e.preventDefault();
							var internalURL = $(this).attr('href');
							window.location = internalURL;
						});
					}

					if ($('#documentView,#atp,#marklist,#searchResults,#mediaGallery').length > 0) {

						$('#docTools-print a').click(
								function(e) {
									var title_text = $(this).text();
									e.preventDefault();
									var containerBase = "";
									if ($('#documentView').length > 0) {
										containerBase = ' #documentBody';
										window.print();
										$.get($(this).attr('href'));
										return false;
									}
									if ($('#atp').length > 0) {
										containerBase = ' #atp-docinfo';
										window.print();
										return false;
									}
									if ($('#MarklistPage').length > 0) {
										containerBase = ' #marklist';
									}
									if ($('.etocPrintablePage').length > 0) {
										containerBase = ' #bodyContainer';
										window.print();
										return false;
									}
									if ($('.bobPrintablePage').length > 0) {
										containerBase = ' #bodyContainer';
										window.print();
										return false;
									}
									if ($('.loiPrintablePage').length > 0) {
										containerBase = ' #loiContainer'
										window.print();
										return false;
										;
									}

									var $dialog = $('#dialog');

									$dialog.load($(this).attr('href') + containerBase + ", #container", [], function() {
										var buttons = {};

										buttons[I18N_CLOSE] = function() {
											$dialog.dialog('close'); /* $('#documentDisplay').css({'zoom':'100%'}) */
										};

										buttons[I18N_PRINT] = function(e) {
											if ($("#MarklistPage").length > 0) {
												if (($('.marklistCollection-printall input[type=checkbox]:checked').length > 0)
														|| ($('.marklistCollection-printselect input[type=checkbox]:checked').length > 0)) {

													var printURL = $("#printMarkList").attr('href');
													printURL = createParameter(printURL, "citationFormat", getMarkListCitationFormat());
													printURL = createParameter(printURL, "docLevel", getMarkListPrintOption());
													printURL = createParameter(printURL, "printInfo", getPrintInfo());
													var containerBase = ' #printMarklist';
													$dialog.dialog('close')

													$dialog.load(printURL + containerBase, [], function(data) {
														var buttons1 = {};
														buttons1[I18N_CLOSE] = function() {
															$dialog.dialog('close')
														}
														buttons1[I18N_PRINT] = function(e) {
															$dialog.jqprint()
														}
														$dialog.dialog({
															title : title_text,
															height : 550,
															width : 800,
															position : 'auto',
															modal : true,
															buttons : buttons1
														});
													})

													$dialog.dialog("open");
													attachPrepareMarkListEvents();
													return true
												} else {
													alert('Please select an item to print');
													return false;
												}
											}

											window.print();
										}

										$dialog.dialog({
											close : function() {
												$('#documentDisplay').css({
													'zoom' : '100%'
												})
											},
											title : title_text,
											modal : true,
											height : 550,
											width : 800,
											position : 'auto',
											buttons : buttons
										});

										$dialog.dialog("open");
										attachPrepareMarkListEvents();
									});

									return false
								});

						$('#docTools-email a').click(function(e) {
							var title_text = $(this).text();
							e.preventDefault();
							$dialog = $("#dialog");
							$dialog.load($(this).attr('href') + ' #contentcontainer', [], function() {
								$.validator.addMethod("multiEmail", function(value, element) {
									var emails = value.split(";");
									valid = true;
									for ( var i in emails) {
										value = emails[i];
										valid = valid && jQuery.validator.methods.email.call(this, value, element);
									}
									return valid;
								}, VALID_EMAIL_ADDRESS);

								$('#sendEmail').validate();

								var buttons = {};

								buttons[I18N_SEND] = function() {
									submitEmailForm();
								}
								buttons[I18N_CANCEL] = function() {
									$(this).dialog('close')
								}

								$dialog.dialog({
									title : title_text,
									height : 550,
									width : 800,
									position : 'auto',
									modal : true,
									buttons : buttons
								});

								$dialog.dialog("open");
								attachEmailScripts();
								openCitationExampleWindow($('a.citationExample'));
							});

							return false;
						});

						$('#docTools-download a').click(function(e) {
							var title_text = $(this).text();

							e.preventDefault();

							var $dialog = $('#dialog');

							$dialog.load($(this).attr('href') + ' #frmDownloadFormat', [], function() {
								var buttons = {};

								buttons[I18N_CLOSE] = function() {
									$(this).dialog('close')
								}

								buttons[I18N_DOWNLOAD] = function() {
									url = $('#downloadDocumentLink').attr('href');
									constructDownloadURLjq(url);
								}

								$dialog.dialog({
									title : title_text,
									height : 'auto',
									width : 800,
									position : 'auto',
									modal : true,
									buttons : buttons
								});

								$dialog.dialog("open");
							});
						});

						$('#marklist_download').click(function(e) {
							if ($('.resultsRow') == null || $('.resultsRow').size() <= 0) {
								alert(NO_RECORDS_DOWNLOAD_MSG)
								return false
							}

							var title_text = $(this).text();
							e.preventDefault();
							var $dialog = $('#dialog');
							$dialog.load($(this).attr('href') + ' #frmDownloadFormat', [], function() {
								var buttons = {};

								buttons[I18N_CLOSE] = function() {
									$(this).dialog('close')
								}

								buttons[I18N_DOWNLOAD] = function() {
									url = $('#downloadDocumentLink').attr('href');
									constructDownloadURLjq(url);
								}

								$dialog.dialog({
									title : title_text,
									height : 'auto',
									width : 800,
									position : 'auto',
									modal : true,
									buttons : buttons
								});

								$dialog.dialog("open");
							});

							return false;
						});

						GALE.citationTools.init.init();
						GALE.citationToolsTracking.init();

						$('#docTools-bookmark a').click(function(e) {
							bookmarkPopup($(this), e);
						});

						$('.videoLinkURL').live('click', function(e) {

							var videoLinkURL = $(this).attr('href');
							var title_text = $(this).attr('title');
							e.preventDefault();

							var $dialog = $("#videoDialog");
							$dialog.dialog({
								title : title_text,
								height : 385,
								width : 640,
								modal : true,
								open : function(event, ui) {
									jwplayer('videoDialog').setup({
										flashplayer : 'http://callisto11.ggsrv.com/imgsrv/FastFetch/UTIL/jwplayer.swf',
										file : videoLinkURL,
										provider : 'video',
										autostart : false,
										height : 385,
										width : 640
									}).play();
								},
								close : function(event, ui) {
									$(this).remove();
									if ($("#related_videos").length > 0) {
										$("#related_videos").append('<div id="videoDialog"></div>');
									} else {
										$("#contentcontainer").append('<div id="videoDialog"></div>');
									}
								}
							});
						});

						$('#docTools-searchassist a').click(
								function(e) {
									var title_text = $(this).text();
									e.preventDefault();

									var $dialog = $('#dialog');

									$dialog.load($(this).attr('href') + ' #content', [], function() {
										var buttons = {};

										buttons[I18N_SUBMIT] = function() {
											if ($('#journalAlertCreationForm').length > 0 && $("#journalAlertCreationForm").valid()) {
												$.post($('#journalAlertCreationForm').attr("action"), $('#journalAlertCreationForm')
														.serialize());
												alert(I18N_JRNLALRT_CONFM);
												$dialog.dialog("close");
											}

											if ($('#alertCreationForm').length > 0 && $("#alertCreationForm").valid()) {
												$.post($('#alertCreationForm').attr("action"), $('#alertCreationForm').serialize());
												alert(I18N_ALRT_CONFM);
												$dialog.dialog("close");
											}
										}

										buttons[I18N_CLOSE] = function() {
											$(this).dialog('close')
										};

										$dialog.dialog({
											title : title_text,
											height : 'auto',
											width : 800,
											position : 'auto',
											modal : true,
											buttons : buttons
										});

										$dialog.dialog("open");

										$('input#emailId').keypress(
												function(event) {
													if (event.keyCode == '13') {
														event.preventDefault();
														if ($('#alertCreationForm').length > 0 && $("#alertCreationForm").valid()) {
															$.post($('#alertCreationForm').attr("action"), $('#alertCreationForm').serialize());
															alert(I18N_ALRT_CONFM);
															$dialog.dialog("close");
														}

														if ($('#journalAlertCreationForm').length > 0 && $("#journalAlertCreationForm").valid()) {
															$.post($('#journalAlertCreationForm').attr("action"), $('#journalAlertCreationForm')
																	.serialize());
															alert(I18N_JRNLALRT_CONFM);
															$dialog.dialog("close");
														}
													}
												});

										$("a#rsslink").click(openGaleChildWindow);
									});
								});

						$('#googleCaller a')
								.click(
										function(e) {
											remote = window
													.open(
															"",
															"galeChildWindow",
															"alwaysRaised=yes,width=720,height=520,screenX=50,screenY=50,top=50,left=50,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,status=no");
											remote.location.href = $(this).attr('href');
											if (remote.opener == null) {
												remote.opener = window;
											} else {
												remote.focus();
											}
											return false;
										});
					}

					$('#titleBar-preferences').click(function(e) {
						var title_text = $(this).text();
						e.preventDefault();

						var $dialog = $('#dialog');

						$dialog.load($(this).attr('href') + ' #preferences', [], function() {
							var buttons = {};
							buttons[I18N_CANCEL] = function() {
								$(this).dialog('close')
							};

							buttons[I18N_APPLY_PREFS] = function() {
								var values = buildPreferencesParameters();

								$.ajax({
									async : false,
									type : "POST",
									data : values,
									dataType : "text",
									url : $("#applyprefslink").text(),
									success : function(data) {
										alert(PREFS_UPDATED_MSG);
									}
								});

								var href = location.href;
								window.location = href;
							}

							buttons[I18N_RESTORE_DEFAULTS] = function() {
								$.ajax({
									async : false,
									type : "POST",
									dataType : "text",
									url : $("#restoreprefslink").text(),
									success : function(data) {
										alert(PREFS_UPDATED_MSG);
									}
								})
								location.reload(true);
							}

							$dialog.dialog({
								title : title_text,
								height : 'auto',
								width : 600,
								position : 'auto',
								modal : true,
								buttons : buttons
							});

							$dialog.dialog("open");
							attachPreferencesEvents();
						});
					});

					$('#ui_language ul li a').click(function(e) {
						e.preventDefault();
						var link = $('#appPrefslink').val();
						var lang = 'uiLanguage=' + $(this).attr('rel');
						$.ajax({
							async : false,
							type : "POST",
							data : lang,
							dataType : "text",
							url : link,
							success : function(data) {
								location.href = removeAuthCountParam(location.href);
							}
						});
					});

					$('#globalTools-dictionary a').click(function(e) {
						var title_text = $(this).text();
						e.preventDefault();
						var $dialog = $('#dialog');
						$dialog.load($(this).attr('href') + ' #dictionaryForm', [], function() {
							$dialog.dialog({
								title : title_text,
								height : 'auto',
								width : 600,
								position : 'auto',
								modal : true,
								buttons : {}
							});

							$dialog.dialog("open");
							attachDictionarySearchEvents();
						});
					});

					if ($('.moreResults').length > 0) {
						$('.moreResults').click(function(e) {
							e.preventDefault();
							var limiter = $(this).attr('rel');
							var str = limiter.split(" ");
							var index = str['0'];
							var div = str['1'];
							var classNames = $(this).attr('class');
							classNames = $.trim(classNames);

							if (classNames.indexOf('subt') == -1) {
								loadSearchLimiters(index, 25, div);
								$(this).addClass('subt');
								$(this).html(LIMITERS_VIEW_LESS);
							} else {
								loadSearchLimiters(index, 5, div);
								$(this).removeClass('subt');
								$(this).html(LIMITERS_VIEW_MORE);
							}
						});
					}

					if ($('#oneSearch').length > 0) {
						attachOneSearchScripts();
					}

					bindLanguageFlag();

					$('#globalTools-infomark a').click(function(e) {
						var title_text = $(this).text();
						e.preventDefault();
						$dialog = $("#dialog");

						$dialog.load($(this).attr('href') + ' #content', [], function() {
							var buttons = {};

							buttons[I18N_CLOSE] = function() {
								$(this).dialog('close')
							}

							$dialog.dialog({
								title : title_text,
								height : 'auto',
								width : 800,
								position : 'auto',
								modal : true,
								buttons : buttons
							});

							$dialog.dialog("open");
							hideBookMarkOnNonIE();
							$('#infomark-email-url a').click(loadEmailBookmarkDialog);
							$('#InfomarkBookmark').click(addBookMarkForAllSupportingBrowsers);
						});
					});

					$('#globalTools-closewindow a').click(function(e) {
						e.preventDefault();
						parent.window.close();
					});

				});

function addQuotesForSearchPhraseIndexes(index, term) {
	if (index == 'PU' || index == 'SU') {
		return '"' + term + '"';
	}
	return term;
}

function addBookMarkForAllSupportingBrowsers() {
	var url = this.href;
	var title = 'Infomark URL';
	var browserName = navigator.appName;

	if (browserName == "Microsoft Internet Explorer") {
		window.external.AddFavorite(url, title);
	} else if (browserName == "Netscape") {
		if (navigator.userAgent.indexOf("Chrome") < 0 && navigator.userAgent.indexOf("Safari") < 0) {
			window.sidebar.addPanel(title, url, "");
		} else {
			alert(BROWSER_UNSUPPORTED_ACTION);
		}
	} else {
		alert(BROWSER_UNSUPPORTED_ACTION);
	}

	return false;
}

function getSelectedInternalFormat() {
	return $("input:radio[name='cite']:checked").val();
}

function getSelectedExternalFormat() {
	if ($("#export-endnote:input:radio").prop("checked")) {
		return $("#export-endnote:input:radio").val();
	} else if ($("#export-procite:input:radio").prop("checked")) {
		return $("#export-procite:input:radio").val();
	} else if ($("#export-refmgr:input:radio").prop("checked")) {
		return $("#export-refmgr:input:radio").val();
	} else if ($("#export-refworks:input:radio").prop("checked")) {
		return $("#export-refworks:input:radio").val();
	} else if ($("#export-easybib:input:radio").prop("checked")) {
		return $("#export-easybib:input:radio").val();
	}
}

function getMarkListCitationFormat() {
	return $("input:radio[name='citationFormat']:checked").val();
}

function getMarkListPrintOption() {
	return $("input:radio[name='printOpt']:checked").val();
}

function getPrintInfo() {
	var printAll = false;
	var recUrl = "";

	for ( var k = 0; k < ENTRY_ARRAY.length; k++) {
		var marklistDivs = document.getElementsBySelector("div.marklistCollection-printselect");
		var totalRecord = marklistDivs.length;

		for ( var j = 0; j < totalRecord; j++) {
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
			recUrl += ENTRY_ARRAY[k] + "_" + (j + 1) + "_" + start + "_" + end + "^";
		}
	}

	return recUrl;
}

function selectAll() {
	$("#sr_wrapper input[type='checkbox']:not([disabled='disabled'])").attr('checked', true);
}

jQuery.fn.search = function() {
	return this.focus(function() {
		var promptMap = getIndexToPromptMap();

		if (this.value == promptMap[$('.search_tabs li.selected').attr('rel')]) {
			defaultValue = promptMap[$('.search_tabs li.selected').attr('rel')];
			this.value = "";
		}
	}).blur(function() {
		if (!this.value.length) {
			this.value = defaultValue;
		}
	});
};

function loadEmailBookmarkDialog(e) {
	var title_text = $(this).text();
	e.preventDefault();

	$dialog.load($(this).attr('href') + ' #contentcontainer', [], function() {
		$.validator.addMethod("multiEmail", function(value, element) {
			var emails = value.split(new RegExp("\\s*;\\s*", "gi"));
			valid = true;
			for ( var i in emails) {
				value = emails[i];
				valid = valid && jQuery.validator.methods.email.call(this, value, element);
			}

			return valid;
		}, VALID_EMAIL_ADDRESS);

		$('#sendEmail').validate();

		var buttons = {};
		buttons[I18N_SEND] = function() {
			submitEmailInfomarkForm();
		}
		buttons[I18N_CANCEL] = function() {
			$(this).dialog('close')
		}

		$dialog.dialog({
			title : title_text,
			height : 550,
			width : 800,
			position : 'auto',
			modal : true,
			buttons : buttons
		});

		$dialog.dialog("open");
	});
}

function hideBookMarkOnNonIE() {
	var browserName =  navigator.appName;
	if (browserName!="Microsoft Internet Explorer") {
		$("#Bookmark").hide();
	}
}

function getBrowserVersion() {
	var version = 0;
	if (navigator.appVersion.indexOf('MSIE') != -1) {
		browser = navigator.appVersion.split('MSIE')
		version = "IE" + parseInt(browser[1]);
	}

	return version;
}

function bindLanguageFlag() {
	var current_language = $('.selected a', $('.ui_translation')).attr('rel');
	var current_language_text = $('.selected a', $('.ui_translation')).text();
	var new_text = $("<span class='" + current_language + "' >&nbsp;</span>");

	$('.ui_language_label').text(current_language_text).prepend(new_text);

	if ('en' != current_language) {
		jQuery('#searchBar').addClass('fontshrinker')
	}
}

function bookmarkPopup(bookmarkLink, e) {
	var title_text = bookmarkLink.text();
	e.preventDefault();
	$dialog = $("#dialog");
	$dialog.load(bookmarkLink.attr('href') + ' #content', [], function() {
		var buttons = {};
		buttons[I18N_CLOSE] = function() {
			$(this).dialog('close')
		}

		$dialog.dialog({
			title : title_text,
			height : 'auto',
			width : 800,
			position : 'auto',
			modal : true,
			buttons : buttons
		});

		$dialog.dialog("open");
		hideBookMarkOnNonIE();
		$('#infomark-email-url a').click(loadEmailBookmarkDialog);
		$('#InfomarkBookmark').click(addBookMarkForAllSupportingBrowsers);
	});
}

function removeAuthCountParam(url) {
	url = url.replace(/\?authCount=\d*&/, "?");
	return url.replace(/[&\?]?authCount=\d*/, "");
}

function appendRequiredParamsToRemoveLimitersLink() {
	$(".removeLink").ready(
			function() {
				var removeLinks = $(".removeLink");
				var inPS = $("#inPS").val();
				var prodId = $("#prodId").val();
				var userGroupName = $("#userGroupName").val();
				var tabID = $("#tabID").val();
				var searchId = $("#searchId").val();
				var searchType = $("#searchType").val();
				var lm = $("#lm").val();
				var qt = $("#qt").val();
				removeLinks.each(function() {
					var href = $(this).attr("href");
					var newHref = href + "&actionCmd=REMOVE_LIMITERS&inPS=" + inPS + "&prodId=" + prodId + "&userGroupName="
							+ userGroupName + "&tabID=" + tabID + "&searchId=" + searchId + "&searchType=" + searchType + "&qt=" + qt
							+ "&lm=" + lm;
					$(this).attr("href", newHref);
				});
			});

}