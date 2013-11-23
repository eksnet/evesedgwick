//Blog inline Slide Show class for MT
//Requires jQuery - developed using jquery-1.1.2.js
function blogSSClass() {
    this.ss = new Object;
    var sThis = this, //cached This for use in jQuery
        STANDARD = 'std',
        fontClass = '',
        maxWidthSupport = 434,
        next = jQuery.Event("next.slideshow"),
        prev = jQuery.Event("prev.slideshow"),
        transitionComplete = jQuery.Event("transitionComplete"),
        getPageurl = function(slideShow) {
            var url = slideShow.parents('.entry').find('.entry-title a').attr('href');
            url = url ? url : location.href.replace(new RegExp(location.hash),'');
            return url;
        };

    //Find some slideshows, get some params
    blogSSClass.prototype.loader = function (context) {
        context = context || document;
        jQuery('.slideshow', context).each(function(i) {
            var sId='ss_'+i,
            jThis=jQuery(this);
            sThis.ss[sId] = new Object;
            sThis.ss[sId].id = sId;
            sThis.ss[sId].title = jThis.parents('.entry').find('.entry-title').text();
            sThis.ss[sId].url = getPageurl(jThis);
            sThis.ss[sId].slides = new Object;
            sThis.ss[sId].count = 0;
            sThis.ss[sId].curr = 0;
            sThis.ss[sId].sWidth = 0;
            sThis.ss[sId].elems = [];
            sThis.ss[sId].get = function(get) {
                var i = /next/i.test(get) ? this.curr + 1 : this.curr - 1;
                return i;
            }
            if(context === document) {
                sThis.ss[sId].mode = STANDARD;
            }

            //scan for slides as il's, discount nested li's
            //and only grab the ul's first-level children
            sThis.ss[sId].slides = jThis.children('li');
            jThis.children(':not(li)').remove();
            //if there are no slides, clean up and move on to the next ul
            if (sThis.ss[sId].slides.length <= 0) {delete this.ss[sId]; return;}
            sThis.ss[sId].count = sThis.ss[sId].slides.length;
            sThis.ss[sId].curr = 1;
            jThis.attr('id',sId);
        });
        //after we're done scanning for slideshows, start making them pretty
        sThis.skins.std();
    }

    //Skin the image list with the nav controls,
    //frame, and clean up the styles
    blogSSClass.prototype.skins = {};
    blogSSClass.prototype.skins.std = function () {
        for (sId in sThis.ss){
            // cleanup the `containers`
            jThis=jQuery('#'+sId);
            sThis.ss[sId].containers = {std: jQuery('#'+sId)};

            jThis.wrap('<div id="'+sId+'f" class="ssFrame"></div>');
            frame = jThis.parent('div.ssFrame'); // save this for later please
            sThis.ss[sId].sWidth = jQuery("div.ssFrame").width();//grabs the width from css
            // slideshow frame's height would be based on tallest li
            // this makes sure it's the height of the first element when loaded
            (function() {
                var img = jThis.children(':first').find('img')[0],
                    p = jThis,
                    temp = img.src;
                img.src = temp+'?_='+(new Date().getTime());
                img.addEventListener('load', function(){
                    var h = p.children(':first').height();
                    p.css('height', h);
                }, false);
            }());

            jThis.find('img').removeAttr('style');
            jThis.find('span').each(function(){
                jQuery(this).before(jQuery(this).html());
                jQuery(this).remove();
            });
            /* remove once slideshow functionality is complete */
            jThis.find('img').each(function(i) {
                jQuery(this).attr({
                    'rel': jQuery(this).attr('src'),
                    'title': jQuery(this).attr('title') || 'Image #' + i
                });
            });

            var sNav = '<div class="ssControl '+fontClass+'"><div class="inline-controls"><div class="sPrev" title="Previous slide">Previous</div><span class="inline-index" id="'+sId+'c">1</span><span>&nbsp;of '+sThis.ss[sId].count+'</span><div class="sNext" title="Next slide">Next</div></div></div>';
            jThis.width((frame.width() * (sThis.ss[sId].count+1)) + 'px');
            jThis.before('<div class="ssNav"><div class="slide-title '+fontClass+'">'+sThis.ss[sId].title+'</div>'+sNav+'</div>');
            if(/slide_/.test(window.location.hash) === false) {
                jQuery.history.add('slide_'+sId+'=1');
            }

            sThis.bind(sId);
        }
    }

    blogSSClass.prototype.skins.fs = function(sId) {
    }

//Bind the contol functions to their coresponding
//buttons
    blogSSClass.prototype.bind=function (sIdl) {
        // binding the next click from the standard slideshow
        jQuery('#'+sIdl+'f').find('.sNext').bind('click',function(){
            var to = sThis.ss[sIdl].curr + 1;
            sThis.gotoSlide(sThis.ss[sIdl], to);
            jQuery('#'+sThis.ss[sIdl].id).trigger(next, sThis.ss[sIdl]);
        });

        jQuery('#'+sIdl+'f').find('.sPrev').bind('click',function(){
            var to = sThis.ss[sIdl].curr-1;
            sThis.gotoSlide(sThis.ss[sIdl], to);
            jQuery('#'+sThis.ss[sIdl].id).trigger(prev, sThis.ss[sIdl]);
        });
    };
    /* enhance logic for transition, encapsulate transition */
    blogSSClass.prototype.gotoSlide = function(slider, to) {
        var left,tmp,h=function() {}, tgt;
        if(slider.curr === to) return;
        /* improve this logic */
        if(to > slider.slides.length) {
            // next was requested
            // clone and usual stuff
            tmp = jQuery(slider.slides.get(0)).clone();
            tmp.appendTo(slider.containers.std); // choose the container dynamically
            h = function() {
                slider.containers.std.css('left', 0);// come back to the first slide
                tmp.remove(); // remove the cloned slide
            };
            slider.curr = 1;
        } else if(to < 1) {
            // prev was requested
            //clone and usual
            tmp = jQuery(slider.slides.get(0)).clone();
            tmp.appendTo(slider.containers.std); // choose the container dynamically
            slider.containers.std.css('left', '-'+tmp.position().left+'px');
            h = function() {
                tmp.remove();
            };
            slider.curr = slider.slides.length;
            to = slider.slides.length;
        } else {
            // usual stuff
            slider.curr = to;
        }
        tgt = jQuery(slider.containers.std.children(':eq('+(to-1)+')'));
        left = tgt.position().left;
        jQuery('#'+slider.id).animate({
            left: -left+'px',
            height: tgt.height()
        }, 'fast', function() {
                h();
                setTimeout(function() {
                    jQuery('#'+slider.id).trigger(transitionComplete, slider);
                }, 500);
        });
        jQuery('#'+slider.id+'c').text(''+slider.curr);
        jQuery.history.add('slide_'+slider.id+'='+slider.curr);
    }
}

ssController = new blogSSClass;

var blogSSPlugin = (function() {
    function prepare(c) {
        var slider,
            cindex = parseInt(c.replace(/slide.*=/,''), 10);
        if(cindex) {
            slider = 'ss_'+c.replace(/slide_ss_/,'').replace(/=.*/,'');
            ssController.gotoSlide(ssController.ss[slider], cindex);
        }
    }
    return {
        initHash: function() {
            // on hash change
            jQuery(window).bind('history', {
            }, function(e, c, p) {
                    prepare(c);
            });
            // if no hash, add hash
            if(window.location.hash) {
               prepare(window.location.hash.replace(/^.*#/,''));
            } else {
               // add first one
            }
        }
    };
}());

jQuery(document).ready(function() {
    ssController.loader();
    blogSSPlugin.initHash();
    //refresh ad when changing slide
    jQuery('body').bind("transitionComplete.inlineslideshow", function(e, slide) {
        CN.dart.refresh();
        CN.stats.omniture
            .setPageName(slide.url)
                .setPaginationValue('slide'+slide.curr).trackAjaxPage();
    });
});