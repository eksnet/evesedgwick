/*    
 $Id: contentexpander.js 40565 2010-06-28 19:33:42Z lacy.garrison $
 (c) 2006 - 2010 The New York Times Company
 description: shows and hides content using an animation for the transition.
*/

NYTD.ContentExpander = Class.create({

	initialize: function(button, content, contentLowerLimitElement, contentUpperLimitElement) {
		this.button = button;
		this.content = content;
		this.contentLowerLimitElement = contentLowerLimitElement;
		this.contentUpperLimitElement = contentUpperLimitElement;
		this.expandedClass = 'expanded';
		this.openedText = "Close";
		this.closedText = this.button.innerHTML;
		Event.observe(this.button, 'click', this.openContent.bindAsEventListener(this));
	},
  
	openContent: function(e) {
		Event.stop(e);
		this.button.stopObserving('click');
		this.button.update(this.openedText).addClassName(this.expandedClass).blur();
		var that = this;
		new Effect.BlindDown(this.content, {
			afterFinish: function() {
				Event.observe(that.button, 'click', that.closeContent.bindAsEventListener(that));
			}
		});
	},
  
	closeContent: function(e) {
		
		Event.stop(e);
		this.button.stopObserving('click');
    	var that = this;
		
		if(this.contentUpperLimitElement != undefined) {

			var contentLimitTop		= this.contentUpperLimitElement.cumulativeOffset( )["top"];
			var contentLimitBottom	= this.contentLowerLimitElement.cumulativeOffset( )["top"];
		
			var limitTop			= document.viewport.getScrollOffsets( )["top"];
			var limitBottom			= limitTop + document.viewport.getHeight( );
		
			if(!(contentLimitTop > limitTop && contentLimitBottom < limitBottom)) {
				new Effect.ScrollTo(this.content, { offset:-75 });
			}
		
		}
		
		new Effect.BlindUp(this.content, {
			afterFinish: function() {
				that.button.update(that.closedText).removeClassName(that.expandedClass).blur();
				Event.observe(that.button, 'click', that.openContent.bindAsEventListener(that));
			}
		});
		
	}
	
});

Event.observe(window, "load", function() {

	$$('.toggleContent').each(function(module) {

		var button = module.down('.showContent');
    	var content = module.down('.hiddenContent');
		var contentLowerLimitElement = $(content).up( );
		var contentUpperLimitElement = contentLowerLimitElement.previous("h4");
		
		module.insert({top: content});
		button.innerHTML = "Continue Reading";
		
		var contentExpander = new NYTD.ContentExpander(button, content, contentLowerLimitElement, contentUpperLimitElement);

  });

});