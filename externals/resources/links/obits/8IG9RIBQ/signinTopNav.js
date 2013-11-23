/* 7c3dab8b0098ca9f73f088023b30b1efcddaaf12/common/scripts/alpha-test.js */
// --------------------------------- alpha-test.js starts here -------------------------------------------

/*
 This is the control group for the Alpha test, where we start bleeding off users to the responsive site
 */

jQ(document).ready(function() {

    var supports_local_storage = function () {
        try {
            return 'localStorage' in window && window.localStorage !== null;
        } catch (e) {
            return false;
        }
    };

    if(supports_local_storage() && jQ.cookie("GU_ALPHA") == "false"){
        function notify(type) {
            var img = new Image();
            img.src = "http://beacon.www.theguardian.com/px.gif?platform=desktop&type=" + type;
        }
        if (!sessionStorage.gu_alpha_session) {
            sessionStorage.gu_alpha_session = true;
            notify("session");
        } else {
            notify("view");
        }
    }
});

// --------------------------------- alpha-test.js ends here -------------------------------------------

/* 7c3dab8b0098ca9f73f088023b30b1efcddaaf12/common/scripts/button-facebook.js */
// Look for facebook share buttons and get share count from Facebook GraphAPI
jQ(document).ready(function() {
	var requestCache = {};

	jQ('.facebook-share').each(function(){
		var node   = jQ(this),
			url    = jQ('.facebook-share-btn', node).data('href');

		// Setup popup
		node.find('.facebook-share-btn').click(function(e) {
			e.preventDefault();
			popUpNewWindow(this.href, 580, 400);
		});

		// Check if a previous request to the same url has been done already
		// this prevents multiple AJAX requests to Facebook
		if (typeof(requestCache[url]) === 'undefined') {
			requestCache[url] = 0;

			var fqlQuery = 'select share_count,like_count from link_stat where url="' + url + '"',
				queryUrl = 'http://graph.facebook.com/fql?q='+fqlQuery+'&callback=?';

			jQ.ajax({
				url: queryUrl,
				dataType: 'json',
				jsonpCallback: 'fbCallback',
				success: function(response) {
					requestCache[url] = response.data[0].share_count + response.data[0].like_count || 0;

					// Insert counts into all instances of buttons with the same data-href attr
					var FBshareCounts = '<span class="facebook-share-count"><i></i><u></u>'+requestCache[url]+'</span>';
					jQ('ul:not(.col-8.b3, .undocked-share) .facebook-share-btn[data-href="'+url+'"]').after(FBshareCounts);

					if(jQ('.undocked-share').length){
						FBshareCounts = '<span class="facebook-share-count"><i></i><u></u><span>'+requestCache[url]+'</span></span>';
						jQ('.undocked-share .facebook-share-btn[data-href="'+url+'"]').before(FBshareCounts);
					}
				}
			});
		}
	});
});
/* 7c3dab8b0098ca9f73f088023b30b1efcddaaf12/common/scripts/button-google-plus.js */
window.___gcfg = {lang: 'en-GB'};

jQ.getScript('https://apis.google.com/js/plusone.js');

// This is really ugly, but the GPlus button callback is very limited
trackGPlusTop      = function() { guardian.r2.OmnitureTracking.trackSocialShare('google plus', 'top share tools'); };
trackGPlusBottom   = function() { guardian.r2.OmnitureTracking.trackSocialShare('google plus', 'bottom share tools'); };
trackGPlusFloating = function() { guardian.r2.OmnitureTracking.trackSocialShare('google plus', 'floating share tools'); };

/* 7c3dab8b0098ca9f73f088023b30b1efcddaaf12/common/scripts/button-linkedin.js */
(function() {

  // Asynchronously load the LinkedIn library
  jQ.getScript('//platform.linkedin.com/in.js');

})();


