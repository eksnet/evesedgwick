function namespace(c,f,b){var e=c.split(f||"."),g=b||window,d,a;for(d=0,a=e.length;d<a;d++){g=g[e[d]]=g[e[d]]||{};}return g;}
namespace('CN.tny.blog.slideshow.fs');
CN.tny.blog.slideshow.fs = (function () {
    var visibleSlide = 1000,
        wait,
        fontClass = '',
        kws = 'photobooth,comment,movies,page-turner,books,closeread,commentary,dailycomment,johncassidy,sportingscene,fullscreen',
        slider,
        wide,
        high,
        mode,
        updateIndex = function(n) {
            visibleSlide = n;
        };
        //
        var slideshowContainerMarkup = '<div class="fscontainer">\
                                        <div class="controls '+fontClass+'">\
                                            <div class="slide-title"></div>\
                                            <ul>\
                                                <li class="prev control">Prev</li>\
                                                <li class="index"></li>\
                                                <li class="next control">Next</li>\
                                                <li class="close control">Close</li>\
                                            </ul>\
                                        </div>\
                                    </div>\
                                    <div class="right-fs-container">\
                                        <div id="blogslides300x250_frame" class="overlay-ad"></div>\
                                        <div class="tny-brand"></div>\
                                    </div>';

    function gotoSlide(n) {
        var current = jQuery('.blog-overlay .slideshow > div:eq('+visibleSlide+')'),
            target;
        // animate visible to 0 and nth to 1
        n = n - 1;
        target = jQuery('.blog-overlay .slideshow > div:eq('+n+')');
        jQuery('.in-spotlight').removeClass('in-spotlight');
        current.animate({opacity: 0}, 'fast', function() {
            var img = jQuery('img', target);
            updateIndex(n);
            img.addClass('in-spotlight');
            jQuery(this).hide();
            target.show().animate({opacity: 1}, 200);
            CN.tny.blog.Image.center(img);
            jQuery('.index', '.blog-overlay .controls').html(slider.curr + ' of ' + slider.slides.length);
        });
        // resetting the caption status
        jQuery('.caption').hide();
    }


    function close() {
        // remove the hacked ads styling.
        jQuery('.hack-ads-wmode').removeClass('hack-ads-wmode');
        jQuery('.blog-overlay').fadeOut('slow', function() {
            jQuery(this).remove();
            slider.mode = mode;
        });
        afterClose();
    }

    function beforeOpen() {
        jQuery('body').addClass('fullscreen');
        jQuery('body').unbind("transitionComplete.inlineslideshow");
        jQuery('body').bind("transitionComplete.fullscreenslideshow", function(e, slide) {
            CN.stats.omniture
                .setPageName(slide.url)
                .setPaginationValue('slide'+slide.curr+'_fs').trackAjaxPage();
        });
    }

    // do all the clean up here.
    function afterClose() {
        jQuery('body').removeClass('fullscreen');
        jQuery('body').unbind("transitionComplete.fullscreenslideshow");
        // add this duplicate code to some API
        jQuery('body').bind("transitionComplete.inlineslideshow", function(e, slide) {
            CN.dart.refresh();
            CN.stats.omniture
                .setPageName(slide.url)
                .setPaginationValue('slide'+slide.curr).trackAjaxPage();
        });
    }

    function slideReset(){
        slider.mode = "fullscreen";
        //hacking ads overlaying on overlay with position absolute
        jQuery('.displayAd').addClass('hack-ads-wmode');
        jQuery('.blog-overlay .slideshow > div').css({opacity: 0}).hide();
        visibleSlide = jQuery('.blog-overlay .slideshow > div').length -1;

        // ad stuff. doing it since we did not request ad-ops ahead of time.
        // TODO: get a new placement from ad-ops and clean the following lines.
        //jQuery('<div id="blogslides300x250_frame"></div>').appendTo(jQuery('.right-fs-container'));
        setTimeout(function() {
            // hack to work around NEWYORKER-1783
            CN.dart.refresh('additional-refresh');
            CN.dart.call('blogslides', {sz:'300x250', kws:[kws]});
        }, 500);
    }

    function attachEvents() {
        // transitionComplete is a blogSlideShow event, refer blogSlideShow.js
        jQuery('body').unbind('transitionComplete.fs').bind("transitionComplete.fs", function(e, slide) {
            gotoSlide(slide.curr);
            CN.dart.refresh('blogslides300x250');
            jQuery('.caption-holder').removeClass('open');
            jQuery('.slide-title', '.blog-overlay').html(slide.title);
        });
        // keyed navigation 39:fwd :: 37:rew :: 27:escape
        jQuery(document).unbind('keydown.ss.fs').bind("keydown.ss.fs", function(e) {
            if(e.keyCode === 39) {
                ssController.gotoSlide(slider, slider.get('next'));
            } else if(e.keyCode === 37){
                ssController.gotoSlide(slider, slider.get('prev'));
            } else if(e.keyCode === 27) {
                close();
            }
        });
        // button navigation
    }

    function duplicateWithNewMarkup(s) {
        var html = jQuery('#'+s.id).html().replace(/<li/ig, '<div');
        html = html.replace(/<\/li/ig, '</div').replace(/ (height|width)="?\d{1,}"?/ig,"");
        html = '<div class="slideshow">' + html + '</div>';
        return jQuery(html);
    }

    function prepareFullScreen(s) {
        // TODO: prevent re-creation of overlay-container
        // TODO: break this function into smaller piece.
        var overlay,div,id;
        id=new Date().getTime();
        slider = s;
        overlay = jQuery('<div></div>');
        overlay.addClass('blog-overlay');
        div = jQuery(slideshowContainerMarkup);
        overlay.append(div);
        div = jQuery(div).get(0); // TODO: fix this

        jQuery(div).append(duplicateWithNewMarkup(s));

        // add the ad-container

        jQuery('.slideshow', overlay).children().addClass('img-wrapper');
        jQuery('.slide-title', overlay).html(s.title);



        jQuery('body').append(overlay);
        adjust();


        // based on orientation, apply height 100% or width 100%

        render();
    }

    function adjust() {
        if(wait) {
            clearTimeout(wait);
        }
        wait = setTimeout(function() {
            wide = jQuery(window).width() - 332;
            high = jQuery(window).height() - 32;
            // do not resize below the min-width
            if(wide < 485) {
                wide = 485;
            }
            CN.tny.blog.Image.center(jQuery('.in-spotlight'));
            jQuery('.img-wrapper').css('width', (wide-2)+"px");
            jQuery('.fscontainer', '.blog-overlay').css('width', wide);
            jQuery('.caption', '.blog-overlay').css('width', (wide-20)+'px');
            jQuery('.caption-handle').css('left', ((wide - 100)/2)+'px');
        }, 100);
    }

    /** arrange the image and caption in place **/
    function render() {
        jQuery('.blog-overlay').find('img').each(function(index) {
            jQuery(this).removeAttr('height')
                .removeAttr('width').attr('rel');
            CN.tny.blog.Image.center(this);
        }).end().find('.img-wrapper').each(function() {
            var i = 0, d = jQuery('<div class="caption"></div>'),
            caption = this.childNodes.length > 1 ? jQuery('<div class="caption-holder '+fontClass+'"></div>') : false;
            for(i = this.childNodes.length - 1; i >= 0; i--) {
                if(/img/i.test(this.childNodes[i].nodeName) === false) {
                    jQuery(d).prepend(this.childNodes[i]);
                }
            }
            if(caption) {
                jQuery(caption).append('<div class="caption-handle">CAPTION</div>');
                jQuery(caption).append(d);
                jQuery(this).append(caption);
            }
        });

        jQuery('.slideshow', '.blog-overlay').unbind('click').bind('click', function(e) {
            var context = jQuery(e.target).parents('.caption-holder');
            jQuery('.caption', context).slideToggle(100, function() {
                context.toggleClass('open');
            });
        });
        jQuery('.controls', '.blog-overlay').unbind('click').bind('click', function(e) {
            var control = jQuery(e.target).hasClass('control') ? e.target.className.replace(/control|\s/ig, '') : '';
            if(/prev/i.test(control)) {
                ssController.gotoSlide(slider, slider.get('prev'));
            } else if(/next/i.test(control)) {
                ssController.gotoSlide(slider, slider.get('next'));
            } else if(/close/i.test(control)) {
                close();
            }
        });
    }

    return {
        start: function(slider) {
            mode = slider.mode;
            beforeOpen();
            prepareFullScreen(slider);
            slideReset();
            gotoSlide(slider.curr);
            attachEvents();
        },
        visibleSlide: function() {
            return visibleSlide;
        },
        getSlider: function() {
            return slider;
        },
        adjust: function() {
            adjust();
        }
    }
}());

