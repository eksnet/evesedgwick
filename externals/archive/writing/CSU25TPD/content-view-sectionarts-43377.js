/* --- Start /home/httpd/arch/public/app_frame/webroot/js/AdIndexTower.js --- */


            	try {
            		$(document).ready(function(){
    var section = $("#AdIndexTower").children("form").children("input[name='section']").val();
    var limit = $("#AdIndexTower").children("form").children("input[name='limit']").val();
    VVM.debug.p('Ajax Tower Loading URL: '+'/adIndex/ajaxTower/' + section + '/' + limit);
    if ( section ) {
        $.get(
            '/adIndex/ajaxTower/' + section + '/' + limit + '/',
            function (data) {
                $('#AdIndexTower').append(data);
            }
        );
    }
});

    			}
    			catch(e){
    				VVM.debug.error(e);
        		}
            

/* --- End /home/httpd/arch/public/app_frame/webroot/js/AdIndexTower.js --- */
/* --- Start /home/httpd/arch/public/app_frame/webroot/js/NowTrending.js --- */


            	try {
            		var nowTrending = {
    init: function (listSelector) {
        var $container = $(document.getElementById('nowTrendingWidget')),
            $stories = $container.children('ul.stories'),
            $convs = $container.children('ul.convs'),
            $footer = $container.children('.footer');

        // remove the lists children from the dom, and random re-insert them
        // until the count is reached or the list is empty
        function shuffleList($list, count) {
            var i, r, items = $.makeArray($list.children().show().remove()),
                currentHref = window.location.href,
                thisHref;
            for (i = 0; i < count && items.length; i++) {
                r = Math.floor(Math.random() * items.length);
                thisHref = $(items[r]).find('a[href]').get(0).href;
                // check that the item doesn't link to the current page
                if (!thisHref || currentHref.indexOf(thisHref.split('?').shift()) !== -1) {
                    i--;
                } else {
                    $list.append(items[r]);
                }
                items.splice(r, 1);
            }
        }

        if ($container.hasClass('Story')) {
            $convs.hide();
            shuffleList($stories, 3);
        }
        else if ($container.hasClass('LargeStory')) {
            $convs.hide();
            shuffleList($stories, 2);
        }
        else if ($container.hasClass('Hybrid')) {
            shuffleList($stories, 3);
            $convs.children().show();
            // shuffleList($convs, 3);
            $convs.hide();
            $footer.delegate('a', 'click', function() {
                var $this = $(this);
                if (!$this.hasClass('active')) {
                    $this.siblings().removeClass('active');
                    $stories.toggle($this.hasClass('stories'));
                    $convs.toggle($this.hasClass('convs'));
                    $this.addClass('active');
                }
            });
        }
        else if ($container.hasClass('Conv')) {
            $stories.hide();
            $convs.children().show();
            // shuffleList($convs, 3);
        }
    },
    fetchCommentCounts: function (network) {
        if (!window.LF || !LF.CommentCount) {
            this.requireCommentCountScript(network, this.fetchCommentCounts);
        } else {
            $('.livefyre-commentcount').not($('#nowTrendingWidget .livefyre-commentcount')).removeClass('livefyre-commentcount');
            LF.CommentCount({
                replacer: function(el, count) {
                    $(el).html(count +' Comment'+ (count === 1 ? '' : 's'));
                }
            });
        }
    },
    requireCommentCountScript: function (network, cb) {
        var tag = document.createElement('script');
        tag.type="text/javascript"; tag.src="http://zor.livefyre.com/wjs/v1.0/javascripts/CommentCount.js";
        tag.setAttribute('data-lf-domain', network);
        $(tag).bind("load", cb);
        document.head.appendChild(tag);
    }
};
    			}
    			catch(e){
    				VVM.debug.error(e);
        		}
            

/* --- End /home/httpd/arch/public/app_frame/webroot/js/NowTrending.js --- */
/* --- Start /home/httpd/arch/public/app_frame/webroot/js/disqus.js --- */


            	try {
            		// define js globals required by disqus
var disqus_config;
var disqus_developer;
var disqus_category_id;
var disqus_shortname;
var disqus_identifier;
var disqus_url;
var disqus_title;

// make sure we have the VVM namespace defined
if (typeof VVM == "undefined") {
    VVM = {};
}

// disqus-related methods
VVM.Disqus = {

	generateEmbed: function(disqusDeveloper, disqusCategoryId, disqusShortname, disqusIdentifier, disqusUrl, disqusTitle, publicKey) {

		// set js globals required by disqus
		if (disqusCategoryId != 0) {
			disqus_category_id = disqusCategoryId;
		}
		disqus_developer   = disqusDeveloper;
		disqus_shortname   = disqusShortname;
		disqus_identifier  = disqusIdentifier;
		disqus_url         = disqusUrl;
		disqus_title       = disqusTitle;

		// if we're authenticated via sso, use sso w/ disqus embed
        // but only for the old sso
    	if ((typeof(MVN) != "object" && document.cookie.indexOf("no-auth=") == -1) || typeof(MVN.user) == "object") {
            $.getJSON(
            	'/village/getDisqusInfo/',
                function(json) {

                    if (json) {
                    	disqus_config = function() {

                            this.sso = {
                                logout: "/village/logout/"
                            }

                            if (json.message && json.hmac && json.timestamp) {
                                this.page.remote_auth_s3 = json.message + ' ' + json.hmac + ' ' + json.timestamp;
                            } else {

                            }

                            this.page.api_key = publicKey;
                        }
                    }

                    VVM.Disqus.appendScriptSource(disqusShortname);
                }
            );
        // else use disqus embed without sso
    	} else {
    		VVM.Disqus.appendScriptSource(disqusShortname);
    	}
	},

    appendScriptSource: function(disqusShortname) {

        (function() {
            var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
            dsq.src = 'http://' + disqusShortname + '.disqus.com/embed.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
        })();
	}
}

    			}
    			catch(e){
    				VVM.debug.error(e);
        		}
            

