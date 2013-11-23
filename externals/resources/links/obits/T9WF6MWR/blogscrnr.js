NYTD.Blogs.CommentCounts = (function($) {
	
	function showCounts() {
	
		NYTD.Blogs.Host = document.domain;
		
		var postUrls = [];
		
		$("a.commentCountLink").each(function() {
			postUrls.push($(this).attr("href").replace(/#/,''));
		});
		
		if(postUrls.length == 0) {
			if(typeof console !== "undefined") { console.log( "no urls on the page with .commentCountLink class" ); }
			return;
		}
		
		postUrls = $.unique(postUrls);
		
		var blogsCommunityRequest = 'http://'+NYTD.Blogs.Host+'/svc/community/V2/requestHandler?requestData={"userContentSummary":{"request":{"requestType":"UserContentSummary","url":["' + postUrls.join('","') + '"]}}}';
		
		$.ajax({
			type: "GET",
			url: blogsCommunityRequest,
			dataType: "json"
		}).done(function(blogsCommunityResponse) {

			if(!blogsCommunityResponse.userContentSummary) {
				if(typeof console !== "undefined") { console.log( "No response" ); }
				return;
			}
			
			/* 
			 * if there is only one post on blog page, JSON response will not have "assets"
			 * if there is more than one post on blog page, JSON response will have "assets"
			 * 
			 * */
	
			var assetObj = blogsCommunityResponse.userContentSummary.response.UserContentSummary;
			var assetsInResponse = assetObj.assets || [assetObj];
			
			if(!assetsInResponse) {
				if(typeof console !== "undefined") { console.log( "No assetsInResponse" ); }
				return;
			}
			
			$.each(assetsInResponse, function(index, blogsPostCommentCounts) {
				var commentCountText = '';
				var postUrl = blogsPostCommentCounts.url;
				var commentCount = blogsPostCommentCounts.commentCount || 0; //commentCount may not exist in the response
				//console.log(postUrl + commentCount);
				var postAnchor = $("a.commentCountLink[href='" + postUrl + "']");
				if(commentCount === 0) {
						commentCountText = 'Comment';
						postAnchor.not(".commentCountNoPrompt")
							.html(commentCountText)
							.removeClass("hidden")
							.attr("href", postUrl + "#postComment")
							.end()
							.filter(".commentCountNoPrompt")
							.parent(".postMetaHeaderCommentCount") //remove parent .postMetaHeaderCommentCount if it exists.
							.remove()
							.end()
							.filter(".commentCountNoPrompt")
							.parents(".commentCountBubble") //remove parent .commentCountBubble if it exists
							.remove()
							.end();
				}
				else {
					commentCountText = (commentCount === 1) ? '1 Comment' : commentCount + ' Comments';
					postAnchor.not(".commentCountNumberOnly")
						.html(commentCountText)
						.removeClass("hidden")
						.attr("href", postUrl + "#postComment")
						.end()
						.filter(".commentCountNumberOnly")
						.html(commentCount)
						.removeClass("hidden")
						.attr("href", postUrl + "#postComment")
						.end(); //verbose
				}
			});
		}).fail(function(jqXHR, requestStatus) {
			if(typeof console !== "undefined") { console.log( "Comment Count Request failed: " + requestStatus ); }
		});
	}
	
	return {
        updateCommentCounts: showCounts
    };
})(NYTD.jQuery);

NYTD.jQuery(document).ready(function() {
	NYTD.Blogs.CommentCounts.updateCommentCounts();
});
