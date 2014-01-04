if (typeof jQuery != 'undefined'){
	// $.noConflict();
	// jQuery(document).ready(function($) {
	$(document).ready(function() {

		var debugMode = false;		//set to true when you're testing so that alerts are displayed instead of the gif being sent to google.

		//if in debug mode this alerts the data, if not in debug mode this sends the data to google.
		sendData = function (category, action, label, value, noninteraction){
			if(!debugMode){
				if(category&&action){
					try{
						_gaq.push(['_trackEvent', category, action, label, value, noninteraction]);
					}catch(err){}
				}
			}else{
				alert("Category: " + category + ". action: " + action + ". label: " + label + ". value: " + value + ". noninteraction: " + noninteraction);
			}
		}

		//track various download links
		ga_track = function (target){
			$(target).each(function(index) { //rewrite all links matching target

				$(this).click(function (event){
					var href;
					var hrefTarget = $(this).prop("target");
					var category;
					var action;
					var label;
					
					href = $(this).attr('href');
					
					if(href.match(("(.pdf$)|(.xlsx?$)"))){      //if the link ends with .pdf, .xls, or .xlsx then it's a download
		 				category = "Download";
		 				action = href.match(/([^/]+)$/)[1];
		 			}else if(href.match(("^https?://"))){   //if the link starts with http:// or https:// then it's an external link
		 				category = "External Link";
		 				action = href;
		 			}else if(href.substring(0,7) === "mailto:"){    //if the link starts with mailto: then it's a mailto link
		 				category = "Contact";
		 				action = href;
		 			}
		 			else{
		 			}
				 
				 	if($(this).find("img").length > 0){    //if this is an image link
						if($(this).find("img").prop("alt")){
							label = $(this).find("img").prop('alt');
						}else{
							label = "image";
						}
					}else{
						label = $(this).text();
					}

					if (event.metaKey || event.ctrlKey ||hrefTarget == "_blank"){
						var newTab = true;
					}

					sendData(category,action,label);

					if (!newTab){
						event.preventDefault();
					 	setTimeout('location.href = "'+href+'"', 200); //delay is set before redirection so google gets a chance to send tracking gif
					}			
				});
			});
		}

		//mailto links.
		ga_track("a[href^='mailto']");
		
		//.pdf
		ga_track("a[href$='.pdf']");
			
		//.xls
		ga_track("a[href$='.xls']");

		//.xlsx
		ga_track("a[href$='.xlsx']");

		var hostname = window.location.hostname;
		
		//external links that aren't pdf, xls, or xlsx
		ga_track("a[href^='http://']:not([href$='.pdf'],[href$='.xls'],[href$='.xlsx'],[href^='http://" + hostname + "'])");
		ga_track("a[href^='https://']:not([href$='.pdf'],[href$='.xls'],[href$='.xlsx'],[href^='https://" + hostname + "'])");

		//to track e-mail newsletter subscriptions
		$("form[action^='http://vqronline.us5.list-manage.com/subscribe/post']").submit(function(event) {
			event.preventDefault(); // disable the default submit action
			var form = this;
			var category = "E-Mail Newsletter Subscription";
		 	var action = $(this).prop("action");
		 	//var label = $(this).find("input[name='EMAIL']").prop("value");     //This might count as PII so we won't track it just in case.
			sendData(category,action);
			setTimeout(function() { // after .2 seconds, submit the form
			    form.submit();
			}, 200);
		});

		//to track clicks of the "Buy Now" buttons on /issues/
		$("form[action='http://store.vqronline.org/cart/add']").submit(function(event) {
			event.preventDefault(); // disable the default submit action
			var form = this;
			var category = "Add Individual Issue to Cart";
		 	var action = $(this).prev("h1").children("a").prop("href");
		 	var label = $(this).prev("h1").children("a").prop("text");
			sendData(category,action,label);
			setTimeout(function() { // after .2 seconds, submit the form
			    form.submit();
			}, 200);
		});

		//to track submissions of the add to cart buttons on http://store.vqronline.org/products/subscription and http://store.vqronline.org/products/digital-subscription
		$("form[action='/cart/add']").submit(function(event) {
			event.preventDefault(); // disable the default submit action
			var form = this;
			var category = "Add to Cart";
			var action = $("#product-select").find(":selected").text();
		 	var label = window.location.pathname;
			sendData(category,action,label);
			setTimeout(function() { // after .2 seconds, submit the form
			    form.submit();
			}, 200);
		});

		//to track submissions of blog comments
		// $("form[id='commentform']").submit(function(event) {
		// 	event.preventDefault(); // disable the default submit action
		// 	var form = this;
		// 	var category = "Submit Blog Comment";
		// 	var action = window.location.href;
		// 	var commentJustPosted = $(this).find("textarea[id^='comment']").text();
		// 	var wordCount = commentJustPosted.split(' ');
		// 	var value = wordCount.length;
		// 	var noninteraction = true; //we don't want this to effect bounce rate calculations
		// 	console.log("Category: " + category + ". action: " + action + ". label: undefined" + ". value: " + value + ". noninteraction: " + noninteraction);
		// 	sendData(category,action, 'undefined', value, noninteraction);
		// 	setTimeout(function() { // after .2 seconds, submit the form
		// 	    HTMLFormElement.prototype.submit.call(form);
		// 	    //form.submit();
		// 	}, 200);
		// });
		// var href = window.location.href;
		// //console.log(href);
		// var blogCommentRegEx = /blog\/(.*)\/#comment-/;
		// if (blogCommentRegEx.test(href)){
		// 	//console.log("you're in");
		// 	var category = "Blog Comment";
		// 	var action = href;
		// 	var commentJustPosted = $("li[id^='comment']").last();
		// 	var label = commentJustPosted.children("cite").text();
		// 	var wordCount = commentJustPosted.children("p").text().split(' ');
		// 	var value = wordCount.length;
		// 	var noninteraction = true; //we don't want this to effect bounce rate calculations
		// 	sendData(category,action,label, value, noninteraction);
		// }
	});
} else {

}

