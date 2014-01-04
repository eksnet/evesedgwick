(function($) {
	OMNI.MarkList = new function() {

		var self = this;
		var MARKED_COUNT_LIMIT = 50;
		var MARKED_STYLE_CLASS = 'saved';
		var MARKED_ATTRIBUTE = 'data-marklist-item-id';
		var MARKED_ATTRIBUTE_FLAG = "$FLAG";

		self.init = function() {
			var $link = $('#js-nemo-marklist-doc-link, .js-nemo-marklist-doc-link');
			if ($link.length > 0 ) {
				$link.live('click', self.updateStatus);
			} else {
				$('.js-marklist-checkbox').live('click', self.updateCheckboxStatus);
				$('.js-marklist-link').live('click', self.updateStatus);
				$('.js-marklist-all-link').live('click', self.updateAllStatus);
				$('.js-marklist-row-link').live('click', self.removeMarkedRow);
				$('.js-marklist-show-link-list').live('click', self.openAnInfomarkWindow);
				$('.marklist-removeAll-gtx').live('click', self.removeAllItemsFromMarkList);
			}

			updateMarkAllStatus();
			getCountAndUpdatePageState();
		};

		self.updateStatus = function(e) {
			e.preventDefault();
			self.updateCheckboxStatus(e);
			if($.publish) {
				$.publish('marklist status updated', [$(e.currentTarget)]);
			}
		};

		self.updateCheckboxStatus = function(e) {
			var link = $(e.currentTarget);
			if (isMarked(link)) {
				updateMarkedStatus([link], false);
			} else if (allowMarkAction(1)) {
				updateMarkedStatus([link], true);
//				mark(link);
			} else {
				displayLimitMessage([link]);
				e.preventDefault();
			}
		};

		self.updateAllStatus = function(e) {
			var links = $('.js-marklist-link, .js-marklist-checkbox');
			if (isAllItemsMarkedOnPage()) {
				updateMarkedStatus(links, false);
			} else if (allowMarkAction(links.not('.saved').length)) {
				updateMarkedStatus(links.not('.saved'), true);
			} else {
				displayLimitMessage(links);
				e.preventDefault();
			}
		};

		self.removeMarkedRow = function(e) {
			e.preventDefault();
			var link = $(e.currentTarget);
			link.closest('.js-marklist-row').hide();
			unbindCitationMetadata(link);
			submitMarkedItems([link]);
			$('.js-marklist-row:visible').each(function(index) {
				$(this).find('.js-marklist-row-number').text(index + 1);
			});
			checkForLastArticle();
		};

		self.openAnInfomarkWindow = function(e) {
			e.preventDefault();
			var link = $(e.currentTarget);
			openInfomarkWindow(e, link.attr("href"));
		};

		self.preventDefaultEventAction = function(e) {
			e.preventDefault();
		};


		self.removeAllItemsFromMarkList = function(e) {
			e.preventDefault();
			$.get($('#marklist-removeAll').attr('href'), function () {
				$('#marklistCollectionSize').html('0');
				$('#totalNoOfItems').html('0');
				$('#resultsTable').hide();
				self.setVisibilityOfMarkedItemControls();
			});
		};

		function checkForLastArticle () {
			if($('.js-marklist-row:visible').length == 0 ) {
				location.reload();
			}
		}

		function isMarked(link) {
			return link.hasClass(MARKED_STYLE_CLASS);
		}

		function updateMarkedStatus(links, isMarked) {
			$(links).each(function() {
				var link = $(this);
				changeClass(link, MARKED_STYLE_CLASS, isMarked);
				changeTitle(link,isMarked);
				if (link.hasClass('js-marklist-checkbox')) {
					changeClass(link.parents(".js-marklist-checkbox-parent:first"), 'highlight', isMarked);
					changeTitle(link.parents(".js-marklist-checkbox-parent:first"),isMarked);
					link.attr('checked', isMarked);
				}
			});
			updateMarkAllStatus();
			submitMarkedItems(links);
		}

		function changeClass(el, className, shouldContain) {
			if (shouldContain) {
				el.addClass(className);
			} else {
				el.removeClass(className);
			}
		}
		
		function changeTitle(el, isMarked) {
			var titleAttr = isMarked ? 'remove' : 'add';
			el.attr("title", el.data(titleAttr));
		}
		
		function shouldAddTitleForProduct() {
			var currentProdId = $('#prodId').val();
			return _.contains(PRODUCTS_FOR_TITLE_UPDATE, currentProdId);
		}

		function allowMarkAction(linkCount) {
			var currentMarkedCount = $('.js-marklist-count').first().text();
			var newMarkedCount = linkCount + parseInt(currentMarkedCount);
			if (newMarkedCount > MARKED_COUNT_LIMIT) {
				return false;
			}
			return true;
		}

		function displayLimitMessage(links) {
			if (links.length > 1) {
				alert(MARKLIST_ALL_ERR_MSG1+" "+MARKLIST_ALL_ERR_MSG2);
			} else {
				alert(MARKLIST_ERR_MSG);
			}
		}

		function isAllItemsMarkedOnPage() {
			var allMarked = true;
			$('.js-marklist-link, .js-marklist-checkbox').each(function() {
				if (!$(this).hasClass(MARKED_STYLE_CLASS)) {
					allMarked = false;
					return false;
				}
			});
			return allMarked;
		}

		function submitMarkedItems(links) {
			var markedString = "";
			var delimiter = "";
			$.each(links, function(index, link) {
				var isSaved = $(link).hasClass(MARKED_STYLE_CLASS);
				var markItem = $(link).attr(MARKED_ATTRIBUTE);
				markedString = markedString + delimiter + markItem.replace(MARKED_ATTRIBUTE_FLAG, (isSaved ? "1" : "0"));
				delimiter = "^";
			});
			postUpdate(markedString);
		};
		
		function unbindCitationMetadata(link) {
			var markItem = $(link).attr(MARKED_ATTRIBUTE);
			var docId = markItem.split("_")[2];
			$("input[data-docid='"+docId+"']").remove();
		}

		function postUpdate(markedString) {
			var url = UPDATE_MARKLIST_LINK + "&markedString=" + encodeURIComponent(markedString);
			$.ajax({
				type: 'POST',
				url: url,
				success: updatePageState,
				dataType: 'json',
				async: false
			});
		};

		function getCountAndUpdatePageState() {
			var url = GET_MARKLIST_COUNT_LINK;
			var urlWithRandomness = url + "&random=" + new Date().getTime();
			$.get(urlWithRandomness, updatePageState);
		}

		self.setVisibilityOfMarkedItemControls = function () {
			if($("#MarklistPage").length > 0) {
			    var totalNumber = $('#marklistCollectionSize').html();
			    if(isNaN(totalNumber)) {
			        totalNumber = 0;
			    }
			    if (totalNumber <= 0) {
			    	$('#marklist_download').hide();
			    	$('#marklist-removeAll').hide();
			    	$('#docTools').hide();
			    }
			}
		};


		function updatePageState(data) {
			updatePageTotals(data.count);
			updateBookMarkLink(data.count);
			updateDocumentList(data.content);
		}

		function updatePageTotals(count) {
			$('.js-marklist-count').text(count);

			$('.js-marklist-tool-link a').each(function() {
				var linkText = $(this).text().replace(/\s+/g, " ");
				$(this).attr('title', linkText);
			});

			if (parseInt(count) > 0) {
				$('.js-marklist-saved-documents-view').show();
				$('.js-marklist-tool-link').removeClass('disabled');
				$('.js-marklist-tool-link a').each(function() {
					$(this).unbind('click', self.preventDefaultEventAction);
				});
			} else {
				$('.js-marklist-saved-documents-view').hide();
				$('.js-marklist-tool-link').addClass('disabled');
				$('.js-marklist-tool-link a').each(function() {
					$(this).click(self.preventDefaultEventAction);
				});
			}
		}

		function updateMarkAllStatus() {
			var message = isAllItemsMarkedOnPage() ? RESULTS_REMOVEALL_MSG : RESULTS_SAVEALL_MSG;
			$.each($('.js-marklist-all-link').not('input'), function() {
				$(this).text(message);
			});
			$.each($('.js-marklist-all-link').not('a'), function() {
				if (isAllItemsMarkedOnPage()) {
					$(this).prop("checked", true);
				} else {
					$(this).prop("checked", false);
				}
			});
		}

		function updateBookMarkLink (count) {
			if($('.js-saved-articles-view').length > 0 && count <=0 ) {
				$('.js-tool-link-bookmark').addClass('disabled');
				$('.js-tool-link-bookmark a').removeAttr('href');
				$('.js-tool-link-bookmark').die();
			}
		}

		function updateDocumentList(data) {
			var list = "";
			$.each(data, function(index) {
				if (index > 2) return;
				list += "<li class='resultRow' ><a href='" + this.articleUrl + "' >" + this.title + "</a></li>";
			});
			list = "<ul>" + list + "</ul>";
			$('.js-marklist-saved-document-list').html(list);
		};

		return self;
	};

})(jQuery);