/* --- End /home/httpd/arch/public/app_frame/webroot/js/disqus.js --- */
/* --- Start /home/httpd/arch/public/app_frame/webroot/js/LandingMap.js --- */


            	try {
            		 $(document).ready(function(){
       
    var objid = $('#mapWidgetForm').children("input[name='objid']").val();
    var multipleLocations = $('#mapWidgetForm').children("input[name='multipleLocations']").val();
    var tmp_types = $('#mapWidgetForm').children("input[name='types']").val();
    var types = eval('(' + tmp_types + ')');
    if ( multipleLocations ) {
        var JSONlocations = $('#mapWidgetForm').children("input[name='JSONlocations']").val();
    }else{
         var JSONlocations = '';
    }

    if ( objid ) {
        var map = new Array();
        map[objid] = new MapWidget('mapWidget' + objid, objid, multipleLocations, JSONlocations);
        map[objid].types = types;
        map[objid].showTypes = true;
        map[objid].load();
    }
});
$(window).unload( function () {
    if ( typeof( GUnload ) != 'undefined' ) {
        GUnload();
    }
    
});

function MapWidget(elementId, objid, multipleLocations, JSONlocations)
{
    this.map = null;
    this.mapDiv = null;
    this.elementId = elementId;
    this.centerId = objid;
    this.showTypes = false;
    this.typesMenu = null;
    this.loading = null;
    this.centerLocation = null;
    this.locations = new Array;
    this.details = null;
    this.types = null;
    this.load = function()
    {
        if(GBrowserIsCompatible())
        {
            var element = document.getElementById(this.elementId);
            if(element)
            {
                // create the large link
                var link = document.createElement('a');
                link.href = '/locations/map/?objid=' + this.centerId;
                link.className = 'largeMap';
                link.innerHTML = 'Large Map';
                element.appendChild(link,'G_ANCHOR_BOTTOM_RIGHT');
                // Create the map div
                this.mapDiv = document.createElement('div');
                this.mapDiv.className = 'map';
                element.appendChild(this.mapDiv);
                this.map = new GMap2(this.mapDiv);
                this.map.addControl(new GSmallMapControl());
                // Create the loading image
                this.loading = document.createElement('div');
                var img = document.createElement('img');
                img.style.margin = '0px';
                img.src = 'http://assets.villagevoice.com/img/loading.gif';
                img.style.border = 'none';
                this.loading.appendChild(img);
                this.loading.style.backgroundColor = '#FFFFFF';
                this.loading.style.border = '1px solid #CCCCCC';
                this.loading.style.width = '25px';
                this.loading.style.height = '25px';
                this.loading.style.position = 'absolute';
                this.loading.margin = '0px';
                this.loading.padding = '0px';
                this.loading.style.top = '5px';
                this.loading.style.left = this.mapDiv.offsetWidth  - 35 + 'px';
                this.loading.style.zIndex = 1000;
                this.loading.style.display = 'none';
                this.mapDiv.appendChild(this.loading);
                this.setCenter(objid, multipleLocations, JSONlocations);
                if(this.showTypes)
                {
                    this.loadTypes();
                }
            }
        }
    }

    this.showDetails = function(idx,point)
    {
        var element = document.getElementById(this.elementId);
        if(this.details == null)
        {
            if(element)
            {
                this.details = document.createElement('div');
                this.details.style.position = 'absolute';
                this.details.style.display = 'none';
                this.details.style.zIndex = 1000;
                this.details.className = 'details';
                element.appendChild(this.details);
            }
        }
        if(this.details != null)
        {
            var location = null;
            if(idx == null)
            {
                // Load center location info
                location = this.centerLocation;
                this.details.innerHTML = this.centerLocation.Name;
            }
            else if(idx <= this.locations.length)
            {
                location = this.locations[idx];
            }
            this.details.innerHTML = '';
            if(location.LocationImage)
            {
                this.details.innerHTML = '<img style="float: left; margin-right: 5px;" src="' + location.LocationImage + '">';
            }
            this.details.innerHTML += '<div class="location">' +
                                      '<div class="name">' + location.Name + '</div>' +
                                      '<div class="address">' + location.Address + '<br/>' +
                                      location.City.Name + ' ' + location.City.State + ', ' + location.ZipCode + '</div>' +
                                      '</div>';
            this.details.style.display = '';
            var centerPoint = this.map.fromLatLngToDivPixel(this.map.getCenter());
            this.details.style.top = (this.mapDiv.offsetTop + ((this.mapDiv.offsetHeight / 2) + (point.y - centerPoint.y))) + 'px';
            this.details.style.left = (this.mapDiv.offsetLeft + ((this.mapDiv.offsetWidth / 2) + (point.x - centerPoint.x) - this.details.offsetWidth)) + 'px';
        }
    }

    this.hideDetails = function()
    {
        if(this.details != null)
        {
            this.details.style.display = 'none';
        }
    }

    this.setCenter = function(objid, multipleLocations, JSONlocations)
    {
        
        var widget = this;
        this.loading.style.display = '';
        if ( multipleLocations ) {
            url = '/locations/landingMapService?mapAction=getMultiple&locationIDs=' + JSONlocations;
        }else{
            url = '/locations/landingMapService?mapAction=getLocation&objid=' + objid;
        }
        $.getJSON(
            url,
            function(json){
                if(json)
                {
                    if(json.Status == 'OK')
                    {
                        if ( multipleLocations ) {
                            widget.locations = new Array;
                            var longTotal = new Number;
                            var latTotal = new Number;
                            var mapCount = new Number;
                            mapCount = 0;
                            longTotal = 0;
                            latTotal = 0;
                            for(i = 0; i < json.locations.length; i++)
                            {
                                 var location = json.locations[i].Location;
                                
                                    widget.locations.push(location);
                                    var point = new GLatLng(location.Latitude,location.Longitude);
                                    mapCount ++;
                                    longTotal += Number(location.Longitude);
                                    latTotal += Number(location.Latitude);                                    
                                    var marker = new GMarker(point);
                                    marker.title = 'http://villagevoice.com' + location.SeoUrl;
                                    marker.objid = location.objid;
                                    marker.idx = i;
                                    widget.map.addOverlay(marker);
                                    widget.loading.style.display = 'none';
                                    GEvent.addListener(marker, "mouseover",
                                    function()
                                    {
                                        var point = widget.map.fromLatLngToDivPixel(this.getLatLng());
                                        widget.showDetails(this.idx,point);
                                    });
                                    GEvent.addListener(marker, "mouseout",
                                    function()
                                    {
                                        widget.hideDetails()
                                    });
                                    GEvent.addListener(marker,"click",
                                    function()
                                    {
                                        document.location.href = this.title;
                                    }
                                    );
                                    
                            }   
                            latTotal = (latTotal/mapCount);   
                            longTotal = (longTotal/mapCount);
                            var centerPoint = new GLatLng(latTotal,longTotal);
                            widget.map.setCenter(centerPoint,json.Zoom);  

                        }else{
                            widget.centerLocation = json.Location;
                            var point = new GLatLng(widget.centerLocation.Latitude,widget.centerLocation.Longitude);
                            widget.map.setCenter(point,json.Zoom);
                            var marker = new GMarker(point);
                            widget.map.addOverlay(marker);
                            widget.loading.style.display = 'none';
                            GEvent.addListener(marker, "mouseover",
                            function()
                            {
                                var point = widget.map.fromLatLngToDivPixel(this.getLatLng());
                                widget.showDetails(null,point);
                            });
                            GEvent.addListener(marker, "mouseout",
                            function()
                            {
                                widget.hideDetails()
                            });
                        }
                    }
                    else
                    {
                        //alert(json.Error);
                    }
                }
            }
        );
    }

    this.loadNearby = function()
    {
        var widget = this;
        this.map.clearOverlays();
        // Add the center marker back on
        var marker = new GMarker(new GLatLng(this.centerLocation.Latitude,this.centerLocation.Longitude));
        GEvent.addListener(marker, "mouseover",
        function()
        {
            var point = widget.map.fromLatLngToDivPixel(this.getLatLng());
            widget.showDetails(null,point);
        });
        GEvent.addListener(marker, "mouseout",
        function()
        {
            widget.hideDetails()
        });
        this.map.addOverlay(marker);
        this.loading.style.display = '';
        url = '/locations/landingMapService?mapAction=getNearby&lat=' + this.centerLocation.Latitude + '&lon=' + this.centerLocation.Longitude + '&type=' + this.typesMenu.value;
        $.getJSON(
            url,
            function(json)
            {
                if(json)
                {
                    if(json.Status == 'OK')
                    {
                        widget.locations = new Array;
                        for(i = 0; i < json.Locations.length; i++)
                        {
                            var location = json.Locations[i].Location;
                            if(location.objid != widget.centerLocation.objid)
                            {
                                widget.locations.push(location);
                                var point = new GLatLng(location.Latitude,location.Longitude);
                                var icon = new GIcon();
                                icon.image = 'http://assets.villagevoice.com/img/default.png';
                                icon.shadow = 'http://assets.villagevoice.com/img/shadow.png';
                                icon.iconSize = new GSize(31, 49);
                        		icon.shadowSize = new GSize(63, 53);
                        		icon.iconAnchor = new GPoint(31, 49);
                        		icon.infoWindowAnchor = new GPoint(20, 20);
                                var marker = new GMarker(point,icon);
                                marker.title = 'http://villagevoice.com' + location.SeoUrl;
                                marker.objid = location.objid;
                                marker.idx = i;
                                widget.map.addOverlay(marker);
                                widget.loading.style.display = 'none';
                                GEvent.addListener(marker, "mouseover",
                                function()
                                {
                                    var point = widget.map.fromLatLngToDivPixel(this.getLatLng());
                                    widget.showDetails(this.idx,point);
                                });
                                GEvent.addListener(marker, "mouseout",
                                function()
                                {
                                    widget.hideDetails()
                                });
                                GEvent.addListener(marker,"click",
                                    function()
                                    {
                                        document.location.href = this.title;
                                    }
                                );
                            }
                        }
                    }
                    else
                    {
                        //alert(json.Error);
                    }
                }
                widget.loading.style.display = 'none';
            }
         );
    }

    this.loadTypes = function()
    {
        this.loading.style.display = '';
        if (this.types) {
            this.createTypes(this.types);
        } else {
            url = '/locations/landingMapService?mapAction=getTypes';
            $.getJSON(
                url,
                function(json) {
                    this.createTypes(json);
                }
            );
        }
    }

    this.createTypes = function(json)
    {
        var widget = this;
        this.loading.style.display = '';
        if(json)
        {
            if(json.Status == 'OK')
            {
                var element = document.getElementById(widget.elementId);
                // Add the dropdown if it's not there
                if(widget.typesMenu == null)
                {
                    var div = document.createElement('div');
                    div.innerHTML = 'Find nearby:';
                    div.className = 'nearby';
                    element.appendChild(div);
                    widget.typesMenu = document.createElement('select');
                    var option = document.createElement('option');
                    option.innerHTML = 'Select Type';
                    widget.typesMenu.appendChild(option);
                    div.appendChild(widget.typesMenu);
                    widget.typesMenu.onchange = function()
                    {
                        if(widget.typesMenu.value != '')
                        {
                            widget.loadNearby();
                        }
                    }
                }
                for(i = 0; i < json.Types.length; i++)
                {
                    var option = document.createElement('option');
                    option.setAttribute('value',json.Types[i].LocationType.objid);
                    option.innerHTML = json.Types[i].LocationType.Name;
                    widget.typesMenu.appendChild(option);
                }
            }
            else
            {
                //alert(json.Error);
            }
            widget.loading.style.display = 'none';
        }
    }
}
    			}
    			catch(e){
    				VVM.debug.error(e);
        		}
            

