/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */

/**
 * The <code>_g</code> library contains all Granite component classes and utilities.
 * @static
 * @class _g
 */
window._g = window._g || {};

// namespace
_g.shared = {};

// debug console
if (window.console === undefined) {
    window.console = {log:function(m){}};
}
/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */

_g.shared.HTTP = new function() {
    /**
     * Creates an empty response object.
     * @private
     * @static
     * @return {Object} The response object
     */
    var createResponse = function() {
        var response = new Object();
        response.headers = new Object();
        response.body = new Object();
        return response;
    };

    var getResponseFromXhr = function(request) {
        if (!request) return null;
        var response = createResponse();
        response.body = request.responseText;
        response.headers[_g.HTTP.HEADER_STATUS] = request.status;
        // set properties for backward compatibility (pre 5.3)
        response.responseText = request.responseText;
        response.status = request.status;
        return response;
    };

    /**
     * The context path used on the server.
     * May only be set by {@link _g.HTTP.detectContextPath}.
     * @private
     * @type String
     */
    var contextPath = null;

    /**
     * The regular expression to detect the context path used
     * on the server using the URL of this script.
     * @private
     * @final
     * @type RegExp
     */
    var SCRIPT_URL_REGEXP = /\/etc\/clientlibs\/.*\/shared.*\.js$/;

    /**
     * The regular expression to detect unescaped special characters in a path.
     * @private
     * @final
     * @type RegExp
     */
    var ENCODE_PATH_REGEXP = /[^1\w-\.!~\*'\(\)\/%;:@&=\$,]/;

    /**
     * Indicates after a session timeout if a refresh has already been triggered
     * in order to avoid multiple alerts.
     * @private
     * @final
     * @type String
     */
    var LOGIN_TRIGGERED = false;

    return {
        /**
         * The extension for HTML files.
         * @static
         * @final
         * @type String
         */
        EXTENSION_HTML: ".html",

        /**
         * The extension for JSON files.
         * @static
         * @final
         * @type String
         */
        EXTENSION_JSON: ".json",

        /**
         * The extension for resources.
         * @private
         * @static
         * @final
         * @type String
         */
        EXTENSION_RES: ".res",

        /**
         * The Status header.
         * @static
         * @final
         * @type String
         */
        HEADER_STATUS: "Status",

        /**
         * The Message header.
         * @static
         * @final
         * @type String
         */
        HEADER_MESSAGE: "Message",

        /**
         * The Location header.
         * @static
         * @final
         * @type String
         */
        HEADER_LOCATION: "Location",

        /**
         * The Path header.
         * @static
         * @final
         * @type String
         */
        HEADER_PATH: "Path",

        /**
         * The parameter name for no caching.
         * @static
         * @final
         * @type String
         */
        PARAM_NO_CACHE: "cq_ck",

        /**
         * Requests the specified URL from the server using GET. The request
         * will be synchronous, unless a callback function is specified.
         * @static
         * @param {String} url The URL to request
         * @param {Function} callback (optional) The callback function which is
         *        called regardless of success or failure and is passed the following
         *        parameters:<ul>
         *        <li><b>options</b> : Object<div class="sub-desc">The parameter to the request call.</div></li>
         *        <li><b>success</b> : Boolean<div class="sub-desc">True if the request succeeded.</div></li>
         *        <li><b>response</b> : Object<div class="sub-desc">The response object.</div></li>
         *        </ul>
         * @param {Object} scope The scope for the callback (optional)
         * @param {Boolean} suppressForbiddenCheck Suppress the check if the session has timed out (optional)
         * @return {Mixed} The response object or, if the
         *         request is asynchronous, the transaction ID
         */
        get: function(url, callback, scope, suppressForbiddenCheck) {
            url = _g.HTTP.getXhrHookedURL(_g.HTTP.externalize(url, true));

            if (callback != undefined) {
                return _g.$.ajax({
                    type: "GET",
                    url: url,
                    complete: function(request, textStatus) {
                        var response = getResponseFromXhr(request);
                        if (!suppressForbiddenCheck) _g.HTTP.handleForbidden(response);
                        callback.call(scope || this,
                                this,
                                textStatus == "success",
                                response);
                    }
                });
            } else {
                try {
                    var request = _g.$.ajax({
                        type: "GET",
                        url: url,
                        async: false
                    });
                    var response = getResponseFromXhr(request);
                    if (!suppressForbiddenCheck) _g.HTTP.handleForbidden(response);
                    return response;
                } catch (e) {
                    return null;
                }
            }
        },

        /**
         * Requests the specified URL from the server using POST. The request
         * will be synchronous, unless a callback function is specified.
         * The returned response object looks like this:
         * <pre><code>{ headers: { "Status": 200, ... } }</code></pre>
         * See constants above for all supported headers.
         * @static
         * @param {String} url The URL to request
         * @param {Function} callback (optional) The callback function which is
         *        called regardless of success or failure and is passed the following
         *        parameters:<ul>
         *        <li><b>options</b> : Object<div class="sub-desc">The parameter to the request call.</div></li>
         *        <li><b>success</b> : Boolean<div class="sub-desc">True if the request succeeded.</div></li>
         *        <li><b>xhr</b> : Object<div class="sub-desc">The XMLHttpRequest object containing the response data.
         *        See <a href="http://www.w3.org/TR/XMLHttpRequest/">http://www.w3.org/TR/XMLHttpRequest/</a> for details about
         *        accessing elements of the response.</div></li>
         *        <li><b>response</b> : Object<div class="sub-desc">The response object.<br>
         *        <i>Added in CQ 5.3</i></div></li>
         *        </ul>
         * @param {Object} params The parameters
         * @param {Object} scope The scope for the callback
         * @param {Boolean} suppressErrorMsg Suppress the error msg notification
         * @param {Boolean} suppressForbiddenCheck Suppress the check if the session has timed out (optional)
         * @return {Mixed} The response object or, if the request is
         *         asynchronous, the transaction ID
         */
        post: function(url, callback, params, scope, suppressErrorMsg, suppressForbiddenCheck) {
            url = _g.HTTP.externalize(url, true);

            var hook = _g.HTTP.getXhrHook(url, "POST", params);
            if (hook) {
                url = hook.url;
                params = hook.params;
            }

            if (callback != undefined) {
                return _g.$.ajax({
                    type: "POST",
                    url: url,
                    data: params,
                    complete: function(request, textStatus) {
                        var response = _g.HTTP.buildPostResponseFromHTML(request.responseText);
                        if (!suppressForbiddenCheck) _g.HTTP.handleForbidden(request);
                        callback.call(scope || this,
                                this,
                                textStatus == "success",
                                response);
                    }
                });
            } else {
                try {
                    var request = _g.$.ajax({
                        type: "POST",
                        url: url,
                        data: params,
                        async: false
                    });
                    var response = _g.HTTP.buildPostResponseFromHTML(request.responseText);
                    if (!suppressForbiddenCheck) _g.HTTP.handleForbidden(request);
                    return response;
                } catch (e) {
                    return null;
                }
            }
        },

        /**
         * Returns the value of the parameter with the specified name
         * in the URL. Only the first value will be considered.
         * Values will be URL-decoded.
         * @static
         * @param {String} url The URL
         * @param {String} name The name of the parameter
         * @return {String} The value
         */
        getParameter: function(url, name) {
            var params = _g.HTTP.getParameters(url, name);
            return params != null ? params[0] : null;
        },

        /**
         * Returns the values of the parameters with the specified name
         * in the URL. Values will be URL-decoded.
         * @static
         * @param {String} url The URL
         * @param {String} name The name of the parameter
         * @return {String[]} The values
         */
        getParameters: function(url, name) {
            var values = [];
            if (!name) {
                return null;
            }
            name = encodeURIComponent(name);
            if (url.indexOf("?") == -1) {
                return null;
            }
            var query = url.substring(url.indexOf("?") + 1);
            if (query.indexOf(name) == -1) {
                return null;
            }
            var queryPts = query.split("&");
            for (var i = 0; i < queryPts.length; i++) {
                var paramPts = queryPts[i].split("=");
                if (paramPts[0] == name) {
                    values.push(paramPts.length > 1 ? decodeURIComponent(paramPts[1]) : "");
                }
            }
            return values.length > 0 ? values : null;
        },

        /**
         * Adds a parameter to the specified URL. The parameter name and
         * value will be URL-endcoded.
         * @static
         * @param {String} url The URL
         * @param {String} name The name of the parameter
         * @param {String/String[]} value The value of the parameter.
         *        Since 5.3, an array of strings can be passed
         * @return {String} The URL with the new parameter
         */
        addParameter: function(url, name, value) {
            if (value && value instanceof Array) {
                for (var i = 0; i < value.length; i++) {
                    url = _g.HTTP.addParameter(url, name, value[i]);
                }
                return url;
            }
            var separator = url.indexOf("?") == -1 ? "?" : "&";
            var hashIdx = url.indexOf("#");
            if (hashIdx < 0) {
                return url + separator + encodeURIComponent(name) + "=" + encodeURIComponent(value);
            } else {
                var hash = url.substring(hashIdx);
                url = url.substring(0, hashIdx);
                return url + separator + encodeURIComponent(name) + "=" + encodeURIComponent(value) + hash;
            }
        },

        /**
         * Overwrites a parameter in the specified URL. The parameter name
         * and value will be URL-endcoded.
         * @static
         * @param {String} url The URL
         * @param {String} name The name of the parameter
         * @param {String} value The value of the parameter
         * @return {String} The URL with the new parameter
         */
        setParameter: function(url, name, value) {
            url = _g.HTTP.removeParameter(url, name);
            return _g.HTTP.addParameter(url, name, value);
        },

        /**
         * Removes a parameter from the specified URL.
         * @static
         * @param {String} url The URL
         * @param {String} name The name of the parameter to remove
         * @return {String} The URL without the parameter
         */
        removeParameter: function(url, name) {
            var pattern0 = "?" + encodeURIComponent(name) + "=";
            var pattern1 = "&" + encodeURIComponent(name) + "=";
            var pattern;
            if (url.indexOf(pattern0) != -1) {
                pattern = pattern0;
            }
            else if (url.indexOf(pattern1) != -1) {
                pattern = pattern1;
            }
            else {
                return url;
            }

            var indexCutStart = url.indexOf(pattern);
            var begin = url.substring(0, indexCutStart);

            var indexCutEnd = url.indexOf("&", indexCutStart + 1);
            var end = "";
            if (indexCutEnd != -1) {
                end = url.substring(indexCutEnd);
                if (end.indexOf("&") == 0) {
                    end = end.replace("&", "?");
                }
            }
            return begin + end;
        },

        /**
         * Removes all parameter from the specified URL.
         * @static
         * @param {String} url The URL
         * @return {String} The URL without parameters
         */
        removeParameters: function(url) {
            if (url.indexOf("?") != -1) {
                return url.substring(0, url.indexOf("?"));
            }
            return url;
        },

        /**
         * Adds the specified selector to an URL.
         * @param {String} url The URL. The URL must contain a extension and
         *                 must not contain a suffix (x.json/a/b). Anchor and
         *                 request parameters are supported.
         * @param {String} selector The name of the selector to insert
         * @param {Number} index (optional) The index of the selector. If it is "-1"
         *                 or bigger than the number of the existing selectors
         *                 the selector will be appended. Defaults to "0".
         * @return {String} The updated URL
         * @since 5.3
         */
        addSelector: function(url, selector, index) {
            if (!index) index = 0;

            // url:  /x/y.z.json?a=1#b
            // post: ?a=1#b
            // path: /x
            // main: y.z.json
            var post = ""; // string of parameters and anchor
            var pIndex = url.indexOf("?");
            if (pIndex == -1) pIndex = url.indexOf("#");
            if (pIndex != -1) {
                post = url.substring(pIndex);
                url = url.substring(0, pIndex);
            }
            var sIndex = url.lastIndexOf("/");
            var main = url.substring(sIndex); // name, selectors and extension
            if (main.indexOf("." + selector + ".") == -1) {
                var path = url.substring(0, sIndex);
                var obj = main.split(".");
                var newMain = "";
                var delim = "";
                if (index > obj.length - 2 || index == -1) {
                    // insert at last position
                    index = obj.length - 2;
                }
                for (var i = 0; i < obj.length; i++) {
                    newMain += delim + obj[i];
                    delim = ".";
                    if (index == i) {
                        newMain += delim + selector;
                    }
                }
                return path + newMain + post;
            }
            else {
                return url;
            }
        },

        /**
         * Replaces the selector at the given index position. If no selector exists
         * at the index position, no change is made to the URL.
         *
         * @param {String} url The URL.
         * @param {String} selector The value with which to replace the selector.
         * @param {Number} index The index of the selector to set/replace.
         * @return The URL with the selector replaced.
         * @since 5.4
         */
        setSelector: function(url, selector, index) {

            var post = "";
            var pIndex = url.indexOf("?");
            if (pIndex == -1) pIndex = url.indexOf("#");
            if (pIndex != -1) {
                post = url.substring(pIndex);
                url = url.substring(0, pIndex);
            }

            var selectors = _g.HTTP.getSelectors(url);
            var ext = url.substring(url.lastIndexOf("."));
            // cut extension
            url = url.substring(0, url.lastIndexOf("."));
            // cut selectors
            var fragment = (selectors.length > 0) ? url.replace("." + selectors.join("."), "") : url;

            if (selectors.length > 0) {
                for (var i = 0; i < selectors.length; i++) {
                    if (index == i) {
                        fragment += "." + selector;
                    } else {
                        fragment += "." + selectors[i]
                    }
                }
            } else {
                fragment += "." + selector;
            }

            return fragment + ext + post;
        },

        /**
         * Adds the specified selectors to an URL.
         * @param {String} url The URL. The URL must contain a extension and
         *                 must not contain a suffix (x.json/a/b). Anchor and
         *                 request parameters are supported.
         * @param {String[]} selectors The name of the selectors to insert
         * @return {String} The updated URL
         * @since 5.5
         */
        addSelectors: function(url, selectors) {
            var res = url;
            if( url && selectors && selectors.length) {
                for(var i=0;i< selectors.length;i++) {
                    res = _g.HTTP.addSelector(res, selectors[i], i);
                }
            }
            return res;
        },

        /**
         * Returns the anchor part of the URL.
         * @static
         * @param {String} url The URL
         * @return {String} The anchor
         */
        getAnchor: function(url) {
            if (url.indexOf("#") != -1) {
                return url.substring(url.indexOf("#") + 1);
            }
            return "";
        },

        /**
         * Sets the anchor of the specified URL.
         * @static
         * @param url The URL
         * @param anchor The anchor
         * @return {String} The URL with anchor
         */
        setAnchor: function(url, anchor) {
            return _g.HTTP.removeAnchor(url) + "#" + anchor;
        },

        /**
         * Removes the anchor from the specified URL.
         * @static
         * @param {String} url The URL
         * @return {String} The URL without anchor
         */
        removeAnchor: function(url) {
            if (url.indexOf("#") != -1) {
                return url.substring(0, url.indexOf("#"));
            }
            return url;
        },

        /**
         * Prevents caching by adding a timestamp to the specified URL.
         * @static
         * @param {String} url The URL
         * @return {String} The URL with timestamp
         */
        noCaching: function(url) {
            return _g.HTTP.setParameter(url, _g.HTTP.PARAM_NO_CACHE, new Date().valueOf());
        },

        /**
         * Builds a response object using the specified node and its child nodes.
         * The content of each node with an ID will be set as a response header.
         * @private
         * @static
         * @param {Node} node The content document or the node to parse
         * @param {Object} response The response object to use (optional)
         * @return {Object} The response object
         */
        buildPostResponseFromNode: function(node, response) {
            if (!node) {
                return null;
            }
            if (response == undefined) {
                response = createResponse();
            }

            for (var i = 0; i < node.childNodes.length; i++) {
                var child = node.childNodes[i];
                if (child.tagName) {
                    if (child.id) {
                        if (child.href) {
                            response.headers[child.id] = child.href;
                        }
                        else {
                            response.headers[child.id] = child.innerHTML;
                        }
                    }
                    response = _g.HTTP.buildPostResponseFromNode(child, response);
                }
            }
            return response;
        },

        /**
         * Builds a response object using the specified HTML string. The
         * content of each node with an ID will be set as a response header.
         * @private
         * @static
         * @param {String} html The HTML string
         * @return {Object} The response object
         */
        buildPostResponseFromHTML: function(html) {
            var response = createResponse();
            try {
                if (html.responseText != undefined) {
                    html = html.responseText;
                } else if (typeof html != "string") {
                    html = html.toString();
                }
                var div = document.createElement("div");
                div.innerHTML = html;
                response = _g.HTTP.buildPostResponseFromNode(div, response);
                div = null;
            } catch (e) {
            }
            return response;
        },

        /**
         * Returns the value of the cookie with the specified name.
         * @static
         * @param {String} name The name of the cookie
         * @return {String} The value of the cookie
         */
        getCookie: function(name) {
            var cname = encodeURIComponent(name) + "=";
            var dc = document.cookie;
            if (dc.length > 0) {
                var begin = dc.indexOf(cname);
                if (begin != -1) {
                    begin += cname.length;
                    var end = dc.indexOf(";", begin);
                    if (end == -1) end = dc.length;
                    return decodeURIComponent(dc.substring(begin, end));
                }
            }
            return null;
        },

        /**
         * Sets the value of the cookie with the specified name.
         * @static
         * @param {String} name The name of the cookie
         * @param {String} value The value of the cookie
         * @param {String} path (optional) The server path the cookie applies to
         * @param {Number} days (optional) The number of days the cookie will live
         * @param {String} domain (optional) The server domain
         * @param {Boolean} secure (optional) True if the
         *        connection is secure
         * @return {String} The value of the cookie
         */
        setCookie: function(name, value, path, days, domain, secure) {
            if (typeof(days) != "number") days = 7;
            var date;
            if (days > 0) {
                date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            } else {
                date = new Date(0);
            }
            document.cookie = encodeURIComponent(name) + "=" +
                    encodeURIComponent(value) + "; " +
                    (days != 0 ? "expires=" + date.toGMTString() + "; " : "") +
                    (domain ? "domain=" + domain + "; " : "") +
                    (path ? "path=" + path : "") +
                    (secure ? "; secure" : "");
            return value;
        },

        /**
         * Clears the cookie with the specified name.
         * @static
         * @param {String} name The name of the cookie
         * @param {String} path (optional) The server path the cookie applies to
         * @param {String} domain (optional) The server domain
         * @param {Boolean} secure (optional) True if the
         *        connection is secure
         */
        clearCookie : function(name, path, domain, secure) {
            _g.HTTP.setCookie(name, "null", path || "", -1, domain || "", secure || "");
        },

        /**
         * Returns the scheme and authority (user, hostname, port) part of
         * the specified URL or an empty string if the URL does not include
         * that part.
         * @static
         * @param {String} url The URL
         * @return {String} The scheme and authority part
         */
        getSchemeAndAuthority: function(url) {
            try {
                if (url.indexOf("://") == -1) return ""; // e.g. url was /en.html
                var end = url.indexOf("/", url.indexOf("://") + 3);
                if (end == -1) return url; // e.g. url was http://www.day.com
                return url.substring(0, end); // e.g. url was http://www.day.com/en.html
            }
            catch (e) {
                return "";
            }
        },

        /**
         * Returns the context path used on the server.
         * @static
         * @return {String} The context path
         * @since 5.3
         */
        getContextPath: function() {
            return contextPath;
        },

        /**
         * Detects the context path used on the server.
         * @private
         * @static
         * @since 5.3
         */
        detectContextPath: function() {
            try {
                if (CQURLInfo) {
                    contextPath = CQURLInfo.contextPath || "";
                } else {
                    var scripts = document.getElementsByTagName("script");
                    for (var i = 0; i < scripts.length; i++) {
                        // in IE the first script is not the expected widgets js: loop
                        // until it is found
                        var path = scripts[i].src;
                        if (path.indexOf("?") >= 0) {
                            path = path.substring(0, path.indexOf("?")); // remove query
                        }
                        if (SCRIPT_URL_REGEXP.test(path)) {
                            path = path.replace(/.*\:[\/][\/]/, ""); // remove protocol
                            path = path.substring(path.indexOf("/")); // remove host[:port]
                            path = path.replace(SCRIPT_URL_REGEXP, ""); // remove script url
                            contextPath = path;
                            break;
                        }
                    }
                }
            } catch (e) {
            }
        },

        /**
         * Makes sure the specified relative URL starts with the context path
         * used on the server. If an absolute URL is passed, it will be returned
         * as-is.
         * @static
         * @param {String} url The URL
         * @param {boolean} encode true to encode the path of the URL (optional)
         * @return {String} The externalized URL
         * @since 5.3
         */
        externalize: function(url, encode) {
            if (encode) url = _g.HTTP.encodePathOfURI(url);
            try {
                if (url.indexOf("/") == 0 && contextPath &&
                        url.indexOf(contextPath + "/") != 0) {
                    url = contextPath + url;
                }
            }
            catch (e) {
            }
            return url;
        },

        /**
         * Removes scheme, authority and context path from the specified
         * absolute URL if it has the same scheme and authority as the
         * specified document (or the current one).
         * @static
         * @param {String} url The URL
         * @param {String} doc (optional) The document
         * @return {String} The internalized URL
         */
        internalize: function(url, doc) {
            if (!doc) doc = document;
            var docHost = _g.HTTP.getSchemeAndAuthority(doc.location.href);
            var urlHost = _g.HTTP.getSchemeAndAuthority(url);
            if (docHost == urlHost) {
                return url.substring(urlHost.length + contextPath.length);
            }
            else {
                return url;
            }
        },

        /**
         * Removes all parts but the path from the specified URL.
         * <p>Examples:<pre><code>
         /x/y.sel.html?param=abc => /x/y
         </code></pre>
         * <pre><code>
         http://www.day.com/foo/bar.html => /foo/bar
         </code></pre><p>
         * @static
         * @param {String} url The URL, may be empty. If empty <code>window.location.href</code> is taken.
         * @return {String} The path
         * @since 5.3
         */
        getPath: function(url) {

            if (!url) {
                if (CQURLInfo.requestPath) {
                    return CQURLInfo.requestPath;
                }
            }

            url = url || window.location.href;

            url = _g.HTTP.internalize(url);
            url = _g.HTTP.removeParameters(url);
            url = _g.HTTP.removeAnchor(url);
            var i = url.indexOf(".", url.lastIndexOf("/"));
            if (i != -1) {
                url = url.substring(0, url.indexOf(".", url.lastIndexOf("/")));
            }
            return url;
        },

        /**
         * Returns the current request suffix as provided by CQURLInfo.suffix.
         *
         * @static
         * @return {String} The suffix
         *
         * @since CQ 5.5
         */
        getSuffix: function() {
            if (CQURLInfo.suffix) {
                return CQURLInfo.suffix;
            }
            return null;
        },

        /**
         * Returns an array with the selectors present in the given url.
         * If no selectors are present, an empty array is returned.
         * @static
         * @param {String} url The URL, optional. If no url is provided, the
         *                     selectors as provided by CQURLInfo.selectors
         *                     are taken, with a fallback to window.location.href.
         * @return {Array} An array containing the selectors or an empty
         *                 array if none were found.
         * @since 5.4
         */
        getSelectors: function(url) {

            if (!url) {
                if (CQURLInfo.selectors) {
                    return CQURLInfo.selectors;
                }
            }

            var selectors = [];

            url = url || window.location.href;

            url = _g.HTTP.removeParameters(url);
            url = _g.HTTP.removeAnchor(url);

            var fragment = url.substring(url.lastIndexOf("/"));
            if (fragment) {
                var split = fragment.split(".");
                if (split.length > 2) {
                    for (var i = 0; i < split.length; i++) {
                        // don't add node name and extension as selectors
                        if (i > 0 && i < split.length - 1) {
                            selectors.push(split[i]);
                        }
                    }
                }
            }

            return selectors;
        },

        /**
         * Returns the extension of an URL. This is the string
         * after the last dot until the end of the url without
         * any request parameters, anchors or suffix, for
         * example "html".
         *
         * @param {String} url The URL
         * @return {String} The URL extension (without the dot)
         *                  or an empty string if no was found.
         * @since 5.4
         */
        getExtension: function(url) {

            if (!url) {
                if (CQURLInfo.extension) {
                    return CQURLInfo.extension;
                }
            }

            // strip things from the end
            url = _g.HTTP.removeParameters(url);
            url = _g.HTTP.removeAnchor(url);

            // extension is everything after the last dot
            var pos = url.lastIndexOf(".");
            if (pos < 0) {
                return "";
            }

            // do not include the dot
            url = url.substring(pos + 1);

            // remove suffix if present
            pos = url.indexOf("/");
            if (pos < 0) {
                return url;
            }

            return url.substring(0, pos);
        },

        /**
         * Encodes the path of the specified URL if it is not already encoded.
         * Path means the part of the URL before the first question mark or
         * hash sign.<br>
         * See {@link _g.HTTP.encodePath} for details about the encoding.<br>
         * Sample:<br>
         * <code>/x/y+z.png?path=/x/y+z >> /x/y%2Bz.png?path=x/y+z</code><br>
         * Note that the sample would not work because the "+" in the request
         * parameter would be interpreted as a space. Parameters must be encoded
         * separately.
         * @param {String} url The URL to encoded
         * @return {String} The encoded URL
         * @since 5.3
         */
        encodePathOfURI: function(url) {
            var parts, delim;
            if (url.indexOf("?") != -1) {
                parts = url.split("?");
                delim = "?";
            }
            else if (url.indexOf("#") != -1) {
                parts = url.split("#");
                delim = "#";
            }
            else {
                parts = [url];
            }
            if (ENCODE_PATH_REGEXP.test(parts[0])) {
                parts[0] = _g.HTTP.encodePath(parts[0]);
            }
            return parts.join(delim);
        },

        /**
         * Encodes the specified path using encodeURI. Additionally <code>+</code>,
         * <code>#</code> and <code>?</code> are encoded.<br>
         * The following characters are not encoded:<br>
         * <code>0-9 a-z A-Z</code><br>
         * <code>- _ . ! ~ * ( )</code><br>
         * <code>/ : @ & =</code><br>
         * @param {String} path The path to encode
         * @return {String} The encoded path
         * @since 5.3
         */
        encodePath: function(path) {
            // ensure IPV6 address square brackets are not encoded - see bug #34844
            path = encodeURI(path).replace(/%5B/g, '[').replace(/%5D/g, ']');
            path = path.replace(/\+/g, "%2B");
            path = path.replace(/\?/g, "%3F");
            path = path.replace(/;/g, "%3B");
            path = path.replace(/#/g, "%23");
            path = path.replace(/=/g, "%3D");
            path = path.replace(/\$/g, "%24");
            path = path.replace(/,/g, "%2C");
            path = path.replace(/'/g, "%27");
            path = path.replace(/"/g, "%22");
            return path;
        },

        /**
         * Evaluates and returns the body of the specified response object.
         * Alternatively, a URL can be specified, in which case it will be
         * requested using a synchornous {@link #get} in order to acquire
         * the response object.
         * @static
         * @param {Object/String} response The response object or URL
         * @return {Object} The evaluated response body
         * @since 5.3
         */
        eval: function(response) {
            if (typeof response != "object") {
                response = _g.HTTP.get(response);
            }
            try {
                // support responseText for backward compatibility (pre 5.3)
                return eval("(" + (response.body ? response.body :
                            response.responseText) + ")");
            } catch (e) {
            }
            return null;
        },

        /**
         * Checks whether the specified status code is OK.
         * @static
         * @param {Number} status The status code
         * @return {Boolean} True if the status is OK, else false
         */
        isOkStatus: function(status) {
            try {
                return (new String(status).indexOf("2") == 0);
            } catch (e) {
                return false;
            }
        },

        /**
         * Checks if the specified response is OK.
         * The response object is expected to look like this:
         * <pre><code>{ headers: { "Status": 200, ... } }</code></pre>
         * See constants above for all supported headers.
         * @static
         * @param {Object} response The response object
         * @return {Boolean} True if the response is OK, else false
         */
        isOk: function(response) {
            try {
                return _g.HTTP.isOkStatus(
                        response.headers[_g.HTTP.HEADER_STATUS]);
            } catch (e) {
                return false;
            }
        },

        /**
         * <p>Returns if the specified response is of status 403/forbidden. If the
         * status is 403 and <code>suppressLogin</code> is undefined the document
         * is redirected to the login page.</p>
         * <p>The status is expected to be found in the "status" property of the
         * response: <code>{ "status": 403 }</code></p>
         * @param response The response
         * @param suppressLogin <code>true</code> to not redirect to the login page
         * @return {Boolean} <code>true</code> if the status is 403
         */
        handleForbidden: function(response, suppressLogin) {
            try {
                if (response[_g.HTTP.HEADER_STATUS.toLowerCase()] == 403) {
                    if (!suppressLogin && !LOGIN_TRIGGERED) {
                        LOGIN_TRIGGERED = true; // avoid multiple alerts
                        alert(_g.I18n.get("Your request could not be completed because you have been signed out."));

                        var l = _g.Util.getTopWindow().document.location;
                        l.href = _g.HTTP.externalize(_g.Sling.LOGIN_URL) +
                                "?resource=" + l.pathname + encodeURIComponent(l.search) +
                                l.hash;
                    }
                    return true;
                }
                return false;
            } catch (e) {
                return false;
            }
        },

        /**
         * Gets the XHR hooked URL if called in a portlet context
         * @param {String} url The URL to get
         * @param {String} method The method to use to retrieve the XHR hooked URL
         * @param {Object} params The parameters
         * @return {String} The XHR hooked URL if available, the provided URL otherwise
         */
        getXhrHook: function(url, method, params) {
            method = method || "GET";
            if (typeof G_XHR_HOOK != "undefined" && _g.$.isFunction(G_XHR_HOOK)) {
                var p = {
                    "url": url,
                    "method": method
                };
                if (params) {
                    p["params"] = params;
                }
                return G_XHR_HOOK(p);
            }
            return null;
        },

        /**
         * Gets the XHR hooked URL if called in a portlet context
         * @param {String} url The URL to get
         * @param {String} method The method to use to retrieve the XHR hooked URL
         * @param {Object} params The parameters
         * @return {String} The XHR hooked URL if available, the provided URL otherwise
         */
        getXhrHookedURL: function(url, method, params) {
            var hook = _g.HTTP.getXhrHook(url, method, params);
            if (hook) {
                return hook.url;
            }
            return url;
        },

        /**
         * Reloads the XHR hook (portlet context)
         * @static
         * @param {String} url The URL
         * @return {String} Updated URL if reload hook function exists
         */
        reloadHook: function(url) {
            if (typeof G_RELOAD_HOOK != "undefined" && _g.$.isFunction(G_RELOAD_HOOK)) {
                if (CQURLInfo.selectorString != "") {
                    url = _g.HTTP.addSelector(url, CQURLInfo.selectorString);
                }
                url = G_RELOAD_HOOK(url) || url;
            }
            return url;
        }

    }
};

// shortcut
_g.HTTP = _g.shared.HTTP;
/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */

_g.shared.Util = new function() {
    return {
        /**
         * Reloads the window or replaces its location with the specified URL.
         * If no window is specified, the current window will be used.
         * @static
         * @param {Window} win (optional) The window to reload
         * @param {String} url (optional) The URL
         * @param {String} preventHistory (optional) Prevent history
         */
        reload: function(win, url, preventHistory) {
            if (!win) win = window;
            if (!url) {
                url = _g.HTTP.noCaching(win.location.href);
            }
            url = _g.HTTP.reloadHook(url);

            if (preventHistory) {
                win.location.replace(url);
            } else {
                win.location.href = url;
            }
        },

        /**
         * Loads the specified URL in the current window.
         * @static
         * @param {String} url The URL
         * @param {String} preventHistory (optional) Prevent history
         */
        load: function(url, preventHistory) {
            _g.Util.reload(window, url, preventHistory);
        },

        /**
         * Opens a new window with the specified URL.
         * If no window is specified, the current window will be used.
         * @static
         * @param {String} url The URL
         * @param {Window} win (optional) The window to reload
         * @param {String} name (optional) New window name
         * @param {String} options (optional) New window options
         * @return {Object} New window
         */
        open: function(url, win, name, options) {
            if (!win) win = window;
            if (!url) {
                return;
            }
            url = _g.HTTP.reloadHook(url);

            if (!name) {
                name = "";
            }
            if (!options) {
                options = "";
            }

            return win.open(url, name, options);
        },

        /**
         * Converts certain characters (&, <, >, and ") to their HTML character equivalents for literal display in web pages.
         * @param {String} value The string to encode
         * @return {String} The encoded text
         */
        htmlEncode : function(value) {
            return !value ? value : String(value).replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
        },

        /**
         * Converts certain characters (&, <, >, and ") from their HTML character equivalents.
         * @param {String} value The string to decode
         * @return {String} The decoded text
         */
        htmlDecode : function(value) {
            return !value ? value : String(value).replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
        },

        /**
         * Truncates a string and add an ellipsis ('...') to the end if it exceeds the specified length
         * @param {String}  value  The string to truncate
         * @param {Number}  length The maximum length to allow before truncating
         * @param {Boolean} word   True to try to find a common work break
         * @return {String} The converted text
         */
        ellipsis : function(value, length, word) {
            if (value && value.length > length) {
                if (word) {
                    var vs = value.substr(0, length - 2);
                    var index = Math.max(vs.lastIndexOf(' '), vs.lastIndexOf('.'), vs.lastIndexOf('!'), vs.lastIndexOf('?'), vs.lastIndexOf(';'));
                    if (index == -1 || index < (length - 15)) {
                        return value.substr(0, length - 3) + "...";
                    } else {
                        return vs.substr(0, index) + "...";
                    }
                } else {
                    return value.substr(0, length - 3) + "...";
                }
            }
            return value;
        },

                /**
         * Replaces occurrences of <code>{n}</code> in the specified text with
         * the texts from the snippets.
         * <p>Example 1 (single snippet):<pre><code>
var text = _g.Util.patchText("{0} has signed in.", "Jack");
           </code></pre>Result 1:<pre><code>
Jack has signed in.
           </code></pre></p>
         * <p>Example 2 (multiple snippets):<pre><code>
var text = "{0} {1} has signed in from {2}.";
text = _g.Util.patchText(text, ["Jack", "McFarland", "10.0.0.99"]);
           </code></pre>Result 2:<pre><code>
Jack McFarland has signed in from 10.0.0.99.
           </code></pre></p>
         * @static
         * @param {String} text The text
         * @param {String/String[]} snippets The text(s) replacing
         *        <code>{n}</code>
         * @return {String} The patched text
         */
        patchText: function(text, snippets) {
            if (snippets) {
                if (!_g.$.isArray(snippets)) {
                    text = text.replace("{0}", snippets);
                } else {
                    for (var i=0; i < snippets.length; i++) {
                        text = text.replace(("{" + i + "}"), snippets[i]);
                    }
                }
            }
            return text;
        },


        /**
         * Evaluates and returns the response text of the specified response
         * object.
         * @static
         * @param {Object} response The response object
         * @return {Object} The evaluated object
         * @deprecated Use {@link _g.HTTP#eval} instead
         */
        eval: function(response) {
            return _g.HTTP.eval(response);
        },

        /**
         * Returns the top most accessible window.
         * @static
         * @return {Window} The top window
         * @since 5.5
         */
        getTopWindow: function() {
            var win = window;
            try {
                // try to access parent
                // win.parent.location.href throws an exception if not authorized (e.g. different location in a portlet)
                while(win.parent && win !== win.parent && win.parent.location.href) {
                    win = win.parent;
                }
            } catch( error) {}
            return win;
        }

    }

};

// shortcut
_g.Util = _g.shared.Util;
/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */

/**
 * A helper class providing a set of Sling-related utilities.
 * @static
 * @singleton
 * @class _g.Sling
 */
_g.shared.Sling = function() {

    return {

        /**
         * The selector for infinite hierarchy depth when retrieving
         * repository content.
         * @static
         * @final
         * @type String
         */
        SELECTOR_INFINITY: ".infinity",

        /**
         * The parameter name for the used character set.
         * @static
         * @final
         * @type String
         */
        CHARSET: "_charset_",

        /**
         * The parameter name for the status.
         * @static
         * @final
         * @type String
         */
        STATUS: ":status",

        /**
         * The parameter value for the status type "browser".
         * @static
         * @final
         * @type String
         */
        STATUS_BROWSER: "browser",

        /**
         * The parameter name for the operation.
         * @static
         * @final
         * @type String
         */
        OPERATION: ":operation",

        /**
         * The parameter value for the delete operation.
         * @static
         * @final
         * @type String
         */
        OPERATION_DELETE: "delete",

        /**
         * The parameter value for the move operation.
         * @static
         * @final
         * @type String
         */
        OPERATION_MOVE: "move",

        /**
         * The parameter name suffix for deleting.
         * @static
         * @final
         * @type String
         */
        DELETE_SUFFIX: "@Delete",

        /**
         * The parameter name suffix for setting a type hint.
         * @static
         * @final
         * @type String
         */
        TYPEHINT_SUFFIX: "@TypeHint",

        /**
         * The parameter name suffix for copying.
         * @static
         * @final
         * @type String
         */
        COPY_SUFFIX: "@CopyFrom",

        /**
         * The parameter name suffix for moving.
         * @static
         * @final
         * @type String
         */
        MOVE_SUFFIX: "@MoveFrom",

        /**
         * The parameter name for the ordering.
         * @static
         * @final
         * @type String
         */
        ORDER: ":order",

        /**
         * The parameter name for the replace flag.
         * @static
         * @final
         * @type String
         */
        REPLACE: ":replace",

        /**
         * The parameter name for the destination flag.
         * @static
         * @final
         * @type String
         */
        DESTINATION: ":dest",

        /**
         * The parameter name for the save parameter prefix.
         * @static
         * @final
         * @type String
         */
        SAVE_PARAM_PREFIX: ":saveParamPrefix",

        /**
         * The parameter name for input fields that should
         * be ignored by Sling.
         * @static
         * @final
         * @type String
         */
        IGNORE_PARAM: ":ignore",

        /**
         * The parameter name for login requests.
         * @static
         * @final
         * @type String
         */
        REQUEST_LOGIN_PARAM: "sling:authRequestLogin",

        /**
         * Login URL
         * @static
         * @final
         * @type String
         */
        LOGIN_URL: "/system/sling/login.html",

        /**
         * Logout URL
         * @static
         * @final
         * @type String
         */
        LOGOUT_URL: "/system/sling/logout.html",

        /**
         * Detects and processes binary repository data returned by Sling
         * and does some preparsing on it for more easy data handling.
         * @static
         * @param {Object} value The repository data to check
         * @return {Object} The processed repository data
         */
        processBinaryData: function(value) {
            if (value && value[":jcr:data"] != undefined) {
                // value is a binary
                var o = new Object();
                o.size = value[":jcr:data"];
                o.type = value["jcr:mimeType"];
                o.date = value["jcr:lastModified"];
                value = o;
            }
            return value;
        },

        /**
         * Returns the content path for the data.
         * @static
         * @param {String} relPath The relative path to resolve
         * @param {String} absPath The absolute path to resovle against
         * @param {Boolean} allowParentPaths Indicates parent paths (../) should be processed at the start of the
         * relative path
         * @return {String} The absolute path path
         */
        getContentPath: function(relPath, absPath, allowParentPaths) {
            var path = absPath;
            if (path.lastIndexOf(".") > path.lastIndexOf("/")) {
                // remove selectors and extension from absPath:
                // /content/foo.bar.html >> /content/foo
                path = path.substr(0, path.indexOf(".", path.lastIndexOf("/")));
            }
            if (relPath) {
                if (relPath.indexOf("/") == 0) {
                    path = relPath;
                } else {
                    if (allowParentPaths) {
                        while (relPath.indexOf("../") == 0) {
                            relPath = relPath.substring(3);
                            path = path.substring(0, path.lastIndexOf("/"));
                        }
                    }
                    relPath = relPath.replace("./", "");
                    path = path + "/" + relPath;
                }
            }
            return path;
        }
    };

}();

// shortcut
_g.Sling = _g.shared.Sling;
/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */

/**
 * Provide static utilities for XSS management.
 *
 * @since 5.4
 */
_g.shared.XSS = new function() {
    return {
        /**
         * Get XSS property name from a provided property name
         *
         * @static
         * @param  {String} propertyName Property name
         * @return {String} XSS property name
         */
        getXSSPropertyName: function(propertyName) {
            if (!propertyName) {
                return '';
            }
            if (_g.XSS.KEY_REGEXP.test(propertyName)) {
                return propertyName;
            }
            return propertyName += _g.XSS.KEY_SUFFIX;
        },

        /**
         * Get XSS property value from provided property name and json record
         *
         * @static
         * @param  {Object} rec          Object containing the properties and their values
         * @param  {String} propertyName Property name
         * @param  {Number} ellipsisLimit Maximum number of characters
         * @return {String} XSS property value if it exists, non protected value otherwise
         */
        getXSSRecordPropertyValue: function(rec, propertyName, ellipsisLimit) {
            var value = '';
            if (rec && propertyName) {
                var xssPropValue = rec.get(this.getXSSPropertyName(propertyName));
                if (xssPropValue) {
                    value = xssPropValue;
                } else {
                    value = rec.get(propertyName);
                }

                if (ellipsisLimit && !isNaN(ellipsisLimit)) {
                    value = _g.Util.ellipsis(value, ellipsisLimit, true);
                }
            }
            return value;
        },

        /**
         * Get XSS property value from provided property name and table
         *
         * @static
         * @param  {Object} table         Object containing the properties and their values
         * @param  {String} propertyName  Property name
         * @param  {Number} ellipsisLimit Maximum number of characters
         * @return {String} XSS property value
         */
        getXSSTablePropertyValue: function(table, propertyName, ellipsisLimit) {
            var value = '';
            if (table && propertyName) {
                var xssPropValue = table[this.getXSSPropertyName(propertyName)];
                if (xssPropValue) {
                    value = xssPropValue;
                } else {
                    value = table[propertyName];
                }

                if (ellipsisLimit && !isNaN(ellipsisLimit)) {
                    value = _g.Util.ellipsis(value, ellipsisLimit, true);
                }
            }
            return value;
        },

        /**
         * XSS value renderer
         *
         * @static
         * @param  {String} val  Value to protect
         * @return {String} XSS protected value
         */
        getXSSValue: function(val) {
            if (val) {
                // There is a value to display, which we encode
                return _g.Util.htmlEncode(val);
            } else {
                // There was no value to display
                return '';
            }
        },

        /**
         * Update configuration object's property name if XSS is enabled for it
         *
         * @static
         * @param {Object}  cfg          Configuration object
         * @param {String}  propertyName Property name of the provided configuration object
         */
        updatePropertyName: function(cfg, propertyName) {
            if (!cfg || !propertyName || !cfg[propertyName]) {
                return;
            }
            if (cfg['xssProtect'] && !cfg['xssKeepPropName']) {
                cfg[propertyName] = this.getXSSPropertyName(cfg[propertyName]);
            }
        },

        /**
         * XSS property renderer
         *
         * @static
         * @param  {String} val  Value to display if XSS would not have been requested or is not available
         * @param  {Object} meta Field metadata
         * @param  {Object} cfg  Field configuration
         * @param  {Object} rec  Record containing information
         * @return {String} XSS property value
         */
        xssPropertyRenderer: function(val, meta, rec, cfg) {
            if (cfg && cfg['dataIndex'] && rec && rec.data && rec.data[this.getXSSPropertyName(cfg['dataIndex'])]) {
                // The record contains the XSS property equivalent
                val = rec.data[this.getXSSPropertyName(cfg['dataIndex'])];
                if (cfg['ellipsisLimit'] && !isNaN(cfg['ellipsisLimit'])) {
                    val = _g.Util.ellipsis(val, cfg['ellipsisLimit'], true);
                }
                return val;
            } else if (val) {
                // The record does not contain the XSS property equivalent
                return val;
            } else {
                // There was no value to display
                return '';
            }
        }
    }
};

// shortcut
_g.XSS = _g.shared.XSS;

/**
 * Key suffix for XSS property name
 * @static
 * @final
 * @type String
 */
_g.XSS.KEY_SUFFIX = "_xss";

/**
 * Key regular expression to test if a property name already ends with XSS suffix
 * @private
 * @static
 * @final
 * @type Object
 */
_g.XSS.KEY_REGEXP = new RegExp(_g.XSS.KEY_SUFFIX + "$");
/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */

/**
 * A helper class providing a set of utilities related to internationalization
 * (i18n). Note: for cq localization, make sure to use _g.I18n.get().
 * @static
 * @singleton
 * @class _g.I18n
 */
_g.shared.I18n = function() {

    /**
     * The map where the dictionaries are stored under their locale.
     * @private
     * @type Object
     */
    var dicts = new Object();

    /**
     * The initialization state of the internationalization.
     * @private
     * @type Boolean
     */
    var initialized = false;

    /**
     * The prefix for the URL used to request dictionaries from the server.
     * @private
     * @type String
     */
    var urlPrefix = "/libs/cq/i18n/dict.";

    /**
     * The suffix for the URL used to request dictionaries from the server.
     * @private
     * @type String
     */
    var urlSuffix = ".json";

    /**
     * The current locale.
     * @private
     * @static
     * @type String
     */
    var currentLocale = null;

    var languages = null;

    return {

        /**
         * The default locale (en).
         * @static
         * @final
         * @type String
         */
        LOCALE_DEFAULT: "en",

        /**
         * Initializes the i18n.
         * Example config:
         * <pre>{
         *   "locale": "en",
         *   "urlPrefix": "/apps/i18n/dict.",
         *   "urlSuffix": ".json"
         * }</pre>
         * @param {Object} config The config
         */
        init: function(config) {
            if (!config) {
                config = new Object();
            }
            if (config.locale) {
                _g.I18n.setLocale(config.locale);
            }
            if (config.urlPrefix) {
                _g.I18n.setUrlPrefix(config.urlPrefix);
            }
            if (config.urlSuffix) {
                _g.I18n.setUrlSuffix(config.urlSuffix);
            }
            initialized = true;
        },

        /**
         * Returns the current locale or the default locale if none is defined.
         * @static
         * @return {String} The locale
         */
        getLocale: function() {
            return currentLocale ? currentLocale : _g.I18n.LOCALE_DEFAULT;
        },

        /**
         * Sets the current locale.
         * @static
         * @param {String} locale The locale
         */
        setLocale: function(locale) {
            currentLocale = locale;
        },

        /**
         * Sets the prefix for the URL used to request dictionaries from
         * the server. The locale and URL suffix will be appended.
         * @static
         * @param {String} prefix The URL prefix
         */
        setUrlPrefix: function(prefix) {
            urlPrefix = prefix;
        },

        /**
         * Sets the suffix for the URL used to request dictionaries from
         * the server. It will be appended to the URL prefix and locale.
         * @static
         * @param {String} suffix The URL suffix
         */
        setUrlSuffix: function(suffix) {
            urlSuffix = suffix;
        },

        /**
         * Returns the dictionary for the specified locale. This method
         * will request the dictionary using the URL prefix, the locale,
         * and the URL suffix. If no locale is specified, the current
         * locale is used.
         * @static
         * @param {String} locale (optional) The locale
         * @return {Object} The dictionary
         */
        getDictionary: function(locale) {
            if (!locale) {
                locale = _g.I18n.getLocale();
            }
            if (!dicts[locale]) {
                // CQ.Log.debug("_g.I18n#getDictionary: loading dictionary for locale '{0}'", locale);
                var url = urlPrefix + locale + urlSuffix;
                try {
                    var response = _g.HTTP.get(url);
                    if (_g.HTTP.isOk(response)) {
                        dicts[locale] = _g.Util.eval(response);
                        // CQ.Log.debug("_g.I18n#getDictionary: dictionary for locale '{0}' loaded", locale);
                    }
                } catch (e) {
                    // CQ.Log.warn("_g.I18n#getDictionary: {0}", e.message);
                }
                if (!dicts[locale]) {
                    // CQ.Log.warn("_g.I18n#getDictionary: failed to load dictionary from {0}", url);
                    dicts[locale] = {};
                }
            }
            return dicts[locale];
        },

        /**
         * Translates the specified text into the current language.
         * @static
         * @param {String} text The text to translate
         * @param {String[]} snippets The snippets replacing <code>{n}</code> (optional)
         * @param {String} note A hint for translators (optional)
         * @return {String} The translated text
         * @deprecated use _g.I18n.get instead
         */
        getMessage: function(text, snippets, note) {
            return this.get(text, snippets, note);
        },

        /**
         * Translates the specified text into the current language. Use this
         * method to translate String variables, e.g. data from the server.
         * @static
         * @param {String} text The text to translate
         * @param {String} note A hint for translators (optional)
         * @return {String} The translated text
         * @deprecated use _g.I18n.getVar instead
         */
        getVarMessage: function(text, note) {
            return this.getVar(text, note);
        },

        /**
         * Translates the specified text into the current language.
         * @static
         * @param {String} text The text to translate
         * @param {String[]} snippets The snippets replacing <code>{n}</code> (optional)
         * @param {String} note A hint for translators (optional)
         * @return {String} The translated text
         */
        get: function(text, snippets, note) {
            var dict, newText, lookupText;
            lookupText = note ? text + " ((" + note + "))" : text;
            if (initialized) {
                dict = _g.I18n.getDictionary();
            }
            if (dict) {
                newText = dict[lookupText];
            }
            if (!newText) {
                newText = text;
            }
            //CQ.Log.trace("_g.I18n#get: translating '{0}' with '{1}'", [text, newText]);
            return _g.Util.patchText(newText, snippets);
        },

        /**
         * Translates the specified text into the current language. Use this
         * method to translate String variables, e.g. data from the server.
         * @static
         * @param {String} text The text to translate
         * @param {String} note A hint for translators (optional)
         * @return {String} The translated text
         */
        getVar: function(text, note) {
            if (!text) {
                return null;
            }
            return this.get(text, null, note);
        },

        /**
         * Returns the available languages, including a "title" property with a display name:
         * for instance "German" for "de" or "German (Switzerland)" for "de_ch".
         * @static
         * @return {Object} An object with language codes as keys and an object with "title",
         *                  "language", "country" and "defaultCountry" members.
         * @since 5.4
         */
        getLanguages: function() {
            if (!languages) {
                try {
                    // use overlay servlet so customers can define /apps/wcm/core/resources/languages
                    var json = _g.HTTP.eval("/libs/wcm/core/resources/languages.overlay.infinity.json");
                    _g.$.each(json, function(name, lang) {
                        lang.title = _g.I18n.getVar(lang.language);
                        if (lang.title && lang.country && lang.country != "*") {
                            lang.title += " ("+_g.I18n.getVar(lang.country)+")";
                        }
                    });
                    languages = json;
                } catch (e) {
                    // CQ.Log.error("CQ.I18n#getLanguages failed: " + e.message);
                    languages = {};
                }
            }
            return languages;
        },

        /**
         * Parses a language code string such as "de_CH" and returns an object with
         * language and country extracted. The delimiter can be "_" or "-".
         * @static
         * @param {String} langCode a language code such as "de" or "de_CH" or "de-ch"
         * @return {Object} an object with "code" ("de_CH"), "language" ("de") and "country" ("CH")
         *                  (or null if langCode was null)
         * @since 5.4
         */
        parseLocale: function(langCode) {
            if (!langCode) {
                return null;
            }
            var pos = langCode.indexOf("_");
            if (pos < 0) {
                pos = langCode.indexOf("-");
            }
            
            var language, country;
            if (pos < 0) {
                language = langCode;
                country = null;
            } else {
                language = langCode.substring(0, pos);
                country = langCode.substring(pos + 1);
            }
            return {
                code: langCode,
                language: language,
                country: country
            };
        }

    };

}();

// shortcut
_g.I18n = _g.shared.I18n;
/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */

/**
 * A helper class providing a set of String related utilities.
 * @static
 * @singleton
 * @class _g.String
 */
_g.shared.String = new function() {

    return {

        /**
         * Check to see if the the str starts with the prefix.
         * The comparison is case sensitive.
         * @static
         * @param {String} str The string to check.
         * @param {String} prefix The prefix to find.
         * @return {Boolean} if the str starts with the prefix
         * return true, otherwise false.
         */
        startsWith: function( str, prefix ) {
            if (str == null || prefix == null) {
                return str == null && prefix == null;
            }

            if (prefix.length > str.length) {
                return false;
            }

            // ensure we are dealing with the string form of this object
            var sMatch = str.toString();
            var sSearch	= prefix.toString();

            return (sMatch.indexOf(sSearch) == 0);
        },

        /**
         * Check to see if the the str ends with the suffix.
         * The comparison is case sensitive.
         * @static
         * @param {String} str The string to check.
         * @param {String} suffix The suffix to find.
         * @return {Boolean} if the str ends with the suffix
         * return true, otherwise false.
         */
        endsWith: function( str, suffix ) {

            if (str == null || suffix == null) {
                return str == null && suffix == null;
            }

            if (suffix.length > str.length) {
                return false;
            }

            // ensure we are dealing with the string form of this object
            str = str.toString();
            suffix	= suffix.toString();

            return (str.lastIndexOf(suffix) == (str.length - suffix.length));
        },

        /**
         * Check to see if the the str contains the searchStr.
         * The comparison is case sensitive.
         * @static
         * @param {String} str The string to check.
         * @param {String} searchStr The prefix to find.
         * @return {Boolean} if the str ends with the suffix
         * return true, otherwise false.
         */
        contains: function( str, searchStr ) {

            if (str == null || searchStr == null) {
                return false;
            }

            // ensure we are dealing with the string form of this object
            str = str.toString();
            searchStr = searchStr.toString();

            return (str.indexOf(searchStr) >= 0);
        }
    }
};

// shortcut
_g.String = _g.shared.String;
/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */

//------------------------------------------------------------------------------
// Initialize the Granite shared library

_g.HTTP.detectContextPath();

//todo: user language (not yet available)
//_g.I18n.init({locale: _g.User.getLanguage()});
_g.I18n.init();
/*
 * Copyright 1997-2010 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */

/*
 * Copyright 1997-2010 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */

/**
 * The <code>CQ</code> library contains all CQ component classes and utilities.
 * @static
 * @class CQ
 */
window.CQ = window.CQ || {};

// map CQ.shared to Granite shared
CQ.shared = _g.shared;

// shortcuts
CQ.Sling = CQ.shared.Sling;
CQ.I18n = CQ.shared.I18n;

// map constants for portlet support
G_XHR_HOOK = typeof CQ_XHR_HOOK != "undefined" ? CQ_XHR_HOOK : undefined;
G_XHR_RELOAD = typeof CQ_RELOAD_HOOK != "undefined" ? CQ_RELOAD_HOOK : undefined;
G_CONTENT_PATH = typeof CQ_CONTENT_PATH != "undefined" ? CQ_CONTENT_PATH : undefined;
/**
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2011 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */

/**
 * A helper class providing a set of Form-related utilities.
 * @static
 * @singleton
 * @class CQ.shared.Form
 */
CQ.shared.Form = function() {

    /**
     * Returns an associative array mapping ids to label nodes.
     * @private
     * @return {Object} For instance:
     *      {
     *          id1: labelNode1,
     *          id2: labelNode2,
     *          ...
     *      }
     */
    var getDocumentLabelMap = function() {
        var labelMap = new Object();
        var labelNodes = document.getElementsByTagName("label");
        for (var i = 0; i < labelNodes.length; i++) {
            var forId = labelNodes[i].htmlFor;  // buggy IE can't handle getAttribute("for")
            if (forId) {
                labelMap[forId] = labelNodes[i];
            }
        }
        return labelMap;
    };

    /**
     * Given a <label> node (perhaps one containing <input> or <select> children), return the text
     * content (excluding any <input> or <select> content).
     * @private
     * @return {String} The text content of all non-<input> and non-<select> descendants.
     */
    var getLabelNodeTextContent = function(node) {
        var text = "";
        var walkTree = function(node) {
            if (node.nodeType == 3) { // text node
                text += node.nodeValue;
            }
            if (node.nodeName.toLowerCase() == "select"
                || node.nodeName.toLowerCase() == "input"
                || node.nodeName.toLowerCase() == "textarea"
                || node.nodeName.toLowerCase() == "button") {
                // don't walk into fields if they're children of the label
                return;
            }
            for (var i = 0; node.childNodes && i < node.childNodes.length; i++) {
                walkTree(node.childNodes[i]);
            }
        };
        walkTree(node);
        return text;
    };

    /**
     * Given an indexed id, return the id for the parent section (the id with the index stripped off).
     * @private
     */
    var getSectionIdForIndexedId = function(id) {
        return id.replace(/-\d+$/, "");
    };

    /**
     * Return the label text (as a <code>String</code>) for a particular <code>id</code>.  When a label
     * can't be found, return the id itself as a fall-back.
     * @param {String} id The id which the target <code>&lt;label&gt;</code> refers to.
     * @note Public callers can ignore the <code>documentLabelMap</code> parameter (it's used internally
     * as a caching mechanism).
     * @return {String} The label text.
     */
    var getLabelForId = function(id, documentLabelMap) {
        if (!documentLabelMap) {
            documentLabelMap = getDocumentLabelMap();
        }

        if (documentLabelMap[id]) {
            return getLabelNodeTextContent(documentLabelMap[id]);
        }
        return null;
    };

    /**
     * Locate the default values for the given node. Supported nodes
     * include, <code>input</code>, <code>textarea</code>, <code>option</code>.
     *
     * @private
     * @param {HTMLElement} node The element which to locate the default value for.
     * @return {String} the default value for the given node.
     */
    var getDefaultValue = function(node) {
        var defaultValue;
        var nodeName = node.nodeName.toLowerCase();
        var nodeType = hasAttribute(node, "type") ? node.getAttribute("type") : undefined;

        if (nodeName == "input") {
            if (nodeType == "radio" || nodeType == "checkbox") {
                if (hasAttribute(node, "checked")) {
                    defaultValue = node.getAttribute("value");
                }
            } else if (node.type == "text") {
                defaultValue = node.defaultValue;
                // support elements like hidden, reset, submit
            } else {
                defaultValue = node.value;
            }
        } else if (nodeName == "textarea") {
            defaultValue = node.value;
        } else if (nodeName == "option" && hasAttribute(node, "selected")) {
            defaultValue = node.getAttribute("value");
        }

        return defaultValue;
    };

    /**
     * Helper function to get around IE7 not supporting hasAttribute.
     * @private
     * @param el the html element
     * @param attr the attribute to test for.
     */
    var hasAttribute = function(el, attr) {
        if (el == null) {
            return false;
        }

        return (el.getAttribute(attr) != null)
    };

    return {

        /**
         * Searches an array for an object with a particular property of a particular value.
         * @return {Object} the first object which matches, or null if no objects match.
         */
        searchArray: function(arr, testProperty, testValue) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i][testProperty] && arr[i][testProperty] == testValue) {
                    return arr[i];
                }
            }
            return null;
        },

        /**
         * Return the label text for an <code>&lt;input&gt;</code> or <code>&lt;select&gt;</code>.  When a
         * label can't be found, the element's name attribute is used as a fall-back.
         * @param {HTMLElement} fieldNode The <code>&lt;input&gt;</code>, <code>&lt;select&gt;</code> or
         * <code>&lt;textArea&gt;</code> node.
         * @note Public callers can ignore the <code>documentLabelMap</code> parameter (it's used internally
         * as a caching mechanism).
         * @return {String} The label text.
         */
        getLabelForField: function(fieldNode, documentLabelMap) {
            if (!documentLabelMap) {
                documentLabelMap = getDocumentLabelMap();
            }

            var id = fieldNode.getAttribute("id");
            if (id && documentLabelMap[id]) {
                return getLabelNodeTextContent(documentLabelMap[id]);
            }

            var parent = fieldNode.parentNode;
            while (parent) {
                if (parent.nodeName.toLowerCase() == "label") {
                    return getLabelNodeTextContent(parent);
                }
                parent = parent.parentNode;
            }

            // No label found; we'll have to live with the name:
            return fieldNode.getAttribute("name");
        },

        /**
         * Get a list of fields in the document.
         * @return {Array} Each object in the array represents a field.  Each field contains:
         * <div class="mdetail-params"><ul)
         *   <li><code>text</code> : String<div class="sub-desc">The label to display (usually the field's caption).</div></li>
         *   <li><code>value</code> : String<div class="sub-desc">The name of the field.</div></li>
         *   <li><code>enumeration</code> : Array|null<div class="sub-desc">For enumerated fields, a nested array of text/value pairs.</div></li>
         * </ul></div>
         */
        getFields: function() {

            var documentLabelMap = getDocumentLabelMap();

            var fields = [];

            var visitNamedNode = function(node, inLocalNode) {
                var name = node.getAttribute("name");
                var nodeType = node.nodeName.toLowerCase();
                var field;

                if (nodeType == "input" || nodeType == "textarea") {
                    var controlType = hasAttribute(node, "type") ? node.getAttribute("type").toLowerCase() : "text";
                    if (controlType == "button" || controlType == "submit" || controlType == "reset") {
                        return;
                    }

                    // Fetch (or create) the field record:
                    //
                    field = CQ.shared.Form.searchArray(fields, "value", name);
                    if (!field) {
                        fields.push({
                            "text": CQ.shared.Form.getLabelForField(node, documentLabelMap),
                            "value": name,      // for Selection.setOptions()
                            "name": name,       // for everyone else
                            "enumeration": undefined,
                            "local": inLocalNode,
                            "type": nodeType,
                            "defaultValue": getDefaultValue(node),
                            "node": node
                        });
                        field = fields[fields.length-1];
                    }

                    // See if we're an enumeration.  Note that Sidekick-authored checkboxes are always
                    // enumerations, even when they appear singly.
                    //
                    if (controlType == "radio" || (field.local && controlType == "checkbox")) {
                        if (!field.enumeration) {
                            // This is the first one we've found of this group; promote the label to the
                            // section label
                            var inputId = node.getAttribute("id");
                            if (inputId) {
                                var sectionId = getSectionIdForIndexedId(inputId);
                                var sectionLabel = getLabelForId(sectionId, documentLabelMap);
                                field.text = (sectionLabel ? sectionLabel : name);
                            } else {
                                field.text = name;
                            }
                            field.enumeration = [];
                        }
                        field.enumeration.push({
                            "text": CQ.shared.Form.getLabelForField(node, documentLabelMap),
                            "value": node.getAttribute("value"),
                            "defaultValue": getDefaultValue(node),
                            "node": node
                        });
                    }
                } else if (nodeType == "select") {
                    // Create the field record:
                    //
                    fields.push({
                        "text": CQ.shared.Form.getLabelForField(node, documentLabelMap),
                        "value": name,              // for Selection.setOptions()
                        "name": name,               // for everyone else
                        "enumeration": [],
                        "local": inLocalNode,
                        "type": nodeType,
                        "defaultValue": undefined,  // defaultValues are on the options, not select element
                        "node": node
                    });
                    field = fields[fields.length-1];

                    // Add the options to the field's enumeration:
                    //
                    var optionNodes = node.getElementsByTagName("option");
                    for (var i = 0; i < optionNodes.length; i++) {
                        field.enumeration.push({
                            "text": optionNodes[i].innerHTML,
                            "value": optionNodes[i].getAttribute("value"),
                            "defaultValue": getDefaultValue(optionNodes[i]),
                            "node": optionNodes[i]
                        });
                    }
                }
            };

            var walkTree = function(node, inLocalNode) {
                if (node.nodeName.toLowerCase() == "div" && $CQ(node).hasClass("section")) {
                    inLocalNode = true;
                }

                if (node.getAttribute && node.getAttribute("name")) {
                    visitNamedNode(node, inLocalNode);
                }

                for (var i = 0; node.childNodes && i < node.childNodes.length; i++) {
                    var child = node.childNodes[i];
                    if (child.nodeType == 1) { // if element
                        walkTree(child, inLocalNode);
                    }
                }
            };

            walkTree(document, false);
            return fields;
        }
    }
}();
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */

