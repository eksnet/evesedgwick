
function feedparser() { }
feedparser._path = '/dwr';

feedparser.parseDefaultFeed = function(callback) {
    DWREngine._execute(feedparser._path, 'feedparser', 'parseDefaultFeed', callback);
}

feedparser.getFeed = function(p0, callback) {
    DWREngine._execute(feedparser._path, 'feedparser', 'getFeed', p0, callback);
}
