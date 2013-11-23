
function NewsletterAjaxHandler() { }
NewsletterAjaxHandler._path = '/dwr';

NewsletterAjaxHandler.signUpNewsletters = function(p0, callback) {
    DWREngine._execute(NewsletterAjaxHandler._path, 'NewsletterAjaxHandler', 'signUpNewsletters', p0, false, false, callback);
}