function trackLinkedIn(event) {
    try {
        //omnitureTrackShareLinks('comp: r2: Share tools: LinkedIn Share', 'LinkedIn', true);
        guardian.r2.OmnitureTracking.trackSocialShare('LinkedIn', event);
    } catch(er) {
        // ignore
    }
}
/* 7c3dab8b0098ca9f73f088023b30b1efcddaaf12/common/scripts/button-tweet.js */
jQ(function ($) {
	if ('undefined' === typeof twttr) {
		window.twttr = (function (d,s,id) {
			var t, js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) return;
			js=d.createElement(s);
			js.id=id;
			js.src="//platform.twitter.com/widgets.js";
			fjs.parentNode.insertBefore(js, fjs);
			return window.twttr || (t = { _e: [], ready: function(f) { t._e.push(f); } });
		} (document, 'script', 'twitter-wjs'));
	}

	twttr.ready(function(twttr) {
		twttr.events.bind('click', function(event) {
			if ('tweet' === event.region) {
				rs_logSocialNetwork('Twitter');

				// Track which component this is coming from
				var componentName = jQ(event.target).closest('.trackable-component').data('component');
				guardian.r2.OmnitureTracking.trackSocialShare('Twitter', componentName);
			}
		});
	});
});
/* 7c3dab8b0098ca9f73f088023b30b1efcddaaf12/common/scripts/convertJSONtoAd.js */
convertJSONtoAd = function (imgTarget, linkText, trailText, sponJSON, title, slot, titleContainer, links) {
	if (sponJSON && typeof(sponJSON) === 'object') {
		imgTarget.attr('src', sponJSON.ad.image).attr('alt', sponJSON.ad['alt-image-text']).parent().attr('href', sponJSON.ad.link);
		linkText.attr('href', sponJSON.ad.link).text(sponJSON.ad.linkText);
		trailText.text(sponJSON.ad.description);
		if (sponJSON.ad.title) {
			title.text(sponJSON.ad.title);
		}
		jQ('.json-features.' + slot).show();
		if ( titleContainer ) {
			titleContainer[ sponJSON.ad.showjobstitle === 'false' ? 'hide' : 'show' ]();
		}
		if ( links && links.length ) {
			links[ sponJSON.ad.removetracking === 'true' ? 'addClass' : 'removeClass' ]( 'no-omni-tracking' );
		}
	}
};
/* 7c3dab8b0098ca9f73f088023b30b1efcddaaf12/common/scripts/floating-share-tools.js */
var checkViewport = function () {
  
  var pullout = jQ('.undocked-share');
  var mainCol = jQ('#article-body-blocks');
  var wideViewport = jQ(window).width() >= 1130;
  
  var mainColTop = mainCol.position().top;  
  var scrollFromTop = jQ(window).scrollTop(); 

  var dynTop =  parseInt(mainCol.position().top, 10) +'px';
  var dynLeft = mainCol.offset().left - 20;
  dynLeft = '-' + dynLeft +'px';  

//if it's big enough
  if (wideViewport) {

  if((scrollFromTop < mainColTop) && wideViewport) {
    pullout.removeClass('floating').css({'top' : dynTop, 'left' : dynLeft });
  } else {
    pullout.addClass('floating').removeAttr('style');    
  }
  
  if(jQ.waypoints){
    jQ.waypoints.settings.scrollThrottle = 4;
    jQ.waypoints.settings.resizeThrottle = 500;
    mainCol.waypoint({offset: 8});
    mainCol.waypoint(function(event, direction) {  
      if (direction === 'down' && jQ(window).width() >= 1130) { 
        pullout.addClass('floating').removeAttr('style');

      //if it's not going down
      } else {
        pullout.removeClass('floating').css({'top' : dynTop, 'left' : dynLeft });      
      }
  
    });
  }
  } else {
    pullout.removeClass('floating').css({'top' : '-1000px', 'left' : '-1000px' });
  }
};

jQ(window).bind("load resize", checkViewport);

/* 7c3dab8b0098ca9f73f088023b30b1efcddaaf12/common/scripts/formChecker.js */
// -----------------------formChecker.js starts here ------------------------------

function _formChecker(elem, limit, warning) {
	var charsLeft = limit - elem.value.length;
	warning.innerHTML = charsLeft + ' characters left';
	warning.className = "";
	if (elem.value.length > limit) {
		elem.value = elem.value.substring(0, limit);
		warning.innerHTML = "Max 250 characters";
		warning.className = "warning";
		elem.scrollTop = elem.scrollHeight - elem.clientHeight;
	}
}

function formChecker(elem, limit) {
	_formChecker(elem, limit, document.getElementById('warning'));
}

function formCheckerSide(elem, limit) {
	_formChecker(elem, limit, document.getElementById('warning-side'));
}

/* 7c3dab8b0098ca9f73f088023b30b1efcddaaf12/common/scripts/glossaryPopupView.js */
ensurePackage("guardian.r2");

