if (!window.SA) {window.SA = {};}

SA.redirection_mobile = function(configuration) {

  // Retrieve the User Agent of the browser
  var agent = navigator.userAgent.toLowerCase();

  // configuration object
  var config = configuration || {};
  
  // new url for the mobile site domain 
  var mobile_host = config.mobile_url;
  
  // protocol for the mobile site domain 
  var mobile_protocol = config.mobile_scheme ?
    config.mobile_scheme + ":" :
      document.location.protocol;

  //Check if the UA is a ME Supported one
  var regex_ios = /((iPhone\sOS|iPod\sOS))\s(4_|5_|6_|7_)/i;
  var regex_an = /Android\s+(2.3|4.).*Mobile/i;
  var regex_bb = /(BlackBerry|BB10.+Mobile)/i
  if (agent.match(regex_ios) || agent.match(regex_an)) {
    document.location.href = mobile_protocol + "//" + mobile_host;
  } else if (agent.match(regex_bb)) {
    var selector = '.bb.html';

    // A cookie called "bb_disabled" is applied to force full-site view on Blackberry
    // Also don't redirect if "bb" selector is already there – avoids infinite redirecting
    if (document.cookie && document.cookie.indexOf('bb_disabled') == -1 && (document.location.pathname).indexOf(selector) == -1) {
      var path = (document.location.pathname != '/' && document.location.pathname != localprefix + '/') ? document.location.pathname : localprefix + '/index.html';
      var url = document.location.protocol + '//' + document.location.host + (path).replace(/\.html$/gi, selector);
      document.location.href = url;
    }

  }
};  