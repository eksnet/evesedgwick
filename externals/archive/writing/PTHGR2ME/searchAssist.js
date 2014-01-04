function SearchAssist(defaultIndexName, inputElement) {

	var self = this;
	var isSearchAssistOn;
	var indexName;
	var ajaxUtil = new AjaxUtil(); 

	self.attachSearchAssist = function(specifiedIndexName, element) {
		indexName = self.determineIndexName(specifiedIndexName);
		inputElement = self.determineInputElement(element);

		$(inputElement).autocomplete( {
			source: function(request, response) {
				var p = jQuery("#prodId").attr('value');
				var u = jQuery("#userGroupName").attr('value');
	
				var value = request.term;
	
				if (typeof(getIndexToPromptMap) == 'function') {
					var indexToPromptMap = getIndexToPromptMap();
					for (index in indexToPromptMap) {
						if (value == indexToPromptMap[index]) {
							return;
						}
					}
				}
	
				ajaxUtil.getJsonDataFromServer("/ps/searchAssist", {q: request.term, limiter: indexName, userGroupName	 : u,prodId:p}, 
											   successFunc, errorFunc);
	
				function successFunc(data) {
					if (data == undefined) {
						handleBlankResponse();
						return;
					}
					
					response($.map(data, function(item) {
						return {
							label: item.name,
							value: self.addQuotesForSearchPhraseIndexes(indexName, item.name)
						};
					}));
				}
				
				function errorFunc() {
					handleBlankResponse();
				}
				
				function handleBlankResponse() {
					response([]);
				}
			},
			
			minLength: 3,
			select: function(event, ui) {
				$(this).removeClass("ui-corner-top").addClass("ui-corner-all");
			},
			focus: function(event, ui) { return false; },
			open: function() {
				$(this).removeClass("ui-corner-all").addClass("ui-corner-top");
			},
			close: function() {
				$(this).removeClass("ui-corner-top").addClass("ui-corner-all");
			}
		});
	};

	self.determineIndexName = function(indexName){
		if (indexName == undefined) {
			return defaultIndexName;
		}
		return indexName;
	};

	self.setIndexName = function(specifiedIndexName) {
		indexName = specifiedIndexName;
	};

	self.determineInputElement = function(element){
		if (element != undefined) {
			return element;
		}
		return inputElement;
	};

	self.addQuotesForSearchPhraseIndexes = function(index, term){
		if(index == 'PU' || index == 'SU') {
			return '"'+term+'"';
		}
		return term;
	};

	self.handleEnterKeyInInputField = function() {
		$(inputElement).keydown(function(e){
			if(e.which == 13){
				e.preventDefault();
				var selectedSearchAssistChoice = $(".ui-menu .ui-menu-item a.ui-state-hover");
				if (selectedSearchAssistChoice.length > 0) {
					var selectedSearchAssistText = addQuotesForSearchPhraseIndexes(indexName, selectedSearchAssistChoice.text());
					$(this).val(selectedSearchAssistText);
				}
				$('form#dynamicSearchForm input[type="submit"]').addClass('loading');
				$('form#dynamicSearchForm').submit();
			}
		});
	};

	self.enableSearchAssistOnOff = function(element) {
		jQuery(document).ready(function(){
			var saContainer = jQuery('#saContainer');
			if(saContainer.length!==1){
				return;
			}
			var saOptions = jQuery('#saContainer .sa-options');
			var saTitle = saContainer.attr('satitle');
			var saOn = saContainer.attr('saon');
			var saOff = saContainer.attr('saoff');
			var saNoSuggestions = saContainer.attr('sanosugg');
			var saStartType = saContainer.attr('sastarttype');
			var saSuggestionsOff = saContainer.attr('sasuggoff');
			var saClickToActivate = saContainer.attr('saclicktoact');

			var onStateOptions = ['<span class="sa-info">', saTitle, '</span><span class="on inactive">', saOn ,'</span><a href="javascript:void(0);" class="off active" id="saOff">', saOff, '</a>'].join('');
			var offStateOptions = ['<span class="sa-info">', saTitle, '</span><a href="javascript:void(0);" class="on active" id="saOn">', saOn, '</a><span class="off inactive">', saOff, '</span>'].join('');

			var onStateHints = ['<li>', saNoSuggestions, '</li><li>', saStartType, '</li>'].join('');
			var offStateHints = ['<li>', saSuggestionsOff, '</li><li><a href="javascript:void(0);" class="hswitch">', saClickToActivate, '</a></li>'].join('');

			positionSearchAssist(element);
			saContainer.show();
			var saWindow = jQuery('#saWindow');
			var saHints = jQuery('#saHints');
			var doReset = false;
			isSearchAssistOn = self.getSearchAssistState();

			saOptions.append((isSearchAssistOn===1) ? onStateOptions : offStateOptions);
			jQuery('#saHints').append((isSearchAssistOn===1) ? onStateHints : offStateHints);

			function positionSearchAssist(el){
				if(typeof el != 'undefined' && el.parent) {
					saContainer.insertAfter(el.parent())
				} else if (saContainer.parent() != document.body){
					saContainer.appendTo(document.body);
				}
				
				if(typeof el == 'undefined') {
					var pos = jQuery('.input_container').offset(); 
					var width = jQuery('.input_container').width();
					var height = jQuery('.input_container').height();
					saContainer.css( { 'left': pos.left, 'top':pos.top + height+2, 'width': width, 'position':'absolute' } );
				}
			}

			$(inputElement).bind( 'autocompleteopen', function(event, ui) {
				var saResult = $(inputElement).autocomplete('widget');
				var saHolder = jQuery('#saHolder');
				if (saResult.parent() != saHolder){
					saHolder.append(saResult);
				}
				positionSearchAssist();
				openClose(false);
				doReset = false;
			});

			jQuery(inputElement).bind( 'autocompleteclose', function(event, ui) {
				var saResult = $(inputElement).autocomplete('widget');
				openClose(true);
			});

			self.honorSearchAssistPreference();

			$(inputElement).bind('search.assist.position', positionSearchAssist);

			jQuery('#saDoor').click(function(){
				var isOpen = jQuery(this).attr('isOpen');
				var saResult = $(inputElement).autocomplete('widget');
				if(doReset){
					saResult.empty();
					saResult.hide();
					doReset = false;
				}
				openClose(isOpen);
				decideHintDisplay(true);
			});


			$(inputElement).keyup(function(){
				if(isSearchAssistOn){
					decideHintDisplay();
					doReset = true;
				}
			});

			function decideHintDisplay(isClick){
				var saResult = $(inputElement).autocomplete('widget');
				var saHints = jQuery('#saHints');
				if($(inputElement).val().length < 3){
					saResult.hide();
					saHints.show();
				}
				else {
					saHints.hide();
					if (saResult.children().length > 0){
						saResult.show();
					}
					else if(isClick){
						saHints.show();
					}
				}
			}

			function openClose(isOpen){
				if(isOpen == 'true' || isOpen===true){
					saContainer.removeClass('open');
					saWindow.hide();
					jQuery('#saDoor').attr('isOpen', false);
					$(inputElement).trigger('search.assist.close');
				}
				else {
					saContainer.addClass('open');
					saWindow.show();
					jQuery('#saDoor').attr('isOpen', true);
					$(inputElement).trigger('search.assist.open');
				}
			}

			var onClick = function(){
				isSearchAssistOn = 1;
				jQuery.cookie('SEARCH_ASSIST_STATE', isSearchAssistOn, {path:'/'});

				saOptions.empty().append(onStateOptions);
				jQuery('#saHints').empty().append(onStateHints);

				jQuery('#saOff').click(offClick);
				openClose(true);
				$(inputElement).keyup();
				$(inputElement).autocomplete('search');
			};

			var offClick = function(){
				isSearchAssistOn = 0;
				jQuery.cookie('SEARCH_ASSIST_STATE', isSearchAssistOn, {path:'/'});

				saOptions.empty().append(offStateOptions);
				jQuery('#saHints').empty().append(offStateHints);

				jQuery('#saOn').click(onClick);
				jQuery('.hswitch').click(onClick);
				openClose(true);
				var saResult = $(inputElement).autocomplete('widget');
				saResult.empty();
				saResult.hide();
			};

			jQuery('#saOn').click(onClick);
			jQuery('.hswitch').click(onClick);
			jQuery('#saOff').click(offClick);

		});
	};

	self.enableSearchAssistOnOffLinks = function() {
		$(document).ready(function() {
			self.doEnableSearchAssistOnOffLinks();
		});
	};

	self.doEnableSearchAssistOnOffLinks = function() {
		isSearchAssistOn = self.getSearchAssistState();
		self.showAppropriateOnOffLinksForState();
		self.bindOnOffLinks();
	};

	self.honorSearchAssistOnOff = function(element) {
		if (element != undefined) {
			inputElement = element;
		}

		$(document).ready(function() {
			isSearchAssistOn = self.getSearchAssistState();
			self.honorSearchAssistPreference();
		});
	};

	self.getSearchAssistState = function() {
		if(jQuery.cookie('SEARCH_ASSIST_STATE') == null){
			jQuery.cookie('SEARCH_ASSIST_STATE', 1, {path:'/'});
			return 1;
		} else {
			return parseInt(jQuery.cookie('SEARCH_ASSIST_STATE'));
		}
	};

	self.honorSearchAssistPreference = function() {
		$(inputElement).bind('autocompletesearch', function(event, ui) {
			return ((isSearchAssistOn === 1) ? true : false);
		});
	};

	self.showAppropriateOnOffLinksForState = function() {
		if (isSearchAssistOn) {
			$("#onStateLinks").show();
			$("#offStateLinks").hide();
		} else {
			$("#offStateLinks").show();
			$("#onStateLinks").hide();
		}
	};

	self.bindOnOffLinks = function() {
		jQuery('#saOn').click(self.handleOnLink);
		jQuery('#saOff').click(self.handleOffLink);
	};

	self.handleOnLink = function() {
		self.handleOnOrOffLink(1);
	};

	self.handleOffLink = function() {
		self.handleOnOrOffLink(0);
	};

	self.handleOnOrOffLink = function(newSearchAssistState) {
		isSearchAssistOn = newSearchAssistState;
		jQuery.cookie('SEARCH_ASSIST_STATE', isSearchAssistOn, {path:'/'});
		self.showAppropriateOnOffLinksForState();
	};

	self.getInputElement = function() {
		return inputElement;
	};

	self.getIndexName = function() {
		return indexName;
	};
}
