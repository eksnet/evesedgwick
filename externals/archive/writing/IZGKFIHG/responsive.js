/* Copyright © 2012 Michael Rhodes all rights reserved. Unauthorized use or distribution is prohibited */

"use strict";

var responsive = {
	orientation: undefined,
	scale: undefined,
	device: undefined,
	mobile: false,
	detectMobile: false,
	touch: Modernizr.touch,
	widths: [0,480,960,1080,100000],
	classes: ['tiny','small','medium','large'],
	config: null,
	disabled: false,
	currentLocationHash: null,
	hijax: false,
	idCount: 0
};

$(document).ready( function() {
	var params = getQueryStringParams();
	if(params['flushlocalstorage']) {
		localStorage.clear();
		sessionStorage.clear();
		alert('local storage flushed');
	}
	
	$('body[data-jsclass]').each( function () {
		if(!$(this).data('iowajsinstance')) {
			var handler = null;
			//try {
				handler = new window[$(this).data('jsclass')](this);
				$(this).data('iowajsinstance',handler);	
				beResponsive(handler.config);
			//} 
			//catch(err) {
			//	alert('Could not initialize responsive behavior jsClass:' + $(this).data('jsclass') + ' ' + err);
			//}
		}
	});
});

function disableResponsive(scale) {
	$('body').addClass('disable-responsive');
	responsive.disabled = true;
	responsive.forceScale = scale;
	$(window).trigger('resize');
}

function enableResponsive(scale) {
	$('body').removeClass('disable-responsive');
	responsive.disabled = false;
	responsive.forceScale = '';
	$(window).trigger('resize');
}

function beResponsive(config) {
	responsive.config = config;
	
	if(config.widths) {
		responsive.widths = config.widths;
	}

	if(config.classes) {
		responsive.classes = config.classes;
	}
	
	if(navigator.userAgent.match(/iPhone/i)) {
		responsive.device = 'iphone';
	}
		
	if(navigator.userAgent.match(/iPod/i)) {
		responsive.device = 'ipod';
	}

	if(navigator.userAgent.match(/ipad/i)) {
		responsive.device = 'ipad';
	}

	if(navigator.userAgent.match(/android/i)) {
		responsive.device = 'android';
	}
	
	if(responsive.device && responsive.config && responsive.config.mobileDevices) {
		for(var i = 0; i < responsive.config.mobileDevices.length; i++) {
			if(responsive.device === responsive.config.mobileDevices[i].toLowerCase()) {
				responsive.detectMobile = true;
				break;
			}
		}
	}
	
	forcedOverrides();
	
	if(redirecting()) { return; }

	if(responsive.device) {
		$('body').addClass(responsive.device);
	}
	
	if(responsive.touch) {
		$('body').removeClass('no-touch').addClass('touch');
	}
	else {
		$('body').removeClass('touch').addClass('no-touch');
	}

	if(responsive.mobile) {
		$('body').removeClass('no-mobile').addClass('mobile');
	}
	else {
		$('body').removeClass('mobile').addClass('no-mobile');
	}

	$(window).resize(function() {
		detectGeometry();			
	});
	
	if(responsive.mobile) {
		$(document).bind("pagechange", function( event, data ){
			// initialize hijax page objects
			instantiateObjects(event.type);
			fireEvents();
		});

		$(document).bind("pagebeforehide", function( event, data ){
			$(data.nextPage).find("[data-jsclass]").each( function () {
				if($(this).data('iowajsinstance') && $(this).data('iowajsinstance').start) {
					$(this).data('iowajsinstance').start('pageLoad');
				}
			});
		});

		$(document).bind("pagebeforeshow", function( event, data ){
			$(data.prevPage).find("[data-jsclass]").each( function () {
				if($(this).data('iowajsinstance') && $(this).data('iowajsinstance').stop) {
					$(this).data('iowajsinstance').stop();
				}
			});
		});
		
		$(window).bind( 'orientationchange', function(e){
			$('body').removeClass('portrait').removeClass('landscape');
			$('body').addClass(e.orientation);
			responsive.orientation = e.orientation;
			fireEvents();
		});
	}

	// initialize page

	detectGeometry();
	
	instantiateObjects();

	$(window).bind('scroll', function () {
		lazyLoad();
	});
	
	fireEvents();

	if(responsive.config.hijax && (responsive.device || responsive.config.forceHijax)) {
		if(location.hash) {
			watchLocationHash();
		}
		else {
			if(!responsive.currentLocationHash) {
				var uri = parseUri(document.location.href);
				var path = 'path' + uri.path;
				if(uri.query) {
					path += '?' + uri.query;
				}
				setLocationHash(path);
				responsive.currentLocationHash = '#' + path;
			}
		}

		$(window).hashchange( function () {
			watchLocationHash();
		});

		hijaxLinks($('body'));
	}
}

function detectGeometry (){
	var newDisplayOrientation = responsive.orientation;
	var newDisplayScale = responsive.classes[responsive.widths.length - 1];

	if($(window).width() < $(window).height()) {
		newDisplayOrientation = 'portrait';
	}
	else {
		newDisplayOrientation = 'landscape';
	}
	
	var i;
	
	if(responsive.disabled) {
		newDisplayScale = responsive.forceScale;
	}
	else {
		for(i = 0; i < responsive.widths.length - 1; i++) {
			if($(window).width() >= responsive.widths[i] && $(window).width() < responsive.widths[i + 1]) {
				newDisplayScale = responsive.classes[i];
				break;
			}
		}
	}
	
	var changed = 0;
	if(newDisplayScale !== responsive.scale) {
		++changed;
		for(i = 0; i < responsive.classes.length; i++) {		
			$('body').removeClass(responsive.classes[i]);
		}
		$('body').addClass(newDisplayScale);
	}

	responsive.scale = newDisplayScale;
	
	if(newDisplayOrientation !== responsive.orientation) {
		++changed;
		$('body').removeClass('portrait').removeClass('landscape');
		$('body').addClass(newDisplayOrientation);
	}
	
	responsive.orientation = newDisplayOrientation;
	
	if(changed) { 
		fireEvents();
	}
	
	setHints();
}

