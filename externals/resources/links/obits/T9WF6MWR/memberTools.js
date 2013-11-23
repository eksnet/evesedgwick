/*    
 $Id: memberTools.js 130976 2013-09-04 14:07:04Z patelj $    
 (c) 2009 The New York Times Company    
*/

NYTD.Blogs = NYTD.Blogs || {};

// User data
NYTD.Blogs.User =
    Class.create({
        initialize: function(name, uid) {
            this.name = name;
            this.id = uid;
        },
        getName: function() {
            return this.name;
        },
        getId: function() {
            return this.id;
        },
        isLoggedIn: function() {
            return this.name != '';
        },
      fillInMemberTools: function() {

      var memberBar = $('memberTools');
      memberBar.innerHTML = '';
      
      /* lets make sure both adxads and adxpos_Bar1 are defined */
      if ((typeof NYTD.Blogs.Ads != "undefined") && (typeof NYTD.Blogs.Ads.Bar1 != "undefined")){
		/* adxads[adxpos_Bar1] contains <li>{AD}</li> */
		memberBar.update(NYTD.Blogs.Ads.Bar1.creative);
      }

      if ( typeof NYTD.Blogs.user != 'undefined' && NYTD.Blogs.user.isLoggedIn() ) {

        var moreLi = new Element('li').update("Welcome, ");
        var liA = new Element('a', { 'href': 'http://www.nytimes.com/membercenter/' }).update(NYTD.Blogs.user.getName());
		var liSpan = new Element('span', {'class':'username'}).update(liA);
        moreLi.appendChild(liSpan);
        memberBar.appendChild(moreLi);

        moreLi = new Element('li');
        liA = new Element('a', { 'href': 'http://www.nytimes.com/logout' }).update("Log Out");
        moreLi.appendChild(liA);
        memberBar.appendChild(moreLi);

        moreLi = new Element('li');
        liA = new Element('a', { 'href': 'http://www.nytimes.com/membercenter/sitehelp.html' }).update("Help");
        moreLi.appendChild(liA);
        memberBar.appendChild(moreLi);
      }
      else if(typeof NYTD.Blogs.user != 'undefined' && !NYTD.Blogs.user.isLoggedIn()) {

        li = new Element('li');
        var logInA = new Element('a', { 'href': 'http://www.nytimes.com/auth/login?URI=' + document.location }).update("Log In");
        li.appendChild(logInA);
        memberBar.appendChild(li);

        li = new Element('li');
        var registerA = new Element('a', { 'href': 'http://www.nytimes.com/gst/regi.html', 'onclick': "dcsMultiTrack('WT.z_ract', 'Regnow', 'WT.z_rprod', 'Masthead');"}).update("Register Now");
        li.appendChild(registerA);
        memberBar.appendChild(li);
      }
      }
      });
