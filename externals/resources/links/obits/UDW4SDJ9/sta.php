var DL = DL || {};
DL.placement_site = '659492';
DL.placement_code = '569553';
var DL_ktagParm_850000569553 = new Array();
(new Image).src="//amch.questionmarket.com/adsc/d1078849/8/850000569553/adscout.php";DL_ktagParm_850000569553['AD_placement_id'] = 659492;
DL_ktagParm_850000569553['AD_creative_id'] = 569553;
DL_ktagParm_850000569553['DL_campaign_id'] = 1078849;
DL_ktagParm_850000569553['DL_uid'] = '';
;
var DL_imageUrls_850000569553 = new Array();
var DL_scriptUrls_850000569553 = new Array();
var DL_ktagParm_850000569553 = DL_ktagParm_850000569553 || new Array();
DL_ktagParm_850000569553['DL_survey_num'] = 1078849;
DL_ktagParm_850000569553['DL_site_id'] = 8;
DL_ktagParm_850000569553['DL_site_num'] = 8;
DL_ktagParm_850000569553['DL_creative_id'] = 850000569553;
if (typeof DL_UID_PARM != 'undefined' ) {
	DL_ktagParm_850000569553["DL_uid"] = DL_UID_PARM;
}
/* 3PARTY_KTAG_PARMS */
DL_imageUrls_850000569553[0]='http://www2.sesamestats.com/paneltracking.aspx?bannerid=KtagGeneric_Ktag_**DL_survey_num**_**DL_creative_id**_**DL_site_num**&CampaignId=KTagGeneric&cb=';


function DL_parmsToUrl_850000569553() {
	var i, x, rplc;
	try {
		for (i=0; i<DL_imageUrls_850000569553.length; i++) {
			for (x in DL_ktagParm_850000569553) {
				rplc = "**"+x+"**";
				DL_imageUrls_850000569553[i] = DL_imageUrls_850000569553[i].replace(rplc, DL_ktagParm_850000569553[x]);
			}
		}
	} catch(e) {}
	try {
		for (i=0; i<DL_scriptUrls_850000569553.length; i++) {
			for (x in DL_ktagParm_850000569553) {
				rplc = "**"+x+"**";
				DL_scriptUrls_850000569553[i] = DL_scriptUrls_850000569553[i].replace(rplc, DL_ktagParm_850000569553[x]);
			}
		}
	} catch(e) {}
}
function DL_imagesScripts_850000569553() {
	var i, imgTag, scriptTag, nodeElem, stag;
	var cbuster = Math.floor((new Date()).getTime());
	try {
		for (i=0; i<DL_imageUrls_850000569553.length; i++) {
			imgTag=new Image(1,1);
			imgTag.src=(DL_imageUrls_850000569553[i].indexOf('alenty.com')==-1) ? DL_imageUrls_850000569553[i]+cbuster : DL_imageUrls_850000569553[i];
		}
	} catch(e) {}
	try {
		for (i=0; i<DL_scriptUrls_850000569553.length; i++) {
			scriptTag = document.createElement('script');
			scriptTag.async=true;
			scriptTag.src=(DL_scriptUrls_850000569553[i].indexOf('alenty.com')==-1) ? DL_scriptUrls_850000569553[i]+cbuster : DL_scriptUrls_850000569553[i];
			stag = document.getElementsByTagName('script');
			nodeElem = stag[stag.length-1];
			nodeElem.parentNode.insertBefore(scriptTag, nodeElem);
		}
	} catch(e) {}
}
DL_parmsToUrl_850000569553();
DL_imagesScripts_850000569553();

