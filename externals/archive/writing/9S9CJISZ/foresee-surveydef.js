FSR.surveydefs = [{
    name: 'gale-browse-high',
    invite: {
        when: 'onentry'
    },
    pop: {
        when: 'later'
    },
    criteria: {
        sp: 5,
        lf: 2
    },
    include: {
        urls: ['p=GPS','prodId=GPS']
    }
}, {
    name: 'gale-browse-mid',
    invite: {
        when: 'onentry'
    },
    pop: {
        when: 'later'
    },
    criteria: {
        sp: 10,
        lf: 2
    },
    include: {
        urls: ['p=AONE','p=GVRL','p=LitRC','p=LITF','p=GLS','p=LCO','prodId=AONE','prodId=GVRL','prodId=LitRC','prodId=LITF','prodId=GLS','prodId=LCO']
    }
}, {
    name: 'gale-browse-low',
    invite: {
        when: 'onentry'
    },
    pop: {
        when: 'later'
    },
    criteria: {
        sp: 25,
        lf: 2
    },
    include: {
        urls: ['/BCRC','/HWRC','/gic/','/region/latin-america','/global','/essentials','/natgeo/archive','prodId=ECCO']
    }
}];
FSR.properties = {
    repeatdays: 60,

	repeatoverride: false,

	altcookie: {
	},

    language: {
        locale: 'en'
    },

exclude: {
        variables: [{
            name: 'strIP',
            value: [/^12\.111\.69\.(1([3-9][0-9])|2([0-4][0-9]|5[0-4]))$/,
				 /^205\.246\.3\.([2-9]|[1-9][0-9]|1([0-9][0-9])|2([0-4][0-9]|5[0-4]))$/,
				 /^12\.178\.89\.(1([3-9][0-9])|2([0-4][0-9]|5[0-4]))$/,
				 /^12\.30\.37\.2$/,
				 /^12\.21\.182\.130$/,
				 /^12\.170\.224\.2$/,
				 /^12\.160\.208\.130$/,
				 /^12\.155\.243\.130$/,
				 /^12\.160\.223\.2$/,
				 /^12\.35\.193\.2$/,
				 /^12\.32\.99\.2$/,
				 /^12\.104\.49\.2$/,
				 /^75\.148\.202\.162$/,
				 /^75\.148\.185\.121$/]
				 }]
},

	ipexclude: 'strIP',

    invite: {
        content: '<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\"><HTML><HEAD><TITLE>Foresee Invite</TITLE></HEAD><BODY><div id=\"fsrinvite\"><div id=\"fsrcontainer\"><div class=\"fsri_sitelogo\"><img src=\"{%baseHref%}sitelogo.gif\" alt=\"Site Logo\"></div><div class=\"fsri_fsrlogo\"><img src=\"{%baseHref%}fsrlogo.gif\" alt=\"Site Logo\"></div></div><div class=\"fsri_body\">\
		<b><font size=\"3\">We\'d like your feedback.</b></font>\
		<br><br>Thank you for visiting our site. You have been randomly selected to participate in a customer satisfaction survey to let us know how we can improve your website experience.\
		<br><br><b>The survey is designed to measure your entire site experience and will appear at the <u>end of your visit</u>.</b>\
		<br><br><font size=\"1\">This survey is conducted by an independent company, ForeSee Results.</font><br></div></div></BODY></HTML>',

        /*content: '<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\"><HTML><HEAD><TITLE>Foresee Invite</TITLE></HEAD><BODY><div id=\"fsrinvite\"><div id=\"fsrcontainer\"><div class=\"fsri_sitelogo\"><img src=\"{%baseHref%}sitelogo.gif\" alt=\"Site Logo\"></div><div class=\"fsri_fsrlogo\"><img src=\"{%baseHref%}fsrlogo.gif\" alt=\"Site Logo\"></div></div><div class=\"fsri_body\">\
		<b><font size=\"3\">We\'d like your feedback.</b></font>\
		<br><br>Thank you for visiting our site. You have been randomly selected to participate in a customer satisfaction survey to let us know how we can improve your website experience.\
		<br><br><font size=\"1\">This survey is conducted by an independent company, ForeSee Results.</font><br></div></div></BODY></HTML>',
        */

		exclude: {
            local: [],
            referrer: []
        },
        include: {
            local: ['.']
        },

        width: '500',
        bgcolor: '#333',
        opacity: 0.7,
        x: 'center',
        y: 'center',
        delay: 0,
        timeout: 0,
        buttons: {
            accept: "Yes, I'll give feedback",
            decline: 'No thanks'
        },
        hideOnClick: false,
        css: 'foresee-dhtml.css',
        hide: []
    },

    tracker: {
        width: '500',
        height: '350',
        timeout: 3,
        adjust: true,
		alert: {
			enabled: false,
			message: 'The survey is now available.'
		},
        url: 'tracker.html'
    },

    survey: {
        width: 550,
        height: 600
    },

    qualifier: {
        width: '625',
        height: '500',
        bgcolor: '#333',
        opacity: 0.7,
        x: 'center',
        y: 'center',
        delay: 0,
        buttons: {
            accept: 'Continue'
        },
        hideOnClick: false,
        css: false,
        url: 'qualifying.html'
    },

    cancel: {
        url: 'cancel.html',
        width: '500',
        height: '300'
    },

    pop: {
        what: 'survey',
        after: 'leaving-site',
        pu: false,
        tracker: true
    },

    meta: {
        referrer: true,
        terms: true,
        ref_url: true,
        url: true,
        url_params: false
    },

    events: {
        enabled: true,
        id: true,
        codes: {
            purchase: 800,
            items: 801,
            dollars: 802,
			followup: 803,
			information: 804,
			content: 805
        },
        pd: 7,
        custom: {}
    },

    pool: 100,

    previous: false,

    analytics: {
        google: false
    },

    mode: 'first-party'
};