// instantiate js objects for all elements that have 'data-jsclass' defined
function instantiateObjects(event) { 
	$("*[data-jsclass]").each( function () {
		if(!$(this).data('iowajsinstance')) {
			var handler = null;
			try {
				handler = new window[$(this).data('jsclass')](this);
				$(this).data('iowajsinstance',handler);
				
				if($(this).data('iowajsinstance').start) {
					$(this).data('iowajsinstance').start(event);
				}
				
				$(this).data('iowajsinstanceinitialized',1);
			} 
			catch(err) {
				alert('Could not initialize element:' + this.id + ' jsclass:' + $(this).data('jsclass') + ' error:' + err);
			}
		}
	});
}

// notify elements that environment has changed
function fireEvents() {
	$("*[data-jsclass]").each( function () {
		if($(this).data('iowajsinstance') && $(this).data('iowajsinstance').watchScale) {
			if($(this).data('iowajsinstance')._currentScale != responsive.scale) {
				$(this).data('iowajsinstance')._currentScale = responsive.scale;
				$(this).data('iowajsinstance').watchScale(responsive.scale);
			}
		}
	});
		
	$("*[data-jsclass]").each( function () {
		if($(this).data('iowajsinstance') && $(this).data('iowajsinstance').watchOrientation) {
			if($(this).data('iowajsinstance')._currentOrientation != responsive.orientation) {
				$(this).data('iowajsinstance')._currentOrientation = responsive.orientation;
				$(this).data('iowajsinstance').watchOrientation(responsive.orientation);
			}
		}
	});

	lazyLoad();
}

// manage lazy image & ajax loading

function lazyLoad() {
	$("*[data-jsclass]").each( function () {
		if($(this).data('iowajsinstance') && $(this).data('iowajsinstance').lazy) {
			$(this).data('iowajsinstance').lazy();
		}
	});
	
	ajaxLayer();
}

// responsive wrapper

function responsiveWrapper(e) {
	this.element = e;
	this.active = false;
	
	if(!this.element.id) {
		this.element.id = 'objectid-' + (++responsive.idCount);
	}
	
	this.start = function(mode) {
		this.stop();
		$(window).bind('resize.' + this.element.id,
			function (instance) {
				return function (e) {
					if(instance.active) {
						instance.handleResize();
					}
				}
			}(this)
		);
		this.handleResize();
	};
	
	this.stop = function() {
		$(window).unbind('resize.' + this.element.id);
	};
	
	this.watchScale = function(scale) {
		if($(this.element).data('responsive-scales')) {
			this.active = false;
			var scales = $(this.element).data('responsive-scales').split(',');
			for(var i = 0; i < scales.length; i++) {
				if(scales[i] === scale) {
					this.active = true;
				}
			}
		}
		else {
			this.active = true;
		}
		
		if(!this.active) {
			//console.log('responsiveWrapper: ' + this.element.id + ' inactive');
			if($(this.element).data('constrain') === 'width' || $(this.element).data('constrain') === 'both') {
				$(this.element).css({'width':''});
			}
			if($(this.element).data('constrain') === 'height' || $(this.element).data('constrain') === 'both') {
				$(this.element).css({'height':''});
			}
			
			$(this.element).find("[data-jsclass]").each( function () {
				if($(this).data('iowajsinstance') && $(this).data('iowajsinstance').watchResize) {
					//console.log('responsiveWrapper: calling final watchResize on ' + $(this).attr('id'));
					$(this).data('iowajsinstance').watchResize();
				}
			});	
		}
		else {
			//console.log('responsiveWrapper: ' + this.element.id + ' active');
		}
	};
	
	this.handleResize = function() {
		var w,h;
		
		if($(this.element).data('constrain') === 'width' || $(this.element).data('constrain') === 'both') {
			if($(this.element).data('follow') === 'window') {
				w = $(window).width();
			}
			else {
				if($(this.element).data('follow')) {
					var selector = $(this.element).data('follow');
					w = $(selector).width();
				}
				else {
					w = $(this.element).parent().width();
				}
			}

			//console.log('responsiveWrapper: ' + this.element.id + ' width:' + w + ' follow:' + $(this.element).data('follow'));

			$(this.element).outerWidth(w);
		}
		
		if($(this.element).data('constrain') === 'height' || $(this.element).data('constrain') === 'both') {
			if($(this.element).data('follow') === 'window') {
				h = $(window).height();
			}
			else {
				if($(this.element).data('follow')) {
					var selector = $(this.element).data('follow');
					h = $(selector).height();
				}
				else {
					h = $(this.element).parent().height();
				}
			}

			//console.log('responsiveWrapper: ' + this.element.id + ' height:' + h);
			
			$(this.element).height(h);
		}

		$(this.element).find("[data-jsclass]").each( function () {
			if($(this).data('iowajsinstance') && $(this).data('iowajsinstance').watchResize) {
				//console.log('responsiveWrapper: calling watchResize on ' + $(this).attr('id'));
				$(this).data('iowajsinstance').watchResize();
			}
		});	
	}
};

// responsive image wrapper