/* --- End /home/httpd/arch/public/app_frame/webroot/js/LandingMap.js --- */
/* --- Start /home/httpd/arch/public/app_frame/webroot/js/PageViews.js --- */


            	try {
            		function TrackPageView(objid, type, sendToFriend)
{
    // Tracker webservice url
    var url = '/services/trackPageView/' + objid + '/' + type + '/' + sendToFriend + '/';
    $.getJSON(
        url,
        function(transport,json){
            if(json){
                // Leave empty for now, it's just transparent tracking
                if(json.status == 'OK'){

                }else if(json.status == 'ERROR'){

                }
            }
        }
    );
}

$(document).ready(function(){
    var tracker = $( "#TrackerForm" );
    if (tracker.length > 0) {
        var objid = tracker.children("input[name='objid']").val();
        var type = tracker.children("input[name='type']").val();
        var sendToFriend = tracker.children("input[name='sendToFriend']").val();
        TrackPageView(objid, type, sendToFriend);
    }
});

    			}
    			catch(e){
    				VVM.debug.error(e);
        		}
            

/* --- End /home/httpd/arch/public/app_frame/webroot/js/PageViews.js --- */
/* --- Start /home/httpd/arch/public/app_frame/webroot/js/text_size.js --- */


            	try {
            		$(document).ready(function(){
    $('#text_size_sm').click(function(){
        //Would like to remove all classes but there is no other identifier for this div
        $('.content_body').removeClass('med');
        $('.content_body').removeClass('lg');
        $('.content_body').addClass('sm');
    });

    $('#text_size_med').click(function(){
        $('.content_body').removeClass('sm');
        $('.content_body').removeClass('lg');
        $('.content_body').addClass('med')
    });

    $('#text_size_lg').click(function(){
        $('.content_body').removeClass('sm');
        $('.content_body').removeClass('med');
        $('.content_body').addClass('lg')
    });

    return false;
});
    			}
    			catch(e){
    				VVM.debug.error(e);
        		}
            

/* --- End /home/httpd/arch/public/app_frame/webroot/js/text_size.js --- */
/* --- Start /home/httpd/arch/public/app_frame/webroot/js/ContentView.js --- */


            	try {
            		var nl_default = 'enter email',
    nl_newuser = true,
     nl_fbbtnp = false;
// TODO: Convert to use new MVN SSO
$(document).ready( function() {
    $( ".commentlink a" ).click( function() {
        $( "#CommentsContainer").slideDown();
    });
    getNLParent = function(c){ return $(c).closest('.nl_widget'); }
    getNLParentName = function(c){ return getNLParent(c).hasClass('small') ? 'small' : 'large'; }
    getNLOtherParent = function(c){ return $('.nl_widget.'+(getNLParentName(c)=='small'?'large':'small')); }
    getFirstNLName = function(){ return $('.nl_widget:first').hasClass('small') ? 'small' : 'large'; }
    hideNLLoading = function(obj){
        obj.each(function(i){
            $('.ajax_loading', this).remove();
        });
    }
    showNLLoading = function(obj){
        hideNLLoading(obj);
        obj.each(function(i){
            var pos = $(this).position();
            $(this).prepend(
                $('<div/>')
                    .addClass('ajax_loading')
                    .css({
                        'width' : $(this).outerWidth(true),
                        'height': $(this).outerHeight(true),
                        'left'  : pos.left,
                        'top'   : pos.top
                    }
                )
            );
        });
    }
    showNLThanks = function(){
        $('.nl_widget .nl_content').each(function(){
            $(this).html(
                $('<p/>')
                    .html('Thank you.<br/><br/>'+(
                        nl_newuser
                            ? 'Look for your Welcome email with details on how'
                            : '<a href="/village/newsletters/">Login</a> to your account at anytime'
                        )+' to continue to customize your experience'
                    )
                );
        });
    }
    showNLRecommended = function(r){
        nl_newuser = r.newusr;
        if(r.recommending>0){
            var ul_html = '';
            $.each(r.recommend, function(k, nl){
                ul_html += '<li><input type="checkbox" name="nlsubs[]" value="'+nl.et_list_id+'"/> '+nl.name+'</li>';
            });
            $('.nl_widget .nl_content').each(function(){
                $(this)
                    .html('<p>'+r.text+'</p>')
                    .append($('<ul/>')
                        .append($(ul_html))
                    ).append($('<div/>')
                        .addClass('nl_options')
                        .append($('<button/>')
                            .addClass('cancel')
                            .text('No Thanks')
                        ).append($('<button/>')
                            .addClass('next')
                            .text('Subscribe')
                        )
                    );
            });
            $('.nl_widget .nl_options').each(function(){$(this).show();});
        }else{
            showNLThanks();
        }
    }
    $('.nl_widget .nl_fbconnect a').live('click', function(){
        nl_fbbtnp = getNLParentName(this);
    });
    $('.nl_widget input[name="nlemail"]')
        .val(nl_default)
        .focus(function(){
            var p = getNLParent(this);
            $('input[name="nlemail"]', getNLOtherParent(this))
                .val('')
                .blur();
            if($(this).val()==nl_default){
                $(this).val('').css('color', '#000');
                $('.recaptcha_placeholder').html('');
                $('.recaptcha_placeholder', p).append(
                    $('<div id="recaptcha_widget" style="display:none"/>').append(
                        $('<label>reCAPTCHA Security Check</label><br/>')
                    ).append(
                        $('<div id="recaptcha_image"/>')
                    ).append(
                        $('<table class="captchaBar"/>').append(
                            $('<tr/>').append(
                                $('<td/>').append(
                                    $('<input type="text" id="recaptcha_response_field" name="recaptcha_response_field" />')
                                )
                            ).append(
                                $('<td/>').append(
                                    $('<div class="reload"><a href="javascript:Recaptcha.reload()"><img src="/img/reload.png" alt="Get another CAPTCHA"/></a></div>')
                                )
                            ).append(
                                $('<td/>').append(
                                    $('<div class="recaptcha_only_if_image"><a href="javascript:Recaptcha.switch_type(\'audio\')"><img src="/img/audio.png" alt="Get an audio CAPTCHA"/></a></div>')
                                ).append(
                                    $('<div class="recaptcha_only_if_audio"><a href="javascript:Recaptcha.switch_type(\'image\')"><img src="/img/image.png" alt="Get an image CAPTCHA"/></a></div>')
                                )
                            )
                        )
                    )
                );
                Recaptcha.create("6LfmE70SAAAAALaT9GCVvdjZcjCk2bexMIb1pA74", "recaptcha_widget", {theme: "custom", custom_theme_widget: "recaptcha_widget"});
                $('.nl_options', p).show();
            }
        })
        .blur(function(){
            var p = getNLParent(this);
            $('.nl_widget label.error').remove();
            if($(this).val()==''||$(this).val()==nl_default){
                $(this).val(nl_default).css('color', '#999');
                $('.nl_options', p).hide();
                $('.recaptcha_placeholder', p).html('');
            }else{
                $(this).css('color', '#000');
            }
        }
    );
    $('.nl_widget .nl_options button.cancel').live('click', function(){
        var p = getNLParent(this);
        if($('input[name="nlemail"]', p).length){
            $('input[name="nlemail"]', p).val('').blur();
        }else{
            showNLThanks();
        }
    });
    $('.nl_widget input').live('keypress', function(e){
        if(e.keyCode==13){
            $(this).blur();
            $('.nl_options button.next', getNLParent(this)).click();
        }
    });
    $('.nl_widget .nl_options button.next').live('click', function(){
        var p = getNLParent(this),
           pn = getNLParentName(this);
        $('.nl_widget label.error').remove();
        showNLLoading($('.nl_widget .nl_content'));
        if($('.nl_widget input:checkbox').length){
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: '/village/nlSignUp/',
                data: $('input', p).serialize(),
                complete: function(){
                    hideNLLoading($('.nl_widget .nl_content'));
                    showNLThanks();
                }
            });
        }else{
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: '/village/nlSignUp/',
                data: $('input', p).serialize(),
                success: function(r){
                    hideNLLoading($('.nl_widget .nl_content'));
                    if(r.status=='success'){
                        showNLRecommended(r);
                    }else if(r.status=='error'){
                        Recaptcha.reload();
                        if(r.error.input=='email'){
                            $('.nl_widget.'+pn+' input[name="nlemail"]').before(
                                $('<label/>').addClass('error').text(r.error.msg)
                            );
                        }else{
                            $('.nl_widget.'+pn+' .recaptcha_placeholder label').after(
                                $('<label/>').addClass('error').text(' - '+r.error.msg)
                            );
                        }
                    }else{
                        $('.nl_widget.'+pn+' input[name="nlemail"]').before(
                            $('<label/>').addClass('error').text('Error, please try again')
                        );
                        $('.nl_widget.'+pn+' input[name="nlemail"]')
                            .val('')
                            .blur();
                    }
                },
                fail: function(){
                    hideNLLoading($('.nl_widget .nl_content'));
                    $('.nl_widget.'+pn+' input[name="nlemail"]').before(
                        $('<label/>').addClass('error').text('Error, please try again')
                    );
                    $('.nl_widget.'+pn+' input[name="nlemail"]')
                        .val('')
                        .blur();
                }
            });
        }
    });
});
$(window).load(function() {
    $('.dsq-login-link').html('<a onclick="DISQUS.dtpl.actions.fire(\'auth.disqus\'); return false" href="#"><span class="dsq-toolbar-icon"></span><span class="dsq-toolbar-label">Login</span></a>');
});
    			}
    			catch(e){
    				VVM.debug.error(e);
        		}
            