function glossaryPopupView() {
	
	function attachLinksToGlossary(identifier, header, footer) {
	
		var allGlossaryLinks = guardian.r2.dom.element.getElementsByClassName(identifier);
		if (!allGlossaryLinks) {
			return;
		}
		
		for (var i = 0; i < allGlossaryLinks.length; ++i) {
			
			// onclick, get href from link
			var href = allGlossaryLinks[i].getAttribute('href');
			href = allGlossaryLinks[i].getAttribute('href', 2);
			href = href.substring(1);
			
			// attach click event
			addEvent(allGlossaryLinks[i], 'click', toggleGlossaryPopup(href, allGlossaryLinks[i], i, header, footer));
		}
	}
	
	function toggleGlossaryPopup(href, ele, num, header, footer) {
		return function (e) {
			guardian.r2.event.stop(e);
			var popUp = document.getElementById(href + '-popup-' + num);
			if (popUp === null || popUp === 'null') {
				
				// get the glossary element the link goes to
				var glossaryItem = document.getElementById(href);
				var linkPositionLeft = ele.offsetLeft;

				// create new element
				// populate new element with cloned heading and text from glossary
				popUp = document.createElement('div');
				popUpBox = glossaryItem.cloneNode(true);
				popUpHeading = document.createElement('h3');
				if (header !== null) {
					popUpHeadingText = document.createTextNode(header);				
					popUpHeading.appendChild(popUpHeadingText);
				}
				popUpClose = document.createElement('a');
				addEvent(popUpClose, 'click', toggleGlossaryPopup(href, ele, num));
				popUpClose.setAttribute('class', 'close');
				popUpClose.setAttribute('className', 'close');
				popUpCloseText = document.createTextNode('Close');
				popUpClose.appendChild(popUpCloseText);
				popUpFooter = document.createElement('p');
				
				if (footer !== null) {
					
					popUpFooterText = document.createTextNode(footer);
					popUpFooter.appendChild(popUpFooterText);
				}
				if (header !== null) { 
					popUp.appendChild(popUpHeading); 
				}
				
				popUp.appendChild(popUpClose);
				popUp.appendChild(popUpBox);
				popUp.appendChild(popUpFooter);
			
				// amend ID and class
				popUp.setAttribute('id', href + '-popup-' + num);
				popUp.setAttribute('class', 'glossary-popup');
				popUp.setAttribute('className', 'glossary-popup');
				
				// append new element beneath link
				ele.parentNode.insertBefore(popUp, ele);
			
				// position popup
				var popupId = popUp.getAttribute('id');
				jQ('#' + popupId).css("position", "absolute");
				jQ('#' + popupId).css("left", linkPositionLeft + ele.offsetWidth + "px");
				
			}
			
			// toggle display of new element
			toggleDisplay(popUp);

		};
	}
	
	function toggleDisplay(popUp) {
		popUp.style.display = popUp.style.display === ('block') ? popUp.style.display = 'none' : popUp.style.display = ('block');
	}
	
	attachLinksToGlossary('gloss-link', 'Glossary', '');
	attachLinksToGlossary('gu-gloss-link', null, null);
	insertStyleSheet('styles/glossary-popup.css');

}

addEvent(window, "load", glossaryPopupView);
/* 7c3dab8b0098ca9f73f088023b30b1efcddaaf12/common/scripts/guardian.geolocation.js */
/* GeoLocation 1.0 */

/** @namespace */
guardian = guardian || {};
(function (jQuery) {

    var url = "http://guardian-geo-location.appspot.com/geo-location";

    function GeoLocation() {
    }

    GeoLocation.cached = null;

    GeoLocation.prototype.getCachedGeoCode = function () {
        if (window.sessionStorage) {
            return sessionStorage.getItem("geoLocation_countryCode");
        } else {
            return this.cached;
        }
    };

    GeoLocation.prototype.setCachedGeoCode = function (countryCode) {
        if (window.sessionStorage) {
            sessionStorage.setItem("geoLocation_countryCode", countryCode);
        } else {
            this.cached = countryCode;
        }
    };

    GeoLocation.prototype.getGeoCode = function () {

        if (this.getCachedGeoCode()) {
            return jQuery.Deferred()
                .resolve(this.getCachedGeoCode())
                .promise();
        }

        var promise = jQuery.ajax({
            url:url,
            dataType:'jsonp',
            jsonpCallback: 'geolocation',
            cache: true
        });
        promise.then(jQuery.proxy(this.setCachedGeoCode, this));
        return promise;

    };

    GeoLocation.prototype.init = function () {

        var dataOnlyInCountry = jQuery("[data-only-in-country]");

        if (!dataOnlyInCountry.length) {
            return;
        }

        this.getGeoCode().then(function (actualCountryCode) {

            dataOnlyInCountry.each(function (i, obj) {

                var jObj = jQuery(obj),
                    expectedCountryCode = jObj.attr("data-only-in-country");

                if (expectedCountryCode.toUpperCase() !== actualCountryCode.toUpperCase()) {
                    jObj.closest(".embed").remove();
                }

            });

        });

    };

    guardian.GeoLocation = GeoLocation;

    jQuery(function() {
        new guardian.GeoLocation().init();
    })

})(jQuery);
/* 7c3dab8b0098ca9f73f088023b30b1efcddaaf12/common/scripts/guardian.r2.EmailToAFriend.js */
ensurePackage('guardian.r2');
guardian.r2.EmailToAFriend = (function (node, options, tracking_options) {
	jQ(function () {
		var email_forms = jQ(document.forms.emailthis);

		email_forms.bind('submit', function (e) {
			e.preventDefault();
			var form_elem = jQ(this);
			var form = this;
			var form_data = {};
            var page_url = jQ('meta[name="content-id"]').attr('content');
			var post_url = 'http://email-share.guardianapps.co.uk/share/content' + page_url;
			var submit_button = form_elem.find('input[type="submit"]');
			submit_button.attr('disabled', 'disabled');

			form_data.recipient		= this.to.value;
            form_data.from          = this.from.value;

            var errorFunc = function(jsonMessage) {
                submit_button.removeAttr('disabled');
                form_elem.find('.validation-error').remove();
                if (typeof(jsonMessage) !== 'string') { jsonMessage = 'There is a problem with this service. Please try again later.'; }
                form_elem.find('[name="to"]').after('<div class="validation-error">' + jsonMessage + '</div>');
            };


            jQ.ajax({
                url: post_url + '?recipient=' + form_data.recipient + '&from=' + form_data.from + '&callback=?',
                dataType: 'jsonp',
                data: {},
                success: function(data) {
                    var jsonStatus = data.status;

                    if (jsonStatus === 'ok'){
                        submit_button.removeAttr('disabled');
                        form_elem.find('.validation-error').remove();

                        form_elem.parents('.toolbox-popup').find('a.close-toolbox').click();
                        form.to.value = '';
                    }
                    else {
                        errorFunc(data.message);
                    }
                },
                error: errorFunc
            });
			return false;
		});
	});
})();

