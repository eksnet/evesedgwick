
// pages/edit-link-set.html

	function linkSetEdit(container) {
		this.element = container;

		this.config = {
			cookieDomain: '.sciencefriday.com',
			mobileDomain: 'beta-mobile.sciencefriday.com',
			noMobileDomain: 'beta.sciencefriday.com',
			ajaxUrl: '/iowa/deliver-ajax.json',
			lazyLoad: true,
			widths: [0,480,960,1200,100000],
			classes: ['tiny','small','medium','large']
		};
	}
	
	function linkSetPreview(container) {
		this.element = container;
		
		this.start = function(mode) {
			$('.box-slide').show();
			$('.image-wrapper').iowaInstance('lazy',true);
		};
	}

// pages/newsletter-template-tipsheet.html

	function responsiveInitNewsletter(elem) {
		this.element = elem;
				
		this.config = {
			widths: [0,675,1020,100000],
			classes: ['small','medium','large'],
			cookieDomain: '.publishersweekly.com',
			noMobileDomain: 'www.publishersweekly.com',
			ajaxUrl: '/pw/deliver-ajax.json',
			hijax: true,
			ajaxRequestMethod: 'GET',
			// forceHijax:true
		}
		
		showEdit();
	}

// pages/roundup.html

	function paginateRoundups(elem) {
		this.element;

		this.itemsPerPage = 30;
		this.page = 0;
		this.pages = 0;
		this.items = $('.roundup-list li');
		
		if(this.items.length) {
			this.pages = (this.items.length / this.itemsPerPage);
        	if(this.pages != Math.floor(this.pages)) { this.pages = Math.floor(this.pages) + 1; }
		}
	
		$(".ui-input-search input").bind("focus", function() {
			$('.roundup-list li').removeClass('roundup-item').removeClass('roundup-item-on');
			$('#roundup-older-button').hide();
			$('#roundup-newer-button').hide();
		});
		
		$('#roundup-older-button').click(function () {
			$('#roundup-list').iowaInstance('showPage',1);
		});

		$('#roundup-newer-button').click(function () {
			$('#roundup-list').iowaInstance('showPage',-1);
		});
		
		this.showPage = function (delta) {
			this.page += delta;
			
			var first = (this.page * this.itemsPerPage) - (this.itemsPerPage );
			var last  = first + this.itemsPerPage - 1;
			if(last > this.items.length) { last = this.items.length; }

			$('.roundup-item-on').removeClass('roundup-item-on');
			for(var i = first; i <= last; ++i) {
				$(this.items[i]).addClass('roundup-item-on');
			}
			
			if(this.page === 1) {
				$('#roundup-newer-button').addClass('ui-disabled');
			}
			else {
				$('#roundup-newer-button').removeClass('ui-disabled');
			}
			
			if(this.page === this.pages) {
				$('#roundup-older-button').addClass('ui-disabled');
			}
			else {
				$('#roundup-older-button').removeClass('ui-disabled');
			}
		};

		this.showPage(1);
	}

// pages/reviews-single.html

	function showOtherFormats(obj) {
		if($(obj).html() === 'Show other formats') {
			$(obj).html('Hide other formats');
		}
		else {
			$(obj).html('Show other formats');}
		$('#review-single-other-format-block').toggle();
	}
		

// pages/reviews.html

	function featuredReviews(e){
		this.element = e;
		this.playing = undefined;
		
		this.start = function(mode){
			this.currentIndex = -1;
	
			this.slides = $(this.element).find('.featured-reviews-slide');
	
			$(this.element).find('.featured-reviews-slide').click(
				function(instance){
					return function(e){
						loadPage($(this).data('url'))
					}
				}(this)
			);
			
			$(this.element).find('.featured-reviews-header-right').click(
				function(instance){
					return function(e){
						loadPage($(this).data('url'))
					}
				}(this)
			);
			
			$(this.element).find('.featured-reviews-prev').click(
				function(instance){
					return function(e){
						instance.stopAuto();
						instance.showIndex(instance.currentIndex - 1);
					}
				}(this)
			);
	
			$(this.element).find('.featured-reviews-next').click(
				function(instance){
					return function(e){
						instance.stopAuto();
						instance.showIndex(instance.currentIndex + 1);
					}
				}(this)
			);
	
			for(var i = 0; i < this.slides.length; i++) {
				$(this.element).find('.featured-reviews-dots').append('<div class="featured-reviews-dots-dot" data-index="' + i + '"></div>');
			}
	
			$(this.element).find('.featured-reviews-dots-dot').click(
				function (instance) {
					return function () {
						instance.showIndex($(this).data('index'));
					};
				}(this)
			);

			this.watchResize();
			this.showNext();
		};
		
		this.watchResize = function(){
		
			var w;
			var maxHeight = 0;
			
			if(responsive.scale === 'large'){
				$(this.element).css({'width':''});
				w = $(this.element).innerWidth();
			}
			else {
				if(responsive.scale === 'medium'){
					w = $(this.element).parent().innerWidth() - $('.featured-reviews-boxes').outerWidth(true);
				}
				else if(responsive.scale === 'small'){
					w = $(this.element).parent().innerWidth();
				}
	
				$(this.element).width(w);
			}
			
			var canvaswidth = (w + 20) * this.slides.length;
			$(this.element).find('.featured-reviews-canvas').width(canvaswidth);
			
			for(var i=0;i < this.slides.length;i++){
				$(this.slides[i]).width(w);
				var h = $(this.slides[i]).outerHeight();
				if(h > maxHeight) {
					maxHeight = h;
				}
			}
			
			$(this.element).find('.featured-reviews-canvas').innerHeight(maxHeight);
			$(this.element).find('.featured-reviews-viewport').innerHeight(maxHeight);
			//$(this.element).find('.featured-reviews-image').height(maxHeight);
			
			$(this.element).find('.featured-reviews-canvas').css(
				{"margin-left": this.currentIndex * w * -1}
			);

			var dotsWidth = this.slides.length * 11;
			var dotsLeft = (w - dotsWidth) / 2;			
	
			$(this.element).find('.featured-reviews-dots').css( { 
				'width': dotsWidth + 'px',
				'left': dotsLeft + 'px' 
			});
		}
		
		this.stopAuto = function() {
			if(this.playing) { window.clearTimeout(this.playing); }
			this.playing = null;
		};
		
		this.showNext = function() {
			this.showIndex(this.currentIndex + 1);
			this.playing = window.setTimeout(
				function(instance) {
					return function() {
						instance.showNext();
					}
				}(this),5000
			);
		};
		
		this.showIndex = function(i){
			if(i < 0){
				i = this.slides.length - 1;
			}
			
			if(i > this.slides.length - 1){
				i = 0;
			}
			
			var w = $(this.element).width();
			
			$(this.element).find('.featured-reviews-canvas').animate(
				{"margin-left": i * w * -1},1000
			);
			
			this.currentIndex = i;
			
			var slides = $(this.element).find('.featured-reviews-slide');
			var category = $(slides[this.currentIndex]).data('category');
			$('.featured-reviews-headline-category').html(category);
			$('.featured-reviews-header-right').data('url','/pw/reviews/' + $(slides[this.currentIndex]).data('category-nickname') + '.html');

			var pagination = $(this.element).find('.featured-reviews-dots-dot');
			$(this.element).find('.featured-reviews-dots-dot-on').removeClass('featured-reviews-dots-dot-on');
			$(pagination[i]).addClass('featured-reviews-dots-dot-on');

		};
	}

	function revealReview(obj) {
		var row = $(obj).data('row');
		if($(obj).html() === '<ml>show more</ml>') {
			$('#review-' + row).css('height','auto');
			$(obj).html('<lm>show less</lm>');
		}
		else {
			$('#review-' + row).css('height','');
			$(obj).html('<ml>show more</ml>');
		}
	}

// pages/best-books.html
(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) {return;}
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=190910504285954";
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
// pages/bea-signup.html

	function beaInit(elem) {
		this.element = elem;
				
		this.config = {
			widths: [0,675,1020,100000],
			classes: ['small','medium','large'],
			cookieDomain: '.publishersweekly.com',
			noMobileDomain: 'www.publishersweekly.com',
			ajaxUrl: '/pw/deliver-ajax.json',
			hijax: false,
			ajaxRequestMethod: 'GET',
			// forceHijax:true
		}
	}

// pages/newsletter-template-tipsheet2.html

	function responsiveInitNewsletter(elem) {
		this.element = elem;
				
		this.config = {
			widths: [0,675,1020,100000],
			classes: ['small','medium','large'],
			cookieDomain: '.publishersweekly.com',
			noMobileDomain: 'www.publishersweekly.com',
			ajaxUrl: '/pw/deliver-ajax.json',
			hijax: true,
			ajaxRequestMethod: 'GET',
			// forceHijax:true
		}
		
		showEdit();
	}