function imageWrapper(e) {
	this.element = e;	

	this.img = $(this.element).find('img').first();
	this.crop = $(this.element).data('crop');
	this.current = undefined;
	this.align = [];
	if($(this.element).data('align')) {
		this.align = $(this.element).data('align').split(',');
	}

	//console.log('imageWrapper.instantiate ' + $(this.img).data('lazysrc'));
	
	this.lazy = function (force) {
		if($(this.img).attr('src') === '/lazy.gif') {
			if(force || ($.inviewport(this.img, { threshold:0 } ) && $(this.img).is(':visible'))) {

				//console.log('imageWrapper.lazy ' + $(this.img).data('lazysrc') + ' force:' + force);

				$(this.img).attr('src',$(this.img).data('lazysrc'));
				if(force) {
					this.fitImg();
					$(this.img).show();
				}
				else {
					this.fitImg();
					$(this.img).fadeIn('fast');
				}
				$(this.element).css('background','url(/lazy.gif)');
			}
		}
	};

	this.watchScale = function(scale) {
		//console.log('imageWrapper.watchScale ' + $(this.img).data('lazysrc') + ' scale:' + scale);
		this.fitImg();
		this.currentScale = scale;
	};
	
	this.watchResize = function() {
		this.fitImg();
	};
	
	this.getAlign = function(find) {
		for(var i=0; i < this.align.length; i++) {
			if(this.align[i] === find) {
				return true;
			}
		}
		return false;
	}
	
	this.fitImg = function () {	
		var children = $(this.element).children();

		var test = '';
		for(var i = 0; i < children.length; i++) {	
			var child = children[i];

			var width = $(child).data('width');
			var height = $(child).data('height');
	
			var boxwidth = $(this.element).parent().width();
			var boxheight = $(this.element).parent().height();
	
			var imgRatio = (height / width); 
			var boxRatio = (boxheight / boxwidth); 
			var mult = 1;
	
			if(this.crop) {
				if(imgRatio<boxRatio) { 
					mult = boxheight / height;
				} 
				else { 
					mult = boxwidth / width;
				}
			}
			else if(this.align.length) {
				if(imgRatio>boxRatio) { 
					mult = boxheight / height;
				} 
				else { 
					mult = boxwidth / width;
				}
			}
			else {
				mult = boxwidth / width;
			}
	
			width = width * mult;
			height = height * mult;
			
			if($(child).data('max-width') && width > $(child).data('max-width')) {
				width = $(child).data('max-width');
			}
			
			if($(child).data('max-height') && height > $(child).data('max-height')) {
				height = $(child).data('max-height');
			}
			
			if(this.crop || this.align.length) {
				var top = (boxheight - height) / 2;
				var left = (boxwidth - width) / 2;
				
				if(this.getAlign('top')) {
					top = 0;
				}
		
				if(this.getAlign('bottom')) {
					top = boxheight - height;
				}
				
				if(this.getAlign('left')) {
					left = 0;
				}
		
				if(this.getAlign('right')) {
					left = boxwidth - width;
				}
			}
			else {	
				top = 0;
				left = 0;
			}
			
			test = width + ',' + height + ',' + top + ',' + left;
			if(this.current != test) {
				$(child).css('top',top + 'px');
				$(child).css('left',left + 'px');
				$(child).css('width',width + 'px');
				$(child).css('height',height + 'px');
				if(!this.crop && !this.align.length) {
					$(this.element).css('height',height + 'px');
				}
			}
		}
		this.current = test;
	};
}

// give elements with ajax content a chance to load

function ajaxReload(element) {
	$(element).removeData('iowajsinstanceajaxloaded');
	ajaxLayer(true);
}

function ajaxLayer(noLoading) {
	var ajaxComponents = [];
	var didCache = false;
	$("*[data-deliver=ajax]").each( function () {
		if(!$(this).data('iowajsinstanceajaxloaded') && $(this).data('iowajsinstanceinitialized')) {
			var loadit = false;
			
			if($.inviewport(this,{ threshold:0 }) && $(this).is(':visible')) {		
				if($(this).data('iowajsinstance') && $(this).data('iowajsinstance').want) {
					loadit = $(this).data('iowajsinstance').want();
				}
				else {
					loadit = true;
				}
			}
			
			if(loadit) {
				$(this).data('iowajsinstanceajaxloaded',1);

				var fromCache = false;
				if($(this).data('clientcache')) {
					var clientcachekey = this.id;
					if($(this).data('clientcachekey')) {
						clientcachekey += '-' + $(this).data('clientcachekey');
					}
					fromCache = isCached($(this).data('clientcache'),clientcachekey);
				}
				
				if(fromCache) {
					didCache = true;
					if($(this).data('iowajsinstance') && $(this).data('iowajsinstance').ready) {
						$(this).data('iowajsinstance').ready(fromCache);
					}
					else {
						$(this).html(fromCache.result);
					}			
					if($(this).data('iowajsinstance') && $(this).data('iowajsinstance').start) {
						$(this).data('iowajsinstance').start('ajaxLoad');
					}					
				}
				else {
					var args = undefined;
	
					if($(this).data('iowajsinstance')) {
						if($(this).data('iowajsinstance').getAjaxArgs) {
							args = $(this).data('iowajsinstance').getAjaxArgs();
						}
						else {
							args = $(this).data('iowajsinstance').ajaxArgs;
						}
					}
		
					if(!args) {
						if($(this).html()) {
							args = jQuery.parseJSON($(this).html());
						}
						else {
							args = { input: null };
						}
					}
					
					ajaxComponents.push( {
						'id': this.id,
						'src': $(this).data('ajaxsrc'),
						'args': args.input
					});
					
					if(!noLoading) {
						$(this).addClass('ajax-loading');
						$(this).html('<img src="/loading.gif">');
					}
				}
			}
		}
	});
	
	if(ajaxComponents.length) {
		ajaxRequest(ajaxComponents);
	}
	
	if(didCache) {
		instantiateObjects();
		fireEvents();
	}
}

function ajaxRequest(ajaxComponents) {
	var type = "POST";
	var url = responsive.config.ajaxUrl;
	var data = jQuery.param({ "components": JSON.stringify(ajaxComponents) });
	
	if(responsive.config.ajaxRequestMethod === 'GET') {
		type = "GET";
		url = responsive.config.ajaxUrl + '?components=' + escape(JSON.stringify(ajaxComponents)),
		data = undefined;
	}
	
	$.ajax({
		type: type,
		url: url,
		data: data,
		dataType: 'json',
		success: function(json) {
			if(json.status === 'ok') {
				for(var i = 0; i < json.components.length; i++) {
					var element = $('#' + json.components[i].id);			

					if($(element).data('clientcache')) {
						var clientcachekey = $(element).attr('id');
						if($(element).data('clientcachekey')) {
							clientcachekey += '-' + $(element).data('clientcachekey');
						}

						cacheIt($(element).data('clientcache'),clientcachekey,json.components[i]);
					}

					if($(element).data('iowajsinstance') && $(element).data('iowajsinstance').ready) {
						$(element).data('iowajsinstance').ready(json.components[i]);
					}
					else {
						$('#' + json.components[i].id).html(json.components[i].result); //.show();
					}
					
					if($(element).data('iowajsinstance') && $(element).data('iowajsinstance').start) {
						$(element).data('iowajsinstance').start('ajaxLoad');
					}
				}
				
				for(var i = 0; i < json.components.length; i++) {
					var element = $('#' + json.components[i].id);			
					$(element).removeClass('ajax-loading');
				}

				// ajax might have stuff that needs initialization
				instantiateObjects();
				fireEvents();
			}
			else {
				alert('could not load ajax components ' + json.status);
			}
		},
		error: function (request, status, error) {
			if(request.responseText) {
				alert(request.responseText);
			}
		}
	});
}