(function($) {
	OMNI.Anime = new function() {
		var self = this;

		self.init = function() {
			$('.js-marklist-all-link').live('change', self.showMarkAllEffect);
			$('.js-marklist-checkbox').live('change', self.showMarkArticleEffect);
		};

		self.showMarkAllEffect = function(e) {
			var checkbox = $(e.currentTarget);
			if (checkbox.is(':checked')) {
				var targetLocation = $('.js-marklist-anime-target:first').offset();
				var left = targetLocation.left;

				var animatedSource = $('.js-marklist-anime-source:first').clone();
				animatedSource.find('.js-marklist-anime-source-hide').hide();

				animatedSource.appendTo(checkbox.parent()).css('position','absolute').animate({
					top: targetLocation.top,
					left: '+='+left,
					width: 'toggle',
					height: 'toggle',
					opacity: 0.25
				}, 800, function() {
					animatedSource.remove();
				});
			}
		};

		self.showMarkArticleEffect = function(e) {
			var checkbox = $(e.currentTarget);
			if(checkbox.is(':checked')) {
				var title = checkbox.attr('data-marklist-title');
				$("#fixed_messages").prepend('<li class="adding" id="saved"><p><strong>'+ title +'</strong> '+ ML_SAVED_DOCUMENTS_MSG_SUFFIX +' <a href="'+ $('#mark_link').attr('href') +'">'+ML_SAVED_DOCUMENTS_MSG+'</a></p></li>');
				$('#saved').slideDown("fast").delay(3000).fadeOut(750, function(){$(this).remove();});
			}
		};

		return self;
	};
})(jQuery);
