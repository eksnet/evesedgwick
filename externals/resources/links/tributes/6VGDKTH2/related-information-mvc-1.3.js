/* Related Information 1.3 */

/** @namespace */
guardian = guardian || {};
/** @namespace */
guardian.related = guardian.related || {};
(function () {

    var omnitureCode = "?INTCMP=ILCNETTXT3487";

    /**
     * @constructor
     */
    function RelatedInformationModel() {
    }

    /**
     * @type {Object} The data in the model
     */
    RelatedInformationModel.prototype.data = null;

    /**
     * Sets all the data on the model
     * @param {object} data The data from the server
     */
    RelatedInformationModel.prototype.setAllData = function (data) {
        this.data = data;
        var related = this.data.response.relatedContent || [];
        this.data.response.relatedContent = _.sortBy(related, date).reverse()
    };

    /**
     * Gets the related content from the response
     * @return {*}
     */
    RelatedInformationModel.prototype.getRelated = function () {
        return this.data.response.relatedContent;
    };


    /**
     * Returns true if the data from the server has one or more related articles
     * @return {Boolean}
     */
    RelatedInformationModel.prototype.hasData = function () {
        var relatedContent = this.getRelated();
        return !!relatedContent.length;
    };

    /**
     * Returns up to three related articles after the first one
     * @return {Array}
     */
    RelatedInformationModel.prototype.middle = function (index1, index2) {
        return _.map(
            this.getRelated().slice(index1, index2 + 1),
            articleMustacheObject
        );
    };

    /**
     * Gets the first related article
     * @return {Object}
     */
    RelatedInformationModel.prototype.first = function () {
        return this.middle(0, 1)[0];
    };

    /**
     * Returns the fifth related article
     * @return {Object}
     */
    RelatedInformationModel.prototype.last = function () {
        return this.middle(4, 5)[0];
    };

    /**
     * Gets the keywords from the response.
     */
    RelatedInformationModel.prototype.getKeywords = function () {

        var allKeywords = this.data.response.content.tags,
            sectionKeywords = _.filter(allKeywords, isSection);

        _.each(sectionKeywords, function attachChildren(sectionKeyword) {

            var sectionTagId = getSectionId(sectionKeyword);

            sectionKeyword.children = _.filter(allKeywords, function findMatchingChildren(keyword) {
                return getSectionId(keyword) === sectionTagId && keyword !== sectionKeyword;
            });

            sectionKeyword.children.sort(byTitle);

        });

        return  _.map(sectionKeywords, tagMustacheObject);


    };

    function date(item) {
        return moment(item.webPublicationDate).valueOf()
    }

    function byTitle(keyword, that) {
        return keyword.webTitle.toLowerCase().localeCompare(that.webTitle.toLowerCase());
    }

    function getSectionId(keyword) {
        return idComponents(keyword)[0];
    }

    function isSection(keyword) {
        var components = idComponents(keyword);
        return components.length === 2 && components[0] === components[1];
    }

    function idComponents(keyword) {
        var tagId = keyword.id;
        return tagId.split("/");
    }

    function articleMustacheObject(obj) {

        if (!obj) {
            return null;
        }

        return {
            thumbnail:obj.fields.thumbnail,
            headline:obj.fields.headline,
            url:obj.webUrl + omnitureCode,
            date:moment(obj.webPublicationDate).format("D MMM YYYY"),
            trailText:obj.fields.trailText
        }

    }

    function tagMustacheObject(obj) {

        if (!obj) {
            return null;
        }

        return {
            title:obj.webTitle,
            children:obj.children ? _.map(obj.children, tagMustacheObject) : null,
            url:obj.webUrl + omnitureCode,
        }

    }

    guardian.related.RelatedInformationModel = RelatedInformationModel;

})();

