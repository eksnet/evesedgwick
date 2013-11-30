/*
 * Facebox (for jQuery)
 * version: 1.3
 * @requires jQuery v1.2 or later
 * @homepage https://github.com/defunkt/facebox
 *
 * Licensed under the MIT:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright Forever Chris Wanstrath, Kyle Neath
 *
 * Usage:
 *
 *  jQuery(document).ready(function() {
 *    jQuery('a[rel*=facebox]').facebox()
 *  })
 *
 *  <a href="#terms" rel="facebox">Terms</a>
 *    Loads the #terms div in the box
 *
 *  <a href="terms.html" rel="facebox">Terms</a>
 *    Loads the terms.html page in the box
 *
 *  <a href="terms.png" rel="facebox">Terms</a>
 *    Loads the terms.png image in the box
 *
 *
 *  You can also use it programmatically:
 *
 *    jQuery.facebox('some html')
 *    jQuery.facebox('some html', 'my-groovy-style')
 *
 *  The above will open a facebox with "some html" as the content.
 *
 *    jQuery.facebox(function($) {
 *      $.get('blah.html', function(data) { $.facebox(data) })
 *    })
 *
 *  The above will show a loading screen before the passed function is called,
 *  allowing for a better ajaxy experience.
 *
 *  The facebox function can also display an ajax page, an image, or the contents of a div:
 *
 *    jQuery.facebox({ ajax: 'remote.html' })
 *    jQuery.facebox({ ajax: 'remote.html' }, 'my-groovy-style')
 *    jQuery.facebox({ image: 'stairs.jpg' })
 *    jQuery.facebox({ image: 'stairs.jpg' }, 'my-groovy-style')
 *    jQuery.facebox({ div: '#box' })
 *    jQuery.facebox({ div: '#box' }, 'my-groovy-style')
 *
 *  Want to close the facebox?  Trigger the 'close.facebox' document event:
 *
 *    jQuery(document).trigger('close.facebox')
 *
 *  Facebox also has a bunch of other hooks:
 *
 *    loading.facebox
 *    beforeReveal.facebox
 *    reveal.facebox (aliased as 'afterReveal.facebox')
 *    init.facebox
 *    afterClose.facebox
 *
 *  Simply bind a function to any of these hooks:
 *
 *   $(document).bind('reveal.facebox', function() { ...stuff to do after the facebox and contents are revealed... })
 *
 */
