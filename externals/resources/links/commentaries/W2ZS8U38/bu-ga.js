function bu_ga_track_pageview(page) {
	var i, trNames = bu_ga_get_trackers();

	if (!page) {
		page = undefined;
	}

	_gaq.push(['_trackPageview', page]);

	for (i = 0; i < trNames.length; i++) {
		_gaq.push([trNames[i] + '._trackPageview', page]);
	}
}

/**
 * Wrapper for GA event tracking. 'category', 'action' and 'label' properties 
 * are required; 'value', 'delay', and 'noninteract' are optional. See Google Event
 * Tracking documentation for explanation of parameters.
 */
function bu_ga_track_event(args) {
	if (typeof args.value === 'undefined' || typeof args.value === 'null' || isNan(args.value)) {
		args.value = 0;
	}

	if (typeof args.delay === 'undefined' || typeof args.delay === 'null') {
		args.delay = 0;
	}

	if (typeof args.noninteract === 'undefined' || typeof args.noninteract === 'null') {
		args.noninteract = true;
	}

	args.value = parseFloat(args.value);
	var i, trNames = bu_ga_get_trackers();

	_gaq.push(['_trackEvent', args.category, args.action, args.label, args.value, args.noninteract]);

	for (i = 0; i < trNames.length; i++) {
		_gaq.push([trNames[i] + '._trackEvent', args.category, args.action, args.label, args.value, args.noninteract]);
	}

	if (args.delay) {
		setTimeout(function() {
			return true;
		}, 100);
	}
}

/** 
 * Wrapper for GA social tracking. 'network' and 'action' properties are required, 
 * 'target' and 'path' are optional.  See Google Social Tracking documentation for 
 * explanation of parameters.
 */
function bu_ga_track_social(args) {
	if (typeof args.target === 'undefined' || typeof args.target === 'null') {
		args.target = undefined;
	}

	if (typeof args.path === 'undefined' || typeof args.path === 'null') {
		args.path = undefined;
	}

	var i, trNames = bu_ga_get_trackers();

	_gaq.push(['_trackSocial', args.network, args.action, args.target, args.path]);

	for (i = 0; i < trNames.length; i++) {
		_gaq.push([trNames[i] + '._trackSocial', args.network, args.action, args.target, args.path]);
	}
}

/**
 * Get all tracker 'names' used on the current site except the first. Assumes that
 * whatever tracking function you call with these you will also call on the default tracker,
 * which is not named when called.
 * 
 * For internal use only, unless you are sure about what you're doing.
 */
function bu_ga_get_trackers() {
	if (typeof buGa === 'undefined' || typeof buGa.trackerNames === 'undefined') {
		return [];
	}

	return buGa.trackerNames;
}

/**
 * Get tracker 'name' for a specific GA tracker id, for sending data 
 * only to specific tracker. If you pass the site's default tracker, which
 * is unnamed, returns empty string.
 */
function bu_ga_get_tracker(id) {
	if (typeof buGa === 'undefined' || typeof buGa.trackerIds === 'undefined') {
		return null;
	}
	
	if (typeof id === 'undefined' || typeof id === 'null') {
		return '';
	}

	var trackers = buGa.trackerIds;

	for (var trId in trackers) {
		if (trackers[trId] === id) {
			return trId === 'a' ? '' : trId;
		}
	}

	return null;
}