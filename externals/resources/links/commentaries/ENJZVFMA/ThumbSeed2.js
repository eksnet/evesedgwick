/* ~/Scripts/Fivemin.baseconfig.js */

/**
 * Generic Config
 */
if (typeof (FIVEMIN) == "undefined") { var FIVEMIN = {}; }
if (typeof (FIVEMIN.BaseConfig) == 'undefined') {
    FIVEMIN.BaseConfig = { };
}

if (typeof (FIVEMIN.BaseConfig.ExecCommands) == 'undefined') {
    FIVEMIN.BaseConfig.MinimumFlashVersion = "9.0.115";
    FIVEMIN.BaseConfig.NextMinFlashVersion = "10.3";
    FIVEMIN.BaseConfig.UseFlashProxy = false;
    FIVEMIN.BaseConfig.FlashProxyUrl = "flashproxy/flashproxy.swf";
	FIVEMIN.BaseConfig.PlayerEvents= {
        ready: 1,
        videoDataLoaded: 2,
        play: 4,
        pause: 8,
        progress: 16,
        userSearch: 32,
        timeUpdate: 64,
        videoStartPlay: 128,
        adStart: 256,
        adEnd: 512
	};
	FIVEMIN.BaseConfig.ExecCommands= [
	 	'ToggleEmbedCodeDialog',
	 	'ToggleDirectLinkDialog',
	 	'ToggleSendFriendDialog',
	 	'VideoPlay',
	 	'VideoPause',
	 	'VideoMute',
	 	'VideoVolume',
	 	'ToggleCaptions',
	 	'VideoSeekTo',
	 	'VideoRewind'
	];
}

if (typeof (FIVEMIN.BaseConfig.Lightbox) == 'undefined') {
    FIVEMIN.BaseConfig.Lightbox = {
        css: "CSS/Lightbox.css"
    };
}

if (typeof (FIVEMIN.BaseConfig.VideoSection) == 'undefined') {
    FIVEMIN.BaseConfig.VideoSection = {
        defaults: {
            textColor: "#006699",
            pageBgColor: "#FFFFFF",
            playerColor: "#006699",
            pageWidth: 975,
            categories: []
        },

        schemeLists: {
            "default": ["#191919", "#7EC359", "#E50030", "#006699", "#FB612B", "#C1BCBD", "#923DF4", "#5DC0E9"],
            textColor: ["#006699", "#191919", "#E50030", "#7EC359", "#FB612B", "#C1BCBD", "#923DF4", "#5DC0E9"],
            pageBgColor: ["#FFFFFF", "#191919", "#7EC359", "#E50030", "#006699", "#FB612B", "#C1BCBD", "#923DF4", "#5DC0E9"],
            playerColor: ["#006699", "#191919", "#E50030", "#7EC359", "#FB612B", "#C1BCBD", "#923DF4", "#5DC0E9", "#FFFFFF"]
        },

        maxPageWidth: 1200,
        minPageWidth: 955
    };
}

if (typeof (FIVEMIN.BaseConfig.Logger) == 'undefined') {
    FIVEMIN.BaseConfig.Logger = {
        LogLevel: -1,
        LogServer: ('https:' == document.location.protocol ? "https:" : "http:") + "//l.5min.com",
        Enums: {
            broVer: {
                unknown: 0,
                ie: 1,
                firefox: 2,
                chrome: 3,
                safari: 4
            },
            osVer: {
                unknown: 0,
                win: 1,
                mac: 2,
                linux: 3,
                webos: 4,
                android: 5,
                ios: 6
            },
        	pt: {
        		flash: 1,
        		html5: 2,
        		chromeless: 3
        	},
            rType: {
                noResults: 0,
                success: 1,
                timeout: 2
            },
            content: {
                featured: 0,
                seed: 1,
                playlist: 2,
            	videogroup: 3
            },
            embCont: {
                single: 0,
                playlist: 1
            },
            pgLoc: {
                topLeft: 0,
                topCenter: 1,
                topRight: 2,
                bottomLeft: 3,
                bottomCenter: 4,
                bottomRight: 5
            },
            viewSrc: {
                productView: 0,
                playlistView: 1,
                relatedPlayer: 2,
                relatedDeep: 3
            },
            isDeep: {
                'false': 0,
                'true': 1
            },
            auStart: {
                empty: 0,
                'false': 0,
                'true': 1
            },
            adUnit: {
                'false': 0,
                'true': 1
            },
            adSize: {
                '728x90': 0,
                '300x250': 1,
                '468x60': 2,
                '160x600': 3
            },
            adLoc: {
                bottom: 0,
                side: 1
            },
            thSize: {
                large: 0,
                medium: 1,
                small: 2
            },
            txtLoc: {
                bottom: 0,
                side: 1
            },
            fType: {
                category: 0,
                video: 1,
                empty: 2
            },
            sHF: {
                'false': 0,
                'true': 1
            },
            thAlign: {
                horizontal: 0,
                vertical: 1
            },
            header: {
                'false': 0,
                'true': 1
            },
            cbPos: {
                left: 0,
                right: 1,
                bottom: 2,
                top: 3,
                custom: 4
            },
            uNxt: {
                'false': 0,
                'true': 1
            },
            ruNxt: {
                'false': 0,
                'true': 1
            },
            hc: {
                'false': 0,
                'true': 1
            },
            foos: {
                'false': 0,
                'true': 1
            },
            bType: {
                bar: 0,
                tab: 1
            },
            bLoc: {
                left: 0,
                right: 1
            },
            bPos: {
                top: 0,
                middle: 1,
                bottom: 2
            },
            bState: {
                half: 0,
                full: 1
            },
            vFlg: {
                'false': 0,
                'true': 1
            },
            vExp: {
                SID: 0,
                Fivemin: 1,
                Syndication: 2
            },
            vGeo: {
                All: 0,
                US: 2,
                NonUS: 3
            },
            vf: {
                'false': 0,
                'true': 1
            },
            emType: {
                TSDeepSeed: 0,
                BSDeepSeed: 1,
                VideoSection: 2,
                Regular: 3
            },
            proTy: {
	            Embed: 0,
	            ThumbSeed: 1,
	            PlayerSeed: 2,
	            BarSeed: 3
            }
        }
    };
}


/* ~/Scripts/Fivemin.baseconfig.urls.js */

var FIVEMIN = (function (SCOPE) {
if (typeof (SCOPE.BaseConfig) == 'undefined') SCOPE.BaseConfig = {};
if (typeof (SCOPE.BaseConfig.version) != 'undefined') SCOPE.BaseConfig.version = 896;
if (typeof (SCOPE.BaseConfig.urls) != 'undefined') return SCOPE;
SCOPE.BaseConfig.urls = {
www: 'http://www.5min.com/',
shared: 'http://pshared.5min.com/',
syn: 'http://syn.5min.com/',
embed: 'http://embed.5min.com/',
api: 'http://api.5min.com/',
files: 'http://cfiles.5min.com/',
services: '',
aolonsite: 'http://on.aol.com/',
console: 'http://console.aolonnetwork.com/'
};
return SCOPE;
})(FIVEMIN || {});



/* ~/Scripts/Fivemin.BaseConfig.Thumbseed.js */

/**
* Config for ThumbSeed
*/
if (typeof (FIVEMIN) == "undefined") { var FIVEMIN = {}; }
if (typeof (FIVEMIN.BaseConfig) == 'undefined') { FIVEMIN.BaseConfig = {}; }
if (FIVEMIN.BaseConfig.ThumbSeed == null) {
	FIVEMIN.BaseConfig.ThumbSeed = {
		debug: false,
		"script-regex": /http:\/\/(\w?)shared\.5min\.com\/scripts\/thumbseed2?\.js\?/i ,
		colors: {
			"header-text": "#666666"
			, "desc-text": "#FFFFFF"
			, "desc-background": "#000000"
		}
		, obj: "ThumbSeed"
		, styles: {
			sizes: {
				"horizontal": {
					large: {
						bottom: [
							{ width: 468, height: 200, num_thumbs: 3 },
							{ width: 310, height: 200, num_thumbs: 2 },
							{ width: 148, height: 220, num_thumbs: 1 }
						],
						side: [
							{ width: 300, height: 200, num_thumbs: 1 }
						]
					},
					small: {
						bottom: [
							{ width: 468, height: 164, num_thumbs: 4 },
							{ width: 347, height: 164, num_thumbs: 3 },
							{ width: 230, height: 205, num_thumbs: 2 },
							{ width: 109, height: 205, num_thumbs: 1 }
						],
						side: [

							{ width: 483, height: 120, num_thumbs: 2 },
							{ width: 239, height: 120, num_thumbs: 1 }
						]
					}
				},
				"vertical": {
					small: {
						bottom: [
							{ width: 109, height: 620, num_thumbs: 4 },
							{ width: 109, height: 480, num_thumbs: 3 },
							{ width: 109, height: 340, num_thumbs: 2 },
							{ width: 109, height: 205, num_thumbs: 1 }
						],
						side: [
							{ width: 250, height: 330, num_thumbs: 3 },
							{ width: 250, height: 235, num_thumbs: 2 },
							{ width: 250, height: 140, num_thumbs: 1 },
							{ width: 300, height: 250, num_thumbs: 2 }
						]
					},
					large: {
						bottom: [
							{ width: 148, height: 560, num_thumbs: 3 },
							{ width: 148, height: 390, num_thumbs: 2 },
							{ width: 148, height: 220, num_thumbs: 1 }
						],
						side: [
							{ width: 300, height: 300, num_thumbs: 2 },
							{ width: 300, height: 163, num_thumbs: 1 }
						]
					}
				},
				"matrix": {
					small: {
						bottom: [
							{ width: 347, height: 445, num_thumbs: 9 },
							{ width: 347, height: 305, num_thumbs: 6 },
							{ width: 347, height: 164, num_thumbs: 3 }
						],
						side: [
							{ width: 250, height: 330, num_thumbs: 3 },
							{ width: 250, height: 235, num_thumbs: 2 },
							{ width: 250, height: 140, num_thumbs: 1 }
						]
					},

					large: {
						bottom: [
							{ width: 468, height: 544, num_thumbs: 9 },
							{ width: 468, height: 365, num_thumbs: 6 },
							{ width: 468, height: 200, num_thumbs: 3 }
						],
						side: [
							{ width: 300, height: 300, num_thumbs: 2 },
							{ width: 300, height: 163, num_thumbs: 1 }
						]
					}
				}
			},
			sizeLimits: {
				"small_bottom_min": { width: 108, height: 152 },
				"small_bottom_max": { width: 906, height: 807 },
				"small_side_min": { width: 200, height: 108 },
				"small_side_max": { width: 711, height: 696 },
				"large_bottom_min": { width: 148, height: 182 },
				"large_bottom_max": { width: 923, height: 504 },
				"large_side_min": { width: 300, height: 138 },
				"large_side_max": { width: 922, height: 723 }
			},
			sizesWithAd: {
				"468X200": { ad: { width: 468, height: 60 }, thumbnailSize: "large", textLocation: "bottom" },
				"728X164": { ad: { width: 728, height: 90 }, thumbnailSize: "small", textLocation: "bottom" },
				"728X120": { ad: { width: 728, height: 90 }, thumbnailSize: "small", textLocation: "side" },
				"468X164": { ad: { width: 125, height: 125 }, thumbnailSize: "small", textLocation: "bottom" },
				"468X164"/*B*/: { ad: { width: 468, height: 60 }, thumbnailSize: "small", textLocation: "bottom" },
				"108X600": { ad: { width: 160, height: 600 }, thumbnailSize: "small", textLocation: "bottom" },

				"300X300": { ad: { width: 300, height: 250 }, thumbnailSize: "large", textLocation: "side" },
				"300X250": { ad: { width: 300, height: 250 }, thumbnailSize: "small", textLocation: "side" },
				"468X544": { ad: { width: 468, height: 60 }, thumbnailSize: "large", textLocation: "bottom" }
			},
			colors: {
				black: {
					name: "Black",
					colors: {
						small: {
							headerTextColor: "#000000",
							textFGColor: "#FFFFFF",
							textBGColor: "#000000",
							textFGColor_MO: "#FFFFFF",
							textBGColor_MO: "#000000"
						},
						large: {
							headerTextColor: "#000000",
							textFGColor: "#000000",
							textBGColor: "",
							textFGColor_MO: "#FFFFFF",
							textBGColor_MO: "#000000"
						}
					},
					iconBg: "#191919",
					iconBorder: "#000000"
				},
				green: {
					name: "Green",
					colors: {
						small: {
							headerTextColor: "#2E7720",
							textFGColor: "#FFFFFF",
							textBGColor: "#2E7720",
							textFGColor_MO: "#FFFFFF",
							textBGColor_MO: "#000000"
						},
						large: {
							headerTextColor: "#2E7720",
							textFGColor: "#333333",
							textBGColor: "",
							textFGColor_MO: "#FFFFFF",
							textBGColor_MO: "#2E7720"
						}
					},
					iconBg: "#7EC359",
					iconBorder: "#7B975F"
				},
				red: {
					name: "Red",
					colors: {
						small: {
							headerTextColor: "#CC0000",
							textFGColor: "#FFFFFF",
							textBGColor: "#CC0000",
							textFGColor_MO: "#FFFFFF",
							textBGColor_MO: "#000000"
						},
						large: {
							headerTextColor: "#CC0000",
							textFGColor: "#333333",
							textBGColor: "",
							textFGColor_MO: "#FFFFFF",
							textBGColor_MO: "#CC0000"
						}
					},
					iconBg: "#E50030",
					iconBorder: "#7E151E"
				},
				blue: {
					name: "Blue",
					colors: {
						small: {
							headerTextColor: "#006699",
							textFGColor: "#FFFFFF",
							textBGColor: "#006699",
							textFGColor_MO: "#FFFFFF",
							textBGColor_MO: "#000000"
						},
						large: {
							headerTextColor: "#006699",
							textFGColor: "#006699",
							textBGColor: "",
							textFGColor_MO: "#FFFFFF",
							textBGColor_MO: "#006699"
						}
					},
					iconBg: "#006699",
					iconBorder: "#002780"
				},
				orange: {
					name: "Orange",
					colors: {
						small: {
							headerTextColor: "#FF6600",
							textFGColor: "#FFFFFF",
							textBGColor: "#FF6600",
							textFGColor_MO: "#FFFFFF",
							textBGColor_MO: "#000000"
						},
						large: {
							headerTextColor: "#FF6600",
							textFGColor: "#333333",
							textBGColor: "",
							textFGColor_MO: "#FFFFFF",
							textBGColor_MO: "#FF6600"
						}
					},
					iconBg: "#FB612B",
					iconBorder: "#B45E3F"
				},
				grey: {
					name: "Grey",
					colors: {
						small: {
							headerTextColor: "#656565",
							textFGColor: "#FFFFFF",
							textBGColor: "#656565",
							textFGColor_MO: "#FFFFFF",
							textBGColor_MO: "#000000"
						},
						large: {
							headerTextColor: "#656565",
							textFGColor: "#333333",
							textBGColor: "",
							textFGColor_MO: "#FFFFFF",
							textBGColor_MO: "#656565"
						}
					},
					iconBg: "#C1BCBD",
					iconBorder: "#ABABA6"
				},
				purple: {
					name: "Purple",
					colors: {
						small: {
							headerTextColor: "#592e7b",
							textFGColor: "#FFFFFF",
							textBGColor: "#592e7b",
							textFGColor_MO: "#FFFFFF",
							textBGColor_MO: "#000000"
						},
						large: {
							headerTextColor: "#592e7b",
							textFGColor: "#592e7b",
							textBGColor: "",
							textFGColor_MO: "#FFFFFF",
							textBGColor_MO: "#592e7b"
						}
					},
					iconBg: "#923DF4",
					iconBorder: "#5F3584"
				},
				lightblue: {
					name: "Light blue",
					colors: {
						small: {
							headerTextColor: "#79B0CB",
							textFGColor: "#FFFFFF",
							textBGColor: "#79B0CB",
							textFGColor_MO: "#FFFFFF",
							textBGColor_MO: "#000000"
						},
						large: {
							headerTextColor: "#79B0CB",
							textFGColor: "#79B0CB",
							textBGColor: "",
							textFGColor_MO: "#FFFFFF",
							textBGColor_MO: "#79B0CB"
						}
					},
					iconBg: "#5DC0E9",
					iconBorder: "#5D95A7"
				}
			},
			defaults: {
				layout: "horizontal",
				layoutWithAd: "468X200",
				color: "black",
				sizeType: "standard",
				featured: "semantic",
				title: "Related Videos",
				headerTextColor: '#000000',
				textFGColor: '#FFFFFF',
				textFGColor_MO: '#FFFFFF',
				textBGColor: '#000000',
				textBGColor_MO: '#000000',
				fallback: 1,
				fallbackType: 'category'
			}
		}
	};
}
if (FIVEMIN.BaseConfig.Logger == null) FIVEMIN.BaseConfig.Logger = {};
if (FIVEMIN.BaseConfig.Logger.ThumbSeed == null) {
	FIVEMIN.BaseConfig.Logger.ThumbSeed = {
		params: {
			sid: "142",
			urlId: 0,
			content: 1, //featured,seed,playlist
			cqReq: 2, // contentQuality from js
			catsReq: "", // categories requested
			fType: 1, // fallbackType video, category
			sKey: ''
		},
		events: {
			addReq: {
				name: "TSRq",
				bitValue: 1,
				priorty: 2,
				params: {
					isDeep: 0, // isDeepSeed 
					adUnit: 0,
					adSize: "", //728X90, 300X250 ,468X60, 106X600
					adLoc: 1, // bottom or side // adLoation
					thSize: 1, // ThumbSize
					txtLoc: 0, // TextLocation - bottom, side 
					sHF: 0, // Show header footer
					nThumb: "",
					thAlign: 0, // thumbAlign 0 = vertical, 1 = horizontal
					uNxt: 0, // UpNext
					ruNxt: 0 // Related up next
				}
			},
			AddResult: {
				name: "TSRs",
				bitValue: 2,
				params: {
					rType: 1, //result type
					nVids: "", // num of videos
					uNxt: 0, // UpNext
					ruNxt: 0 // Related up next
				}
			},
			AddImpression: {
				name: "TSI",
				bitValue: 4,
				params: {
					nVids: "", // num of videos
					pgLoc: "", // location in page
					sessImp: 0,
					isDeep: 0,
					adUnit: 0,
					adSize: "", //728X90, 300X250 ,468X60, 106X600
					adLoc: 1, // bottom or side
					thSize: 1, // ThumbSize
					txtLoc: 0, // TextLocation - bottom, side 
					nThumb: "",
					thAlign: 0, // thumbAlign 0 = vertical, 1 = horizontal
					sHF: 0, // Show header footer
					uNxt: 0, // UpNext
					ruNxt: 0 // Related up next
				}
			},
			AddVideoResults: {
				name: "TSVR",
				bitValue: 16,
				params: {
					nVids: "", // num of videos
					pgLoc: "", // location in page
					vCat: "", // video categories
					vid: 0,
					vLocSrvr: "", // video location in result from server
					isDeep: 0,
					vCQ: "", //video content quality
					vFlg: "", // Video flagged
					vExp: "", //video Exposure permission
					mId: "", // member id
					vGeo: "", // video geo permission
					vf: "" // Is featured video
				}
			},
			AddUrl: {
				name: 'URL',
				bitValue: 1,
				param: {
					sid: '',
					sKey: '',
					proTy: 0,
					h: '',
					hl: '',
					f: ''
				}
			}
		}
	};
}


/* ~/Scripts/Fivemin.swfobject.js */