(function($) {
  $.facebox = function(data, klass) {
    $.facebox.loading()

    if (data.ajax) fillFaceboxFromAjax(data.ajax, klass)
    else if (data.image) fillFaceboxFromImage(data.image, klass)
    else if (data.div) fillFaceboxFromHref(data.div, klass)
    else if ($.isFunction(data)) data.call($)
    else $.facebox.reveal(data, klass)
  }

  /*
   * Public, $.facebox methods
   */

  $.extend($.facebox, {
    settings: {
      opacity      : 0.4,
      overlay      : true,
      loadingImage : '/assets/login_loading.gif',
      closeImage   : '/assets/login_closelabel.png',
      imageTypes   : [ 'png', 'jpg', 'jpeg', 'gif' ],
      faceboxHtml  : '\
    <div id="facebox" style="display:none;"> \
      <div class="popup"> \
        <div class="content"> \
        </div> \
        <a href="#" class="close"></a> \
      </div> \
    </div>'
    },

    loading: function() {
      init()
      if ($('#facebox .loading').length == 1) return true
      showOverlay()

      $('#facebox .content').empty().
        append('<div class="loading"><img src="'+$.facebox.settings.loadingImage+'"/></div>')

      $('#facebox').show().css({
        top:	50 + getPageScroll()[1] + (getPageHeight() / 10),
        left:	$(window).width() / 2 - ($('#facebox .popup').outerWidth() / 2)
      })

      $(document).bind('keydown.facebox', function(e) {
        if (e.keyCode == 27) $.facebox.close()
        return true
      })
      $(document).trigger('loading.facebox')
    },

    reveal: function(data, klass) {
      $(document).trigger('beforeReveal.facebox')
      if (klass) $('#facebox .content').addClass(klass)
      $('#facebox .content').empty().append(data)
      $('#facebox .popup').children().fadeIn('normal')
      $('#facebox').css('left', $(window).width() / 2 - ($('#facebox .popup').outerWidth() / 2))
      $(document).trigger('reveal.facebox').trigger('afterReveal.facebox')
    },

    close: function() {
      $(document).trigger('close.facebox')
      return false
    }
  })

  /*
   * Public, $.fn methods
   */

  $.fn.facebox = function(settings) {
    if ($(this).length == 0) return

    init(settings)

    function clickHandler() {
      $.facebox.loading(true)

      // support for rel="facebox.inline_popup" syntax, to add a class
      // also supports deprecated "facebox[.inline_popup]" syntax
      var klass = this.rel.match(/facebox\[?\.(\w+)\]?/)
      if (klass) klass = klass[1]

      fillFaceboxFromHref(this.href, klass)
      return false
    }

    return this.bind('click.facebox', clickHandler)
  }

  /*
   * Private methods
   */

  // called one time to setup facebox on this page
  function init(settings) {
    if ($.facebox.settings.inited) return true
    else $.facebox.settings.inited = true

    $(document).trigger('init.facebox')
    makeCompatible()

    var imageTypes = $.facebox.settings.imageTypes.join('|')
    $.facebox.settings.imageTypesRegexp = new RegExp('\\.(' + imageTypes + ')(\\?.*)?$', 'i')

    if (settings) $.extend($.facebox.settings, settings)
    $('body').append($.facebox.settings.faceboxHtml)

    var preload = [ new Image(), new Image() ]
    preload[0].src = $.facebox.settings.closeImage
    preload[1].src = $.facebox.settings.loadingImage

    $('#facebox').find('.b:first, .bl').each(function() {
      preload.push(new Image())
      preload.slice(-1).src = $(this).css('background-image').replace(/url\((.+)\)/, '$1')
    })

    $('#facebox .close')
      .click($.facebox.close)
  }

  // getPageScroll() by quirksmode.com
  function getPageScroll() {
    var xScroll, yScroll;
    if (self.pageYOffset) {
      yScroll = self.pageYOffset;
      xScroll = self.pageXOffset;
    } else if (document.documentElement && document.documentElement.scrollTop) {	 // Explorer 6 Strict
      yScroll = document.documentElement.scrollTop;
      xScroll = document.documentElement.scrollLeft;
    } else if (document.body) {// all other Explorers
      yScroll = document.body.scrollTop;
      xScroll = document.body.scrollLeft;
    }
    return new Array(xScroll,yScroll)
  }

  // Adapted from getPageSize() by quirksmode.com
  function getPageHeight() {
    var windowHeight
    if (self.innerHeight) {	// all except Explorer
      windowHeight = self.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
      windowHeight = document.documentElement.clientHeight;
    } else if (document.body) { // other Explorers
      windowHeight = document.body.clientHeight;
    }
    return windowHeight
  }

  // Backwards compatibility
  function makeCompatible() {
    var $s = $.facebox.settings

    $s.loadingImage = $s.loading_image || $s.loadingImage
    $s.closeImage = $s.close_image || $s.closeImage
    $s.imageTypes = $s.image_types || $s.imageTypes
    $s.faceboxHtml = $s.facebox_html || $s.faceboxHtml
  }

  // Figures out what you want to display and displays it
  // formats are:
  //     div: #id
  //   image: blah.extension
  //    ajax: anything else
  function fillFaceboxFromHref(href, klass) {
    // div
    if (href.match(/#/)) {
      var url    = window.location.href.split('#')[0]
      var target = href.replace(url,'')
      if (target == '#') return
      $.facebox.reveal($(target).html(), klass)

    // image
    } else if (href.match($.facebox.settings.imageTypesRegexp)) {
      fillFaceboxFromImage(href, klass)
    // ajax
    } else {
      fillFaceboxFromAjax(href, klass)
    }
  }

  function fillFaceboxFromImage(href, klass) {
    var image = new Image()
    image.onload = function() {
      $.facebox.reveal('<div class="image"><img src="' + image.src + '" /></div>', klass)
    }
    image.src = href
  }

  function fillFaceboxFromAjax(href, klass) {
    $.get(href, function(data) { $.facebox.reveal(data, klass) })
  }

  function skipOverlay() {
    return $.facebox.settings.overlay == false || $.facebox.settings.opacity === null
  }

  function showOverlay() {
    if (skipOverlay()) return

    if ($('#facebox_overlay').length == 0)
      $("body").append('<div id="facebox_overlay" class="facebox_hide"></div>')

    $('#facebox_overlay').hide().addClass("facebox_overlayBG")
      .css('opacity', $.facebox.settings.opacity)
      .click(function() { $(document).trigger('close.facebox') })
      .fadeIn(200)
    return false
  }

  function hideOverlay() {
    if (skipOverlay()) return

    $('#facebox_overlay').fadeOut(200, function(){
      $("#facebox_overlay").removeClass("facebox_overlayBG")
      $("#facebox_overlay").addClass("facebox_hide")
      $("#facebox_overlay").remove()
    })

    return false
  }

  /*
   * Bindings
   */

  $(document).bind('close.facebox', function() {
    $(document).unbind('keydown.facebox')
    $('#facebox').fadeOut(function() {
      $('#facebox .content').removeClass().addClass('content')
      $('#facebox .loading').remove()
      $(document).trigger('afterClose.facebox')
    })
    hideOverlay()
  })

})(jQuery);














var Login = {
	site: 'The Awl',
	/* Actions for all the links */
	init: function() {
		$(document).bind('afterReveal.facebox', function() {
			$('#facebox_overlay').height($(document).height()); // IE6
			$('.ad-inner object').css('visibility','hidden');
		});
		$(document).bind('afterClose.facebox', function() {
			$('.ad-inner object').css('visibility','visible');
		});
		$(document).bind('login.show_logout', function() {
			Login.show_logout();
		});
		$(document).bind('login.show_login', function() {
			Login.show_login();
		});
		$(document).bind('login.show_register', function() {
			Login.show_register();
		});
		$(document).bind('login.show_recover', function() {
			Login.show_recover();
		});
		$(document).bind('login.show_reset', function() {
			Login.show_reset();
		});
		$('#logout').click(function() {
			$(document).trigger('login.show_logout');
			return false;
		});
		window.Login = Login;
	},
	/* Clear and hide the error message */
	clear: function() {
		$('.login_message').text('').removeClass('active');
	},
	/* Set the error message */
	message: function(msg) {
		$('.login_message').text(msg).addClass('active');
	},
	/* Close the popup after delay */
	dismissAfter: function(msec, evt) {
		setTimeout(function() {
			$(document).trigger('close.facebox');
			$(document).trigger(evt);
		}, msec);
	},
	/* Twitter */
	twitter: {
		window: null,
		/* Button clicked - pop up the twitter login window */
		login: function() {
			Login.clear();
			Login.twitter.window = window.open('/login/twitter',"Twitter_Login","menubar=no,width=780,height=450,toolbar=no");
		},
		/* OAuth error or Twitter is down - close the popup and show error */
		onerror: function() {
			Login.twitter.window.close();
			Login.twitter.window = null;
			Login.message('Something seems wrong with Twitter, please try again!');
		},
		/* Success, close twitter popup, show success message, close login popup */
		onlogin: function() {
			Login.twitter.window.close();
			Login.twitter.window = null;
			Login.message('Great! Logging you in...');
			Login.dismissAfter(1000, 'login.success');
		}
	},
	/* Facebook */
	facebook: {
		/* Button clicked - pop up the facebook login window */
		login: function() {
			Login.clear();
			/* Facebook's javascript login */
			FB.login(function(response) {
				if (response.session || response.authResponse) {
					// Success, set our session cookie via ajax
					$.ajax({
						type: 'GET', cache: false, dataType: 'json', url: '/login/facebook',
						error: function(jqXHR, textStatus, errorThrown) {
							Login.message('Sorry! Something went wrong, please try again! [51]');
						},
						success: function(data, textStatus, jqXHR) {
							Login.message(data.message);
							Login.dismissAfter(1000, 'login.success');
						}});
				} else {
					// Failure - login failed or user declined
					Login.message('Something seems wrong with Facebook, please try again!');
				}
			});
		}
	},
	/* Show the Logout dialog, log the user out, hide the dialog */
	show_logout: function() {
		var box = $('<div>')
					.append($('<div>').addClass('login_message_wrap')
						.append($('<div>').addClass('login_message').text('One moment please..').show()))
					.append($('<div>').addClass('login_wrap')
						.append($('<h3>').addClass('logout').text('You are now being logged out of ')
							.append($('<img>').attr('src', '/assets/login_logo.png')))
					);
		$.facebox(box.html());
    LoginAPI.logout(function(json) {
			Login.dismissAfter(1000, 'logout.success');
    }, function(json) {
      Login.message(json.message);
    });
	},
	/* Show the Login dialog, bind the buttons */
	show_login: function() {
		var box = $('<div>')
					.append($('<div>').addClass('login_message_wrap').append($('<div>').addClass('login_message')))
					.append($('<div>').addClass('login_wrap')
						.append($('<h3>').append($('<span>').text('Login to ')).append($('<span>').text(Login.site).addClass('logo')))
						.append($('<div>').attr('id','login_body').addClass('clearfix')
							.append($('<div>').addClass('left')
							.append($('<form>').attr('id','form')
								.append($('<label>').text('E-Mail').attr('for','email'))
								.append($('<input type="text" name="email" />').attr('id','email'))
								.append($('<label>').text('Password').attr('for','password'))
								.append($('<input type="password" name="password" />').attr('id','password'))
								.append($('<input type="submit" />').val('Submit').attr('id','submit'))
								.append($('<div>').addClass('remember').append($('<input type="checkbox" name="remember" />').attr('id','remember')))
								.append($('<label>').text('Keep me logged in').attr('for','remember').addClass('remember'))
								.append($('<a href="#"></a>').text('Forgot your password?').attr('id','forgot'))
							))
							.append($('<div>').addClass('right')
								.append($('<p>').text('OR use your existing account from..'))
								.append($('<a href="#"></a>').text('Facebook').addClass('facebook'))
								.append($('<a href="#"></a>').text('Twitter').addClass('twitter'))
								.append($('<p>').text('Don\'t have an account? ').append($('<a href="#"></a>').text('Create one!').attr('id','create_one')))
							)));
		$.facebox(box.html());
		$('#submit').hover(function() {$(this).addClass('hover');}, function() {$(this).removeClass('hover')});
		$('#create_one').click(function() { $(document).trigger('login.show_register'); return false; });
		$('#forgot').click(function() { $(document).trigger('login.show_recover'); return false; });
		$('#submit').click(function(e) {
      e.preventDefault();
			Login.clear();
			Login.message('Logging you in..');
      var email = $('#email').val();
      var password = $('#password').val();
      var remember = 1;
      setTimeout(function() {
        LoginAPI.login( email, password, remember, function( json ) {
          Login.message( json.message );
          Login.dismissAfter( 1000, 'login.success' );
        }, function( json ) {
          Login.message( json.message );
        });
      }, 500 );
			return false;
		});
		$('.twitter').click(function() { Login.twitter.login(); return false; });
		$('.facebook').click(function() { Login.facebook.login(); return false; });
	},
	/* Show the Register dialog, bind the buttons */
	show_register: function() {
		var current_field_values = null;
		var box = $('<div>')
					.append($('<div>').addClass('login_message_wrap').append($('<div>').addClass('login_message')))
					.append($('<div>').addClass('login_wrap')
						.append($('<h3>').append($('<span>').text('Register with ')).append($('<span>').text(Login.site).addClass('logo')))
						.append($('<div>').attr('id','login_body').addClass('clearfix')
							.append($('<div>').addClass('left')
							.append($('<form>').attr('id','form').attr('autocomplete','off')
								.append($('<label>').text('E-Mail').attr('for','email'))
								.append($('<input type="text" name="email" id="email" />')).attr('autocomplete','off')
								.append($('<div>').addClass('indicator'))
								.append($('<label>').text('Commenter Name').attr('for','username'))
								.append($('<input type="text" name="username" id="username" />')).attr('autocomplete','off')
								.append($('<div>').addClass('indicator'))
								.append($('<label>').text('Password').attr('for','password'))
								.append($('<input type="password" name="password" id="password" />'))
								.append($('<div>').addClass('indicator'))
								.append($('<input type="submit" />').val('Submit').attr('id','submit'))
								.append($('<a href="#"></a>').text('Forgot your password?').attr('id','forgot'))
							))
							.append($('<div>').addClass('right')
								.append($('<p>').text('OR use your existing account from..'))
								.append($('<a href="#"></a>').text('Facebook').addClass('facebook'))
								.append($('<a href="#"></a>').text('Twitter').addClass('twitter'))
								.append($('<p>').text('Already registered? ').append($('<a href="#"></a>').text('Log-in here!').addClass('login_here')))
							)));
		$.facebox(box.html());
		$('#submit').hover(function() {$(this).addClass('hover');}, function() {$(this).removeClass('hover')});
		$('.login_here').click(function() { $(document).trigger('login.show_login'); return false;  });
		$('#forgot').click(function() { $(document).trigger('login.show_recover'); return false; });
		$('.twitter').click(function() { Login.twitter.login(); return false; });
		$('.facebook').click(function() { Login.facebook.login(); return false; });
		$('#submit').click(function(e) {
      e.preventDefault();
			Login.clear();
			Login.message('Registering you..');
      var username = $('#username').val(),
        email = $('#email').val(),
        password = $('#password').val();
      LoginAPI.register( username, email, password, function(json) {
        Login.message(json.message);
        Login.dismissAfter(3000, 'login.success');
      }, function(json) {
        Login.message(json.message);
      });
			return false;
		});

    /* Username field live validation */
    $('#username').blur(function(e) {
			$('#username').next().removeClass('checkmark xmark');
			Login.clear();

      var username = $('#username').val();

      if( username.length < 2 ) {
        $('#username').next().removeClass('checkmark').addClass('xmark');
        return;
      }
      LoginAPI.validate_username( username, function(json) {
        Login.clear();
        $('#username').next().removeClass('xmark').addClass('checkmark');
      }, function(json) {
        Login.message(json.message);
        $('#username').next().removeClass('checkmark').addClass('xmark');
      });
      return false;
    });

    /* Email field live validation */
    $('#email').blur(function(e) {
			$('#email').next().removeClass('checkmark xmark');
			Login.clear();

      var email = $('#email').val();

      if(email.length < 2 ) {
				$('#email').next().removeClass('checkmark').addClass('xmark');
        return;
      }
      if(email.indexOf('@') == -1) {
				$('#email').next().removeClass('checkmark').addClass('xmark');
				return;
			}
      LoginAPI.validate_email( email, function(json) {
        Login.clear();
        $('#email').next().removeClass('xmark').addClass('checkmark');
      }, function(json) {
        Login.message(json.message);
        $('#email').next().removeClass('checkmark').addClass('xmark');
      });
      return false;
    });

    /* Password field live validation */
    $('#password').blur(function(e) {
			$('#password').next().removeClass('checkmark xmark');
			Login.clear();

      var password = $('#password').val();

      if(password.length < 2 ) {
				$('#password').next().removeClass('checkmark').addClass('xmark');
        return;
      }

      LoginAPI.validate_password( password, function(json) {
        Login.clear();
        $('#password').next().removeClass('xmark').addClass('checkmark');
      }, function(json) {
        Login.message(json.message);
        $('#password').next().removeClass('checkmark').addClass('xmark');
      });
      return false;
    });
	},

	/* Show the Password Recovery dialog */
	show_recover: function() {
		var box = $('<div>')
					.append($('<div>').addClass('login_message_wrap').append($('<div>').addClass('login_message')))
					.append($('<div>').addClass('login_wrap')
						.append($('<h3>').append($('<span>').text('Recover your password')))
						.append($('<div>').attr('id','login_body').addClass('clearfix')
							.append($('<div>').addClass('left')
							.append($('<form>').attr('id','form').attr('autocomplete','off')
								.append($('<label>').text('E-Mail').attr('for','email'))
								.append($('<input type="text" name="email" />').attr('id','email')).attr('autocomplete','off')
								.append($('<input type="submit" />').val('Recover Password').attr('id','submit').addClass('recover'))
								.append($('<p>').addClass('note').text('Instructions: You will receive an email that contains a link to create a new password.'))
							))
							.append($('<div>').addClass('right')
								.append($('<p>').text('OR use your existing account from..'))
								.append($('<a href="#"></a>').text('Facebook').addClass('facebook'))
								.append($('<a href="#"></a>').text('Twitter').addClass('twitter'))
								.append($('<p>').text('Don\'t have an account? ').append($('<a href="#"></a>').text('Create one!').attr('id','create_one')))
							)));
		$.facebox(box.html());
		$('#submit').hover(function() {$(this).addClass('hover');}, function() {$(this).removeClass('hover')});
		$('#create_one').click(function() { $(document).trigger('login.show_register'); return false; });
		$('.twitter').click(function() { Login.twitter.login(); return false; });
		$('.facebook').click(function() { Login.facebook.login(); return false; });
		$('#submit').click(function(e) {
      e.preventDefault();
      var email = $('#email').val();
			Login.clear();
			Login.message('Recovering your password...');
			setTimeout(function() {
        LoginAPI.recover( email, function(json) {
				  Login.message(json.message);
        }, function(json) {
					Login.message(json.message);
        });
			}, 500);
			return false;
		});
	},
	/* Show the Password Reset dialog - only reachable through the email link */
	show_reset: function() {
		var box = $('<div>')
					.append($('<div>').addClass('login_message_wrap').append($('<div>').addClass('login_message')))
					.append($('<div>').addClass('login_wrap')
						.append($('<h3>').append($('<span>').text('Reset your password')))
						.append($('<div>').attr('id','login_body').addClass('clearfix')
							.append($('<div>').addClass('left')
							.append($('<form>').attr('id','form').attr('autocomplete','off')
								.append($('<input type="hidden" name="key" value=""/>').attr('id','key'))
								.append($('<input type="hidden" name="user" value=""/>').attr('id','user'))
								.append($('<label>').text('New Password').attr('for','password1'))
								.append($('<input type="password" name="password1" />').attr('id','password1'))
								.append($('<label>').text('Confirm Password').attr('for','password2'))
								.append($('<input type="password" name="password2" />').attr('id','password2'))
								.append($('<input type="submit" />').val('Reset Password').attr('id','submit').addClass('reset'))
							))
							.append($('<div>').addClass('right')
								.append($('<p>').text('Enter a new password'))
							)));
		$.facebox(box.html());
		$('#submit').hover(function() {$(this).addClass('hover');}, function() {$(this).removeClass('hover')});
		$('#submit').click(function(e) {
      e.preventDefault();
      var key = $('#key').val(),
        user = $('#user').val(),
        password1 = $('#password1').val(),
        password2 = $('#password2').val();
			Login.clear();
			Login.message('Resetting your password...');
			setTimeout(function() {
        LoginAPI.reset( key, user, password1, password2, function(json) {
				  Login.message(json.message);
				  Login.dismissAfter(3000, 'login.success');
        }, function(json) {
				  Login.message(json.message);
        });
			}, 500);
			return false;
		});
	}
};
Login.init();







var LoginAPI = {

  logout: function( onSuccess, onFailure ) {
    var data = {};
    var opts = {
      type: 'POST',
      dataType: 'json',
      cache: false,
      url: '/login/logout',
      data: data
    };
    opts.success = function(json) {
      if( json && json.result && json.result == 'success' ) {
        if( onSuccess ) {
          onSuccess(json);
        }
      } else if( json && json.result && json.result == 'failure' ) {
        if( onFailure ) {
          onFailure(json);
        }
      } else {
        if( onFailure ) {
          onFailure({message: 'Error logging out'});
        }
      }
    };
    opts.error = function(json) {
      if( onFailure ) {
        onFailure({message: 'Error logging out'});
      }
    };
    $.ajax( opts );
  },

  login: function( email, password, remember, onSuccess, onFailure ) {
    var data = {
      email: email,
      password: password,
      remember: remember
    };
    var opts = {
      type: 'POST',
      dataType: 'json',
      cache: false,
      url: '/login/login',
      data: data
    };
    opts.success = function(json) {
      if( json && json.result && json.result == 'success' ) {
        if( onSuccess ) {
          onSuccess(json);
        }
      } else if( json && json.result && json.result == 'failure' ) {
        if( onFailure ) {
          onFailure(json);
        }
      } else {
        if( onFailure ) {
          onFailure({message: 'Error logging in'});
        }
      }
    };
    opts.error = function(json) {
      if( onFailure ) {
        onFailure({message: 'Error logging in'});
      }
    };
    $.ajax( opts );
  },

  register: function( username, email, password, onSuccess, onFailure ) {
    var data = {
      username: username,
      email: email,
      password: password
    };
    var opts = {
      type: 'POST',
      dataType: 'json',
      cache: false,
      url: '/login/register',
      data: data
    };
    opts.success = function(json) {
      if( json && json.result && json.result == 'success' ) {
        if( onSuccess ) {
          onSuccess(json);
        }
      } else if( json && json.result && json.result == 'failure' ) {
        if( onFailure ) {
          onFailure(json);
        }
      } else {
        if( onFailure ) {
          onFailure({message: 'Error registering. Please try again'});
        }
      }
    };
    opts.error = function(json) {
      if( onFailure ) {
        onFailure({message: 'Error registering. Please try again'});
      }
    };
    $.ajax( opts );
  },

  validate_username: function( username, onSuccess, onFailure ) {
    var data = {
      key: 'username',
      value: username
    };
    var opts = {
      type: 'POST',
      dataType: 'json',
      cache: false,
      url: '/login/validate',
      data: data
    };
    opts.success = function(json) {
      if( json && json.result && json.result == 'validate.username.valid' ) {
        if( onSuccess ) {
          onSuccess(json);
        }
      } else if( json && json.result && json.result == 'validate.username.invalid' ) {
        if( onFailure ) {
          onFailure(json);
        }
      } else if( json && json.result && json.result == 'validate.username.nonunique' ) {
        if( onFailure ) {
          onFailure(json);
        }
      } else {
        if( onFailure ) {
          onFailure({message: 'Error validating username. Please try again'});
        }
      }
    };
    opts.error = function(json) {
      if( onFailure ) {
        onFailure({message: 'Error validating username. Please try again'});
      }
    };
    $.ajax( opts );
  },

  validate_email: function( email, onSuccess, onFailure ) {
    var data = {
      key: 'email',
      value: email
    };
    var opts = {
      type: 'POST',
      dataType: 'json',
      cache: false,
      url: '/login/validate',
      data: data
    };
    opts.success = function(json) {
      if( json && json.result && json.result == 'validate.email.valid' ) {
        if( onSuccess ) {
          onSuccess(json);
        }
      } else if( json && json.result && json.result == 'validate.email.invalid' ) {
        if( onFailure ) {
          onFailure(json);
        }
      } else if( json && json.result && json.result == 'validate.email.nonunique' ) {
        if( onFailure ) {
          onFailure(json);
        }
      } else {
        if( onFailure ) {
          onFailure({message: 'Error validating email. Please try again'});
        }
      }
    };
    opts.error = function(json) {
      if( onFailure ) {
        onFailure({message: 'Error validating email. Please try again'});
      }
    };
    $.ajax( opts );
  },

  validate_password: function( password, onSuccess, onFailure ) {
    var data = {
      key: 'password',
      value: password
    };
    var opts = {
      type: 'POST',
      dataType: 'json',
      cache: false,
      url: '/login/validate',
      data: data
    };
    opts.success = function(json) {
      if( json && json.result && json.result == 'validate.password.valid' ) {
        if( onSuccess ) {
          onSuccess(json);
        }
      } else if( json && json.result && json.result == 'validate.password.invalid' ) {
        if( onFailure ) {
          onFailure(json);
        }
      }
    };
    opts.error = function(json) {
      if( onFailure ) {
        onFailure({message: 'Error validating email. Please try again'});
      }
    };
    $.ajax( opts );
  },

  recover: function( email, onSuccess, onFailure ) {
    var data = {
      email: email
    };
    var opts = {
      type: 'POST',
      dataType: 'json',
      cache: false,
      url: '/login/recover',
      data: data
    };
    opts.success = function(json) {
      if( json && json.result && json.result == 'success' ) {
        if( onSuccess ) {
          onSuccess(json);
        }
      } else if( json && json.result && json.result == 'failure' ) {
        if( onFailure ) {
          onFailure(json);
        }
      }
    };
    opts.error = function(json) {
      if( onFailure ) {
        onFailure({message: 'Error recovering password. Please try again'});
      }
    };
    $.ajax( opts );
  },

  reset: function( key, user, password1, password2, onSuccess, onFailure ) {
    var data = {
      key: key,
      user: user,
      password1: password1,
      password2: password2
    };
    var opts = {
      type: 'POST',
      dataType: 'json',
      cache: false,
      url: '/login/reset',
      data: data
    };
    opts.success = function(json) {
      if( json && json.result && json.result == 'success' ) {
        if( onSuccess ) {
          onSuccess(json);
        }
      } else if( json && json.result && json.result == 'failure' ) {
        if( onFailure ) {
          onFailure(json);
        }
      }
    };
    opts.error = function(json) {
      if( onFailure ) {
        onFailure({message: 'Error resetting password. Please try again'});
      }
    };
    $.ajax( opts );
  },

  update_status: function(onLoggedIn, onLoggedOut) {
    var cookie_key = LoginAPI.cookie_key;
    var pairs = document.cookie.split('; '); // from https://github.com/carhartl/jquery-cookie
    LoginAPI.user_id = 0;
    LoginAPI.user_avatar = null;
    for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
      if (decodeURIComponent(pair[0]).indexOf(cookie_key) > -1) {
        var parts = decodeURIComponent(pair[1]);
        parts = parts.split('|');
        if(parts.length != 4) {
          continue;
        }
        part0 = parts[0].split('~');
        LoginAPI.user_id = part0[1];
        LoginAPI.user_avatar = parts[3];
        break;
      }
    }
    if( LoginAPI.user_id > 0 ) {
      onLoggedIn();
    } else {
      onLoggedOut();
    }
  }



};







