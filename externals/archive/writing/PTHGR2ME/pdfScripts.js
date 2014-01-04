$(document).ready(function() {
	$('.js-pdf-popup-download').live('click', function(event) {
		new PdfDownload().execute($(this).attr('href'));
		event.preventDefault();
	});
});

function PdfDownload() {
	
	var self = this;
	
	self.execute = function(href) {
		var url = href + "&isAcrobatAvailable=" + self.checkAcrobat();
		var uagent = navigator.userAgent.toLowerCase();	
		
		// Fix for OPLAT 3529 In Chrome PDF is getting displayed in parent window. May be related to OPLAT-1327
		if((uagent.search("android") > -1) || (uagent.search("ipod") > -1) || (uagent.search("iphone") > -1) || (uagent.search("ipad") > -1)) {
			window.location.href = url;
		} else {
			openInChildWindow(url, "galeChildWindow");
		}
		
	};
	
	self.checkAcrobat = function(){
		acrobatInstalled=false;
		acrobatVersion='0.0';
		if (navigator.plugins && navigator.plugins.length) {
			for (x=0; x<navigator.plugins.length; x++){
				if (navigator.plugins[x].description.indexOf('Adobe Acrobat') != -1){
					acrobatVersion=parseFloat(navigator.plugins[x].description.split('Version ')[1]);
					if (acrobatVersion.toString().length == 1) acrobatVersion+='.0';
					acrobatInstalled=true;
					break;
				}
			}
		}else if (window.ActiveXObject){
			for (x=2; x<10; x++){
				try	{
					oAcro=eval("new ActiveXObject('PDF.PdfCtrl."+x+"');");
					if (oAcro){
						acrobatInstalled=true;
						acrobatVersion=x+'.0';
					}
				}catch(e) {}
			}
			try	{
				oAcro4=new ActiveXObject('PDF.PdfCtrl.1');
				if (oAcro4){
					acrobatInstalled=true;
					acrobatVersion='4.0';
				}
			}catch(e) {}
			try	{
				oAcro7=new ActiveXObject('AcroPDF.PDF.1');
				if (oAcro7){
					acrobatInstalled=true;
					acrobatVersion='7.0';
				}
			}catch(e) {}
		}
		return acrobatInstalled;
	}
}