(function (jQ) {

    /**
     * Initialises the related articles display
     * @param {jQuery} jElement The element or selector
     * @param {guardian.related.RelatedInformationModel} model Holds the data
     * @param {Object} mustache The mustache templating library
     * @constructor
     */
    function RelatedInformationView(jElement, model, renderFn, mustache) {
        this.jElement = jQ(jElement);
        this.model = model;
        this.renderFn = renderFn;
        this.mustache = mustache;
        this.includeStylesheet();
    }

    /**
     * A jQuery object capturing the container that the view will be updating.
     * @type {jQuery}
     * @private
     */
    RelatedInformationView.prototype.jElement = null;

    /**
     * @type {Object} Mustache templating engine
     * @private
     */
    RelatedInformationView.prototype.mustache = null;

    /**
     * A function to render the results
     * @see guardian.related.RelatedInformationView.RENDER_HORIZONTAL
     * @see guardian.related.RelatedInformationView.RENDER_VERTICAL
     * @type {Function}
     */
    RelatedInformationView.prototype.renderFn = null;

    /**
     * @type {guardian.related.RelatedInformationModel}
     * @private
     */
    RelatedInformationView.prototype.model = null;

    /**
     * Brings in the stylesheet. Because the JS doesn't get any information about the context it is running in we have to use
     * an absolute url.
     * @private
     */
    RelatedInformationView.prototype.includeStylesheet = function () {
        jQuery('head').append('<link rel="stylesheet" href="' + guardian.related.baseURI + '/static/related-information-1.3.css" type="text/css" />');
    };

    RelatedInformationView.prototype.updateAll = function () {

        var model = this.model;

        if (!model.hasData()) {
            this.hideContent();
            return;
        }

        this.jElement.html(this.renderFn.apply(this));

        this.showContent();

    };

    /**
     * Renders the related information in a horizontal component
     */
    RelatedInformationView.RENDER_HORIZONTAL = function () {
        var model = this.model;
        return this.template(
            RelatedInformationView.HORIZONTAL_STRUCTURE, {
                keywords:this.template(RelatedInformationView.KEYWORD_LIST, {list:model.getKeywords()}),
                thumbnail1:this.template(RelatedInformationView.THUMBNAIL_STORY, model.first()),
                stories:this.template(RelatedInformationView.STORY_LIST, {list:model.middle(1, 3)}),
                thumbnail2:this.template(RelatedInformationView.THUMBNAIL_STORY, model.last())
            });
    };

    /**
     * Renders the related information in a vertical component
     */
    RelatedInformationView.RENDER_VERTICAL = function () {
        var model = this.model;
        return this.template(
            RelatedInformationView.VERTICAL_STRUCTURE, {
                stories:this.template(RelatedInformationView.STORY_LIST, {list:model.middle(0, 3)})
            });
    };

    /**
     * Helper method to run mustache on the given template and data, returning null if the data is falsy
     * @private
     */
    RelatedInformationView.prototype.template = function (template, data) {
        if (!data) {
            return "";
        } else {
            return this.mustache.to_html(template, data);
        }
    };

    /**
     * Displays a message while related articles are being loaded.
     */
    RelatedInformationView.prototype.showContent = function () {
        this.jElement.removeClass("initially-off");
    };

    /**
     * Replaces the loading message with an error message
     */
    RelatedInformationView.prototype.hideContent = function () {
        this.jElement.addClass("initially-off");
    };

    /**
     * @type {String} Rendering the list of keywords
     */
    RelatedInformationView.KEYWORD_LIST = '' +
        '<div class="related-keywords">' +
        '{{#list}}' +
        '<h4 class="t6">' +
        '<a href="{{url}}">{{title}}</a>' +
        '</h4>' +
        '<ul>' +
        '{{#children}}' +
        '<li>' +
        '<a href="{{url}}" rel="tag">{{title}}</a>' +
        '</li>' +
        ' &middot; ' +
        '{{/children}}' +
        '</ul>' +
        '{{/list}}' +
        '</div>';

    /**
     * @type {String} Rendering a smaller list of related articles
     */
    RelatedInformationView.STORY_LIST = '<ul class="l1d">' +
        '{{#list}}' +
        '<li>' +
        '<p class="t6 related-content-publication-date">{{date}}</p>' +
        '<p class="t7">' +
        '<a href="{{url}}" class="related-content-headline">{{{headline}}}</a>' +
        '</p>' +
        '</li>' +
        '{{/list}}' +
        '</ul>';

    /**
     * @type {String} Rendering a single story with a thumbnail image
     */
    RelatedInformationView.THUMBNAIL_STORY = '<a href="{{url}}" class="related-content-image">' +
        '{{#thumbnail}}' +
        '<img width="140" height="84" src="{{thumbnail}}" alt="{{{headline}}}" /></a>' +
        '{{/thumbnail}}' +
        '<p class="t6"><span class="related-content-media-information"></span>' +
        '<a href="{{url}}" class="related-content-headline">{{{headline}}}</a>' +
        '</p>' +
        '<p class="t6 related-content-publication-date">{{date}}</p>' +
        '<p class="related-content-trail-text">{{{trailText}}}</p>';

    /**
     * @type {String} Structure of the horizontal component
     */
    RelatedInformationView.HORIZONTAL_STRUCTURE = '' +
        '<div class="eight-col component">' +
        '<div class="hd"><h3><strong>Related information</strong></h3></div>' +
        '<div class="bd relatedContent">' +
        '<div class="two-col">{{{keywords}}}</div>' +
        '<div class="two-col">{{{thumbnail1}}}</div>' +
        '<div class="two-col">{{{stories}}}</div>' +
        '<div class="two-col edge">{{{thumbnail2}}}</div>' +
        '</div>' +
        '</div>';

    /**
     * @type {String} Structure of the vertical component
     */
    RelatedInformationView.VERTICAL_STRUCTURE = '' +
        '<div class="two-col edge component">' +
        '<p class="b4 t6">Related</p>' +
        '{{{stories}}}' +
        '</div>';

    guardian.related.RelatedInformationView = RelatedInformationView;

})(jQuery);
(function () {

    guardian.related.initialise = function (mustache) {
        var contentId = jQuery("meta[name='content-id']").attr("content"),
            relatedAllowed = (guardian && guardian.page && guardian.page.showRelated === true) ? true : false,
            model, controller;

        if (relatedAllowed && contentId) {
            model = new guardian.related.RelatedInformationModel();
            controller = new guardian.related.RelatedInformationController(contentId, model);

            jQ(".ma-placeholder-related-information-2-vertical").each(function () {
                controller.views.push(
                    new guardian.related.RelatedInformationView(this, model, guardian.related.RelatedInformationView.RENDER_VERTICAL, mustache)
                );
            });

            jQ(".ma-placeholder-related-information-2-horizontal").each(function () {
                controller.views.push(
                    new guardian.related.RelatedInformationView(this, model, guardian.related.RelatedInformationView.RENDER_HORIZONTAL, mustache)
                );
            });

            if (controller.views.length) {
                controller.initialise();
            }

        }

        return controller;
    }

})();
(function (guardian, jQuery) {

    /**
     * Initialises the related articles display
     * @param {String} id The id of the element
     * @param {guardian.related.RelatedInformationModel} model Holds the data
     * @param {guardian.related.RelatedInformationView} view Displays the data on screen
     * @constructor
     */
    function RelatedInformationController(id, model) {
        this.id = id;
        this.model = model;
        this.views = [];
    }

    /**
     * The id of the current article, expressed as a path such as:
     * "/world/2012/nov/04/italy-crude-oil-tempa-rossa"
     * @type {String}
     */
    RelatedInformationController.prototype.id = null;

    /**
     * @type {guardian.related.RelatedInformationModel}
     * @private
     */
    RelatedInformationController.prototype.model = null;

    /**
     * @type {guardian.related.RelatedInformationView[]}
     */
    RelatedInformationController.prototype.views = null;

    /**
     * Sets a loading message on the element, then goes off and fetches some data.
     */
    RelatedInformationController.prototype.initialise = function () {
        this.getRelatedArticlesFor(this.id);
    };

    /**
     * Makes a JSONP request to grab the related articles for the given id
     * @param path The id of the resource to find related things for
     */
    RelatedInformationController.prototype.getRelatedArticlesFor = function (path) {

        var url = guardian.related.baseURI + "/related-content";

        jQuery.ajax({
            url:url,
            cache: true,
            dataType:'jsonp',
            jsonpCallback:'relatedinfocontroller',
            data:{
                'path':path
            }
        })
            .then(this.handleGotData.bind(this))
            .fail(this.handleFailedToGetData.bind(this));

    };

    /**
     * Hides each of the views
     */
    RelatedInformationController.prototype.handleFailedToGetData = function() {
        _.each(this.views, function(view) {
            view.hideContent()
        })
    };

    /**
     * Sets the data from the server on the model and updates the view
     * @param {Object} data The data from the server
     */
    RelatedInformationController.prototype.handleGotData = function (data) {
        this.model.setAllData(data);
        _.each(this.views, function(view) {
            view.updateAll()
        });
    };

    guardian.related.RelatedInformationController = RelatedInformationController;

})(guardian, jQuery);