/**
 * @class CQ.User
 * A helper class providing information about a CQ user as well as
 * methods to manipulate it. Use {@link #User.getCurrentUser} to
 * retrieve an instance of this class for the current user.
 * @singleton
 */
CQ.shared.User = function(infoData) {
    return  {
        /**
         * @property {Object} data
         * The user data.
         * @private
         */
        data: null,

        /**
         * @property {String} language
         * Resolved language read from preferences
         * @private
         */
        language: null,

        /**
         * @property {String} userPropsPath
         * The path where user properties may be requested from.
         * @private
         */
        userPropsPath: null,

        /**
         * Assembles the url to request the user properties from.
         * Apply default if no path has been set.
         * @private
         */
        getUserPropsUrl: function() {
            if(!this.userPropsPath) {
                this.userPropsPath = CQ.shared.User.PROXY_URI;
            }
            return this.userPropsPath;
        },

        init: function(infoData) {
            if (infoData) {
                // this is not used yet
                this.data = infoData;
            } else {
                var url = this.getUserPropsUrl();
                url = CQ.shared.HTTP.noCaching(url);
                var response = CQ.shared.HTTP.get(url);
                if (CQ.shared.HTTP.isOk(response)) {
                    this.data = CQ.shared.Util.eval(response);
                }
            }
            return this.data;
        },

        /**
         * Returns the language selected by the user.
         * @return {String} The language
         */
        getLanguage: function() {
            this.language = this.data &&
                this.data["preferences"] &&
                this.data["preferences"]["language"] ?
                this.data["preferences"]["language"] :
                "en";
            return this.language;
        }

    }

}();

/**
 * The URI to retrieve the user info from (defaults to "/libs/cq/security/userinfo.json").
 * @static
 * @final
 * @type String
 */
CQ.shared.User.PROXY_URI = CQ.shared.HTTP.externalize("/libs/cq/security/userinfo" + CQ.shared.HTTP.EXTENSION_JSON);
/*
 * Copyright 1997-2010 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
//------------------------------------------------------------------------------
// Initialize the CQ shared library

CQ.shared.User.init();

CQ.shared.I18n.init({
    locale: CQ.shared.User.getLanguage(),
    urlPrefix: "/libs/cq/i18n/dict."
});