/* --- End /home/httpd/arch/public/app_frame/webroot/js/ContentView.js --- */
/* --- Start /home/httpd/arch/public/app_frame/webroot/js/jcarousel.js --- */


            	try {
            		/*!
 * jCarousel - Riding carousels with jQuery
 *   http://sorgalla.com/jcarousel/
 *
 * Copyright (c) 2006 Jan Sorgalla (http://sorgalla.com)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Built on top of the jQuery library
 *   http://jquery.com
 *
 * Inspired by the "Carousel Component" by Bill Scott
 *   http://billwscott.com/carousel/
 */

(function($){$.fn.jcarousel=function(o){if(typeof o=='string'){var instance=$(this).data('jcarousel'),args=Array.prototype.slice.call(arguments,1);return instance[o].apply(instance,args);}else
return this.each(function(){$(this).data('jcarousel',new $jc(this,o));});};var defaults={vertical:false,start:1,offset:1,size:null,scroll:3,visible:null,animation:'normal',easing:'swing',auto:0,wrap:null,initCallback:null,reloadCallback:null,itemLoadCallback:null,itemFirstInCallback:null,itemFirstOutCallback:null,itemLastInCallback:null,itemLastOutCallback:null,itemVisibleInCallback:null,itemVisibleOutCallback:null,buttonNextHTML:'<div></div>',buttonPrevHTML:'<div></div>',buttonNextEvent:'click',buttonPrevEvent:'click',buttonNextCallback:null,buttonPrevCallback:null};$.jcarousel=function(e,o){this.options=$.extend({},defaults,o||{});this.locked=false;this.container=null;this.clip=null;this.list=null;this.buttonNext=null;this.buttonPrev=null;this.wh=!this.options.vertical?'width':'height';this.lt=!this.options.vertical?'left':'top';var skin='',split=e.className.split(' ');for(var i=0;i<split.length;i++){if(split[i].indexOf('jcarousel-skin')!=-1){$(e).removeClass(split[i]);skin=split[i];break;}}if(e.nodeName=='UL'||e.nodeName=='OL'){this.list=$(e);this.container=this.list.parent();if(this.container.hasClass('jcarousel-clip')){if(!this.container.parent().hasClass('jcarousel-container'))this.container=this.container.wrap('<div></div>');this.container=this.container.parent();}else if(!this.container.hasClass('jcarousel-container'))this.container=this.list.wrap('<div></div>').parent();}else{this.container=$(e);this.list=this.container.find('ul,ol').eq(0);}if(skin!=''&&this.container.parent()[0].className.indexOf('jcarousel-skin')==-1)this.container.wrap('<div class=" '+skin+'"></div>');this.clip=this.list.parent();if(!this.clip.length||!this.clip.hasClass('jcarousel-clip'))this.clip=this.list.wrap('<div></div>').parent();this.buttonNext=$('.jcarousel-next',this.container);if(this.buttonNext.size()==0&&this.options.buttonNextHTML!=null)this.buttonNext=this.clip.after(this.options.buttonNextHTML).next();this.buttonNext.addClass(this.className('jcarousel-next'));this.buttonPrev=$('.jcarousel-prev',this.container);if(this.buttonPrev.size()==0&&this.options.buttonPrevHTML!=null)this.buttonPrev=this.clip.after(this.options.buttonPrevHTML).next();this.buttonPrev.addClass(this.className('jcarousel-prev'));this.clip.addClass(this.className('jcarousel-clip')).css({overflow:'hidden',position:'relative'});this.list.addClass(this.className('jcarousel-list')).css({overflow:'hidden',position:'relative',top:0,left:0,margin:0,padding:0});this.container.addClass(this.className('jcarousel-container')).css({position:'relative'});var di=this.options.visible!=null?Math.ceil(this.clipping()/this.options.visible):null;var li=this.list.children('li');var self=this;if(li.size()>0){var wh=0,i=this.options.offset;li.each(function(){self.format(this,i++);wh+=self.dimension(this,di);});this.list.css(this.wh,wh+'px');if(!o||o.size===undefined)this.options.size=li.size();}this.container.css('display','block');this.buttonNext.css('display','block');this.buttonPrev.css('display','block');this.funcNext=function(){self.next();};this.funcPrev=function(){self.prev();};this.funcResize=function(){self.reload();};if(this.options.initCallback!=null)this.options.initCallback(this,'init');if($.browser.safari){this.buttons(false,false);$(window).bind('load.jcarousel',function(){self.setup();});}else
this.setup();};var $jc=$.jcarousel;$jc.fn=$jc.prototype={jcarousel:'0.2.4'};$jc.fn.extend=$jc.extend=$.extend;$jc.fn.extend({setup:function(){this.first=null;this.last=null;this.prevFirst=null;this.prevLast=null;this.animating=false;this.timer=null;this.tail=null;this.inTail=false;if(this.locked)return;this.list.css(this.lt,this.pos(this.options.offset)+'px');var p=this.pos(this.options.start);this.prevFirst=this.prevLast=null;this.animate(p,false);$(window).unbind('resize.jcarousel',this.funcResize).bind('resize.jcarousel',this.funcResize);},reset:function(){this.list.empty();this.list.css(this.lt,'0px');this.list.css(this.wh,'10px');if(this.options.initCallback!=null)this.options.initCallback(this,'reset');this.setup();},reload:function(){if(this.tail!=null&&this.inTail)this.list.css(this.lt,$jc.intval(this.list.css(this.lt))+this.tail);this.tail=null;this.inTail=false;if(this.options.reloadCallback!=null)this.options.reloadCallback(this);if(this.options.visible!=null){var self=this;var di=Math.ceil(this.clipping()/this.options.visible),wh=0,lt=0;$('li',this.list).each(function(i){wh+=self.dimension(this,di);if(i+1<self.first)lt=wh;});this.list.css(this.wh,wh+'px');this.list.css(this.lt,-lt+'px');}this.scroll(this.first,false);},lock:function(){this.locked=true;this.buttons();},unlock:function(){this.locked=false;this.buttons();},size:function(s){if(s!=undefined){this.options.size=s;if(!this.locked)this.buttons();}return this.options.size;},has:function(i,i2){if(i2==undefined||!i2)i2=i;if(this.options.size!==null&&i2>this.options.size)i2=this.options.size;for(var j=i;j<=i2;j++){var e=this.get(j);if(!e.length||e.hasClass('jcarousel-item-placeholder'))return false;}return true;},get:function(i){return $('.jcarousel-item-'+i,this.list);},add:function(i,s){var e=this.get(i),old=0,add=0;if(e.length==0){var c,e=this.create(i),j=$jc.intval(i);while(c=this.get(--j)){if(j<=0||c.length){j<=0?this.list.prepend(e):c.after(e);break;}}}else
old=this.dimension(e);e.removeClass(this.className('jcarousel-item-placeholder'));typeof s=='string'?e.html(s):e.empty().append(s);var di=this.options.visible!=null?Math.ceil(this.clipping()/this.options.visible):null;var wh=this.dimension(e,di)-old;if(i>0&&i<this.first)this.list.css(this.lt,$jc.intval(this.list.css(this.lt))-wh+'px');this.list.css(this.wh,$jc.intval(this.list.css(this.wh))+wh+'px');return e;},remove:function(i){var e=this.get(i);if(!e.length||(i>=this.first&&i<=this.last))return;var d=this.dimension(e);if(i<this.first)this.list.css(this.lt,$jc.intval(this.list.css(this.lt))+d+'px');e.remove();this.list.css(this.wh,$jc.intval(this.list.css(this.wh))-d+'px');},next:function(){this.stopAuto();if(this.tail!=null&&!this.inTail)this.scrollTail(false);else
this.scroll(((this.options.wrap=='both'||this.options.wrap=='last')&&this.options.size!=null&&this.last==this.options.size)?1:this.first+this.options.scroll);},prev:function(){this.stopAuto();if(this.tail!=null&&this.inTail)this.scrollTail(true);else
this.scroll(((this.options.wrap=='both'||this.options.wrap=='first')&&this.options.size!=null&&this.first==1)?this.options.size:this.first-this.options.scroll);
},scrollTail:function(b){if(this.locked||this.animating||!this.tail)return;
var pos=$jc.intval(this.list.css(this.lt));
!b?pos-=this.tail:pos+=this.tail;
this.inTail=!b;
this.prevFirst=this.first;
this.prevLast=this.last;
this.animate(pos);
},scroll:function(i,a){if(this.locked||this.animating)return;
this.animate(this.pos(i),a);
},pos:function(i){var pos=$jc.intval(this.list.css(this.lt));
if(this.locked||this.animating)return pos;
if(this.options.wrap!='circular')i=i<1?1:(this.options.size&&i>this.options.size?this.options.size:i);
var back=this.first>i;
var f=this.options.wrap!='circular'&&this.first<=1?1:this.first;
var c=back?this.get(f):this.get(this.last);
var j=back?f:f-1;
var e=null,l=0,p=false,d=0,g;
while(back?--j>=i:++j<i){e=this.get(j);
p=!e.length;
if(e.length==0){e=this.create(j).addClass(this.className('jcarousel-item-placeholder'));
c[back?'before':'after'](e);
if(this.first!=null&&this.options.wrap=='circular'&&this.options.size!==null&&(j<=0||j>this.options.size)){g=this.get(this.index(j));
if(g.length)this.add(j,g.children().clone(true));
}}c=e;
d=this.dimension(e);
if(p)l+=d;
if(this.first!=null&&(this.options.wrap=='circular'||(j>=1&&(this.options.size==null||j<=this.options.size))))pos=back?pos+d:pos-d;
}var clipping=this.clipping();
var cache=[];
var visible=0,j=i,v=0;
var c=this.get(i-1);
while(++visible){e=this.get(j);
p=!e.length;
if(e.length==0){e=this.create(j).addClass(this.className('jcarousel-item-placeholder'));
c.length==0?this.list.prepend(e):c[back?'before':'after'](e);
if(this.first!=null&&this.options.wrap=='circular'&&this.options.size!==null&&(j<=0||j>this.options.size)){g=this.get(this.index(j));
if(g.length)this.add(j,g.find('>*').clone(true));
}}c=e;
var d=this.dimension(e);
if(d==0){VVM.debug.p('jCarousel: No width/height set for items. This will cause an infinite loop. Aborting...');
return 0;
}if(this.options.wrap!='circular'&&this.options.size!==null&&j>this.options.size)cache.push(e);
else if(p)l+=d;
v+=d;
if(v>=clipping)break;
j++;
}for(var x=0;
x<cache.length;
x++)cache[x].remove();
if(l>0){this.list.css(this.wh,this.dimension(this.list)+l+'px');
if(back){pos-=l;
this.list.css(this.lt,$jc.intval(this.list.css(this.lt))-l+'px');
}}var last=i+visible-1;
if(this.options.wrap!='circular'&&this.options.size&&last>this.options.size)last=this.options.size;
if(j>last){visible=0,j=last,v=0;
while(++visible){var e=this.get(j--);
if(!e.length)break;
v+=this.dimension(e);
if(v>=clipping)break;
}}var first=last-visible+1;
if(this.options.wrap!='circular'&&first<1)first=1;
if(this.inTail&&back){pos+=this.tail;
this.inTail=false;
}this.tail=null;
if(this.options.wrap!='circular'&&last==this.options.size&&(last-visible+1)>=1){var m=$jc.margin(this.get(last),!this.options.vertical?'marginRight':'marginBottom');
if((v-m)>clipping)this.tail=v-clipping-m;
}while(i-->first)pos+=this.dimension(this.get(i));
this.prevFirst=this.first;
this.prevLast=this.last;
this.first=first;
this.last=last;
return pos;
},animate:function(p,a){if(this.locked||this.animating)return;
this.animating=true;
var self=this;
var scrolled=function(){self.animating=false;
if(p==0)self.list.css(self.lt,0);
if(self.options.wrap=='circular'||self.options.wrap=='both'||self.options.wrap=='last'||self.options.size==null||self.last<self.options.size)self.startAuto();
self.buttons();
self.notify('onAfterAnimation');
};
this.notify('onBeforeAnimation');
if(!this.options.animation||a==false){this.list.css(this.lt,p+'px');
scrolled();
}else{var o=!this.options.vertical?{'left':p}:{'top':p};
this.list.animate(o,this.options.animation,this.options.easing,scrolled);
}},startAuto:function(s){if(s!=undefined)this.options.auto=s;
if(this.options.auto==0)return this.stopAuto();
if(this.timer!=null)return;
var self=this;
this.timer=setTimeout(function(){self.next();
},this.options.auto*1000);
},stopAuto:function(){if(this.timer==null)return;
clearTimeout(this.timer);
this.timer=null;
},buttons:function(n,p){if(n==undefined||n==null){var n=!this.locked&&this.options.size!==0&&((this.options.wrap&&this.options.wrap!='first')||this.options.size==null||this.last<this.options.size);
if(!this.locked&&(!this.options.wrap||this.options.wrap=='first')&&this.options.size!=null&&this.last>=this.options.size)n=this.tail!=null&&!this.inTail;
}if(p==undefined||p==null){var p=!this.locked&&this.options.size!==0&&((this.options.wrap&&this.options.wrap!='last')||this.first>1);
if(!this.locked&&(!this.options.wrap||this.options.wrap=='last')&&this.options.size!=null&&this.first==1)p=this.tail!=null&&this.inTail;
}var self=this;
this.buttonNext[n?'bind':'unbind'](this.options.buttonNextEvent+'.jcarousel',this.funcNext)[n?'removeClass':'addClass'](this.className('jcarousel-next-disabled')).attr('disabled',n?false:true);
this.buttonPrev[p?'bind':'unbind'](this.options.buttonPrevEvent+'.jcarousel',this.funcPrev)[p?'removeClass':'addClass'](this.className('jcarousel-prev-disabled')).attr('disabled',p?false:true);
if(this.buttonNext.length>0&&(this.buttonNext[0].jcarouselstate==undefined||this.buttonNext[0].jcarouselstate!=n)&&this.options.buttonNextCallback!=null){this.buttonNext.each(function(){self.options.buttonNextCallback(self,this,n);
});
this.buttonNext[0].jcarouselstate=n;
}if(this.buttonPrev.length>0&&(this.buttonPrev[0].jcarouselstate==undefined||this.buttonPrev[0].jcarouselstate!=p)&&this.options.buttonPrevCallback!=null){this.buttonPrev.each(function(){self.options.buttonPrevCallback(self,this,p);
});
this.buttonPrev[0].jcarouselstate=p;
}},notify:function(evt){var state=this.prevFirst==null?'init':(this.prevFirst<this.first?'next':'prev');
this.callback('itemLoadCallback',evt,state);
if(this.prevFirst!==this.first){this.callback('itemFirstInCallback',evt,state,this.first);
this.callback('itemFirstOutCallback',evt,state,this.prevFirst);
}if(this.prevLast!==this.last){this.callback('itemLastInCallback',evt,state,this.last);
this.callback('itemLastOutCallback',evt,state,this.prevLast);
}this.callback('itemVisibleInCallback',evt,state,this.first,this.last,this.prevFirst,this.prevLast);
this.callback('itemVisibleOutCallback',evt,state,this.prevFirst,this.prevLast,this.first,this.last);
},callback:function(cb,evt,state,i1,i2,i3,i4){if(this.options[cb]==undefined||(typeof this.options[cb]!='object'&&evt!='onAfterAnimation'))return;
var callback=typeof this.options[cb]=='object'?this.options[cb][evt]:this.options[cb];
if(!$.isFunction(callback))return;
var self=this;
if(i1===undefined)callback(self,state,evt);
else if(i2===undefined)this.get(i1).each(function(){callback(self,this,i1,state,evt);
});
else{for(var i=i1;
i<=i2;
i++)if(i!==null&&!(i>=i3&&i<=i4))this.get(i).each(function(){callback(self,this,i,state,evt);
});
}},create:function(i){return this.format('<li></li>',i);
},format:function(e,i){var $e=$(e).addClass(this.className('jcarousel-item')).addClass(this.className('jcarousel-item-'+i)).css({'float':'left','list-style':'none'});
$e.attr('jcarouselindex',i);
return $e;
},className:function(c){return c+' '+c+(!this.options.vertical?'-horizontal':'-vertical');
},dimension:function(e,d){var el=e.jquery!=undefined?e[0]:e;
var old=!this.options.vertical?el.offsetWidth+$jc.margin(el,'marginLeft')+$jc.margin(el,'marginRight'):el.offsetHeight+$jc.margin(el,'marginTop')+$jc.margin(el,'marginBottom');
if(d==undefined||old==d)return old;
var w=!this.options.vertical?d-$jc.margin(el,'marginLeft')-$jc.margin(el,'marginRight'):d-$jc.margin(el,'marginTop')-$jc.margin(el,'marginBottom');
$(el).css(this.wh,w+'px');
return this.dimension(el);
},clipping:function(){return!this.options.vertical?this.clip[0].offsetWidth-$jc.intval(this.clip.css('borderLeftWidth'))-$jc.intval(this.clip.css('borderRightWidth')):this.clip[0].offsetHeight-$jc.intval(this.clip.css('borderTopWidth'))-$jc.intval(this.clip.css('borderBottomWidth'));
},index:function(i,s){if(s==undefined)s=this.options.size;
return Math.round((((i-1)/s)-Math.floor((i-1)/s))*s)+1;
}});
$jc.extend({defaults:function(d){return $.extend(defaults,d||{});
},margin:function(e,p){if(!e)return 0;
var el=e.jquery!=undefined?e[0]:e;
if(p=='marginRight'&&$.browser.safari){var old={'display':'block','float':'none','width':'auto'},oWidth,oWidth2;
$.swap(el,old,function(){oWidth=el.offsetWidth;
});
old['marginRight']=0;
$.swap(el,old,function(){oWidth2=el.offsetWidth;
});
return oWidth2-oWidth;
}return $jc.intval($.css(el,p));
},intval:function(v){v=parseInt(v);
return isNaN(v)?0:v;
}});
})(jQuery);


    			}
    			catch(e){
    				VVM.debug.error(e);
        		}
            