/* 7c3dab8b0098ca9f73f088023b30b1efcddaaf12/common/scripts/guardian.r2.OmnitureTracking.js */
/*
 *  Written by Matt Andrews
 *
 *  Requires Omniture tracking
 *  Use as follows:
 *
 <a href="#" class="tracking-link">click me</a>

 var omniture = {
 "evars":
 [{
 "key": "37",
 "value": "Books:Carousel:Latest Reader Review"
 },
 {
 "key": "32",
 "value": "Books:Carousel:Something Else"
 }],

 "props":
 [{
 "key": "11",
 "value": "23 results found"
 }],

 "events":
 [{
 "id": "11"
 },
 {
 "id": "44"
 } ]
 }

 jQ(document).ready(function(){
 jQ('a.tracking-link').click(function(){
 track(omniture);
 });
 });
 *
 * */
ensurePackage('guardian.r2');
guardian.r2.OmnitureTracking = function track(omniture) {

    if (guardian.r2.omniture.isAvailable()) {
        var i = 0, len = 0;

        // first gather eVars and linkTrackVars
        if (omniture.evars) {
            var num_evars = omniture.evars.length;
            var evar_key_list = [];
            var evar_value_list = [];

            for (i = 0, len = omniture.evars.length; i < len; i++) {
                if (omniture.evars.hasOwnProperty(i)) {
                    var evar = omniture.evars[i];

                    // first build up array of keys
                    if (i < num_evars - 1) {
                        evar_key_list[i] = 'eVar' + evar.key;
                        evar_value_list[i] = evar.value;

                        // if we're on the last item, add it to the array
                        // then *optionally* add the events var if events are set
                        // (this avoids looping through the evars a second time)
                        // todo: work out why i thought this was a good idea
                    } else {
                        evar_key_list[i] = 'eVar' + evar.key;
                        evar_value_list[i] = evar.value;

                        if (omniture.events) {
                            var c = parseInt(i, 10) + 1; // avoid overwriting the current eVar
                            evar_key_list[c] = 'events';
                        }

                        // turn the array into a string
                        var linkTrackVars = evar_key_list.join(",");
                        s.linkTrackVars = linkTrackVars;

                        // now create the evars themselves
                        for (var j, j_len = evar_key_list.length; j < j_len; j++) {
                            if (evar_key_list[j] !== 'events') { // we add this one later
                                s[evar_key_list[j]] = evar_value_list[j];
                            }
                        }
                    }
                }
            }

        }
        // now gather events
        if (omniture.events) {
            var events_list = [];

            for (i = 0, len = omniture.events.length; i < len; i++) {
                if (omniture.events.hasOwnProperty(i)) {
                    events_list[i] = 'event' + omniture.events[i].id;
                }
            }

            // now set the events variable
            var events = events_list.join(",");
            s.linkTrackEvents = events;
            s.events = events;

        }

        // and finally the props
        if (omniture.props) {
            for (i, len = omniture.props.length; i < len; i++) {
                if (omniture.props.hasOwnProperty(i)) {
                    var prop = omniture.props[i];
                    s['prop' + prop.key] = prop.value;
                }
            }
        }

        s.tl(true, 'o', omniture.description);
    }

    // IT LIVES!!!
    //console.log(s);

};



