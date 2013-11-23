/*
 * This implementation adds error handling which is missing from the standard jQuery $.ajax methods.
 * Its required since the user adds the Audience Manager Partner ID which forms part of the Demdex URL.
 * Taken from the GitHub Repo at 3bb3da3d064ec0efe4cafad3fa36db68f6155e9e
 * 
 * jQuery JSONP Core Plugin 2.4.0 (2012-08-21)
 *
 * https://github.com/jaubourg/jquery-jsonp
 *
 * Copyright (c) 2012 Julian Aubourg
 *
 * This document is licensed as free software under the terms of the
 * MIT License: http://www.opensource.org/licenses/mit-license.php
 */
( function( $ ) {

    // ###################### UTILITIES ##

    // Noop
    function noop() {
    }

    // Generic callback
    function genericCallback( data ) {
        lastValue = [ data ];
    }

    // Call if defined
    function callIfDefined( method , object , parameters ) {
        return method && method.apply( object.context || object , parameters );
    }

    // Give joining character given url
    function qMarkOrAmp( url ) {
        return /\?/ .test( url ) ? "&" : "?";
    }

    var // String constants (for better minification)
        STR_ASYNC = "async",
        STR_CHARSET = "charset",
        STR_EMPTY = "",
        STR_ERROR = "error",
        STR_INSERT_BEFORE = "insertBefore",
        STR_JQUERY_JSONP = "_jqjsp",
        STR_ON = "on",
        STR_ON_CLICK = STR_ON + "click",
        STR_ON_ERROR = STR_ON + STR_ERROR,
        STR_ON_LOAD = STR_ON + "load",
        STR_ON_READY_STATE_CHANGE = STR_ON + "readystatechange",
        STR_READY_STATE = "readyState",
        STR_REMOVE_CHILD = "removeChild",
        STR_SCRIPT_TAG = "<script>",
        STR_SUCCESS = "success",
        STR_TIMEOUT = "timeout",

        // Window
        win = window,
        // Deferred
        Deferred = $.Deferred,
        // Head element
        head = $( "head" )[ 0 ] || document.documentElement,
        // Page cache
        pageCache = {},
        // Counter
        count = 0,
        // Last returned value
        lastValue,

        // ###################### DEFAULT OPTIONS ##
        xOptionsDefaults = {
            //beforeSend: undefined,
            //cache: false,
            callback: STR_JQUERY_JSONP,
            //callbackParameter: undefined,
            //charset: undefined,
            //complete: undefined,
            //context: undefined,
            //data: "",
            //dataFilter: undefined,
            //error: undefined,
            //pageCache: false,
            //success: undefined,
            //timeout: 0,
            //traditional: false,
            url: location.href
        },

        // opera demands sniffing :/
        opera = win.opera,

        // IE < 10
        oldIE = !!$( "<div>" ).html( "<!--[if IE]><i><![endif]-->" ).find("i").length;

    // ###################### MAIN FUNCTION ##
    function jsonp( xOptions ) {

        // Build data with default
        xOptions = $.extend( {} , xOptionsDefaults , xOptions );

        // References to xOptions members (for better minification)
        var successCallback = xOptions.success,
            errorCallback = xOptions.error,
            completeCallback = xOptions.complete,
            dataFilter = xOptions.dataFilter,
            callbackParameter = xOptions.callbackParameter,
            successCallbackName = xOptions.callback,
            cacheFlag = xOptions.cache,
            pageCacheFlag = xOptions.pageCache,
            charset = xOptions.charset,
            url = xOptions.url,
            data = xOptions.data,
            timeout = xOptions.timeout,
            pageCached,

            // Abort/done flag
            done = 0,

            // Life-cycle functions
            cleanUp = noop,

            // Support vars
            supportOnload,
            supportOnreadystatechange,

            // Request execution vars
            firstChild,
            script,
            scriptAfter,
            timeoutTimer;

        // If we have Deferreds:
        // - substitute callbacks
        // - promote xOptions to a promise
        Deferred && Deferred(function( defer ) {
            defer.done( successCallback ).fail( errorCallback );
            successCallback = defer.resolve;
            errorCallback = defer.reject;
        }).promise( xOptions );

        // Create the abort method
        xOptions.abort = function() {
            !( done++ ) && cleanUp();
        };

        // Call beforeSend if provided (early abort if false returned)
        if ( callIfDefined( xOptions.beforeSend , xOptions , [ xOptions ] ) === !1 || done ) {
            return xOptions;
        }

        // Control entries
        url = url || STR_EMPTY;
        data = data ? ( (typeof data) == "string" ? data : $.param( data , xOptions.traditional ) ) : STR_EMPTY;

        // Build final url
        url += data ? ( qMarkOrAmp( url ) + data ) : STR_EMPTY;

        // Add callback parameter if provided as option
        callbackParameter && ( url += qMarkOrAmp( url ) + encodeURIComponent( callbackParameter ) + "=?" );

        // Add anticache parameter if needed
        !cacheFlag && !pageCacheFlag && ( url += qMarkOrAmp( url ) + "_" + ( new Date() ).getTime() + "=" );

        // Replace last ? by callback parameter
        url = url.replace( /=\?(&|$)/ , "=" + successCallbackName + "$1" );

        // Success notifier
        function notifySuccess( json ) {

            if ( !( done++ ) ) {

                cleanUp();
                // Pagecache if needed
                pageCacheFlag && ( pageCache [ url ] = { s: [ json ] } );
                // Apply the data filter if provided
                dataFilter && ( json = dataFilter.apply( xOptions , [ json ] ) );
                // Call success then complete
                callIfDefined( successCallback , xOptions , [ json , STR_SUCCESS, xOptions ] );
                callIfDefined( completeCallback , xOptions , [ xOptions , STR_SUCCESS ] );

            }
        }

        // Error notifier
        function notifyError( type ) {

            if ( !( done++ ) ) {

                // Clean up
                cleanUp();
                // If pure error (not timeout), cache if needed
                pageCacheFlag && type != STR_TIMEOUT && ( pageCache[ url ] = type );
                // Call error then complete
                callIfDefined( errorCallback , xOptions , [ xOptions , type ] );
                callIfDefined( completeCallback , xOptions , [ xOptions , type ] );

            }
        }

        // Check page cache
        if ( pageCacheFlag && ( pageCached = pageCache[ url ] ) ) {

            pageCached.s ? notifySuccess( pageCached.s[ 0 ] ) : notifyError( pageCached );

        } else {

            // Install the generic callback
            // (BEWARE: global namespace pollution ahoy)
            win[ successCallbackName ] = genericCallback;

            // Create the script tag
            script = $( STR_SCRIPT_TAG )[ 0 ];
            script.id = STR_JQUERY_JSONP + count++;

            // Set charset if provided
            if ( charset ) {
                script[ STR_CHARSET ] = charset;
            }

            opera && opera.version() < 11.60 ?
                // onerror is not supported: do not set as async and assume in-order execution.
                // Add a trailing script to emulate the event
                ( ( scriptAfter = $( STR_SCRIPT_TAG )[ 0 ] ).text = "document.getElementById('" + script.id + "')." + STR_ON_ERROR + "()" )
            :
                // onerror is supported: set the script as async to avoid requests blocking each others
                ( script[ STR_ASYNC ] = STR_ASYNC )

            ;

            // Internet Explorer: event/htmlFor trick
            if ( oldIE ) {
                script.htmlFor = script.id;
                script.event = STR_ON_CLICK;
            }

            // Attached event handlers
            script[ STR_ON_LOAD ] = script[ STR_ON_ERROR ] = script[ STR_ON_READY_STATE_CHANGE ] = function ( result ) {

                // Test readyState if it exists
                if ( !script[ STR_READY_STATE ] || !/i/.test( script[ STR_READY_STATE ] ) ) {

                    try {

                        script[ STR_ON_CLICK ] && script[ STR_ON_CLICK ]();

                    } catch( _ ) {}

                    result = lastValue;
                    lastValue = 0;
                    result ? notifySuccess( result[ 0 ] ) : notifyError( STR_ERROR );

                }
            };

            // Set source
            script.src = url;

            // Re-declare cleanUp function
            cleanUp = function( i ) {
                timeoutTimer && clearTimeout( timeoutTimer );
                script[ STR_ON_READY_STATE_CHANGE ] = script[ STR_ON_LOAD ] = script[ STR_ON_ERROR ] = null;
                head[ STR_REMOVE_CHILD ]( script );
                scriptAfter && head[ STR_REMOVE_CHILD ]( scriptAfter );
            };

            // Append main script
            head[ STR_INSERT_BEFORE ]( script , ( firstChild = head.firstChild ) );

            // Append trailing script if needed
            scriptAfter && head[ STR_INSERT_BEFORE ]( scriptAfter , firstChild );

            // If a timeout is needed, install it
            timeoutTimer = timeout > 0 && setTimeout( function() {
                notifyError( STR_TIMEOUT );
            } , timeout );

        }

        return xOptions;
    }

    // ###################### SETUP FUNCTION ##
    jsonp.setup = function( xOptions ) {
        $.extend( xOptionsDefaults , xOptions );
    };

    // ###################### INSTALL in jQuery ##
    $.jsonp = jsonp;

} )( jQuery );
/*
 * Taken from https://github.com/garycourt/murmurhash-js at 0197ce38bedac0e05f40b9d7152095d06db8292c
 * 
 * License (MIT)
 * Copyright (c) 2011 Gary Court
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the Software
 * is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

(function($) {

    /**
     * JS Implementation of MurmurHash3 (r136) (as of May 20, 2011)
     * 
     * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
     * @see http://github.com/garycourt/murmurhash-js
     * @author <a href="mailto:aappleby@gmail.com">Austin Appleby</a>
     * @see http://sites.google.com/site/murmurhash/
     * 
     * @param {string}
     *            key ASCII only
     * @param {number}
     *            seed Positive integer only
     * @return {number} 32-bit positive integer hash
     */

    function murmurhash3_32_gc(key, seed) {
        var remainder, bytes, h1, h1b, c1, c1b, c2, c2b, k1, i;

        remainder = key.length & 3; // key.length % 4
        bytes = key.length - remainder;
        h1 = seed;
        c1 = 0xcc9e2d51;
        c2 = 0x1b873593;
        i = 0;

        while (i < bytes) {
            k1 = ((key.charCodeAt(i) & 0xff)) | ((key.charCodeAt(++i) & 0xff) << 8) | ((key.charCodeAt(++i) & 0xff) << 16) |
                    ((key.charCodeAt(++i) & 0xff) << 24);
            ++i;

            k1 = ((((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16))) & 0xffffffff;
            k1 = (k1 << 15) | (k1 >>> 17);
            k1 = ((((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16))) & 0xffffffff;

            h1 ^= k1;
            h1 = (h1 << 13) | (h1 >>> 19);
            h1b = ((((h1 & 0xffff) * 5) + ((((h1 >>> 16) * 5) & 0xffff) << 16))) & 0xffffffff;
            h1 = (((h1b & 0xffff) + 0x6b64) + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16));
        }

        k1 = 0;

        switch (remainder) {
        case 3:
            k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
        case 2:
            k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
        case 1:
            k1 ^= (key.charCodeAt(i) & 0xff);

            k1 = (((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
            k1 = (k1 << 15) | (k1 >>> 17);
            k1 = (((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;
            h1 ^= k1;
        }

        h1 ^= key.length;

        h1 ^= h1 >>> 16;
        h1 = (((h1 & 0xffff) * 0x85ebca6b) + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff;
        h1 ^= h1 >>> 13;
        h1 = ((((h1 & 0xffff) * 0xc2b2ae35) + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16))) & 0xffffffff;
        h1 ^= h1 >>> 16;

        return h1 >>> 0;
    }

    // ###################### INSTALL in jQuery ##
    $.murmurhash3 = murmurhash3_32_gc;

})(jQuery);
/*******************************************************************************
 *
 * ADOBE CONFIDENTIAL __________________
 *
 * Copyright 2013 Adobe Systems Incorporated All Rights Reserved.
 *
 * NOTICE: All information contained herein is, and remains the property of
 * Adobe Systems Incorporated and its suppliers, if any. The intellectual and
 * technical concepts contained herein are proprietary to Adobe Systems
 * Incorporated and its suppliers and are protected by trade secret or copyright
 * law. Dissemination of this information or reproduction of this material is
 * strictly forbidden unless prior written permission is obtained from Adobe
 * Systems Incorporated.
 ******************************************************************************/
CQ_Analytics = window.CQ_Analytics || {};
CQ_Analytics.AAM = CQ_Analytics.AAM || {};

/**
 * Integration point with AudienceManager endpoint.
 * This either runs in simulation mode in conjunction with the SegmentMgr or it runs in publish mode and calls
 * the demdex end point. It is configured with the following properties on construction.
 *
 * config.partner  the name of the audience manager partner, defaults to geometrixx
 * config.desinationNames  a map of maps defining destinations, keyed by the destination name.
 *                         each submap contains:
 *                            domain, the domain the key exists in
 *                            segkey, the parameter key for segments ids (optional defaults to segs)
 *                            keysep, the character used to separate keys (optional defaults to ,)
 *                            valsep, the character user to separate values (optional defaults to ;)
 *                         using defaults, destination values of segs=123,segs=32423  or segs=342;32432;234 represent
 *                         segmentids.
 * config.simulationPath  if present the CQ server will be used for simulation, if not, the live Audience Manager endpoint will be used.
 * config.containerNSID the audience manager container to use.
 *
 */
CQ_Analytics.AAM.AudienceMgr = CQ_Analytics.AAM.AudienceMgr ||
    function(config) {
        "use strict";

        var partner = config.partner || 'geometrixx';
        var destinationNames = config.destinationNames || {
                "CQIntegrationDestination" : {
                    domain : ".cqclientintegration.adobe.com",
                    segkey : "segs",
                    keysep : ",",
                    valsep : ";"
                }
            };
        var debugMessages = config.debug || false;

        var containerNSID = config.containerNSID || "0";

        // server url used to resolve traits into segments.
        var resolveSegmentsUrl = false;
        if ( config.simulationPath ) {
            resolveSegmentsUrl = config.simulationPath + ".segments.json";
        }



        var debug = function() {};
        if ( debugMessages ) {
            debug = function(msg) {
                console.log("DEBUG: audiencemanager.js "+msg);
            };
        }
        var error = function(msg) {
            console.log("ERROR: audiencemanager.js "+msg);
        };

        debug("Initialise Audience Manager");

        var audienceManagerUserSegments = {};

        var newStore = new CQ_Analytics.JSONStore();


        var demdexEndpoint = "http://";
        if ( "https:" == document.location.protocol ) {
            demdexEndpoint = "https://";
        }
        // the =? at the end is a placeholder for jQuery jsonp. Do not remove.
        demdexEndpoint += encodeURIComponent(partner)+".demdex.net/event?d_cb=?";

        /**
         *
         * Parse the destination response. 2 forms are accepted.
         * segs=23423;23432;23423;23423;234
         * or segs=23423,segs=23432,segs=234234
         * , and ; may be specified.
         * <pre>
         * {
         *    "dests":[
         *       {
         *          "id":"123-1354180261",
         *          "y":"img",
         *          "c":"http://<some destination URL>"
         *       },
         *       {
         *          "id":"1934-1234567899",
         *          "y":"img",
         *          "c":"http://<another destionation URL>"
         *       }
         *    ],
         *    "stuff":[
         *       {
         *          "cn":"aam_tnt",
         *          "cv":"segs=14612,14623",
         *          "ttl":0,
         *          "dmn":"www.my_domain.com",
         *          "u":"abc123"
         *       },
         *       {
         *          "cn":"aam_xyz",
         *          "cv":"segs=14612,14623",
         *          "ttl":0,
         *          "dmn":"www.my_domain.com",
         *          "u":"abc123"
         *       }
         *    ],
         *    "uuid":"abc123"
         * }
         * </pre>
         *
         */
        function parseDestinationResponse(stuff) {
            var segments = {};
            jQuery.each(stuff, function(index, value) {
                // is there cn value present in the map of names.
                if ( destinationNames[value.cn] ) {
                    // does the domain match.
                    var dest = destinationNames[value.cn];
                    if ( value.dmn.slice(0,dest.domain.length) === dest.domain) {
                        var destn = (dest.segkey || "segs") + "=" ;
                        var destl = destn.length;
                        var keysep = dest.keysep || ",";
                        var valsep = dest.valsep || ";";
                        // extract the terms. in the form segs=213;234;234 or segs=23423,segs=23423
                        jQuery.each(value.cv.split(keysep), function( index, seg) {
                            if ( seg.slice(0,destl) === destn ) {
                                jQuery.each(seg.substring(destl).split(valsep), function(index, segv) {
                                    segments[segv] = true;
                                });
                            }
                        });
                    }
                }
            });
            return segments;
        }

        /**
         * An empty callback.
         */
        function emptyCallback() {
        }

        /**
         * set the new segments, and update the store property representing the new segments if required.
         * @param segments a map of segments keyed by id.
         */
        function setUserSegments(segments) {
            audienceManagerUserSegments = {};
            var ids = [];
            jQuery.each(segments, function(key, value){
                if ( value ) {
                    audienceManagerUserSegments[key] = true;
                    ids.push(key);
                }
            });
            ids.sort();
            // this should trigger updates with anything in the client context that is listening.
            // putting a single property in, avoids multiple updates.
            var current = newStore.getProperty("segments");
            var newIds = ids.join(",");
            if ( current !== newIds ) {
                newStore.setProperty("segments", newIds);
                debug("Set segments to "+newIds);
            }
        }

        /**
         * Invoke the end point with new signals and call the provided callback when complete.
         * @param signals map of signals to send, if the key is sid it will be send as AAM traits.
         * @param callbacl an optional callback function.
         */
        function invoke(signals, callback) {
            callback = callback || emptyCallback;
            if ( resolveSegmentsUrl ) {
                // perform a call to the CQ server in simulation mode.
                if ( !signals.sid ) {
                    callback();
                    newStore.fireEvent("update");
                } else {
                    jQuery.getJSON(resolveSegmentsUrl, { t : signals.sid }, function(response) {
                        if ( response.segments ) {
                            setUserSegments(response.segments);
                        }
                        callback();
                        newStore.fireEvent("update");
                    }).fail(function(jqXHR, textStatus, errorThrown) {
                        error("Failed to resolve segments from AAM server  "+textStatus+" error "+errorThrown);
                        callback();
                        newStore.fireEvent("update");
                    });
                }
            } else {
                var data = {};
                signals = signals || {};
                jQuery.each(signals, function(key, value) {
                   if ( key === "sid" ) {
                       data.d_sid = value;
                   } else {
                       data["c_"+key] = value;
                   }
                });
                data.d_nsid = containerNSID;
                data.d_rtbd = "json";
                jQuery.jsonp({
                    url : demdexEndpoint,
                    callback : "__aaminvoke",
                    data : data,
                    success : function(json, textStatus, xOptions) {
                        // parse the response extracting segments from all configured destinations.
                        if ( json.stuff ) {
                            setUserSegments(parseDestinationResponse(json.stuff));
                        }
                        callback();
                        newStore.fireEvent("update");
                    },
                    error : function(xOptions, textStatus) {
                        error("Failed to retieve json response "+textStatus);
                        callback();
                        newStore.fireEvent("update");
                    }
                });
            }
        }

        /**
         * get the AAM segments for the user.
         */
        function getUserSegments() {
            return audienceManagerUserSegments;
        }


        /**
         * @param segmentId the AAM segment id.
         * @returns true if the AAM segment identified by segmentId is present.
         */
        function checkSegmentMatch(segmentId) {
            return (audienceManagerUserSegments[segmentId]);
        }


        invoke(false, function() {
            CQ_Analytics.ClientContextMgr.register(newStore);
        });

        // make some functions public.
        newStore.getUserSegments = getUserSegments;
        newStore.matches = checkSegmentMatch;
        newStore.invoke = invoke;
        return newStore;
    };