/* --- End /home/httpd/arch/public/app_frame/webroot/js/jcarousel.js --- */
/* --- Start /home/httpd/arch/public/app_frame/webroot/js/TopStoriesWidget.js --- */


            	try {
            		$(document).ready(function(){
	$('.top_stories_jCarouselLite').show();
//	$('.top_stories_jCarouselLite').jCarouselLite({btnNext: ".top_stories_jCarouselLite_next", btnPrev: ".top_stories_jCarouselLite_prev", visible:4});
});


$(function(){
	VVM.adslider = {};
	VVM.adslider.runningCount   = 0;
	VVM.adslider.ajaxEnabled    = true;
	VVM.adslider.defaults		= false;
	VVM.adslider.sliderEnabled  = true;
	VVM.adslider.nextCount 		= 3;
	VVM.adslider.fireEvery 		= 2;
	VVM.adslider.ajaxUrl 		= '/services/AjaxTopStoriesWidget/';
	VVM.adslider.nextEl	 		= $('.top_stories_jCarouselLite_next');
	VVM.adslider.prevEl			= $('.top_stories_jCarouselLite_prev');
	VVM.adslider.loadingEl	    = $('#TopStoriesSliderLoading');
	VVM.adslider.containerEl	= $('.top_stories_jCarouselLite');
	VVM.adslider.el				= $('.top_stories_jCarouselLite_el');
	VVM.adslider.totalSlides	= $('#totalSlides').val();
	VVM.adslider.getAjaxUrl		= function(){
		VVM.debug.p('Generating URL');
		var url = VVM.adslider.ajaxUrl+'limit:'+VVM.adslider.fireEvery+'/offset:'+VVM.adslider.runningCount+'/section:'+$('#topStoriesSection').val()+'/';
		VVM.debug.p('URL Generated: '+url);
		return url;
	};
});




$(function(){    
  
     VVM.debug.prv(VVM.adslider, 'adslider config:');    
    
	function mycarousel_initCallback(carousel) {
	    VVM.adslider.runningCount = $('.top_stories_jCarouselLite li').length;
        jQuery(VVM.adslider.nextEl).bind('click', function() {
            VVM.debug.p('Next clicked');
            if(VVM.adslider.ajaxEnabled == false){
                carousel.next();
                VVM.debug.p('Ajax is disabled... bypassing click event.');
                return false;
            }	     
            var omfg = VVM.adslider.nextCount%VVM.adslider.fireEvery;
            
            if(omfg == 0){
                VVM.debug.p('Slider: Processing ajax for slider');            
                var url = VVM.adslider.getAjaxUrl();
                var cb  = function(callback){
                    for(i in callback){	
                        if(callback[i] == null){
                            continue;
                        }
                        VVM.debug.p('Callback: '+callback);                        
                        //carousel.options.size = parseInt(carousel.options.size)+1;
                        VVM.adslider.runningCount++;
                        carousel.add(VVM.adslider.runningCount, callback[i]);
                    }				
                    //VVM.debug.p('New Size: '+carousel.options.size);
                    carousel.size(VVM.adslider.runningCount);
                };
                $.ajax({
                    url:url,
                    dataType:'json',
                    success:cb
                });
            }
            VVM.adslider.nextCount++;
            VVM.debug.p('Next count: '+VVM.adslider.nextCount+' running count: '+VVM.adslider.runningCount+' Items: '+$('.item_el').length);
            carousel.next();
            return false;
        });

	    jQuery(VVM.adslider.prevEl).bind('click', function() {
            VVM.debug.p('Prev clicked');
	        carousel.prev();
	        return false;
	    });
        VVM.debug.p('Slider loaded with '+VVM.adslider.runningCount+' records from controller.');	    
	};

	function mycarousel_itemAddCallback(carousel, first, last, data)
	{
	    if (first == 1) {
	        var plural = data.length == 1 ? '' : 's';
	        jQuery('.results', carousel.container).html(data.length + ' photo' + plural + ' found');

	        // Set size
	        if (data.length == 0) {
	            // Add a "no results" feedback as first item if data is empty
	            carousel.size(1);
	            carousel.add(1, '<p>No results</p>');
	            return;
	        } else {
	            carousel.size(data.length);
	        }
	    }

	    for (var i = first; i <= last; i++) {
	        if (data[i - 1] == undefined) {
	            break;
	        }

	        carousel.add(i, mycarousel_decodeEntities(data[i - 1].description));
	    }
	};
	
    if( $(VVM.adslider.loadingEl).length ){
        $(VVM.adslider.loadingEl).hide();        
    }
    if($(VVM.adslider.containerEl).length){
	    $(VVM.adslider.containerEl).show();        
    }
    if ( VVM.adslider.sliderEnabled == true) {
        if($( VVM.adslider.el ).length){
            $( VVM.adslider.el ).jcarousel({
                animation:'fast',
                scroll:1 ,
                initCallback:mycarousel_initCallback,
                buttonNextHTML:null,
                buttonPrevHTML:null,
                wrap:'both'
            });            
        }
    }else{
            VVM.debug.p('Slider disbaled');
         $( $(VVM.adslider.nextEl) ).click ( function() {
                return false; //disable the anchor     
          });
         $( $(VVM.adslider.prevEl) ).click ( function() {
                return false; //disable the anchor     
          });          
    }
});

/*


*/
    			}
    			catch(e){
    				VVM.debug.error(e);
        		}
            

