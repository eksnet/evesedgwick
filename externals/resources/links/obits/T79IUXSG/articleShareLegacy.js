/* $Id: articleShareLegacy.js 103281 2012-07-11 16:14:19Z konige $
(c) 2008 The New York Times Company */

function writePost(excludeList) {
	var shareTools = new NYTD.ArticleShareTools();
	shareTools.writePost(excludeList);
	
	var toolsBox = $$('.articleTools');
	if(toolsBox.length <= 1) return;
	
	if(toolsBox[0].select('#adxToolSponsor').length === 0) {
        $('shareMenu').addClassName('last');
	} else {
        toolsBox[1].select('li').last().addClassName('last');
	}
}

// FIXME This probably needs to be exposed for those other pages.
function toggleShareTab(shareButton, postList, excludeList) {
		writePost(excludeList);	
}