guardian.r2.OmnitureTracking.setAdditionalPageProperties = function(opts) {
    guardian.r2.OmnitureTracking.contentType = opts.contentType;

    // Banner counter
    var bannerCount = (OAS_listpos) ? OAS_listpos.split(',').length : 0;
    if (bannerCount > 0) {
        s.eVar69 = "+" + bannerCount;
        s.events = s.apl(s.events, "event25=" + bannerCount, ',');
    }

    // More meta data for content pages
    if (opts.isContentPage === true && opts.contentType != "Network Front") {

        // Time elapsed since publication
        var elapsedStr = '',
            elapsedSec = (new Date() - Date.parse(opts.published)) / 1000,
            months  = Math.floor(elapsedSec / (86400 * 30)),
            days    = Math.floor((elapsedSec - (months * 86400 * 30)) / 86400),
            hours   = Math.floor((elapsedSec - (months * 86400 * 30) - (days * 86400)) / 3600),
            minutes = Math.floor((elapsedSec - (months * 86400 * 30) - (days * 86400) - (hours * 3600)) / 60);

        if (months) { elapsedStr += months + 'M '; }
        if (days)   { elapsedStr += days + 'd '; }
        if (elapsedSec >= 3600) { elapsedStr += hours + 'h '; }
        elapsedStr += minutes + 'm';

        s.prop48 = elapsedStr; // Time since publication
        s.eVar70 = '+1';
        s.events = s.apl(s.events, 'event41', ',');
    }
};

guardian.r2.OmnitureTracking.setProperty = function(propKey, propValue) {
    // This function is a simple setter to allow pages to set Omniture
    // properties before the s_code has loaded in
    if (typeof guardian.r2.OmnitureTracking._properties == 'undefined') {
        guardian.r2.OmnitureTracking._properties = {};
    }

    guardian.r2.OmnitureTracking._properties[propKey] = propValue;
};

guardian.r2.OmnitureTracking.applyProperties = function() {
    // This gets called before the s_code sends back data, applying any
    // additional props needed (LiveBlogs uses this)
    if (typeof guardian.r2.OmnitureTracking._properties != 'undefined') {
        jQ.each(guardian.r2.OmnitureTracking._properties, function(key, val) {
            s[key] = val;
        });
    }
};

guardian.r2.OmnitureTracking.enableComponentTracking = function() {


    jQ('body').delegate(".trackable-component a", "click", function(event){

        var link = jQ(this),
            container = link.parents('.trackable-component'),
            componentName = container.data('component'),
            isShareLinks = container.hasClass('share-links');

        if (componentName && isShareLinks) {
            // Share links are tracked a bit differently
            var shareLinkName = link.closest('[data-link-name]').data('link-name');
            guardian.r2.OmnitureTracking.trackSocialShare(shareLinkName, componentName);

        } else if (componentName) {
            // Otherwise track navigation as normal
            var linkName = link.closest('[data-link-name]').data('link-name');

            // Try to get position of this link, if in a list
            var liContainer = link.parents('li').last(),
                position = liContainer.index();

            if (position != -1 && componentName.indexOf('in body link') == -1) {
                componentName += ':Position' + (position+1);
            }

            linkName = linkName ? componentName + ':' + linkName : componentName;

            s.linkTrackVars = 'eVar7,eVar37,events';
            s.linkTrackEvents = 'event37';
            s.eVar37 = componentName;
            s.eVar7 = s.pageName;
            s.events = 'event37';

            var linkHref = link.attr('href');


            if (linkHref && (linkHref.indexOf('#') === 0 || linkHref.indexOf('javascript') === 0)) {
                // Track onpage clicks (ie: not leading to other pages)
                s.tl(true,'o',linkName);

            } else {
                // Otherwise, if this is a navigation link, and it doesn't have the opt-out class ('no-omni-tracking'), track it
                if ( !link.hasClass( 'no-omni-tracking' ) ) {
                    guardian.r2.OmnitureTracking.storeNavInteraction(link, linkName);
                }
            }


        }

    });
};


