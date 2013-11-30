function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

if( window.devicePixelRatio !== undefined ) document.cookie = 'devicePixelRatio = ' + window.devicePixelRatio;

/*Globals*/
var history_count = 0;
var History = window.History;
var current_slide = false;
var blog_page = 0;
var project_page = 0;
/*Globals*/

jQuery(window).ready( function($){
    /*Make Widgets Masonry*/
    var container = $('div.footer-widgets').get(0);
    var msnry = new Masonry( container, {
        itemSelector: '.widget'
    });
    /*Make Widgets Masonry*/

    /*Contact Form*/
    $("body").on("submit","form#contact-page-form",function(e){
        var name = $(this).find("#name");
        var email = $(this).find("#email");
        var message = $(this).find("#message");
        var url = $(this).attr("action");
        var return_state = true;
        var form = $(this);
        if(name.val() == ""){
            name.addClass("error");
            return_state = false;
        }
        if(email.val() == "" || !validateEmail(email.val())){
            email.addClass("error");
            return_state = false;
        }
        if(message.val() == ""){
            message.addClass("error");
            return_state = false;
        }

        if(return_state){
            var data = {
                um_name : name.val(),
                um_email : email.val(),
                um_message : message.val()
            }
            $.post(url,data,function(data){
                form.fadeOut("normal",function(){
                    form.next().children(".success-message").fadeIn("normal");
                });
            });
        }
        return false;
    });

    $("body").on("click","form#contact-page-form input, form#contact-page-form textarea,form.contact-widget input, form.contact-widget textarea",function(){
        $(this).removeClass();
    });

    $("body").on("submit","form.contact-widget",function(e){
        var name = $(this).find("#w-name");
        var email = $(this).find("#w-email");
        var message = $(this).find("#w-message");
        var search_form = $(this).data("contact_form_id");
        var url = um_ajaxurl;
        var return_state = true;
        var form = $(this);
        if(name.val() == ""){
            name.addClass("error");
            return_state = false;
        }
        if(email.val() == "" || !validateEmail(email.val())){
            email.addClass("error");
            return_state = false;
        }
        if(message.val() == ""){
            message.addClass("error");
            return_state = false;
        }

        if(return_state){
            var data = {
                um_name : name.val(),
                um_email : email.val(),
                um_message : message.val(),
                um_search_form : search_form,
                action : "um_send_email"
            }
            $.post(url,data,function(data){
                form.fadeOut("normal",function(){
                    form.next().fadeIn("normal");
                });
            });
        }
        return false;
    });
    /*Contact Form*/

    /*Like System*/
    $("body").on("click","a.like",function(e){
        e.preventDefault();
        var postid = $(this).data("postid");
        if(!getCookie("um_liked_"+postid)){
            var this_anchor = $(this);
            var ajax_data = {
                um_post_id : postid,
                action : "um_like_post"
            };
            $.post(um_ajaxurl,ajax_data,function(data){
                this_anchor.find("p").text(data);
                this_anchor.addClass("liked");
                setCookie("um_liked_"+postid,"true",365);
            });
        }
    });
    /*Like System*/

    /*Menu On Click AJAX*/
    $("body").on("click","ul.main_menu a",function(e){
        if(jQuery(this).attr("target") || !ajax_site){
            return true;
        }
        e.preventDefault();
        var url = jQuery(this).attr("href");
        var this_item = $(this);
        $.post(url, { um_ajax_load_site: true }, function (data) {
            jQuery("#footer").show();
            changeURL(url);
            history_count = 1;
            $("a.current_page_item").removeClass("current_page_item");
            this_item.addClass("current_page_item");
            $("div#inner-content").html(data);
        }).error(function () {
            window.location = url;
        });
    });

    $("body").on("click","div.post-thumb a , ul.blog-recent-posts li a,ul.home_slider li a,ul.portfolio_categories li a , figure.post-thumb div a, div.services div.service a, div.post_block h4 a , div.post_block ul li a , ul.categories li a , div.tags ul li a",function(e){
        if(jQuery(this).attr("target") || !ajax_site){
            return true;
        }
        e.preventDefault();
        var url = $(this).attr("href");
        load_data(url);
    });
    /*Menu On Click AJAX*/

    /*Home Art Slider*/
    /*$("body").on("click","a.art_next",function(e){
        e.preventDefault();
        if(!current_slide.next().length){
            current_slide = $(".galleryMain").find("figure:first");
        }
        $(".galleryMain").stop(true).scrollTo(current_slide.next(),500,{
            offset : -120
        });
        current_slide = current_slide.next();
    });

    $("body").on("click","a.art_prev",function(e){
        e.preventDefault();
        e.preventDefault();
        if(!current_slide.prev().length){
            current_slide = $(".galleryMain").find("figure:last");
        }
        $(".galleryMain").stop(true).scrollTo(current_slide.prev(),500,{
            offset : -120
        });
        current_slide = current_slide.prev();
    });*/
    /*Home Art Slider*/

    /*Blog Load More*/
    $("body").on("click","a.blog_load_more",function(e){
        e.preventDefault();
        show_loader();
        blog_page++;
        var ajax_data = {
            paged : blog_page,
            um_page : true
        };
        $.post(document.URL,ajax_data,function(data){
            if(data){
                $("div.posts_loop").append(data);
                hide_loader();
            }else{
                $("a.blog_load_more").fadeOut();
            }
        }).error(function(){
            $("a.blog_load_more").fadeOut();
        });
    });
    /*Blog Load More*/

    /*Projects Load More*/
    $("body").on("click","a.portfolio_load_more",function(e){
        e.preventDefault();
        show_loader();
        project_page++;
        var ajax_data = {
            um_paged : project_page,
            um_page : true
        };

        $.post(document.URL,ajax_data,function(data){
            var data_markup = $(data);
            if(data_markup.children("div:eq(1)").children().length){
                $("div.column-4").append(data_markup.children("div:eq(0)").children());
                $("div.column-2").append(data_markup.children("div:eq(1)").children());
                $('div.filterable').mixitup('remix');
                $('div.filterable').mixitup("filter",cat_filter);
            }else{
                $("a.portfolio_load_more").fadeOut();
            }
        }).error(function(){
                $("a.portfolio_load_more").fadeOut();
        });

    });
    /*Projects Load More*/

    /*Project Filter*/
    $(".filterable").mixitup({
        targetSelector : "div.project_block",
        filterLogic : "and",
        multiFilter : true
    });

    var cat_filter = "";
    $("body").on("click",".categories-p a",function(e){
        e.preventDefault();
        cat_filter = jQuery(this).data("filter");
        $('div.filterable').mixitup("filter",cat_filter);
    });
    /*Project Filter*/

    /*Switch Between Projects Layout*/
    $("body").on("click","a.project_col_four",function(e){
        e.preventDefault();
        var this_element = $(this);
        if(!this_element.hasClass("active")){
            $("div.column-2").stop(true,true).fadeOut("fast",function(){
                $("div.column-4").stop(true,true).fadeIn("fast");
                this_element.addClass("active");
                $("a.project_col_two").removeClass("active");
            });
        }
    });

    $("body").on("click","a.project_col_two",function(e){
        e.preventDefault();
        var this_element = $(this);
        if(!this_element.hasClass("active")){
            $("div.column-4").stop(true,true).fadeOut("fast",function(){
                $("div.column-2").stop(true,true).fadeIn("fast");
                this_element.addClass("active");
                $("a.project_col_four").removeClass("active");
            });
        }
    });
    /*Switch Between Projects Layout*/

    /*Shortcodes*/

    /*Accordions*/

    $("body").on("click","ul.accordion li a",function(e){
        e.preventDefault();
        var parent = $(this).closest("ul.accordion");
        var this_element = $(this);
        parent.find("a.active").removeClass("active").find('i').addClass('icon-plus-sign').removeClass('icon-minus-sign').parent().siblings(".section_content").stop(true,true).slideUp({
            duration : 200 ,
            easing:"easeOutSine",
            complete : function(){
                this_element.addClass("active").find('i').removeClass('icon-plus-sign').addClass('icon-minus-sign').parent().siblings(".section_content").stop(true,true).slideDown({
                    easing : "easeInSine"
                });
            }
        });
    });

    /*Tabs*/

    $("body").on("click","div.tabs ul.tab_buttons li a",function(e){
        e.preventDefault();
        var parent = $(this).parent().parent();
        var this_index = $(this).parent().index();
        parent.find("a").removeClass("active");
        $(this).addClass("active");
        parent.next().children("li").stop(true,true).fadeOut({
            easing : "easeOutSine",
            duration : 200 ,
            complete : function(){
                parent.next().children("li").eq(this_index).stop(true,true).fadeIn({
                    easing : "easeInSine",
                    duration : 200
                });
            }
        });
    });

    /*Toggles*/
    $("body").on("click",".toggle li a",function(e){
        e.preventDefault();
        var section_content = $(this).siblings(".section_content");
        if($(this).hasClass("active")){
            $(this).removeClass("active").find('i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
        }else{
            $(this).addClass("active").find('i').removeClass('icon-plus-sign').addClass('icon-minus-sign');
        }
        section_content.stop(true,true).slideToggle({
            easing : "easeInOutSine",
            duration : 200
        });
    });

    $("body").on("click","div.alert_container a.close",function(e){
        e.preventDefault();
        $(this).parent().fadeOut({
            duration : 800,
            easing : "easeOutSine"
        });
    });
    /*Alerts*/

    /*Shortcodes*/

    $('body').on('click', 'a.menu-toggle', function(e){
        if($('.mobile_menu').hasClass('non-visible')) {
            $('.mobile_menu').removeClass('non-visible').addClass('visible').stop(true,true).slideDown(300);
        } else {
            $('.mobile_menu').removeClass('visible').addClass('non-visible').stop(true,true).slideUp(300);
        }
    });
});




jQuery(window).resize( function(){
	var teamWidth = jQuery('.team-pic').width();
    jQuery('.team-pic').css('height', teamWidth);

    /*var projectWidth = jQuery('.project-content-top').width();
    jQuery('.project-slider ul li').css('width', projectWidth);

    var imagesHeight = jQuery('.project-slider ul li').find('img').height();
    jQuery('.project-slider').css('height', imagesHeight);*/
});

jQuery(window).load(function(){
    hide_loader();
    jQuery("ul.main_menu > li").each(function(){
        if(jQuery(this).children("ul").length > 0){
            jQuery(this).find("a").eq(0).after("<i class='icon-angle-down'></i>");
        }
    });
});


/*Functions*/
function setCookie(c_name,value,exdays){
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name){
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1)
    {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1)
    {
        c_value = null;
    }
    else
    {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1)
        {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start,c_end));
    }
    return c_value;
}

