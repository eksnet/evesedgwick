/* mycon-dev-gradle 13.11.15-1079-1079 (2013-11-15 22:49:06 GMT) */
rsinetsegs=['E05516_13463','E05516_12868','E05516_13015','E05516_14068','D08734_71952','E05516_14203','E05516_14249','E05516_50168','E05516_50154','E05516_50534','E05516_50535','E05516_50537','E05516_50449','E05516_13825','E05516_0'];
var rsiExp=new Date((new Date()).getTime()+2419200000);
var rsiSegs="";
var rsiPat=/.*_5.*/;
var rsiPat2=/([^_]{2})[^_]*_(.*)/;
var i=0;
for(x=0;x<rsinetsegs.length&&i<100;++x){if(!rsiPat.test(rsinetsegs[x])){var f=rsiPat2.exec(rsinetsegs[x]);if(f!=null){rsiSegs+=f[1]+f[2];++i;}}}
document.cookie="rsi_segs="+(rsiSegs.length>0?rsiSegs:"")+";expires="+rsiExp.toGMTString()+";path=/;domain=.theguardian.com";
if(typeof(DM_onSegsAvailable)=="function"){DM_onSegsAvailable(['E05516_13463','E05516_12868','E05516_13015','E05516_14068','D08734_71952','E05516_14203','E05516_14249','E05516_50168','E05516_50154','E05516_50534','E05516_50535','E05516_50537','E05516_50449','E05516_13825','E05516_0'],'e05516');}