guardian.r2.OmnitureTracking.storeNavInteraction = function(linkNode, linkName) {
    var keyName = 's_ni',
        linkHref = linkNode.attr('href'),
        domain = linkHref.split('/')[2],
        isSameDomain = (domain == document.domain),
        isWithinSameDomain = guardian.r2.OmnitureTracking.isWithinSameDomain(linkHref, document.domain),
        isCrossingEditionDomains = (document.domain.indexOf('www.guardian.co.uk')!=-1 && domain.indexOf('www.guardiannews.com')!=-1) ||
                                    (document.domain.indexOf('www.guardiannews.com')!=-1 && domain.indexOf('www.guardian.co.uk')!=-1);
        success = false;

    // 1. If we're on the same domain, try with sessionStorage
    if (isSameDomain) {
        try {
            sessionStorage.setItem(keyName, linkName);
            success = true;
        } catch(e) {
            success = false;
        }
    }

    // 2. Otherwise fallback to cookies if we're on the same domain
    if (!success && isWithinSameDomain) {
        var splitDomain = document.domain.split('.'),
            localDomain =  '.' + splitDomain.slice(splitDomain.length-2).join('.');

        jQ.cookie(keyName, linkName, {domain:localDomain, path:'/'});

        // Check that the cookie has been set correctly
        success = (jQ.cookie(keyName) == linkName) ? true : false;
    }


    // 3. If we still fail, set as querystring
    // Note: Crossing edition domains (.co.uk/.com) is excluded so we don't end up with dirty URLs
    if (!success &&
        guardian.r2.OmnitureTracking.isGuDomain(domain) &&
        !isCrossingEditionDomains) {
            var separator = (linkHref.indexOf('?') == -1) ? '?' : '&';
            linkNode.attr('href', linkHref + separator + 'guni=' + linkName);
    }
};


guardian.r2.OmnitureTracking.trackSocialShare = function(shareName, componentName) {
    var s = s_gi(s_account);

    // GooglePlus doesn't tell us the container of the clicked button
    // so we have to do it here
    if (shareName == 'google plus') {
        componentName = guardian.r2.OmnitureTracking.contentType + ':' + componentName;
    }

    s.events = 'event16,event37';
    s.eVar12 = shareName;
    s.eVar37 = componentName;
    s.linkTrackVars = 'events,eVar12,eVar37,' + // Share props
                      'channel,prop9,prop19,prop47,prop23,prop73,prop74,prop75,' + // Page props
                      'prop3,prop4,prop6,prop7,prop10,prop48,prop64,prop65,prop66,eVar70'; // Content props

    s.linkTrackEvents = s.events;
    s.tl(true, 'o', 'Sharing in social network');
};


// This checks if the given domain is a guardian domain
guardian.r2.OmnitureTracking.isGuDomain = function(domain) {
    var guDomains = s.linkInternalFilters.split(',');
    for (var i=0; i<guDomains.length; i++) {
        if (domain.indexOf(guDomains[i]) != -1) {
            return true;
        }
    }
    return false;
};

// This checks if the given link is within the given domain
guardian.r2.OmnitureTracking.isWithinSameDomain = function(linkHref, domain) {
    var linkDomain = linkHref.match(/https?:\/\/.*?\.(.*(\.co\.uk|\.com)).*/)[1];
    domain = domain.replace('www.', '');

    return (domain == linkDomain) ? true : false;
};


