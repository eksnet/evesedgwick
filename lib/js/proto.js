/*!
*
* evekosofskysedgwick.org
*
*/

$(document).ready (function () {

  /* activate Lightbox*/
  $('.carousel a').lightBox({
    overlayBgColor: '#3A393B'
  });

  /* carousel script*/
  var posm=1;
  var dir=1;
  var carousel = $(".carousel");
  var aperture=534;
  var carousel_width=parseInt(carousel.css("width").replace("px",""));
  var thumb_width=120;

  $("#carousel_left").css("cursor", "pointer");
  $("#carousel_right").css("cursor", "pointer");
  $("#carousel_left").click(function(e) {
    e.preventDefault();
    if ((carousel_width + (parseInt(carousel.css("left").replace("px","")) - aperture)) < thumb_width) {
      carousel.animate({"left": (-(carousel_width-aperture))+"px"}, "slow");
    }
    else {
      carousel.animate({"left": "-=138px"}, "slow");
    };
  });
  $("#carousel_right").click(function(e) {
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

});