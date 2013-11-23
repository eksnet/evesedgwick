/*
$Id: tabsetoverlayrevealer.js 38178 2010-05-12 14:11:58Z jon $
(c) 2006 - 2010 The New York Times Company
/js/blogs_v3/nyt_universal/tabsetoverlayrevealer.js
description: displays dropdown menu within vertical tabset module.
*/

NYTD.Blogs.TabSetOverlayRevealer = function(elementId) {

  var fromEl, toEl, hidewrapper;
  var revealed = false;
  var timeoutID = 0;
  var trigger = $(elementId);
  var wrapper = trigger.down('.opposingFloatControl');
  var hiddenclass = 'hidden';
  var hoverclass = 'tabSetOverlayHover';
  var lastlistclass = 'lastListItem';
  var list1 = wrapper.down('.element1').select('li');
  var list2 = wrapper.down('.element2').select('li');

  this.init = function() {
    // class last list item
    if (list2.length < list1.length) {
      $$('#' + elementId + ' .opposingFloatControl .element2 li:last-child').invoke('addClassName', lastlistclass);
    };
    
    // overwrite tabset.js behavior
    modifyTabSet();
    
    // set up event handlers
    Event.observe(trigger, 'mouseover', showContent.bindAsEventListener(this));
    Event.observe(trigger, 'mouseout', delayedHide.bindAsEventListener(this));
    Event.observe(wrapper, 'mouseover', cancelHide.bindAsEventListener(this));
  };

  function modifyTabSet() {
    trigger.stopObserving('click');
    trigger.select('li').invoke('stopObserving', 'click');
  };

  function showContent() {
    cancelHide();
    trigger.addClassName(hoverclass);
    revealed = true;
    wrapper.removeClassName(hiddenclass);
  };

  function cancelHide() {
    window.clearTimeout(timeoutID);
    timeoutID = null;
    hidewrapper = false;
  };

  function delayedHide(e) {
    if (revealed) {
      hidewrapper = true;
      timeoutID = window.setTimeout(function() { hideContent(e) }, 750);
    }
  };

  function hideContent(e) {
    fromEl = e.target; // element the event happened to
    toEl = e.relatedTarget || e.toElement; // element mouse goes to (mouseout)
    if ( (fromEl === trigger || $(fromEl).descendantOf(trigger) ) && !($(toEl).descendantOf(trigger)) && (hidewrapper === true) ) {
      stopTimeout();
      wrapper.addClassName(hiddenclass);
      trigger.removeClassName(hoverclass);
      revealed = false;
      hidewrapper = false;
    }
  };

  function stopTimeout() {
    if (timeoutID) {
      window.clearTimeout(timeoutID);
      timeoutID = null;
    }
  };

}