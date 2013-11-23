CN.stats.insight = (function() {

    var ucd_server_ip = "http://condenast.insight.omtrdc.net", //will be tracking.condenast.com after CNAME setup
        cu = "/zag.gif?Log=1",

        makeCall1 = function() {
            var s_visIdCookie=s.c_r('s_vi'),
            visRegExp=/[0-9A-F]+-[0-9A-F]+/g,
            s_visId=s_visIdCookie.match(visRegExp);
            var c = {},
                co = "";
            c["sw"] = screen.width;
            c["sh"] = screen.height;
            c["cd"] = screen.colorDepth;
            c["az"] = new Date().getTime();

            for ( cKey in c ) {
                co = co+"&"+cKey+"="+escape(c[cKey]);
            }
            drawImg(ucd_server_ip+cu+co+"&omniture_cookie="+s_visId+"&report_suite_id="+s.fun);
        },

        makeCall2 = function() {
            var s_visIdCookie=s.c_r('s_vi'),
            visRegExp=/[0-9A-F]+-[0-9A-F]+/g,
            s_visId=s_visIdCookie.match(visRegExp);
            var d = {},
                vo = "";

            d["dt"] = document.title;
            d["dr"] = document.referrer;
            d["cb"] = new Date().getTime();

            if (typeof v != "undefined") {
                for ( vKey in v ) {
                vo = vo+"&"+vKey+"="+encodeURIComponent(v[vKey]);
                }
            }
            for ( dKey in d ) {
                vo = vo+"&"+dKey+"="+encodeURIComponent(d[dKey]);
            }
            drawImg(ucd_server_ip+cu+vo+"&omniture_cookie="+s_visId+"&report_suite_id="+s.fun);
        },

        drawImg = function(src) {
            var trackingImg = document.createElement('img'),
                b = document.getElementsByTagName('body')[0];
            trackingImg.border = 0;
            trackingImg.width = 1;
            trackingImg.height = 1;
            trackingImg.src = src;
            b.appendChild(trackingImg);

        },

        doTracking = function() {
            makeCall1();
            makeCall2();

        };


        return {
            doTracking: doTracking
        };


})();

//To call, do
//CN.stats.insight.doTracking();