// wrapper.html


	function responsiveInit(elem) {
		this.element = elem;
				
		this.config = {
			widths: [0,675,1020,100000],
			classes: ['small','medium','large'],
			cookieDomain: '.publishersweekly.com',
			noMobileDomain: 'www.publishersweekly.com',
			ajaxUrl: '/pw/deliver-ajax.json',
			hijax: true,
			ajaxRequestMethod: 'GET',
			// forceHijax:true
		}
		
		if(paperCopy) {
			$('body').addClass('paper-copy');
			disableResponsive('medium');
			
			window.print();
		}
		
		this.watchLocationHash = function(path) {
			var regex = new RegExp('^/pw/home/');
			if(regex.exec(path)) {
				$('#wrapper').addClass('homepage');
			}
			else {
				$('#wrapper').removeClass('homepage');
			}
			_gaq.push(['_trackPageview']);
			
			if(responsive.scale == 'small') {
				$('#mobile-ad').show();
			}
		};
		
		if(getCookie('credentials')) {
			_gaq.push(['_setCustomVar', 1, 'subscriber', 'yes', 1]);
		}
		else {
			_gaq.push(['_setCustomVar', 1, 'subscriber', 'no', 1]);
		}
		
		_gaq.push(['_trackPageview']);
		
		$('#mobile-ad-optout').click(function() {
			$(this).parent().hide();
		});
	}
		
	function mobileChoice(elem) {
		this.element = elem;
		if(responsive.mobile) {
			$(this.element).html('<a href="javascript:mobileOptOut();">non-mobile view</a>');
		}
		else {
			$(this.element).html('<a href="javascript:mobileOptIn();">mobile view</a>');
		}
	}
	
	function logInChanged() {
		if(getCookie('credentials')) {
			$('.loggedOutOnly').hide();
			$('.loggedInOnly').show();
		}
		else {
			$('.loggedInOnly').hide();
			$('.loggedOutOnly').show();
		}
	}

	function loggedInOnly(elem) {
		this.element = elem;
		$(this.element).addClass('loggedInOnly');
		if(getCookie('credentials')) {
			$(this.element).show();
		}
		else {
			$(this.element).hide();
		}

		//$(this.element).show(); // assume logged in for now
	}

	function loggedOutOnly(elem) {
		this.element = elem;	
		$(this.element).addClass('loggedOutOnly');
		if(!getCookie('credentials')) {
			$(this.element).show();
		} 
		else {
			$(this.element).hide();
		}

		//$(this.element).hide(); // assume logged in for now
	}
	

	function getXmlFirstChildData(tag,xmldoc) {
	
		var node = xmldoc.getElementsByTagName(tag).item(0);
	
		if(node && node.firstChild) { 
			return unescape(node.firstChild.data);
		}
		else {
			return "";
		}
	}

	function setLocationHash(params) {
		if(!params) {
			location.hash = '';
		}
		else {
			location.hash = params;	
		}
	}

	function openPopUp(url,width,height) {
		w = window.open(url, 'PopUp', 'scrollbars=yes,toolbar=no,location=no,directories=no,menubar=no,width=' + width + ',height=' + height);
	}


	function paginateList(container) {
		this.element = container;
		
		this.start = function () {				
			if(!location.hash) {
				setLocationHash('page/1');
			}
			$(window).hashchange( 
				function(instance) {
					return function () {
						if(location.hash != instance.currentLocationHash) {
							instance.currentLocationHash = location.hash;
							var pathArray = instance.currentLocationHash.split('/'); 
							if(pathArray[0] == '#page') {
								instance.handlePagination(pathArray[1]);
							}
						}
					}
				}(this)
			);
			$(window).hashchange();
		}
		
		this.handlePagination = function(page) {
			window.scrollTo(0,0);
			this.showPage(this.element.id, page);
			$('#pagination-' + page).addClass('pagination-current-page');
		}

		this.showPage = function(container,page) {
			var segments = $('#' + container).find('li');
			if(segments.length) {
				$('#' + container).find('li').hide();
				var pagination = this.paginate(page, 10, segments, container);
				if(pagination.pagination_buffer) {
					$('#pagination').html(pagination.pagination_buffer);
				}
				for(var i = 0; i < pagination.items.length; i++) {
					$(pagination.items[i]).show();
				}
			}
		}
		
		this.paginate = function(page, items_per_page, items, container) {
			
			if(!page) { page = 1; }
			else { page = page * 1 } // it might be a string
			
			var item_count = items.length;
		
			var first_item = (page * items_per_page) - (items_per_page - 1);
		
			var last_item  = first_item + items_per_page - 1;
			if(last_item > item_count) { last_item = item_count; }
		
			var items_on_page = new Array();    
			for(var i = first_item; i <= last_item; ++i) {
				items_on_page.push(items[i - 1]);
			}
		
			var page_buffer = '';
			var pagination_buffer = '';
			
			if(item_count > items_per_page) {
		
				var pages = (item_count / items_per_page);
				
				if(pages != Math.floor(pages)) { pages = Math.floor(pages) + 1; }
			
				var next_page = page + 1;
				if(next_page > pages) { next_page = pages; }    
		
				var prev_page = page - 1;
				if(prev_page < 1)    { prev_page = 1; }    
		
				pagination_buffer += '<div class="pagination-container"><div class="pagination-last">';
		
				if(page != 1) {
					pagination_buffer += '<a href="#" onClick="setLocationHash(\'page/' + prev_page + '\');return false;">last</a> ';
				}
				else {
					pagination_buffer += '<a href="#" onClick="return false;" class="pagination-disabled"><span class="pagination-chevron">&laquo;</span> last</a> ';
				}
				
				pagination_buffer += '</div><div class="pagination-pages">';
				
				if(pages > 7) {
					pagination_buffer += ' <a href="#" onClick="setLocationHash(\'page/1\');return false;" class="pagination-page" id="pagination-1">1</a> ';
					
					var slice_start = page - 3; 
					if(slice_start < 2) { 
						slice_start = 2 
					}
					
					var slice_end = slice_start + 6; 
					if(slice_end > pages - 1) { 
						slice_end = pages - 1
					}
	
					if(slice_start > 2) {
						pagination_buffer += ' ... ';
					}
					
					for(var i = slice_start; i <= slice_end ; i++) {
						pagination_buffer += ' <a href="#" onClick="setLocationHash(\'page/' + i + '\');return false;" class="pagination-page" id="pagination-' + i + '">'+ i +'</a> ';
					}
	
					if(slice_end < pages - 1) {
						pagination_buffer += ' ... ';
					}
					
					pagination_buffer += '<a href="#" onClick="setLocationHash(\'page/' + pages + '\');return false;" class="pagination-page" id="pagination-' + pages + '">'+ pages +'</a> ';
				}
				else {
					for(var i = 1; i <= pages; i++) {
						pagination_buffer += ' <a href="#" onClick="setLocationHash(\'page/' + i + '\');return false;" class="pagination-page" id="pagination-' + i + '">'+ i +'</a> ';
					}
				}
	
				pagination_buffer += '</div><div class="pagination-next">';
				
				if(page != pages) {
					pagination_buffer += ' <a href="#" onClick="setLocationHash(\'page/' + next_page + '\');return false;">next <span class="pagination-chevron">&raquo;</span></a>';
				}
				else {
					pagination_buffer += ' <a href="#" onClick="return false;" class="pagination-disabled">next <span class="pagination-chevron">&raquo;</span></a>';
				}
				
				pagination_buffer += '</div></div>';
	
			}
			
			return { pagination_buffer: pagination_buffer, items: items_on_page };
		}
	}
	
function deleteCookie(name) {
	setCookie(name, "", "");
}


// components/print_issue_nav.html

	function issueNav(url) {
		if(url) {
			loadPage(url);
		}
	}

// components/nielsen_stat_details.html

	function showNielsenDetails(rec){
		$('#nielsen_stat_details_' + rec).dialog();
	}


// components/review_family.html

	function otherFormats(e) {
		this.element = e;
		
		var content = $('#review-single-other-format-block').html();
		if(content.match(/[a-z]/) == null) {
			$(this.element).hide();
		}
	}

