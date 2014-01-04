/**
 * ************************************* Event Related Functions
 * ***********************************************
 */
function addBookMark() {
	// window.external.AddFavorite(this.href,'Infomark URL');
	
	$('#InfomarkBookmark').live('click',function(e) {
		if(document.all) {
			window.external.AddFavorite(this.href,'Infomark URL');
		} else if(window.sidebar) {
			window.sidebar.addPanel('Infomark URL',this.href,'');
		}
		return false;
	})
	
}

function makeImagesFlexible() {
	var imgObj = $('.document #documentDisplay .imageGroup img');
	var imgWidth;
	if(imgObj.length > 0){
		imgObj.each(function(){
			imgWidth = $(this).width()+'px';	
			$(this).css({
				width: '96%',
				'max-width': imgWidth,
				height: 'auto'
			})
		});
	}
}

function populateArticleLinks() {
    var formObj = document.resultsForm;
    var totalNoOfArticles = formObj.totalNoOfArticles.value;
    var currentPosition = formObj.currentPosition.value;
    var initialValue = 5;
    var finalValue = 10;
    var start = 1;
    var end = initialValue;
    var currLink;

    if (isNumeric(currentPosition)) {
        currLink = parseInt(currentPosition);
    } else {
        currLink = 1;
    }

    if (isValidObject(this.nodeName)) currLink = this.innerText;

    if (currLink <= finalValue) {
        end = currLink - 1 + initialValue;
        start = 1;
    } else {
        start = currLink - initialValue;
        end = start + finalValue - 1;
    }

    if (end > finalValue) start = end - finalValue + 1;

    var linkDiv1 = getElementById("articleLinks_1");

    var linkDiv2 = getElementById("articleLinks_2");

    for (i = start; ((i <= totalNoOfArticles) && (i <= end)); i++) {
        if($(linkDiv1).length > 0) {getLink(i, currLink, linkDiv1);}
        if($(linkDiv2).length > 0) {getLink(i, currLink, linkDiv2);}
    }

    return;
}

function getLink(linkPage, currentPage, linkDiv) {
    var formText = document.createTextNode(linkPage);
    var space = document.createTextNode(" ");

    if (linkPage == currentPage) {
        linkDiv.appendChild(formText);
        linkDiv.appendChild(space);
    } else {
        var anchorElement = document.createElement("a");
        var currentPosition = parseInt(linkPage);
        var formObj = document.resultsForm;
        var articleLink = formObj.articleLink.value;
        articleLink = unescape(articleLink) + "&currentPosition=" + currentPosition;
        anchorElement.setAttribute("href", articleLink);
        anchorElement.appendChild(formText);
        linkDiv.appendChild(anchorElement);
        linkDiv.appendChild(space);
    }
}
function getDynamicSearchFormObj() {
    return document.forms[0];
}

function getPrintFormObj() {
    var formObj = getDynamicSearchFormObj();
    if (formObj == null) {
        formObj = document.resultsForm;
    }
    if (formObj == null) {
        formObj = document.forms[0];
    }
    return formObj;
}

function initDocRetrieval() {
    var formObj = document.forms[0];
    if (formObj != null && formObj.relevancyPage != null) {
        setRelevancyPages(formObj, formObj.relevancyPage[0]);
        setRelevancyPages(formObj, formObj.relevancyPage[1]);
    }
}

function setRelevancyPages(formObj, relevancyPageObj) {
    var cnt = relevancyPageObj.length;
    for (var relList = 0; relList < cnt; relList++) {
        if (relevancyPageObj.options[relList].value == formObj.anotherPage.value) {
            relevancyPageObj.options[relList].selected = true;
        }
    }
}

function fetchDocument(event) {
    var originalPos = trim(CURRENT_POSITION);
    var index = this.id.split("_")[1];
    var currentPos = trim(document.getElementById("iterator-currentPos_" + index).value);
    var endCount = document.getElementById("iterator-max_" + index).innerHTML;
    var documentLevel = getParamValueInURL(this.href, "docLevel");
    if (validateDocumentRange(event, currentPos, endCount, originalPos)) {
        if (documentLevel != "FASCIMILE") {
            documentLevel = "test";
        }
        var docLink = this.href;
        docLink += "&currentPosition=" + currentPos;
        if (BR_NS6 || BR_NS4) {
            this.href = docLink;
        } else {
            document.location.href = docLink;
        }
    }
}

