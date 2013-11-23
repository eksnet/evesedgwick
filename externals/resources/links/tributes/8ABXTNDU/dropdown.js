/**
 * Adds the designated dropdown on hover or click of the calling element.
 *
 * To use this, the dropdown element should be have the class dropdown and each dropdown should
 * be "linked" to its trigger with:
 * - trigger: data-menu-type="uniqueName"
 * - dropdown: data-menu="uniqueName"
 *
 * @class addDropdown
 * @constructor $(element).addDropdown(options)
 *  Options that are required: dropdown$
 * @version 0.6.3 with select-option browser hack
**/

(function($) {
  $.fn.addDropdown = function(opts) {
    "use strict";
    /**
     * Options, default and after merging with user-sent. These really need to be
     * overridden in most cases.

     * @property defaults
     * @property options
     * @type Object
    **/

    var defaults = {
      /**
       * This denotes how the dropdown is triggered: with a user click or hover
       *
       * @property options.behavior
       * @type String
       * @default 'hover'
      **/
      behavior: 'hover',
      /**
       * This can be used to style the dropdown$ object, should there need
       * to be any late-styled css based on user click or how a page renders.
       *
       * @property options.css
       * @type Object
       * @default {}
      **/
      css: {},
      /**
       * This controls how the dropdown is hidden and shown.
       * If this is false, the normal jquery hide()/show() is used. This is based on
       * css's display: none|block;
       * If this is true, we use custom functions that use css's visiblity property.
       *
       * @property options.invisible
       * @type Boolean
       * @default false
      **/
      invisible: false,
      /**
       * This controls the sensitivity of the hover. The delays are measured in
       * miliseconds, with 0 being the most sensitive about opening and closing. The
       * defaults are where they work best for a large menu to show and hide.
       *
       * @property options.delays
       * @type Object
       * @default mouseenter: 150, mouseleave:350
      **/
      delays: {
        mouseenter: 150,
        mouseleave: 350
      },
      callbacks: {
        open: undefined,
        close: undefined
      }
    };

    // Extend options provided by user
    var options = $.extend(defaults, opts),
        // Create a new timeout object
        timeout = new Timeout(),
        selectBox_open = 0,
        option_on = 0;

////////////////////////////////////////////////////////
    $(this).each(function() {
      var menu = $(this).attr('data-menu-type'),
          hovered$ = $(this),
          dropdown$ = $('.dropdown-menu[data-menu='+menu+']'),
          selectBoxs$ = hovered$.find('select');

//////////////////////////////////////////////////////////////////

      if (dropdown$.length > 0) {
        // Set CSS
        dropdown$.css(options.css);

        // Hide the dropdown
        dropdown$.obscure(options.invisible);

        switch (options.behavior) {
          case ('hover'):

            if ( selectBoxs$.length ) {
              selectBoxs$.bind('focusout focusin blur change', function(e) {
                //console.log("SELECT -- " + e.type + " --- " + this );
                if ( e.type === 'focusin' ) {
                  selectBox_open = 1;
                } else if ( e.type === 'change' ) {
                  $(this).trigger('blur',true);
                } else if ( e.type === 'blur' ) {
                  hovered$.focus();
                  selectBox_open = 0;
                } else {
                  selectBox_open = 0;
                }
              }).bind('focus click', function(e){
                // don't do anything on these events
              }).bind('mouseenter mouseleave', function(e){
                //console.log("SELECT -- " + e.type + " --- " + this );
                if ( e.type === 'mouseleave' ) {
                  if ( $.browser.webkit )
                    $(this).trigger('blur');
                  if ( $.browser.msie ) {
                    e.stopPropagation();
                  }
                }
              });
            }

            hovered$.mouseenter(function(e) {

              // don't open again if we are on the same one we have open.
              if ( $(this).hasClass('open') ) {
                timeout.clear();
                return true;
              }
              // don't open other menu's if we are in IE and our select/options are open.
              if ( ($.browser.msie && selectBox_open) ) {
                timeout.clear();
                return false;
              }

              $(this).focus(); // set focus

              // Open this dropdown
              timeout.set(function() {
                if (options.callbacks.open && typeof(options.callbacks.open) === "function") {
                  options.callbacks.open(menu);
                }

                // show the dropdown based on how the options.invisible
                dropdown$.illuminate(options.invisible);
                hovered$.addClass('open');
              }, options.delays.mouseenter, 'show');

            }).mouseleave(function(e) {
              // Remove any requests to open or close another dropdown
              timeout.clear();
              if ( ($.browser.msie && selectBox_open) ) {
                //console.log('select box is open & option on before timeout - return false');
                return false;
              } else {
                // Hide this megamenu
                timeout.set(function(e) {

                  if (options.callbacks.close && typeof(options.callbacks.close) === "function") {
                    options.callbacks.close();
                  }

                  // if invisible is false, use default, otherwise use visible/invisible
                  dropdown$.obscure(options.invisible);
                  hovered$.removeClass('open');
                  // hack - close selects if we got'em
                  if ($.browser.mozilla) {
                    if ( selectBoxs$.length ) {
                      selectBoxs$.trigger("blur");
                    }
                  }
                }, options.delays.mouseleave, 'hide');
              }
            });
            break;

          case ('click'):
            // menu event handler
            $(this).bind('openDropdown', function(e) {
              // if the dropdown is hidden/display:none
              if (dropdown$.obscured(options.invisible)) {

                if (options.callbacks.open && typeof(options.callbacks.open) === "function") {
                  options.callbacks.open(menu);
                }
                
                // stop default behavior, show the dropdown, and set this as the active menu
                dropdown$.illuminate(options.invisible);
                $(this).addClass('open');
              }
            });

            break;
        }
      }
    });

    // window event handler to close if the user clicks outside the dropdown
    if (options.behavior === 'click') {
      $('html').bind('touchstart click', function(e) {
        var open$ = $('html').find('.open');
        if (open$.length === 0) {

          if ($(e.target).parents('*[data-menu-type]:not(.no-megamenu)').length > 0) {

            e.preventDefault();
            $(e.target).trigger('openDropdown');
          }
        } else {
          if ($(e.target).parents('*.open[data-menu-type]:not(.no-megamenu)').length === 0) {
            e.preventDefault();
            open$.find('.dropdown-menu').obscure(options.invisible);
            open$.removeClass('open');
            $(e.target).trigger('click');
          }
        }
      });
    }

    return $(this);
  };
})(jQuery);