// manage geometry cookie hints

function setHints() {
	var classes = '';
	if(responsive.orientation) {
		if(classes) { classes += ' '; }
		classes += responsive.orientation;
	}
	
	if(responsive.scale) {
		if(classes) { classes += ' '; }
		classes += responsive.scale;
	}
	
	if(responsive.device) {
		if(classes) { classes += ' '; }
		classes += responsive.device;
	}
	
	if(responsive.mobile) {
		if(classes) { classes += ' '; }
		classes += 'mobile';
	}
	else {
		if(classes) { classes += ' '; }
		classes += 'no-mobile';
	}
	
	if(responsive.touch) {
		if(classes) { classes += ' '; }
		classes += 'touch';
	}
	else {
		if(classes) { classes += ' '; }
		classes += 'no-touch';
	}
	
	if(classes !== getCookie('responsive')) {
		setCookie('responsive',classes);
	}
}

// mobile device hijax

function setLocationHash(params) {
	location.hash = params;	
}

function watchLocationHash() {
	if(location.hash != responsive.currentLocationHash) {
		responsive.currentLocationHash = location.hash;
		var pathArray = responsive.currentLocationHash.split('/'); 
		if(pathArray[0] == '#path') {
			pathArray.splice(0,1);
			var newPath = '/' + pathArray.join('/');
			hijaxLoad(newPath);
			$("[data-jsclass]").each( function () {
				if($(this).data('iowajsinstance') && $(this).data('iowajsinstance').watchLocationHash) {
					$(this).data('iowajsinstance').watchLocationHash(newPath);
				}
			});
		}
	}
}

function hijaxLoad(path) {
	$.blockUI( { 
		message: $('#hijax-loading'),
		css: { "border":"thin solid black", "border-radius": "4px" }
	} );

	$.ajax({
		type: "GET",
		url: path,
		dataType: 'html',
		success: function(html) {
			window.scrollTo(0,0);
			
			$("[data-hijax]").find("[data-jsclass]").each( function () {
				if($(this).data('iowajsinstance') && $(this).data('iowajsinstance').stop) {
					$(this).data('iowajsinstance').stop();
				}
			});
			
			$("[data-hijax]").each(function() {
				var id = this.id;
				var fragment = $(html).find('#' + id);
				$('#' + id).empty().append(fragment.contents());
			});
			
			instantiateObjects(event.type);

			fireEvents();

			$("[data-hijax]").each(function() {
				var id = this.id;
				hijaxLinks('#' + id);
			});

			$.unblockUI();
		},
		error: function (request, status, error) {
			$.unblockUI();
			if(request.responseText) {
				alert('could not load page.');
			}
		}
	});
}

function loadPage(url) {
	if(responsive.hijax) {
		var regex = new RegExp('^http');
		
		var loc = parseUri(document.location.href);
		var hostregex = new RegExp('^'+loc.protocol+'://' + loc.host);

		var href = url;
		if(!regex.exec(href) || hostregex.exec(href)) {
			if(regex.exec(href)) {
				var uri = parseUri(href);
				href = uri.path;
			}
			setLocationHash('path' + href);
		}
		else {
			document.location.href = url;
		}
	}
	else {
		document.location.href = url;
	}
}

function hijaxLinks(node) {
	responsive.hijax = true;

	var regex = new RegExp('^(http|javascript|mailto|#)');
	
	$(node).find('a').each(function() {
		var href = $(this).attr('href');
		var target = $(this).attr('target');
		if(href && href.indexOf("binary-data") == -1) {
			if(!target && !regex.exec(href)) {			
				$(this).click(function(e) {
					e.preventDefault();
					setLocationHash('path' + href);
				});
			}
		}
	});
}

// mobile domain redirects

function redirecting() {
	var redirecting = false;
	if(responsive.config.mobileDomain && responsive.config.noMobileDomain) {
		var uri = parseUri(document.location.href);

		if(uri.host.toLowerCase() === responsive.config.mobileDomain) {
			responsive.mobile = true;
		}

		var redirect;
		
		if(responsive.config.mobileDevices) {
			if(responsive.detectMobile) {
				if(uri.host.toLowerCase() !== responsive.config.mobileDomain) {
					if(!getCookie('mobile-opt-out')) {
						redirect = uri.protocol + '://' + responsive.config.mobileDomain + uri.path;
						if(uri.query) {
							redirect += '?' + uri.query;
						}
						document.location.href = redirect;
						redirecting = true;
					}
				}
			}
			else {
				if(uri.host.toLowerCase() !== responsive.config.noMobileDomain) {
					if(!getCookie('mobile-opt-in')) {
						redirect = uri.protocol + '://' + responsive.config.noMobileDomain + uri.path;
						if(uri.query) {
							redirect += '?' + uri.query;
						}
						document.location.href = redirect;
						redirecting = true;
					}
				}
			}
		}
	}

	return redirecting;
}

function mobileOptIn() {
	deleteCookie('mobile-opt-out');
	setCookie('mobile-opt-in',1);
	var uri = parseUri(document.location.href.toLowerCase());

	var redirect = uri.protocol + '://' + responsive.config.mobileDomain + uri.path;
	if(uri.query) {
		redirect += '?' + uri.query;
	}
	document.location.href = redirect;
}

function mobileOptOut() {
	deleteCookie('mobile-opt-in');
	setCookie('mobile-opt-out',1);
	var uri = parseUri(document.location.href.toLowerCase());

	var redirect = uri.protocol + '://' + responsive.config.noMobileDomain + uri.path;
	if(uri.query) {
		redirect += '?' + uri.query;
	}
	document.location.href = redirect;
}


// debug

function forcedOverrides() {
	var dev = getCookie('force_device');
	if(dev) {
		responsive.device = dev;
		if(dev !== 'iPad') {
			responsive.mobile = true;
		}
	}
	
	if(getCookie('force_touch')) {
		responsive.touch = true;
	}

	if(getCookie('force_mobile')) {
		responsive.mobile = true;
	}
}

function forceDevice(device) {
	if(!device) {
		deleteCookie('force_device');
	}
	else {
		setCookie('force_device',device);
	}
	document.location.href=document.location.href;
}