/* --- End /home/httpd/arch/public/app_frame/webroot/js/TopStoriesWidget.js --- */
/* --- Start /home/httpd/arch/public/app_frame/webroot/js/ConcertCalendarWidget.js --- */


            	try {
            		(function ($, window) {
    window.ConcertCalendar = function (opts) {
        this.opts = $.extend(this.defaultOpts, opts);
        var self = this;

        // set base elements
        this.$contentContainer = $('#concertCalendarData');
        this.$returnToCalendar = $('#return-to-calendar');

        var $currentDay = $('.dayOfWeek.active');
        if ($currentDay.length){
            var d = this.parseDateString($currentDay.attr('data-id'));
            this.opts = {date: d};
            this.responseCache[this.serializeOpts()] = this.$contentContainer.html();
        }

        // bind event handlers
        $(window).bind('hashchange', function () {
            self.checkHash();
        });
        self.checkHash();
        $('.shuffleArrow, .dayOfWeek').click(function () {
            self.setHashOpts({date: $(this).attr('data-id') });
        });
        this.$returnToCalendar.click(function () {
            $(this).hide();
            self.setHashOpts('restore');
        });

        // stuff that has to wait until the DOM is ready, but will be called by
        // the widget after it's inserted into the dom
        $(function () {
            self.initSearchForm();
        });

    };

    window.ConcertCalendar.prototype = {
        defaultOpts: {
            date: new Date(),
            sort: 'price',
            dir: 'asc',
            keywords: false,
            artist: false,
            venue: false,
            limit: 50
        },
        currentWeek: {
            start: null,
            end: null
        },
        __months: [
            'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
        ],
        __weekdays: [
            'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'
        ],
        __milliseconds: {
            day: 86400000,
            week: 604800000
        },
        search: {
            keywordDefault: 'Keyword Search',
            $form: null,
            $keywords: null,
            $artist: null,
            $venue: null
        },
        responseCache: {},
        dateRegExp: new RegExp(/(\d{4})-(\d{2})-(\d{2})/),
        chooseDate: function (date, sort, dir) {
            if (typeof date === 'string') {
                date = this.parseDateString(date);
            }
            // make sure date is a date
            if (!date instanceof Date) {
                return false;
            }
            this.$returnToCalendar.hide();

            var self = this;
            // refresh the content on screen
            this.refreshHtml(function () {
                var $dateButtons = $('.dayOfWeek').removeClass('active');
                var dateString   = self.formatDateString(self.opts.date);
                var dayButtonQry   = '.dayOfWeek[data-id="' + dateString + '"]';
                var prevWeek, nextWeek;

                if ($(dayButtonQry).length) {
                    $(dayButtonQry).addClass('active');
                } else {
                    //Change week's dates displayed
                    var tempDate = new Date(self.opts.date);
                    $dateButtons.each(function () {
                        var $this = $(this);
                        $this.attr('data-id', self.formatDateString(tempDate));
                        $('div', $this).text(self.getWeekdayText(tempDate));
                        $('span',$this).text(tempDate.getUTCDate());
                        tempDate.setUTCDate(tempDate.getUTCDate()+1);
                    });
                    //Populate Next Week button
                    $('.shuffleRight').attr('data-id', self.formatDateString(tempDate));
                    
                    var current = self.currentDate(), m = self.__milliseconds;
                    
                    // calculate the previous week
                    var daysBackAvailable = (self.opts.date.getTime() - current.getTime()) / m.day;
                    if (daysBackAvailable > 0){
                        var daysBack = (daysBackAvailable > 7) ? 7 : daysBackAvailable;
                        prevWeek = new Date(self.opts.date.getTime() - (daysBack * m.day));
                        $('.shuffleLeft').attr('data-id', self.formatDateString(prevWeek) ).show();
                    } else {
                        $('.shuffleLeft').hide();
                    }
                    
                    $(dayButtonQry).addClass('active');

                }
                
                // set the date shown on screen
                $('#monthShown').text(self.getMonthText(self.opts.date));

            });
        },
        currentDate: function(){
            var current = new Date();
            current.setHours(0, -current.getTimezoneOffset(), 0, 0); // today@midnight UTC
            return current;
        },
        formatDateString: function (date) {
            if (date instanceof Date){
                var month = date.getUTCMonth()+1;
                var day = date.getUTCDate();
                return date.getUTCFullYear() + '-' + ( month > 9 ? month : '0'+month ) + '-' + ( day > 9 ? day : '0'+day );
            }
            if (typeof date === 'string'){
                return date;
            }
        },
        parseDateString: function (date) {
            if (typeof date == 'string' && this.dateRegExp.test(date)) {
                var matches = this.dateRegExp.exec(date);
                date = new Date();
                date.setUTCHours(0, 0, 0, 0, 0);
                date.setUTCFullYear(parseInt(matches[1], 10), parseInt(matches[2], 10)-1, parseInt(matches[3], 10));
            }
            return (date instanceof Date) ? date : false;
        },
        getMonthText: function (date) {
            return this.__months[date.getUTCMonth()];
        },
        getWeekdayText: function (date) {
            return this.__weekdays[date.getUTCDay()];
        },
        refreshSearchUi: function () {
            if (this.search.$form && this.search.$form.length){
                if (this.opts.keywords){
                    this.search.$keywords.val(this.opts.keywords);
                } else {
                    this.search.$keywords.val(this.search.keywordDefault);
                }
                this.search.$artist.find(':selected').prop('selected', false);
                if (this.opts.artist){
                    this.search.$artist.find('[value="'+this.opts.artist+'"]').prop('selected', true);
                }
                this.search.$venue.find(':selected').prop('selected', false);
                if (this.opts.venue){
                    this.search.$venue.find('[value="'+this.opts.venue+'"]').prop('selected', true);
                }
            }
        },
        attachContentEventHandlers: function(){
            var self = this;

        },
        clearOtherInputs: function ($input){
            if (!$input.is(this.search.$keywords)){
                this.search.$keywords.val(this.search.keywordDefault);
            }
            this.search.$form.find('select').not($input).find('option:selected').prop('selected', false);
        },
        checkHash: function (opts){
            var update = this.getUpdatedHashVars();
            if (update !== false){
                if (update.date){
                    this.chooseDate(update.date, update.sort, update.dir);
                } else if ( update.keywords || update.artist || update.venue ) {
                    this.doSearch({
                        keywords: update.keywords,
                        artist:   update.artist,
                        venue: update.venue,
                        sort: update.sort,
                        dir: update.dir,
                        limit: update.limit
                    });
                } else {
                    this.setHashOpts('clear');
                }
            }
        },
        setHashOpts: function (opts, stash){
            if (typeof opts === 'string'){
                stash = opts;
                opts = {};
            }
            switch(stash){
                case 'once':
                    this.hashStash = this.hashStash || this.opts;
                    break;
                case 'restore':
                    opts = $.extend(opts, this.hashStash || {});
                    this.hashStash = null;
                    break;
            }
            /*
            var name;
            for (name in opts) {
                if (name == 'date' && typeof opts[name] === 'string'){
                    this.opts.date = this.parseDateString(opts.date)
                } else {
                    this.opts[name] = opts[name];
                }
            }
             */
            // set hash
            window.location.hash = this.serializeOpts(opts);
        },
        serializeOpts: function (opts){
            if (!opts) opts = this.opts;
            // create hash
            var hash = '', names = [], name, i;
            for (name in opts){
                if (opts[name]){
                    names.push(name);
                }
            }
            names.sort();
            for ( i = 0 ; i < names.length ; i++ ) {
                name = names[i];
                switch(name){
                    case 'date':
                        hash+= 'date:'+this.formatDateString(opts.date)+'/';
                        break;
                    case 'sort':
                    case 'dir':
                    case 'type':
                    case 'keywords':
                    case 'artist':
                    case 'venue':
                        if (opts[name]){
                            hash+= name+':'+this.escape(opts[name])+'/';
                        }
                        break;
                    case 'limit':
                        if (opts.limit && !opts.date){
                            hash+= 'limit:'+opts.limit+'/';
                        }
                        break;
                }
            }
            return hash ? '/'+hash : '';
        },
        refreshHtml: function (callback){
            if (this.activeAjax && this.activeAjax.abort){
                this.activeAjax.abort();
            } else {
                this.$contentContainer.fadeTo(0, 0.4);
            }

            var self = this;
            var url = "/events/ConCalWidgetAjax";
            var opts = this.serializeOpts();
            var success = function (html) {
                self.responseCache[opts] = html;
                self.$contentContainer.html(html);
                self.refreshSearchUi();
                self.attachContentEventHandlers();
                if (callback){
                    callback();
                }
            };
            var complete = function (jqXHR, textStatus){
                self.htmlUpdated(jqXHR, textStatus);
            };

            if (this.responseCache[opts]){
                success(this.responseCache[opts]);
                complete(null, "notmodified");
            } else {
                this.activeAjax = $.ajax({
                    url: url+opts,
                    dataType: 'html',
                    success: success,
                    error: function (jqXHR, textStatus, errorThrown) {
                        // need to handle errors
                        //callback();
                    },
                    complete: complete
                });
            }
        },
        htmlUpdated: function (jqXHR, textStatus){
            switch(textStatus){
                case "success":
                case "notmodified":
                    this.$contentContainer.fadeTo(0, 1);
                    typeof QueryTiqiq !== 'undefined' ? QueryTiqiq(false) : null;
                    break;
                case "error":
                case "timeout":
                case "abort":
                case "parsererror":
                    break;
            }
            this.activeAjax = null;
        },
        getUpdatedHashVars: function () {
            var hash = window.location.hash;
            var regEx = new RegExp(/\/?([\w-]+)\:([^\/]+)\/?/g);
            var name, value, matches, hashVars = {}, hashVarCount = 0, currentVarCount = 0;
            do {
                matches = regEx.exec(hash);
                if (matches) {
                    if (matches[1] == 'date'){
                        hashVars.date = this.parseDateString(this.unescape(matches[2]));
                    } else {
                        hashVars[this.unescape(matches[1])] = this.unescape(matches[2]);
                    }
                    hashVarCount = hashVarCount + 1;
                }
            } while(matches);

            var diff = false;
            for (name in this.opts){
                if (hashVars.hasOwnProperty(name)){
                    if (name == 'date') {
                        if (this.formatDateString(hashVars[name]) !== this.formatDateString(this.opts.date)) {
                            diff = true;
                        }
                    } else {
                        if (hashVars[name] !== this.opts[name]) {
                            diff = true;
                        }
                    }
                } else {
                    diff = true;
                }
                currentVarCount = currentVarCount + 1;
            }
            if ( diff || currentVarCount !== hashVarCount ){
                this.opts = (hashVarCount == 0) ? { date: this.currentDate() } : hashVars;
                return this.opts;
            } else {
                return false;
            }
            
        },
        escape: function (val){
            return isNaN(val) ? window.escape(val.replace(/ /g, '+')).replace(/\%26/g, '%2526') : val;
        },
        unescape: function (val){
            return isNaN(val) ? window.unescape(val).replace(/\+/g, ' ').replace(/\%26/g, '&') : val;
        }
    };
})(jQuery, window);
    			}
    			catch(e){
    				VVM.debug.error(e);
        		}
            