if (typeof (FIVEMIN) == "undefined") { var FIVEMIN = {}; }
if (typeof (FIVEMIN.swfobject) == "undefined") {
	/*!	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
	*/

	var swfobject = function () {

		var UNDEF = "undefined",
		OBJECT = "object",
		SHOCKWAVE_FLASH = "Shockwave Flash",
		SHOCKWAVE_FLASH_AX = "ShockwaveFlash.ShockwaveFlash",
		FLASH_MIME_TYPE = "application/x-shockwave-flash",
		EXPRESS_INSTALL_ID = "SWFObjectExprInst",
		ON_READY_STATE_CHANGE = "onreadystatechange",

		win = window,
		doc = document,
		nav = navigator,

		plugin = false,
		domLoadFnArr = [main],
		regObjArr = [],
		objIdArr = [],
		listenersArr = [],
		storedAltContent,
		storedAltContentId,
		storedCallbackFn,
		storedCallbackObj,
		isDomLoaded = false,
		isExpressInstallActive = false,
		dynamicStylesheet,
		dynamicStylesheetMedia,
		autoHideShow = true,

		/* Centralized function for browser feature detection
		- User agent string detection is only used when no good alternative is possible
		- Is executed directly for optimal performance
		*/
	ua = function () {
		var w3cdom = typeof doc.getElementById != UNDEF && typeof doc.getElementsByTagName != UNDEF && typeof doc.createElement != UNDEF,
			u = nav.userAgent.toLowerCase(),
			p = nav.platform.toLowerCase(),
			windows = p ? /win/.test(p) : /win/.test(u),
			mac = p ? /mac/.test(p) : /mac/.test(u),
			webkit = /webkit/.test(u) ? parseFloat(u.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false, // returns either the webkit version or false if not webkit
			ie = ! +"\v1", // feature detection based on Andrea Giammarchi's solution: http://webreflection.blogspot.com/2009/01/32-bytes-to-know-if-your-browser-is-ie.html
			playerVersion = [0, 0, 0],
			d = null;
		if (typeof nav.plugins != UNDEF && typeof nav.plugins[SHOCKWAVE_FLASH] == OBJECT) {
			d = nav.plugins[SHOCKWAVE_FLASH].description;
			if (d && !(typeof nav.mimeTypes != UNDEF && nav.mimeTypes[FLASH_MIME_TYPE] && !nav.mimeTypes[FLASH_MIME_TYPE].enabledPlugin)) { // navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin indicates whether plug-ins are enabled or disabled in Safari 3+
				plugin = true;
				ie = false; // cascaded feature detection for Internet Explorer
				d = d.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
				playerVersion[0] = parseInt(d.replace(/^(.*)\..*$/, "$1"), 10);
				playerVersion[1] = parseInt(d.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
				playerVersion[2] = /[a-zA-Z]/.test(d) ? parseInt(d.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0;
			}
		}
		else if (typeof win.ActiveXObject != UNDEF) {
			try {
				var a = new ActiveXObject(SHOCKWAVE_FLASH_AX);
				if (a) { // a will return null when ActiveX is disabled
					d = a.GetVariable("$version");
					if (d) {
						ie = true; // cascaded feature detection for Internet Explorer
						d = d.split(" ")[1].split(",");
						playerVersion = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
					}
				}
			}
			catch (e) { }
		}
		return { w3: w3cdom, pv: playerVersion, wk: webkit, ie: ie, win: windows, mac: mac };
	} (),

		/* Cross-browser onDomLoad
		- Will fire an event as soon as the DOM of a web page is loaded
		- Internet Explorer workaround based on Diego Perini's solution: http://javascript.nwbox.com/IEContentLoaded/
		- Regular onload serves as fallback
		*/
	onDomLoad = function () {
		if (!ua.w3) { return; }
		if ((typeof doc.readyState != UNDEF && doc.readyState == "complete") || (typeof doc.readyState == UNDEF && (doc.getElementsByTagName("body")[0] || doc.body))) { // function is fired after onload, e.g. when script is inserted dynamically 
			callDomLoadFunctions();
		}
		if (!isDomLoaded) {
			if (typeof doc.addEventListener != UNDEF) {
				doc.addEventListener("DOMContentLoaded", callDomLoadFunctions, false);
			}
			if (ua.ie && ua.win) {
				doc.attachEvent(ON_READY_STATE_CHANGE, function () {
					if (doc.readyState == "complete") {
						doc.detachEvent(ON_READY_STATE_CHANGE, arguments.callee);
						callDomLoadFunctions();
					}
				});
				if (win == top) { // if not inside an iframe
					(function () {
						if (isDomLoaded) { return; }
						try {
							doc.documentElement.doScroll("left");
						}
						catch (e) {
							setTimeout(arguments.callee, 0);
							return;
						}
						callDomLoadFunctions();
					})();
				}
			}
			if (ua.wk) {
				(function () {
					if (isDomLoaded) { return; }
					if (!/loaded|complete/.test(doc.readyState)) {
						setTimeout(arguments.callee, 0);
						return;
					}
					callDomLoadFunctions();
				})();
			}
			addLoadEvent(callDomLoadFunctions);
		}
	} ();

		function callDomLoadFunctions() {
			if (isDomLoaded) { return; }
			try { // test if we can really add/remove elements to/from the DOM; we don't want to fire it too early
				var t = doc.getElementsByTagName("body")[0].appendChild(createElement("span"));
				t.parentNode.removeChild(t);
			}
			catch (e) { return; }
			isDomLoaded = true;
			var dl = domLoadFnArr.length;
			for (var i = 0; i < dl; i++) {
				domLoadFnArr[i]();
			}
		}

		function addDomLoadEvent(fn) {
			if (isDomLoaded) {
				fn();
			}
			else {
				domLoadFnArr[domLoadFnArr.length] = fn; // Array.push() is only available in IE5.5+
			}
		}

		/* Cross-browser onload
		- Based on James Edwards' solution: http://brothercake.com/site/resources/scripts/onload/
		- Will fire an event as soon as a web page including all of its assets are loaded 
		*/
		function addLoadEvent(fn) {
			if (typeof win.addEventListener != UNDEF) {
				win.addEventListener("load", fn, false);
			}
			else if (typeof doc.addEventListener != UNDEF) {
				doc.addEventListener("load", fn, false);
			}
			else if (typeof win.attachEvent != UNDEF) {
				addListener(win, "onload", fn);
			}
			else if (typeof win.onload == "function") {
				var fnOld = win.onload;
				win.onload = function () {
					fnOld();
					fn();
				};
			}
			else {
				win.onload = fn;
			}
		}

		/* Main function
		- Will preferably execute onDomLoad, otherwise onload (as a fallback)
		*/
		function main() {
			if (plugin) {
				testPlayerVersion();
			}
			else {
				matchVersions();
			}
		}

		/* Detect the Flash Player version for non-Internet Explorer browsers
		- Detecting the plug-in version via the object element is more precise than using the plugins collection item's description:
		a. Both release and build numbers can be detected
		b. Avoid wrong descriptions by corrupt installers provided by Adobe
		c. Avoid wrong descriptions by multiple Flash Player entries in the plugin Array, caused by incorrect browser imports
		- Disadvantage of this method is that it depends on the availability of the DOM, while the plugins collection is immediately available
		*/
		function testPlayerVersion() {
			var b = doc.getElementsByTagName("body")[0];
			var o = createElement(OBJECT);
			o.setAttribute("type", FLASH_MIME_TYPE);
			var t = b.appendChild(o);
			if (t) {
				var counter = 0;
				(function () {
					if (typeof t.GetVariable != UNDEF) {
						var d = t.GetVariable("$version");
						if (d) {
							d = d.split(" ")[1].split(",");
							ua.pv = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
						}
					}
					else if (counter < 10) {
						counter++;
						setTimeout(arguments.callee, 10);
						return;
					}
					b.removeChild(o);
					t = null;
					matchVersions();
				})();
			}
			else {
				matchVersions();
			}
		}

		/* Perform Flash Player and SWF version matching; static publishing only
		*/
		function matchVersions() {
			var rl = regObjArr.length;
			if (rl > 0) {
				for (var i = 0; i < rl; i++) { // for each registered object element
					var id = regObjArr[i].id;
					var cb = regObjArr[i].callbackFn;
					var cbObj = { success: false, id: id };
					if (ua.pv[0] > 0) {
						var obj = getElementById(id);
						if (obj) {
							if (hasPlayerVersion(regObjArr[i].swfVersion) && !(ua.wk && ua.wk < 312)) { // Flash Player version >= published SWF version: Houston, we have a match!
								setVisibility(id, true);
								if (cb) {
									cbObj.success = true;
									cbObj.ref = getObjectById(id);
									cb(cbObj);
								}
							}
							else if (regObjArr[i].expressInstall && canExpressInstall()) { // show the Adobe Express Install dialog if set by the web page author and if supported
								var att = {};
								att.data = regObjArr[i].expressInstall;
								att.width = obj.getAttribute("width") || "0";
								att.height = obj.getAttribute("height") || "0";
								if (obj.getAttribute("class")) { att.styleclass = obj.getAttribute("class"); }
								if (obj.getAttribute("align")) { att.align = obj.getAttribute("align"); }
								// parse HTML object param element's name-value pairs
								var par = {};
								var p = obj.getElementsByTagName("param");
								var pl = p.length;
								for (var j = 0; j < pl; j++) {
									if (p[j].getAttribute("name").toLowerCase() != "movie") {
										par[p[j].getAttribute("name")] = p[j].getAttribute("value");
									}
								}
								showExpressInstall(att, par, id, cb);
							}
							else { // Flash Player and SWF version mismatch or an older Webkit engine that ignores the HTML object element's nested param elements: display alternative content instead of SWF
								displayAltContent(obj);
								if (cb) { cb(cbObj); }
							}
						}
					}
					else {	// if no Flash Player is installed or the fp version cannot be detected we let the HTML object element do its job (either show a SWF or alternative content)
						setVisibility(id, true);
						if (cb) {
							var o = getObjectById(id); // test whether there is an HTML object element or not
							if (o && typeof o.SetVariable != UNDEF) {
								cbObj.success = true;
								cbObj.ref = o;
							}
							cb(cbObj);
						}
					}
				}
			}
		}

		function getObjectById(objectIdStr) {
			var r = null;
			var o = getElementById(objectIdStr);
			if (o && o.nodeName == "OBJECT") {
				if (typeof o.SetVariable != UNDEF) {
					r = o;
				}
				else {
					var n = o.getElementsByTagName(OBJECT)[0];
					if (n) {
						r = n;
					}
				}
			}
			return r;
		}

		/* Requirements for Adobe Express Install
		- only one instance can be active at a time
		- fp 6.0.65 or higher
		- Win/Mac OS only
		- no Webkit engines older than version 312
		*/
		function canExpressInstall() {
			return !isExpressInstallActive && hasPlayerVersion("6.0.65") && (ua.win || ua.mac) && !(ua.wk && ua.wk < 312);
		}

		/* Show the Adobe Express Install dialog
		- Reference: http://www.adobe.com/cfusion/knowledgebase/index.cfm?id=6a253b75
		*/
		function showExpressInstall(att, par, replaceElemIdStr, callbackFn) {
			isExpressInstallActive = true;
			storedCallbackFn = callbackFn || null;
			storedCallbackObj = { success: false, id: replaceElemIdStr };
			var obj = getElementById(replaceElemIdStr);
			if (obj) {
				if (obj.nodeName == "OBJECT") { // static publishing
					storedAltContent = abstractAltContent(obj);
					storedAltContentId = null;
				}
				else { // dynamic publishing
					storedAltContent = obj;
					storedAltContentId = replaceElemIdStr;
				}
				att.id = EXPRESS_INSTALL_ID;
				if (typeof att.width == UNDEF || (!/%$/.test(att.width) && parseInt(att.width, 10) < 310)) { att.width = "310"; }
				if (typeof att.height == UNDEF || (!/%$/.test(att.height) && parseInt(att.height, 10) < 137)) { att.height = "137"; }
				doc.title = doc.title.slice(0, 47) + " - Flash Player Installation";
				var pt = ua.ie && ua.win ? "ActiveX" : "PlugIn",
				fv = "MMredirectURL=" + win.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + pt + "&MMdoctitle=" + doc.title;
				if (typeof par.flashvars != UNDEF) {
					par.flashvars += "&" + fv;
				}
				else {
					par.flashvars = fv;
				}
				// IE only: when a SWF is loading (AND: not available in cache) wait for the readyState of the object element to become 4 before removing it,
				// because you cannot properly cancel a loading SWF file without breaking browser load references, also obj.onreadystatechange doesn't work
				if (ua.ie && ua.win && obj.readyState != 4) {
					var newObj = createElement("div");
					replaceElemIdStr += "SWFObjectNew";
					newObj.setAttribute("id", replaceElemIdStr);
					obj.parentNode.insertBefore(newObj, obj); // insert placeholder div that will be replaced by the object element that loads expressinstall.swf
					obj.style.display = "none";
					(function () {
						if (obj.readyState == 4) {
							obj.parentNode.removeChild(obj);
						}
						else {
							setTimeout(arguments.callee, 10);
						}
					})();
				}
				createSWF(att, par, replaceElemIdStr);
			}
		}

		/* Functions to abstract and display alternative content
		*/
		function displayAltContent(obj) {
			if (ua.ie && ua.win && obj.readyState != 4) {
				// IE only: when a SWF is loading (AND: not available in cache) wait for the readyState of the object element to become 4 before removing it,
				// because you cannot properly cancel a loading SWF file without breaking browser load references, also obj.onreadystatechange doesn't work
				var el = createElement("div");
				obj.parentNode.insertBefore(el, obj); // insert placeholder div that will be replaced by the alternative content
				el.parentNode.replaceChild(abstractAltContent(obj), el);
				obj.style.display = "none";
				(function () {
					if (obj.readyState == 4) {
						obj.parentNode.removeChild(obj);
					}
					else {
						setTimeout(arguments.callee, 10);
					}
				})();
			}
			else {
				obj.parentNode.replaceChild(abstractAltContent(obj), obj);
			}
		}

		function abstractAltContent(obj) {
			var ac = createElement("div");
			if (ua.win && ua.ie) {
				ac.innerHTML = obj.innerHTML;
			}
			else {
				var nestedObj = obj.getElementsByTagName(OBJECT)[0];
				if (nestedObj) {
					var c = nestedObj.childNodes;
					if (c) {
						var cl = c.length;
						for (var i = 0; i < cl; i++) {
							if (!(c[i].nodeType == 1 && c[i].nodeName == "PARAM") && !(c[i].nodeType == 8)) {
								ac.appendChild(c[i].cloneNode(true));
							}
						}
					}
				}
			}
			return ac;
		}

		/* Cross-browser dynamic SWF creation
		*/
		function createSWF(attObj, parObj, id) {
			var r, el = getElementById(id);
			if (ua.wk && ua.wk < 312) { return r; }
			if (el) {
				if (typeof attObj.id == UNDEF) { // if no 'id' is defined for the object element, it will inherit the 'id' from the alternative content
					attObj.id = id;
				}
				if (ua.ie && ua.win) { // Internet Explorer + the HTML object element + W3C DOM methods do not combine: fall back to outerHTML
					var att = "";
					for (var i in attObj) {
						if (attObj[i] != Object.prototype[i]) { // filter out prototype additions from other potential libraries
							if (i.toLowerCase() == "data") {
								parObj.movie = attObj[i];
							}
							else if (i.toLowerCase() == "styleclass") { // 'class' is an ECMA4 reserved keyword
								att += ' class="' + attObj[i] + '"';
							}
							else if (i.toLowerCase() != "classid") {
								att += ' ' + i + '="' + attObj[i] + '"';
							}
						}
					}
					var par = "";
					for (var j in parObj) {
						if (parObj[j] != Object.prototype[j]) { // filter out prototype additions from other potential libraries
							par += '<param name="' + j + '" value="' + parObj[j] + '" />';
						}
					}
					el.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + att + '>' + par + '</object>';
					objIdArr[objIdArr.length] = attObj.id; // stored to fix object 'leaks' on unload (dynamic publishing only)
					r = getElementById(attObj.id);
				}
				else { // well-behaving browsers
					var o = createElement(OBJECT);
					o.setAttribute("type", FLASH_MIME_TYPE);
					for (var m in attObj) {
						if (attObj[m] != Object.prototype[m]) { // filter out prototype additions from other potential libraries
							if (m.toLowerCase() == "styleclass") { // 'class' is an ECMA4 reserved keyword
								o.setAttribute("class", attObj[m]);
							}
							else if (m.toLowerCase() != "classid") { // filter out IE specific attribute
								o.setAttribute(m, attObj[m]);
							}
						}
					}
					for (var n in parObj) {
						if (parObj[n] != Object.prototype[n] && n.toLowerCase() != "movie") { // filter out prototype additions from other potential libraries and IE specific param element
							createObjParam(o, n, parObj[n]);
						}
					}
					el.parentNode.replaceChild(o, el);
					r = o;
				}
			}
			return r;
		}

		function createObjParam(el, pName, pValue) {
			var p = createElement("param");
			p.setAttribute("name", pName);
			p.setAttribute("value", pValue);
			el.appendChild(p);
		}

		/* Cross-browser SWF removal
		- Especially needed to safely and completely remove a SWF in Internet Explorer
		*/
		function removeSWF(id) {
			var obj = getElementById(id);
			if (obj && obj.nodeName == "OBJECT") {
				if (ua.ie && ua.win) {
					obj.style.display = "none";
					(function () {
						if (obj.readyState == 4) {
							removeObjectInIE(id);
						}
						else {
							setTimeout(arguments.callee, 10);
						}
					})();
				}
				else {
					obj.parentNode.removeChild(obj);
				}
			}
		}

		function removeObjectInIE(id) {
			var obj = getElementById(id);
			if (obj) {
				for (var i in obj) {
					if (typeof obj[i] == "function") {
						obj[i] = null;
					}
				}
				obj.parentNode.removeChild(obj);
			}
		}

		/* Functions to optimize JavaScript compression
		*/
		function getElementById(id) {
			var el = null;
			try {
				el = doc.getElementById(id);
			}
			catch (e) { }
			return el;
		}

		function createElement(el) {
			return doc.createElement(el);
		}

		/* Updated attachEvent function for Internet Explorer
		- Stores attachEvent information in an Array, so on unload the detachEvent functions can be called to avoid memory leaks
		*/
		function addListener(target, eventType, fn) {
			target.attachEvent(eventType, fn);
			listenersArr[listenersArr.length] = [target, eventType, fn];
		}

		/* Flash Player and SWF content version matching
		*/
		function hasPlayerVersion(rv) {
			var pv = ua.pv, v = rv.split(".");
			v[0] = parseInt(v[0], 10);
			v[1] = parseInt(v[1], 10) || 0; // supports short notation, e.g. "9" instead of "9.0.0"
			v[2] = parseInt(v[2], 10) || 0;
			return (pv[0] > v[0] || (pv[0] == v[0] && pv[1] > v[1]) || (pv[0] == v[0] && pv[1] == v[1] && pv[2] >= v[2])) ? true : false;
		}

		/* Cross-browser dynamic CSS creation
		- Based on Bobby van der Sluis' solution: http://www.bobbyvandersluis.com/articles/dynamicCSS.php
		*/
		function createCSS(sel, decl, media, newStyle) {
			if (ua.ie && ua.mac) { return; }
			var h = doc.getElementsByTagName("head")[0];
			if (!h) { return; } // to also support badly authored HTML pages that lack a head element
			var m = (media && typeof media == "string") ? media : "screen";
			if (newStyle) {
				dynamicStylesheet = null;
				dynamicStylesheetMedia = null;
			}
			if (!dynamicStylesheet || dynamicStylesheetMedia != m) {
				// create dynamic stylesheet + get a global reference to it
				var s = createElement("style");
				s.setAttribute("type", "text/css");
				s.setAttribute("media", m);
				dynamicStylesheet = h.appendChild(s);
				if (ua.ie && ua.win && typeof doc.styleSheets != UNDEF && doc.styleSheets.length > 0) {
					dynamicStylesheet = doc.styleSheets[doc.styleSheets.length - 1];
				}
				dynamicStylesheetMedia = m;
			}
			// add style rule
			if (ua.ie && ua.win) {
				if (dynamicStylesheet && typeof dynamicStylesheet.addRule == OBJECT) {
					dynamicStylesheet.addRule(sel, decl);
				}
			}
			else {
				if (dynamicStylesheet && typeof doc.createTextNode != UNDEF) {
					dynamicStylesheet.appendChild(doc.createTextNode(sel + " {" + decl + "}"));
				}
			}
		}

		function setVisibility(id, isVisible) {
			if (!autoHideShow) { return; }
			var v = isVisible ? "visible" : "hidden";
			if (isDomLoaded && getElementById(id)) {
				getElementById(id).style.visibility = v;
			}
			else {
				createCSS("#" + id, "visibility:" + v);
			}
		}

		/* Filter to avoid XSS attacks
		*/
		function urlEncodeIfNecessary(s) {
			var regex = /[\\\"<>\.;]/;
			var hasBadChars = regex.exec(s) != null;
			return hasBadChars && typeof encodeURIComponent != UNDEF ? encodeURIComponent(s) : s;
		}

		/* Release memory to avoid memory leaks caused by closures, fix hanging audio/video threads and force open sockets/NetConnections to disconnect (Internet Explorer only)
		*/
		var cleanup = function () {
			if (ua.ie && ua.win) {
				window.attachEvent("onunload", function () {
					// remove listeners to avoid memory leaks
					var ll = listenersArr.length;
					for (var i = 0; i < ll; i++) {
						listenersArr[i][0].detachEvent(listenersArr[i][1], listenersArr[i][2]);
					}
					// cleanup dynamically embedded objects to fix audio/video threads and force open sockets and NetConnections to disconnect
					var il = objIdArr.length;
					for (var j = 0; j < il; j++) {
						removeSWF(objIdArr[j]);
					}
					// cleanup library's main closures to avoid memory leaks
					for (var k in ua) {
						ua[k] = null;
					}
					ua = null;
					for (var l in swfobject) {
						swfobject[l] = null;
					}
					swfobject = null;
				});
			}
		} ();

		return {
			/* Public API
			- Reference: http://code.google.com/p/swfobject/wiki/documentation
			*/
			registerObject: function (objectIdStr, swfVersionStr, xiSwfUrlStr, callbackFn) {
				if (ua.w3 && objectIdStr && swfVersionStr) {
					var regObj = {};
					regObj.id = objectIdStr;
					regObj.swfVersion = swfVersionStr;
					regObj.expressInstall = xiSwfUrlStr;
					regObj.callbackFn = callbackFn;
					regObjArr[regObjArr.length] = regObj;
					setVisibility(objectIdStr, false);
				}
				else if (callbackFn) {
					callbackFn({ success: false, id: objectIdStr });
				}
			},

			getObjectById: function (objectIdStr) {
				if (ua.w3) {
					return getObjectById(objectIdStr);
				}
			},

			embedSWF: function (swfUrlStr, replaceElemIdStr, widthStr, heightStr, swfVersionStr, xiSwfUrlStr, flashvarsObj, parObj, attObj, callbackFn) {
				var callbackObj = { success: false, id: replaceElemIdStr };
				if (ua.w3 && !(ua.wk && ua.wk < 312) && swfUrlStr && replaceElemIdStr && widthStr && heightStr && swfVersionStr) {
					setVisibility(replaceElemIdStr, false);
					addDomLoadEvent(function () {
						widthStr += ""; // auto-convert to string
						heightStr += "";
						var att = {};
						if (attObj && typeof attObj === OBJECT) {
							for (var i in attObj) { // copy object to avoid the use of references, because web authors often reuse attObj for multiple SWFs
								att[i] = attObj[i];
							}
						}
						att.data = swfUrlStr;
						att.width = widthStr;
						att.height = heightStr;
						var par = {};
						if (parObj && typeof parObj === OBJECT) {
							for (var j in parObj) { // copy object to avoid the use of references, because web authors often reuse parObj for multiple SWFs
								par[j] = parObj[j];
							}
						}
						if (flashvarsObj && typeof flashvarsObj === OBJECT) {
							for (var k in flashvarsObj) { // copy object to avoid the use of references, because web authors often reuse flashvarsObj for multiple SWFs
								if (typeof par.flashvars != UNDEF) {
									par.flashvars += "&" + k + "=" + flashvarsObj[k];
								}
								else {
									par.flashvars = k + "=" + flashvarsObj[k];
								}
							}
						}
						if (hasPlayerVersion(swfVersionStr)) { // create SWF
							var obj = createSWF(att, par, replaceElemIdStr);
							if (att.id == replaceElemIdStr) {
								setVisibility(replaceElemIdStr, true);
							}
							callbackObj.success = true;
							callbackObj.ref = obj;
						}
						else if (xiSwfUrlStr && canExpressInstall()) { // show Adobe Express Install
							att.data = xiSwfUrlStr;
							showExpressInstall(att, par, replaceElemIdStr, callbackFn);
							return;
						}
						else { // show alternative content
							setVisibility(replaceElemIdStr, true);
						}
						if (callbackFn) { callbackFn(callbackObj); }
					});
				}
				else if (callbackFn) { callbackFn(callbackObj); }
			},

			switchOffAutoHideShow: function () {
				autoHideShow = false;
			},

			ua: ua,

			getFlashPlayerVersion: function () {
				return { major: ua.pv[0], minor: ua.pv[1], release: ua.pv[2] };
			},

			hasFlashPlayerVersion: hasPlayerVersion,

			createSWF: function (attObj, parObj, replaceElemIdStr) {
				if (ua.w3) {
					return createSWF(attObj, parObj, replaceElemIdStr);
				}
				else {
					return undefined;
				}
			},

			showExpressInstall: function (att, par, replaceElemIdStr, callbackFn) {
				if (ua.w3 && canExpressInstall()) {
					showExpressInstall(att, par, replaceElemIdStr, callbackFn);
				}
			},

			removeSWF: function (objElemIdStr) {
				if (ua.w3) {
					removeSWF(objElemIdStr);
				}
			},

			createCSS: function (selStr, declStr, mediaStr, newStyleBoolean) {
				if (ua.w3) {
					createCSS(selStr, declStr, mediaStr, newStyleBoolean);
				}
			},

			addDomLoadEvent: addDomLoadEvent,

			addLoadEvent: addLoadEvent,

			getQueryParamValue: function (param) {
				var q = doc.location.search || doc.location.hash;
				if (q) {
					if (/\?/.test(q)) { q = q.split("?")[1]; } // strip question mark
					if (param == null) {
						return urlEncodeIfNecessary(q);
					}
					var pairs = q.split("&");
					for (var i = 0; i < pairs.length; i++) {
						if (pairs[i].substring(0, pairs[i].indexOf("=")) == param) {
							return urlEncodeIfNecessary(pairs[i].substring((pairs[i].indexOf("=") + 1)));
						}
					}
				}
				return "";
			},

			// For internal usage only
			expressInstallCallback: function () {
				if (isExpressInstallActive) {
					var obj = getElementById(EXPRESS_INSTALL_ID);
					if (obj && storedAltContent) {
						obj.parentNode.replaceChild(storedAltContent, obj);
						if (storedAltContentId) {
							setVisibility(storedAltContentId, true);
							if (ua.ie && ua.win) { storedAltContent.style.display = "block"; }
						}
						if (storedCallbackFn) { storedCallbackFn(storedCallbackObj); }
					}
					isExpressInstallActive = false;
				}
			}
		};
	} ();

	/* end swfobject.js code */
	FIVEMIN.swfobject = swfobject;
}


/* ~/Scripts/Fivemin.lib.js */

if (typeof (FIVEMIN) == "undefined") { var FIVEMIN = {}; }
if (typeof (FIVEMIN.LIB) == "undefined") {
    FIVEMIN.LIB = (function () {
        /* Built with DEVIGN js fw, extended by Eli Sklar and Dylan Kennet */
        FIVEMIN.LIB = function () {
            var af = function () { }; // Anonymous function that does nothing

            var $ = function () { return $.getById.apply(this, arguments); };

            $.extend = function (destination, source) {
                for (var key in (source || {})) {
                    destination[key] = source[key];
                }
                return destination;
            };

            var docForRestore;

            $.extend($, {
                // elements
                document: document,
                // elements
                getById: function (id, doc) {
                    return id ? id.nodeName ? id : (doc || document).getElementById(id) : null;
                },
                create: function (tag, props, doc) {
                    var el = (doc || $.document || document).createElement(tag);
                    if (props) { $.alter(el, props); }
                    return el;
                },
                setDocument: function (doc) {
                    docForRestore = $.document || document; $.document = doc;
                },
                restoreDocument: function () { $.document = docForRestore; docForRestore = null; },
                alter: function (el, props) {
                    if (!props) { return null; }
                    if (props.styles) {
                        $.css(el, props.styles);
                        delete props.styles;
                    }
                    if (props.events) {
                        $.each(props.events, function (handler, name) { $.addEvent(el, name, handler); });
                        delete props.events;
                    }
                    if (props.children) {
                        $.each(props.children, function (child) { el.appendChild(child); });
                        delete props.children;
                    }
                    var parent = props.parent;
                    delete props.parent;

                    $.extend(el, props);

                    if (parent) { parent.appendChild(el); }

                    return el;
                },
                // ----------------------------------------------------------
                // If you're not in IE (or IE version is less than 5) then:
                //     ie === undefined
                // If you're in IE (>5) then you can determine which version:
                //     ie === 7; // IE7
                // Thus, to detect IE:
                //     if (ie) {}
                // And to detect the version:
                //     ie === 6 // IE6
                //     ie> 7 // IE8, IE9 ...
                //     ie <9 // Anything less than IE9
                // ----------------------------------------------------------
                ie: (function () {
                    var rv = null; // Return value assumes failure.
                    if (navigator.appName == 'Microsoft Internet Explorer') {
                        rv = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent);
                        if (rv[1] != null) rv = parseFloat(rv[1]);
                        else rv = null;
                    }
                    return rv;
                }()),


                /**
				* Remove an element (backward compatibility)
				* @param el
				*/
                removeNode: function (el) {
                    if (el.parentNode) { el.parentNode.removeChild(el); }
                },

                getElement: function (selector, ctx) {
                    return $.getElements(selector, ctx)[0];
                },
                getElements: function (selector, ctx) {
                    if (!ctx) { ctx = $.document || document; }

                    var result = [];

                    if (selector.indexOf(".") > -1) {
                        for (
						var split = selector.split("."),
							re = new RegExp("\\b" + split[1] + "\\b"),
							list = ctx.getElementsByTagName(split[0] || "*"),
							length = list.length,
							i = 0,
							j = 0,
							node;
						i < length;
						++i
					) {
                            node = list[i];
                            if (re.test(node.className)) {
                                result[j++] = node;
                            }
                        }
                    }
                    else { result = $.toArray(ctx.getElementsByTagName(selector)); }

                    return result;
                },

                hasChild: function (parent, el) {
                    if ($.browser.features.xpath == false) { return $.indexOf($.toArray(parent.getElementsByTagName(el.tagName)), el) > -1; }
                    return parent.contains ? parent != el && parent.contains(el) : !!(parent.compareDocumentPosition(el) & 16);
                },

                /**
				* Attach an event to an element
				* Params:
				*
				* @see window.addEventListener
				* @param Element
				* @param Event
				* @param Callback
				* 
				*/
                addEvent: function (el, name, fn) {
                    var eventFunc;
                    if (name == "mouseenter") {
                        name = "mouseover";
                        eventFunc = function (event) {
                            var related = event.relatedTarget;
                            var fireEvent;
                            if (related == undefined) fireEvent = true;
                            else if (related === false) fireEvent = false;
                            else fireEvent = (typeof (this) != 'document' && related != this && related.prefix != 'xul' && !$.hasChild(this, related));
                            if (fireEvent) fn(event);
                            return fireEvent;
                        };
                    }
                    else if (name == "mouseleave") {
                        name = "mouseout";
                        eventFunc = function (event) {
                            var related = event.relatedTarget;
                            var fireEvent;
                            if (related == undefined) fireEvent = true;
                            else if (related === false) fireEvent = false;
                            else fireEvent = (typeof (this) != 'document' && related != this && related.prefix != 'xul' && !$.hasChild(this, related));
                            if (fireEvent) fn(event);
                            return fireEvent;
                        };
                    } else eventFunc = fn;
                    document.addEventListener ? el.addEventListener(name, eventFunc, false) : el.attachEvent("on" + name, eventFunc);
                },
                removeEvent: function (el, name, fn) {
                    var eventFunc;
                    if (name == "mouseenter") {
                        name = "mouseover";
                        eventFunc = function (event) {
                            var related = event.relatedTarget;
                            var fireEvent;
                            if (related == undefined) fireEvent = true;
                            else if (related === false) fireEvent = false;
                            else fireEvent = (typeof (this) != 'document' && related != this && related.prefix != 'xul' && !$.hasChild(this, related));
                            if (fireEvent) fn();
                            return fireEvent;
                        };
                    }
                    else if (name == "mouseleave") {
                        name = "mouseout";
                        eventFunc = function (event) {
                            var related = event.relatedTarget;
                            var fireEvent;
                            if (related == undefined) fireEvent = true;
                            else if (related === false) fireEvent = false;
                            else fireEvent = (typeof (this) != 'document' && related != this && related.prefix != 'xul' && !$.hasChild(this, related));
                            if (fireEvent) fn();
                            return fireEvent;
                        };
                    }
                    else eventFunc = fn;
                    document.removeEventListener ? el.removeEventListener(name, eventFunc, false) : el.detachEvent("on" + name, eventFunc);
                },

                dispatchEvent: function (element, eventName, args) {
                    var event;
                    if (document.createEvent) {
                        event = document.createEvent("HTMLEvents");
                        event.initEvent(eventName, true, true);
                    } else {
                        event = document.createEventObject();
                        event.eventType = eventName;
                    }

                    event.eventName = eventName;
                    event.args = args || {};

                    if (document.createEvent) {
                        element.dispatchEvent(event);
                    } else {
                        if (typeof (element["on" + eventName]) != 'undefined') {
                            element.fireEvent("on" + eventName, event);
                        }
                    }
                },

                stopEvent: function (e, preventDefault, stopPropagation) {
                    if (preventDefault !== false) {
                        if (e.preventDefault) { e.preventDefault(); }
                        else { e.returnValue = false; }
                    }
                    if (stopPropagation !== false) {
                        if (e.stopPropagation) { e.stopPropagation(); }
                        else { e.cancelBubble = true; }
                    }
                },
                eventElement: function (e) { return e.target ? e.target : e.srcElement; },

                // arrays/objects
                toArray: function (data) {
                    if (data instanceof Array) { return data; }
                    if (data.item) {
                        var array = [];
                        for (var i = 0, l = data.length; i < l; i++) { array[i] = data[i]; }
                        return array;
                    }
                    return Array.prototype.slice.call(data);
                },
                indexOf: function (data, item, from) {
                    var len = data.length;
                    for (var i = (from < 0) ? Math.max(0, len + from) : from || 0; i < len; i++) {
                        if (data[i] === item) { return i; }
                    }
                    return -1;
                },
                removeItem: function (arr, item) {
                    for (var i = arr.length; i--;) {
                        if (arr[i] === item) { arr.splice(i, 1); }
                    }
                },
                each: function (data, fn, bind) {
                    if (data instanceof Array) {
                        for (var i = 0; i < data.length; i++) { fn.call(bind || null, data[i], i); }
                    }
                    else {
                        for (var key in data) { fn.call(bind || null, data[key], key); }
                    }
                    return data;
                },

                trim: function (s) { return s.replace(/^\s+|\s+$/g, ""); },
                etrim: function (str, chars) {
                    if (typeof str !== 'string') return str;
                    return $.ltrim($.rtrim(str, chars), chars);
                },

                ltrim: function (str, chars) {
                    chars = chars || "\\s";
                    return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
                },

                rtrim: function (str, chars) {
                    chars = chars || "\\s";
                    return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
                },

                time: function () { return new Date().getTime(); },

                map: function (data, fn, bind) {
                    var a = data instanceof Array ? [] : {};
                    $.each(data, function (value, key) {
                        a[key] = fn.call(bind || null, value, key);
                    });
                    return a;
                },
                css: function (el, style) {
                    if (el instanceof Array) {
                        for (var index = 0; index < el.length; ++index) {
                            var item = el[index];
                            $.css(item, style);
                        }
                        return null;
                    }
                    else if (typeof (style) == "string") { el.style.cssText = style; }
                    else {
                        if (style.opacity !== undefined) {
                            $.opacity(el, style.opacity);
                            delete style.opacity;
                        }

                        style = $.map(style, function (value, key) {
                            if ($.indexOf(cssNumericValue, key) != -1) { return parseFloat(value); }
                            if ($.indexOf(cssPixelValue, key) != -1 && typeof (value) == "number") { return value + "px"; }
                            return value;
                        });
                        $.extend(el.style, style);
                    }
                    return el;
                },

                hide: function (el) {
                    if (el.length != undefined && el.length > 0) {
                        for (var i = 0; i < el.length; ++i) {
                            $.hide(el[i]);
                        }
                        return;
                    }
                    el.style.display = 'none';
                },

                show: function (el) {
                    el.style.display = 'block';
                },

                docSize: function (doc) {
                    var intH = 0, intW = 0;

                    if (self.innerHeight) {
                        intH = window.innerHeight;
                        intW = window.innerWidth;
                    }
                    else {
                        if (doc.documentElement && doc.documentElement.clientHeight) {
                            intH = doc.documentElement.clientHeight;
                            intW = doc.documentElement.clientWidth;
                        }
                        else {
                            if (document.body) {
                                intH = doc.body.clientHeight;
                                intW = doc.body.clientWidth;
                            }
                        }
                    }

                    if (intH < doc.body.clientHeight) {
                        intH = doc.body.clientHeight;
                    }

                    return {
                        height: parseInt(intH, 10),
                        width: parseInt(intW, 10)
                    };
                },
                fadeIn: function (el, val) {
                    var that = this;
                    if (isNaN(val)) { val = 0; }
                    el.style.opacity = '0.' + val;
                    el.style.display = 'block';
                    //For IE
                    el.style.filter = 'alpha(opacity=' + val + '0)';
                    if (val < 9) {
                        val++;
                        setTimeout(function () {
                            that.fadeIn(el, val);
                        }, 90);
                    } else { return; }
                },
                addCls: function (el, cls) {
                    if (!$.hasCls(el, cls)) { el.className += " " + cls; }
                },
                removeCls: function (el, cls) {
                    el.className = el.className.replace(new RegExp("(^|\\s+)" + cls + "(\\s+|$)", "g"), " ");
                },
                hasCls: function (el, cls) {
                    return new RegExp("(^|\\s)" + cls + "(\\s|$)").test(el.className);
                },

                currCss: function (el, key, toNumber) {
                    if (key == "float") { key = "cssFloat"; }

                    if (key == "opacity" && $.browser.name == "ie") { return $.opacity(el); }

                    var result;

                    if (el.currentStyle) {
                        result = el.currentStyle[key.replace(/-\D/g, function (match) {
                            return match.charAt(1).toUpperCase();
                        })];
                    }
                    else {
                        var computed = el.ownerDocument.defaultView.getComputedStyle(el, null);
                        result = computed ? computed.getPropertyValue(key) : null;
                    }

                    if (result == "auto" && (key == "width" || key == "height")) {
                        result = el["offset" + key.charAt(0).toUpperCase() + key.substr(1)];
                        var removePadding = key == "width" ? ["left", "right"] : ["top", "bottom"];
                        result -= $.currCss(el, removePadding[0]) + $.currCss(el, removePadding[1]);
                        if (result < 0) { result = 0; }
                    }

                    if (
					result !== null &&
					(
						$.indexOf(cssPixelValue, key) != -1 ||
						$.indexOf(cssNumericValue, key) != -1 ||
						toNumber ||
						result.indexOf("px") == result.length - 2
					)
				) { result = parseFloat(result); }

                    return $.etrim(result, "'\"");
                },

                opacity: function (el, value) {
                    if (value === undefined) { // get
                        if ($.browser.name != "ie") { return $.currCss(el, "opacity"); }
                        var filter = el.style.filter;
                        return filter && filter.indexOf("opacity=") >= 0 ? (parseFloat(filter.match(/opacity=([^)]*)/)[1]) / 100) : 1;
                    }
                    else { // set
                        if (value == 0) {
                            if (el.style.visibility != 'hidden') { el.style.visibility = 'hidden'; }
                        } else {
                            if (el.style.visibility != 'visible') { el.style.visibility = 'visible'; }
                        }
                        if (!el.currentStyle || !el.currentStyle.hasLayout) { el.style.zoom = 1; }
                        if ($.browser.name == "ie") { el.style.filter = value == 1 ? '' : 'alpha(opacity=' + value * 100 + ')'; }
                        el.style.opacity = value;
                    }
                    return null;
                },

                offset: function (el) {
                    var curtop, curleft = curtop = 0;
                    if (el.offsetParent) {
                        do {
                            curleft += el.offsetLeft;
                            curtop += el.offsetTop;
                        } while (el = el.offsetParent);
                    }
                    return { left: curleft, top: curtop };
                },
                //get current dimensions and position of an element
                //usage:   var dims = new ElementDimensions(elementToMeasure);

                height: function (element) {
                    if (window.self == element) {
                        return this.getDocHeight();
                    } else {
                        return element.clientHeight;
                    }
                },
                width: function (element) {
                    if (window.self == element) {
                        return this.getDocWidth();
                    } else {
                        return element.clientWidth;
                    }
                },
                ellipsizeTextBox: function (el) {
                    var keep = el.innerHTML;
                    while (el.scrollHeight > el.offsetHeight) {
                        el.innerHTML = keep;
                        el.innerHTML = el.innerHTML.substring(0, el.innerHTML.length - 1);
                        keep = el.innerHTML;
                        el.innerHTML = el.innerHTML + "...";
                    }
                },
                updateQueryStringParameter: function (uri, key, value) {
                    var re = new RegExp("([?|&])" + key + "=.*?(&|$)", "i");
                    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
                    if (uri.match(re)) {
                        return uri.replace(re, '$1' + key + "=" + value + '$2');
                    }
                    else {
                        return uri + separator + key + "=" + value;
                    }
                },
                getParameterByName: function (name, url) {
                    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
                    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                        results = regex.exec(url);
                    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
                },
                getDocWidth: function () {
                    var D = document;
                    return Math.max(
                    D.body.scrollWidth, D.documentElement.scrollWidth,
                    D.body.offsetWidth, D.documentElement.offsetWidth,
                    D.body.clientWidth, D.documentElement.clientWidth
                        );
                },

                getDocHeight: function () {
                    var D = document;
                    return Math.max(
                    D.body.scrollHeight, D.documentElement.scrollHeight,
                    D.body.offsetHeight, D.documentElement.offsetHeight,
                    D.body.clientHeight, D.documentElement.clientHeight
                        );
                },
                dimensions: function (elem) {
                    var coords = {};
                    coords.inner = {	//content and padding; gives 0 for inline elements (you can use scrollWidth/Height if it's inline)
                        width: elem.clientWidth,
                        height: elem.clientHeight
                    };
                    coords.outer = {	//everything (content, padding, scrollbar, border)
                        width: elem.offsetWidth,
                        height: elem.offsetHeight
                    };
                    coords.scroll = {
                        //width & height of entire content field (including padding), visible or not
                        //incorrect in Opera; it doesn't include the padding
                        width: elem.scrollWidth,
                        //if there are no scrollbars, IE gives the actual height of the content instead of the height of the element
                        height: elem.scrollHeight < elem.clientHeight ? elem.clientHeight : elem.scrollHeight,

                        //scroll position of content & padding
                        left: elem.scrollLeft,
                        top: elem.scrollTop
                    };

                    //position of element from the top-left corner of the document
                    var tmp = elem;
                    coords.left = coords.top = 0;
                    while (tmp.offsetParent) {
                        coords.left += tmp.offsetLeft;
                        coords.top += tmp.offsetTop;
                        tmp = tmp.offsetParent;
                    }

                    return coords;
                },

                /**
				* Bind a function to a specific this object
				* @param function
				* @param bind object
				*/
                bind: function (fn, bind) {
                    return function () {
                        fn.apply(bind, arguments);
                    };
                },

                /**
				* Spawns separate function call that waits for check to be true
				* @param check - function that returns true or false
				* @param onComplete - function to call when check is true
				* @param delay - how long to wait between checks (in ms)
				* @param timeout - how long before giving up
				* @param bind - the bind for this for the onComplete function
				* @param args - arguments to pass to the onComplete function
				*/
                waitUntil: function (check, onComplete, delay, timeout, bind, args) {
                    if (!bind) bind = this;
                    if (!args) args = [];
                    // if the check returns true, execute onComplete immediately
                    if (check()) {
                        onComplete.apply(bind, args);
                        return;
                    }

                    if (!delay) delay = 100;

                    var timeoutPointer;
                    var intervalPointer = setInterval(function () {
                        if (!check()) return; // if check didn't return true, means we need another check in the next interval

                        // if the check returned true, means we're done here. clear the interval and the timeout and execute onComplete
                        clearInterval(intervalPointer);
                        if (timeoutPointer) clearTimeout(timeoutPointer);
                        onComplete.apply(bind, args);
                    }, delay);
                    // if after timeout milliseconds function doesn't return true, abort
                    if (timeout) timeoutPointer = setTimeout(function () {
                        clearInterval(intervalPointer);
                    }, timeout);
                },

                htmlenc: function (s) {
                    return s ? s.replace(/&/g, "&amp;")
                   .replace(/</g, "&lt;")
                   .replace(/>/g, "&gt;")
                   .replace(/'/g, "&apos;")
                   .replace(/"/g, "&quot;") : "";
                },

                addStylesheet: function (href, media, doc) {
                    if (doc == null) doc = document;
                    var head = doc.getElementsByTagName('head')[0];

                    var links = doc.getElementsByTagName('link');
                    for (var i = 0; i < links.length; ++i) {
                        var tempLink = links[i];

                        if (tempLink.getAttribute('href') == href) {
                            return true;
                        }
                    }

                    var link = doc.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = href;
                    link.type = 'text/css';
                    link.media = media || 'all';
                    head.appendChild(link);
                    return true;
                },

                log: function () {
                    if (typeof (console) == "undefined") { return; }
                    try { console.log.apply(console, arguments); }
                    catch (ex) { console.log($.toArray(arguments)); }
                },

                /**
				* Same thing as $.log function, but uses the info functio
				* that also shows the line from where it was fired.
				*
				* @param mixed
				*/
                l: function () {
                    if (typeof (console) == 'undefined') { return af; }
                    return console.info;
                }(),

                d: function () {
                    if (typeof (console) == 'undefined') { return af; }
                    return console.dir;
                }(),

                prepend: function (parentEl, newChild) {
                    var firstChild = parentEl.firstChild;
                    if (typeof firstChild != "undefined") {
                        parentEl.insertBefore(newChild, firstChild);
                    }
                    else {
                        parentEl.appendChild(newChild);
                    }
                },

                getViewport: function () {

                    var viewPortWidth;
                    var viewPortHeight;

                    // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
                    if (typeof window.innerWidth != 'undefined') {
                        viewPortWidth = window.innerWidth;
                        viewPortHeight = window.innerHeight;
                    }

                        // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
                    else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
                        viewPortWidth = document.documentElement.clientWidth;
                        viewPortHeight = document.documentElement.clientHeight;
                    }

                        // older versions of IE
                    else {
                        viewPortWidth = document.getElementsByTagName('body')[0].clientWidth;
                        viewPortHeight = document.getElementsByTagName('body')[0].clientHeight;
                    }
                    return { 'width': viewPortWidth, 'height': viewPortHeight };
                },

                // Randomizes an array using Fisher-Yates shuffle algorithm
                randomizeArray: function (oldArray) {
                    var i = oldArray.length;
                    if (i == 0) return [];
                    while (--i) {
                        var j = Math.floor(Math.random() * (i + 1));
                        var tempi = oldArray[i];
                        var tempj = oldArray[j];
                        oldArray[i] = tempj;
                        oldArray[j] = tempi;
                    }
                    return oldArray;
                },

                // Convert a hex value to its decimal value - the inputted hex must be in the
                // format of a hex triplet - the kind we use for HTML colours. The function
                // will return ([255,255,255] - [Reg, Green, Blue]) an array with three values.
                hex2num: function (hex) {
                    if (hex.charAt(0) == "#") hex = hex.slice(1); //Remove the '#' char - if there is one.
                    hex = hex.toUpperCase();
                    var hexAlphabets = "0123456789ABCDEF";
                    var value = new Array(3);
                    var k = 0;
                    var int1, int2;
                    for (var i = 0; i < 6; i += 2) {
                        int1 = hexAlphabets.indexOf(hex.charAt(i));
                        int2 = hexAlphabets.indexOf(hex.charAt(i + 1));
                        value[k] = (int1 * 16) + int2;
                        k++;
                    }
                    return (value);
                },

                // Give a array ([255,255,255] - [Reg, Green, Blue]) with three values as the argument and the function will return
                // the corresponding hex triplet.
                num2hex: function (triplet) {
                    var hexAlphabets = "0123456789ABCDEF";
                    var hex = "#";
                    var int1, int2;
                    for (var i = 0; i < 3; i++) {
                        int1 = triplet[i] / 16;
                        int2 = triplet[i] % 16;

                        hex += hexAlphabets.charAt(int1) + hexAlphabets.charAt(int2);
                    }
                    return (hex);
                },

                md5: function (strToMd5) {
                    var hexcase = 0; function hex_md5(a) { return rstr2hex(rstr_md5(str2rstr_utf8(a))) } function hex_hmac_md5(a, b) { return rstr2hex(rstr_hmac_md5(str2rstr_utf8(a), str2rstr_utf8(b))) } function md5_vm_test() { return hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72" } function rstr_md5(a) { return binl2rstr(binl_md5(rstr2binl(a), a.length * 8)) } function rstr_hmac_md5(c, f) { var e = rstr2binl(c); if (e.length > 16) { e = binl_md5(e, c.length * 8) } var a = Array(16), d = Array(16); for (var b = 0; b < 16; b++) { a[b] = e[b] ^ 909522486; d[b] = e[b] ^ 1549556828 } var g = binl_md5(a.concat(rstr2binl(f)), 512 + f.length * 8); return binl2rstr(binl_md5(d.concat(g), 512 + 128)) } function rstr2hex(c) { try { hexcase } catch (g) { hexcase = 0 } var f = hexcase ? "0123456789ABCDEF" : "0123456789abcdef"; var b = ""; var a; for (var d = 0; d < c.length; d++) { a = c.charCodeAt(d); b += f.charAt((a >>> 4) & 15) + f.charAt(a & 15) } return b } function str2rstr_utf8(c) { var b = ""; var d = -1; var a, e; while (++d < c.length) { a = c.charCodeAt(d); e = d + 1 < c.length ? c.charCodeAt(d + 1) : 0; if (55296 <= a && a <= 56319 && 56320 <= e && e <= 57343) { a = 65536 + ((a & 1023) << 10) + (e & 1023); d++ } if (a <= 127) { b += String.fromCharCode(a) } else { if (a <= 2047) { b += String.fromCharCode(192 | ((a >>> 6) & 31), 128 | (a & 63)) } else { if (a <= 65535) { b += String.fromCharCode(224 | ((a >>> 12) & 15), 128 | ((a >>> 6) & 63), 128 | (a & 63)) } else { if (a <= 2097151) { b += String.fromCharCode(240 | ((a >>> 18) & 7), 128 | ((a >>> 12) & 63), 128 | ((a >>> 6) & 63), 128 | (a & 63)) } } } } } return b } function rstr2binl(b) { var a = Array(b.length >> 2); for (var c = 0; c < a.length; c++) { a[c] = 0 } for (var c = 0; c < b.length * 8; c += 8) { a[c >> 5] |= (b.charCodeAt(c / 8) & 255) << (c % 32) } return a } function binl2rstr(b) { var a = ""; for (var c = 0; c < b.length * 32; c += 8) { a += String.fromCharCode((b[c >> 5] >>> (c % 32)) & 255) } return a } function binl_md5(p, k) { p[k >> 5] |= 128 << ((k) % 32); p[(((k + 64) >>> 9) << 4) + 14] = k; var o = 1732584193; var n = -271733879; var m = -1732584194; var l = 271733878; for (var g = 0; g < p.length; g += 16) { var j = o; var h = n; var f = m; var e = l; o = md5_ff(o, n, m, l, p[g + 0], 7, -680876936); l = md5_ff(l, o, n, m, p[g + 1], 12, -389564586); m = md5_ff(m, l, o, n, p[g + 2], 17, 606105819); n = md5_ff(n, m, l, o, p[g + 3], 22, -1044525330); o = md5_ff(o, n, m, l, p[g + 4], 7, -176418897); l = md5_ff(l, o, n, m, p[g + 5], 12, 1200080426); m = md5_ff(m, l, o, n, p[g + 6], 17, -1473231341); n = md5_ff(n, m, l, o, p[g + 7], 22, -45705983); o = md5_ff(o, n, m, l, p[g + 8], 7, 1770035416); l = md5_ff(l, o, n, m, p[g + 9], 12, -1958414417); m = md5_ff(m, l, o, n, p[g + 10], 17, -42063); n = md5_ff(n, m, l, o, p[g + 11], 22, -1990404162); o = md5_ff(o, n, m, l, p[g + 12], 7, 1804603682); l = md5_ff(l, o, n, m, p[g + 13], 12, -40341101); m = md5_ff(m, l, o, n, p[g + 14], 17, -1502002290); n = md5_ff(n, m, l, o, p[g + 15], 22, 1236535329); o = md5_gg(o, n, m, l, p[g + 1], 5, -165796510); l = md5_gg(l, o, n, m, p[g + 6], 9, -1069501632); m = md5_gg(m, l, o, n, p[g + 11], 14, 643717713); n = md5_gg(n, m, l, o, p[g + 0], 20, -373897302); o = md5_gg(o, n, m, l, p[g + 5], 5, -701558691); l = md5_gg(l, o, n, m, p[g + 10], 9, 38016083); m = md5_gg(m, l, o, n, p[g + 15], 14, -660478335); n = md5_gg(n, m, l, o, p[g + 4], 20, -405537848); o = md5_gg(o, n, m, l, p[g + 9], 5, 568446438); l = md5_gg(l, o, n, m, p[g + 14], 9, -1019803690); m = md5_gg(m, l, o, n, p[g + 3], 14, -187363961); n = md5_gg(n, m, l, o, p[g + 8], 20, 1163531501); o = md5_gg(o, n, m, l, p[g + 13], 5, -1444681467); l = md5_gg(l, o, n, m, p[g + 2], 9, -51403784); m = md5_gg(m, l, o, n, p[g + 7], 14, 1735328473); n = md5_gg(n, m, l, o, p[g + 12], 20, -1926607734); o = md5_hh(o, n, m, l, p[g + 5], 4, -378558); l = md5_hh(l, o, n, m, p[g + 8], 11, -2022574463); m = md5_hh(m, l, o, n, p[g + 11], 16, 1839030562); n = md5_hh(n, m, l, o, p[g + 14], 23, -35309556); o = md5_hh(o, n, m, l, p[g + 1], 4, -1530992060); l = md5_hh(l, o, n, m, p[g + 4], 11, 1272893353); m = md5_hh(m, l, o, n, p[g + 7], 16, -155497632); n = md5_hh(n, m, l, o, p[g + 10], 23, -1094730640); o = md5_hh(o, n, m, l, p[g + 13], 4, 681279174); l = md5_hh(l, o, n, m, p[g + 0], 11, -358537222); m = md5_hh(m, l, o, n, p[g + 3], 16, -722521979); n = md5_hh(n, m, l, o, p[g + 6], 23, 76029189); o = md5_hh(o, n, m, l, p[g + 9], 4, -640364487); l = md5_hh(l, o, n, m, p[g + 12], 11, -421815835); m = md5_hh(m, l, o, n, p[g + 15], 16, 530742520); n = md5_hh(n, m, l, o, p[g + 2], 23, -995338651); o = md5_ii(o, n, m, l, p[g + 0], 6, -198630844); l = md5_ii(l, o, n, m, p[g + 7], 10, 1126891415); m = md5_ii(m, l, o, n, p[g + 14], 15, -1416354905); n = md5_ii(n, m, l, o, p[g + 5], 21, -57434055); o = md5_ii(o, n, m, l, p[g + 12], 6, 1700485571); l = md5_ii(l, o, n, m, p[g + 3], 10, -1894986606); m = md5_ii(m, l, o, n, p[g + 10], 15, -1051523); n = md5_ii(n, m, l, o, p[g + 1], 21, -2054922799); o = md5_ii(o, n, m, l, p[g + 8], 6, 1873313359); l = md5_ii(l, o, n, m, p[g + 15], 10, -30611744); m = md5_ii(m, l, o, n, p[g + 6], 15, -1560198380); n = md5_ii(n, m, l, o, p[g + 13], 21, 1309151649); o = md5_ii(o, n, m, l, p[g + 4], 6, -145523070); l = md5_ii(l, o, n, m, p[g + 11], 10, -1120210379); m = md5_ii(m, l, o, n, p[g + 2], 15, 718787259); n = md5_ii(n, m, l, o, p[g + 9], 21, -343485551); o = safe_add(o, j); n = safe_add(n, h); m = safe_add(m, f); l = safe_add(l, e) } return Array(o, n, m, l) } function md5_cmn(h, e, d, c, g, f) { return safe_add(bit_rol(safe_add(safe_add(e, h), safe_add(c, f)), g), d) } function md5_ff(g, f, k, j, e, i, h) { return md5_cmn((f & k) | ((~f) & j), g, f, e, i, h) } function md5_gg(g, f, k, j, e, i, h) { return md5_cmn((f & j) | (k & (~j)), g, f, e, i, h) } function md5_hh(g, f, k, j, e, i, h) { return md5_cmn(f ^ k ^ j, g, f, e, i, h) } function md5_ii(g, f, k, j, e, i, h) { return md5_cmn(k ^ (f | (~j)), g, f, e, i, h) } function safe_add(a, d) { var c = (a & 65535) + (d & 65535); var b = (a >> 16) + (d >> 16) + (c >> 16); return (b << 16) | (c & 65535) } function bit_rol(a, b) { return (a << b) | (a >>> (32 - b)) };
                    return hex_md5(strToMd5);
                },

                rand: function () {
                    /* RNG SECTION */
                    var mathRng, whatwgRng = null;
                    // Math.random()-based RNG.  All platforms, very fast, unknown quality
                    var rndBytes = new Array(16);
                    mathRng = function () {
                        var r, b = rndBytes, i;

                        for (var i = 0, r; i < 16; i++) {
                            if ((i & 0x03) == 0) r = Math.random() * 0x100000000;
                            b[i] = r >>> ((i & 0x03) << 3) & 0xff;
                        }

                        return b;
                    };

                    try {
                        // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
                        // WebKit only (currently), moderately fast, high quality
                        if (window.crypto && window.crypto.getRandomValues) {
                            var rnds = new Uint32Array(4);
                            whatwgRng = function () {
                                window.crypto.getRandomValues(rnds);
                                var random = [];
                                for (var c = 0; c < 16; c++) {
                                    random[c] = rnds[c >> 2] >>> ((c & 0x03) * 8) & 0xff;
                                }
                                return random;
                            };
                        }
                    } catch (e) {

                    }

                    // Select RNG with best quality
                    var rng = whatwgRng || mathRng;
                    FIVEMIN.LIB.rand = rng;
                    return rng();
                },

                timer: function () {
                    var startTimeStamp;
                    return {
                        start: function () {
                            startTimeStamp = new Date().getTime();
                        },

                        getStatus: function () {
                            var now = new Date().getTime();
                            var seconds = (now - startTimeStamp) / 1000;
                            return seconds;
                        }
                    };
                }(),

                isDecendant: function (decendant, ancestor) {
                    var isDecendant = false;
                    do {
                        if (decendant == ancestor) {
                            isDecendant = true;
                            break;
                        }
                        decendant = decendant.parentNode;
                    }
                    while (decendant.tagName.toLowerCase() != "html")

                    return isDecendant;
                },

                getTopMostWindow: function () {
                    var currP = window;
                    while (currP) {
                        try {
                            var newP = currP.parent;
                            // try to reach the document, if didn't succeed - goes to catch {}
                            var doc = newP.document;
                            if (!doc) break;
                            // reached the top
                            // newP is ok. use it.
                            currP = newP;
                            if (newP == newP.parent) break;

                        } catch (ex) {
                            break;
                        }
                    }
                    $.getTopMostWindow = function () { return currP; };
                    return currP;
                },

                _parseQueryString: function (query) {
                    var params = {};
                    query.replace(/(.*?)=(.*?)(?:&|$)/g, function (match, key, value) {
                        params[key/*.toLowerCase()*/] = decodeURIComponent(value);
                    });
                    return params;
                },

                //Returns true if it is a DOM element
                isElement: function (o) {
                    return (
						typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
						typeof o === "object" && o.nodeType === 1 && typeof o.nodeName === "string"
					);
                },

                _getQueryString: function () {
                    if (!$._getQueryString._overwritten) {
                        $._getQueryString._overwritten = true;

                        var queryString = $._parseQueryString(location.search.substr(1));
                        $._getQueryString = function (key, def) {
                            key = key.toLowerCase();
                            return (queryString[key] === undefined ? def : queryString[key]) || "";
                        };
                        return $._getQueryString.apply(null, arguments);
                    }
                    return null;
                }
            });

            $.browser = {};

            (function () {
                /* Borrowed from MooTools Browser object */
                var ua = navigator.userAgent.toLowerCase(),
					platform = navigator.platform.toLowerCase(),
					ua2 = ua.match(/(opera|ie|firefox|chrome|version)[\s\/:]([\w\d\.]+)?.*?(safari|version[\s\/:]([\w\d\.]+)|$)/) || [null, 'unknown', 0],
					mode = ua2[1] == 'ie' && document.documentMode;
                $.browser.name = (ua2[1] == 'version') ? ua2[3] : ua2[1];
                $.browser.version = mode || parseFloat((ua2[1] == 'opera' && ua2[4]) ? ua2[4] : ua2[2]);
                $.browser.platform = {
                    name: ua.match(/ip(?:ad|od|hone)/) ? 'ios' : (ua.match(/(?:webos|android)/) || platform.match(/mac|win|linux/) || ['other'])[0],
                    version: androidOS() || iPadOS() || iPhoneOS() || ""
                };
                $.browser.features = {
                    xpath: !!(document.evaluate),
                    air: !!(window.runtime),
                    query: !!(document.querySelector),
                    json: !!(window.JSON)
                };
                $.browser[$.browser.name] = true;
                $.browser[$.browser.name + parseInt($.browser.version, 10)] = true;
                $.browser.platform[$.browser.platform.name] = true;
            })();

            function androidOS() {
                var match;
                var version = navigator.userAgent.match('Android') ? 1.0 : false;
                if (match = /Android (\d+(?:\.\d+)+)/.exec(navigator.userAgent)) {
                    var split = match[1].split('.');
                    version = 0;
                    var mult = 1;
                    for (var i = 0; i < split.length; i++) {
                        version += parseInt(split[i]) / mult;
                        mult *= 10;
                    }
                }
                return version;

            };

            function iPadOS() {
                var match;
                var version = navigator.userAgent.match('iPad') ? 1.0 : false;
                if (match = /CPU OS (.*) like Mac OS X/.exec(navigator.userAgent)) {
                    version = parseInt(match[1].replace('_', ''), 10) / 100;
                    if (version < 1) {
                        version *= 10;
                    }
                }
                return version;
            };

            function iPhoneOS() {
                var match;
                var version = navigator.userAgent.match('iPod') || navigator.userAgent.match('iPhone') ? 1.0 : false;
                if (match = /iPhone OS (.*) like Mac OS X/.exec(navigator.userAgent)) {
                    version = parseInt(match[1].replace('_', ''), 10) / 100;
                    if (version < 1) {
                        version *= 10;
                    }
                }
                return version;
            };

            (function () {
                var loaded,
				observers = [];

                $.extend($, {
                    addDomReady: function (fn) {
                        if (loaded) { return fn(); }

                        observers[observers.length] = fn;

                        if (!domReadyInitialized) {
                            domReadyInitialized = true;
                            initDomReady();
                        }
                        return true;
                    }
                });

                var domReadyInitialized;
                function initDomReady() {
                    if ($.document == null) $.document = document;
                    if ($.document.readyState == "loaded" || $.document.readyState == "complete") { domready(); }

                    if ($.browser.name == "ie") {
                        var temp = $.create('div');
                        (function () {
                            var success = false;
                            try {
                                temp.doScroll('left');
                                $.document.body.appendChild(temp);
                                temp.innerHTML = "temp";
                                $.removeNode(temp);
                                success = true;
                            } catch (ex) {
                                setTimeout(arguments.callee, 500);
                            }

                            if (success) { domready(); }
                        })();
                    } else if ($.browser.features.query == false) {
                        (function () {
                            if ($.document.readyState == "loaded" || $.document.readyState == "complete") { domready(); }
                            else { setTimeout(arguments.callee, 500); }
                        })();
                    } else {
                        if ($.document.readyState == "loaded" || $.document.readyState == "complete") { domready(); }
                        else {
                            $.addEvent(window, 'load', domready);
                            $.addEvent(document, 'DOMContentLoaded', domready);
                        }
                    }

                    function domready() {
                        if (loaded) { return; }
                        loaded = true;
                        $.each(observers, function (fn) {
                            fn();
                        });
                    }
                }
            })();

            $.jsonpCallbacks = {};

            // options: bind, pass, preventCache
            $.jsonp = function (url, callback, options) {
                if (options == null) options = {};
                if (callback != null) {
                    if (typeof callback != "string") {
                        var rand = options.callbackName || "j" + Math.random().toString().substring(5);
                        var func;
                        if (options.bind) {
                            func = function (data) { FIVEMIN.LIB.bind(callback, options.bind)(1, data, options.pass); };
                        } else {
                            func = function (data) { callback(1, data, options.pass); };
                        }
                        $.jsonpCallbacks[rand] = func;
                        url += (url.indexOf("?") > -1 ? "&" : "?") + "callback=FIVEMIN.LIB.jsonpCallbacks['" + rand + "']";
                    } else {
                        url += (url.indexOf("?") > -1 ? "&" : "?") + "callback=" + callback;
                    }
                }
                if (options.preventCache) { url += "&rnd=" + new Date().getTime(); } // prevent caching

                var head = $.getElement("head") || $.document.body || $.document.documentElement;

                $.create("script", {
                    src: url,
                    type: "text/javascript",
                    parent: head
                });
            };

            $.callAjax = function (url, callback) {
                var xhr;

                if (typeof XMLHttpRequest !== 'undefined') xhr = new XMLHttpRequest();
                else {
                    var versions = ["MSXML2.XmlHttp.5.0",
		                "MSXML2.XmlHttp.4.0",
		                "MSXML2.XmlHttp.3.0",
		                "MSXML2.XmlHttp.2.0",
		                "Microsoft.XmlHttp"]

                    for (var i = 0, len = versions.length; i < len; i++) {
                        try {
                            xhr = new ActiveXObject(versions[i]);
                            break;
                        } catch (e) {
                        }
                    } // end for  
                }

                xhr.onreadystatechange = ensureReadiness;

                function ensureReadiness() {
                    if (xhr.readyState < 4) {
                        return;
                    }

                    if (xhr.status !== 200) {
                        return;
                    }

                    // all is well    
                    if (xhr.readyState === 4) {
                        callback(xhr);
                    }
                }

                xhr.open('GET', url, true);
                xhr.send('');

            };


            $.toQueryString = function (params) {
                var arr = [];
                $.each(params, function (value, key) {
                    if (typeof value == 'function' || value == null) return;
                    arr.push(key + "=" + encodeURIComponent(value + ''));
                });
                return arr.join("&");
            };

            var cssPixelValue = "left,top,bottom,right,width,height,maxWidth,maxHeight,minWidth,minHeight,fontSize,letterSpacing,lineHeight,margin,marginLeft,marginRight,marginTop,marginBottom,padding,paddingLeft,paddingRight,paddingTop,paddingBottom,borderWidthLeft,borderWidthRight,borderWidthTop,borderWidthBottom".split(",");
            var cssNumericValue = "z-index,font-weight,opacity,zoom,line-height".split(",");

            return $;
        }();

        return FIVEMIN.LIB;
    })();
}
if (typeof (FIVEMIN.LIB.Helpers) == "undefined") {
    FIVEMIN.LIB.Helpers = {
        getRnd: function (s) { var a = s.split(","); return a[Math.floor(Math.random() * a.length)]; }
		, getHead: function () { var $ = FIVEMIN.LIB; return $.getElement("head") || $.document.body || $.document.documentElement; }
    };
}


/* ~/Scripts/Fivemin.lib.fx.js */

if (typeof (FIVEMIN) == "undefined") { var FIVEMIN = {}; }
if (typeof (FIVEMIN.LIB) == "undefined") { FIVEMIN.LIB = {}; }
if (typeof (FIVEMIN.LIB.Fx) == 'undefined')
{
	FIVEMIN.LIB.Fx = function () {
		var defaultOptions = {
			duration: 500,
			fps: 50
		};
		function fx(element, options, baseOptions) {
			this.element = element;
			this.options = {};
			this.setOptions(defaultOptions);
			this.setOptions(baseOptions);
			this.setOptions(options);
			if (typeof this.options.transition == 'string') {
				this.options.transition = eval("FIVEMIN.LIB.Fx.Transitions." + this.options.transition);
			}
		}
		fx.prototype = {
			setOptions: function (options) {
				if (options == null) return;
				for (var opts in options) {
					if (options[opts] != null) this.options[opts] = options[opts];
				}
			},
			transition: function (p) {
				if (this.options.transition) return this.options.transition(p);
				return -(Math.cos(Math.PI * p) - 1) / 2;
			},
			start: function (to, callback) {
				if (this.timer) { return false; }
				var self = this;
				this.to = to;
				this.from = this.getFrom();
				this.startTime = new Date().getTime();
				this.endTime = this.startTime + this.options.duration;
				this.timer = setInterval(function () { self.step(); }, Math.round(1000 / this.options.fps));
				if (callback != null) callback();
				return this;
			},
			stop: function () {
				if (!this.timer) { return false; }
				clearInterval(this.timer);
				this.timer = null;
				return true;
			},
			cancel: function () {
				this.stop();
				if (this.options.onCancel) { this.options.onCancel.call(this); }
			},
			complete: function () {
				this.set(1);
				this.stop();
				if (this.options.onComplete) { this.options.onComplete.call(this); }
			},
			step: function () {
				var time = new Date().getTime();
				if (time < this.endTime) {
					var percentage = this.transition((time - this.startTime) / this.options.duration);
					this.set(percentage);
				}
				else { this.complete(); }
			},
			getFrom: function () {
				var from = {};
				for (var key in this.to) {
					from[key] = FIVEMIN.LIB.currCss(this.element, key);
					if (key == "marginLeft" && isNaN(from[key])) {
						from[key] = FIVEMIN.LIB.currCss(this.element, "margin-left");
					}
				}
				return from;
			},
			set: function (p) {
				var style = {};
				for (var key in this.to) {
					var value = this.to[key];
					style[key] = (value - this.from[key]) * p + this.from[key];
					if (key !== "opacity") { style[key] = Math.floor(style[key]); }
				}
				FIVEMIN.LIB.css(this.element, style);
			}
		};

		return fx;
	} ();

	FIVEMIN.LIB.Fx.Transition = function (transition, params) {
		params = typeof (params) != 'array' ? [params] : params;
		transition.easeIn = function (pos) {
			return transition(pos, params);
		};
		transition.easeOut= function (pos) {
			return 1 - transition(1 - pos, params);
		};
		transition.easeInOut= function (pos) {
			return (pos <= 0.5) ? transition(2 * pos, params) / 2 : (2 - transition(2 * (1 - pos), params)) / 2;
		};
		return transition;
	};

	FIVEMIN.LIB.Fx.Transitions = {};

	FIVEMIN.LIB.Fx.Transitions.extend = function (transitions) {
		for (var transition in transitions) FIVEMIN.LIB.Fx.Transitions[transition] = new FIVEMIN.LIB.Fx.Transition(transitions[transition]);
	};

	FIVEMIN.LIB.Fx.Transitions.extend({

		Pow: function (p, x) {
			return Math.pow(p, x[0] || 6);
		},

		Expo: function (p) {
			return Math.pow(2, 8 * (p - 1));
		},

		Circ: function (p) {
			return 1 - Math.sin(Math.acos(p));
		},

		Sine: function (p) {
			return 1 - Math.sin((1 - p) * Math.PI / 2);
		},

		Back: function (p, x) {
			x = x[0] || 1.618;
			return Math.pow(p, 2) * ((x + 1) * p - x);
		},

		Bounce: function (p) {
			var value = 0;
			for (var a = 0, b = 1; 1; a += b, b /= 2) {
				if (p >= (7 - 4 * a) / 11) {
					value = b * b - Math.pow((11 - 6 * a - 11 * p) / 4, 2);
					break;
				}
			}
			return value;
		},

		Elastic: function (p, x) {
			return Math.pow(2, 10 * --p) * Math.cos(20 * p * Math.PI * (x[0] || 1) / 3);
		},

		Quad: function (p) {
			return Math.pow(p, 2);
		},
		Cubic: function (p) {
			return Math.pow(p, 3);
		},
		Quart: function (p) {
			return Math.pow(p, 4);
		},
		Quint: function (p) {
			return Math.pow(p, 5);
		}
	});
}


/* ~/Scripts/Fivemin.storage.js */

if (typeof (FIVEMIN) == "undefined") { var FIVEMIN = {}; }
if (typeof (FIVEMIN.STORAGE) == "undefined") {
	var swfobject = FIVEMIN.swfobject || window.swfobject;
	var ajaxFunc = function (params) {
		if (FIVEMIN.LIB != null) {
			var options = {
				preventCache: false,
				callbackName: params.callbackName
			};
			var success = function (succ, data) {
				params.success(data);
			};
			FIVEMIN.LIB.jsonp(params.url, success, options);
		} else if (FIVEMIN.JQuery != null) {
			params.cache = true;
			if (params.callbackName != null) params.jsonpCallback = params.callbackName;
			FIVEMIN.JQuery.ajax(params);
		}
	};

	var urlbase = FIVEMIN.BaseConfig.urls.syn+"Handlers/";

	var _ec_tests = 2;
	var _ec_debug = 0;

	var Fivemincookie = (function () {
		this._class = function () {

			var self = this;
			var flashReady = false;
			this._ec = {};

			this.flashAvailable = function () {
				flashReady = true;
			};

			this.get = function (name, cb) {
				self._fivemincookie(name, cb, null);
			};

			this.set = function (name, value) {
				self._fivemincookie(name, function () { }, value);
			};

			this._fivemincookie = function (name, cb, value) {
				if (value != null) {
					this.fivemincookie_lso(name, value);
					var url = urlbase + 'FiveminCookieCache.ashx?name=' + name;
					if (value == "") url += '&empty=1';
					else url += '&value=' + value;
					ajaxFunc({
						url: url,
						callbackName: 'cache_' + name + '_' + value,
						success: function () {
							// FiveminCookieCache.ashx handles caching
							var img = new Image();
							img.style.visibility = 'hidden';
							img.style.position = 'absolute';
							img.src = urlbase + 'FiveminCookieCache.ashx?name=' + name + "&callback=FIVEMIN.LIB.jsonpCallbacks['cache_" + name + "']";
						}
					});
				}
				else {
					self._ec.cacheData = null;

					ajaxFunc({
						url: urlbase + 'FiveminCookieCache.ashx?name=' + name,
						callbackName: 'cache_' + name,
						success: function (data) {
							if (cb != null) cb(data.toString());
						},
						error: function () {
							if (cb != null) cb('');
						}
					});
				}
			};

			this.fivemincookie_lso = function (name, value) {
			    this.flashObj = this.flashObj || FIVEMIN.swfobject.getObjectById('fivemincookieswf');
			    var hasFlash = FIVEMIN.swfobject.hasFlashPlayerVersion('9.0.115');
			    if (hasFlash && !flashReady && this.flashObj == null) {
					var div = document.createElement("div");
					div.innerHTML = '<div id="fivemincookieswfcontainer"></div>';
					div.setAttribute('style', 'position:absolute;top:0;left:0;');
					document.body.appendChild(div);

					var params = {
						swliveconnect: 'true',
						allowscriptaccess: 'always',
						flashvars: 'jscbOnLoad=FIVEMIN.storage.flashAvailable'
					};

					var attributes = {
						id: 'fivemincookieswf',
						name: 'fivemincookieswf',
						data: "http://cfiles.5min.com/flashcookie/StorageCookie_01.swf",
						width: "1",
						height: "1"
					};

					this.flashObj = FIVEMIN.swfobject.createSWF(attributes, params, "fivemincookieswfcontainer");
				}
				else if (value == null && this.flashObj != null && this.flashObj.getValueByKey != null) {
					return this.flashObj.getValueByKey(name);
				}

				if (value != null) {
					FIVEMIN.LIB.waitUntil(function () { return flashReady && self.flashObj != null; }, function () { self.flashObj.setValueByKey(name, value); });
					return value;
				}
				return null;
			};
		};

		return _class;
	})();

	FIVEMIN.storage = (function () {
		var store = {};
		var ec = new Fivemincookie();
		var queues = {};
		var parseQueue = function () {
			for (var queueItem in queues) {
				if (store[queueItem] != null) {
					var item;
					while (item = queues[queueItem].pop()) {
						item(store[queueItem]);
					}
				}
			}
		};

		/* RNG SECTION */
		var mathRng, whatwgRng = null;
		// Math.random()-based RNG.  All platforms, very fast, unknown quality
		var rndBytes = new Array(16);
		mathRng = function () {
			var r, b = rndBytes, i = 0;

			for (var i = 0, r; i < 16; i++) {
				if ((i & 0x03) == 0) r = Math.random() * 0x100000000;
				b[i] = r >>> ((i & 0x03) << 3) & 0xff;
			}

			return b;
		};

	    try {
	        // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
	        // WebKit only (currently), moderately fast, high quality
	        if (window.crypto && window.crypto.getRandomValues) {
	            var rnds = new Uint32Array(4);
	            whatwgRng = function () {
	                window.crypto.getRandomValues(rnds);
	                var random = [];
	                for (var c = 0; c < 16; c++) {
	                    random[c] = rnds[c >> 2] >>> ((c & 0x03) * 8) & 0xff;
	                }
	                return random;
	            };
	        }
	    } catch(e) {

	    } 
		

		// Select RNG with best quality
		var rng = whatwgRng || mathRng;

		/* /RNG SECTION */

		var storageApi = {
			get: function (param, callback) {
				if (store[param] != null) {
					callback(store[param]);
				} else if (queues[param] != null) {
					queues[param].push(callback);
				} else {
					queues[param] = [callback];
					ec.get(param, function (value) {
						if (param == 'uuid' && (value == null || value == '')) {
							value = rng().join('').substring(1,16);
							ec.set('uuid', value);
						}
						if (value == null) value = '';
						store[param] = value;
						parseQueue();
					});
				}
			},
			set: function (key, value) {
				store[key] = value;
				ec.set(key, value);
				return value;
			},
			reset: function (param) {
				store[param] = null;
				queues[param] = null;
			},

			flashAvailable: function () { ec.flashAvailable(); }
		};
		return storageApi;
	})();
}


/* ~/Scripts/Fivemin.RequestManager.js */

/* The FIVEMIN RequestManager is an object that handles all xhtml requests to the 5min server.
It automatically utilizes either Flash or JSONP as necessary.
It contains a single function, addRequest, that accepts a single object:
requestURL - Required. The web uri to call
jscbRequest - Optional. The javascript call back function to pass the request to, the function will be given three parameters:
success - 1 if the request was successful, 2 if there was an error
data - the JSON data of the response
extra - Any extra data meant to be carried through via the pass parameter
pass - Optional. An extra argument to be added to the request callback
bind - Optional. If this parameter is set, then the jscbRequest function will be bound to the bind object when called
priority - Optional. If set to 1, the request is fired immediately instead of put into the queue. If set to 2, it waits for domready.
*/

if (typeof (FIVEMIN) == "undefined") { var FIVEMIN = {}; }

if (typeof (FIVEMIN.RequestManager) == "undefined") {
    /* FlashProxy subobject of the Request Manager
    Only addRequest should be used externally:
    Accepts a hash object with the following parameters:
    requestURL, identifier
    */
	FIVEMIN.FlashProxy = function () {
		var flashProxy = {}; var conf = {}; var flashInit = 'error'; var proxyDivID = 'FiveminFlashProxy' + Math.floor(Math.random() * 10000); var flashObj = null;
		function sendRequest(cfg, callBack, intervalPointer) {
			if (flashObj == null && flashInit == 'complete') {
				flashInit = 'error';
			}
			switch (flashInit) {
				case 'error':
					if (cfg.priority == 1) {
						flashProxy.init(cfg);
					} else {
						cfg.priority = 1;
						FIVEMIN.RequestManager.addRequest(cfg);
					}
					FIVEMIN.RequestManager.hasFlash = false;
					if (intervalPointer != null) clearInterval(intervalPointer);
					break;
				case 'complete':
					flashObj.addRequest(cfg.requestURL, callBack, 'json');
					if (intervalPointer != null) clearInterval(intervalPointer);
					break;
			}
			return false;
		}
		flashProxy.init = function (cfg) {
			try {
				if (cfg == null) cfg = {};
				if (typeof cfg.conf != 'undefined') conf = cfg.conf;
				if (conf.debug && conf.dummyData) { cfg.jscbRequest(1, conf.dummyData); return; }
				var wrapper = document.createElement("div");
				wrapper.setAttribute('style', 'position:absolute;top:0;left:0;');
				wrapper.innerHTML = '<div id="' + proxyDivID + '"></div>';
				var body = document.body;
				body.insertBefore(wrapper, body.firstChild);

				var swfUrlStr = FIVEMIN.BaseConfig.urls.files + FIVEMIN.BaseConfig.FlashProxyUrl;

				var flashVars = "";
				if (cfg.jscbOnLoad) flashVars += "&jscbOnLoad=" + cfg.jscbOnLoad;
				if (cfg.requestURL) flashVars += "&requestURL=" + encodeURIComponent(cfg.requestURL);
				if (cfg.identifier) flashVars += "&jscbRequest=FIVEMIN.RequestManager.callbacks[" + cfg.identifier + "]";
				if (flashVars.length > 0) flashVars.length = flashVars.substr(1);

				var params = {
					allowfullscreen: true,
					allowscriptaccess: "always",
					flashvars: flashVars
				};

				var attributes = {
					id: "FiveminFlashProxy",
					name: "FiveminFlashProxy",
					data: swfUrlStr,
					width: "1",
					height: "1"
				};

				flashObj = FIVEMIN.swfobject.createSWF(attributes, params, proxyDivID);
				flashProxy.init = function () { };

				if (flashInit == "flashProxyEnabled") flashInit = "complete";
				else if (flashInit == "start") flashInit = "initCallback";
			} catch (exception) {
				flashInit = "error";
			}
		};
		flashProxy.addRequest = function (cfg, callBack) {
			if (flashInit == 'complete') {
				sendRequest(cfg, callBack);
			} else {
				var intervalPointer = setInterval(function () {
					sendRequest(cfg, callBack, intervalPointer);
				}, 100);
			}
		};

		flashProxy.flashProxyEnabled = function () {
			if (flashInit == "initCallback") {
				flashInit = "complete";
			} else if (flashInit == "start") {
				flashInit = "flashProxyEnabled";
			}
		};

		// Create flashProxy
		if (FIVEMIN.BaseConfig.UseFlashProxy && FIVEMIN.swfobject.hasFlashPlayerVersion("9.0.115")) {
			flashInit = 'start';
			var intervalPtr = setInterval(function () {
				if (document != null && document.body != null && document.body.firstChild != null) {
					flashProxy.init({ jscbOnLoad: "FIVEMIN.FlashProxy.flashProxyEnabled" });
					clearInterval(intervalPtr);
				};
			}, 100);
		}
		return flashProxy;
	} ();

	FIVEMIN.RequestManager = function () {
	    var requestManager = {};
	    var $ = FIVEMIN.LIB;
	    var queue = new Array();
	    var timeout = null;

	    requestManager.hasFlash = FIVEMIN.BaseConfig.UseFlashProxy && FIVEMIN.swfobject.hasFlashPlayerVersion("9.0.115");

	    requestManager.callbacks = [];

	    requestManager.addRequest = function (cfg) {
	        // Check priority
	        if (cfg.priority == 1)
	            sendRequest(cfg);
	        else {
	            if (cfg.priority == null) cfg.priority = 0;
	            // Add to Queue
	            queue.push(cfg);

	            // if queue not started, start
	            if (timeout == null) timeout = setTimeout(startQueue, 1000, this);
	        }
	    };

	    function startQueue() {
	        var tmpQueue = [];
	        while (queue.length > 0) {
	            var cfg = queue.shift();
	            if (cfg.priority == 2) {
	                tmpQueue.push(cfg);
	            } else {
	                sendRequest(cfg);
	            }
	        }
	        if (tmpQueue.length != 0) {
	            var sendAllRequests = function () {
	                for (var i = 0; i < tmpQueue.length; i++) {
	                    sendRequest(tmpQueue[i]);
	                }
	            };
	            $.addDomReady(sendAllRequests);
	        }
	        clearTimeout(timeout);
	        timeout = null;
	    }

	    function sendRequest(cfg) {
	        if (!cfg.requestURL) return;
	        if (!cfg.identifier) cfg.identifier = Math.ceil(Math.random() * 100000);
	        var sendAttemptCount = 0;
	        var sendAttemptDelay = 500;

	        if (cfg.jscbRequest == null) {
	            function resendImg() {
	                sendAttemptCount++;
	                sendAttemptDelay *= 2;
	                setTimeout(function () {
	                    var image = new Image();
	                    if (sendAttemptCount < 20) {
	                        image.onerror = resendImg;
	                        image.onabort = resendImg;
	                    }
	                    image.src = cfg.requestURL + (cfg.retryParam != null ? '&' + cfg.retryParam + '=' + sendAttemptCount : '');
	                }, sendAttemptDelay);
	            }
	            var img = new Image();
	            if (cfg.performRetry) {
	                img.onerror = resendImg;
	                img.onabort = resendImg;
	            }
	            img.src = cfg.requestURL + (cfg.retryParam != null ? '&' + cfg.retryParam + '=' + sendAttemptCount : '');
	        }
	        else {
	            if (requestManager.hasFlash) {
	                if (cfg.bind) {
	                    requestManager.callbacks[cfg.identifier] = function (success, data) { FIVEMIN.LIB.bind(cfg.jscbRequest, cfg.bind)(success, data, cfg.pass); };
	                } else {
	                    requestManager.callbacks[cfg.identifier] = function (success, data) { cfg.jscbRequest(success, data, cfg.pass); };
	                }
	                FIVEMIN.FlashProxy.addRequest(cfg, "FIVEMIN.RequestManager.callbacks[" + cfg.identifier + "]");
	            }
	            else {
	                if (cfg.bind) {
	                    requestManager.callbacks[cfg.identifier] = function (data) { FIVEMIN.LIB.bind(cfg.jscbRequest, cfg.bind)(1, data, cfg.pass); };
	                } else {
	                    requestManager.callbacks[cfg.identifier] = function (data) { cfg.jscbRequest(1, data, cfg.pass); };
	                }
	                $.jsonp(cfg.requestURL, "FIVEMIN.RequestManager.callbacks[" + cfg.identifier + "]", cfg.options);
	            }
	        }
	    }

	    return requestManager;
	} ();
}



/* ~/Scripts/Fivemin.Logger.js */

if (typeof (FIVEMIN) == "undefined") { var FIVEMIN = {}; }

if (typeof (FIVEMIN.Logger) == "undefined") {

	FIVEMIN.Logger = function () {
		var logger = {};
		var $ = FIVEMIN.LIB;

		logger.Log = function (product, params, events) {
			var obj = FIVEMIN.BaseConfig.Logger[product];
			var ev = FIVEMIN.BaseConfig.Logger[product].events[events];

			if (params.loglevel != null) {
				FIVEMIN.BaseConfig.Logger.LogLevel = params.loglevel;
				delete params.loglevel;
			}

			if (FIVEMIN.BaseConfig.Logger.LogLevel == null
				|| (FIVEMIN.BaseConfig.Logger.LogLevel & ev.bitValue)) {

				var targetParams = $.extend({}, obj.params);
				var urlLogger = FIVEMIN.BaseConfig.Logger.LogServer + "/" + ev.name + "?";
				if (ev.params) $.extend(targetParams, ev.params);

				$.extend(targetParams, params);
				targetParams = logger.Parse(targetParams);

				if (FIVEMIN.storage != null) {
					FIVEMIN.storage.get('uuid', function (value) {
						targetParams['uid'] = (value == null) ? "" : value;
						FIVEMIN.RequestManager.addRequest({ requestURL: urlLogger + $.toQueryString(targetParams), priority: 1, performRetry: false, retryParam: 'Lrn' });
					});
				} else {
					FIVEMIN.RequestManager.addRequest({ requestURL: urlLogger + $.toQueryString(targetParams), performRetry: false, retryParam: 'Lrn' });
				}
			}
		};

		logger.Parse = function (params) {
			for (key in params) {
				if (params[key] == null || params[key] == '') {
					if (FIVEMIN.BaseConfig.Logger.Enums[key] != null && FIVEMIN.BaseConfig.Logger.Enums[key].empty != null) {
						params[key] = FIVEMIN.BaseConfig.Logger.Enums[key].empty;
					}
				}
				if (params[key] != null) {
					var value = params[key].toString();
					if (value != '' && FIVEMIN.BaseConfig.Logger.Enums[key] != null) {
						if (isNaN(value)) {
							if (FIVEMIN.BaseConfig.Logger.Enums[key][params[key]] != null) {
								params[key] = FIVEMIN.BaseConfig.Logger.Enums[key][value];
							} else params[key] = "";
						}
					}
					if (value == "true") params[key] = 1;
					if (value == "false") params[key] = 0;
					if (value == "null") params[key] = "";
					if (value.indexOf(",") > -1) {
						var values = value.split(",");
						values.sort(function (a, b) { return a - b; });
						params[key] = values.toString();
					}
				}
			}
			return params;
		};

		return logger;
	} ();
}


/* ~/Scripts/Fivemin.ResultsManager.js */

if (typeof (FIVEMIN) == "undefined") { var FIVEMIN = {}; }
if (typeof (FIVEMIN.ResultsManager) == "undefined") {
	FIVEMIN.ResultsManager = function(){
		var ResultsManager = {};
		
		ResultsManager.ServerRequests = {};

		ResultsManager.sendRequest = function(cfg) {
			if (cfg.conf && cfg.conf.debug && cfg.conf.dummyData) {
				cfg.jscbRequest(1, conf.dummyData);
				return;
			}
			
			if(typeof(ResultsManager.ServerRequests[cfg.requestURL]) == "undefined")
			{
				ResultsManager.ServerRequests[cfg.requestURL] = { };
				ResultsManager.ServerRequests[cfg.requestURL].instances = new Array();
				ResultsManager.ServerRequests[cfg.requestURL].instances.push(cfg);
				
				FIVEMIN.RequestManager.addRequest({
					requestURL: cfg.requestURL,
					jscbRequest: this.onHandlerResponse,
					priority: 1,
					pass: cfg.requestURL,
					bind: FIVEMIN.ResultsManager,
					parentEls: cfg.parentEls
				});
			} else if(typeof(ResultsManager.ServerRequests[cfg.requestURL].Data)=="undefined"){
				ResultsManager.ServerRequests[cfg.requestURL].instances.push(cfg);
			} else {
				ResultsManager.returnResults(cfg);
			}
		};
		
		ResultsManager.onHandlerResponse = function(success, data, requestURL){
			this.ServerRequests[requestURL].Success = success;
			if (success == 2) { return; }
			this.ServerRequests[requestURL].Data = data;
			for (var c =0; c < this.ServerRequests[requestURL].instances.length; c++) {
				this.returnResults(this.ServerRequests[requestURL].instances[c]);
			}
		};
		
		ResultsManager.returnResults = function(cfg){
			if(cfg.bind){
				FIVEMIN.LIB.bind(cfg.jscbRequest,cfg.bind)(this.ServerRequests[cfg.requestURL].Success, this.ServerRequests[cfg.requestURL].Data);
			} else {
				cfg.jscbRequest(this.ServerRequests[cfg.requestURL].Success, this.ServerRequests[cfg.requestURL].Data);
			}
		};
		
		return ResultsManager;
	}();
}


/* ~/Scripts/Fivemin.VideoLightbox.js */

if (typeof (FIVEMIN) == "undefined") { var FIVEMIN = {}; }
if (typeof (FIVEMIN.VideoLightbox) == "undefined") {
	FIVEMIN.VideoLightbox = function () {
		var $ = FIVEMIN.LIB;
		$.fx = FIVEMIN.LIB.Fx;
		var cssPrefix = "fmts-lb-";
		var contentCSSPrefix = cssPrefix + "cn-";
		var playerWidth = 470, playerHeight = 500;
		var offsetFromTop = 30;
		var isFreewheel = true;

		$.addStylesheet(FIVEMIN.BaseConfig.urls.shared + FIVEMIN.BaseConfig.Lightbox.css, 'all', $.getTopMostWindow().document);

		function videoLightbox(options) {
			if (options) {
				cssPrefix = options.cssPrefix ? options.cssPrefix : cssPrefix;
				contentCSSPrefix = options.contentCSSPrefix ? options.contentCSSPrefix : contentCSSPrefix;
				playerWidth = options.playerWidth ? options.playerWidth : playerWidth;
				playerHeight = options.playerHeight ? options.playerHeight : playerHeight;
				offsetFromTop = options.offsetFromTop ? options.offsetFromTop : offsetFromTop;
				isFreewheel = options.isFreewheel != null ? options.isFreewheel : isFreewheel;
			}
		}

		$.extend(videoLightbox.prototype, {
			init: function (data, instanceNumber) {
				$.setDocument($.getTopMostWindow().document);
				this.data = data;
				this.instanceNumber = instanceNumber;
				var randomId = parseInt(Math.random(10000) * 10000);
				var adIdPrefix = contentCSSPrefix + "cb-ad-FIVEMIN-" + randomId + "-";
				var animType = data.lightboxAnim;
				var onHideStart = data.onHideStart;
				var onShowStart = data.onShowStart;
				var onHideComplete = data.onHideComplete;
				var onShowComplete = data.onShowComplete;
				var customShow = data.customShow;
				var customHide = data.customHide;
				var relatedMode = data.relatedMode;
				this.logAddVideoView = data.logAddVideoView != null ? data.logAddVideoView : function () { };
				var identifier = "FIVEMIN_Lightbox_" + randomId;
				var extraPlayerParams = null;
				var self = this;
				if (data.extraPlayerParams != {}) extraPlayerParams = data.extraPlayerParams;

				try {
					$.getTopMostWindow()[identifier] = this;
				} catch (e) { alert(e); }

				this.box = new box();
				this.box.init({
					animConfig: {
						duration: 300,
						type: animType,
						onHideStart: $.bind(function (box) {
							if (onHideStart) onHideStart(box);
							this.player.hide();
						}, this),
						onHideComplete: $.bind(function () {
							this.overlay.hide();
							if (onHideComplete) onHideComplete();
						}, this),
						onShowStart: $.bind(function (box) {
							if (onShowStart) onShowStart(box);
						}, this),
						onShowComplete: $.bind(function () {
							if (onShowComplete) onShowComplete();
						}, this),
						customShow: customShow,
						customHide: customHide
					},
					hideFunc: $.bind(function () {
						this.hide();
					}, this),
					show5minLink: data.show5minLink,
					show5minText: data.show5minText,
					adIdPrefix: adIdPrefix,
					instanceNumber: instanceNumber
				});

				this.overlay = new overlay();
				this.overlay.init({
					opacity: data.overlayOpacity,
					bgColor: data.overlayColor,
					animConfig: {
						duration: 300,
						onShowComplete: function () {
							$.restoreDocument();
						}
					},
					onClickFunc: $.bind(function () {
						this.hide();
					}, this)
				});

				this.player = new player();
				this.player.init({
					adIdPrefix: adIdPrefix,
					instanceNumber: instanceNumber,
					relatedMode: relatedMode,
					getPlaylistUrl: "javascript(" + identifier + ".getPlaylistUrl)",
					onRelatedVideoChanged: identifier + ".onRelatedVideoChanged",
					extraPlayerParams: extraPlayerParams
				});
				this.box.appendToLeftContent(this.player.getElement());

				//this.sharing = new sharing();
				//this.sharing.init();
				//this.box.appendToRightContent(this.sharing.getElement());

				$.addEvent($.document, "keydown", $.bind(function (e) {
					this.hideOnEsc(e);
				}, this)
				);

				$.restoreDocument();

				this.onRelatedVideoChanged = function (cfg) {
					self.setTitle(cfg.title || cfg.Title);
					//self.updateSharingLinks(cfg.title || cfg.Title, cfg.pageUrl || cfg.PageUrl);
				};
			},

			clear: function () {
				this.box.clear();
				delete this.box;

				this.overlay.clear();
				delete this.overlay;
			},

			setTitle: function (title) {
				this.box.setTitle(title);
			},

			updateSharingLinks: function (title, pageURL) {
				this.sharing.update({
					title: title,
					pageURL: pageURL
				});
			},

			showBottomAd: function () {
				this.box.showBottomAd();
			},

			show: function (cfg) {
				$.setDocument($.getTopMostWindow().document);
				var self = this;
				this.overlay.show({
					onShowComplete: $.bind(function () {
						this.box.show({
							title: cfg.title,
							onShowComplete: function () {
								self.player.update(cfg.playerType, cfg.playerParam, cfg.VideoObj);
								self.player.show();
								//self.sharing.update({ title: cfg.title, referrerURL: cfg.ReferrerURL, pageURL: cfg.PageURL });
							}
						});
					}, this)
				});
			},

			hideOnEsc: function (e) {
				var keyId = (window.event) ? window.event.keyCode : e.keyCode;

				if (keyId == 27) {
					this.hide();
				}
			},

			hide: function () {
				this.box.hide();
			},

			getPlaylistUrl: function () {
				return this.data.getPlaylistUrl;
			}
		});

		function box() {
			var element,
			animConfig,
			titleEl,
			contentEl,
			leftContentEl,
			rightContentEl,
			displayed = false;

			return {
				clear: function () {
					if (this.element) {
						this.element.parentNode.removeChild(this.element);
						delete this.element;
					}

					if (this.iframe) {
						this.iframe.parentNode.removeChild(this.iframe);
						delete this.iframe;
					}

					if (this.boxShadow && this.boxShadow.getElement()) {
						this.boxShadow.getElement().parentNode.removeChild(this.boxShadow.getElement());
						delete this.boxShadow;
					}
				},
				init: function (cfg) {
					animConfig = cfg.animConfig;

					if (animConfig.type == 2 || animConfig.type == 3) {
						this.boxShadow.init();
					}

					var dimen = $.docSize($.getTopMostWindow().document);

					// Element
					element = $.create("div", {
						id: contentCSSPrefix + "wrapper",
						className: contentCSSPrefix + "wrapper" + " " + contentCSSPrefix + "lbwrapper",
						parent: $.getTopMostWindow().document.body
					});
					this.element = element;
					// iFrame to block objects
					this.iframe = $.create("iframe", {
						parent: $.getTopMostWindow().document.body,
						'id': contentCSSPrefix + "iframe",
						'name': contentCSSPrefix + "iframe",
						'src': 'javascript:void(0);',
						'frameborder': 0,
						'scrolling': 'no',
						'styles': {
							'position': 'fixed',
							'top': '-20px',
							'left': '-20px',
							'filter': 'progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)',
							'opacity': 0,
							'width': '100%', //dimensions.width + 'px',
							'height': dimen.height + 'px', //dimensions.height + 'px',
							'zIndex': 1,
							'visibility': '',
							'display': 'none'
						}
					});
					// Top image
					$.create("div", { className: cssPrefix + "top", parent: element });
					//Content
					contentEl = $.create("div", { className: cssPrefix + "cn", parent: element });
					// Title wrapper
					var titleWrapper = $.create("div", { className: cssPrefix + "title-wrapper", parent: contentEl });
					// Title
					titleEl = $.create("div", {
						className: contentCSSPrefix + "title",
						parent: titleWrapper
					});
					// Close button
					$.create("div", {
						className: contentCSSPrefix + "close",
						innerHTML: "X",
						parent: titleWrapper,
						events: {
							click: cfg.hideFunc
						}
					});
					// 5min link
					if (cfg.show5minLink) {
						var lnk5Min = $.create("a", {
							className: contentCSSPrefix + "by-5min-link",
							innerHTML: "by AOL On",
							parent: titleWrapper
						});
						lnk5Min.setAttribute("href", "http://on.aol.com");
						lnk5Min.setAttribute("target", "http://on.aol.com");
					}
					// 5min text
					else if (cfg.show5minText) {
						$.create("span", {
							className: contentCSSPrefix + "by-5min-text",
							innerHTML: "by AOL on",
							parent: titleWrapper
						});
					}
					var leftRightContainer = $.create("div", {
						className: contentCSSPrefix + "body clearfix",
						parent: contentEl
					});
					// Left container
					leftContentEl = $.create("div", {
						className: contentCSSPrefix + "left-cn",
						parent: leftRightContainer
					});
					// Right Container
					rightContentEl = $.create("div", {
						className: contentCSSPrefix + "right-cn",
						parent: leftRightContainer
					});
					// Ad1
					$.create("div", {
						id: cfg.adIdPrefix + "side-top",
						className: contentCSSPrefix + "ad-side-top",
						parent: rightContentEl
					});
					// Ad2
					$.create("div", {
						id: cfg.adIdPrefix + "side-bottom",
						className: contentCSSPrefix + "ad-side-bottom",
						parent: rightContentEl
					});
					// Ad3
					this.bottom_ad_wrapper = $.create("div", {
						className: contentCSSPrefix + "ad-bottom",
						parent: element
					});
					$.create("div", {
						className: contentCSSPrefix + "ad-bottom-up",
						parent: this.bottom_ad_wrapper
					});
					$.create("div", {
						id: cfg.adIdPrefix + "bottom",
						className: contentCSSPrefix + "ad-bottom-down",
						parent: this.bottom_ad_wrapper
					});
					// Bottom image
					$.create("div", { className: cssPrefix + "bottom", parent: element });
				},

				show: function (cfg) {
					$.css(this.iframe, { 'display': '' });
					$.css(this.element, { top: this._getTopPos() + "px" });
					this.setTitle(cfg.title);
					if (animConfig.onShowStart) { animConfig.onShowStart(this); }
					if (animConfig.customShow) {
						animConfig.customShow(this,
                        $.bind(function () {
                        	if (animConfig.onShowComplete) {
                        		animConfig.onShowComplete();
                        	}
                        	if (cfg.onShowComplete) {
                        		cfg.onShowComplete();
                        		displayed = true;
                        	}
                        }, this));
					} else {
						var boxShadow = this.boxShadow.getElement();
						switch (animConfig.type) {
							// fade                                     
							case 1:
								$.css(this.element, { opacity: 0, display: "block" });
								new $.fx(this.element, {
									duration: animConfig.duration,
									onComplete: function () {
										if (animConfig.onShowComplete) {
											animConfig.onShowComplete();
										}
										if (cfg.onShowComplete) {
											cfg.onShowComplete();
											displayed = true;
										}
									}
								}).start({
									opacity: 1
								});
								break;
							// grow                                     
							case 2:
								$.css(boxShadow, {
									width: 0,
									height: 0,
									marginLeft: 0,
									top: this._getTopPos() + 360,
									display: "block",
									opacity: 0
								});
								new $.fx(boxShadow, {
									duration: 200,
									onComplete: function () {
										$.css(boxShadow, { display: "none" });
										$.css(element, { display: "block" });
										if (animConfig.onShowComplete) {
											animConfig.onShowComplete();
										}
										if (cfg.onShowComplete) {
											cfg.onShowComplete();
											displayed = true;
										}
									}
								}).start({
									width: 813,
									height: 630,
									marginLeft: -406,
									top: this._getTopPos() + 7,
									opacity: 0.7
								});
								break;
							// windows7                                     
							case 3:
								$.css(boxShadow, {
									width: 740,
									height: 560,
									marginLeft: -370,
									top: this._getTopPos() + 35,
									display: "block",
									opacity: 0
								});
								new $.fx(boxShadow, {
									duration: 400,
									onComplete: function () {
										$.css(boxShadow, { display: "none" });
										$.css(element, { display: "block" });
										if (animConfig.onShowComplete) {
											animConfig.onShowComplete();
										}
										if (cfg.onShowComplete) {
											cfg.onShowComplete();
											displayed = true;
										}
									}
								}).start({
									width: 813,
									height: 630,
									marginLeft: -406,
									top: this._getTopPos() + 7,
									opacity: 0.85
								});
								break;
							// no effect                                     
							case 0:
							default:
								$.css(this.element, { display: "block" });
								if (animConfig.onShowComplete) {
									animConfig.onShowComplete();
								}
								if (cfg.onShowComplete) {
									cfg.onShowComplete();
									displayed = true;
								}
						}
					}
				},

				hide: function () {
					if (!displayed) { return; }
					$.css(this.iframe, { 'display': 'none' });
					if (animConfig.onHideStart) { animConfig.onHideStart(this); }
					if (animConfig.customHide) { animConfig.customHide(this, animConfig.onHideComplete); }
					else {
						var boxShadow = this.boxShadow.getElement();
						switch (animConfig.type) {
							// fade                                     
							case 1:
								new $.fx(this.element, {
									onComplete: $.bind(function () {
										$.css(this.element, { display: "none" });
										if (animConfig.onHideComplete) {
											animConfig.onHideComplete();
										}
									}, this),
									duration: animConfig.duration
								}).start({
									opacity: 0
								});
								break;
							// shrink                                     
							case 2:
								$.css(this.element, { display: "none" });
								$.css(boxShadow, {
									display: "block",
									top: this._getTopPos() + 7
								});
								new $.fx(boxShadow, {
									duration: 200,
									onComplete: function () {
										if (animConfig.onHideComplete) {
											animConfig.onHideComplete();
										}
									}
								}).start({
									width: 0,
									height: 0,
									marginLeft: 0,
									top: this._getTopPos() + 360,
									opacity: 0
								});
								break;
							// windows7                                     
							case 3:
								$.css(boxShadow, {
									width: 813,
									height: 630,
									marginLeft: -406,
									top: this._getTopPos() + 7,
									opacity: 0.85,
									display: "block"
								});
								$.css(this.element, { display: "none" });
								new $.fx(boxShadow, {
									duration: 400,
									onComplete: function () {
										if (animConfig.onHideComplete) {
											animConfig.onHideComplete();
										}
									}
								}).start({
									width: 740,
									height: 560,
									marginLeft: -370,
									top: this._getTopPos() + 35,
									opacity: 0
								});
								break;
							// no effect                                     
							case 0:
							default:
								$.css(this.element, { display: "none" });
								if (animConfig.onHideComplete) {
									animConfig.onHideComplete();
								}
						}
					}
					displayed = false;
					$.css(this.bottom_ad_wrapper, { display: "none" });
				},

				setTitle: function (title) {
					titleEl.innerHTML = title;
				},

				showBottomAd: function () {
					$.css(this.bottom_ad_wrapper, { display: "block" });
				},

				appendToRightContent: function (child) {
					rightContentEl.appendChild(child);
				},

				appendToLeftContent: function (child) {
					leftContentEl.appendChild(child);
				},

				getElement: function () {
					return element;
				},

				_getTopPos: function () {
					var scrollTop = function () {
						if (typeof $.getTopMostWindow().pageYOffset != 'undefined') {
							//most browsers
							return $.getTopMostWindow().pageYOffset;
						}
						else {
							var doc = $.getTopMostWindow().document;
							var b = doc.body; //IE 'quirks'
							var d = doc.documentElement; //IE with doctype
							d = (d.clientHeight) ? d : b;
							return d.scrollTop;
						}
					} ();
					scrollTop += offsetFromTop;
					return scrollTop;
				},

				boxShadow: function () {
					var element;

					return {
						init: function () {
							element = $.create("div", {
								id: contentCSSPrefix + "shadow",
								className: contentCSSPrefix + "shadow",
								parent: $.getTopMostWindow().document.body
							}
						);
						},

						getElement: function () {
							return element;
						}
					};
				} ()
			};
		}

		function overlay() {
			var opacity,
			animConfig;

			var updateDimensions = function () {
				if ($.browser.ie && $.browser.version < 8) {
					var dimensions = $.docSize($.getTopMostWindow().document);
					$.css(this.element, {
						height: dimensions.height + "px",
						width: dimensions.width + "px"
					});
				}
			};

			return {
				clear: function () {
					this.element.parentNode.removeChild(this.element);
					delete this.element;
					delete this.opacity;
					delete this.animConfig;
				},
				init: function (cfg) {
					animConfig = cfg.animConfig;
					opacity = cfg.opacity;

					this.element = $.create("div", {
						id: cssPrefix + "overlay",
						className: cssPrefix + "overlay",
						parent: $.getTopMostWindow().document.body,
						styles: {
							"backgroundColor": cfg.bgColor
						}
					});

					$.addEvent(this.element, "click", cfg.onClickFunc);
				},

				show: function (cfg) {
					$.bind(updateDimensions, this)();
					$.css(this.element, { opacity: 0, display: "block" });
					new $.fx(this.element, {
						onComplete: $.bind(function () {
							if (animConfig.onShowComplete) {
								animConfig.onShowComplete();
							}
							if (cfg.onShowComplete) {
								cfg.onShowComplete();
							}
						}, this),
						duration: animConfig.duration
					}).start({
						opacity: opacity
					});
				},

				hide: function () {
					new $.fx(this.element, {
						onComplete: $.bind(function () {
							$.css(this.element, { display: "none" });
						}, this),
						duration: animConfig.duration
					}).start({
						opacity: 0
					});
				}
			};
		}

		function player() {
			var element,
			adIdPrefix,
			instanceNumber,
			relatedMode = 3,
			adIdSuffixArr = ["side-top", "side-bottom", "bottom"],
			getPlaylistUrl,
			extraPlayerParams,
			onRelatedVideoChanged,
			currentPlayerId;

			function iPadOS() {
				var match;
				var version = navigator.userAgent.match('iPad') ? 1.0 : false;
				if (match = /CPU OS (.*) like Mac OS X/.exec(navigator.userAgent)) {
					version = parseInt(match[1].replace('_', ''), 10) / 100;
					if (version < 1) {
						version *= 10;
					}
				}

				return version;
			}

			function iPhoneOS() {
				var match;
				var version = navigator.userAgent.match('iPod') || navigator.userAgent.match('iPhone') ? 1.0 : false;
				if (match = /iPhone OS (.*) like Mac OS X/.exec(navigator.userAgent)) {
					version = parseInt(match[1].replace('_', ''), 10) / 100;
					if (version < 1) {
						version *= 10;
					}
				}

				return version;
			}

			return {
				init: function (cfg) {
					element = $.create("div", {
						className: contentCSSPrefix + "player-container"
					});
					adIdPrefix = cfg.adIdPrefix;
					instanceNumber = cfg.instanceNumber;
					if (cfg.relatedMode) relatedMode = cfg.relatedMode;
					if (cfg.extraPlayerParams) extraPlayerParams = cfg.extraPlayerParams;
					getPlaylistUrl = cfg.getPlaylistUrl;
					onRelatedVideoChanged = cfg.onRelatedVideoChanged;
				},

				update: function (playerType, playerParam, videoObj) {
					switch (playerType) {
						case 'embed':
							currentPlayerId = 'FiveminPlayer_lb_' + instanceNumber + '_' + Math.random();
							if (FIVEMIN.swfobject.hasFlashPlayerVersion("9.0.115")) {
								element.innerHTML = this.getHtml(currentPlayerId, playerParam);
							}
							else {
								this.injectHTML5Player(element, playerParam, videoObj);
							}
							break;
						case 'playerseed':
							element.innerHTML = '';

							playerParam += '&' + $.toQueryString(this._getFlashAdParams());
							if (onRelatedVideoChanged) playerParam += "&onRelatedVideoChanged=" + onRelatedVideoChanged;

							var ps = document.createElement("script");
							ps.setAttribute('type', 'text/javascript');
							ps.setAttribute('src', playerParam);
							element.appendChild(ps);
							break;
					}
				},

				show: function () {
					$.css(element, { display: "block" });
				},

				hide: function () {
					try {
						document.getElementById(currentPlayerId).userAccessOperation("Pause");
					} catch (e) {
					}
					try {
						FIVEMIN.swfobject.removeSWF(currentPlayerId);
					} catch (e) { }

					$.css(element, { display: "none" });
					element.innerHTML = "";

					this.hideAds();
				},

				getPlayerUrl: function (embedUrl) {
					// server gives other cbHtmlID, but i want mine.
					embedUrl = embedUrl.replace(/cbHtmlID=.*?(?:&|$)/i, "");

					// adding relatedMode bottom to all thumbSeed players.
					embedUrl += "&relatedMode=" + relatedMode;
					embedUrl += "&isRelatedThumbsWide=true";
					embedUrl += "&relatedBottomHeight=58";
					embedUrl += "&thumbsEngine=true";
					if (isFreewheel != null && isFreewheel != true) embedUrl += "&isFreeWheel=" + isFreewheel;
					embedUrl += "&bwLogger=" + FIVEMIN.BaseConfig.Logger.LogLevel;

					var adsDataForPlayer = $.toQueryString(this._getFlashAdParams());
					embedUrl += "&" + adsDataForPlayer;
					if (extraPlayerParams) embedUrl += "&" + $.toQueryString(extraPlayerParams);
					if (getPlaylistUrl) embedUrl += "&playlistUrl=" + getPlaylistUrl;
					if (onRelatedVideoChanged) embedUrl += "&relatedOnVideoChanged=" + onRelatedVideoChanged;

					var flashFullUrlParts = embedUrl.split("?");
					var flashFileUrl = flashFullUrlParts[0];
					var flashVars = flashFullUrlParts[1];

					return {
						file: flashFileUrl,
						query: flashVars
					};
				},

				getHtml: function (id, embedUrl) {
					var playerHtml;

					var components = this.getPlayerUrl(embedUrl);

					if ($.browser.name == "ie") {
						playerHtml = '<object ' +
							'id="' + id + '" width="' + playerWidth + '" height="' + playerHeight + ' "classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000">' +
							'<param name="allowfullscreen" value="true">' +
							'<param name="allowScriptAccess" value="always">' +
							'<param name="movie" value="' + components.file + '">' +
							'<param name="flashvars" value="' + components.query + '">' +
							'<param name="wmode" value="opaque">' +
						'</object>';
					}
					else {
						playerHtml = '<embed name="' + id + '" id="' + id + '" src="' + components.file + '" flashvars="' + components.query + '" type="application/x-shockwave-flash" width="' + playerWidth + '" height="' + playerHeight + '" allowfullscreen="true" allowScriptAccess="always" wmode="opaque"></embed>';
					}
					return playerHtml;
				},

				// injectHTML5Player()
				//#region
				injectHTML5Player: function (el, playerParam, fiveminVideo) {
					if (el == null || fiveminVideo == null) return;
					this.videoId = fiveminVideo.ID;
					this.sid = /&sid=([^&]*)&/.exec(fiveminVideo.EmbededURL)[1];
					var src = /&videoUrl=([^&]*)&/.exec(fiveminVideo.EmbededURL);
					if (src != null && src.length > 1) {
						src = decodeURIComponent(src[1]);

						var defaultRendition = /&defaultRendition=([^&]*)&/.exec(fiveminVideo.EmbededURL);
						var activeRenditions = /&activeRenditions=([^&]*)&/.exec(fiveminVideo.EmbededURL);

						if (defaultRendition != null && defaultRendition.length > 1) {
							defaultRendition = defaultRendition[1];
							if (iPhoneOS() && iPhoneOS() < 4) {
								defaultRendition = 1;
							}
						}

						var video = document.createElement('video');
						video.setAttribute('width', playerWidth);
						video.setAttribute('height', playerHeight);
						video.controls = true;
						video.preload = true;

						$.addEvent(video, 'ended', $.bind(this.html5VideoEnded, this));
						$.addEvent(video, 'timeupdate', $.bind(this.html5VideoUpdate, this));
						$.addEvent(video, 'error', $.bind(this.html5VideoError, this));
						$.addEvent(video, 'seeked', $.bind(this.html5VideoSeeking, this));
						$.addEvent(video, 'play', $.bind(this.html5VideoPlay, this));

						// Fix for early versions of Android that don't have their own controls
						if (navigator.userAgent.toLowerCase().search("android") > -1) {
							$.addEvent(video, 'click', function () {
								try { video.play(); } catch (e) { }
							});
						}

						this.firedVideoUpdate = 0;
						this.currentFiredVideoUpdate = -1;
						this.watchTime = 0;
						this.currentWatchTime = -1;
						this.videoViewPointReport = 0;
						el.appendChild(video);

						// Poster
						var poster = /&previewPic=([^&]*)&/.exec(fiveminVideo.EmbededURL);
						if (poster != null && poster.length > 1) {
							video.setAttribute('poster', unescape(poster[1]));
						}

						var renditions = fiveminVideo.Renditions;
						var source;
						for (var i = 0; i < renditions.length; i++) {
							source = document.createElement('source');
							//source.setAttribute('type', 'video/mp4'); // Commented out to fix bug in Android <2.3
							var urlSrc = src.substring(0, 10) + src.substring(10).replace('//', '/' + renditions[i].ID + '/');
							urlSrc = urlSrc.substr(0, urlSrc.lastIndexOf('.')) + '.' + renditions[i].RenditionType;
							source.setAttribute('src', urlSrc);
							video.appendChild(source);
						}

						src = src.substring(0, 10) + src.substring(10).replace('//', '/' + defaultRendition + '/');

						var fallback = document.createElement('p');
						fallback.innerHTML = 'HTML5 Video not supported by this browser. Please update or <a href="http://www.adobe.com/go/getflash/" target="_new">install Flash</a>.';
						video.appendChild(fallback);

						this.html5Video = video;

						this.html5VideoStartedCalled = false;

						// Fix for ridiculous iOS 3 bugs http://videojs.com/2010/09/ipad-iphone-video-poster-fix-bonus-javascript-placement-fix/
						// This allows for poster and so forth to work fine.
						if (iPhoneOS() && iPhoneOS() < 4 || iPadOS() && iPadOS() < 4) {
							video.src = src;
							video.load();
						} else if (this.autoStart == 1) {
							video.load();
						}
					} else {
						//An error has occurred.
						var error = /&messageError=([^&]*)&/.exec(fiveminVideo.EmbededURL);
						if (error != null && error.length > 1) {
							switch (error[1]) {
								case 'ErrorVideoNotExist':
									error = 'Sorry, but this video does not exist.';
									break;
								case 'ErrorVideoNoLongerAvailable':
									error = 'Sorry, but this video is no longer available.';
									break;
								case 'ErrorVideoRejected':
									error = 'Sorry, but this video is no longer available.';
									break;
								case 'ErrorVideoUserNotGeo':
									error = 'Sorry, but this video cannot be viewed in your location.';
									break;
								case 'ErrorVideoLibraryRestriction':
									error = 'Sorry, but this video is restricted from this library.';
									break;
								case 'ErrorExposurePermission':
									error = 'Sorry, but this video is currently unavailable for viewing at this domain.';
									break;
								default:
									error = 'Sorry, but an error has occurred downloading the video. Please refresh and try again.';
									break;
							}
						} else {
							error = 'Sorry, but an error has occurred downloading the video. Please refresh and try again.';
						}

						var errorMessage = document.createElement('div');
						errorMessage.innerHTML = error;
						errorMessage.setAttribute('class', 'fiveminError');
						$.css(errorMessage, {
							width: (playerWidth - 20) + 'px',
							height: (playerHeight - 20) + 'px',
							background: '#000000',
							color: 'White',
							padding: '20px'
						});

						el.appendChild(errorMessage);
					}
				},
				//#endregion

				//html5VideoPlay()
				//#region
				html5VideoPlay: function () {
					if (this.html5VideoStartedCalled == false) {
						this.html5VideoStartedCalled = true;
						this.html5VideoStarted();
					}
				},
				//#endregion

				//html5VideoError()
				//#region
				html5VideoError: function () {
				},
				//#endregion

				// html5VideoStarted()
				//#region
				html5VideoStarted: function () {

					var reportUrl = FIVEMIN.BaseConfig.urls.embed + 'handlers/Smart3Handler.ashx?func=VideoStarted&exposureType=PlayerSeed&sid=' + this.sid + '&isEmbed=true&videoID=' + this.videoId + '&referrerUrl=' + escape(location.toString());
					var cfg = {
						requestURL: reportUrl,
						jscbRequest: this.html5VideoStartedCallback,
						instanceNumber: this.counter,
						bind: this,
						priority: 1
					};

					try {
						FIVEMIN.RequestManager.addRequest(cfg);
					}
					catch (ex) {
						if (debug) { alert(ex); }
					}
				},
				//#endregion

				// html5VideoStartedCallback()
				//#region
				html5VideoStartedCallback: function (success, data) {
					if (success == 1 && data != null && data.isSuccess == true) {
						this.viewID = data.viewID;
					}
				},
				//#endregion

				// html5VideoEnded()
				//#region
				html5VideoEnded: function () {
					if (this.viewID == null || this.firedVideoUpdate == 100) return;
					var reportUrl = FIVEMIN.BaseConfig.urls.embed + 'handlers/Smart3Handler.ashx?func=VideoReachedReport&userID=0&viewID=' + this.viewID + '&percentage=100&videoID=' + this.videoId;
					FIVEMIN.RequestManager.addRequest({ requestURL: reportUrl });
					this.firedVideoUpdate = 100;
					this.html5VideoSeeking();
				},
				//#endregion

				// html5VideoEnded()
				//#region
				html5VideoSeeking: function () {
					this.currentWatchTime = -1;
					this.currentFiredVideoUpdate = -1;
				},
				//#endregion

				// html5VideoUpdate()
				//#region
				html5VideoUpdate: function () {
					var currentTime = this.html5Video.currentTime;
					var percent = Math.floor(currentTime / this.html5Video.duration * 100);

					if (currentTime < this.currentWatchTime) this.html5VideoSeeking();
					if (this.currentWatchTime > -1) this.watchTime += currentTime - this.currentWatchTime;
					this.currentWatchTime = currentTime;

					if (this.viewID == null) return;

					if (this.currentFiredVideoUpdate < percent && percent % 25 == 0) {
						this.currentFiredVideoUpdate = percent;
						this.logAddVideoView(percent);
					}

					if (this.firedVideoUpdate >= 75 || this.html5Video.currentTime == 0) return;

					if (this.firedVideoUpdate < 75 && percent >= 75) {
						this.fireVideoReachedReport(75);
						this.firedVideoUpdate = 75;
					} else {
						if (this.firedVideoUpdate < 50 && percent >= 50) {
							this.fireVideoReachedReport(50);
							this.firedVideoUpdate = 50;
						}
						else {
							if (this.firedVideoUpdate < 25 && percent >= 25) {
								this.fireVideoReachedReport(25);
								this.firedVideoUpdate = 25;
							}
						}
					}
				},
				//#endregion

				fireVideoReachedReport: function (percent) {
					var reportUrl = FIVEMIN.BaseConfig.urls.embed + 'handlers/Smart3Handler.ashx?func=VideoReachedReport&userID=0&viewID=' + this.viewID + '&percentage=' + percent + '&videoID=' + this.videoId;
					var that = this;
					$.waitUntil(function () { return that.html5VideoStartedCalled; },
						function () {
							FIVEMIN.RequestManager.addRequest({ requestURL: reportUrl });
						});
				},

				_getFlashAdParams: function () {
					var flashAdParams = {
						cbHtmlID: this._getAdElementId(adIdSuffixArr[0]), cbWidth: 300, cbHeight: 250,
						cbHtmlID1: this._getAdElementId(adIdSuffixArr[1]), cbWidth1: 300, cbHeight1: 60, /*cbFailoverUrl1: "fwscript",*/
						cbHtmlID2: this._getAdElementId(adIdSuffixArr[2]), cbWidth2: 728, cbHeight2: 90
					};

					$.extend(flashAdParams, {
						cbIsFairBalance1: true
						/*,cbFailoverUrl2: "fwscript"*/
					});

					return flashAdParams;
				},

				_getAdElementId: function (suffix) {
					return adIdPrefix + suffix;
				},

				hideAds: function () {
					for (var i = 0; i < adIdSuffixArr.length; i++) {
						var ad = document.getElementById(this._getAdElementId(adIdSuffixArr[i]));
						if (ad) ad.innerHTML = "";
					}
				},

				getElement: function () {
					return element;
				}
			};
		}

		function sharing() {
			var element,
				config = [
					{ type: "facebook", text: "Facebook" },
					{ type: "myspace", text: "Myspace" },
					{ type: "digg", text: "Digg" },
					{ type: "stumbleupon", text: "Stumbleupon" },
					{ type: "reddit", text: "Reddit" },
					{ type: "wordpress", text: "WordPress" }
				],
				links = [],
				baseURL = "http://www.addthis.com/bookmark.php?v=250&source=tbx-250&t=0&lng=he";

			return {
				init: function () {
					element = $.create("div", {
						className: cssPrefix + "sharing"
					});

					$.create("div", {
						className: cssPrefix + "sharing-title",
						innerHTML: "Share this video",
						parent: element
					});
					$.create("div", {
						className: cssPrefix + "sharing-hr",
						parent: element
					});

					var list = $.create("div", {
						className: cssPrefix + "sharing-list clearfix",
						parent: element
					});

					for (var i = 0; i < config.length; i++) {
						var a = $.create("a", {
							className: "btn_share_" + config[i].type,
							innerHTML: "<em class='" + cssPrefix + "sharing-icon'></em>" + "<span class='" + cssPrefix + "sharing-text'>" + config[i].text + "</span>",
							parent: list
						});
						a.setAttribute("href", "javascript:void(0);");

						links.push(a);
					}
				},

				update: function (cfg) {
					var url = cfg.referrerURL || cfg.pageURL;
					for (var i = 0; i < links.length; i++) {
						if (config[i]) {
							links[i].href = this.getURL(config[i].type, url, cfg.title);
							links[i].setAttribute("target", "_blank");
						}
					}
				},

				getURL: function (type, pageurl, title) {
					if (title == null) title = "Video";
					title = title.replace("'", "&#39;");

					var url = baseURL;
					url += "&s=" + type;
					url += "&url=" + pageurl;
					url += "&title=" + title;
					return url;
				},

				getElement: function () {
					return element;
				}
			};
		}

		return videoLightbox;
	} ();
}


/* ~/Scripts/Thumbseed2.js */

if (typeof (FIVEMIN.ThumbSeed) == "undefined") {
	FIVEMIN.ThumbSeed = function () {
		var $ = FIVEMIN.LIB;
		var _rndUniqID = Math.random().toString().substr(2, 8);
		var CURRENT_SCRIPT_SRC_RX = /http:\/\/(?:qa\.)?(\w?)shared\.5min\.com\/scripts\/thumbseed2?\.js\?/i;

		var CSS_PREFIX = "fmts-";

		var DEFAULT_HEADER_TEXT_COLOR = _getQueryString("fmts-headercolor", "#666666"),
		DEFAULT_DESC_TEXT_COLOR = _getQueryString("fmts-bgcolor", "#ffffff"),
		DEFAULT_DESC_BG_COLOR = _getQueryString("fmts-bgcolor", "#000000"),
		DEFAULT_DESC_LOCATION = _getQueryString("fmts-textlocation", "0"),
		DEFAULT_HT = _getQueryString("fmts-ht", "1");

		var CSS_RESETTER_CLASS = "fmtsw";
		var CSS_RESETTER_ID = "fmtsw";

		var lightbox,
			lightboxCreationNotAddedToDom = true;

		var DEBUG = false;

		switch (_getQueryString("fmts-test")) {
			case "netcraft":
			case "localhost":
			case "5minlocal":
				DEBUG = true;
				break;
		}

		function getHead() {
			return $.getElement("head") || $.document.body || $.document.documentElement;
		}

		var styleTag = function () {
			var element, initCalled = false;

			function init() {
				if ($.browser.name == "ie") {
					element = document.createStyleSheet();
				}
				else {
					element = document.createElement("style");
					element.type = 'text/css';
					getHead().appendChild(element);
				}
				initCalled = true;
			}

			return {
				addRule: function (selector, rule) {
					if (initCalled == false) init();
					if ($.browser.name == "ie") {
						if (selector.indexOf(",") > -1) {
							var selectors = selector.split(",");
							for (var c = 0; c < selectors.length; c++) {
								element.addRule(selectors[c], rule);
							}
						}
						else element.addRule(selector, rule);
					}
					else {
						var styleString = selector + "{" + rule + "}";
						element.appendChild(document.createTextNode(styleString));
					}
				},

				clear: function () {
					element.innerHTML = "";
				}
			};
		} ();

		function ThumbSeed(wrapper, initiatorScriptTag) {
			this.wrapper = (typeof wrapper == "string") ? $.getById(wrapper) : wrapper;
			this.initiatorScriptTag = initiatorScriptTag;
			this.instanceNumber = ThumbSeed._instances.length;
			ThumbSeed._instances.push(this);
		}

		var cssAdded = false,
		cssRequested = false,
		cssAddedCallbacks = [];
		// static
		$.extend(ThumbSeed, {
			_instances: [],
			getTopMostWindow: function () {
				var currP = window;
				while (currP) {
					try {
						var newP = currP.parent;
						// try to reach the document, if didn't succeed - goes to catch {}
						var doc = newP.document;
						if (!doc) break;
						// reached the top
						// newP is ok. use it.
						currP = newP;
						if (newP == newP.parent) break;

					} catch (ex) {
						break;
					}
				}
				ThumbSeed.getTopMostWindow = function () { return currP; };
				return currP;
			},
			addCssFile: function (callback) {
				if (cssAdded) { // css already added - free to call the callback
					callback();
					return;
				}

				cssAddedCallbacks.push(callback);

				if (!cssRequested) {
					cssRequested = true;
					$.jsonp(FIVEMIN.BaseConfig.urls.shared + "Scripts/ThumbSeed2.Style.js", null, { preventCache: false });
				}

				return;
			},
			putThumbSeedCss: function (resetCss, thumbSeedCss) {
				var css = [resetCss];
				if (!this.customCss) { css.push(thumbSeedCss); }
				this.putCss(css.join(" "));
			},
			putCss: function (css) {
				this.putCssOnDocument($.document, css);
				var win = ThumbSeed.getTopMostWindow();
				if (win != window) {
					this.putCssOnDocument(ThumbSeed.getTopMostWindow().document, css);
				}

				cssAdded = true;
				if (DEBUG) { $.log("_cssAdded=true " + $.timer.getStatus()); }

				setTimeout(function () {
					$.each(cssAddedCallbacks, function (fn) {
						fn();
					});
				}, 50);
			},
			putCssOnDocument: function (doc, css) {
				$.setDocument(doc);
				if (DEBUG) { $.log("putCssOnDocument " + $.timer.getStatus()); }
				if ($.browser.name == "ie") {
					var div = $.create("div", { innerHTML: '<span>DumbIE</span><style type="text/css">' + css + '</style>' });

					var styleContainer = getHead(doc);
					styleContainer.appendChild(div.lastChild);
				}
				else {
					$.create("style", {
						type: "text/css",
						parent: getHead(),
						textContent: css
					});
				}
				$.restoreDocument();
			}
		});

		// instance
		$.extend(ThumbSeed.prototype, {

			load: function () {
				var scope = this;
				if (DEBUG) { $.log("ThumbSeed#load", this); }
				this.setStyleProperties();

				this.innerWrapper = $.create("div", {
					className: CSS_PREFIX + "wrapper clearfix",
					id: CSS_PREFIX + "wrapper-" + this.instanceNumber
				});
				$.addCls(this.innerWrapper, CSS_PREFIX + $.browser.name);
				if (document.compatMode == "BackCompat") {
					$.addCls(this.innerWrapper, CSS_PREFIX + "quirksmode");
				}
				if (DEBUG) { $.log("created innerWrapper", this.innerWrapper); }

				var createInnerWrapper = function () {
					scope.wrapper.appendChild(scope.innerWrapper);
					scope._drawn = false;
					if (scope.fallback) {
						scope.showLoadIndicator();
					}
					scope.requestData();

					if (ThumbSeed.loadedMainStyle == true) {
						cssAdded = true;
						if (DEBUG) { $.log("###loadedMainStyle = true"); }
					}
					else {
						if (DEBUG) { $.log("###loadedMainStyle = false"); }
						ThumbSeed.addCssFile($.bind(function () {
							scope.showContent();
						}, scope));
					}
				};

				if ($.browser.name == "ie") {
					if (this.initiatorScriptTag != null && $.isDecendant(this.initiatorScriptTag, this.wrapper)) {
						// ThumbSeed initiated from within the wrapper and therefore will crash browser
						if (DEBUG) { $.log("Script tag is within the wrapper . Continuing after dom ready."); }
						$.addDomReady(createInnerWrapper);
					}
					else {
						$.log("Script tag is not the wrapper.");
						createInnerWrapper();
					}
				}
				else {
					createInnerWrapper();
				}
			},

			requestData: function () {
				if (!this.url) {
					this.url = location.href;

					var win = ThumbSeed.getTopMostWindow();

					this.url = win.location.href;
				}

				var cfg = {
					requestURL: FIVEMIN.BaseConfig.urls.syn +
							"handlers/SenseHandler.ashx?func=GetResults" +
							"&sid=" + this.sid +
							this.getParamsForHandler() +
							'&url=' + encodeURIComponent(this.url) +
							'&isnewts=true',
					jscbRequest: this.onHandlerResponse,
					instanceNumber: this.instanceNumber,
					parentEls: [this.wrapper],
					bind: this
				};

				if ((this.sid.toString() == '954' || this.sid.toString() == '670') && this.url.indexOf('?') > 0) {
					cfg.requestURL = FIVEMIN.BaseConfig.urls.syn +
							"handlers/SenseHandler.ashx?func=GetResults" +
							"&sid=" + this.sid +
							this.getParamsForHandler() +
							'&url=' + encodeURIComponent(this.url.substring(0, this.url.indexOf('?'))) +
							'&isnewts=true';
				}

				// Hard coded life123 exception
				if (location.href.indexOf("life123.com") !== -1) {
					var specificEl = document.getElementById("fivemin");
					cfg.parentEls.push(specificEl);
				}
				//

				try {
					FIVEMIN.ResultsManager.sendRequest(cfg);
					this.logAddRequest();
					this.logUrl();
				}
				catch (ex) {
					if (DEBUG) { alert(ex); }
				}

				if (DEBUG) { $.log("requesting data"); }
			},
			
			logUrl: function() {
				var params = {
					sid: this.sid,
					sKey: '',
					proTy: 1,
					h: $.md5(this.url),
					hl: $.md5(this.url.toLowerCase()),
					f: this.url
				};

				FIVEMIN.Logger.Log('ThumbSeed', params, 'AddUrl');
			},

			onHandlerResponse: function (success, data) {
				if (data) this.serverData = this._normalizeServerData(data);
				this.logAddResult(success, data);
				if (DEBUG) { $.log("received data", "success=" + success); }
				if (success != 1 || data.success == false) {
					this.hideLoadIndicator();
					return;
				}

				if (DEBUG) { $.log("data=", data); }

				if (data && data.binding) {
					this.videos = data.binding;
					this.draw(); // ui already drawn, draw just videos

					if (lightboxCreationNotAddedToDom && typeof this.directURL == "undefined" && typeof lightbox == "undefined") {
						if ($.browser.name == "ie") {
							if (DEBUG) { $.log("adding lightbox creation to dom ready"); }
							var scope = this;
							$.addDomReady(function () {
								scope.createLightBox();
							});
							lightboxCreationNotAddedToDom = false;
						}
						else {
							this.createLightBox();
						}
					}
				}
			},

			createLightBox: function () {
				if (DEBUG) { $.log("creating lightbox"); }

				var lightboxOptions = {
					playerWidth: 625,
					playerHeight: 440,
					isFreewheel: this.isFreeWheel
				};
				var self = this;

				var extraParams = {
					jsLogData: "ThumbSeed._instances[" + this.instanceNumber + "].logFlashData"
				};

				var fwKeyValues = '';
				if (this.aol_level != null) {
					fwKeyValues += '%2caol_level_parameter%3D' + this.aol_level;
				}

				if (this.sponsorship != null) {
					fwKeyValues += '%2csponsorship%3D' + this.sponsorship;
				}

				if (fwKeyValues.length > 0 && fwKeyValues.substr(0, 3) == '%2c') {
					fwKeyValues = fwKeyValues.substr(3);
				}

				if (fwKeyValues != null && fwKeyValues.length > 0) extraParams.fwKeyValues = +fwKeyValues;
				if (this.siteSection != null && this.siteSection != '') extraParams.fwSiteSection = this.siteSection;

				var lightboxInit = {
					"lightboxAnim": this.serverData.lightboxAnim
					, "overlayOpacity": this.serverData.overlayOpacity || "0.7"
					, "overlayColor": this.serverData.overlayColor || "#222"
					, "show5minLink": this.serverData.by5minLink
					, "show5minText": this.serverData.by5minText
					, "relatedMode": 2
					, "getPlaylistUrl": this.getPlayListURL()
					, extraPlayerParams: extraParams
					, logAddVideoView: function (percent) {
						self.logAddVideoView(percent);
					}
				};
				if (this.serverData.vcdLogoUrl != "") lightboxInit.extraPlayerParams.vcdLogoUrl = this.serverData.vcdLogoUrl;
				if (this.serverData.vcdLogoClickUrl != "") lightboxInit.extraPlayerParams.vcdLogoClickUrl = this.serverData.vcdLogoClickUrl;
				if (DEBUG) { $.log("lightbox create"); }
				lightbox = new FIVEMIN.VideoLightbox(lightboxOptions);
				lightbox.init(lightboxInit, this.instanceNumber);

				if (DEBUG) { $.log("lightbox created"); }
			},

			logAddVideoView: function (percent) {
				var params = this.logFlashData();
				params.sessView = 0;
				params.vvpr = this.videoViewPointReport;
				params.tss = Math.floor(this.watchTime);
				params.tsp = percent;
				if (this.html5debug == true) {
					var p = document.createElement('p');
					p.innerHTML = FIVEMIN.BaseConfig.Logger.LogServer + '/TSVV?' + $.toQueryString(params);
					document.getElementById(this.divLayer).appendChild(p);
				}
				FIVEMIN.Logger.Log('ThumbSeed', params, 'AddVideoView');
				this.videoViewPointReport++;
			},

			onRelatedVideoChanged: function (cfg) {
				if (typeof lightbox != "undefined") {
					lightbox.setTitle(cfg.title);
					lightbox.updateSharingLinks(cfg.title, cfg.pageUrl);
				}
			},

			showBottomAd: function () {
				if (typeof lightbox != "undefined") {
					lightbox.showBottomAd();
				}
			},

			getPlayListURL: function () {
				var arr = [];

				var convertDuration = function (durationString) {
					var minutes = parseInt(durationString.split(":")[0], 10);
					var seconds = parseInt(durationString.split(":")[1], 10);
					var newDuration = minutes * 60 + seconds;

					return newDuration;
				};

				var duplicateObject = function (sourceObject) {
					var newObject = {};
					for (key in sourceObject) {
						newObject[key] = sourceObject[key];
					}
					return newObject;
				};

				for (var i = 0; i < this.videos.length; i++) {
					arr.push(duplicateObject(this.videos[i]));
					arr[i].Duration = convertDuration(arr[i].Duration);
					arr[i].Image = this.createCustomThumbnail(arr[i].ThumbURL, 148, 111);
				}

				return arr;
			},

			/**
			* Create a custom thumbnail URL
			* <p>Receives a URL string like this: http://pthumbnails.5min.com/5680806/284040271_3.jpg
			* and returns a new URL with the new width and height based on the 5min SYN API, like
			* so: http://pthumbnails.5min.com/5091466/254573271_4_160_76.jpg
			* (where newWidth = 160, newHeight = 76).</p>
			*
			* @param {string} originalUrl Original URL of the thumbnail to be processed
			* @param {int|string} newWidth Width in pixels for the new thumbnail
			* @param {int|string} newHeight Height in pixels for the new thumbnail
			*/
			createCustomThumbnail: function (originalUrl, newWidth, newHeight) {
				var newSuffix = '_' + newWidth;
				if (newHeight != 'undefined') newSuffix += '_' + newHeight;
				newSuffix += '.jpg';
				return originalUrl.replace(/(\.jpg)/i, newSuffix);
			},

			setStyleProperties: function () {
				if (this.layout) {
					this.convertLayout();
					this.convertColors();
				}

				if (this.serverData != null) {
					switch (this.thumbnailSize.toString()) {
						case "0":
							this.playButtonImg = this.playButtonImg ? this.playButtonImg : this.serverData.playButtonImg;
							this.playButtonImg_MO = this.playButtonImg_MO ? this.playButtonImg_MO : this.serverData.playButtonImg_MO;
							break;
						case "1":
						case "2":
							this.playButtonImg = this.SmallPlayButton ? this.SmallPlayButton : this.serverData.SmallPlayButton;
							this.playButtonImg_MO = this.SmallPlayButtonMouseOver ? this.SmallPlayButtonMouseOver : this.serverData.SmallPlayButtonMouseOver;
							break;
					}
					if (this.playButtonImg != null && this.playButtonImg != "") {
						var imagePrefetch = new Image();
						imagePrefetch.src = this.playButtonImg;
					}

					if (this.playButtonImg_MO != null && this.playButtonImg_MO != "") {
						var imagePrefetch2 = new Image();
						imagePrefetch2.src = this.playButtonImg_MO;
					}

					if (this.headerTextColor == null && this.serverData.headerTitleColor) this.headerTextColor = this.serverData.headerTitleColor;
					if (this.headerBorderColor == null && this.serverData.headerBorderColor) this.headerBorderColor = this.serverData.headerBorderColor;
					if (this.headerTitleFont == null && this.serverData.headerTitleFont) this.headerTitleFont = this.serverData.headerTitleFont;
					if (this.textFGColor == null && this.serverData.textFGColor) this.textFGColor = this.serverData.textFGColor;
					if (this.textFGColor_MO == null && this.serverData.textFGColor_MO) this.textFGColor_MO = this.serverData.textFGColor_MO;
					if (this.textBGColor == null && this.serverData.textBGColor) this.textBGColor = this.serverData.textBGColor;
					if (this.textBGColor_MO == null && this.serverData.textBGColor_MO) this.textBGColor_MO = this.serverData.textBGColor_MO;
					if (this.thumbnailTitleFont == null && this.serverData.thumbnailTitleFont) this.thumbnailTitleFont = this.serverData.thumbnailTitleFont;

					this.headerTextColor = this.headerTextColor ? this.headerTextColor.toLowerCase() : DEFAULT_HEADER_TEXT_COLOR;
					this.headerBorderColor = this.headerBorderColor ? this.headerBorderColor.toLowerCase() : this.headerTextColor;
					this.textFGColor = this.textFGColor ? this.textFGColor.toLowerCase() : DEFAULT_DESC_TEXT_COLOR;
					this.textFGColor_MO = this.textFGColor_MO ? this.textFGColor_MO.toLowerCase() : DEFAULT_DESC_TEXT_COLOR;
					this.textBGColor = this.textBGColor ? this.textBGColor.toLowerCase() : DEFAULT_DESC_BG_COLOR;
					this.textBGColor_MO = this.textBGColor_MO ? this.textBGColor_MO.toLowerCase() : DEFAULT_DESC_BG_COLOR;

					this.headerTextColor = this.convertToHex(this.headerTextColor);
					this.headerBorderColor = this.convertToHex(this.headerBorderColor);
					this.textFGColor = this.convertToHex(this.textFGColor);
					this.textFGColor_MO = this.convertToHex(this.textFGColor_MO);
					this.textBGColor = this.convertToHex(this.textBGColor);
					this.textBGColor_MO = this.convertToHex(this.textBGColor_MO);

					this.textLocation = this.textLocation ? this.textLocation : DEFAULT_DESC_LOCATION;
				}
			},

			convertLayout: function () {
				this.layout = this.layout.toLowerCase();
				var size = this.layout.split("x");
				this.width = size[0];
				this.height = size[1];

				this.thumbnailSize = 2; // small 

				if (this.layout == "300x250" ||
					this.layout == "250x250" ||
					this.layout == "728x90" ||
					this.layout == "590x96" ||
					this.layout == "575x100" ||
					this.layout == "468x60" ||
					this.layout == "205x335") {
					this.textLocation = 0; // side
				}
				else {
					this.textLocation = 1; // bottom
				}

				if (this.layout == "300x250" ||
					this.layout == "250x250" ||
					this.layout == "700x180" ||
					this.layout == "468x200" ||
					this.layout == "160x600" ||
					this.layout == "500x175" ||
					this.layout == "425x400" ||
					this.layout == "120x120") {
					this.thumbnailSize = 1; // medium
				}
				else if (this.layout == "468x544") {
					this.thumbnailSize = 0; // Big
				}
				else {
					this.thumbnailSize = 2; // small 
				}

				// For redraw purposes
				this.BW_layout = this.layout;
				this.layout = null;
			},

			convertColors: function () {
				if (this.backgroundColor) {
					this.backgroundColor = this.backgroundColor.toLowerCase();
				}
				else if (this.backGroundColor) {
					this.backgroundColor = this.backGroundColor.toLowerCase();
				}
				else {
					this.backgroundColor = "white";
				}

				if (this.headerColor) {
					this.headerColor = this.headerColor.toLowerCase();
				}

				// BG = black
				if (this.backgroundColor === "black") {
					this.headerTextColor = (!this.headerColor || this.headerColor === "black") ? "#656565" : this.headerColor;
					this.textFGColor = "#ffffff";
					this.textBGColor = (!this.headerColor) ? "#000000" : this.headerColor;
					this.textFGColor_MO = "#ffffff";
					this.textBGColor_MO = (!this.headerColor || this.headerColor === "black") ? "#656565" : "#000000";
				}
				// BG = grey / white
				else if (this.backgroundColor === "grey" || this.backgroundColor === "gray") {
					this.headerTextColor = (!this.headerColor || this.headerColor === "black") ? "#656565" : this.headerColor;
					this.textFGColor = (!this.headerColor) ? "#000000" : this.headerColor;
					this.textBGColor = "#ffffff";
					this.textFGColor_MO = "#ffffff";
					this.textBGColor_MO = (!this.headerColor) ? "#000000" : this.headerColor;
				}
				// BG = white
				else {
					this.headerTextColor = (!this.headerColor || this.headerColor === "black" || this.headerColor === "white") ? "#656565" : this.headerColor;
					this.textFGColor = (!this.headerColor || this.headerColor === "white") ? "#000000" : this.headerColor;
					this.textBGColor = "#ffffff";
					this.textFGColor_MO = "#ffffff";
					this.textBGColor_MO = (!this.headerColor || this.headerColor === "white") ? "#000000" : this.headerColor;
				}
			},

			convertToHex: function (color) {
				color = color.toLowerCase();

				switch (color) {
					case "blue":
						color = "#006699";
						break;
					case "grey":
						color = "#656565";
						break;
					case "green":
						color = "#2e7720";
						break;
					case "orange":
						color = "#ff6600";
						break;
					case "red":
						color = "#cc0000";
						break;
					case "purple":
						color = "#592e7b";
						break;
					case "light blue":
						color = "#79b0cb";
						break;
				}
				return color;
			},

			convertEnum: function (value, type) {
				var convertedValue = null;

				switch (type) {
					case "ht":
						switch (value) {
							case 0:
							case "0":
								convertedValue = "_self";
								break;
							case 1:
							case "1":
								convertedValue = "_blank";
								break;
						}
						break;
				}

				return convertedValue;
			},

			showContent: function () {
				if (DEBUG) {
					$.log("showContent " + $.timer.getStatus());
					$.log("_cssAdded=" + cssAdded + " drawn=" + this._drawn);
				}
				if (cssAdded && this._drawn) {
					this.hideLoadIndicator();
				}
			},

			showLoadIndicator: function () {
				$.css(this.innerWrapper, {
					width: this.width + "px",
					height: this.height + "px",
					background: "url(" + FIVEMIN.BaseConfig.urls.shared + "Graphics/Thumbseed/preloader_big.gif) no-repeat center"
				});
				if (this.container) {
					$.css(this.container, { visibility: "hidden" });
				}
				if (this.ad) {
					$.css(this.ad, { visibility: "hidden" });
				}
				$.css(this.wrapper, { display: "block" }); // In case it's "none" from the host site settings or else the flashproxy won't work
			},

			hideLoadIndicator: function () {
				$.css(this.innerWrapper, {
					width: "",
					height: "",
					background: ""
				});
				if (this.container) {
					$.css(this.container, { visibility: "visible" });
				}
				if (this.ad) {
					$.css(this.ad, { visibility: "visible" });
				}
			},

			getParamsForHandler: function () {
				var params = {};

				if (this.categories && this.categories.length > 0) { params.categories = this.categories; }
				if (this.playList && this.playList.length > 0) {
					params.playlist = this.playList;
					if (this.shuffle == true) {
						var playlist = params.playlist.split(",");
						playlist = $.randomizeArray(playlist);
						params.playlist = playlist.join(",");
					}
				}
				if (this.featured && this.featured == true) { params.featured = true; }

				if (this.explicitTags) { params.explicitTags = this.explicitTags; }

				if (this.fallback) { params.fallback = this.fallback; }
				if (this.fallbackType) { params.fallbackType = this.fallbackType; }

				if (this.contentQuality && this.contentQuality > 0) { params.ContentQuality = this.contentQuality; }

				if (this.libraryID > 0) { params.libraryID = this.libraryID; }

				if (this.textLocation) { params.textLocation = this.textLocation; }
				if (this.thumbnailSize) { params.thumbnailSize = this.thumbnailSize; }

				if (this.videoGroupID) { params.videoGroupID = this.videoGroupID; }

				if (this.testData) { params.testData = this.testData; }
				if (this.trackingText) { params.trackingText = this.trackingText; }

				this.setAdUnitLocation();
				if (this.adUnit) {
					params.adUnit = this.adUnit;
					params.adUnitWidth = this.adUnitWidth;
					params.adUnitHeight = this.adUnitHeight;
					params.adUnitLocation = this.adUnitLocation;
				}

				params.width = this.width;
				params.height = this.height;

				this.dimensionSettings = this._getLayoutSettings();
				if (this.dimensionSettings.numOfThumbs > 0) { params.NumOfThumbs = this.dimensionSettings.numOfThumbs; }
				params.NumOfColumnsAsked = this.dimensionSettings.videoColCount;
				params.NumOfRowsAsked = this.dimensionSettings.videoRowCount;

				if (this.playButtonImg) { params.playButtonImg = this.playButtonImg; }

				//params.Playerdebug5min = 24;

				var paramsString = "&" + $.toQueryString(params);

				return paramsString;
			},

			/* draw */
			draw: function () {
				if (this._drawn || !this.videos) { return; }
				$.timer.start();
				this.setStyleProperties();
				if (DEBUG) { $.log("draw started " + $.timer.getStatus()); }
				$.css(this.wrapper, { display: "block" }); // In case it's "none" from the host site settings

				if (this.wrapperToShow) {

					this.wrapperToShowToDisplay = this.wrapperToShow.split(',');

					for (var i = 0; i < this.wrapperToShowToDisplay.length; i++) { $.css($.getById(this.wrapperToShowToDisplay[i]), { display: "block" }); }


				}

				this.container = $.create("div", {
					id: CSS_RESETTER_ID,
					className: CSS_RESETTER_CLASS + " " + CSS_PREFIX + "c",
					styles: {
						visibility: "hidden"
					}
				});

				var headerEl = null;
				if (this.serverData.showHeaderFooter) {
					headerEl = this.drawHeader();
					this.setHeader(this.headerTextColor, this.headerTitleFont, this.headerBorderColor);
				}

				this.videoContainer = $.create("div", {
					parent: this.container,
					className: CSS_PREFIX + "vc"
				});

				this.videosList = $.create("ul", {
					parent: this.videoContainer,
					className: CSS_PREFIX + "vl clearfix"
				});

				this.innerWrapper.appendChild(this.container);

				$.addCls(this.container, CSS_PREFIX + "loading");

				var fiveMinEls = null;
				if (this.serverData.showHeaderFooter) {
					fiveMinEls = this.draw5minElements();

					if (this.dimensionSettings.tsWidth >= 300) {
						headerEl.appendChild(fiveMinEls);
						$.css(headerEl, { paddingRight: "92px" });
					}
					else {
						var footerEl = this.drawFooter();
						footerEl.appendChild(fiveMinEls);
					}
				}

				this.drawAd();

				this.setTextLocation(this.textLocation);

				if (DEBUG) { $.log("drawVideos " + $.timer.getStatus()); }
				this.drawVideos(this.dimensionSettings);

				if (DEBUG) { $.log("drawCarouselNav " + $.timer.getStatus()); }

				if (this.serverData.showHeaderFooter && this.dimensionSettings.carouselColCount > 1) {
					var carouselButtons = this.drawCarouselNav(fiveMinEls);
					this.carousel = new Carousel();

					this.carousel.init({
						videos: this.videoObjects,
						parent: this.videoContainer,
						listEl: this.videosList,
						listHeight: this.dimensionSettings.overallHeight,
						moveBy: this.dimensionSettings.carouselColWidth,
						itemCount: this.dimensionSettings.carouselColCount,
						videosInColCount: this.dimensionSettings.videosInColCount,
						numOfVideosLoaded: this.dimensionSettings.numOfVideosLoaded,
						previousButton: carouselButtons.previousButton,
						nextButton: carouselButtons.nextButton,
						duration: 600
					});
				}
				else {
					$.css(this.videoContainer, { height: this.dimensionSettings.overallHeight + "px" });
				}

				this._drawn = true;
				this.showContent();
				if (DEBUG) { $.log("draw complete" + $.timer.getStatus()); }

				this.logAddVideoResults();
				this.logAddImpression();
			},

			redraw: function (newParams) {
				// Not a single line of code in this file uses this function :(
				$.extend(this, newParams);
				if (DEBUG) {
					for (key in newParams) {
						$.log("newParam[" + key + "]=" + newParams[key]);
					}

				}

				this.setStyleProperties();
				this.showLoadIndicator();

				this.destroy();

				this.setAdUnitLocation();
				this.dimensionSettings = this._getLayoutSettings();
				this._drawn = false;

				this.draw();
			},

			destroy: function () {
				if (this.carousel) {
					this.carousel.destroy();
					this.carousel = null;
				}
				if (this.videoObjects) {
					for (var i = 0; i < this.videoObjects.length; i++) {
						this.videoObjects[i].destroy();
						this.videoObjects[i] = null;
					}
				}

				this.innerWrapper.innerHTML = "";

				this.container = this.footer = this.header = this.fiveMinElements = this.titleElement = this.videoContainer = this.videoList = this.videoObjects = this.ad = null;

			},

			_normalizeServerData: function (data) {
				var returnData = data;
				returnData.showHeaderFooter = (typeof data.showHeaderFooter != "undefined") ? data.showHeaderFooter : true;
				returnData.by5minLink = (typeof data.by5minLink != "undefined") ? data.by5minLink : true;
				returnData.by5minText = (typeof data.by5minText != "undefined") ? data.by5minText : true;
				returnData.overlayOpacity = (data.lightBoxOpac) ? data.lightBoxOpac : 0.7;
				returnData.overlayColor = (data.lightBoxBGColor) ? data.lightBoxBGColor : "black";
				// Why here? Because it used to come from the script but now it's from the server
				if (typeof this.displayHeader != "undefined") {
					returnData.showHeaderFooter = this.displayHeader;
				}
				return returnData;
			},

			_getLayoutSettings: function () {
				var settings = {},
					videoItemHorizontalSpace = 5,
					videoItemVerticalSpace = 11,
					footerHeight = 21;

				settings.initialVideoSize = this._getItemRelevantSize();
				settings.isTextVertical = (this.textLocation == 1); // Meaning the text is on the side of the thumbnail and should be included in the video item width calculation
				settings.numOfThumbs = (this.videoCount) ? this.videoCount : -1;
				settings.tsWidth = this._getTSWidth(this.width, this.BW_layout, settings.numOfThumbs);
				// Get carouselColWidth, addToLast, textWidth/spaceWidth get new value
				$.extend(settings, this._getAdditionalLayoutSettings(settings.initialVideoSize, settings.tsWidth, videoItemHorizontalSpace, settings.isTextVertical, settings.numOfThumbs));

				var containerHeight = this._getActualContainerHeight(settings.tsWidth, footerHeight);
				settings.videoRowCount = this._getVideoRowCount(settings.initialVideoSize, containerHeight, videoItemVerticalSpace, settings.isTextVertical);

				settings.videosInColCount = settings.videoRowCount * settings.videoColCount;

				var numOfRows = this._getNumOfRows(settings.videoColCount, settings.numOfThumbs);
				settings.overallHeight = this._getOverallHeight(settings.initialVideoSize, settings.videoRowCount, numOfRows, videoItemVerticalSpace, settings.isTextVertical, numOfRows);

				return settings;
			},

			_getActualContainerHeight: function (tsWidth, footerHeight) {
				var containerHeight = parseInt(this.height, 10);
				var hasFooter = (tsWidth < 300);
				if (hasFooter) {
					containerHeight = containerHeight - footerHeight;
				}
				return containerHeight;
			},

			_getTSWidth: function (initialWidth, bwLayout, numOfThumbs) {
				var tsWidth = parseInt(initialWidth, 10);
				initialWidth = tsWidth;

				if (numOfThumbs > 0 && typeof bwLayout != "undefined") {
					tsWidth = this._BW_resizeByItemCount(initialWidth);
					if (isNaN(tsWidth)) { tsWidth = initialWidth; }

					if (this.BW_layout == "728x90" ||
						this.BW_layout == "590x96" ||
						this.BW_layout == "575x100" ||
						this.BW_layout == "468x60") {
						tsWidth += 60;
					}
					if (this.BW_layout == "728x90") {
						tsWidth += 8;
					}
					else if (this.BW_layout == "590x96") {
						tsWidth += 5;
					}
					else if (this.BW_layout == "575x100") {
						tsWidth += 23;
					}
					else if (this.BW_layout == "500x175") {
						tsWidth += -4;
					}
					else if (this.BW_layout == "205x335") {
						tsWidth = 205;
					}
					else if (this.BW_layout == "120x120") {
						tsWidth = 120;
					}
					else if (this.BW_layout == "300x250" ||
							 this.BW_layout == "250x250") {
						tsWidth = initialWidth;
					}
				}
				return tsWidth;
			},

			_getNumOfRows: function (videoColCount, numOfThumbs) {
				if (numOfThumbs == -1) { return numOfThumbs; }
				var numOfRows = numOfThumbs / videoColCount;
				numOfRows = Math.ceil(numOfRows);
				return numOfRows;
			},

			// returns the num of videos that fit in a certain width
			_getAdditionalLayoutSettings: function (videoSize, containerWidth, spaceWidth, isTextVertical, numOfThumbs) {
				var cfg = {};
				var summedWidth;
				cfg.videoColCount = 0;
				cfg.spaceWidth = spaceWidth;
				var videoWidth = (isTextVertical) ? videoSize.width : videoSize.width + videoSize.textWidth;

				// Find the max number of videos that fit the container width
				do {
					cfg.videoColCount++;
					summedWidth = cfg.videoColCount * videoWidth + (cfg.videoColCount - 1) * spaceWidth;
					if (!(summedWidth < containerWidth)) {
						cfg.videoColCount--;
					}
				}
				while (summedWidth < containerWidth && (cfg.videoColCount < numOfThumbs || numOfThumbs == -1));
				summedWidth = cfg.videoColCount * videoWidth + (cfg.videoColCount - 1) * spaceWidth;

				if (cfg.videoColCount > 1) {
					var addition;
					if (isTextVertical) {
						// Spread the space evenly amongst the spaces between videos
						addition = (containerWidth - summedWidth) / (cfg.videoColCount - 1);
						addition = parseInt(addition, 10);
						cfg.spaceWidth = cfg.spaceWidth + addition;
						cfg.addToLast = (containerWidth - summedWidth) % (cfg.videoColCount - 1);
					}
					else if (!isTextVertical) {
						// Spread the space evenly amongst the text width
						addition = (containerWidth - summedWidth) / (cfg.videoColCount);
						addition = parseInt(addition, 10);
						cfg.textWidth = videoSize.textWidth + addition;
						cfg.addToLast = (containerWidth - summedWidth) % (cfg.videoColCount);
					}
					cfg.carouselColWidth = containerWidth + cfg.spaceWidth;
				}
				else {
					cfg.videoColCount = 1; // If it's 0 (meaning there isn't enough width even for even 1 column) then change it to 1 - VERY IMPORTANT
					cfg.addToLast = 0;

					if (containerWidth < videoWidth) { // Meaning the thumbnail will get "cut" because the container is not as wide
						if (!isTextVertical) {
							cfg.textWidth = videoSize.textWidth;
						}
						cfg.carouselColWidth = videoWidth + cfg.spaceWidth;
					}
					else { // Meaning the textWidth / spaceWidth have to be stretched to the container width
						if (!isTextVertical) {
							cfg.textWidth = containerWidth - videoSize.width;
						}
						cfg.carouselColWidth = containerWidth + cfg.spaceWidth;
					}
				}

				return cfg;
			},

			// returns the num of rows of videos that fit in a certain height
			_getVideoRowCount: function (videoSize, containerHeight, spaceHeight, isTextVertical) {
				var rowCount = 0;
				do {
					rowCount++;
					var videoHeight = (isTextVertical) ? videoSize.height + videoSize.textHeight : videoSize.height;
					var summedHeight = spaceHeight + (videoHeight + spaceHeight) * rowCount;
				}
				while (summedHeight < containerHeight);

				// Last "good index" is rowCount - 1 but if it's 0 (meaning there isn't enough height even for even 1 row) then leave it 1 - VERY IMPORTANT
				if (rowCount > 1) {
					rowCount = rowCount - 1;
				}

				return rowCount;
			},

			_getOverallHeight: function (videoSize, numOfRows, rowCount, spaceHeight, isTextVertical) {
				rowCount = (rowCount > 0 && rowCount < numOfRows) ? rowCount : numOfRows;
				var height = rowCount * (videoSize.height + spaceHeight);
				height = (isTextVertical) ? height + rowCount * (videoSize.textHeight) : height;
				return height;
			},

			// returns item width/height depends on the container orientation
			_getItemRelevantSize: function () {
				var size = {};
				switch (this.thumbnailSize) {
					case 0:
					case "0":
						size.width = 148;
						size.height = 111;
						size.textWidth = 152;
						size.textHeight = 48;
						break;
					case 1:
					case "1":
						size.width = 109;
						size.height = 81;
						size.textWidth = 91;
						size.textHeight = 48;
						break;
					case 2:
					case "2":
						size.width = 84;
						size.height = 63;
						size.textWidth = 89;
						size.textHeight = 48;
						break;
				}

				return size;
			},

			_BW_getVideoCount: function () {

				var max = this._BW_getMaximumVideoCountForLayout();

				if (this.videos) {
					if (this.videoCount && this.videoCount > 0) { return Math.min(this.videoCount, this.videos.length, max); }
					return Math.min(this.videos.length, max);
				}

				var count = !this.videoCount || this.videoCount > max ? max : this.videoCount;
				var possible = this._BW_getPossibleVideoCountsForLayout();
				if (possible && $.indexOf(possible, count) == -1) { count = max; }

				return count;
			},

			_BW_getMaximumVideoCountForLayout: function () {
				// maximum videos
				var videoCount;
				switch (this.BW_layout) {
					case "160x600":
					case "700x180":
						videoCount = 5;
						break;
					case "728x90":
					case "205x335":
					case "500x175":
						videoCount = 4;
						break;
					case "590x96":
					case "575x100":
						videoCount = 3;
						break;
					case "468x60":
					case "250x250":
					case "300x250":
						videoCount = 2;
						break;
					case "120x120":
						videoCount = 1;
						break;
					case "425x400":
						videoCount = 9;
						break;
					default:
						videoCount = 5;
						break;
				}
				return videoCount;
			},

			_BW_resizeByItemCount: function (tsWidth) {
				var maximumVideoCount = this._BW_getMaximumVideoCountForLayout(), // current width/height from css determined according to the max items
				videoCount = this._BW_getVideoCount(); // current width/height from css determined according to the max items

				var size = this._BW_getItemRelevantSize();

				if (DEBUG) $.log("_BW_getItemRelevantSize = ", size);
				if (size) {
					var style = {};

					var currentSize = parseInt(tsWidth, 10);

					// special treatment for multiline
					if (this.BW_layout == "425x400") {
						maximumVideoCount = 3; // maximum number of lines
						videoCount = Math.ceil(videoCount / 3); // actual number of lines
					}

					style[size.property] = currentSize - (size[size.property] * (maximumVideoCount - videoCount)); // substract width/height by number of current items missing from default size
					style[size.property] = size[size.property] * videoCount; // substract width/height by number of current items missing from default size
					if (size.property == "height") { style.width = size.width; }
					else { style.height = size.height; }

					if (this.BW_layout == "425x400") {
						videoCount = this._BW_getVideoCount();
						style.width *= (videoCount >= 3) ? 3 : videoCount % 3;
					}
					return style.width;
				}
				return null;
			},

			// From previous version - meant for BW compatibility
			_BW_getItemRelevantSize: function () {
				var size = { property: "width" /* default */ };
				switch (this.BW_layout) {
					case "300x250":
						size.property = "height";
						size.height = 96;
						size.width = 298;
						break;
					case "250x250":
						size.property = "height";
						size.height = 96;
						size.width = 248;
						break;
					case "160x600":
						size.property = "height";
						size.height = 110;
						size.width = 160;
						break;
					case "728x90":
						size.width = 165;
						size.height = 62;
						break;
					case "700x180":
						size.width = 140;
						size.height = 125;
						break;
					case "205x335":
						size.property = "height";
						size.height = 77;
						size.width = 198;
						break;
					case "590x96":
						size.width = 175;
						size.height = 66;
						break;
					case "500x175":
						size.width = 126;
						size.height = 119;
						break;
					case "575x100":
						size.width = 164;
						size.height = 69;
						break;
					case "468x60":
						size.width = 204;
						size.height = 44;
						break;
					case "425x400":
						size.property = "height";
						size.height = 126;
						size.width = 143;
						break;
				}

				return size;
			},

			_BW_getPossibleVideoCountsForLayout: function () {
				function range(from, to) {
					var arr = [];
					for (var i = from; i <= to; i++) { arr.push(i); }
					return arr;
				}

				// maximum videos
				var videoCount = null;
				switch (this.BW_layout) {
					case "300x250":
					case "250x250":
						videoCount = range(1, 2);
						break;
					case "160x600":
						videoCount = range(1, 5);
						break;
					case "728x90":
						videoCount = range(1, 4);
						break;
					case "700x180":
						videoCount = range(2, 5);
						break;
					case "590x96":
						videoCount = range(1, 3);
						break;
					case "500x175":
						videoCount = range(1, 4);
						break;
					case "575x100":
						videoCount = range(1, 3);
						break;
					case "468x60":
						videoCount = range(1, 2);
						break;
					case "425x400":
						videoCount = [3, 6, 9];
						break;
					case "205x335":
						videoCount = range(1, 4);
						break;
					case "120x120":
						videoCount = [1];
						break;
				}
				return videoCount;
			},

			drawHeader: function () {
				this.header = $.create("div", { className: CSS_PREFIX + "header" });
				this.container.appendChild(this.header);

				this.titleElement = $.create("h2", { parent: this.header });
				var titleStr = this.title || this._getDefaultTitle();
				this.titleElement.innerHTML = $.trim(titleStr);

				return this.header;
			},

			draw5minElements: function () {
				this.fiveMinElements = $.create("div", { className: CSS_PREFIX + "5min-elements" });
				if (this.serverData.by5minLink) {
					var link = $.create("a", { className: CSS_PREFIX + "by-5min-link", innerHTML: "By AOL On" });
					link.setAttribute("title", "on.aol.com");
					link.setAttribute("href", "http://on.aol.com");
					link.setAttribute("target", "_blank");
					$.css(link, { color: this.headerTextColor });
					this.fiveMinElements.appendChild(link);
				}
				else if (this.serverData.by5minText) {
					var text = $.create("span", { className: CSS_PREFIX + "by-5min-text", innerHTML: "By AOL On" });
					$.css(text, { color: this.headerTextColor });
					this.fiveMinElements.appendChild(text);
				}

				return this.fiveMinElements;
			},

			/*
			* Will draw the videos inside the container
			*/
			drawVideos: function (dimensionSettings) {
				if (DEBUG) { $.log("drawVideos " + this.videos); }

				if (!this.videos) { return; }

				$.css(this.container, {
					'visibility': 'hidden'
					, 'marginLeft': '-8000px'
					, 'position': 'absolute'
					, 'top': 0
					, 'left': 0
					, 'width': dimensionSettings.tsWidth + "px"
					, 'fontSize': '11px'
				});
				document.body.appendChild(this.container);

				dimensionSettings.carouselColCount = 0;
				dimensionSettings.numOfVideosLoaded = 0;

				this.videoObjects = [];

				var i = 0;
				do {
					var lio = $.create("li", { className: CSS_PREFIX + "video-col" });
					this.videosList.appendChild(lio);

					dimensionSettings.carouselColCount++;
					var videosInColCount = 0;

					var ul = $.create("ul");
					lio.appendChild(ul);

					for (var rowCount = 0; rowCount < dimensionSettings.videoRowCount; rowCount++) {
						var rowLi = $.create("li", { className: CSS_PREFIX + "video-row clearfix" });
						$.css(rowLi, { width: dimensionSettings.carouselColWidth + "px" });
						ul.appendChild(rowLi);

						var rowUl = $.create("ul");
						rowLi.appendChild(rowUl);

						for (var j = 0; j < dimensionSettings.videoColCount; j++) {
							if (i == this.videos.length || videosInColCount == dimensionSettings.numOfThumbs) {
								break;
							}

							if (this.ad && this.adUnitLocation == 2 && !this.ad.wasInserted && i == 3 && rowCount == 0) {

								var li = $.create("li");
								$.addCls(li, CSS_PREFIX + "vi");
								$.addCls(li, CSS_PREFIX + "last");
								rowUl.appendChild(li);
								li.appendChild(this.ad);

								// In order for the ad to be placed without ruining the layout 
								// This way, the next carousel columns stay unchanged calculation-wise
								$.css(li, { "float": "right" }); // Float the ad to the right instead of left
								$.css(li.previousSibling, { marginRight: 0 }); // Eliminate the margin of the LI before the ad

								this.ad.wasInserted = true;
							}
							else {
								var htTarget = this.ht ? this.ht : DEFAULT_HT;
								htTarget = this.convertEnum(htTarget, "ht");

								var vItem = new videoItem();
								var videoEl = vItem.init({
									"showLightBoxFunc": this.showVideo,
									"dimensionSettings": dimensionSettings,
									"imageSource": this.createCustomThumbnail(this.videos[i].ThumbURL, 148, 111),
									"imageDimensions": dimensionSettings.initialVideoSize,
									"htTarget": htTarget,
									"title": this.videos[i].Title,
									"directURL": this.getDirectURL(),
									"PageURL": this.videos[i].PageURL,
									"VideoObj": this.videos[i],
									"EmbededURL": this.videos[i].EmbededURL,
									"ReferrerURL": this.videos[i].ReferrerURL,
									"text": this.videos[i].Title,
									"playButtonImg": this.playButtonImg,
									"playButtonImg_MO": this.playButtonImg_MO,
									"playButtonLocation": this.playButtonLocation ? this.playButtonLocation : this.serverData.playButtonLocation,
									"videoSize": this._getItemRelevantSize(),
									"textFGColor": this.textFGColor,
									"textFGColor_MO": this.textFGColor_MO,
									"textBGColor": this.textBGColor,
									"textBGColor_MO": this.textBGColor_MO,
									"textFont": this.thumbnailTitleFont,
									"thumbnailSize": this.thumbnailSize,
									"id": this.videos[i].ID,
									"showClickButton": this.showClickButton ? this.showClickButton : this.serverData.showClickToPlay
								});
								this.videoObjects.push(vItem);

								if (j == dimensionSettings.videoColCount - 1) {
									vItem.makeLast();
									if (this.textLocation == 1) { // text is vertical
										$.css(videoEl, { marginLeft: dimensionSettings.addToLast + "px" });
									}
									else {
										$.css(videoEl, { width: "auto" });
										$.css(videoEl.textDiv, { paddingRight: dimensionSettings.addToLast + "px" });
									}
								}
								rowUl.appendChild(videoEl);

								// text overflows
								vItem.ellipsisizeText(dimensionSettings);

								if (dimensionSettings.carouselColCount == 1) {
									vItem.load();
									dimensionSettings.numOfVideosLoaded++;
								}

								i++;
								videosInColCount++;
							}
						}
						if (i == this.videos.length) { break; }
					}
				}
				while (i < this.videos.length);

				$.css(this.container, { 'visibility': '', 'marginLeft': '', 'position': '', 'top': '', 'left': '' });
				$.prepend(this.innerWrapper, this.container);

				setTimeout($.bind(function () {
					$.css(this.container, { 'zoom': 1 });
				}, this), 12);

				$.removeCls(this.container, CSS_PREFIX + "loading");
			},

			getDirectURL: function () {
				var d = undefined;
				if (this.directURL) {
					d = this.directURL;
				}
				else if (this.directUrl) {
					d = this.directUrl;
					this.directURL = this.directUrl;
				}
				return d;
			},

			drawAd: function () {
				if (this.adUnit != true && this.adUnit != "true") { return false; }
				if (this.serverData.adUnitURL == undefined) { return false; }
				this.ad = $.create("iframe", {
					className: CSS_PREFIX + "ad",
					styles: {
						visibility: "hidden"
					}
				});
				this.ad.setAttribute("frameborder", 0);
				this.ad.setAttribute("scrolling", "no");
				this.ad.src = this.serverData.adUnitURL;
				$.css(this.ad, { width: this.adUnitWidth + "px", height: this.adUnitHeight + "px" });

				if (this.adUnitLocation == 0) {
					$.addCls(this.innerWrapper, CSS_PREFIX + "side-addUnit");
				}

				if (this.adUnitLocation == 2) {
					this.ad.wasInserted = false;
				}
				else {
					this.innerWrapper.appendChild(this.ad);
				}
				return null;
			},

			setAdUnitLocation: function () {
				//Ad is located on
				if (this.adUnitWidth == 160) {
					this.adUnitLocation = 0; // side
				}
				else if (this.adUnitWidth == 125) {
					this.adUnitLocation = 2; // inside
				}
				else {
					this.adUnitLocation = 1; // bottom
				}
			},

			drawCarouselNav: function (parentEl) {
				var carouselNav = $.create("div", { className: CSS_PREFIX + "carousel-nav" });
				parentEl.insertBefore(carouselNav, parentEl.firstChild);
				if ($.browser.name == "webkit") {
					$.css(parentEl, { width: "92px" });
				}

				var previousButton = $.create("a", { className: CSS_PREFIX + "carousel-previous", parent: carouselNav, innerHTML: "&lsaquo;", styles: { color: this.headerTextColor} });
				var span = $.create("span", { parent: carouselNav, innerHTML: "...", styles: { color: this.headerTextColor} });
				var nextButton = $.create("a", { className: CSS_PREFIX + "carousel-next", parent: carouselNav, innerHTML: "&rsaquo;", styles: { color: this.headerTextColor} });

				if (this.serverData.prevImg && this.serverData.nextImg) {
					previousButton.innerHTML = nextButton.innerHTML = "";
					$.css(span, { display: "none" });
					var imagePrefetchPrev = new Image();
					imagePrefetchPrev.src = this.serverData.prevImg;
					$.css(previousButton, { width: "30px", height: "30px", background: "url(" + this.serverData.prevImg + ") left 2px no-repeat", marginTop: "-9px" });
					if (this.serverData.prevImg_MO) {
						styleTag.addRule("#" + this.innerWrapper.id + " A." + previousButton.className + "-hover", "background-image: url(" + this.serverData.prevImg_MO + ");");
						new Image().src = this.serverData.prevImg_MO;
					}
					if (this.serverData.prevImg_Disable) {
						styleTag.addRule("#" + this.innerWrapper.id + " A." + previousButton.className + "-disabled", "background-image: url(" + this.serverData.prevImg_Disable + "); padding: 0 !important; left: 0 !important;");
						new Image().src = this.serverData.prevImg_Disable;
					} else styleTag.addRule("#" + this.innerWrapper.id + " A." + previousButton.className + "-disabled", "padding: 0 !important; left: 0 !important;");

					$.css(nextButton, { width: "30px", height: "30px", background: "url(" + this.serverData.nextImg + ") left 2px no-repeat", marginTop: "-9px" });
					var imagePrefetchN = new Image();
					imagePrefetchN.src = this.serverData.nextImg;
					if (this.serverData.nextImg_MO) {
						styleTag.addRule("#" + this.innerWrapper.id + " A." + nextButton.className + "-hover", "background-image: url(" + this.serverData.nextImg_MO + ");");
						new Image().src = this.serverData.nextImg_MO;
					}
					if (this.serverData.nextImg_Disable) {
						styleTag.addRule("#" + this.innerWrapper.id + " A." + nextButton.className + "-disabled", "background-image: url(" + this.serverData.nextImg_Disable + "); padding: 0 !important; left: 0 !important;");
						new Image().src = this.serverData.nextImg_Disable;
					} else styleTag.addRule("#" + this.innerWrapper.id + " A." + nextButton.className + "-disabled", " padding: 0 !important; left: 0 !important;");
				}

				return {
					"previousButton": previousButton,
					"nextButton": nextButton
				};
			},

			drawFooter: function () {
				this.footer = $.create("div", { className: CSS_PREFIX + "footer clearfix", parent: this.container });
				$.css(this.footer, { borderTopColor: this.headerTextColor });

				return this.footer;
			},

			showVideo: function (videoData) {
				if (DEBUG) { $.log("lightbox show"); }

				videoData.playerType = 'embed';
				videoData.playerParam = videoData.EmbededURL;

				lightbox.show(videoData);
			},

			/* set */
			setTextLocation: function (location) {
				$.addCls(this.container, CSS_PREFIX + "tl-" + location);
			},
			setHeader: function (color, font, borderColor) {
				$.css(this.header, { color: color });
				$.css(this.titleElement, { color: color });
				if (font) {
					font = font.split("|");
					var lineHeight = font[1] == "11px" ? "13px" : "normal";
					$.css(this.titleElement, { fontFamily: font[0], fontSize: font[1], fontWeight: font[2], lineHeight: lineHeight });
				}
				$.css(this.header, { borderBottomColor: borderColor });
			},
			setTitle: function (title) {
				if ($.trim(title)) { this.title = title; }
				if (this.titleElement) { this.titleElement.innerHTML = this.title || this._getDefaultTitle(); }
			},
			_getDefaultTitle: function () {
				//return this.layout == "120x120" ? "Featured" : "Featured Videos";
				return "Related Videos";
			},
			_getPSLocation: function (ifcenter) {
				//console.log(this.container);
				var _c = ifcenter || false;
				var _el = this.container;
				var _w = window;
				var _elPos = { 'left': 0, 'top': 0 };

				var getDocSize = function () {
					return {
						'width': document.body.clientWidth,
						'height': document.body.clientHeight
					};
				};

				var getScrollPos = function () {
					return {
						'hscroll': window.pageXOffset || document.scrollLeft || 0,
						'vscroll': window.pageYOffset || document.scrollTop || 0
					};
				};

				var getViewport = function () {
					var e = window, a = 'inner';

					if (!('innerWidth' in window)) {
						a = 'client';
						e = document.documentElement || document.body;
					}

					return {
						width: e[a + 'Width'],
						height: e[a + 'Height']
					};
				};

				var elPos = function (obj) {
					var curleft = 0, curtop = 0;
					if (obj.offsetParent) {
						curleft = obj.offsetLeft;
						curtop = obj.offsetTop;
						while (obj = obj.offsetParent) {
							curleft += obj.offsetLeft;
							curtop += obj.offsetTop;
						}
					}
					return {
						'left': curleft,
						'top': curtop
					};
				};

				if (typeof (_el) != 'undefined' && _el != null) {
					//console.log(elPos(_el), getViewport(), getDocSize(), getScrollPos(), this.width, this.height);
					if (_c) {
						_elPos.left = elPos(_el).left + (this.width / 2);
						_elPos.top = elPos(_el).top + (this.height / 2);
					} else {
						_elPos.left = elPos(_el).left;
						_elPos.top = elPos(_el).top;
					}
					//magic, do not touch
					var xloc = ((_elPos.left - getScrollPos().hscroll) / getViewport().width) * 3;
					var yloc = (_elPos.top - getScrollPos().vscroll) / getViewport().height;

					var total = 0;

					if (xloc < 0) {
						total = 1;
					} else if (xloc < 1) {
						total = 2;
					} else if (xloc < 2) {
						total = 3;
					} else if (xloc < 3) {
						total = 4;
					} else {
						total = 5;
					}

					if (yloc < 0) {
					} else if (yloc < 1) {
						total = total + 5;
					} else {
						total = total + 10;
					}
					//console.log(total);
					return total;
				} else {
					return null; //no player found
				}
			},

			baseLogRequest: function () {
				var params = {};
				params.osVer = $.browser.platform.name;
				params.broVer = $.browser.name;
				params.broVerN = parseInt($.browser.version, 10);
				params.sid = this.sid;
				params.urlId = $.md5(this.url);
				params.content = this.checkContentStatus();
				params.sKey = (this.serverData != null && this.serverData.sKey != null) ? this.serverData.sKey : '';
				params.cqReq = (this.contentQuality != null ? this.contentQuality : (this.serverData != null && this.serverData.cqReq != null ? this.serverData.cqReq : ""));
				params.catsReq = (this.categories != null ? this.categories : (this.serverData != null && this.serverData.catsReq != null ? this.serverData.catsReq : ""));
				params.fType = (this.fallbackType != null ? this.fallbackType : (this.serverData != null && this.serverData.fType != null ? this.serverData.fType : ""));
				params.loglevel = (this.serverData != null && this.serverData.loglevel != null) ? this.serverData.loglevel : FIVEMIN.BaseConfig.Logger.LogLevel;
				params.pt = FIVEMIN.BaseConfig.Logger.Enums.pt.flash;
				params.vg = this.videoGroupID != null ? this.videoGroupID : 0;
				params.imid = _rndUniqID;
				params.pgLoc = this._getPSLocation(true);
				params.cLoc = this._getPSLocation();
				return params;
			},

			logAddRequest: function () {
				var params = this.baseLogRequest();

				params.isDeep = this.directURL ? 1 : 0;
				params.adUnit = this.adUnit ? 1 : 0;
				params.adSize = ((this.adUnitWidth && this.adUnitHeight) ? this.adUnitWidth + "x" + this.adUnitHeight : "");
				params.adLoc = this.adUnitLocation ? this.adUnitLocation : "";
				params.thSize = this.thumbnailSize ? this.thumbnailSize : "";
				params.txtLoc = this.textLocation ? this.textLocation : "";
				params.nThumb = this.dimensionSettings.videosInColCount > 0 ? this.dimensionSettings.videosInColCount : ""; //this.videoCount ? this.videoCount : "";
				params.thAlign = ((this.dimensionSettings.videoColCount > this.dimensionSettings.videoRowCount) ? 1 : 0);
				params.sHF = this.displayHeader ? this.displayHeader : "";
				params.uNxt = 0;
				params.ruNxt = 0;

				FIVEMIN.Logger.Log('ThumbSeed', params, 'addReq');
			},
			logAddResult: function (success, data) {
				var params = this.baseLogRequest();
				params.rType = success == true ? (data.success == 1 ? 1 : 0) : 2; // 1 - success with results, 0 - success without results,2 - ajax call failed.
				params.cqReq = (this.contentQuality ? this.contentQuality : (data.cqReq ? data.cqReq : ""));
				params.catsReq = (this.categories ? this.categories : (data.catsReq ? data.catsReq : ""));
				params.fType = (this.fallbackType ? this.fallbackType : (data.fType ? data.fType : ""));
				params.isDeep = this.directURL ? 1 : 0;
				params.adUnit = this.adUnit ? 1 : 0;
				params.adSize = ((this.adUnitWidth && this.adUnitHeight) ? this.adUnitWidth + "x" + this.adUnitHeight : "");
				params.adLoc = this.adUnitLocation ? this.adUnitLocation : (data.adLoc ? data.adLoc : "");
				params.thSize = this.thumbnailSize ? this.thumbnailSize : (data.thSize ? data.thSize : "");
				params.txtLoc = this.textLocation ? this.textLocation : (data.txtLoc ? data.txtLoc : "");
				params.nThumb = this.dimensionSettings.videosInColCount > 0 ? this.dimensionSettings.videosInColCount : ""; //this.videoCount ? this.videoCount : "";
				params.thAlign = ((this.dimensionSettings.videoColCount > this.dimensionSettings.videoRowCount) ? 1 : 0);
				params.sHF = this.displayHeader ? this.displayHeader : (data.sHF ? data.sHF : "");
				params.uNxt = 0;
				params.ruNxt = data.ruNxt ? data.ruNxt : 0;

				params.nVids = (data.binding != null) ? data.binding.length : 0;
				params.loglevel = (data.loglevel != null) ? data.loglevel : FIVEMIN.BaseConfig.Logger.LogLevel;

				FIVEMIN.Logger.Log('ThumbSeed', params, 'AddResult');
			},
			logAddImpression: function () {
				var params = this.baseLogRequest();

				params.cqReq = (this.contentQuality ? this.contentQuality : (this.serverData.cqReq ? this.serverData.cqReq : ""));
				params.nVids = this.serverData.binding.length;
				//params.pgLoc = ""; // location in page
				params.sessImp = 0;
				params.isDeep = this.directURL ? 1 : 0;
				params.adUnit = this.adUnit ? 1 : 0;
				params.adSize = ((this.adUnitWidth && this.adUnitHeight) ? this.adUnitWidth + "x" + this.adUnitHeight : "");
				params.adLoc = this.adUnitLocation ? this.adUnitLocation : "";
				params.thSize = this.thumbnailSize ? this.thumbnailSize : "";
				params.txtLoc = this.textLocation ? this.textLocation : "";
				params.sHF = this.displayHeader ? this.displayHeader : (this.serverData.sHF ? this.serverData.sHF : "");
				params.nThumb = this.dimensionSettings.videosInColCount > 0 ? this.dimensionSettings.videosInColCount : ""; //this.videoCount ? this.videoCount : "";
				params.thAlign = ((this.dimensionSettings.videoColCount > this.dimensionSettings.videoRowCount) ? 1 : 0);
				params.uNxt = 0;
				params.ruNxt = 0;

				if (DEBUG)
					$.log("Report AddImpression");

				FIVEMIN.Logger.Log('ThumbSeed', params, 'AddImpression');
			},
			logAddVideoResults: function () {
				var params = this.baseLogRequest();

				params.nVids = this.serverData.binding.length;
				//params.pgLoc = "";
				params.isDeep = this.directURL ? 1 : 0;

				for (var c = 0; c < this.serverData.binding.length; c++) {
					params.vid = this.serverData.binding[c].ID;
					params.vCat = this.serverData.binding[c].Categories;
					params.vLocSrvr = c;
					params.vCQ = this.serverData.binding[c].vCQ; //video content quality
					params.vFlg = this.serverData.binding[c].vFlg; // Video flagged
					params.vExp = this.serverData.binding[c].vExp; //video Exposure permission
					params.mId = this.serverData.binding[c].mId; // member id
					params.vGeo = this.serverData.binding[c].vGeo; // video geo permission
					params.vf = this.serverData.binding[c].vf;

					FIVEMIN.Logger.Log('ThumbSeed', params, 'AddVideoResults');
				}
			},

			logFlashData: function (videoId) {
				// Check if featured || playList

				var params = this.baseLogRequest();
				var num = 0;
				if (videoId != null) {
					for (var c = 0; c < this.serverData.binding.length; c++) {
						if (this.serverData.binding[c].ID == videoId) {
							num = c;
							break;
						}
					}
				}

				params.nThumb = this.dimensionSettings.videosInColCount > 0 ? this.dimensionSettings.videosInColCount : ""; //calculate
				params.thAlign = ((this.dimensionSettings.videoColCount > this.dimensionSettings.videoRowCount) ? 1 : 0); // thumbAlign 0 = vertical, 1 = horizontal calculate
				params.isDeep = this.directURL ? 1 : 0; // isDeepSeed 
				params.nVids = this.serverData.binding.length; // num of videos
				//params.pgLoc = ""; // location in page
				params.sessImp = 0;
				params.adUnit = this.adUnit ? 1 : 0;
				params.adSize = ((this.adUnitWidth && this.adUnitHeight) ? this.adUnitWidth + "x" + this.adUnitHeight : ""); //728X90, 300X250 ,468X60, 106X600
				params.adLoc = this.adUnitLocation ? this.adUnitLocation : (this.serverData.adLoc ? this.serverData.adLoc : "");
				params.thSize = this.thumbnailSize ? this.thumbnailSize : (this.serverData.thSize ? this.serverData.thSize : "");
				params.txtLoc = this.textLocation ? this.textLocation : (this.serverData.txtLoc ? this.serverData.txtLoc : "");
				params.sHF = this.displayHeader ? this.displayHeader : (this.serverData.sHF ? this.serverData.sHF : "");
				params.uNxt = 0; // UpNext
				params.ruNxt = 0; // Related up next
				params.vid = this.serverData.binding[num].ID;
				params.vCat = this.serverData.binding[num].vCat;
				params.vLocSrvr = num;
				params.vLocClnt = num;
				params.vCQ = this.serverData.binding[num].vCQ; //video content quality
				params.vFlg = this.serverData.binding[num].vFlg; // Video flagged
				params.vExp = this.serverData.binding[num].vExp; //video Exposure permission
				params.mId = this.serverData.binding[num].mId; // member id
				params.vGeo = this.serverData.binding[num].vGeo; // video geo permission
				params.vf = this.serverData.binding[num].vf;
				FIVEMIN.Logger.Parse(params);

				return params;
			},

			checkContentStatus: function () {
				if (this.playList)
					return FIVEMIN.BaseConfig.Logger.Enums.content.playlist;

				if (this.featured)
					return FIVEMIN.BaseConfig.Logger.Enums.content.featured;

				if (this.videoGroupID)
					return FIVEMIN.BaseConfig.Logger.Enums.content.videogroup;

				return FIVEMIN.BaseConfig.Logger.Enums.content.seed;
			}
		});

		function videoItem() {
			var element,
			showLightBoxFunc,
			pageUrl,
			embededURL,
			referrerURL,
			imageLink,
			image,
			imageSource,
			playButton,
			playButtonImg,
			playButtonImgMo,
			clickButton,
			title,
			text,
			href,
			textDiv,
			textLink,
			textBGColor,
			textBGColorMo,
			textFGColor,
			textFGColorMo,
			textFont,
			videoCfg,
			loaded = false,
            videoObj;

			var classnameNormal, classnameLoading, classnameLoaded, classnameNotloaded, classnameThumbsize, classnameThumbsizeLoading, classnameHover, classnameLast;

			var createImage = function (imgHref, imageSrc, htTarget, imgTitle, dimensions) {
				imageLink = $.create("a");
				if (imgHref) {
					imageLink.setAttribute("href", imgHref);
					if (htTarget) {
						imageLink.setAttribute("target", htTarget);
					}
					if (imgTitle) {
						imageLink.setAttribute("title", imgTitle);
					}
					$.addEvent(imageLink, "click", setFlashCookie);
				}

				image = $.create("img", { parent: imageLink });
				image.setAttribute("width", dimensions.width);
				image.setAttribute("height", dimensions.height);
				if (imgTitle) {
					image.setAttribute("alt", imgTitle);
				}
				$.addEvent(image, "load", onImageLoaded);

				imageSource = imageSrc;
			};

			var createPlayButtons = function (href, playButtonImg, htTarget, title, showClickButton, playButtonLocation) {//this.serverData.playButtonImg
				playButton = $.create("a", { className: CSS_PREFIX + "btn_play", innerHTML: "Play" });
				clickButton = $.create("a", { className: CSS_PREFIX + "btn_click", innerHTML: "Click to Play" });
				if (showClickButton == false) $.css(clickButton, { display: "none" });
				if (href) {
					playButton.setAttribute("href", href);
					clickButton.setAttribute("href", href);
					if (htTarget) {
						playButton.setAttribute("target", htTarget);
						clickButton.setAttribute("target", htTarget);
					}
					if (title) {
						playButton.setAttribute("title", title);
						clickButton.setAttribute("title", title);
					}
					$.addEvent(clickButton, "click", setFlashCookie);
					$.addEvent(playButton, "click", setFlashCookie);
				}
				if (playButtonImg) {
					$.css(playButton, { backgroundImage: "url(" + playButtonImg + ")" });
					if ($.browser.name == 'ie') {
						$.css(playButton, { filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + playButtonImg + "');" });
					}
				}
				switch (playButtonLocation) {
					case 1: // BottomRight
						$.css(playButton, { bottom: 5, right: 5, left: "auto", top: "auto" });
						break;
					case 2: // BottomLeft
						$.css(playButton, { bottom: 5, left: 22, top: "auto" });
						break;
					case 3: // TopRight
						$.css(playButton, { top: 19, right: 5, left: "auto" });
						break;
					case 4: // TopLeft
						$.css(playButton, { top: 19, left: 22 });
						break;
					case 0: // Middle
					default:
						break;
				}
			};

			var createTextDiv = function (title, href, textFGColor, htTarget, text, dimensions, font) {
				text = text;
				textDiv = $.create("div", { className: CSS_PREFIX + "desc" }); // 'width': this.initialVideoSize.width + "px"

				textLink = $.create("a", { innerHTML: text, parent: textDiv });
				$.css(textLink, { color: textFGColor });
				if (href) {
					textLink.setAttribute("href", href);
					if (htTarget) {
						textLink.setAttribute("target", htTarget);
						textLink.setAttribute("title", text);
					}
					$.addEvent(textLink, "click", setFlashCookie);
				}

				if (font) {
					font = font.split("|");
					var lineHeight = font[1] == "11px" ? "13px" : "normal";
					$.css(textDiv, { fontFamily: font[0], fontSize: font[1], fontWeight: font[2], lineHeight: lineHeight });
					$.css(textLink, { fontFamily: font[0], fontSize: font[1], fontWeight: font[2], lineHeight: lineHeight });
				}
			};

			var onImageLoaded = function () {
				$.removeCls(element, classnameLoading);
				$.removeCls(element, classnameThumbsizeLoading);
				$.addCls(element, classnameLoaded);

				loaded = true;
			};

			var onMouseOver = function () {
				$.addCls(element, classnameHover);
				$.css(element, { backgroundColor: textBGColorMo });
				$.css(textLink, { color: textFGColorMo });
				if (playButtonImgMo) {
					$.css(playButton, { backgroundImage: "url(" + playButtonImgMo + ")" });
					if ($.browser.name == 'ie') {
						$.css(playButton, { filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + playButtonImgMo + "');" });
					}
				}
			};

			var onMouseOut = function () {
				$.removeCls(element, classnameHover);
				$.css(element, { backgroundColor: textBGColor });
				$.css(textLink, { color: textFGColor });
				if (playButtonImgMo) {
					$.css(playButton, { backgroundImage: "url(" + playButtonImg + ")" });
					if ($.browser.name == 'ie') {
						$.css(playButton, { filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + playButtonImg + "');" });
					}
				}
			};

			var showLightBox = function (e) {
				$.stopEvent(e);
				if (typeof lightbox != "undefined") {
					showLightBoxFunc({
						"EmbededURL": embededURL,
						"title": text,
						"PageURL": pageUrl,
						"ReferrerURL": referrerURL,
						"VideoObj": videoObj
					});
				}
				else {
					window.open(pageUrl, "5minwindow");
				}
			};

			var getDirectURL = function (directURL, id) {
				if (directURL.indexOf("http://") == -1 && directURL.indexOf("https://") == -1) {
					directURL = "http://" + directURL;
				}
				directURL = directURL.replace("[VIDEOID]", id);
				return directURL;
			};

			var setFlashCookie = function () {
				FIVEMIN.PLAYER_COOKIE.PlayerCookie.setVideoID(videoCfg.id);
				FIVEMIN.PLAYER_COOKIE.PlayerCookie.setIsDeepSeed(true);
				FIVEMIN.PLAYER_COOKIE.PlayerCookie.setEmbedType("ts");
				FIVEMIN.PLAYER_COOKIE.PlayerCookie.write();
			};

			return {
				init: function (cfg) {
					this.cfg = cfg;
					videoCfg = cfg;
					classnameNormal = CSS_PREFIX + "vi";
					classnameLoading = classnameNormal + "-loading";
					classnameLoaded = classnameNormal + "-loaded";
					classnameNotloaded = classnameNormal + "-notloaded";
					classnameThumbsize = CSS_PREFIX + "ts-" + cfg.thumbnailSize;
					classnameThumbsizeLoading = classnameThumbsize + "-loading";
					classnameHover = classnameThumbsize + "-hover";
					classnameLast = CSS_PREFIX + "last";

					textBGColor = cfg.textBGColor;
					textBGColorMo = cfg.textBGColor_MO;
					textFGColor = cfg.textFGColor;
					textFGColorMo = cfg.textFGColor_MO;
					textFont = cfg.textFont;
					showLightBoxFunc = cfg.showLightBoxFunc;
					embededURL = cfg.EmbededURL;
					text = cfg.text;
					pageUrl = cfg.PageURL;
					referrerURL = cfg.ReferrerURL;
					href = (typeof cfg.directURL == "undefined") ? null : getDirectURL(cfg.directURL, cfg.id);
					title = (typeof cfg.directURL == "undefined") ? "" : title;
					playButtonImg = cfg.playButtonImg;
					playButtonImgMo = cfg.playButtonImg_MO;
					videoObj = cfg.VideoObj;

					createImage(href, cfg.imageSource, cfg.htTarget, title, cfg.imageDimensions);
					createPlayButtons(href, playButtonImg, cfg.htTarget, title, cfg.showClickButton, cfg.playButtonLocation);
					createTextDiv(title, href, cfg.textFGColor, cfg.htTarget, cfg.text, cfg.imageDimensions, textFont); // Creates textDiv
					element = $.create("li", {
						className: classnameNormal + " " + classnameThumbsize + " " + classnameNotloaded,
						children: [
							$.create("div", {
								className: CSS_PREFIX + "img_wrapper",
								children: [
									$.create("div", {
										className: CSS_PREFIX + "img",
										children: [
											 imageLink
										]
									}),
									$.create("div", {
										className: CSS_PREFIX + "play",
										children: [
											playButton,
											clickButton
										]
									})
								]
							}),
							textDiv
						],
						styles: {
							backgroundColor: cfg.textBGColor
						}
					});

					$.addEvent(element, "mouseover", onMouseOver);
					$.addEvent(element, "mouseout", onMouseOut);

					if (typeof cfg.directURL == "undefined") {
						$.addEvent(element, "click", showLightBox);
					}

					if (typeof cfg.dimensionSettings.textWidth != "undefined") {
						var videoWidth = cfg.videoSize.width + cfg.dimensionSettings.textWidth;
						$.css(element, {
							"width": videoWidth + "px",
							"marginRight": cfg.dimensionSettings.spaceWidth + "px",
							"marginLeft": 0
						}
						);
						$.css(textDiv, { width: cfg.dimensionSettings.textWidth + "px" });
						$.css(textDiv, { height: cfg.videoSize.height + "px" });
					}
					else {
						var videoWidth = cfg.videoSize.width;
						$.css(element, {
							"width": videoWidth + "px",
							"marginRight": cfg.dimensionSettings.spaceWidth + "px",
							"marginLeft": 0
						}
						);
						$.css(textDiv, { height: cfg.videoSize.textHeight + "px" });
					}

					element.textDiv = textDiv;
					element.textLink = textLink;

					return element;
				},

				load: function () {
					if (!loaded) {
						$.removeCls(element, classnameNotloaded);
						$.addCls(element, classnameLoading);
						$.addCls(element, classnameThumbsizeLoading);
						image.src = imageSource;
					}
				},

				ellipsisizeText: function () {
					var offsetHeight = parseInt(textDiv.style.height, 10);
					var prop;
					var title = textLink.textContent;
					if (title !== undefined) { prop = "textContent"; }
					else {
						title = textLink.innerText;
						if (title !== undefined) { prop = "innerText"; }
						else {
							title = textLink.innerHTML;
							prop = "innerHTML";
						}
					}
					textLink.title = title;

					var tilteParts = title.split(/\s+/g);

					var lastGoodIndex = tilteParts.length;

					while (textLink.offsetHeight > offsetHeight && lastGoodIndex > 0) {
						var currentParts = tilteParts.slice(0, --lastGoodIndex);
						textLink[prop] = currentParts.join(" ") + "...";
						if (!element.title) {
							element.title = title;
						}
					}
					$.css(textLink, { height: offsetHeight + "px" });
				},

				makeLast: function () {
					$.addCls(element, classnameLast);
				},

				destroy: function () {
					$.removeEvent(element, "mouseover", onMouseOver);
					$.removeEvent(element, "mouseout", onMouseOut);
					$.removeEvent(element, "click", showLightBox);
					$.removeEvent(image, "load", onImageLoaded);
				}
			};
		}

		ThumbSeed.prototype.Load = ThumbSeed.prototype.load; // backward compatability

		function _getQueryString() {
			if (!_getQueryString._overwritten) {
				_getQueryString._overwritten = true;

				var queryString = $._parseQueryString(location.search.substr(1));
				_getQueryString = function (key, def) {
					key = key.toLowerCase();
					return (queryString[key] === undefined ? def : queryString[key]) || "";
				};
				return _getQueryString.apply(null, arguments);
			}
		}

		var _parametersWithTypes = {
			sid: Number,
			url: String,
			categories: String,
			layout: String,
			headerColor: String,
			backgroundColor: String,
			displayHeader: Boolean,
			displayBorder: Boolean,
			displayFooter: Boolean,
			playList: String,
			fallback: String,
			fallbackType: String,
			featured: Boolean,
			contentQuality: Number,
			videoCount: Number,
			testData: String,
			autoStart: Boolean,
			libraryID: Number
		};

		ThumbSeed.loadParameterizedScripts = function (thumbseedScriptCallCount) {
			var allScripts = $.getElements("script");

			$.each(allScripts, function (script) {
				if (script.getAttribute("data-readByThumbSeed") == "true") {
					return;
				}
				else {
					script.setAttribute("data-readByThumbSeed", "true");
				}
				if (CURRENT_SCRIPT_SRC_RX.test(script.src)) {
					if (DEBUG) {
						$.log("ThumbSeed Creation #" + thumbseedScriptCallCount);
						$.addDomReady(
							function () {
								$.log("DOM ready");
							}
						);
					}

					var widgetParams = script.src.split("?")[1];

					if (widgetParams.indexOf("sid=") == -1) { return; }
					if (widgetParams) {
						widgetParams = $._parseQueryString(widgetParams);

						widgetParams = $.map(widgetParams, function (v, k) {
							var type = _parametersWithTypes[k];
							if (type == Boolean) { return v == "true"; }
							return type ? type(v) : v;
						});
					}
					if (DEBUG) { $.log(widgetParams); }

					var widgetContainer;

					if (widgetParams.wrapperToShow) {
						if (DEBUG) { $.log("Client sent a wrapperToShow (" + widgetParams.wrapperToShow + ")"); }
					}
					if (DEBUG) { $.log("wrapperToShow not found"); }
					if (DEBUG) { $.log("Creating DIV as wrapper"); }
					widgetContainer = $.create("div");
					script.parentNode.insertBefore(widgetContainer, script);


					var instance = new ThumbSeed(widgetContainer, script);
					if (widgetParams) {
						$.extend(instance, widgetParams);
					}

					instance.load();
				}
			});
		};

		//$.addDomReady(ThumbSeed.loadParameterizedScripts);

		function Carousel() {

			var listEl,
			nextButton,
			previousButton,
			moveBy,
			animation,
			currentItemIndex = 0,
			itemCount,
			videos,
			videosInColCount,
			numOfVideosLoaded;

			var onAnimationComplete = function () {
				toggleNavState();
			};

			var getCurrentLeft = function () {
				var currentLeft = $.currCss(listEl, "left");
				currentLeft = parseInt(currentLeft, 10);
				return currentLeft;
			};

			var toggleNavState = function () {
				if (currentItemIndex == (itemCount - 1)) {
					nextButton.disable();
				}
				else {
					nextButton.enable();
				}

				if (currentItemIndex == 0) {
					previousButton.disable();
				}
				else {
					previousButton.enable();
				}
			};

			var disableNav = function () {
				nextButton.disable(false);
				previousButton.disable(false);
			};

			function Button() {
				var element,
				originalClassName,
				onclickFunc,
				isDisabled;

				return {
					init: function (cfg) {
						element = cfg.element;
						element.setAttribute("href", ""); // Can't use javascript:// or void(0) because of IE6
						onclickFunc = cfg.onclickFunc;
						originalClassName = element.className;
						$.addEvent(element, "click", this.onClick);
						$.addEvent(element, "mouseover", this.onMouseOver);
						$.addEvent(element, "mouseout", this.onMouseOut);
					},

					disable: function (changeClass) {
						if (changeClass != false) {
							$.addCls(element, CSS_PREFIX + "button-disabled");
							$.addCls(element, originalClassName + "-disabled");
						}
						isDisabled = true;
					},

					enable: function (changeClass) {
						if (changeClass != false) {
							$.removeCls(element, CSS_PREFIX + "button-disabled");
							$.removeCls(element, originalClassName + "-disabled");
						}
						isDisabled = false;
					},

					onClick: function (e) {
						if (typeof e != "undefined" && e.type == "click") {
							// Stop the href="" from redirecting
							$.stopEvent(e);
						}
						if (!isDisabled) {
							onclickFunc.call();
						}
					},

					onMouseOver: function (e) {
						$.addCls(element, CSS_PREFIX + "button-hover");
						$.addCls(element, originalClassName + "-hover");
					},

					onMouseOut: function (e) {
						$.removeCls(element, CSS_PREFIX + "button-hover");
						$.removeCls(element, originalClassName + "-hover");
					},

					getParent: function () {
						return element.parentNode;
					},

					destroy: function () {
						$.removeEvent(element, "click", this.onClick);
						$.removeEvent(element, "mouseover", this.onMouseOver);
						$.removeEvent(element, "mouseout", this.onMouseOut);
					}
				};
			}

			var onKeyPress = function (e) {
				var keyId = (window.event) ? window.event.keyCode : e.keyCode;

				if (keyId == 39) {
					nextButton.onClick();
				}
				else if (keyId == 37) {
					previousButton.onClick();
				}
			};

			var loadVideos = function () {
				var startIndex = currentItemIndex * videosInColCount - (videosInColCount - numOfVideosLoaded);
				var endIndex = startIndex + videosInColCount;
				for (var i = startIndex; i < endIndex && i < videos.length; i++) {
					videos[i].load();
				}
			};

			return {
				init: function (cfg) {
					listEl = cfg.listEl;
					moveBy = parseInt(cfg.moveBy, 10);
					itemCount = cfg.itemCount;
					videosInColCount = cfg.videosInColCount;
					numOfVideosLoaded = cfg.numOfVideosLoaded;
					videos = cfg.videos;

					$.css(cfg.parent, { height: cfg.listHeight + "px" });
					$.css(listEl, { position: "absolute", left: 0 });

					var animConfig = {
						"element": listEl,
						"styleAttribute": "left",
						"onComplete": onAnimationComplete
					};

					if (cfg.duration) { animConfig.duration = cfg.duration; }
					animation = new Animation(animConfig);

					nextButton = new Button();
					nextButton.init({
						element: cfg.nextButton,
						onclickFunc: this.next
					});

					previousButton = new Button();
					previousButton.init({
						element: cfg.previousButton,
						onclickFunc: this.previous
					});

					$.addEvent(document, "keyup", onKeyPress);

					toggleNavState();
				},

				next: function () {
					disableNav();

					var currentLeft = parseInt(getCurrentLeft(), 10);
					animation.updateParams({
						from: currentLeft,
						to: currentLeft - moveBy
					});
					animation.animate();

					currentItemIndex++;

					loadVideos();
				},

				previous: function () {
					disableNav();

					var currentLeft = parseInt(getCurrentLeft(), 10);
					animation.updateParams({
						from: currentLeft,
						to: currentLeft + moveBy
					});
					animation.animate();

					currentItemIndex--;
				},

				destroy: function () {
					nextButton.destroy();
					nextButton = null;
					previousButton.destroy();
					previousButton = null;

					$.removeEvent(document, "keyup", onKeyPress);

					var carouselNav = $.getElement(".fmts-carousel-nav");
					carouselNav.innerHTML = "";
				}
			};
		}

		function Animation(config) {
			/*{
			"element": element,
			"styleAttribute": styleAttribute,
			"from": from,
			"to": to,
			"onComplete": func
			}*/
			var counter = 0;
			var animDelta = (config.to - config.from); // how far to move
			var onCompleteFunc = config.onComplete;

			// animation curve: "sum of numbers" (=100%), slow-fast-slow
			var tweenAmount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
			// move from X to Y over frames as defined by tween curve
			var frameCount = tweenAmount.length;
			var frames = []; // array of coordinates we'll compute
			var newFrame = config.from; // starting coordinate
			var frameDuration = (config.duration) ? (config.duration / frameCount) : 20;

			this.updateParams = function (config) {
				animDelta = (config.to - config.from); // how far to move
				newFrame = config.from; // starting coordinate

				for (var i = 0; i < frameCount; i++) {
					// calculate the points to animate
					newFrame += (animDelta * tweenAmount[i] / 100);
					newFrame = Math.floor(newFrame * 1000) / 1000;
					frames[i] = newFrame;
				}
			};

			this.animate = function () {
				setTimeout(move, frameDuration);
			};

			var move = function () {
				var toPoint = frames[counter];
				config.element.style.left = toPoint + "px";
				counter++;
				if (counter < frames.length) {
					setTimeout(move, frameDuration);
				}
				else {
					if (onCompleteFunc) {
						onCompleteFunc.call();
					}
					counter = 0;
				}
			};
		}

		return ThumbSeed;
	} ();
}

var ThumbSeed = FIVEMIN.ThumbSeed;
if (typeof thumbseedScriptCallCount == "undefined") {
    thumbseedScriptCallCount = -1;
}
thumbseedScriptCallCount++;
ThumbSeed.loadParameterizedScripts(thumbseedScriptCallCount);


/* ~/Scripts/Fivemin.PlayerCookie.js */

if (typeof (FIVEMIN) == "undefined") window.FIVEMIN = {};

if (typeof (FIVEMIN.PLAYER_COOKIE) == "undefined") FIVEMIN.PLAYER_COOKIE = {};

/**
* Temp session data saver. this object created for the Smart Player to save data for the PlayerCookie object.
* The PlayerCookie object will be used by JS object to redirect the player to other page and save the data to the next player.
*/
if (typeof (FIVEMIN.PLAYER_COOKIE.DataShare) == "undefined") FIVEMIN.PLAYER_COOKIE.DataShare = (function() {
	var _embedType = "";
	var _isDeepSeed = null;
	var _hasChanged = false;

	function setEmbedType(emebdType) {
		_embedType = emebdType;
		_hasChanged = true;
	}

	function setIsDeepSeed(isDeepSeed) {
		_isDeepSeed = isDeepSeed;
		_hasChanged = true;
	}

	function getEmbedType() {
		return _embedType;
	}

	function getIsDeepSeed() {
		return _isDeepSeed;
	}
	
	function hasChanged(){
		return _hasChanged;
	}

	function clean(){
		_hasChanged = false;
	}

	return {
		setEmbedType: setEmbedType,
		setIsDeepSeed: setIsDeepSeed,
		getEmbedType: getEmbedType,
		getIsDeepSeed: getIsDeepSeed,
		hasChanged: hasChanged,
		clean: clean
	};
})();

/**
* Player Cookie object manage the Flash Cookie we save for the next player loading in new page.
* Use the "create" fucntion and pass the reference object for callback function to notify you about PlayerCookie is ready to be used.
* You have the function isReady to know if the component created and ready to be used.
*/
if (typeof (FIVEMIN.PLAYER_COOKIE.PlayerCookie) == "undefined") {
	FIVEMIN.PLAYER_COOKIE.PlayerCookie = (function() {
		var FLASH_COOKIE_OBJECT = "FiveminPlayerCookie";
		var NOT_LOAD = 0;
		var LOADING = 1;
		var LOADED = 2;

		var _nLoad = NOT_LOAD;
		var _funcCallBack = null;
		var _flashObject = null;

		// Private Functions
		//===================
		function isIE() {
			return (function() {
				var undef, v = 3, div = document.createElement('div');

				while (
						div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
						div.getElementsByTagName('i')[0]
					);

				return v > 4 ? v : undef;
			} ());
		}

		function getHTML(funcCallBack) {
			var html;
			var src = "http://cfiles.5min.com/flashcookie/PlayerCookie.swf";

			if (funcCallBack) src += "?jscbOnLoad=" + funcCallBack;

			if (isIE()) {
				html = "<object width=0 height=0 id='" + FLASH_COOKIE_OBJECT + "' classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000'>" + "<param name='allowfullscreen' value='true' />" + "<param name='allowScriptAccess' value='always' />" + "<param name='wmode' value='opaque' />" + "<param name='movie' value='" + src + "' />" + "</object>";
			}
			else {
				html = "<embed name='" + FLASH_COOKIE_OBJECT + "' src='" + src + "' type='application/x-shockwave-flash' width=0 height=0 allowfullscreen='true' allowscriptaccess='always' ></embed>";
			}
			return html;
		}

		function getFlashObject() {
			if (window[FLASH_COOKIE_OBJECT]) {
				return window.document[FLASH_COOKIE_OBJECT];
			}
			if (!isIE()) {
				if (document.embeds && document.embeds[FLASH_COOKIE_OBJECT])
					return document.embeds[FLASH_COOKIE_OBJECT];
			}
			else {
				return document.getElementById(FLASH_COOKIE_OBJECT);
			}
		}
		
		function waitUntil(check, onComplete, delay, timeout, bind, args) {
		    if (!bind) bind = this;
		    if (!args) args = [];
			// if the check returns true, execute onComplete immediately
			if (check()) {
				onComplete.apply(bind, args);
				return;
			}
		
			if (!delay) delay = 100;
		
			var timeoutPointer;
			var intervalPointer = setInterval(function() {
				if (!check()) return; // if check didn't return true, means we need another check in the next interval
		
				// if the check returned true, means we're done here. clear the interval and the timeout and execute onComplete
				clearInterval(intervalPointer);
				if (timeoutPointer) clearTimeout(timeoutPointer);
				onComplete.apply(bind, args);
			}, delay);
			// if after timeout milliseconds function doesn't return true, abort
			if (timeout) timeoutPointer = setTimeout(function() {
				clearInterval(intervalPointer);
			}, timeout);
		}

		// Public Functions
		//==================

		function create(funcCallBack) {
			if (_nLoad != NOT_LOAD) {
				return;
			}

			_nLoad = LOADING;
			_funcCallBack = funcCallBack;

			waitUntil(function(){return document.body != null;}, function(){
				var wrapper = document.createElement("div");
				var body = document.body;
				body.insertBefore(wrapper, body.firstChild);
				wrapper.style.cssText = 'position:absolute;top:0;left:0;';
				wrapper.innerHTML = getHTML("FIVEMIN.PLAYER_COOKIE.PlayerCookie.handleCreationComplete");
			}, null, null, this);
		}

		function handleCreationComplete() {
			if (isReady()) {
				return;
			}

			_flashObject = getFlashObject();
			_nLoad = _flashObject ? LOADED : NOT_LOAD;
			if (_funcCallBack) {
				_funcCallBack();
				_funcCallBack = null;
			}
		}

		function setVideoID(videoID) {
			if (isReady()) _flashObject.playerCookieVideoID(videoID);
		}

		function setViewSource(viewSource) {
			if (isReady()) _flashObject.playerCookieViewSource(viewSource ? viewSource : 0);
		}

		function setIsDeepSeed(isDeepSeed) {
			if (isReady()) _flashObject.playerCookieIsDeepSeed(isDeepSeed ? true : false);
		}

		function setEmbedType(embedType) {
			if (isReady()) _flashObject.playerCookieEmbedType(embedType);
		}

		function write() {
			if (isReady()) _flashObject.playerCookieWrite();
		}

		function isReady() {
			return _nLoad == LOADED;
		}

		return {
			create: create,
			handleCreationComplete: handleCreationComplete,
			setVideoID: setVideoID,
			setViewSource: setViewSource,
			setIsDeepSeed: setIsDeepSeed,
			setEmbedType: setEmbedType,
			write: write,
			isReady: isReady
		};
	})();
	FIVEMIN.PLAYER_COOKIE.PlayerCookie.create();
}