function validateDocumentRange(event, currentPos, endCount, originalPos) {
    var validStatus = true;
    if (isNumeric(currentPos)) {
        if (parseInt(currentPos, 10) > parseInt(endCount, 10) || parseInt(currentPos, 10) <= 0) {
            alert("Enter a valid document range.");
            validStatus = false;
            cancelEvent(event);
        } else {
            validStatus = true;
        }
    } else {
        alert("Enter a valid number");
        validStatus = false;
        cancelEvent(event);
    }
    return validStatus;
}

function translate() {
    var translateLink = document.getElementById("document_translate").href;
    var selElement = document.getElementById("selTransLang");
    var translateLangValue = selElement.options[selElement.selectedIndex].value;
    var url = translateLink + escape('&transLang=' + translateLangValue);
    openInChildWindowWithMenuBar(url, "galeChildWindow");
    return false;
}

function performPageSelect(event) {
    var pageNumber = trim(document.multiPageForm.pageNumber.options[document.multiPageForm.pageNumber.selectedIndex].value);
    var docLink = document.multiPageForm.pageLink.value;
    docLink += "&pageNumber=" + pageNumber;
    window.location.href = docLink;
}

function doPageInitialization() {
    var marklistDivs = document.getElementsBySelector("div.markItem");
    var pgCnt = 0;
    for (var i = 0; i < marklistDivs.length; i++) {
        var element = marklistDivs[i].getElementsByTagName("INPUT")[0];
        if (element.checked == true) {
            pgCnt += 1;
        }
    }
    PG_CNT = pgCnt;
}


/* testing new dictionary functionality */



// getSelected() was borrowed from CodeToad at
// http://www.codetoad.com/javascript_get_selected_text.asp
function getSelected() {
    if(window.getSelection) { 
    	return window.getSelection(); 
    } else if(document.getSelection) { 
    	return document.getSelection(); 
    }else {
            var selection = document.selection && document.selection.createRange();
            if(selection.text) { 
            	return selection.text; 
            }
            return "";
    }
    return "";
}


function openDictionary(url) {	
	$('#dialog').load(url + " #contentcontainer", [], function(){
		$('#dialog').dialog({
			   title: "Dictionary",
			   height: 'auto', 
			   width: 600, 
			   position: 'auto',
			   buttons: {}
     	});
		// $('#dialog').dialog("open");
		attachDictionarySearchEvents();
	});	
	
	
}

function attachDictionaryPopupZ() {
	var userGroupName = document.getElementById("userGroupName").value;
	var prodId = document.getElementById("prodId").value;
	var url = "dictionary.do?prodId="+prodId+"&userGroupName="+userGroupName+"&method=Lookup&queryTerm={term}&currentPosition=-1"
	 $('.SideNotePara p').mouseup(function(e) {
		 var selection = getSelected();
		 selection = new String(selection).replace(/[^\s\w]+/g,'')
			if(selection !=''){
				var space = $.trim(selection).indexOf(' ', 0)
				/* alert(space) */
				 if(space < 0) {
					// alert('hi')
					 if($('#show-bubb').length < 1) {
						 
						 selectionImage = $('<a />');
						 
						 selectionImage.attr({
				                href: url,
				                title: 'Click here to learn more about this term',
				                target: '_blank',
				                id: 'show-bubb'
				            }).hide(); 
						 $(document.body).append(selectionImage);
						 $('#show-bubb').click(function(e){
							 e.preventDefault();
							 openDictionary($(this).attr('href'));
						 })
					 }
				
					 selectionImage.attr('href',url.replace('{term}',encodeURI($.trim(selection)))).css({
					        top: e.pageY - 35, 
					        left: e.pageX - 2 
					        }).fadeIn();

				 }
			}
	 });
	
	$(document.body).mousedown(function() {
	    if($('#show-bubb').length > 0) { selectionImage.fadeOut(); }
	});

	
}

// Translation testing
function translateDocumentInline(lang) {
    google.language.translate("Hello world", "en", lang, function(result) {
      if (!result.error) {
        var container = document.getElementById("translation");
        container.innerHTML = result.translation;
      }
    });
  }

