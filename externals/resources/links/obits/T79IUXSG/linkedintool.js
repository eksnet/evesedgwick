/** 
 * $Id: linkedintool.js 78623 2011-10-13 14:48:58Z luis.colon $
 *
 **/
 
var NYTD = window.NYTD || {};
NYTD.ShareTools = NYTD.ShareTools || {};

NYTD.ShareTools.LinkedinTool = (function() {
    var element, position, label, description, headline, longUrl;
    
    var toolbar_item_html = '\
        <li id="linkedin_item">\
            <a id="linkedin_button"><%= label %></a>\
        </li>\
    ';
        
    function initialize(aElement, aPosition) {
        element = aElement;
        position = aPosition;
        label = 'Linkedin';
        draw();
    }

    function draw() {
        var html = NYTD.Template(toolbar_item_html, { label: label });
        var insertion = {};
        insertion[position] = html;
        element.insert(insertion);
        $('linkedin_button').observe('click', onMouseClick);
    }
  
    function onMouseClick(event) {
        post();
        event.stop();
    }
    
    function post() {
        window.open('http://www.linkedin.com/shareArticle?mini=true'
                    + '&url=' + longUrl
                    + '&title=' + headline
                    + '&summary=' + description
                    + '&source=' + 'The New York Times',
                    'Linkedin',
                    'toolbar=0,status=0,height=550,width=575,scrollbars=yes,resizable=no'
        );
        s_code_linktrack('Article-Tool-Share-LinkedIn');
    }

    function setMetaValues(meta) {
        headline = meta.getHeadline();
        longUrl = meta.getURL();
        description = meta.getDescription();
    }
    
    return {
        initialize: initialize,
        setMetaValues: setMetaValues
    }
})();