namespace('CN.tny.blog.Image');
CN.tny.blog.Image = (function($) {
    function IMG(o) {
        var i = new Image(),e;
        for(attr in o) {
            if(/^src/i.test(attr) === false) {
                if(/^on/i.test(attr) === false) {
                    $(i).attr(attr, o[attr]);
                }else {
                    // re-think this. do we need all this?
                    e = attr.replace(/^on/, '');
                    $(i).bind(e, function() {
                        o[attr].call(i, e);
                    });
                }
            }
        }
        if(o.src) {
            i.src = o.src;
        }
    }

    return {
        get: function(o) {
            if(o) {
                new IMG(o);
            }
        },
        center: function(img) {
            var y = jQuery(window).height() - 32,
                x = jQuery(window).width() - 332,
                h = jQuery(img).height(),
                w = jQuery(img).width(),
                pc = 1;
                pc = y/h,
                img = jQuery(img);
                if(w < 485) {
                    x = jQuery(img).width();
                    y = jQuery(img).height();
                }
                img.css({width: '', height: ''});
                if(w*pc > x) {
                    img.css({width: x+'px'});
                }else {
                    img.css({height: y+'px'});
                }
                if(w > 485){
                    y = (y - img.height())/2;
                    x = (x - img.width())/2;
                }
                else{
                    y = (((jQuery(window).height() - 32) - y)/2);
                    x = (((jQuery(window).width() - 332) - x)/2);
                }

                img.css({
                    left: (x >= 0 ? x:0)+'px',
                    top: (y >= 0 ? y:0)+'px',
                    position: 'absolute'
                });
        }
    }
})(jQuery);

jQuery(window).resize(function() {
    CN.tny.blog.slideshow.fs.adjust();
});

jQuery(document).ready(function() {
    // append expand to the regular slideshow
    var context = jQuery('.fullscreen').parents('.ssFrame');
    jQuery('.ssControl', context).append('<div class="expand" title="Fullscreen">FS</div>');
    //change to event delegation
    jQuery('.expand').unbind('click').bind('click', function(e) {
        var id = jQuery(e.target).parents('.ssFrame').attr('id');
        if(id) {
            id = id.replace(/ss_([0-9]+)f/, '$1');
            CN.tny.blog.slideshow.fs.start(ssController.ss['ss_'+id]);
        }
    });
});
