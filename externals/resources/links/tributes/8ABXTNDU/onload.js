window.isOption = 0;
window.optionLeft = 0;

var sliderTimeout;

jQuery(document).ready(function($) {

  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent),
      mm_behavior = isMobile ? 'click' : 'hover';
      wrap$ = $('.wrap');
  if ( wrap$.length < 1) {
      wrap$ = $('.page-wrapper');
  }

  $('.jobcenter-page-view .topjobs-slider').lemmonSlider({
    infinite: true,
    random: true,
    callback: function() {
      $('.jobcenter-page-view .jobs').css('visibility','visible');
    }
  });

  // Positioning foo
  var nav$ = $('ul.nav');
  if ((nav$.length > 0) && (wrap$.length > 0)) {
    var left = wrap$.offset().left;
    // Get the menus from the back end, then set the events for each menu item
    $.getJSON('/megamenu/all.json', function(data) {

      // append menus coming from the back end
      for (var i in data.menu) {

        // find which menu to place and where to put it
        var menu = $(data.menu[i].html).attr('data-menu'),
            li$ = nav$.find('li[data-menu-type='+menu+']');

        li$.append(data.menu[i].html);
      }

	// Setting window.ord here for doubleclick
	window.ord = Math.floor(Math.random() * 1.e16);

      // iterate through each list item in the nav with the attr 'data-menu-type'
      $('ul.nav li[data-menu-type]').each(function() {
        var menu = $(this).attr('data-menu-type');
        if ($('section[data-menu='+menu+']').length > 0) {
          $(this).removeClass('no-megamenu');
          $('section[data-menu='+menu+']').css('left', left);
        }
      });

      $('ul.nav li[data-menu-type]').addDropdown({
        hoverClassElement: 'a',
        hoverClass: 'navButtonHover',
        behavior: mm_behavior,
        invisible: true,
        delays: { // this is for hover behavior
          mouseenter: 150, // should probably always be zero
          mouseleave: 150
        },
        callbacks: {
          open: function(menu) {
            // doubleclick ads, load only if there isn't a menu loaded
			if ($('section[data-menu=' + menu + '] div.ad').children().length === 0) {
			  var ord = window.ord || Math.floor(Math.random() * 1e16);
              var dblConfig = data.menu[menu].doubleclick.on;
              var adsize = dblConfig.width + 'x' + dblConfig.height;

              var dbl = '<a href="http://ad.doubleclick.net/N272/jump/' + dblConfig.zone + ';sz=' + adsize + ';ord=' + ord + '?"><img src="//ad.doubleclick.net/N272/ad/' + dblConfig.zone + ';sz=' + adsize + ';ord=' + ord + '?" /></a>';
              $('section[data-menu=' + menu + '] div.ad').html(dbl);
            }
          }
        }
      });

      $('section[data-menu] .topjobs-slider').lemmonSlider({
        infinite: true,
        random: true
      });

      sliderAutoplay();
      function sliderAutoplay(){
          sliderTimeout = setInterval(function() {
              $( '.jobcenter-page-view .topjobs-slider' ).trigger( 'nextSlide' );
          }, 7000 );
      }
      function pauseSlider(){
          var sliderPause = clearInterval( sliderTimeout );
      }

      $( '.jobcenter-page-view .prev-slide, .jobcenter-page-view .next-slide ' ).click(pauseSlider);



      // newsletter signup click functionality
      var noBootstrap = typeof($.fn.modal) === 'undefined' ? true : false;
      $('a.newsletter-signup').click(function(e) {
        e.preventDefault();
        $('section.dropdown-menu').invisible();
        $(this).parents('li').removeClass('selected').children('a').removeClass('navButtonHover');
        noBootstrap ?
          openAccountWorkflow($(this).attr('url'), $(this).attr('title'), acmgt_dialog_close, show_close) :
          $('.newsletterSignup #modal-iframe').attr('src',$(this).attr('url'));
      });
    });

    // Add event listener to page resize to keep menu anchored left
    $(window).resize(function() {
      $('section.dropdown-menu').css({
        'left': wrap$.offset().left
      });

      if ($('#logout').length === 1) {
        $('#logout').css({
          right: setRight($('#welcome'))
        });
      }
    });
  }

  // .hat#welcome click to .hat#logout popup
  if ($('#welcome').length === 1) {
    var welcomeCss = {
      position: 'absolute',
      top: 4 + $('#welcome').offset().top + $('#welcome').height(),
      right: setRight($('#welcome'))
    };
    $('#welcome').addDropdown({
      behavior: 'click',
      invisible: true,
      css: welcomeCss
    });
  }
});



// setRight is a utility function that justifies the logout popover to the right
// of the "Welcome {person}!"
var setRight = function() {
  var hoverRightJustified = $(window).width() - ($('#welcome').offset().left + $('#welcome').outerWidth(true));
  var dropdownOuterDiff = $('#logout').outerWidth(true) - $('#logout').innerWidth();
  return hoverRightJustified - dropdownOuterDiff;
}