var CommentAPI = {
  respond: function( comment_post_ID, comment_content, onSuccess, onFailure ) {
    var data = {
      comment_post_ID: comment_post_ID,
      comment_content: comment_content,
      comment_parent: 0
    };
    var opts = {
      type: 'POST',
      dataType: 'json',
      url: '/comment/reply',
      data: data
    };
    opts.success = function(json) {
      if( json.success && onSuccess ) {
        onSuccess(json);
      } else if( json.failure && onFailure ) {
        onFailure(json);
      }
    };
    opts.error = function(json) {
      if( onFailure ) {
        onFailure({failure: 'Error posting comment'});
      }
    };
    $.ajax( opts );
  },

  reply: function( comment_post_ID, comment_parent, comment_content, onSuccess, onFailure ) {
    var data = {
      comment_post_ID: comment_post_ID,
      comment_content: comment_content,
      comment_parent: comment_parent
    };
    var opts = {
      type: 'POST',
      dataType: 'json',
      url: '/comment/reply',
      data: data
    };
    opts.success = function(json) {
      if( json.success && onSuccess ) {
        onSuccess(json);
      } else if( json.failure && onFailure ) {
        onFailure(json);
      }
    };
    opts.error = function(json) {
      if( onFailure ) {
        onFailure({failure: 'Error replying to comment'});
      }
    };
    $.ajax( opts );
  },


  edit: function( comment_post_ID, comment_ID, comment_content, onSuccess, onFailure ) {
    var data = {
      comment_post_ID: comment_post_ID,
      comment_parent: 0, // always zero, even when editng a reply
      comment_ID: comment_ID,
      comment_content: comment_content
    };
    var opts = {
      type: 'POST',
      dataType: 'json',
      url: '/comment/edit',
      data: data
    };
    opts.success = function(json) {
      if( json.success && onSuccess ) {
        onSuccess(json);
      } else if( json.failure && onFailure ) {
        onFailure(json);
      }
    };
    opts.error = function(json) {
      if( onFailure ) {
        onFailure({failure: 'Error editing comment'});
      }
    };
    $.ajax( opts );
  },

  destroy: function( comment_ID, onSuccess, onFailure ) {
    var data = {
      comment_ID: comment_ID
    };
    var opts = {
      type: 'POST',
      dataType: 'json',
      url: '/comment/delete',
      data: data
    };
    opts.success = function(json) {
      if( json.success && onSuccess ) {
        onSuccess(json);
      } else if( json.failure && onFailure ) {
        onFailure(json);
      }
    };
    opts.error = function(json) {
      if( onFailure ) {
        onFailure({failure: 'Error deleting comment'});
      }
    };
    $.ajax( opts );
  },

  rate: function( comment_ID, onSuccess, onFailure ) {
    var data = {
      comment_ID: comment_ID
    };
    var opts = {
      type: 'POST',
      dataType: 'json',
      url: '/comment/rate',
      data: data
    };
    opts.success = function(json) {
      if( json.success && onSuccess ) {
        onSuccess(json);
      } else if( json.failure && onFailure ) {
        onFailure(json);
      }
    };
    opts.error = function(json) {
      if( onFailure ) {
        onFailure({failure: 'Error rating comment'});
      }
    };
    $.ajax( opts );
  },

  get_comments: function( comment_post_ID, onSuccess, onFailure ) {
    var data = {
      comment_post_ID: comment_post_ID
    };
    var opts = {
      type: 'GET',
      dataType: 'html',
      url: '/comment',
      cache: false,
      data: data
    };
    opts.success = function(html) {
      if( onSuccess ) {
        onSuccess(html);
      }
    };
    opts.error = function(json) {
      if( onFailure ) {
        onFailure('<p>Error loading comments?!?</p>');
      }
    };
    $.ajax( opts );
  }

};