// If there's YouTube videos on the page, load the Omniture Media module
jQ(function() {
    var hasYouTubeVideos = jQ('iframe[src*="//www.youtube.com"]').length;
    if (typeof(s_loadMediaModule) != 'undefined' && hasYouTubeVideos) {
        var l2content = s.prop11 || '';
        s_loadMediaModule(s);
        s_trackVideoContent(s, l2content, 'YouTube', false);
    }
});
/* 7c3dab8b0098ca9f73f088023b30b1efcddaaf12/common/scripts/guardian.r2.ShareThis.js */
ensurePackage('guardian.r2');
guardian.r2.ShareThis = (function () {
    jQ(document).ready(function () {
        jQ('input.share-this-tracking, a.share-this-tracking, .share-this-tracking a').bind('click', function(e) {
            var is_input = this.tagName.toLowerCase() === 'input' ? true : false,
                elem = jQ(this),
                track_name = elem.data('link-name'),
                redirect = elem.data('trackredirect') === 'false' ? false : true,
                container = elem.parents('.trackable-component'),
                componentName = container.data('component');

            // Omniture tracking
            guardian.r2.OmnitureTracking.trackSocialShare(track_name, componentName);

            // Revenue science
            rs_logSocialNetwork(track_name);

            if (!is_input) {
                e.preventDefault();
                var share_window = window.open(elem.attr('href'), 'gu_share', 'scrollbars=1,height=500,width=1010');
                return false;
            }
        });
    });
})();
/* 7c3dab8b0098ca9f73f088023b30b1efcddaaf12/common/scripts/mediamath-tag.js */
(function($) {
    // MediaMath Tag
    function getReferrerSearchTerms() {
        var href = document.referrer,
            hashes = href.slice(href.indexOf('?') + 1).split('&'),
            parameters = ['q','p','as_q','as_epq','as_oq','query','search','wd','ix'];

        for(var i=0; i<hashes.length; i++) {
            var hash = hashes[i].split('='),
                key = hash[0],
                term;

            if (parameters.indexOf(key) != -1) {
               term = unescape(hash[1]);
               term = term.replace(/\+/g, ' ');
               return term;
            }
        }

        return '';
    }

    var tagBaseUrl = '//pixel.mathtag.com/event/img?mt_id=328671&mt_adid=114751',
        keywords   = jQ('meta[name="keywords"]').attr('content'),
        tagObject  = {
            v1: sitePrefixUrl + guardian.page.contentId,
            v2: guardian.page.section,
            v3: getReferrerSearchTerms(),
            v4: document.referrer,
            v5: keywords ? keywords.replace(/,/g,'|') : '',
            v6: guardian.page.type
        };

    // Fire off beacon
    var tagUrl = tagBaseUrl + '&' + jQ.param(tagObject),
        tagImg = new Image();

    tagImg.src = tagUrl;
})(jQ);
/* 7c3dab8b0098ca9f73f088023b30b1efcddaaf12/common/scripts/modules/sticky-sidebar.js */
(function(jQ,k,m,i,d){var e=jQ(i),g="waypoint.reached",b=function(o,n){o.element.trigger(g,n);if(o.options.triggerOnce){o.element[k]("destroy")}},h=function(p,o){var n=o.waypoints.length-1;while(n>=0&&o.waypoints[n].element[0]!==p[0]){n-=1}return n},f=[],l=function(n){jQ.extend(this,{element:jQ(n),oldScroll:0,waypoints:[],didScroll:false,didResize:false,doScroll:jQ.proxy(function(){var q=this.element.scrollTop(),p=q>this.oldScroll,s=this,r=jQ.grep(this.waypoints,function(u,t){return p?(u.offset>s.oldScroll&&u.offset<=q):(u.offset<=s.oldScroll&&u.offset>q)}),o=r.length;if(!this.oldScroll||!q){jQ[m]("refresh")}this.oldScroll=q;if(!o){return}if(!p){r.reverse()}jQ.each(r,function(u,t){if(t.options.continuous||u===o-1){b(t,[p?"down":"up"])}})},this)});jQ(n).scroll(jQ.proxy(function(){if(!this.didScroll){this.didScroll=true;i.setTimeout(jQ.proxy(function(){this.doScroll();this.didScroll=false},this),jQ[m].settings.scrollThrottle)}},this)).resize(jQ.proxy(function(){if(!this.didResize){this.didResize=true;i.setTimeout(jQ.proxy(function(){jQ[m]("refresh");this.didResize=false},this),jQ[m].settings.resizeThrottle)}},this));e.load(jQ.proxy(function(){this.doScroll()},this))},j=function(n){var o=null;jQ.each(f,function(p,q){if(q.element[0]===n){o=q;return false}});return o},c={init:function(o,n){this.each(function(){var u=jQ.fn[k].defaults.context,q,t=jQ(this);if(n&&n.context){u=n.context}if(!jQ.isWindow(u)){u=t.closest(u)[0]}q=j(u);if(!q){q=new l(u);f.push(q)}var p=h(t,q),s=p<0?jQ.fn[k].defaults:q.waypoints[p].options,r=jQ.extend({},s,n);r.offset=r.offset==="bottom-in-view"?function(){var v=jQ.isWindow(u)?jQ[m]("viewportHeight"):jQ(u).height();return v-jQ(this).outerHeight()}:r.offset;if(p<0){q.waypoints.push({element:t,offset:null,options:r})}else{q.waypoints[p].options=r}if(o){t.bind(g,o)}if(n&&n.handler){t.bind(g,n.handler)}});jQ[m]("refresh");return this},remove:function(){return this.each(function(o,p){var n=jQ(p);jQ.each(f,function(r,s){var q=h(n,s);if(q>=0){s.waypoints.splice(q,1)}})})},destroy:function(){return this.unbind(g)[k]("remove")}},a={refresh:function(){jQ.each(f,function(r,s){var q=jQ.isWindow(s.element[0]),n=q?0:s.element.offset().top,p=q?jQ[m]("viewportHeight"):s.element.height(),o=q?0:s.element.scrollTop();jQ.each(s.waypoints,function(u,x){if(!x){return}var t=x.options.offset,w=x.offset;if(typeof x.options.offset==="function"){t=x.options.offset.apply(x.element)}else{if(typeof x.options.offset==="string"){var v=parseFloat(x.options.offset);t=x.options.offset.indexOf("%")?Math.ceil(p*(v/100)):v}}x.offset=x.element.offset().top-n+o-t;if(x.options.onlyOnScroll){return}if(w!==null&&s.oldScroll>w&&s.oldScroll<=x.offset){b(x,["up"])}else{if(w!==null&&s.oldScroll<w&&s.oldScroll>=x.offset){b(x,["down"])}else{if(!w&&o>x.offset){b(x,["down"])}}}});s.waypoints.sort(function(u,t){return u.offset-t.offset})})},viewportHeight:function(){return(i.innerHeight?i.innerHeight:e.height())},aggregate:function(){var n=jQ();jQ.each(f,function(o,p){jQ.each(p.waypoints,function(q,r){n=n.add(r.element)})});return n}};jQ.fn[k]=function(n){if(c[n]){return c[n].apply(this,Array.prototype.slice.call(arguments,1))}else{if(typeof n==="function"||!n){return c.init.apply(this,arguments)}else{if(typeof n==="object"){return c.init.apply(this,[null,n])}else{jQ.error("Method "+n+" does not exist on jQuery "+k)}}}};jQ.fn[k].defaults={continuous:true,offset:0,triggerOnce:false,context:i};jQ[m]=function(n){if(a[n]){return a[n].apply(this)}else{return a.aggregate()}};jQ[m].settings={resizeThrottle:200,scrollThrottle:100};e.load(function(){jQ[m]("refresh")})})(jQuery,"waypoint","waypoints",this);

