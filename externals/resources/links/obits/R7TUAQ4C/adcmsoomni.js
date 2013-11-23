try {
    var ascatUrl = document.URL
    var ascat_account = "conde-consumer-marketing";
    if (ascatUrl && ascatUrl != "" && (ascatUrl.indexOf("stag.") != -1 || ascatUrl.indexOf("origin.stag.") != -1 || ascatUrl.indexOf("qa1.") != -1 ) ){
      ascat_account = "conde-consumer-marketing-dev"
    }
    var s_ascat=s_gi(ascat_account)

    //s_ascat.trackingServer = "stats2.conde-consumer-marketing.com";
    s_ascat.trackingServer = "";
    //s_ascat.trackingServerSecure = "sstats.conde-consumer-marketing.com";
    s_ascat.trackingServerSecure = "";
    //s_ascat.linkInternalFilters = "javascript:,bonappetit.com";



   if (typeof (ascatRunOnce) == "undefined") {
      ascatRunOnce = false;
      ascatCount = 0;

      (function ($) {

         /**
          * Copyright 2012, Digital Fusion
          * Licensed under the MIT license.
          * http://teamdf.com/jquery-plugins/license/
          *
          * @author Sam Sehnert
          * @desc A small plugin that checks whether elements are within
          *       the user visible viewport of a web browser.
          *       only accounts for vertical position, not horizontal.
          */
         $.fn.visible = function (partial, hidden) {

            var $t = $(this).eq(0),
               t = $t.get(0),
               $w = $(window),
               viewTop = $w.scrollTop(),
               viewBottom = viewTop + $w.height(),
               _top = $t.offset().top,
               _bottom = _top + $t.height(),
               compareTop = partial === true ? _bottom : _top,
               compareBottom = partial === true ? _top : _bottom,
               clientSize = hidden === true ? t.offsetWidth * t.offsetHeight : true;

            return !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop));
         };

      })(jQuery);




      function trackAdImpressions() {
         try {

            var adIDs = "";
            var adsarray = jQuery('.ascat').filter(":visible");

            for (var i = 0; i < adsarray.length; i++) {
               jqo = jQuery(adsarray[i]);
               if (!jqo.hasClass("noTrack") && jqo.visible(true) && !jqo.hasClass("ascatVis")) {
                  jqo.addClass("ascatVis");
                  if (jqo.hasClass("ascatInvis")) {
                     jqo.removeClass("ascatInvis");
                  }
                  var o = jqo[0];
                  var adcid = " " + o.id;
                  var tempID = " " + o.id;
                  while (tempID.indexOf('AMS_') == -1) {
                     o = o.parentNode;
                     tempID = " " + o.id;
                  }

                  adIDs += o.id + ":" + adcid + "|";
                  if (jqo.hasClass("trackonce")) {
                     jqo.addClass("noTrack").removeClass("trackonce");
                  }
               }
            }

            if (adIDs != "") {
               //_ltv = s.linkTrackVars;
               //_lte = s.linkTrackEvents;
               s_ascat.linkTrackVars = "list1,events";
               s_ascat.linkTrackEvents = s_ascat.events = "event13";
               s_ascat.list1 = adIDs.substring(0, adIDs.length - 1);
               s_ascat.tl(this, 'o', 'subs ad impression');
               s_ascat.events = s_ascat.list1 = "";
               //s.linkTrackVars = _ltv;
               //s.linkTrackEvents = _lte;

               ascatCount = ascatCount + 1;
               if (ascatCount > 25) {
                  clearInterval(ascatPoll);
               }
            }


            // add ascatInvis to all currently invisible
            var invisAdsArray = jQuery('.ascat');
            for (var i = 0; i < invisAdsArray.length; i++) {
               jqo = jQuery(invisAdsArray[i]);
               jqo.filter(":hidden").addClass("ascatInvis").removeClass("ascatVis");
               if (jqo.visible(true)) {} else {
                  jqo.addClass("ascatInvis").removeClass("ascatVis");
               }
            }
         } catch (err) {}
      }

      // set up click listener
      if (jQuery) {
         jQuery(".ascatLink").live('click', function () {

            //_ltv = s.linkTrackVars;
            //_lte = s.linkTrackEvents;
            s_ascat.linkTrackVars = "list1,events";
            s_ascat.linkTrackEvents = s_ascat.events = "event14";
            obj = this;
            var tempID = " " + obj.id;
            while (tempID.indexOf('AMS_') == -1) {
               obj = obj.parentNode;
               tempID = " " + obj.id;
            }
            clicked_adcid = jQuery(obj).find(".ascat")[0].id
            s_ascat.list1 = obj.id + ": " + clicked_adcid;
            s_ascat.tl(this, 'o', 'subs ad clicked');
            s_ascat.events = s_ascat.list1 = "";
            //s.linkTrackVars = _ltv;
            //s.linkTrackEvents = _lte;
         });
      }

      var ascatPoll = setInterval(function () {
         trackAdImpressions()
      }, 500);

   }
} catch (err) {}