var CommentUI = {
  setReplyMessage: function(message, show) {
    $('#comment-reply-message').text(message);
    if( show ) {
      $('#comment-reply-message').show();
    } else {
      $('#comment-reply-message').hide();
    }
  },
  setParentId: function(val) {
	  $('#comment-reply-comment-parent').val(val);
  },
  getParentId: function() {
	  return $('#comment-reply-comment-parent').val();
  },
  getCommentEditId: function() {
    return $('#comment-reply-edit-id').val();
  },
  getCommentPostId: function() {
    return $('#comment-reply-comment-post-id').val();
  },
  getCommentContent: function() {
    return $('#comment-reply-comment-content').val();
  },
  setRating: function(comment_ID, rating) {
		$('#comment-'+comment_ID+' .comment-rating').text(""+rating);
  },
  setAvatar: function(avatar) {
    $('#comment-reply .avatar').attr('src', avatar);
  },
  clearEditDates: function() {
    $('.comment-edit').remove();
  },
  setEditDates: function(user_id) {
    // only comments belonging to this user
    $('.comment-user-id-'+user_id).each(function() {
      var comment_date_gmt = $(this).attr('data-comment-date-gmt') || '',
        comment_year = comment_date_gmt.substring(0,4),
        comment_month = parseInt(comment_date_gmt.substring(5,7),10),
        comment_day = comment_date_gmt.substring(8,10),
        comment_hour = comment_date_gmt.substring(11,13),
        comment_minute = comment_date_gmt.substring(14,16),
        comment_second = comment_date_gmt.substring(17,19);

      var js_date = new Date();
      js_date.setUTCFullYear(comment_year);
      js_date.setUTCMonth(comment_month-1);
      js_date.setUTCDate(comment_day);
      js_date.setUTCHours(comment_hour);
      js_date.setUTCMinutes(comment_minute);
      js_date.setUTCSeconds(comment_second);

      var remaining_seconds = 300 + Math.floor((js_date - (new Date())) / 1000);
      if( remaining_seconds > 0 ) {
        var remaining_minutes = Math.floor(remaining_seconds / 60);
        remaining_seconds = remaining_seconds - (remaining_minutes * 60);
        var remaining = remaining_minutes+'min'+remaining_seconds+'sec';
        html = '<div class="comment-edit-wrap"><a class="comment-edit" href="#">Edit your comment <span>(Comment editable for.. '+remaining+')</span></a><a class="comment-delete" href="#">Delete your comment</a></div>';
        $(this).find('> .comment-author').after(html);
      }
    });
  }
};