/* --- End /home/httpd/arch/public/app_frame/webroot/js/ConcertCalendarWidget.js --- */
/* --- Start /home/httpd/arch/public/app_frame/webroot/js/Comments.js --- */


            	try {
            		
$(document).ready(function(){	
	if($('.CommentShowButton').length){
		$('.CommentShowButton').click(function(){
			var isOpen = (document.getElementById('CommentsContainer').style.display == 'none') ? false : true;
			if(isOpen == false){
				$('#CommentsContainer').slideDown('slow');			
			}else{
				$('#CommentsContainer').slideUp('slow');				
			}
			//If we're the top CommentsShowButton, we need to refocus the window 
			$('#CommentsContainer').focus();
		});		
	}
	
	if($('#CommentCreateButton').length){
		$('#CommentCreateButton').click(function(){
			var isOpen = (document.getElementById('CommentCreateContainer').style.display == 'none') ? false : true;			
			if(isOpen == false){
				$('#CommentCreateContainer').slideDown('slow');				
				document.getElementById('CommentCreateButton').innerHTML = '<a>Cancel Creating Comment</a>';
			}else{
				$('#CommentCreateContainer').slideUp('slow');		
				document.getElementById('CommentCreateButton').innerHTML = '<a>Post Comment</a>';				
			}
		});
	}
    $( "#CommentAddForm input#name, #CommentAddForm input#email, #CommentAddForm #city, #CommentAddForm #comment" ).focus( function() {
        if ( $("#captcha_container_div").html().length == 0 ) {
            var SESSION_ID = $("#sessid").val();
            $("#captcha_container_div").append( "<img src='/comments/captcha/?" + SESSION_ID + "' />" );
        }
    });
	
//	if($('#CommentsShowAllButton').length){
		$('#CommentsShowAllButton').click(function(){
			var id 		= $('#CommentsObjid').val();
			var type	= $('#CommentsType').val();
			var url		= '/comments/AjaxCommentsForIdAndType/'+id+'/'+type+'/'			
			$('#CommentsList').after('<img src="http://assets.villagevoice.com/img/ajax-loader.gif" class="CommentsFeedbackImg">');
			$('#CommentsList').load(url, '', function(responseText, textStatus, XMLHttpRequest){
				$('#CommentsListContainer').hide();
				$('.CommentsHeader').hide();
				$('#CommentsList').html(responseText);
				$('.CommentsFeedbackImg').hide();
				$('#CommentsListContainer').slideDown('slow');
			});
		});
//	}
	
	if($('#CommentAddForm').length){
		$('#CommentAddForm').submit(function(){
			$('.CommentInputError').hide();
			var fields = {
				name:'Name is required',
				emailx:'Email is required',
				//state:'State is required',
				//age:'Age is required',
				comment:'Give us your comment',
				captcha:'Please validate that you\'re a human'
			};
			var errors = [];
			for(fieldName in fields){
				if($('#'+fieldName).val().length < 1){
					$('#'+fieldName+'lbl').after('<span class="CommentInputError"><img src="http://assets.villagevoice.com/img/required.png">'+fields[fieldName]+'</span>');
					$('#'+fieldName).blur(function(){
						$('#'+fieldName+' .CommentInputError:first').hide();
					});
					errors.push(fieldName);
				}
				if(fieldName == 'email' && $('#'+fieldName).val().length > 0){
					var emailRegEx = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
					if(!$('#'+fieldName).val().match(emailRegEx)){					
							$('#'+fieldName+'lbl').after('<span class="CommentInputError"><img src="http://assets.villagevoice.com/img/required.png">Your E-mail is Invalid</span>');
							$('#'+fieldName).blur(function(){
								$('#'+fieldName+' .CommentInputError:first').hide();
							});						
							errors.push(fieldName);
					}
				}
			}
			if(errors.length > 0){
				return false;
			}
			$('#CommentAddForm INPUT:enabled, #CommentAddForm TEXTAREA:enabled, #CommentAddForm SELECT:enabled').attr('disabled', true);
			$('#CommentAddForm').after('<img src="/img/ajax-loader.gif" class="CommentsFeedbackImg">');
			
			var id 		= $('#CommentsObjid').val();
			var type	= $('#CommentsType').val();
            var SESSION_ID = $("#sessid").val();
			var url		= '/comments/AjaxAddCommentForIdAndType/'+id+'/'+type+'/?' + SESSION_ID;
			//var url		= '/comments/AjaxAddCommentForIdAndType/'+id+'/'+type+'/';
			$.post(url, {
				name:$('#name').val(),
				email:$('#emailx').val(),
				city:$('#city').val(),
				//state:$('#state').val(),
				//age:$('#age').val(),
				comment:$('#comment').val(),
				captcha:$('#captcha').val()
				}, function(responseText){
					//alert(responseText)
					$('.CommentsFeedbackImg').hide();		
					$('#CommentAddForm INPUT, #CommentAddForm TEXTAREA, #CommentAddForm SELECT').attr('disabled', false);	
				
					//if(document.getElementById('commentsdbg'))
						//document.getElementById('commentsdbg').innerHTML = responseText;					
					
				
					var now = new Date();
                    var SESSION_ID = $("#sessid").val();
                    $("#captcha_container_div").html( "" );
                    $("#captcha_container_div").append( "<img src='/comments/captcha/?" + SESSION_ID + "' />" );
					if(responseText == 'CAPTCHA'){				
						$('#captcha').after('<span class="CommentInputError"><img src="http://assets.villagevoice.com/img/required.png">Validation Failed!!</span>');
						return;
					}
					if(responseText == 'OK'){
                        $('#CommentAddForm INPUT, #CommentAddForm TEXTAREA, #CommentAddForm SELECT').not('#CommentAddSubmit, #CommentsObjid, #CommentsType').val('');
						var id 		= $('#CommentsObjid').val();
						var type	= $('#CommentsType').val();
						var url		= '/comments/AjaxCommentsForIdAndType/'+id+'/'+type+'/5/';
						$('#CommentsList').load(url, '', function(responseText, textStatus, XMLHttpRequest){
							$('.CommentsHeader').hide();						
							$('#CommentsList').html(responseText);
							$('.commentCount').html($('#realCommentCount').html());
							//Have to add the click element to the new CommentsShowAllButton we just loaded
							if($('#CommentsShowAllButton').length){
								$('#CommentsShowAllButton').click(function(){
									var id 		= $('#CommentsObjid').val();
									var type	= $('#CommentsType').val();
									var url		= '/comments/AjaxCommentsForIdAndType/'+id+'/'+type+'/'			
									$('#CommentsList').after('<img src="/img/ajax-loader.gif" class="CommentsFeedbackImg">');
									$('#CommentsList').load(url, '', function(responseText, textStatus, XMLHttpRequest){
										$('#CommentsListContainer').hide();
										$('.CommentsHeader').hide();
										$('#CommentsList').html(responseText);
										$('.CommentsFeedbackImg').hide();
										$('#CommentsListContainer').slideDown('slow');
									});
								});
							}												
						});	 //end CommentsList.load(...){}		
						alert('Your Comment has been added!');												
						return false;
					} // end if(responseText == 'OK'){}			
					
					if(responseText == 'ERROR'){
						alert('An error has occured, please try again later.');
						return false;
					}
					
					if(responseText == 'BLACKLIST'){
						alert('You have been blacklisted.');
						return false;
					}
									
				} //end anon function(responseText){}
			);
			
			return false;
		});
	}
	
});

    			}
    			catch(e){
    				VVM.debug.error(e);
        		}
            

/* --- End /home/httpd/arch/public/app_frame/webroot/js/Comments.js --- */