function translateEvent() {
	$('#document_translate').click(function(e){
		e.preventDefault();
		$('#translate_notice').remove();
		
		var lang = $('#selTransLang').val();
		
		// $('#translate_notice').html(google.language.getBranding('test1');)
		$('div#documentDisplay').not('#document-sourcecitation').translate(lang);
		if($('#translate_notice').length < 1) {
			$('#documentDisplay').prepend("<div id='translate_notice'><p>Disclaimer: You have requested a machine translation of selected content from our databases. This functionality is provided solely for your convenience and is in no way intended to replace human translation. Neither Gale nor its licensors make any representations or warranties with respect to the translations.</p><p class='powered_by'>Translation powered by:<img src='http://www.google.com/uds/css/small-logo.png'/></p></div>");
		}
		
		$('#translate_notice').hide().show('fast') 
	})
}

 



/**
 * *************************************** Document Display Event Binding
 * ****************************************
 */


function documentDisplayOnLoad() {
    initDocRetrieval();
    window.focus();
    doPageInitialization();
    if (getElementById("articleLinks_1")) {
        populateArticleLinks();
    }

    // Easter egg
    if (document.location.href.indexOf("beatle=ringo") > -1) {
        var elem = getElementById("documentDisplay");
        elem.style.background = "url('images/ringoyay.jpg') no-repeat";
    }
}
function attachLibraryLinksEvents() {
    var elements = document.links;
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].id.match("librarylinks-")) {
            elements[i].onclick = openGaleChildWindow;
        } 
    }
}

function initPlayVideo() {
	if($('#videoLinkURL').length > 0) {
	setTimeout(play, 1000);
	}
}


function attachDocumentDisplayEvents() {
    documentDisplayOnLoad();
    attachPopupForSelector("a.printableVersionLink", openGaleChildWindow);
    attachPopupForSelector("a.websiteLink", openGaleChildWindow);
    addChangeEventForId("multiPage-select", performPageSelect);
    attachEventForLink("iterator-go_1", fetchDocument);
    attachEventForLink("iterator-go_2", fetchDocument);
    attachPopup("recentUpdates", openGaleChildWindow);
    attachPopup("docTools-doi", openDOILink);
    attachPopup("globalTools-infomark", openGaleChildWindow);
    attachEventForLink("document_translate", translate);
    attachTarget("ipsFullTextLink", openGaleChildWindow);
    attachLibraryLinksEvents();
    attachDictionaryPopupZ();
   	attachEventForLink("saveMarkList",openInfomarkWindow)
   	initPlayVideo();
   	makeImagesFlexible();
}


// //////////////////////////////////////////////////////////////////////////////
//
// This function shows the Article Sidebar in eBooks
// & potentially other content.
//
// Typically executed from a <a> element. Get the Hide Sidebar Article <div> and
// set appropriate style, get the Show Sidebar Article <div> and hide it.
//
// <div class="sideBarTitle" id="12t">
// <p>Sidebar:&nbsp;<a href="javascript:showIt('12')">Show</a></p>
// </div>
// <div class="sideBarArticle" id="12">
// <p>Sidebar:&nbsp;<a href="javascript:hideIt('12')">Hide</a></p>
// <h2>Source</h2>
// <p>Regan Good, "The Supermax Solution," <i>The Nation,</i> vol. 276, March 3,
// 2003, p. 7. Copyright ? 2003 by The Nation Magazine/The Nation Company, Inc.
// Reproduced by permission.</p>
// </div>
//
// //////////////////////////////////////////////////////////////////////////////
function showIt(id) {
    document.getElementById(id).style.display = 'block';
    document.getElementById(id + 't').style.display = 'none';
    return;
}
// //////////////////////////////////////////////////////////////////////////////
//
// This function hides the Article Sidebar in eBooks
// & potentially other content.
//
// Typically executed from a <a> element. Get the Show Sidebar Article <div> and
// set appropriate style, get the Hide Sidebar Article <div> and hide it.
//
// <div class="sideBarTitle" id="12t">
// <p>Sidebar:&nbsp;<a href="javascript:showIt('12')">Show</a></p>
// </div>
// <div class="sideBarArticle" id="12">
// <p>Sidebar:&nbsp;<a href="javascript:hideIt('12')">Hide</a></p>
// <h2>Source</h2>
// <p>Regan Good, "The Supermax Solution," <i>The Nation,</i> vol. 276, March 3,
// 2003, p. 7. Copyright ? 2003 by The Nation Magazine/The Nation Company, Inc.
// Reproduced by permission.</p>
// </div>
//
// //////////////////////////////////////////////////////////////////////////////
function hideIt(id) {
    document.getElementById(id).style.display = 'none';
    document.getElementById(id + 't').style.display = 'block';
    return;
}

addWindowLoadEvent(attachDocumentDisplayEvents);


