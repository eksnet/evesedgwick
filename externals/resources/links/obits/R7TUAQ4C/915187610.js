/* mycon-dev-gradle 13.11.15-1079-1079 (2013-11-15 22:49:06 GMT) */
var rsinetsegs=[];
var rmxUrls=['http://ad.yieldmanager.com/pixel?id=2228144&t=2','http://ad.yieldmanager.com/pixel?id=2384609&t=2','http://ad.yieldmanager.com/pixel?id=2253024&t=2','http://ad.yieldmanager.com/pixel?id=2445720&t=2','http://ad.yieldmanager.com/pixel?id=2107766&t=2','http://ad.yieldmanager.com/pixel?id=2361252&t=2','http://ad.yieldmanager.com/pixel?id=2445727&t=2','http://ad.yieldmanager.com/pixel?id=2107768&t=2','http://ad.yieldmanager.com/pixel?id=2445749&t=2','http://ad.yieldmanager.com/pixel?id=2414053&t=2','http://ad.yieldmanager.com/pixel?id=2445685&t=2','http://ad.yieldmanager.com/pixel?id=2416251&t=2','http://ad.yieldmanager.com/pixel?id=1085823&t=2','http://ad.yieldmanager.com/pixel?id=2152800&t=2','http://ad.yieldmanager.com/pixel?id=2445673&t=2','http://ad.yieldmanager.com/pixel?id=1376405&t=2','http://ad.yieldmanager.com/pixel?id=2416537&t=2','http://ad.yieldmanager.com/pixel?id=1672508&t=2','http://ad.yieldmanager.com/pixel?id=2400425&t=2','http://ad.yieldmanager.com/pixel?id=2445682&t=2','http://ad.yieldmanager.com/pixel?id=1720619&t=2','http://ad.yieldmanager.com/pixel?id=2416536&t=2','http://ad.yieldmanager.com/pixel?id=2445731&t=2','http://ad.yieldmanager.com/pixel?id=2414254&t=2','http://ad.yieldmanager.com/pixel?id=1009454&t=2',];
var segids="'F09828_10665','F09828_10702','F09828_10834','F09828_11037','F09828_11089','F09828_11235','D08734_73860','F09828_11608','F09828_12148','F09828_12160','F09828_12161','F09828_12184','F09828_12219','F09828_12381','D08734_73920','D08734_73923','D08734_73929','D08734_73938','F09828_12568','F09828_12618','F09828_12648','F09828_0'";
function asi_makeGIF(u){var i=new Image(2,2);i.src=u;return i;}
if(segids.indexOf("F09828_11950") == -1){
for(var x = 0; x < rmxUrls.length; ++x){
    if(typeof rmxUrls[x] !== "undefined") {
        asi_makeGIF(rmxUrls[x]);
    }
}
}
if(typeof(DM_onSegsAvailable)=="function"){DM_onSegsAvailable([],'f09828');}