/* 7c3dab8b0098ca9f73f088023b30b1efcddaaf12/common/scripts/sendtoafriend.js */
guardian.r2.OverlayPanel = function (selector) {

	function close() {
		if (visible) {
			visible = false;
			selector.removeAttr('style');
		}
		return false;
	}

	var visible = false;
	selector.find('a.close-toolbox').click(close);

	function toggle(xPos, yPos) {
		if (visible === false) {
			open(xPos, yPos);
		} else {
			close();
		}
	}

	function open(xPos, yPos) {
		visible = true;
		var x = getXCoordinate(xPos);
		selector.css('left', x).css('top', yPos + 25);
		selector.show();
	}

	function getXCoordinate(xPos) {
		var availableWidth = jQ(document).width();
		// if panel is going to display off the right of the screen, bring it in further
		if (xPos + 450 > availableWidth) {
			return xPos - 450;
		} else {
			return xPos;
		}
	}

	function getSelector() {
		return selector;
	}

	this.toggle = toggle;
	this.close = close;
	this.getSelector = getSelector;
};

guardian.r2.OverlayController = (function () {

	var anchors = [ 'embed-link', 'send-share', 'send-email', 'contact-link', 'history-link', 'settings-link' ];
	var panels = [];
	var activePanel = null;

	function init() {
		jQ('body').append('<div id="dialogue"></div>');
		jQ('div.toolbox-popup').appendTo('#dialogue');
		bind();
	}

	function bind() {
		var i= anchors.length;
		while(i--) {
			bindAnchors(anchors[i]);
		}
		
		jQ('body').click(function () {
			if (activePanel) {
				activePanel.close();
			}
		});

		jQ('.send-inner').click(function (e) {
			e.stopPropagation();
		});
	}

	function bindAnchors(anchor) {
		var panel = new guardian.r2.OverlayPanel(jQ('#' + anchor + '-box'));
		panels.push(panel);
		jQ('a.' + anchor).bind('click', function (target) {
			return function () {
				var offset = jQ(this).offset();
				if (activePanel && activePanel.getSelector() !== target.getSelector()) {
					activePanel.close();
				}
				activePanel = target;
				target.toggle(offset.left, offset.top);
				return false;
			};
		}(panel));
	}

	jQ(init);
})();
/* 7c3dab8b0098ca9f73f088023b30b1efcddaaf12/common/scripts/signinTopNav.js */
jQ(document).ready(function () {
	var dropdowns = jQ('.drop-down');
	jQ('.drop-down').bind('click', function() {
		jQ(this).focus();
	});
	jQ(window).bind('click', function() {
		dropdowns.blur();
	});

	jQ('#drop-down-edition span a').click(function () {
		var currentEdition    = jQ('#drop-down-edition span.current-edition').text(),
			switchToEdition   = jQ(this).text(),
			editionSwitchDesc = "Edition Change: " + currentEdition + " to " + switchToEdition;

		guardian.r2.OmnitureTracking({
			"evars": [{"key": "37", "value": editionSwitchDesc }],
			"events": [{"id": "37"}],
			"description": editionSwitchDesc
		});
	});
});