var Comments = {

	submit: function() {
    var comment_post_ID = CommentUI.getCommentPostId(),
      comment_parent = CommentUI.getParentId(),
      comment_content = CommentUI.getCommentContent();

    CommentUI.setReplyMessage('Posting your comment', true);

    if( comment_parent > 0 ) {

      CommentAPI.reply( comment_post_ID, comment_parent, comment_content, function(json) {
        CommentUI.setReplyMessage('', false);
        CommentUI.setParentId(0);
        Comments.reload();
      }, function(json) {
        CommentUI.setReplyMessage(json.failure, true);
        setTimeout(function() {
          CommentUI.setReplyMessage('', false);
        }, 2000);
      });

    } else {

      CommentAPI.respond( comment_post_ID, comment_content, function(json) {
        CommentUI.setReplyMessage('', false);
        CommentUI.setParentId(0);
        Comments.reload();
      }, function(json) {
        CommentUI.setReplyMessage(json.failure, true);
        setTimeout(function() {
          CommentUI.setReplyMessage('', false);
        }, 2000);
      });

    }

	},

	submit_edit: function() {
    var comment_post_ID = CommentUI.getCommentPostId(),
      comment_ID = CommentUI.getCommentEditId(),
      comment_content = CommentUI.getCommentContent();

    CommentUI.setReplyMessage('Updating your comment', true);

    CommentAPI.edit( comment_post_ID, comment_ID, comment_content, function(json) {
      CommentUI.setReplyMessage('', false);
      Comments.reload();
    }, function(json) {
      CommentUI.setReplyMessage(json.failure, true);
      setTimeout(function() {
        CommentUI.setReplyMessage('', false);
      }, 2000);
    });
	},

	submit_delete: function(comment_id) {
    CommentUI.setReplyMessage('Deleting your comment', true);

    CommentAPI.destroy( comment_id, function(json) {
      CommentUI.setReplyMessage('', false);
      Comments.reload();
    }, function(json) {
      CommentUI.setReplyMessage(json.failure, true);
      setTimeout(function() {
        CommentUI.setReplyMessage('', false);
      }, 2000);
    });
	},

	rate: function(comment_id) {
    CommentAPI.rate( comment_id, function(json) {
      CommentUI.setRating(json.rating);
      Comments.reload();
    }, function(json) {
      // do nothing
    });
	},

  reload: function() {
    var comment_post_ID = CommentUI.getCommentPostId(),
      comment_parent = CommentUI.getParentId();

    CommentAPI.get_comments( comment_post_ID, function(html) {
      $('#comments-wrap').replaceWith(html);
			if(comment_parent != 0) {
				Comments.replyto(comment_parent);
			}
			$('#comment-reply-comment-content').focus();
      CommentUI.setEditDates(LoginAPI.user_id);
			Comments.tick();
    }, function(html) {
      // uh oh
    });
	},

	replyto: function(comment_id) {
		var old_title = $('#comment-reply h3').text();
		var old_submit = $('#comment-reply-submit').text();
		var thread_parent_id = $('#comment-'+comment_id).parents('.comment').attr('id');
		// if there is a parent, use that ID, otherwise, this is the parent
		if(thread_parent_id == null) {
			thread_parent_id = comment_id;
		} else {
			thread_parent_id = thread_parent_id.substring('comment-'.length);
		}
		// place after last child, if any, or this comment, if no children
		if($('#comment-'+thread_parent_id+' > .comment').length == 0) {
			$('#comment-'+thread_parent_id+' > .comment-reply-wrap').after($('#comment-reply').detach());
		} else {
			$('#comment-'+thread_parent_id+' .comment:last-child > .comment-reply-wrap').after($('#comment-reply').detach());
		}
		// find the @name for the previous commenter
		var at_author = '@' + $('#comment-'+comment_id+' > .comment-author a').text() + ' ';
		if($('#comment-reply-comment-content').length > 0) {
			$('#comment-reply-comment-content').val(at_author).focus().setCursorPosition(at_author.length);
		} else {
			var new_position = $('#comment-reply').offset();
			window.scrollTo(new_position.left,new_position.top-150);
		}
		$('#comment-reply h3').text('Reply To Thread');
		$('#comment-reply-submit').text('Reply');
		$('#comment-reply-comment-parent').val(thread_parent_id);
		$('#comment-reply-cancel').show().unbind('click').click(function() {
			$('#comment-reply').detach().appendTo('#comments-wrap');
			$('#comment-reply-cancel').hide();
			$('#comment-reply h3').text(old_title);
			$('#comment-reply-submit').text(old_submit);
			$('#comment-reply-comment-parent').val(0);
			$('#comment-reply-comment').focus();
			return false;
		});
	},
	edit: function(comment_id) {
		var old_title = $('#comment-reply h3').text();
		var orig_comment = $('#comment-'+comment_id+' .comment-text').text().trim();
		$('#comment-reply').detach().appendTo('#comment-'+comment_id);
		$('#comment-reply-comment-content').focus();
		$('#comment-reply h3').text('Edit Comment');
		$('#comment-reply-comment-content').val(orig_comment);
		$('#comment-reply-form').append(
			$('<input id="comment-reply-edit-id" name="comment_ID" type="hidden" value="'+comment_id+'">')
		);
		$('#comment-reply-edit').show();
		$('#comment-reply-submit').hide();
		$('#comment-reply-cancel').show().unbind('click').click(function() {
			$('#comment-reply-comment-content').val('');
			$('#comment-reply').detach().appendTo('#comments-wrap');
			$('#comment-reply-cancel').hide();
			$('#comment-reply-edit').hide();
			$('#comment-reply-submit').show();
			$('#comment-reply h3').text(old_title);
			$('#comment-reply-edit-id').remove();
			$('#comment-reply-comment-content').focus();
			return false;
		});
		
	},
	tick_interval: 1,
	tick_inverval_fn: null,
	tick: function() {
		clearInterval(Comments.tick_inverval_fn);
		var any_left = 0;
		$('.comment-edit span').each(function() {
			var text = $(this).text();
			var time = text.substring(24);
			time = time.substring(0,time.length-4);
			var minutes = parseInt(time.substring(0,1),10);
			var seconds = -Comments.tick_interval + 60*minutes + parseInt(time.substring(4),10);
			minutes = Math.floor(seconds / 60);
			seconds = seconds - (minutes * 60);
			if(minutes > 0 || seconds > 0) {
				any_left++;
				$(this).text('(Comment editable for.. '+minutes+'min'+seconds+'sec)');
			} else {
				$(this).parent().parent().remove();
			}
		});
		if(any_left > 0) {
			Comments.tick_inverval_fn = setInterval(Comments.tick, Comments.tick_interval*1000);
		}
	},
	sort_chronological: function() {
		$('#comment-sort a').removeClass('active');
		$('#comment-sort-chronological').addClass('active');
		var items = [];
		$('#comment-list > .comment').each(function() {
			items.push($(this));
		});
		items.sort(function(a, b) {
			return parseInt($('#'+a[0].id).attr('id').substring(8),10) < parseInt($('#'+b[0].id).attr('id').substring(8),10) ? -1 : 1;
		});
		for(i=0; i<items.length; i++) {
			$('#comment-list').append(items[i]);
		}
		Comments.restripe();
	},
	sort_reverse_chronological: function() {
		$('#comment-sort a').removeClass('active');
		$('#comment-sort-reverse-chronological').addClass('active');
		var items = [];
		$('#comment-list > .comment').each(function() {
			items.push($(this));
		});
		items.sort(function(a, b) {
			return parseInt($('#'+a[0].id).attr('id').substring(8),10) < parseInt($('#'+b[0].id).attr('id').substring(8),10) ? 1 : -1;
		});
		for(i=0; i<items.length; i++) {
			$('#comment-list').append(items[i]);
		}
		Comments.restripe();
	},
	sort_popularity: function() {
		$('#comment-sort a').removeClass('active');
		$('#comment-sort-popularity').addClass('active');
		var items = [];
		$('#comment-list > .comment').each(function() {
			items.push($(this));
		});
		items.sort(function(a, b) {
			var a_liked = 0;
			$('#'+a[0].id).find('.comment-rating').each(function() {
				if($(this).text() > a_liked) {
					a_liked = parseInt($(this).text(),10);
				}
			});
			var b_liked = 0;
			$('#'+b[0].id).find('.comment-rating').each(function() {
				if($(this).text() > b_liked) {
					b_liked = parseInt($(this).text(),10);
				}
			});
			if(a_liked == b_liked) {
				return parseInt($('#'+a[0].id).attr('id').substring(8),10) < parseInt($('#'+b[0].id).attr('id').substring(8),10) ? -1 : 1;
			}
			return a_liked < b_liked ? 1 : -1;
		});
		for(i=0; i<items.length; i++) {
			$('#comment-list').append(items[i]);
		}
		Comments.restripe();
	},
	restripe: function() {
		$('.comment').each(function(index) {
			$(this).removeClass('.comment-thread-even .comment-thread-odd'); 
			if(index % 2 == 0) { $(this).addClass('.comment-thread-even'); }
			else { $(this).addClass('.comment-thread-odd'); }
		});
	},

	
	init: function( comment_post_ID, cookie_key ) {
		if(Comments.initialized) {
			return;
		}
		Comments.initialized = 1;
    LoginAPI.cookie_key = cookie_key;
    LoginAPI.comment_post_ID = comment_post_ID;
		
		$('.comment-reply').live("click", function() {
			var comment_id = $(this).parent().parent().attr('id').substring('comment-'.length);
			Comments.replyto(comment_id);
			return false;
		});
		
		$('.comment-edit').live("click", function() {
			var comment_id = $(this).parent().parent().attr('id').substring('comment-'.length);
			Comments.edit(comment_id);
			return false;
		});
		$('.comment-delete').live("click", function() {
			var comment_id = $(this).parent().parent().attr('id').substring('comment-'.length);
			Comments.submit_delete(comment_id);
			return false;
		});
		$('.comment-rating-a').live("click", function() {
			var comment_id = $(this).parent().parent().attr('id').substring('comment-'.length);
			Comments.rate(comment_id);
			return false;
		});
		$('#comment-reply-login').live("click", function() {
			$(document).trigger('login.show_login');
			return false;
		});
		$('#comment-reply-logout').live("click", function() {
			$(document).trigger('login.show_logout');
			return false;
		});
		$('#comment-sort-chronological').live("click", function() {
			Comments.sort_chronological();
			return false;
		});
		$('#comment-sort-reverse-chronological').live("click", function() {
			Comments.sort_reverse_chronological();
			return false;
		});
		$('#comment-sort-popularity').live("click", function() {
			Comments.sort_popularity();
			return false;
		});
		$('#comment-reply-form').live("submit", function() {
			Comments.submit();
			return false;
		});
		$('#comment-reply-submit').live("click", function() {
			Comments.submit();
			return false;
		});
		$('#comment-reply-edit').live("click", function() {
			Comments.submit_edit();
			return false;
		});
		$(document).bind('login.success', function() {
			Comments.reload();
      LoginAPI.update_status(function() {
        $('body').addClass('ss-logged-in');
        CommentUI.setAvatar(LoginAPI.user_avatar);
        CommentUI.setEditDates(LoginAPI.user_id);
		    Comments.tick();
      }, function() {
        $('body').removeClass('ss-logged-in');
        CommentUI.setAvatar('/assets/default-avatar.jpg');
        CommentUI.clearEditDates();
      });
		});
		$(document).bind('logout.success', function() {
			Comments.reload();
      LoginAPI.update_status(function() {
        $('body').addClass('ss-logged-in');
        CommentUI.setAvatar(LoginAPI.user_avatar);
        CommentUI.setEditDates(LoginAPI.user_id);
		    Comments.tick();
      }, function() {
        $('body').removeClass('ss-logged-in');
        CommentUI.setAvatar('/assets/default-avatar.jpg');
        CommentUI.clearEditDates();
      });
		});

    LoginAPI.update_status(function() {
      $('body').addClass('ss-logged-in');
      CommentUI.setAvatar(LoginAPI.user_avatar);
      CommentUI.setEditDates(LoginAPI.user_id);
      Comments.tick();
    }, function() {
      $('body').removeClass('ss-logged-in');
      CommentUI.setAvatar('/assets/default-avatar.jpg');
      CommentUI.clearEditDates();
    });

	}
};

// http://stackoverflow.com/questions/499126/jquery-set-cursor-position-in-text-area
new function($) {
  $.fn.setCursorPosition = function(pos) {
    if ($(this).get(0).setSelectionRange) {
      $(this).get(0).setSelectionRange(pos, pos);
    } else if ($(this).get(0).createTextRange) {
      var range = $(this).get(0).createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  }
}(jQuery);







