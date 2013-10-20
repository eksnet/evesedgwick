define(['require', 'jquery', 'twttr'], function (require, $, twttr) {
	var css_url = require.toUrl('../../styles/js/author-twitter-handles.css');
	var authors = [
		{
			name: 'Paul Harris',
			twitter_handle: 'paulxharris'
		},

		{
			name: 'Karen McVeigh',
			twitter_handle: 'karenmcveigh1'
		},

		{
			name: 'Ed Pilkington',
			twitter_handle: 'edpilkington'
		},

		{
			name: 'Adam Gabbatt',
			twitter_handle: 'AdamGabbatt'
		},

		{
			name: 'Matt Wells',
			twitter_handle: 'MatthewWells'
		},

		{
			name: 'Hadley Freeman',
			twitter_handle: 'HadleyFreeman'
		},

		{
			name: 'Richard Adams',
			twitter_handle: 'RichardA'
		},

		{
			name: 'Suzanne Goldenberg',
			twitter_handle: 'suzyji'
		},

		{
			name: 'Chris McGreal',
			twitter_handle: 'chrismcgreal'
		},

		{
			name: 'Dominic Rushe',
			twitter_handle: 'dominicru'
		},

		{
			name: 'Stuart Millar',
			twitter_handle: 'stuartmillar159'
		},

		{
			name: 'Brian Braiker',
			twitter_handle: 'slarkpope'
		},

		{
			name: 'Laurence Topham',
			twitter_handle: 'loztopham'
		},

		{
			name: 'Matt Williams',
			twitter_handle: 'mattywills'
		},

		{
			name: 'Ruth Spencer',
			twitter_handle: 'onthewag'
		},

		{
			name: 'Ryan Devereaux',
			twitter_handle: 'Rdevro'
		},

		{
			name: 'Tom McCarthy',
			twitter_handle: 'TeeMcSee'
		},

		{
			name: 'Ewen MacAskill',
			twitter_handle: 'ewenmacaskill'
		},

		{
			name: 'Amanda Michel',
			twitter_handle: 'amichel'
		},

		{
			name: 'Steve Busfield',
			twitter_handle: 'Busfield'
		},

		{
			name: 'Katie Rogers',
			twitter_handle: 'katierogers'
		},
        {
            name: 'Owen Gibson',
            twitter_handle: 'owen_g'
        },
        {
            name: 'Danny Taylor',
            twitter_handle: 'DTGuardian'
        },
        {
            name: 'Dominic Fifield',
            twitter_handle: 'domfifield'
        },
        {
            name: 'Donald McRae',
            twitter_handle: 'donaldgmcrae'
        },
        {
            name: 'Barney Ronay',
            twitter_handle: 'barneyronay'
        },
        {
            name: 'David Hytner',
            twitter_handle: 'DaveHytner'
        },
        {
            name: 'Stuart James',
            twitter_handle: 'StuartJamesGNM'
        },
        {
            name: 'Sid Lowe',
            twitter_handle: 'sidlowe'
        },
        {
            name: 'Raphael Honigstein',
            twitter_handle: 'honistein'
        },
        {
            name: 'Marcus Christenson',
            twitter_handle: 'm_christenson'
        },
        {
            name: 'James Dart',
            twitter_handle: 'James_Dart'
        },
        {
            name: 'Barry Glendenning',
            twitter_handle: 'bglendenning'
        },
        {
            name: 'Sachin Nakrani',
            twitter_handle: 'SachinNakrani'
        },
        {
            name: 'Jacob Steinberg',
            twitter_handle: 'JacobSteinberg'
        },
        {
            name: 'Paul Wilson',
            twitter_handle: 'paulwilsongnm'
        },
        {
            name: 'Jamie Jackson',
            twitter_handle: 'GuardianJamieJ'
        },
        {
            name: 'Paul Doyle',
            twitter_handle: 'Paul_Doyle'
        },
        {
			name: 'Matt Seaton',
			twitter_handle: 'mattseaton'
		}
	];

	var author_link = $('.contributor');
	var author_count = author_link.length;
	var author_found = false;

	$('head').append('<link rel="stylesheet" href="' + css_url + '" />');

	if (author_count === 1) {
		var byline = $('.byline, .blog-byline');

		var current_author_name = $.trim(author_link.text());

		for (var i = 0, len = authors.length; i < len; i++) {
			var author = authors[i];
			
			if (current_author_name.toLowerCase() === author.name.toLowerCase()) {
				author_found = true;
				var twitter_follow_button = $('<a href="https://twitter.com/' + author.twitter_handle + '" class="twitter-follow-button" data-show-count="false" data-show-screen-name="false">Follow @' + author.twitter_handle + '</a>');

				if (byline.hasClass('blog-byline')) {
					$('.blog-byline-kick').after(twitter_follow_button);
				} else {
					byline.after(twitter_follow_button);
				}

				break;
			}
		}
	}
	
	window.twitter_author_found = author_found;
	return { author_found: author_found };
});