jQuery.fn.reverse = function() {
    return this.pushStack(this.get().reverse());
};

move.select = function(selector){
    return jQuery(selector).get(0);
};

function show_loader(){
    jQuery(".loader").stop(true,true).fadeIn("fast");
}

function hide_loader(){
    jQuery(".loader").stop(true,true).fadeOut("fast");
}
/*Functions*/

/*Ajax Navigation*/
function changeURL(path){
    if (typeof(window.history.pushState) == 'function') {
        window.history.pushState(null, path, path);
    }else{
        window.location.hash = '#!' + path;
    }
}

function load_data(url){
    show_loader();
    jQuery.get(url, { um_ajax_load_site: true }, function (data) {
        changeURL(url);
        hide_loader();
        jQuery("#footer").show();
        jQuery("div#inner-content").html(data);
        history_count = 1;
        scrollOnTop();
    }).error(function () {
        window.location = url;
    });
}

window.onpopstate = function (event) {
    if (history_count) {
        load_data(document.URL);
    }
};

function scrollOnTop(){
    jQuery("html, body").animate({ scrollTop: "0px" });
}

//IF - If hash is included than redirect to
if(window.location.hash != ''){
    var hash = window.location.hash;
    hash = hash.replace('#!', " ")
    window.location = hash;
}

jQuery(document).ajaxSend(function(event, jqxhr, settings) {
                    show_loader();
                }).ajaxComplete(function(event, jqxhr, settings) {
                    hide_loader();
                })
/*Ajax Navigation*/