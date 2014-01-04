if (typeof jQuery != 'undefined'){
    var pathname = window.location.pathname;
    if (pathname.substring(0, 6) == "/blog/" || pathname.substring(0, 10) == "/articles/"){
        
        //this code is from http://cutroni.com/blog/2012/02/21/advanced-content-tracking-with-google-analytics-part-1/ 
        jQuery(function($) {
            // Debug flag
            var debugMode = false;

            // Default time delay before checking location
            var callBackTime = 100;

            // # px before tracking a reader
            var readerLocation = 150;

            // Set some flags for tracking & execution
            var timer = 0;
            var scroller = false;
            var endContent = false;
            var didComplete = false;

            // Set some time variables to calculate reading time
            var startTime = new Date();
            var beginning = startTime.getTime();
            var totalTime = 0;

            // Track the aticle load
            if (!debugMode) {
                _gaq.push(['_trackEvent', 'Reading', 'ArticleLoaded', '', , true]);
            }

            // Check the location and track user
            function trackLocation() {
                bottom = $(window).height() + $(window).scrollTop();
                height = $(document).height();

                // If user starts to scroll send an event
                if (bottom > readerLocation && !scroller) {
                    currentTime = new Date();
                    scrollStart = currentTime.getTime();
                    timeToScroll = Math.round((scrollStart - beginning) / 1000);
                    if (!debugMode) {
                        _gaq.push(['_trackEvent', 'Reading', 'StartReading', '', timeToScroll]);
                    } else {
                        alert('started reading ' + timeToScroll);
                    }
                    scroller = true;
                }

                var contentDiv;
                if (pathname.substring(0, 6) == "/blog/"){
                    contentDiv = ".post";
                }else if (pathname.substring(0, 10) == "/articles/"){
                    var articleNameArray = pathname.match(/\/[A-Za-z0-9-]+\/$/);
                    var articleName = articleNameArray[0];  
                    contentDiv = "#" + articleName.substring(1, articleName.length - 1);    //strip off the leading and trailing slashes
                }

                // If user has hit the bottom of the content send an event
                if (bottom >= $(contentDiv).scrollTop() + $(contentDiv).innerHeight() && !endContent) {
                    currentTime = new Date();
                    contentScrollEnd = currentTime.getTime();
                    timeToContentEnd = Math.round((contentScrollEnd - scrollStart) / 1000);
                    if (!debugMode) {
                        _gaq.push(['_trackEvent', 'Reading', 'ContentBottom', '', timeToContentEnd]);
                    } else {
                        alert('end content section '+timeToContentEnd);
                    }
                    endContent = true;
                }

                // If user has hit the bottom of page send an event
                if (bottom >= height && !didComplete) {
                    currentTime = new Date();
                    end = currentTime.getTime();
                    totalTime = Math.round((end - scrollStart) / 1000);
                    if (!debugMode) {
                        if (totalTime < 60) {
                            _gaq.push(['_setCustomVar', 2, 'ReaderType', 'Scanner', 2]);
                        } else {
                            _gaq.push(['_setCustomVar', 2, 'ReaderType', 'Reader', 2]);
                        }
                        _gaq.push(['_trackEvent', 'Reading', 'PageBottom', '', totalTime]);
                    } else {
                        alert('bottom of page '+totalTime);
                    }
                    didComplete = true;
                }
            }

            // Track the scrolling and track location
            $(window).scroll(function() {
                if (timer) {
                    clearTimeout(timer);
                }

                // Use a buffer so we don't call trackLocation too often.
                timer = setTimeout(trackLocation, callBackTime);
            });
        });
    }   
}