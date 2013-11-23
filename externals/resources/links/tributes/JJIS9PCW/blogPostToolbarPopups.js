/* EMAIL */
$(document).ready(function() {
    if ($('.comment_count') && $('div.comment').size() > 0) {
        $('.comment_count').html('(<span>' + $('div.comment').size() + '</span>)')
    }
    $('#email-popup').jqm({ onShow: chronShow, onHide: chronHide, trigger: 'a.show-email', modal: 'true' });

    var f = $('#emailContentForm');
    var options = {
        dataType: 'json',
        resetForm: false,
        clearForm: false,
        beforeSubmit: function() {
            var valid = true;
            var error = null;
            var to = $('#emailContentForm [name=to]').val();
            var from = $('#emailContentForm [name=from]').val();
            if (!isValidEmail(to)) {
                valid = false;
                error = 'to';
            }
            if (!isValidEmail(from)) {
                valid = false;
                error = 'from';
            }
            if ($('#emailContentForm [name=subject]').val() == '') {
                valid = false;
                error = 'subject';
            }
            if (!valid) {
                clicks = 0;
                $('#emailContentForm').ajaxForm(options);
                $('#emailContentError').html('Missing/invalid required field (' + error + ').');
                return false;
            }
        },
        success: function(response) {
            if (response.status == 'ok') {
                var m = '<p class="message">' + response.message + '</p>';
            } else {
                var m = '<p class="error_message">' + response.message + '</p>';
            }
            //$('#emailContentForm').resetForm();
            //$('#emailContentForm').clearForm();
            $('#emailContentForm .formclear').clearFields();
            $('#emailContentError').html('');
            $('#system-message').html(mod_unescape(m));
            $('#email-popup').jqmHide();
            window.location.href = "#top";
            clicks = 0;
        }
    }
    $('#emailContentForm').ajaxForm(options);
});
var isValidEmail = function(email) {
    var re = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i;
    if (!email.match(re)) return false;
    return true;
}
var updateEmailForm = function(type, ref, url, title) {
    $('#emailContentForm [name=type]').val(type);
    $('#emailContentForm [name=ref]').val(ref);
    $('#emailContentForm [name=url]').val(escape(url));
    $('#emailContentForm [name=title]').val(escape(title));
    $('#emailContentForm [id=emailContentTitle]').html(title);
}


/* SHARE */

//Init share modal popup
$(document).ready(function() {
    $('#share-popup').jqm({ onShow: chronShow, onHide: chronHide, trigger: 'a.show-share', modal: 'true'});
});

//modifies generated share code for specific blog-post
var updateShareLinks = function(url, title, abstract) {
    var shares = ['delicious', 'digg', 'facebook', 'linkedin', 'mixx', 'reddit', 'twitter', 'buzz'];

    for (var x in shares) {
        if (document.getElementById('share_' + shares[x])) {
            var share = document.getElementById('share_' + shares[x]);
            share.href = '';

            switch (shares[x]) {
            case 'delicious':
                share.href = 'http://del.icio.us/submit?url=' + escape(url) + '&title=' + escape(title);
                break;
            case 'digg':
                share.href = 'http://www.digg.com/submit?phase=2&url=' + escape(url);
                break;
            case 'facebook':
                share.href = 'http://www.facebook.com/sharer.php?u=' + escape(url) + '&t=' + escape(title);
                break;
            case 'linkedin':
                share.href = 'http://www.linkedin.com/shareArticle?mini=true&url=' + url + '&title=' + escape(title) + '&summary=' + escape(abstract) + '&source=';
                break;
            case 'mixx':
                share.href = 'http://www.mixx.com/submit?page_url=' + escape(url);
                break;
            case 'reddit':
                share.href = 'http://www.reddit.com/submit?url=' + escape(url) + '&title=' + escape(title);
                break;
            case 'twitter':
                share.href = 'http://twitter.com/home?status=' + url;
                break;
            case 'buzz':
                var s = '<script type="text/javascript" src="http://d.yimg.com/ds/badge2.js" badgetype="logo">';
                s += url;
                s += '</sript>';
                share.innerHTML = s;
                break;
            }
        }
    }
}

//prevents multiple clicks for sending emails, etc.
var clicks = 0;
var oneClick = function() {
    clicks++;
    if (clicks > 1) {
        return false;
    }
    return true;
}
