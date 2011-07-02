/*!
*
* evekosofskysedgwick.org
*
*/

$(document).ready (function () {

  /* Activate Tablesorter */
  $("#inventory").tablesorter({
    widgets: ['zebra'] 
  });
  /* Activate Quicksearch */
  $('input#search').quicksearch('table tbody tr', {
    'stripeRows': ['odd', 'even']
  });

  /* Input clearing */
  $('input.filter').focus(function () {
  	if ($(this).val() == $(this).attr("title")) {
  		$(this).val("");
  		$(this).css({"color": "#000",
          "font-style": "normal"})
  	}
  }).blur(function () {
  	if ($(this).val() == "") {
  		$(this).val($(this).attr("title"));
  		$(this).css({"color": "#939196",
          "font-style": "italic"})
  	}
  });
  
  /* Activate Fancybox */
  function formatTitle(title, caption, currentArray, currentIndex, currentOpts) {
    return '<div id="album-caption">' + (title && title.length ? '<p>' + caption + '</p>' : '' ) + '<h6 id="count">IMAGE ' + (currentIndex + 1) + ' / ' + currentArray.length + '</h6></div>';
  }

  $(".carousel a").fancybox({
    'transitionIn'  : 'none',
    'transitionOut' : 'none',
    'titlePosition' : 'inside',
    'autoScale'     : true,
    'titleFormat'   : formatTitle
  });

  /* carousel script*/
  var carousel = $(".carousel");  
  var aperture=622;
  var thumb_width=120;

  $("#carousel_right").click(function(e) {
    e.preventDefault();
    var carousel_width=parseInt(carousel.css("width").replace("px",""));
    if ((carousel_width + (parseInt(carousel.css("left").replace("px","")) - aperture)) < thumb_width) {
      carousel.animate({"left": (-(carousel_width-aperture))+"px"}, "slow");
    }
    else {
      carousel.animate({"left": "-=138px"}, "slow");
    };
  });
  $("#carousel_left").click(function(e) {
    e.preventDefault();
    if (carousel.css("left") != "0px") {
      if (carousel.css("left") != "auto") {
        if (Math.abs(parseInt(carousel.css("left").replace("px",""))) < thumb_width) {
          carousel.animate({"left": "0px"}, "slow");
        }
        else {
          carousel.animate({"left": "+=138px"}, "slow");
        }
      }
    }
  });

  /* hide nav at load */
  $("#carousel_left").hide();
  $("#carousel_right").hide();

  /* nav show/hide */
  $(".album").mouseover(function() {
    var carousel_width=parseInt(carousel.css("width").replace("px",""));
    if (carousel.css("left") == '0px') {
      $("#carousel_right").show();
    }
    else if (parseInt(carousel.css("left").replace("px","")) == -(carousel_width-aperture)) {
      $("#carousel_left").show();
    }
    else {
      $("#carousel_left").show();
      $("#carousel_right").show();
    };
  }).mouseout(function(){
    $("#carousel_left").hide();
    $("#carousel_right").hide();
  });

});