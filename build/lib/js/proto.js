/*!
*
* evekosofskysedgwick.org
*
*/

$(document).ready (function () {
    
    /* Replace email addresses */
    $(".email").each(function () {
        var mail_link = $(this).html().replace("[a]","@");
        $(this).html(mail_link);
        $(this).attr("href", "mailto:"+mail_link);
    });
    
    /* Activate newwindow links */
    $("a.newwindow").attr("target","_blank");

  /* Activate Tablesorter */
  $("#inventory").tablesorter({
    widgets: ['zebra'] 
  });
  /* Activate Quicksearch */
  $('input#search').quicksearch('table tbody tr', {
    'stripeRows': ['odd', 'even']
  });
  
  /* Activate Fancybox */
  function formatTitle(title, caption, currentArray, currentIndex, currentOpts) {
    return '<div id="album-caption">' + (title && title.length ? '<p>' + caption + '</p>' : '' ) + '<h6 id="count">'+(currentOpts.href.match(/\/blog\//) != "/blog/" ? '<span style="float:left;"><a href="'+ currentOpts.href.replace(".jpg", "_full.jpg") +'" target="_blank" style="color:#939196;">VIEW FULL SIZE</a></span>' : '' )+'IMAGE ' + (currentIndex + 1) + ' / ' + currentArray.length + '</h6></div>';
  }

  $(".carousel a").fancybox({
    'transitionIn'  : 'none',
    'transitionOut' : 'none',
    'titlePosition' : 'inside',
    'autoScale'     : true,
    'titleFormat'   : formatTitle
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

  /* carousel script*/ 
  var carousel;
  var aperture_width=622;
  var thumb_width=120;

  function acquireCarousel(vara) {
    var carousel = vara.siblings(".aperture").children(".carousel");
    return acarousel;
  }
  $(".album").children("#carousel_right").click(function(e) {
    e.preventDefault();
    carousel = $(this).siblings(".aperture").children(".carousel"); 
    var carousel_width=parseInt(carousel.css("width").replace("px",""));
    if ((carousel_width + (parseInt(carousel.css("left").replace("px","")) - aperture_width)) < thumb_width) {
      carousel.animate({"left": (-(carousel_width-aperture_width))+"px"}, "slow");
    }
    else {
      carousel.animate({"left": "-=138px"}, "slow");
    };
  });
  $(".album").children("#carousel_left").click(function(e) {
    e.preventDefault();
    carousel = $(this).siblings(".aperture").children(".carousel"); 
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
  $(".album").children("#carousel_left").hide();
  $(".album").children("#carousel_right").hide();

  /* nav show/hide */
  $(".album").mouseover(function() {
    carousel = $(this).children(".aperture").children(".carousel"); 
    var carousel_width=parseInt(carousel.css("width").replace("px",""));
    if (carousel.css("left") == '0px') {
      $(this).children("#carousel_right").show();
    }
    else if (parseInt(carousel.css("left").replace("px","")) == -(carousel_width-aperture_width)) {
      $(this).children("#carousel_left").show();
    }
    else {
      $(this).children("#carousel_left").show();
      $(this).children("#carousel_right").show();
    };
  }).mouseout(function(){
    $(this).children("#carousel_left").hide();
    $(this).children("#carousel_right").hide();
  });

});