// components/home-boom-box.html

	function homeBoomBox(e) {
		this.element = e;
				
		this.position = $(this.element).data('position');
		this.topic = $(this.element).data('topic');
		this.subtopic = $(this.element).data('subtopic');
		this.reviewCategory = $(this.element).data('reviewCategory');
		this.bestsellerCategory = $(this.element).data('bestsellerCategory');
		this.page = $(this.element).data('page');
		
		this.initialized = false;

		this.ajaxArgs = {
			"input" : { 
				"position": this.position,
				"topic": this.topic,
				"subtopic": this.subtopic,
				"reviewCategory": this.reviewCategory,
				"bestsellerCategory": this.bestsellerCategory,
				"page": this.page
			}
		};
		
		this.want = function() {
			return(responsive.scale !== 'small');
		};
		
		this.watchScale = function(scale) {
			if(scale === 'small') {
				$(this.element).hide();
			}
			else {
				$(this.element).show();
			}
		};
	}

// components/login-dialog.html

	/*
	if(getCookie('credentials')) {
		_gaq.push(['_setCustomVar', 1, 'subscriber', 'yes', 1]);
	}
	else {
		_gaq.push(['_setCustomVar', 1, 'subscriber', 'no', 1]);
	}
	
	_gaq.push(['_trackPageview']);
	*/
	
	if(!getCookie('validated')){
		if(getCookie('credentials')){
			ajaxValidateLogin();
		}
		else{
			ajaxInstitutionalLogin();
		}
	}

	function ajaxValidateLogin() {
		var params = 'proc=validate_credentials';
		$.ajax({
			type: "POST",
			url: '/pw/ajax.xml',
			data: params,
			dataType: "xml",
			success: function(xml) {
				var status = getXmlFirstChildData('status',xml);
				if(status == 'ok') {
					setCookie('validated',1);
				}
				else {
					deleteCookie('credentials');
				}
			},
			error: function() {
				alert('Login validation could not contact server');
			}
		});
	}

	function ajaxInstitutionalLogin() {
		var params = 'proc=validate_institution';
		$.ajax({
			type: "POST",
			url: '/pw/ajax.xml',
			data: params,
			dataType: "xml",
			success: function(xml) {
				var status = getXmlFirstChildData('status',xml);
				setCookie('validated',1);
				if(status == 'ok') {
					var credentials = getXmlFirstChildData('credentials',xml);
					setCookie('credentials',credentials,365);
					logInChanged();
				}
			},
			error: function() {
				alert('Login validation could not contact server');
			}
		});
	}	
	
	function logout() {
		deleteCookie('credentials');
		logInChanged();
	}

	function openLoginDialog() {
		$('#loginDialog').dialog({'width':'80%','modal': true,'title':'Please Log In'});
	}

	function ajaxLogin(form) {
		document.getElementById('login_dialog_errors').innerHTML = 'logging in.';
	
		var params = $('#' + form).serialize();
	
		$.ajax({
			type: "POST",
			url: '/pw/ajax.xml',
			data: params,
			dataType: "xml",
			success: function(xml) {
				var status = getXmlFirstChildData('status',xml);
				if(status == 'ok') {
					var credentials = getXmlFirstChildData('credentials',xml);
					setCookie('credentials',credentials,365);
					setCookie('validated',1);
					$('#loginDialog').dialog('close');
					logInChanged();
				}
				else {
					if(document.getElementById('login_dialog_text') && document.getElementById('login_dialog_error_text')) {
						document.getElementById('login_dialog_errors').innerHTML = '';
						document.getElementById('login_dialog_text').style.display = 'none';
						document.getElementById('login_dialog_error_text').style.display = '';
					}
					else {
						alert('Login error ' + status);
					}
				}
			},
			error: function() {
				alert('Login could not contact server');
			}
		});
	}
	
	
	function ajaxValidateLogin() {
		var params = 'proc=validate_credentials';
		$.ajax({
			type: "POST",
			url: '/pw/ajax.xml',
			data: params,
			dataType: "xml",
			success: function(xml) {
				var status = getXmlFirstChildData('status',xml);
				if(status == 'ok') {
					setCookie('validated',1);
				}
				else {
					deleteCookie('credentials');
				}
			},
			error: function() {
				alert('Login validation could not contact server');
			}
		});
	}


// components/index-archive-browse.html

	function archiveGo() {
		var year = $("#archiveYears option:selected").text();
		var month = $("#archiveMonths option:selected").text();
		if(year && month) {
			var path;
			if(responsive.hijax) {
				path = responsive.currentLocationHash.split('?')[0];
				var pathArray = path.split('/'); 
				if(pathArray[0] == '#path') {
					pathArray.splice(0,1);
				}
				path = '/' + pathArray.join('/');
			}
			else {
				var uri = parseUri(document.location.href.toLowerCase());

				path = document.location.href.split('?')[0];
				path = path.split('#')[0];
			}
			
			loadPage(path + '?year=' + year + '&month=' + month);
		}
	}
	
	function resetMonths(menu) {
		var year = $("#archiveYears option:selected").text();
		$('#archiveBrowse').iowaInstance('resetMonths',year)
		var month = $("#archiveMonths option:selected").text();
		if(year && month) {
			archiveGo();
		}
	}
	
	function archiveBrowse(e) {
		this.element = e;
		this.year = $(this.element).data('year');
		this.month = $(this.element).data('month');
		
		this.resetMonths = function(year) {
			var months = null;
			for(var i = 0; i < this.dates.length; i++) {
				if(year == this.dates[i].year) {
					months = this.dates[i].months;
				}
			}
			$('#archiveMonths').hide().empty();
			$('#archiveMonths').append('<option value="" selected>select month</option>');
			if(months) {
				for(var i = 0; i < months.length; i++) {
					var markup = '<option value="' + months[i] + '"';
					if(this.month == months[i]) {
						markup += ' selected';
					}
					markup += '>'+months[i]+'</option>';
					$('#archiveMonths').append(markup);
					$('#archiveMonths').show();
				}
			}
		};
		
		this.start = function(mode) {
			if($('#archiveBrowseJSON').html()) {
				$('#archiveYears').append('<option value="">select year</option>');
				this.dates = jQuery.parseJSON($('#archiveBrowseJSON').html());
				var months = null;
				for(var i = 0; i < this.dates.length; i++) {
					var markup = '<option value="' + this.dates[i].year + '"';
					if(this.year == this.dates[i].year) {
						markup += ' selected';
					}
					markup += '>'+this.dates[i].year+'</option>';
					$('#archiveYears').append(markup);
				}
				
				this.resetMonths(this.year);	
			}
		}
	}

// components/home-featured.html

	function watchContentHeight(e) {
		this.element = e;
		
		this.start = function(mode) {
			this.stop();
			$(window).bind('resize.' + this.element.id,
				function (instance) {
					return function (e) {
						instance.handleResize();
					}
				}(this)
			);	
			this.handleResize();

		};

		this.stop = function() {
			$(window).unbind('resize.' + this.element.id);
		};
		
		this.handleResize = function() {
			var max = 0;

			//console.log('left: ' + $('#home-featured-left').outerHeight());
			//console.log('right: ' + $('#home-featured-right').outerHeight());
			
			if(responsive.scale != 'small') {
				if($('#home-featured-left').outerHeight() > $('#home-featured-right').outerHeight()) {
					$(this.element).innerHeight($('#home-featured-left').outerHeight());
				}
				else {
					$(this.element).innerHeight($('#home-featured-right').outerHeight());
				}
			}
			else {
				$(this.element).innerHeight($('#home-featured-left').outerHeight() + $('#home-featured-right').outerHeight());
			}
		};
		
	}

// components/right-column-quick-links.html

	function rightColumnQuickLinks(e) {
		this.element = e;
		this.open = false;
		
		this.want = function() {
			return(responsive.scale === 'large');
		};

		this.start = function(mode) {	
			if(mode === 'ajaxLoad') {	
				$(this.element).find('h1').click(
					function(instance) {
						return function(e) {
							if(this.open) {
								$(instance.element).removeClass('open').find('ul').slideUp('fast');
								this.open = false;
							}
							else {	
								$(instance.element).addClass('open').find('ul').slideDown('fast');
								this.open = true;
							}
						}
					}(this)
				);
			}
		}
	}

// components/right-column-boom-box.html

	function rightColumnBoomBox(e) {
		this.element = e;
				
		this.position = $(this.element).data('position');
		this.topic = $(this.element).data('topic');
		this.subtopic = $(this.element).data('subtopic');
		this.reviewCategory = $(this.element).data('reviewCategory');
		this.bestsellerCategory = $(this.element).data('bestsellerCategory');
		this.page = $(this.element).data('page');
		this.wantScale = $(this.element).data('wantscale');
		
		this.initialized = false;

		this.ajaxArgs = {
			"input" : { 
				"position": this.position,
				"topic": this.topic,
				"subtopic": this.subtopic,
				"reviewCategory": this.reviewCategory,
				"bestsellerCategory": this.bestsellerCategory,
				"page": this.page
			}
		};
		
		this.want = function() {
			return(responsive.scale === this.wantScale);
		};
		
		this.watchScale = function(scale) {
			if(scale !== this.wantScale) {
				$(this.element).hide();
			}
			else {
				$(this.element).show();
			}
		};
	}