/**
 * Check the userAgent to see if this is (probably) a mobile device.
 *
 * @function isMobile
 * @return {Boolean}
 **/
var isMobile = function() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
};

/**
 * Find and return the element and (if there is one,) its class.
 *
 * @function getElement
 * @return {String} {{element}}.{{class}}
 * @param {jQuery} DOM Element
 **/
var getElement = function(e$) {
  var element = e$[0].nodeName.toLowerCase();
  if (e$[0].className.length > 0) {
    var classes = e$[0].className.split(' ');
    for (var i=0;i<classes.length;i++) {
      element+= '.'+classes[i];
    }
  }

  return element;
};

/**
 * jQuery<1.6 substitution for is(jQuery); operator. If jQuery is higher, it uses is()
 * NOT chainable
 *
 * @method isSameElement
 * @return {Boolean} are these two elements the same?
 * @param {jQuery} $(this)
 * @param {jQuery} b$
 **/
$.fn.isSameElement = function(b$) {
  var jqVersion = function() {
    var jqv = /(\d)\.(\d)\.(\d)/.exec($.fn.jquery);
    return parseFloat(jqv[1]+'.'+jqv[2]);
  };

  if (jqVersion() < 1.7) {
    return $(this).get(0) === b$.get(0);
  } else {
    return $(this).is(b$);
  }
};
/**
 * This method merges show and "visible."
 *
 * @method illuminate
 * @return {Function} show or set visibility:visible
 * @param {jQuery} $(this)
 * @param {Boolean} invisible
 **/
$.fn.illuminate = function(invisible) {
  invisible ?
    $(this).css('visibility','visible') :
    $(this).show(0);

  return $(this);
};
/**
 * This method returns if an object is :visible or visiblity:visible.
 * NOT chainable
 *
 * @method illuminated
 * @return {Boolean} is this element display:block; or visibility:visible;?
 * @param {jQuery} $(this)
 * @param {Boolean} invisible
 **/
$.fn.illuminated = function(invisible) {
  var state;

  invisible ?
    state = $(this).css('visibility') === 'visible' :
    state = $(this).css('display') === 'block';

  return state;
};
/**
 * This method merges hide and visibility:hidden.
 *
 * @method obscure
 * @return {Function} hide or set visibility:hidden
 * @param {jQuery} $(this)
 * @param {Boolean} invisible
 **/
$.fn.obscure = function(invisible) {

  invisible ?
    $(this).css('visibility','hidden'):
    $(this).hide(0);

  return $(this);
};
/**
 * This method returns if an object is :hidden or visiblity:hidden.
 * NOT chainable
 *
 * @method obscured
 * @return {Boolean} is this element display:none; or visibility:hidden;?
 * @param {jQuery} $(this)
 * @param {Boolean} invisible
 **/
$.fn.obscured = function(invisible) {
  var state;

  invisible ?
    state = $(this).css('visibility') === 'hidden' :
    state = $(this).css('display') === 'none';

  return state;
};

/**
 * Simple timeout class. Sets and cancels timeouts
 *
 * @class timeout
 * @constructor var t = timeout
**/
var Timeout = function() {
  /**
   * The keeper of the most recent timeout data.
   *
   * @property id timeoutid
   * @type Integer
  **/
  this.id = null;
  this.completed = false;
};
Timeout.prototype = {
  /**
   * Sets a timeout
   *
   * @method set
   * @return {Integer} this.id
   * @param {Integer} time in miliseconds
   * @param {Function} callback
  **/
  set: function (callback,time) {
    this.id = window.setTimeout(callback,time);
    return this.id;
  },
  /**
   * Cancels existing timeout
   *
   * @method cancel
  **/
  clear: function() {
    window.clearTimeout(this.id);
    this.id = null;
    return true;
  }
};