function forceTouchToggle() {
	if(getCookie('force_touch')) {
		deleteCookie('force_touch');
	}
	else {
		setCookie('force_touch',1);
	}
	document.location.href=document.location.href;
}

function forceMobileToggle() {
	if(getCookie('force_mobile')) {
		deleteCookie('force_mobile');
	}
	else {
		setCookie('force_mobile',1);
	}
	document.location.href=document.location.href;
}

function debug(message) {
	$('.debug').html(message);
}

// localStorage

function cacheIt(type,key,value) {
	//console.log('cacheIt: ' + type + ' key:' + key);

	if(type === 'localStorage') {
		if(Modernizr.localstorage) {
			localStorage[key] = JSON.stringify(value);
		}
	}
	else if (type === 'sessionStorage') {
		if(Modernizr.sessionstorage) {
			sessionStorage[key] = JSON.stringify(value);
		}
	}
}

function isCached(type,key) {
	var value;
	
	if(type === 'localStorage') {
		if(Modernizr.localstorage) {
			value = localStorage[key];
		}
	}
	else if (type === 'sessionStorage') {
		if(Modernizr.sessionstorage) {
			value = sessionStorage[key];
		}
	}
	
	if(value != undefined) {
		value = JSON.parse(value);
		//console.log('isCached: ' + type + ' key:' + key + ' hit');
	}
	else {
		//console.log('isCached: ' + type + ' key:' + key + ' miss');
	}

	return value;
}


// cookies 

function getCookie(key) {
	return $.cookie(key);
}

function setCookie(key,value,expires) {
	var options = {
					path:'/',
					domain: responsive.config.cookieDomain,
					expires: expires
	};

	$.cookie(key,value, options);
}

function deleteCookie(key) {
	setCookie(key,null);
}

function getQueryStringParams() {
	var params = new Array;
	
	var queryString = String (document.location).split ('?')[1];
	if (!queryString) return false;
	
	var pairs = queryString.split('&');
	
	for (var i = 0 ; i < pairs.length; i++) {
		var kv = pairs[i].split('=');
		params[kv[0]] = kv[1];
	}
	
	return params;
}


// call method for element jsclass
// $(element).iowaInstance('method',arg,arg...)

(function( $ ){
	$.fn.iowaInstance = function( method, a0,a1,a2,a3,a4,a5,a6,a7,a8,a9 ) {

		return this.each(function() {

			var $this = $(this);

			if($this.data('jsclass')) {
				if($this.data('iowajsinstance')) {
					if($this.data('iowajsinstance')[method]) {
						return $this.data('iowajsinstance')[method](a0,a1,a2,a3,a4,a5,a6,a7,a8,a9);
					}
					else {
						alert($this.data('jsclass') + ' has no method ' + method);
					}
				}
				else {
					// alert($this.data('jsclass') + ' has not been instansiated');
				}
			}
			else {
				alert('jsclass not defined for element');
			}
		});
	};
})( jQuery );

// ***********************************
// ************* plugins *************
// ***********************************

// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License

function parseUri (str) {
	var	o   = parseUri.options,
		m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
		uri = {},
		i   = 14;

	while (i--) { uri[o.key[i]] = m[i] || ""; }

	uri[o.q.name] = {};
	uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
		if ($1) { uri[o.q.name][$1] = $2; }
	});

	return uri;
}

parseUri.options = {
	strictMode: false,
	key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
	q:   {
		name:   "queryKey",
		parser: /(?:^|&)([^&=]*)=?([^&]*)/g
	},
	parser: {
		strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
		loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
	}
};


/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
**/