// components/also_on_pw.html

	function alsoOnPw(e) {
		this.element = e;
		
		this.want = function() {
			return true;
		};
		
		this.ajaxArgs = {
			'input': {
				'linkset': $(this.element).data('linkset')
			}
		};
	}

// components/right-column-roundup.html

	function rightColumnRoundup(e) {
		this.element = e;
		
		this.want = function () {
			return(responsive.scale === 'large');
		};
		
		this.ajaxArgs = {
			"input" : {
				"topic" : $(this.element).data('topic'),
				"subtopic" : $(this.element).data('subtopic'),
				"edition" : $(this.element).data('edition')
			}
		};
	}

// components/article-lede-photo.html

	function articleLedePhoto(e) {
		this.element = e;
		
		this.want = function () {
			return true;
		}
		
		this.ajaxArgs = { 
			'input': {
				'article': $(this.element).data('article'),
				'slideshow': $(this.element).data('slideshow')
			}
		};
		
		
		this.start = function(mode){
			this.currentIndex = 0;
	
			this.slides = $(this.element).find('.article-lede-photo-slide');
	
	
			for(var i = 0; i < this.slides.length; i++) {
				$(this.element).find('.article-lede-photo-dots').append('<div class="article-lede-photo-dots-dot" data-index="' + i + '"></div>');
			}
	
			$(this.element).find('.article-lede-photo-dots-dot').click(
				function (instance) {
					return function () {
						instance.showIndex($(this).data('index'));
					};
				}(this)
			);

			this.watchResize();
			this.showIndex(0);
		};
		
		this.watchResize = function(){
		
			var w;			

			w = $(this.element).parent().width();
			
			var canvaswidth = (w + 20) * this.slides.length;
			$(this.element).find('.article-lede-photo-canvas').width(canvaswidth);
			
			for(var i=0;i < this.slides.length;i++){
				$(this.slides[i]).width(w);
			}
						
			$(this.element).find('.article-lede-photo-canvas').css(
				{"margin-left": this.currentIndex * w * -1}
			);

			var dotsWidth = this.slides.length * 11;
			var dotsLeft = (w - dotsWidth) / 2;			
	
			$(this.element).find('.article-lede-photo-dots').css( { 
				'width': dotsWidth + 'px',
				'left': dotsLeft + 'px' 
			});
		}
		
		this.showIndex = function(i){
			if(i < 0){
				i = this.slides.length - 1;
			}
			
			if(i > this.slides.length - 1){
				i = 0;
			}
			
			var w = $(this.element).width();
			
			$(this.element).find('.article-lede-photo-canvas').animate(
				{"margin-left": i * w * -1},1000
			);
			
			this.currentIndex = i;
			
			var slides = $(this.element).find('.article-lede-photo-slide');

			$(slides[i]).find('.image-wrapper').iowaInstance('lazy',true);

			var pagination = $(this.element).find('.article-lede-photo-dots-dot');
			$(this.element).find('.article-lede-photo-dots-dot-on').removeClass('article-lede-photo-dots-dot-on');
			$(pagination[i]).addClass('article-lede-photo-dots-dot-on');

		};


	}

// components/right-column-blogs.html

	function rightColumnBlogs(e) {
		this.element = e;
		
		this.want = function() {
			return (responsive.scale === 'large');
		};
		
		this.start = function(mode) {
			if(mode === 'ajaxLoad') {
				ajaxLayer();
			}
		};
	}

// components/sidebar1.html

	function sidebar1(elem) {
		this.element = elem;
		
		this.ajaxArgs = {
			"input": {
				"topic": $(this.element).data('topic')
			}
		}
		
		this.want = function() {
			return responsive.mobile === false;
		};
	}

// components/nielsen-submenu.html

	function selectNielsenCategory(nickname) {
		loadPage('/pw/nielsen/'+nickname+'.html');
	}

// components/right-column-popular.html

	function rightColumnPopular(e) {
		this.element = e;
		
		this.want = function() {
			return true;
		};
	}

// components/right-column-featured-reviews.html

	function rightColumnFeaturedReviews(e) {
		this.element = e;

		this.current_starred_index = -1;
		this.starred_slideshow = null;

		this.want = function() {
			return true;
		};
		
		this.start = function(mode) {
			//console.log('rightColumnFeaturedReviews.start ' + mode);
			if(mode === 'ajaxLoad') {				
				this.nextStarred(1,false);
				
				$('#right-column-featured-reviews-next').click(
					function (instance) {
						return function () {
							instance.starredPause();
							instance.nextStarred(1,true);
						};
					}(this)
				);
				
				$('#right-column-featured-reviews-previous').click(
					function (instance) {
						return function () {
							instance.starredPause();
							instance.nextStarred(-1,true);
						};
					}(this)
				);
			}
		};
		
		this.stop = function() {
			this.starredPause();
		};

		this.nextStarred = function(increment,manual) {
			starred = $('.right-column-reviews-slide');
			
			if(this.current_starred_index > -1) {
				var id = $(starred[this.current_starred_index]).attr('id');
				var div = document.getElementById(id);
				if(div) {
					div.style.display = 'none';
				}
			}
			
			this.current_starred_index += increment;
			
			if(this.current_starred_index < 0) {
				this.current_starred_index = starred.length - 1;
			}
	
			if(this.current_starred_index >= starred.length) {
				this.current_starred_index = 0;
			}
	
			var id = $(starred[this.current_starred_index]).attr('id');
			var div = document.getElementById(id);
			if(div) {
				div.style.display = '';
			}
			
			if(!manual) {
				this.starred_slideshow = window.setTimeout(
					function (instance) {
						return function () {
							instance.nextStarred(1,false)
						};
					}(this),
					3000
				);
			}
		}
		
		this.starredPause = function() {
			if(this.starred_slideshow) {
				this.starred_slideshow = window.clearTimeout(this.starred_slideshow);
			}
		}
	}

// components/article-photo.html

	function articlePhoto(e) {	
		this.element = e;
		this.ajaxArgs = jQuery.parseJSON($(this.element).html());

		this.ajaxArgs = {
			"input" : {
				"table" : $(this.element).data('table'),
				"row" : $(this.element).data('row'),
				"photo" : $(this.element).data('photo'),
				"width" : $(this.element).data('width')
			}
		};
		
		this.want = function () {	
			return responsive.mobile == false && responsive.scale != 'tiny';
		}		
	}

// components/share.html

	function share(e) {
		this.element = e;
		
		
		this.getAjaxArgs = function() {
 			var args = { 
				input: {
					article: $(this.element).data('article'),
					path: $(this.element).data('path'),
					url: $(this.element).data('url'),
					comments: $(this.element).data('comments'),
					inline: $(this.element).data('inline'),
					topic: $(this.element).data('topic')
				}
			}
			
			return args;
 		};
		
		this.start = function(mode) {
			if(mode == 'ajaxLoad') {
				if(typeof FB !== 'undefined') {
					try{
						FB.XFBML.parse(document.getElementById('#share'));
					}
					catch(err) {
					  	
					}
				}
			}
		};
	}

// components/leaderboard.html

	function leaderboard(e) {
		this.element = e;
				
		this.position = $(this.element).data('position');
		this.topic = $(this.element).data('topic');
		this.subtopic = $(this.element).data('subtopic');
		this.reviewCategory = $(this.element).data('reviewCategory');
		this.bestsellerCategory = $(this.element).data('bestsellerCategory');
		this.page = $(this.element).data('page');
		
		this.initialized = false;

		this.ajaxArgs = {
			"input" : { 
				"position": this.position,
				"topic": this.topic,
				"subtopic": this.subtopic,
				"reviewCategory": this.reviewCategory,
				"bestsellerCategory": this.bestsellerCategory,
				"page": this.page
			}
		};
		
		this.want = function() {
			return(responsive.scale === 'large');
		};
	}

// components/review-categories.html

	function reviewCategories(e) {
		this.element = e;
			
		this.start = function() {
			var path = document.location.href;
			path = document.location.href.split('?')[0];
			path = path.split('#')[0];
			$(this.element).find('a').each(
				function() {
					if($(this).attr('href') === path) {
						$(this).parent().addClass('submenu-on');
					}
				}
			);
		}
	}
	

