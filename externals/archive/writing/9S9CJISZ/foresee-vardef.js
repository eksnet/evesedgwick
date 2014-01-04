var FSR = {
	'version' : '6.4.0',
	'date' : '1/12/2011',
	'enabled' : true,
	'auto' : true,
	'encode' : false,
	'files' : '/foresee/',
	'id' : 'hEMZw5kp9Qs9Vt4ltpVR4g==',
	'sites' : [ {
		path : 'dev.ggtest.com:8080', //DEV server
		files : '//foresee.dev.ggtest.com:8080/foresee/',
		domain : 'dev.ggtest.com' //if the port is in the path, then you need to specify the domain.
	},{
		path : 'dev.ggtest.com', //DEV server
		files : '//foresee.dev.ggtest.com:8080/foresee/',
		domain : 'dev.ggtest.com' 	
	}, {
		path : 'dev.gale.web:8080', //DEV server
		files : '//foresee.dev.gale.web:8080/foresee/',
		domain : 'dev.gale.web'
	}, {
		path : 'dev.gale.web', //DEV server
		files : '//foresee.dev.gale.web:8080/foresee/',
		domain : 'dev.gale.web'			
    }, {
        path : 'qa.gale.web', //QA server
        files : '//foresee.qa.gale.web/foresee/'
    }, {
    	path : 'eqa.ggtest.com', //QA server
    	files : '//foresee.eqa.ggtest.com/foresee/'
    }, {
        path : 'qa.ggtest.com', //QA server
        files : '//foresee.qa.ggtest.com/foresee/'
    }, {
    	path : 'eqa.gghybrid.com', //QA server
    	files : '//foresee.eqa.gghybrid.com/foresee/'
    }, {
		path : 'qa.gghybrid.com', //QA server
		files : '//foresee.qa.gghybrid.com/foresee/'
	}, {
		path : 'galetrials.com', //trial server
		files : '//foresee.prod.gale.web/foresee/'
	}, {
		path : 'galedemo.com', //STAGE server
		files : '//www.galedemo.com:80/foresee/'
	},  {
		path : 'galeext.com', //STAGE server
		files : '//foresee.galeext.com/foresee/'
	}, {
		path : 'stage.gale.web', //STAGE server
		files : '//foresee.stage.gale.web/foresee/'
	}, {
		path : 'galegroup.com', //Production server
		files : '//foresee.galegroup.com/foresee/'
	}, {
		path : 'prod.gale.web', //Production server
		files : '//foresee.prod.gale.web/foresee/'
	}, {
		path : /\w+-?\w+\.(com|org|edu|gov|net)/
	}, {
		path : '.',
		domain : 'default'
	} ],
  'site' : {
		path : 'galegroup.com', //Production server
		files : '//foresee.galegroup.com/foresee/',
	    domain : false,
	    secure: false			
	}
};
