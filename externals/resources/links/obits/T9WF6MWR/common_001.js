/*    
$Id: common.js 75925 2011-09-14 16:13:13Z christopher.sanders $
/js/blogs_v3/nyt_universal/js/common.js
(c) 2006-2010 The New York Times Company
*/

NYTD.Blogs = NYTD.Blogs || {};

NYTD.Blogs.EmptyLeaderboardConcealer = function() {
    var leaderboard = $('TopAd');
    var image = leaderboard.down('img');
    var attribute = image.readAttribute('src');
    if (attribute === 'http://graphics8.nytimes.com/ads/blank.gif') {
        image.up('div').hide();
    }
};

// The following are used by the comments form
CommentsValidator = {

    // highlights a form field w/ a missing value
    highlightElement: function(element) {
        element.style.background = '#FFFFDD';
    },

    // removes highlighting
    resetElement: function(element) {
        element.style.background = '';
    },

    // adds a message saying that a field is invalid
    addWarning: function(message) {
        var element = document.getElementById('warnings');
        element.innerHTML = element.innerHTML + '<li>' + message + '</li>';
        element.style.display = 'block';
    },

    // removes all messages
    clearWarnings: function() {
        var element = document.getElementById('warnings');
        element.innerHTML = '';
        element.style.display = 'none';
    },

    // turnkey: checks the add a comment form for completeness
    validateForm: function() {
        var author = document.getElementById('author');
        var email = document.getElementById('email');
        var comment = document.getElementById('comment');
        var ret = true;

        // reset state from previous invokation
        this.clearWarnings();
        this.resetElement(author);
        this.resetElement(email);
        this.resetElement(comment);

        // author must have a value
        if (!author.value) {
            this.highlightElement(author);
            this.addWarning('Please enter your name');
            ret = false;
        }

        // email must have a value
        if (!email.value) {
            this.highlightElement(email);
            this.addWarning('Please enter your e-mail address');
            ret = false;
        }

        // email must be valid: defined as containing one dot (.) and one
        // at sign (@) with the at sign coming first.
        if (email.value) {
            var atpos = email.value.lastIndexOf('@');
            var dotpos = email.value.lastIndexOf('.');

            if (atpos < 0 || dotpos < atpos) {
                this.highlightElement(email);
                this.addWarning('That e-mail address is not valid');
                ret = false;
            }
        }

        // comments must have a value
        if (!comment.value) {
            this.highlightElement(comment);
            this.addWarning('Please enter your comment');
            ret = false;
        }

        // let the user know that it's normal not to see the comment
        // immediately
        if (ret == true) {
            alert('Your comment will appear once it has been approved.');
        }

        return ret;
    }

}

/* sharetool functions */

function showHideShareTool (id1, id2) {

    if (document.getElementById) {
        if (document.getElementById(id1).className == 'hide') {
            document.getElementById(id1).className = 'show';
            document.getElementById(id2).className = 'sharebox';
        } else {
            document.getElementById(id1).className = 'hide';
            document.getElementById(id2).className = 'share';
        }
    }
    return false;
}

function blogPostShare(site, keywords, pubdate, theID) {

  	var title = '';
  	var description = '';
  	var popUpUrl = '';
  	var byline = '';
  	var formCtl;
  	var formID = 'emailThis_' + theID;
  	var section = '';
  
  	if(document.getElementById) {
    		formCtl = document.getElementById(formID);
    		if(formCtl) {
      			description = formCtl.description.value;
      			title = formCtl.title.value;
      			popUpUrl = formCtl.url.value;
      			byline = 'By ' + formCtl.author.value;
      			section = formCtl.section.value;
    		}
  	}

  	switch (site) {
      	case "facebook":
        		postPopUp('http://www.facebook.com/sharer.php?u=' + popUpUrl 
                + '&t=' + title, 
                'facebook', 
                'toolbar=0,status=0,height=436,width=646,scrollbars=yes,resizable=yes');
        		s_code_linktrack('Article-Tool-Share-Facebook');
        		break;
      	case "digg":
        		postPopUp('http://digg.com/remote-submit?phase=2&url=' + popUpUrl 
                + '&title=' + title 
                + '&bodytext=' + description, 
                'digg', 
                'toolbar=0,status=0,height=450,width=650,scrollbars=yes,resizable=yes');
        		s_code_linktrack('Article-Tool-Share-Digg');
        		break;
      	case "permalink":
        		postPopUp('http://www.nytimes.com/export_html/common/new_article_post.html?url=' + popUpUrl 
                + '&title=' + title 
                + '&summary=' + description 
                + '&section=' + section 
                + '&pubdate=' + pubdate 
                + '&byline=' + byline, 
                'permalink', 
                'toolbar=0,status=0,height=410,width=490,scrollbars=yes,resizable=no');
      		  s_code_linktrack('Article-Tool-Share-Permalink');
      		  break;
        case "linkedin":
      		  postPopUp(
      		     'http://www.linkedin.com/shareArticle?mini=true'
      			   + '&url=' + popUpUrl
      			   + '&title=' + title
      			   + '&summary=' + description
      			   + '&source=' + 'The New York Times',
      			   'linkedin',
      			   'toolbar=0,status=0,height=550,width=700,scrollbars=yes,resizable=no');
      		s_code_linktrack('Article-Tool-Share-LinkedIn');
      		break;
        case "reddit":
            postPopUp(
                'http://www.reddit.com/submit?url=' + popUpUrl 
                + '&title=' + title,
                'reddit',
      			    'toolbar=0,status=0,height=550,width=700,scrollbars=yes,resizable=no');
            s_code_linktrack('Article-Tool-Share-Reddit');
            break;
        case "tumblr":
            postPopUp(
                'http://www.tumblr.com/share/link?url=' + popUpUrl 
                + '&name=' + title 
                + '&description=' + description,
                'tumblr',
      		      'toolbar=0,status=0,height=550,width=700,scrollbars=yes,resizable=no');
            s_code_linktrack('Article-Tool-Share-Tumblr');
            break;
  	}
}

function postPopUp(url, name, params) {
    var win = window.open(url, name, params);
    if(win) {
        win.focus();
    }
}

/* sharetool functions end */

function blogPostPrint(keywords, pubdate, theID, printPostURL, blogImageURL) {

  	var title = '';
  	var description = '';
  	var popUpUrl = '';
  	var byline = '';
  	var formCtl;
  	var formID = 'emailThis_' + theID;
  	var section = '';
  	var full_text = '';
  
  	if(document.getElementById) {
    		formCtl = document.getElementById(formID);
    		if(formCtl) {
      			description = formCtl.description.value;
      			title = formCtl.title.value;
      			popUpUrl = formCtl.url.value;
      			byline = 'By ' + formCtl.author.value;
      			section = formCtl.section.value;
      			full_text = formCtl.full_text.value;
    		}
  	}
  
  	postPopUp(printPostURL + '?ID=' + theID + '&full_text=parent_form_text', 
        'printthis', 
        'menubar=1,toolbar=0,status=0,height=445,width=650,scrollbars=yes,resizable=yes');

}

function sortTagArchive(val) {
	  javascript:window.location.href='?orderby=' + val;
}