// components/navigation-json.html

	function navigation(e) {
		this.element = e;
		this.json = undefined;
		this.mode = undefined;
		this.section = undefined;
		this.subsection = undefined;
		
		this.want = function() {
			return true;
		};
		
		this.ready = function(response) {
			this.json = jQuery.parseJSON(response.result);
		};
		
		this.start = function(mode) {
			if(mode === 'ajaxLoad') {
				$(window).bind('resize.navigation',
					function (instance) {
						return function (e) {
							instance.handleResize()
						}
					}(this)
				);		
				var loc = parseUri(document.location.href);
				this.setState(loc.path);
				this.handleResize();
			}
		};
		
		this.stop = function() {
			$(window).unbind('resize.navigation');
		};

		this.watchLocationHash = function(location) {
			if(this.json) {
				this.setState(location);
			}
		};
		
		this.setState = function(location) {
			if(location == '/') {
				location = '/pw/home/index.html';
			}
			
			this.section = undefined;
			this.subsection = undefined;
			$('.navigation-tab-on').removeClass('navigation-tab-on');
			$('.navigation-subnav-item-on').removeClass('navigation-subnav-item-on');
			for(var i = 0; i < this.json.sections.length; i++) {
				var p = this.json.sections[i].url;
				p = p.replace('index.html','');
				var re = new RegExp('^' + p);
				if(re.test(location)) {
					this.section = this.json.sections[i];
					if(this.json.sections[i].subsections) {
						for(var j = 0; j < this.json.sections[i].subsections.length; j++) {
							var pp = this.json.sections[i].subsections[j].url;
							pp = pp.replace('index.html','');
							re = new RegExp('^' + pp);
							if(re.test(location)) {
								this.subsection = this.json.sections[i].subsections[j];
							}
						}
					}
				}
			}
			
			if(this.mode === 'standard') {
				this.standard();
				if(this.section) {
					$('#' + this.section.id).addClass('navigation-tab-on');
					this.showSubsections(this.section.subsections);
				}
				if(this.subsection) {
					$('#' + this.subsection.id).addClass('navigation-subnav-item-on');
				}
			}
			else {
				this.pulldown();
			}

		};
		
		this.standard = function() {
			if(this.json) {
	
				this.mode = 'standard';
				var subsections = [];
				
				var html = '<div id="navigation-tabs">';
				for(var i = 0; i < this.json.sections.length; i++) {
					html += '<div id="'+this.json.sections[i].id+'" class="navigation-tab" data-href="'+this.json.sections[i].url+'">'+this.json.sections[i].name+'</div>';
					if(i < this.json.sections.length - 1) {
						html += '<div class="navigation-separator"><img src="/images/nav-separator.png" width="1" height="31" border="0"></div>';
					}
					
					//if(this.json.sections[i].url === $(this.element).data('path')) {
					//	subsections = this.json.sections[i].subsections;
					//}
				}
				html += '<div class="navigation-filler"></div>'
				html += '</div>';
				
				$(this.element).html(html);
				
				if(this.section) {
					$('#' + this.section.id).addClass('navigation-tab-on');
					this.showSubsections(this.section.subsections);
					if(this.section.subnav_text) {
						$(this.element).find('#navigation-subnav-container').remove();
						$(this.element).append('<div class="subnav-text">' + this.section.subnav_text + '</div>');
						$(this.element).append('<div class="subnav-text-medium">' + this.section.subnav_text_medium + '</div>');
					}
				}
				if(this.subsection) {
					$('#' + this.subsection.id).addClass('navigation-subnav-item-on');
				}
								
				$(this.element).find('.navigation-tab').click(
					function(instance) {
						return function(e) {
							loadPage($(this).data('href'));
						}
					}(this)
				);
			}
		};
		
		this.pulldown = function() {
			if(this.json) {
	
				this.mode = 'pulldown';
				//output the heading, back, output topics if not data('the-topic') otherwise output subtopics
	
				var html = '';
				
				html = '<div id="navigation-pulldown-container">';
				html += '<div id="navigation-pulldown-buttons">';
				html += '<div id="navigation-pulldown-show" class="nav-button"><img src="/images/mobile-showtopics.png" width=94 height=23 border=0></div>';
				html += '<div id="navigation-pulldown-full-site" class="nav-button"><img src="/images/mobile-fullsite.png" width=58 height=23 border=0></div>';
				html += '</div>';
				html += '</div>';
				html += '<div id="navigation-pulldown">';
				if(!this.section || this.section.id === 'home' || !this.section.subsections) {
					for(var i = 1; i < this.json.sections.length; i++) {
						html += '<div id="'+this.json.sections[i].id+'" class="navigation-pulldown-item" data-href="'+this.json.sections[i].url+'">' + this.json.sections[i].name + '</div>';	
					}
				}
				else {
					if(this.subsection) {
						html += '<div id="'+this.section.id+'" class="navigation-pulldown-item" data-href="'+this.section.url+'">back to ' + this.section.name + '</div>';
					}
					else {
						html += '<div id="'+this.json.sections[0].id+'" class="navigation-pulldown-item" data-href="'+this.json.sections[0].url+'">' + this.json.sections[0].name + '</div>';	
					}
					if(this.section.subsections) {
						for(var i = 0; i < this.section.subsections.length; i++) {
							html += '<div id="'+this.section.subsections[i].id+'" class="navigation-pulldown-item" data-href="'+this.section.subsections[i].url+'">' + this.section.subsections[i].name + '</div>';	
						}
					}
				}
				html += '</div>';
	
				$(this.element).html(html);
	
				$('#navigation-pulldown-show').click(
					function(e) {
						$('#navigation-pulldown').toggle();
					}
				);
		
				$('#navigation-pulldown-full-site').click(
					function(e) {
						disableResponsive('large');
					}
				);

				$(this.element).find('.navigation-pulldown-item').click(
					function(instance) {
						return function(e) {
							loadPage($(this).data('href'));
						}
					}(this)
				);
			}
		};
		
		this.showSubsections = function(subsections) {
			var html = '';
			if(subsections) {
				html += '<div id="navigation-subnav-container">';
				for(var i = 0; i < subsections.length; i++) {
					html += '<div id="'+subsections[i].id+'" class="navigation-subnav-item" data-href="'+subsections[i].url+'">'+subsections[i].name+'</div>';
					
					if(i < subsections.length - 1) {
						html += '<div class="navigation-subnav-item-divider">|</div>';
					}
				}
				html += '</div>';
			}
			$(this.element).find('#navigation-subnav-container').remove();
			$(this.element).append(html);

			$(this.element).find('.navigation-subnav-item').click(
				function(instance) {
					return function(e) {
						loadPage($(this).data('href'));
					}
				}(this)
			);

		};

		this.handleResize = function() {
			if(this.json) {
				var container = $(this.element).parent().width();
				
				if(container < 1020) {
					var slop = 1020 - container;
					pad = 20 - (slop / 10 / 2);
					if(pad > 4) {
						$(this.element).find('.navigation-tab').css( { 'padding-left': pad + 'px', 'padding-right': pad + 'px' } );
						if(this.mode != 'standard') {
							this.standard();
						}
					}
					else {
						if(this.mode != 'pulldown') {
							this.pulldown();
						}
					}
				}
				else {
					$(this.element).find('.navigation-tab').css( { 'padding-left': 21 + 'px', 'padding-right': 20 + 'px' } );
					if(this.mode != 'standard') {
						this.standard();
					}
				}
			}
		};
	}

// components/also_on_pw_no_ad.html

	function alsoOnPw(e) {
		this.element = e;
		
		this.want = function() {
			return true;
		};
		
		this.ajaxArgs = {
			'input': {
				'linkset': $(this.element).data('linkset')
			}
		};
	}

// components/reviews_submenu.html

	function reviewSubmenu(e) {
		this.element = e;
		
		this.start = function() {
			var uri, path;
			if(responsive.hijax) {
				path = responsive.currentLocationHash.substring(5);
			}
			else {
				uri = parseUri(document.location.href);
				path = uri.path;
			}
			$(this.element).find('a').each(
				function() {
					if($(this).attr('href') === path) {
						$(this).addClass('on');
					}
				}
			);
		};
	}

// components/right-column-skyscraper.html

	function rightColumnSkyscraper(e) {
		this.element = e;
				
		this.position = $(this.element).data('position');
		this.topic = $(this.element).data('topic');
		this.subtopic = $(this.element).data('subtopic');
		this.reviewCategory = $(this.element).data('reviewCategory');
		this.bestsellerCategory = $(this.element).data('bestsellerCategory');
		this.page = $(this.element).data('page');
		
		this.initialized = false;

		this.ajaxArgs = {
			"input" : { 
				"position": this.position,
				"topic": this.topic,
				"subtopic": this.subtopic,
				"reviewCategory": this.reviewCategory,
				"bestsellerCategory": this.bestsellerCategory,
				"page": this.page
			}
		};
		
		this.want = function() {
			return(responsive.scale === 'large');
		};
	}

