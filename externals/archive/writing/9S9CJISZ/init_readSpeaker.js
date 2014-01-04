jQuery(document).ready(function(){
	 window.rsConf = {
             phrases: {
                 en_us: {
                     closeplayer: GALE.i18n.translate('readspeaker.close'),
                     download:  GALE.i18n.translate('readspeaker.downloadmp3'),
                     fast: GALE.i18n.translate('readspeaker.readspeed.fast'),
                     medium: GALE.i18n.translate('readspeaker.readspeed.medium'),
                     slow: GALE.i18n.translate('readspeaker.readspeed.slow'),
                     hide: GALE.i18n.translate('readspeaker.hide'),
                     pause: GALE.i18n.translate('readspeaker.pause'),
                     speed: GALE.i18n.translate('readspeaker.speed'),
                     play: GALE.i18n.translate('readspeaker.play'),
                     highlightingoptions: GALE.i18n.translate('readspeaker.highlighting.options'),
                     nohighlighting: GALE.i18n.translate('readspeaker.no.highlighting'),
                     popupbutton: GALE.i18n.translate('readspeaker.pop.up.button'),
                     sentonly: GALE.i18n.translate('readspeaker.sentence.only'),
                     settings: GALE.i18n.translate('readspeaker.settings'),
                     show: GALE.i18n.translate('readspeaker.show'),
                     stop: GALE.i18n.translate('readspeaker.stop'),
                     volume : GALE.i18n.translate('readspeaker.volume'),
                     error: GALE.i18n.translate('readspeaker.error'),
                     wordonly: GALE.i18n.translate('readspeaker.word.only'),
                     wordsent: GALE.i18n.translate('readspeaker.word.and.sentence')
                 }
             },
             general: {
                     usePost: ($('#imageViewerWrapper').length === 0)
             },
             settings: {
            	 hlicon: 'iconoff'
             },
             ui: {
            	 popupbutton: [] 
             },
             cb: {
            	 ui: {
            		 open: function() {
            			 $('#readspeakerContainer span.rsbtn_powered').detach();
            			 var helpLink = $('<span class="rsbtn_powered rsimg" title="' + GALE.i18n.translate('readspeaker.help') +'"><a href="' + $('#readSpeakerHelpURL').val() +'" id="readspeakerHelp" >' + GALE.i18n.translate('readspeaker.help') + '</a></span>');
            			 $('#readspeakerContainer .rsbtn_closer').after(helpLink);
            			 
            			 $('#readspeakerHelp').click(function(e){ 
            				 e.preventDefault();
            				 window.open($(this).attr('href'),'galeChildWindow','menubar=1,resizable=1,width=700,height=600 ,scrollbars=yes');
            			 });
            		 }
            	 }
             }

     };
	
	 
	

});

function ConfirmDownload(){
	return confirm('Downloaded material is for your educational, noncommercial use only. Agree ?');
}
