/**
 * @module      outbrain
 * @namespace   CN
 *
 * @description Allows the outbrain widget to have multiple tabs and sets up a slider to see
 * the other entries in a tab
 *
 * @author    Grant Miiller
 * @copyright 2012 Conde Nast Digital
 *
 */

/* Make our own CN object if there isn't one and start the module*/
var CN = CN || {};
(function($) {

"use strict";
/*
* @namespace CN.outbrain The main outbrain object
* @param Just passes the jQuery $ to use
*/
CN.outbrain = (function() {

    var tabs = [],
        currTab = '',
        module = document.getElementById('ny-outbrain'),
        leftNav = document.getElementById('ny-ob-nav-left'),
        rightNav = document.getElementById('ny-ob-nav-right'),
        innerContent = document.getElementById('ny-outbrain-content-inner'),
        innerHeight = $(innerContent).height();

/*
* Slides the current tabs container to view other entries
* @param direction {String} Which way the container slides, takes
* 'right' not right
*/

    function slide(direction) {
        if(currTab.isAnimate === false && currTab !== '' ) {
            currTab.isAnimate = true;

            var cont = $(currTab.widget).find('.ob_container'),
                children = cont.find('.ob_container_recs').children(),
                numChildren = children.length,
                amt = currTab.slideAmt,
                displayNum = currTab.displayNum;


            if(direction === 'right') {
                cont.animate({
                    left: -amt
                }, 500, function() {
                    for(var i = displayNum - 1; i >= 0; i--) {
                        $(children[numChildren - 1]).after($(children[i]));
                    }
                    cont.css('left', 0);
                    currTab.isAnimate = false;
                });
            } else {
                for(var i = displayNum - 1, end = numChildren - 1; i >= 0; i--) {
                    $(children[0]).before($(children[end - i]));
                }
                cont.css('left', -amt);
                cont.animate({
                    left: 0
                }, 500, function() {
                    currTab.isAnimate = false;
                });
            }
        }
    }

    $(leftNav).click(function() {
        if(currTab !== '') {
            slide('left');
        }
    });

    $(rightNav).click(function() {
        if(currTab !== '') {
            slide('right');
        }
    });

    return {
/*
* Creates a new tab based on passed parameters and sets the currTab if
* no other tabs are created yet
*
* @method newTab
* @param starter {String} ID of the object that triggers switching between tabs
* @param widget {String} ID of the outbrain widget for this tab
* @param isActiveTab {Boolean} Optional, if this tab is supposed to be
*        the active tab after all tabs are loaded
* @param slideAmt {Integer} Optional, how far the slider should move
* @param contWidth {Integer} Optional, the width of the containing element
*
*/
        newTab : function(starter, widget, isActiveTab, slideAmt, displayNum) {
            var i = tabs.length,
                active = isActiveTab || false,
                tempHeight;
            tabs[i] = new CN.outbrain.tab(starter, widget, slideAmt, displayNum);
            /* if this is the first tab ( i===0 ) display the module */
            if( i === 0 ){
                $(module).show();
            }
            tempHeight = $(tabs[i].widget).find('.ob_strip_container').outerHeight();
            if( tempHeight > innerHeight ) {
                $(innerContent).height(tempHeight);
                innerHeight = tempHeight;
            }
            /* If there is no current tab, set it to the current tab */
            if( currTab === '' || active) {
                CN.outbrain.switchTab(tabs[i]);
            } else {
                $(tabs[i].starter)
                    .addClass('ny-outbrain-tab-off')
                    .removeClass('ny-outbrain-tab-on');
            }
            tabs[i].starter.style.display = "block";
        },

/*
* Switches the active tab to the param that was passed
*
* @method switchTab
* @param tab {Object} The tab that is to become active
*
*/
        switchTab : function(tab) {
            currTab = tab;
            currTab.widget.style.zIndex = 1;
            $(currTab.starter).removeClass('ny-outbrain-tab-off').addClass('ny-outbrain-tab-on');
            for(var i = 0; i < tabs.length; i++) {
                if( tabs[i] !== currTab ) {
                    tabs[i].widget.style.zIndex = 0;
                    $(tabs[i].starter).removeClass('ny-outbrain-tab-on').addClass('ny-outbrain-tab-off');
                }
            }
        }
    };

})();

/*
* @namepsace CN.outbrain
* @description The tab object that contains information on individual tabs.
* Do not directly use, instead use the CN.outbrain.newTab method
*
* @param starter {String} ID of the object that triggers switching between tabs
* @param widget {String} ID of the outbrain widget for this tab
* @param slideAmt {Integer} Optional, how far the slider should move
* @param displayNum {Integer} Optional, number of children being displayed at one time
*/

CN.outbrain.tab =  function(starter, widget, slideAmt, displayNum) {
    var self = this;
    this.starter = document.getElementById(starter);
    this.widget = document.getElementById(widget);
    this.slideAmt = slideAmt || 590;
    this.displayNum = displayNum || 3;
    this.isAnimate = false;

    $(this.starter).click(function() {
        CN.outbrain.switchTab(self);
    });
};

/*
* The Outbrain call back code, if there is an else in the conditional, it will
* run first.
*/

if(typeof(OBR) !== 'undefined'){
    // OBR Object must be found in Dom
    OBR.extern.onOdbReturn("AR_1",function() {
        // you can put your callback right here and be done, or you can base your callback on whether we have recommendations below.
        var totalCountOfRecs = OBR.extern.getCountOfRecs("AR_1");
        if(totalCountOfRecs > 0){
            // we have recomendations
            CN.outbrain.newTab('ny-outbrain-tab-left', 'outbrain_widget_0', true);
        }
    });

        // OBR Object must be found in Dom
    OBR.extern.onOdbReturn("AR_3",function() {
        // you can put your callback right here and be done, or you can base your callback on whether we have recommendations below.
        var totalCountOfRecs = OBR.extern.getCountOfRecs("AR_3");
        if(totalCountOfRecs > 0){
            // we have recomendations
            CN.outbrain.newTab('ny-outbrain-tab-left', 'outbrain_widget_0', true);
        }
    });
}
})(jQuery);