// components/index-featured.html

	function featuredArticles(e) {
		this.element = e;
		
		this.singleColumn = false;
		
		this.start = function(mode) {
		
			var left = $('#featured-articles-left').find('div');
			var right = $('#featured-articles-right').find('div');
			
			if(!left.length && right.length) { 
				$(this.element).hide(); 
			}
			
			if(!left.length) {$('#featured-articles-left').hide();}
			if(!right.length) {$('#featured-articles-right').hide();}
		
			$(window).bind('resize',
				function (instance) {
					return function (e) {
						instance.handleResize()
					}
				}(this)
			);
			
			this.handleResize();
		};

		this.handleResize = function() {
			var container = $(this.element).parent().width();
			if(container < 550) {
				if(!this.singleColumn) {
					this.singleColumn = true;
					$('#featured-articles').hide();
					$('#featured-articles-single-column').append($('#featured-articles-left'));
					$('#featured-articles-left').removeClass('featured-articles-left');
					$('#featured-articles-left').addClass('featured-articles-left-inline');		
					$('#featured-articles-single-column').append('<div class="featured-row-separator"></div>');
					$('#featured-articles-single-column').append($('#featured-articles-right'));
					$('#featured-articles-right').removeClass('featured-articles-right');
					$('#featured-articles-right').addClass('featured-articles-right-inline');
					$('#featured-articles-single-column').append($('#featured-articles-upsell'));
					$('#featured-articles-upsell').removeClass('featured-articles-upsell');
					$('#featured-articles-upsell').addClass('featured-articles-upsell-inline');
				}
			}
			else {
				if(this.singleColumn) {
					this.singleColumn = false;
					$('#featured-articles').append($('#featured-articles-right'));
					$('#featured-articles-left').removeClass('featured-articles-left-inline');
					$('#featured-articles-left').addClass('featured-articles-left');
					$('#featured-articles-left').append($('#featured-articles-upsell'));
					$('#featured-articles-upsell').removeClass('featured-articles-upsell-inline');
					$('#featured-articles-upsell').addClass('featured-articles-upsell');
					$('#featured-articles').append($('#featured-articles-left'));
					$('#featured-articles-right').removeClass('featured-articles-right-inline');
					$('#featured-articles-right').addClass('featured-articles-right');
					$('#featured-articles-single-column').empty();
					$('#featured-articles').show();
				}
			}
		};
	}

// components/article-related.html

	function articleRelated(elem) {
		this.element = elem;
		
		this.ajaxArgs = {
			"input" : {
				"article" : $(this.element).data('article'),
				"try-photo" : $(this.element).data('try-photo')
			}
		};
		
		this.want = function() {
			return true;
		};
		
		this.start = function(mode) {
			if(mode == 'ajaxLoad') {
				$(this.element).show();
			}
		};
	}

// components/right-column-bestsellers.html

	function selectNielsenType(type) {
		$('#right-column-bestsellers').data('type',type);
		ajaxReload('#right-column-bestsellers');
	}
	
	function rightColumnBestsellers(e) {
		this.element = e;
		
		this.getAjaxArgs = function() { 
			return {
				'input': {
					'path': $(this.element).data('path'),
					'type': $(this.element).data('type')

				}
			}
		};
			
		this.want = function() {
			return true;
		};
		
	}

// components/editing.html


	function inPlaceEdit(e) {
		this.element = e;

		this.ajaxArgs = {
			'input': {
				'path': $(this.element).data('path')
			}
		};

		this.want = function () {
			if(getCookie('uid') && responsive.mobile == false && responsive.scale == 'large') {
				return true;
			}
			else {
				return false;
			}
		}
		
		this.start = function (mode) {
			$(this.element).fadeIn();
		}
		
		if(responsive.mobile == false) {
			$( "#preview_date" ).datepicker();
		}
	}
	
	function showEdit() {
		$('#edit-on').hide();
		$('#edit-off').show();

		$('.featured-post-list-item').css({'min-height':'300px','min-width':'300px'});
		
		$('.editing-placeholder').show();
		$('.editing').show();

		$('.editing').each(function() {
			//$(this).parent().addClass('editing-border');
			//var pp = $(this).parent().offset();
			//var w = $(this).parent().width();
			//var h = $(this).parent().height();
			
			//$(this).parent().append('<div class="editing-border" style="top:' + 0 + 'px;left:' + 0 + 'px;width:' + (w - 8) + 'px;height:' + (h - 8) + 'px;"></div>');
			
			//$(this).offset({ top: pp.top, left: pp.left});
		});
	}
	
	function hideEdit() {
		$('.editing-border').remove();
		//$('.editing').parent().removeClass('editing-border');
		$('#edit-off').hide();
		$('#edit-on').show();
		$('.editing-placeholder').hide();
		$('.editing').hide();
	}
	
	function closeEdit() {
		$('.preview').hide();
	}

	// link sets

	function editLinkSetData(link_set,format,anchor) {
		var container_class = $(anchor).parent().attr('class');

		setCookie('link-set-edit',format);
		setCookie('link-set-edit-container-class',container_class);	
		
		var url = '/iowa-edit/edit-link-set.html?link_set=' + link_set + '&format=' + format;	
		$('#edit-dialog').dialog( { title:'Editing ' + link_set, width: 900, height: 650, close: function(event, ui) { document.location.href=document.location.href } } );
		$('#edit-dialog-iframe').attr('src','');
		$('#edit-dialog-iframe').attr('src',url);
	}
		
	// edit row
	
	function editRow(table, row) {
		var url = '/iowa-edit/' + table + '/record.html?record=' + row;
	
		$('#edit-dialog').dialog( { title:'Edit Link Set', width: 900, height: 700 } );
		$('#edit-dialog-iframe').attr('src',url);
	}
	
	function getLinkSetFormat(id) {
		var format = $('#' + id + ' .link-set-item-format').html();
		format = format.replace(/^<!--/,'');
		format = format.replace(/-->$/,'');
		return format;
	}

// components/right-column-twitter.html

	function rightColumnTwitter(e) {
		this.element = e;
		
		this.want = function () {
			return(responsive.scale === 'large');
		};
		
		this.ajaxArgs = {
			"input" : {
				"path" : $(this.element).data('path')
			}
		};
	}

// components/blogindex.html


	function blogIndex(e) {
		this.element = e;
		this.row = $(this.element).data('row');
		this.count = $(this.element).data('count');
		this.headlinesOnly = $(this.element).data('headlines-only');
		this.nobullets = $(this.element).data('nobullets');
		this.json = null;
		
		this.getAjaxArgs = function () {
			var args = { 
				input: {
					row: this.row,
					count: this.count 
				}
			}
			return args;			
		};		
		
		this.ready = function (response) {
			var json = jQuery.parseJSON(response.result);
			this.json = jQuery.parseJSON(json.feed);
		};
				
		this.start = function(mode) {
			if(mode === 'ajaxLoad') {
				if(this.json && this.json.posts) {
					var markup = '';
					if(!this.nobullets) {
						markup += '<ul class="subtopic-recent-headlines-home-list">';
					}
					for(i = 0; i < this.json.posts.length && i < this.count; i++) {
						if(!this.nobullets) {
							markup += '<li>';
						}
						markup += '<div class="right-column-blogs-post">';
						if(!this.headlinesOnly) {
							markup += this.json.posts[i].author.name + '<br>';
						}
						markup += '<a href="'+this.json.posts[i].url+'">'+this.json.posts[i].title + '</a>';
						if(!this.headlinesOnly) {
							markup += '<br>' + this.json.posts[i].excerpt;
						}
						markup += '</div>';
						if(!this.nobullets) {
							markup += '</li>';
						}

					}
					if(!this.nobullets) {
						markup += '</ul>';
					}
					$(this.element).html(markup);
				}
				else {
					$(this.element).html('Visit blog to see recent posts.');
				}
			}
		};
	}


// components/nielsen_stats.html

	function toggleNielsenStats(id) {
		$('#' + id).toggle();
	}