jQuery.cookie = function (key, value, options) {

    // key and at least value given, set cookie...
    if (arguments.length > 1 && String(value) !== "[object Object]") {
        options = jQuery.extend({}, options);

        if (value === null || value === undefined) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        value = String(value);

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? value : encodeURIComponent(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};

/*
 * Viewport - jQuery selectors for finding elements in viewport
 *
 * Copyright (c) 2008-2009 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *  http://www.appelsiini.net/projects/viewport
 *
 */
(function($) {
    
    $.belowthefold = function(element, settings) {
        var fold = $(window).height() + $(window).scrollTop();
        return fold <= $(element).offset().top - settings.threshold;
    };

    $.abovethetop = function(element, settings) {
        var top = $(window).scrollTop();
        return top >= $(element).offset().top + $(element).height() - settings.threshold;
    };
    
    $.rightofscreen = function(element, settings) {
        var fold = $(window).width() + $(window).scrollLeft();
        return fold <= $(element).offset().left - settings.threshold;
    };
    
    $.leftofscreen = function(element, settings) {
        var left = $(window).scrollLeft();
        return left >= $(element).offset().left + $(element).width() - settings.threshold;
    };
    
    $.inviewport = function(element, settings) {
        return !$.rightofscreen(element, settings) && !$.leftofscreen(element, settings) && !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
    };
    
    $.extend($.expr[':'], {
        "below-the-fold": function(a, i, m) {
            return $.belowthefold(a, {threshold : 0});
        },
        "above-the-top": function(a, i, m) {
            return $.abovethetop(a, {threshold : 0});
        },
        "left-of-screen": function(a, i, m) {
            return $.leftofscreen(a, {threshold : 0});
        },
        "right-of-screen": function(a, i, m) {
            return $.rightofscreen(a, {threshold : 0});
        },
        "in-viewport": function(a, i, m) {
            return $.inviewport(a, {threshold : 0});
        }
    }); 
})(jQuery);

/*
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,e,b){var c="hashchange",h=document,f,g=$.event.special,i=h.documentMode,d="on"+c in e&&(i===b||i>7);function a(j){j=j||location.href;return"#"+j.replace(/^[^#]*#?(.*)$/,"$1")}$.fn[c]=function(j){return j?this.bind(c,j):this.trigger(c)};$.fn[c].delay=50;g[c]=$.extend(g[c],{setup:function(){if(d){return false}$(f.start)},teardown:function(){if(d){return false}$(f.stop)}});f=(function(){var j={},p,m=a(),k=function(q){return q},l=k,o=k;j.start=function(){p||n()};j.stop=function(){p&&clearTimeout(p);p=b};function n(){var r=a(),q=o(m);if(r!==m){l(m=r,q);$(e).trigger(c)}else{if(q!==m){location.href=location.href.replace(/#.*/,"")+q}}p=setTimeout(n,$.fn[c].delay)}$.browser.msie&&!d&&(function(){var q,r;j.start=function(){if(!q){r=$.fn[c].src;r=r&&r+a();q=$('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){r||l(a());n()}).attr("src",r||"javascript:0").insertAfter("body")[0].contentWindow;h.onpropertychange=function(){try{if(event.propertyName==="title"){q.document.title=h.title}}catch(s){}}}};j.stop=k;o=function(){return a(q.location.href)};l=function(v,s){var u=q.document,t=$.fn[c].domain;if(v!==s){u.title=h.title;u.open();t&&u.write('<script>document.domain="'+t+'"<\/script>');u.close();q.location.hash=v}}})();return j})()})(jQuery,this);

/*!
 * jQuery blockUI plugin
 * Version 2.43 (29-JUL-2012)
 * @requires jQuery v1.2.3 or later
 *
 * Examples at: http://malsup.com/jquery/block/
 * Copyright (c) 2007-2010 M. Alsup
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Thanks to Amir-Hossein Sobhi for some excellent contributions!
 */

;(function() {

	function setup($) {
		if (/1\.(0|1|2)\.(0|1|2)/.test($.fn.jquery) || /^1.1/.test($.fn.jquery)) {
			alert('blockUI requires jQuery v1.2.3 or later!  You are using v' + $.fn.jquery);
			return;
		}

		$.fn._fadeIn = $.fn.fadeIn;

		var noOp = function() {};

		// this bit is to ensure we don't call setExpression when we shouldn't (with extra muscle to handle
		// retarded userAgent strings on Vista)
		var mode = document.documentMode || 0;
		var setExpr = $.browser.msie && (($.browser.version < 8 && !mode) || mode < 8);
		var ie6 = $.browser.msie && /MSIE 6.0/.test(navigator.userAgent) && !mode;

		// global $ methods for blocking/unblocking the entire page
		$.blockUI   = function(opts) { install(window, opts); };
		$.unblockUI = function(opts) { remove(window, opts); };

		// convenience method for quick growl-like notifications  (http://www.google.com/search?q=growl)
		$.growlUI = function(title, message, timeout, onClose) {
			var $m = $('<div class="growlUI"></div>');
			if (title) $m.append('<h1>'+title+'</h1>');
			if (message) $m.append('<h2>'+message+'</h2>');
			if (timeout == undefined) timeout = 3000;
			$.blockUI({
				message: $m, fadeIn: 700, fadeOut: 1000, centerY: false,
				timeout: timeout, showOverlay: false,
				onUnblock: onClose,
				css: $.blockUI.defaults.growlCSS
			});
		};

		// plugin method for blocking element content
		$.fn.block = function(opts) {
			var fullOpts = $.extend({}, $.blockUI.defaults, opts || {});
			this.each(function() {
				var $el = $(this);
				if (fullOpts.ignoreIfBlocked && $el.data('blockUI.isBlocked'))
					return;
				$el.unblock({ fadeOut: 0 });
			});

			return this.each(function() {
				if ($.css(this,'position') == 'static')
					this.style.position = 'relative';
				if ($.browser.msie)
					this.style.zoom = 1; // force 'hasLayout'
				install(this, opts);
			});
		};

		// plugin method for unblocking element content
		$.fn.unblock = function(opts) {
			return this.each(function() {
				remove(this, opts);
			});
		};

		$.blockUI.version = 2.42; // 2nd generation blocking at no extra cost!

		// override these in your code to change the default behavior and style
		$.blockUI.defaults = {
			// message displayed when blocking (use null for no message)
			message:  '<h1>Please wait...</h1>',

			title: null,	  // title string; only used when theme == true
			draggable: true,  // only used when theme == true (requires jquery-ui.js to be loaded)

			theme: false, // set to true to use with jQuery UI themes

			// styles for the message when blocking; if you wish to disable
			// these and use an external stylesheet then do this in your code:
			// $.blockUI.defaults.css = {};
			css: {
				padding:	0,
				margin:		0,
				width:		'30%',
				top:		'40%',
				left:		'35%',
				textAlign:	'center',
				color:		'#000',
				border:		'3px solid #aaa',
				backgroundColor:'#fff',
				cursor:		'wait'
			},

			// minimal style set used when themes are used
			themedCSS: {
				width:	'30%',
				top:	'40%',
				left:	'35%'
			},

			// styles for the overlay
			overlayCSS:  {
				backgroundColor: '#000',
				opacity:	  	 0.6,
				cursor:		  	 'wait'
			},

			// styles applied when using $.growlUI
			growlCSS: {
				width:  	'350px',
				top:		'10px',
				left:   	'',
				right:  	'10px',
				border: 	'none',
				padding:	'5px',
				opacity:	0.6,
				cursor: 	'default',
				color:		'#fff',
				backgroundColor: '#000',
				'-webkit-border-radius': '10px',
				'-moz-border-radius':	 '10px',
				'border-radius': 		 '10px'
			},

			// IE issues: 'about:blank' fails on HTTPS and javascript:false is s-l-o-w
			// (hat tip to Jorge H. N. de Vasconcelos)
			iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank',

			// force usage of iframe in non-IE browsers (handy for blocking applets)
			forceIframe: false,

			// z-index for the blocking overlay
			baseZ: 1000,

			// set these to true to have the message automatically centered
			centerX: true, // <-- only effects element blocking (page block controlled via css above)
			centerY: true,

			// allow body element to be stetched in ie6; this makes blocking look better
			// on "short" pages.  disable if you wish to prevent changes to the body height
			allowBodyStretch: true,

			// enable if you want key and mouse events to be disabled for content that is blocked
			bindEvents: true,

			// be default blockUI will supress tab navigation from leaving blocking content
			// (if bindEvents is true)
			constrainTabKey: true,

			// fadeIn time in millis; set to 0 to disable fadeIn on block
			fadeIn:  200,

			// fadeOut time in millis; set to 0 to disable fadeOut on unblock
			fadeOut:  400,

			// time in millis to wait before auto-unblocking; set to 0 to disable auto-unblock
			timeout: 0,

			// disable if you don't want to show the overlay
			showOverlay: true,

			// if true, focus will be placed in the first available input field when
			// page blocking
			focusInput: true,

			// suppresses the use of overlay styles on FF/Linux (due to performance issues with opacity)
			applyPlatformOpacityRules: true,

			// callback method invoked when fadeIn has completed and blocking message is visible
			onBlock: null,

			// callback method invoked when unblocking has completed; the callback is
			// passed the element that has been unblocked (which is the window object for page
			// blocks) and the options that were passed to the unblock call:
			//	 onUnblock(element, options)
			onUnblock: null,

			// don't ask; if you really must know: http://groups.google.com/group/jquery-en/browse_thread/thread/36640a8730503595/2f6a79a77a78e493#2f6a79a77a78e493
			quirksmodeOffsetHack: 4,

			// class name of the message block
			blockMsgClass: 'blockMsg',

			// if it is already blocked, then ignore it (don't unblock and reblock)
			ignoreIfBlocked: false
		};

		// private data and functions follow...

		var pageBlock = null;
		var pageBlockEls = [];

		function install(el, opts) {
			var css, themedCSS;
			var full = (el == window);
			var msg = (opts && opts.message !== undefined ? opts.message : undefined);
			opts = $.extend({}, $.blockUI.defaults, opts || {});

			if (opts.ignoreIfBlocked && $(el).data('blockUI.isBlocked'))
				return;

			opts.overlayCSS = $.extend({}, $.blockUI.defaults.overlayCSS, opts.overlayCSS || {});
			css = $.extend({}, $.blockUI.defaults.css, opts.css || {});
			themedCSS = $.extend({}, $.blockUI.defaults.themedCSS, opts.themedCSS || {});
			msg = msg === undefined ? opts.message : msg;

			// remove the current block (if there is one)
			if (full && pageBlock)
				remove(window, {fadeOut:0});

			// if an existing element is being used as the blocking content then we capture
			// its current place in the DOM (and current display style) so we can restore
			// it when we unblock
			if (msg && typeof msg != 'string' && (msg.parentNode || msg.jquery)) {
				var node = msg.jquery ? msg[0] : msg;
				var data = {};
				$(el).data('blockUI.history', data);
				data.el = node;
				data.parent = node.parentNode;
				data.display = node.style.display;
				data.position = node.style.position;
				if (data.parent)
					data.parent.removeChild(node);
			}

			$(el).data('blockUI.onUnblock', opts.onUnblock);
			var z = opts.baseZ;

			// blockUI uses 3 layers for blocking, for simplicity they are all used on every platform;
			// layer1 is the iframe layer which is used to supress bleed through of underlying content
			// layer2 is the overlay layer which has opacity and a wait cursor (by default)
			// layer3 is the message content that is displayed while blocking

			var lyr1 = ($.browser.msie || opts.forceIframe)
				? $('<iframe class="blockUI" style="z-index:'+ (z++) +';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="'+opts.iframeSrc+'"></iframe>')
				: $('<div class="blockUI" style="display:none"></div>');

			var lyr2 = opts.theme
				? $('<div class="blockUI blockOverlay ui-widget-overlay" style="z-index:'+ (z++) +';display:none"></div>')
				: $('<div class="blockUI blockOverlay" style="z-index:'+ (z++) +';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>');

			var lyr3, s;
			if (opts.theme && full) {
				s = '<div class="blockUI ' + opts.blockMsgClass + ' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:'+(z+10)+';display:none;position:fixed">';
	        	if ( opts.title ) {
					s += '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'+(opts.title || '&nbsp;')+'</div>';
	        	}
		        s += '<div class="ui-widget-content ui-dialog-content"></div>';
				s += '</div>';
			}
			else if (opts.theme) {
				s = '<div class="blockUI ' + opts.blockMsgClass + ' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:'+(z+10)+';display:none;position:absolute">';
        		if ( opts.title ) {
          			s += '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'+(opts.title || '&nbsp;')+'</div>'
        		}  
        		s += '<div class="ui-widget-content ui-dialog-content"></div>';
				s += '</div>';
			}
			else if (full) {
				s = '<div class="blockUI ' + opts.blockMsgClass + ' blockPage" style="z-index:'+(z+10)+';display:none;position:fixed"></div>';
			}
			else {
				s = '<div class="blockUI ' + opts.blockMsgClass + ' blockElement" style="z-index:'+(z+10)+';display:none;position:absolute"></div>';
			}
			lyr3 = $(s);

			// if we have a message, style it
			if (msg) {
				if (opts.theme) {
					lyr3.css(themedCSS);
					lyr3.addClass('ui-widget-content');
				}
				else
					lyr3.css(css);
			}

			// style the overlay
			if (!opts.theme && (!opts.applyPlatformOpacityRules || !($.browser.mozilla && /Linux/.test(navigator.platform))))
				lyr2.css(opts.overlayCSS);
			lyr2.css('position', full ? 'fixed' : 'absolute');

			// make iframe layer transparent in IE
			if ($.browser.msie || opts.forceIframe)
				lyr1.css('opacity',0.0);

			//$([lyr1[0],lyr2[0],lyr3[0]]).appendTo(full ? 'body' : el);
			var layers = [lyr1,lyr2,lyr3], $par = full ? $('body') : $(el);
			$.each(layers, function() {
				this.appendTo($par);
			});

			if (opts.theme && opts.draggable && $.fn.draggable) {
				lyr3.draggable({
					handle: '.ui-dialog-titlebar',
					cancel: 'li'
				});
			}

			// ie7 must use absolute positioning in quirks mode and to account for activex issues (when scrolling)
			var expr = setExpr && (!$.boxModel || $('object,embed', full ? null : el).length > 0);
			if (ie6 || expr) {
				// give body 100% height
				if (full && opts.allowBodyStretch && $.boxModel)
					$('html,body').css('height','100%');

				// fix ie6 issue when blocked element has a border width
				if ((ie6 || !$.boxModel) && !full) {
					var t = sz(el,'borderTopWidth'), l = sz(el,'borderLeftWidth');
					var fixT = t ? '(0 - '+t+')' : 0;
					var fixL = l ? '(0 - '+l+')' : 0;
				}

				// simulate fixed position
				$.each([lyr1,lyr2,lyr3], function(i,o) {
					var s = o[0].style;
					s.position = 'absolute';
					if (i < 2) {
						full ? s.setExpression('height','Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.boxModel?0:'+opts.quirksmodeOffsetHack+') + "px"')
							 : s.setExpression('height','this.parentNode.offsetHeight + "px"');
						full ? s.setExpression('width','jQuery.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"')
							 : s.setExpression('width','this.parentNode.offsetWidth + "px"');
						if (fixL) s.setExpression('left', fixL);
						if (fixT) s.setExpression('top', fixT);
					}
					else if (opts.centerY) {
						if (full) s.setExpression('top','(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"');
						s.marginTop = 0;
					}
					else if (!opts.centerY && full) {
						var top = (opts.css && opts.css.top) ? parseInt(opts.css.top) : 0;
						var expression = '((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + '+top+') + "px"';
						s.setExpression('top',expression);
					}
				});
			}

			// show the message
			if (msg) {
				if (opts.theme)
					lyr3.find('.ui-widget-content').append(msg);
				else
					lyr3.append(msg);
				if (msg.jquery || msg.nodeType)
					$(msg).show();
			}

			if (($.browser.msie || opts.forceIframe) && opts.showOverlay)
				lyr1.show(); // opacity is zero
			if (opts.fadeIn) {
				var cb = opts.onBlock ? opts.onBlock : noOp;
				var cb1 = (opts.showOverlay && !msg) ? cb : noOp;
				var cb2 = msg ? cb : noOp;
				if (opts.showOverlay)
					lyr2._fadeIn(opts.fadeIn, cb1);
				if (msg)
					lyr3._fadeIn(opts.fadeIn, cb2);
			}
			else {
				if (opts.showOverlay)
					lyr2.show();
				if (msg)
					lyr3.show();
				if (opts.onBlock)
					opts.onBlock();
			}

			// bind key and mouse events
			bind(1, el, opts);

			if (full) {
				pageBlock = lyr3[0];
				pageBlockEls = $(':input:enabled:visible',pageBlock);
				if (opts.focusInput)
					setTimeout(focus, 20);
			}
			else
				center(lyr3[0], opts.centerX, opts.centerY);

			if (opts.timeout) {
				// auto-unblock
				var to = setTimeout(function() {
					full ? $.unblockUI(opts) : $(el).unblock(opts);
				}, opts.timeout);
				$(el).data('blockUI.timeout', to);
			}
		};

		// remove the block
		function remove(el, opts) {
			var full = (el == window);
			var $el = $(el);
			var data = $el.data('blockUI.history');
			var to = $el.data('blockUI.timeout');
			if (to) {
				clearTimeout(to);
				$el.removeData('blockUI.timeout');
			}
			opts = $.extend({}, $.blockUI.defaults, opts || {});
			bind(0, el, opts); // unbind events

			if (opts.onUnblock === null) {
				opts.onUnblock = $el.data('blockUI.onUnblock');
				$el.removeData('blockUI.onUnblock');
			}

			var els;
			if (full) // crazy selector to handle odd field errors in ie6/7
				els = $('body').children().filter('.blockUI').add('body > .blockUI');
			else
				els = $('.blockUI', el);

			if (full)
				pageBlock = pageBlockEls = null;

			if (opts.fadeOut) {
				els.fadeOut(opts.fadeOut);
				setTimeout(function() { reset(els,data,opts,el); }, opts.fadeOut);
			}
			else
				reset(els, data, opts, el);
		};

		// move blocking element back into the DOM where it started
		function reset(els,data,opts,el) {
			els.each(function(i,o) {
				// remove via DOM calls so we don't lose event handlers
				if (this.parentNode)
					this.parentNode.removeChild(this);
			});

			if (data && data.el) {
				data.el.style.display = data.display;
				data.el.style.position = data.position;
				if (data.parent)
					data.parent.appendChild(data.el);
				$(el).removeData('blockUI.history');
			}

			if (typeof opts.onUnblock == 'function')
				opts.onUnblock(el,opts);
		};

		// bind/unbind the handler
		function bind(b, el, opts) {
			var full = el == window, $el = $(el);

			// don't bother unbinding if there is nothing to unbind
			if (!b && (full && !pageBlock || !full && !$el.data('blockUI.isBlocked')))
				return;

			$el.data('blockUI.isBlocked', b);

			// don't bind events when overlay is not in use or if bindEvents is false
			if (!opts.bindEvents || (b && !opts.showOverlay))
				return;

			// bind anchors and inputs for mouse and key events
			var events = 'mousedown mouseup keydown keypress';
			b ? $(document).bind(events, opts, handler) : $(document).unbind(events, handler);

		// former impl...
		//	   var $e = $('a,:input');
		//	   b ? $e.bind(events, opts, handler) : $e.unbind(events, handler);
		};

		// event handler to suppress keyboard/mouse events when blocking
		function handler(e) {
			// allow tab navigation (conditionally)
			if (e.keyCode && e.keyCode == 9) {
				if (pageBlock && e.data.constrainTabKey) {
					var els = pageBlockEls;
					var fwd = !e.shiftKey && e.target === els[els.length-1];
					var back = e.shiftKey && e.target === els[0];
					if (fwd || back) {
						setTimeout(function(){focus(back)},10);
						return false;
					}
				}
			}
			var opts = e.data;
			// allow events within the message content
			if ($(e.target).parents('div.' + opts.blockMsgClass).length > 0)
				return true;

			// allow events for content that is not being blocked
			return $(e.target).parents().children().filter('div.blockUI').length == 0;
		};

		function focus(back) {
			if (!pageBlockEls)
				return;
			var e = pageBlockEls[back===true ? pageBlockEls.length-1 : 0];
			if (e)
				e.focus();
		};

		function center(el, x, y) {
			var p = el.parentNode, s = el.style;
			var l = ((p.offsetWidth - el.offsetWidth)/2) - sz(p,'borderLeftWidth');
			var t = ((p.offsetHeight - el.offsetHeight)/2) - sz(p,'borderTopWidth');
			if (x) s.left = l > 0 ? (l+'px') : '0';
			if (y) s.top  = t > 0 ? (t+'px') : '0';
		};

		function sz(el, p) {
			return parseInt($.css(el,p))||0;
		};

	};


	if (typeof define === 'function' && define.amd && define.amd.jQuery) {
		define(['jquery'], setup);
	} else {
		setup(jQuery);
	}

})();