// components/header.html

	function header(e) {
		this.element = e;
		
		this.start = function(mode) {
			if(!paperCopy) {
				$(window).bind('resize',
					function (instance) {
						return function (e) {
							instance.handleResize()
						}
					}(this)
				);
				
				this.handleResize();
			}
		};

		this.handleResize = function() {
			var container = $(this.element).parent().width();
			if(container < 860) {
				$(this.element).find('.search').hide();
				$('.search-button').hide();
				$('.icon-searchsmall').show();
			}
			else {
				$(this.element).find('.search').show();
				$('.search-button').show();
				$('.icon-searchsmall').hide();
			}

			if(container < 650) {
				$(this.element).find('.gotomenu').hide();
			}
			else {
				$(this.element).find('.gotomenu').show();
			}

		};
	}
	
	function clearDefault(elem) {
		if(elem.value == 'Search Publishers Weekly') {
			elem.value='';
		}
		if(elem.value == 'Email address') {
			elem.value='';
		}
		if(elem.value == 'Enter email address') {
			elem.value='';
		}
	}

// components/mark-popular.html

	function markPopular(container) {
		this.element = container;
		this.done = false;
		
		this.ready = function (result) {
		};
		
		this.start = function (mode) {
			if(!this.done) {
				this.done = true;
				$.ajax({
					url: '/pw/json/mark-popular.json?table='+$(this.element).data('table')+'&row='+$(this.element).data('row'),
					dataType: 'json',
					success: function(json){
					},
				});
			}
		}
	}

// components/ajax-ads.html

	function loadAd(e) {
		this.element = e;
		this.loaded = false;
		this.id = $(this.element).attr('id');
		this.scales = $(this.element).data('scales');
		this.enabled = false;
		
		this.start = function(mode) {
			if(!this.loaded && this.enabled) {
				googletag.cmd.push(
					function(instance) {
						return function() { 
							googletag.display(instance.id); 
						}
					}(this)
				);
				this.loaded = true;
			}
		};
		
		this.watchScale = function(scale) {
			var want = false;
			if(this.scales) {
				var s = this.scales.split(',');
				for(var i = 0; i < s.length; i++) {
					if(s[i] === responsive.scale) {
						want = true;
					}
				}
			}
			else {
				want = true;
			}
			
			if(want) {
				if(!this.enabled) { 
					this.enabled = true;
					$(this.element).show(); 
					this.start();
				}
			}
			else {
				if(this.enabled) { 
					this.enabled = false;
					$(this.element).hide(); 
				}
			}
		};		
	}

// components/podcast_player.html

	function podcastPlayer(e) {
		this.element = e;
		this.init = false;
		this.media = $(this.element).data('media');
		
		this.start = function(mode) {
			if(!this.init) {
				this.init = true;
				$("#jquery_jplayer_1").jPlayer({
					ready: function(instance) { 
						return function () {
							$(this).jPlayer("setMedia", {
								mp3: instance.media
							});
						}
					}(this),
					swfPath: "/JavaScriptShared/jplayer",
					supplied: "mp3",
					errorAlerts: false,
					warningAlerts: false
				});

			}
		};
	}

// components/email-childrens-podcast.html

	function submitChildrensPodcastBullshit() {
		var email = $('#childrenspodcastemail').val();
		if(email && email != 'Email address') {
			var params = 'proc=mailchimp_signup&email=' + email + '&list=85652eeac3';
			
			$.ajax({
				type: "POST",
				url: '/pw/ajax.xml',
				data: params,
				dataType: "xml",
				success: function(xml) {
					var status = getXmlFirstChildData('status',xml);
					if(status == 'ok') {
						$('#childrenspodcastcontainer').html($('#childrenspodcastcontainer').data('done'));
					}
					else {
						$('#childrenspodcasterror').html(status);
					}
				},
				error: function() {
					alert('signup could not contact server');
				}
			});
		}
		else {
			$('#childrenspodcasterror').html('Please supply an email address');
		}
		
		return false;
	}

// components/huffpo-popin.html

	function tipsheetSubscribe() {
		var email = $('#huffpo_email').val();
		if(email != 'Email address') {
			$.ajax({
				url: '/pw/signup.json',
				dataType: 'json',
				data: {
					list: 6,
					address: email
				},
				success: function(json) {
					if(json.status === 'ok') {
						_gaq.push(['_trackEvent', 'Newsletter', 'Signup', 'slidein huffpo']);
						$('#huffpo-popin').hide();
					}
					else {
						alert(json.status);
					}
				},
				error: function (request, status, error) {
					if(request.responseText) {
						alert(request.responseText);
					}
				}
			});
		}
		else {
			alert('please enter your email address');
		}
	}
	
	function huffPo(e) {
		this.element = e;
		
		this.start = function(mode) {
			params = getQueryStringParams();
			
			if(params['utm_source'] == 'huffpo') {
				$('.huffpo-close').click(
					function(instance) { 
						return function(e) {
							$(instance.element).hide("slide", { direction: "right" }, 1000)
						}
					}(this)
				);
				$(this.element).show("slide", { direction: "right" }, 1000)
			}
		};
		
		this.stop = function() {
		};
	}

// components/bookshelf-popin.html

	function bookshelfSubscribe() {
		var email = $('#bookshelf_email').val();
		if(email != 'Email address') {
			$.ajax({
				url: '/pw/signup.json',
				dataType: 'json',
				data: {
					list: 3,
					address: email
				},
				success: function(json) {
					if(json.status === 'ok') {
						_gaq.push(['_trackEvent', 'Newsletter', 'Signup', 'slidein bookshelf']);

						$('#bookshelf-popin').hide();
					}
					else {
						alert(json.status);
					}
				},
				error: function (request, status, error) {
					if(request.responseText) {
						alert(request.responseText);
					}
				}
			});
		}
		else {
			alert('please enter your email address');
		}
	}
	
	function bookShelf(e) {
		this.element = e;
		
		this.start = function(mode) {
			params = getQueryStringParams();

			var rateLimit = getCookie('booshelfpopin');
			var inchildrens = ($(this.element).data('topic') == 4);
			var newsletter = params['utm_source'] == 'Publishers+Weekly';

			if(inchildrens && !rateLimit && !newsletter) {
				setCookie('booshelfpopin','1');
				$('.bookshelf-close').click(
					function(instance) { 
						return function(e) {
							$(instance.element).hide("slide", { direction: "right" }, 1000)
						}
					}(this)
				);
				$(this.element).show("slide", { direction: "right" }, 1000)
			}
		};
		
		this.stop = function() {
		};
	}

// components/subscribe-popin.html
	
	function subscribePopin(e) {
		this.element = e;
		
		this.start = function(mode) {
			var params = getQueryStringParams();
			
			var loggedIn = getCookie('credentials');
			var rateLimit = getCookie('subscribepopin');
			var force = params['utm_source'] == 'subscribepopin';
			var huffpo = params['utm_source'] == 'huffpo';
			var want = (responsive.scale !== 'small');
			
			if(force || (want && !loggedIn && !rateLimit && !huffpo)) {
				setCookie('subscribepopin','1');
				$('.subscribepopin-close').click(
					function(instance) { 
						return function(e) {
							$(instance.element).hide("slide", { direction: "right" }, 1000)
						}
					}(this)
				);
				$(this.element).show("slide", { direction: "right" }, 1000)
			}
		};
		
		this.stop = function() {
		};
	}

// components/jobzone-slider.html

	function jobzoneSlider(e) {
		this.element = e;
		this.slides = [];
		this.running = false;
		this.currentIndex = -1;
		
		this.want = function() {
			return responsive.scale != 'small';
		};
		
		this.ready = function(response) {
			$(this.element).empty().append(response.result);
			this.slides = $(this.element).find('div');
			$(this.element).find('.nextlink').click(
				function(instance) {
					return function(e) {
						e.preventDefault();
						instance.nextSlide();
					}
				}(this)
			);
		};
		
		this.start = function(mode) {
			if(this.slides.length) {
				this.running = true;
				this.nextSlide();
			}
		};
		
		this.stop = function() {
			if(this.running) {
				window.clearTimeout(this.running);
				this.running = undefined;
			}
		};
		
		this.nextSlide = function() {
			if(this.currentIndex < this.slides.length -1) {
				if(this.currentIndex > -1) {
					$(this.slides[this.currentIndex]).hide('slide',{direction:'left'},1000);
				}
				++this.currentIndex;
				$(this.slides[this.currentIndex]).show('slide',{direction:'right'},1000);
				
				/*
				this.running = window.setTimeout(
					function(instance) {
						return function() {
							instance.nextSlide();
						}
					}(this),5000
				);
				*/
			}
			else {
				this.running = undefined;
				loadPage('/pw/jobzone/index.html');
			}
		};		
	}

// components/article-poll.html

	function articlePoll(e) {
		this.element = e;

		this.ajaxArgs = jQuery.parseJSON($(this.element).html());

		this.want = function () {	
			return responsive.mobile == false && responsive.scale == 'large';
		}
		
		this.ready = function (response) {
			var xmldoc = jQuery.parseXML(response.result);
			
			var status = this.getXmlFirstChildData('status',xmldoc);
			if(status == 'ok') {
				var vote = this.getXmlFirstChildData('vote',xmldoc);
				if(vote) { // if we voted, show results
					var html 		= '';
					var id 			= this.getXmlFirstChildData('id', xmldoc);
					var question 	= this.getXmlFirstChildData('question', xmldoc);
					var total_votes = this.getXmlFirstChildData('total_votes', xmldoc);
					var options 	= xmldoc.getElementsByTagName('record');
					
					html = question;
					
					for(var i = 0; i < options.length; i++) {
						var row			= this.getXmlFirstChildData('row',options[i]);
						var sequence	= this.getXmlFirstChildData('sequence',options[i]);
						var option		= this.getXmlFirstChildData('option',options[i]);
						var vote_count	= this.getXmlFirstChildData('vote_count',options[i]);
						
						var percentage;
						
						if(total_votes) {
							percentage = sprintf('%02d', vote_count / total_votes * 100);
						}
						
						html += '<div style="margin-top:4px;"> ' + option + '<div class="article_poll_chart article_poll_chart_' + i + '" style="width:' + percentage + '%;">' + percentage + '%' + '</div></div>';
					}
					
					$(this.element).html(html).show();
				}
				else { // show the form
					var html 		= '';
					var id 			= this.getXmlFirstChildData('id', xmldoc);
					var question 	= this.getXmlFirstChildData('question', xmldoc);
					var total_votes = this.getXmlFirstChildData('total_votes', xmldoc);
					var options 	= xmldoc.getElementsByTagName('record');
					
					html = question;
					
					for(var i = 0; i < options.length; i++) {
						var row			= this.getXmlFirstChildData('row',options[i]);
						var sequence	= this.getXmlFirstChildData('sequence',options[i]);
						var option		= this.getXmlFirstChildData('option',options[i]);
						var vote_count	= this.getXmlFirstChildData('vote_count',options[i]);
						
						html += '<br><input type=radio value="' + row + '"> ' + option;
					}
					
					$(this.element).html(html).show();
					
					var instance=this;
					$(instance.element).find('input').change(function () {
						instance.vote(this.value);
					});
				}
			}
			else {
				alert('could embed poll ' + status);
			}
		}

		this.vote = function(option) {
			this.ajaxArgs.input.option = option;

			var ajaxComponents = [];
			ajaxComponents.push( {
				'id': this.element.id,
				'src': $(this.element).data('ajaxsrc'),
				'args': this.ajaxArgs.input
			});

			ajaxRequest(ajaxComponents);
		}
	
		this.getXmlFirstChildData = function(tag,xmldoc) {
		
			var node = xmldoc.getElementsByTagName(tag).item(0);
		
			if(node && node.firstChild) { 
				return unescape(node.firstChild.data);
			}
			else {
				return "";
			}
		}
	}
	
	/**
	*
	*  Javascript sprintf
	*  http://www.webtoolkit.info/
	*
	*
	**/
	
	sprintfWrapper = {
	
		init : function () {
	
			if (typeof arguments == "undefined") { return null; }
			if (arguments.length < 1) { return null; }
			if (typeof arguments[0] != "string") { return null; }
			if (typeof RegExp == "undefined") { return null; }
	
			var string = arguments[0];
			var exp = new RegExp(/(%([%]|(\-)?(\+|\x20)?(0)?(\d+)?(\.(\d)?)?([bcdfosxX])))/g);
			var matches = new Array();
			var strings = new Array();
			var convCount = 0;
			var stringPosStart = 0;
			var stringPosEnd = 0;
			var matchPosEnd = 0;
			var newString = '';
			var match = null;
	
			while (match = exp.exec(string)) {
				if (match[9]) { convCount += 1; }
	
				stringPosStart = matchPosEnd;
				stringPosEnd = exp.lastIndex - match[0].length;
				strings[strings.length] = string.substring(stringPosStart, stringPosEnd);
	
				matchPosEnd = exp.lastIndex;
				matches[matches.length] = {
					match: match[0],
					left: match[3] ? true : false,
					sign: match[4] || '',
					pad: match[5] || ' ',
					min: match[6] || 0,
					precision: match[8],
					code: match[9] || '%',
					negative: parseInt(arguments[convCount]) < 0 ? true : false,
					argument: String(arguments[convCount])
				};
			}
			strings[strings.length] = string.substring(matchPosEnd);
	
			if (matches.length == 0) { return string; }
			if ((arguments.length - 1) < convCount) { return null; }
	
			var code = null;
			var match = null;
			var i = null;
	
			for (i=0; i<matches.length; i++) {
	
				if (matches[i].code == '%') { substitution = '%' }
				else if (matches[i].code == 'b') {
					matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(2));
					substitution = sprintfWrapper.convert(matches[i], true);
				}
				else if (matches[i].code == 'c') {
					matches[i].argument = String(String.fromCharCode(parseInt(Math.abs(parseInt(matches[i].argument)))));
					substitution = sprintfWrapper.convert(matches[i], true);
				}
				else if (matches[i].code == 'd') {
					matches[i].argument = String(Math.abs(parseInt(matches[i].argument)));
					substitution = sprintfWrapper.convert(matches[i]);
				}
				else if (matches[i].code == 'f') {
					matches[i].argument = String(Math.abs(parseFloat(matches[i].argument)).toFixed(matches[i].precision ? matches[i].precision : 6));
					substitution = sprintfWrapper.convert(matches[i]);
				}
				else if (matches[i].code == 'o') {
					matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(8));
					substitution = sprintfWrapper.convert(matches[i]);
				}
				else if (matches[i].code == 's') {
					matches[i].argument = matches[i].argument.substring(0, matches[i].precision ? matches[i].precision : matches[i].argument.length)
					substitution = sprintfWrapper.convert(matches[i], true);
				}
				else if (matches[i].code == 'x') {
					matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(16));
					substitution = sprintfWrapper.convert(matches[i]);
				}
				else if (matches[i].code == 'X') {
					matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(16));
					substitution = sprintfWrapper.convert(matches[i]).toUpperCase();
				}
				else {
					substitution = matches[i].match;
				}
	
				newString += strings[i];
				newString += substitution;
	
			}
			newString += strings[i];
	
			return newString;
	
		},
	
		convert : function(match, nosign){
			if (nosign) {
				match.sign = '';
			} else {
				match.sign = match.negative ? '-' : match.sign;
			}
			var l = match.min - match.argument.length + 1 - match.sign.length;
			var pad = new Array(l < 0 ? 0 : l).join(match.pad);
			if (!match.left) {
				if (match.pad == "0" || nosign) {
					return match.sign + pad + match.argument;
				} else {
					return pad + match.sign + match.argument;
				}
			} else {
				if (match.pad == "0" || nosign) {
					return match.sign + match.argument + pad.replace(/0/g, ' ');
				} else {
					return match.sign + match.argument + pad;
				}
			}
		}
	}
	
	sprintf = sprintfWrapper.init;	

// components/chldrns-slidein.html
	
	function childrnsSlidein(e) {
		this.element = e;
		
		this.start = function(mode) {
			var params = getQueryStringParams();
			
			var rateLimit = getCookie('chldrns-slidein');
			var inchildrens = ($(this.element).data('topic') == 4);
			var newsletter = params['utm_source'] == 'Publishers+Weekly';
			
			if(!rateLimit && newsletter || inchildrens) {
				setCookie('chldrns-slidein','1');
				$('.childrns-slidein-close').click(
					function(instance) { 
						return function(e) {
							$(instance.element).hide("slide", { direction: "right" }, 1000)
						}
					}(this)
				);
				$(this.element).show("slide", { direction: "right" }, 1000)
			}
		};
		
		this.stop = function() {
		};
	}

// components/slidein-bb2013.html
	
	function bb2013Slidein(e) {
		this.element = e;
		
		this.start = function(mode) {
			var params = getQueryStringParams();
			
			var rateLimit = getCookie('bb2013-slidein');
			var newsletter = params['utm_source'] == 'Publishers+Weekly';
			
			if(!rateLimit) {
				setCookie('bb2013-slidein','1');
				$('.bb2013-slidein-close').click(
					function(instance) { 
						return function(e) {
							$(instance.element).hide("slide", { direction: "right" }, 1000)
						}
					}(this)
				);
				$(this.element).show("slide", { direction: "right" }, 1000)
			}
		};
		
		this.stop = function() {
		};
	}
