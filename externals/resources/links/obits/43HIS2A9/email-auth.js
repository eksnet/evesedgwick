(function(jQuery) {
"use strict";

var $ = jQuery;

var plugin = Echo.Plugin.manifest("rtbEmailUserAuth", "Echo.IdentityServer.Controls.Auth");

plugin.init = function() {
	this.extendTemplate("insertBefore", "login", plugin.template);
};

plugin.template = '<span class="echo-identityserver-controls-auth-login echo-linkColor echo-clickable btn btn-small {plugin.class:emailLoginBtn}"></span>';

plugin.config = {
	"apiKey": "50749903cc72f82571000016"
};

plugin.labels = {
	"btnLabel": "Email Login",
	"login": "Login",
	"email": "Email",
	"name": "Name",
	"name2": "New Name",
	"cancel": "Cancel",
	"save": "Save",
	"password": "Password",
	"password2": "Password Confirm",
	"password3": "Current Password",
	"password4": "New Password",
	"resetPassword": "Reset Password",
	"signIn": "Sign In",
	"register": "Create Account",
	"alertError": "Error!",
	"badLogin": "Invalid email, password or account not validated.",
	"badReset": "Email invalid or not registered.",
	"badRegister": "Invalid email or passwords.",
	"alertSuccess": "Success!",
	"emailSentReset": "An email with instructions to reset your password has been sent.",
	"registerGood": "Please check your email to validate your account.",
	"liChangePassword": "Change Password",
	"liChangeName": "Change Name",
	"liChangeAvatar": "Update Avatar",
	"changePassword": "Update",
	"badDataEntry": "Please enter values into all fields.",
	"updatePasswordWorked": "Password has been updated.",
	"updateNameWorked": "Name has been updated.",
	"updateAvatarWorked": "Avatar has been updated.",
	"avatar": "Avatar",
	"chooseAvatar": "Choose Avatar"
};

plugin.css = '' +
	'.{plugin.class:emailLoginBtn} {margin-right:5px;}' +
	'.echo-sdk-ui .form-horizontal .control-group { margin-bottom: 10px !important;}';

plugin.renderers.emailLoginBtn = function(element) {
	var plugin = this, component = this.component;
	//
	element.html(plugin.labels.get("btnLabel"));
	element.click(function() {
		plugin.showForm("login");
	});
	return element;
};

plugin.methods.goAPI = function(endpoint, data, callback, callbackError) {
	// do it
	$.ajax({
	  url: "https://api.realtidbits.com" + endpoint,
	  dataType: 'jsonp',
	  data: data,
	  success: function(rsp) {
		callback(rsp);
	  },
	  error: function(rsp) {
		callbackError(rsp);
	  }
	});
};

plugin.component.renderers.userLogged = function(element) {
	var plugin = this, component = this.component;
	this.parentRenderer("userLogged", arguments);
	// do something!
	if(Echo.UserSession.get("identityUrl").indexOf("/ECHO/user") > -1) {
		var ul = element.find('.echo-identityserver-controls-auth-dropdown ul');
		var li = $('<li><a href="javascript:void(0);">' + plugin.labels.get("liChangePassword") + '</a></li>');
		li.find('a').click(function() {
			plugin.showForm("changePassword");
		});
		ul.prepend(li);
		//
		var li = $('<li><a href="javascript:void(0);">' + plugin.labels.get("liChangeName") + '</a></li>');
		li.find('a').click(function() {
			plugin.showForm("changeName");
		});
		ul.prepend(li);
		
		var li = $('<li><a href="javascript:void(0);">' + plugin.labels.get("liChangeAvatar") + '</a></li>');
		li.find('a').click(function() {
			plugin.showForm("changeAvatar");
		});
		ul.prepend(li);
	};
	//
	return element;
};

plugin.methods.showForm = function(fName) {
	var plugin = this, component = this.component;
	var modalBody = $(
		'<div class="rtb-email-auth-form-login">' +
			'<div class="rtb-email-form-errors"></div>' +
			'<form class="form-horizontal" onsubmit="return false;">' +
				'<div class="control-group rtb-form-input rtb-form-input-name">' +
					'<label class="control-label">' + plugin.labels.get("name") + "</label> " +
					'<div class="controls">' +
						'<input type="text" name="name" style="width:225px;" />' +
					'</div>' +
				'</div>' +
				'<div class="control-group rtb-form-input rtb-form-input-email">' +
					'<label class="control-label">' + plugin.labels.get("email") + "</label> " +
					'<div class="controls">' +
						'<input type="text" name="email" style="width:225px;" />' +
					'</div>' +
				'</div>' +
				'<div class="control-group rtb-form-input rtb-form-input-password">' +
					'<label class="control-label">' + plugin.labels.get("password") + "</label> " +
					'<div class="controls">' +
						'<input type="password" name="password" style="width:225px;" />' +
					'</div>' +
				'</div>' +
				'<div class="control-group rtb-form-input rtb-form-input-password3">' +
					'<label class="control-label">' + plugin.labels.get("password3") + "</label> " +
					'<div class="controls">' +
						'<input type="password" name="password3" style="width:225px;" />' +
					'</div>' +
				'</div>' +
				'<div class="control-group rtb-form-input rtb-form-input-password4">' +
					'<label class="control-label">' + plugin.labels.get("password4") + "</label> " +
					'<div class="controls">' +
						'<input type="password" name="password4" style="width:225px;" />' +
					'</div>' +
				'</div>' +
				'<div class="control-group rtb-form-input rtb-form-input-password2">' +
					'<label class="control-label">' + plugin.labels.get("password2") + "</label> " +
					'<div class="controls">' +
						'<input type="password" name="password2" style="width:225px;" />' +
					'</div>' +
				'</div>' +
				'<div class="control-group rtb-form-input rtb-form-input-name2">' +
					'<label class="control-label">' + plugin.labels.get("name2") + "</label> " +
					'<div class="controls">' +
						'<input type="text" name="name2" style="width:225px;" />' +
					'</div>' +
				'</div>' +
				'<div class="control-group rtb-form-input rtb-form-input-avatar">' +
					'<label class="control-label">' + plugin.labels.get("avatar") + "</label> " +
					'<div class="controls">' +
						'<button>' + plugin.labels.get("chooseAvatar") + '</button> ' +
						'<img src="' + Echo.UserSession.get("avatar", '') +'" style="height:48px" />' +
						'<input type="hidden" name="avatar" value="' + Echo.UserSession.get("avatar", '') +'" />' +
						'</div>' +
				'</div>' +
				'<div class="control-group">' +
					'<div class="controls rtb-form-buttons rtb-email-form-login">' +
						'<label><a href="javascript:void(0);" class="form-reset-password">' + plugin.labels.get("resetPassword") + '</a></label>' +
						'<button type="submit" class="btn btn-primary form-btn-signin">' + plugin.labels.get("signIn") + '</button>' +
						'&nbsp;<button class="btn form-btn-register">' + plugin.labels.get("register") + '</button>' +
					'</div>' +
					'<div class="controls rtb-form-buttons rtb-email-form-reset">' +
						'<button type="submit" class="btn btn-primary form-btn-submit-reset">' + plugin.labels.get("resetPassword") + '</button>' +
						'&nbsp;<button class="btn form-btn-cancel">' + plugin.labels.get("cancel") + '</button>' +
					'</div>' +
					'<div class="controls rtb-form-buttons rtb-email-form-register">' +
						'<button type="submit" class="btn btn-primary form-btn-submit-register">' + plugin.labels.get("register") + '</button>' +
						'&nbsp;<button class="btn form-btn-cancel">' + plugin.labels.get("cancel") + '</button>' +
					'</div>' +
					'<div class="control-group rtb-form-buttons form-changePassword">' +
						'<div class="controls">' +
							'<button type="submit" class="btn btn-primary form-btn-submit">' + plugin.labels.get("changePassword") + '</button>' +
						'</div>' +
					'</div>' +
					'<div class="control-group rtb-form-buttons form-changeName">' +
						'<div class="controls">' +
							'<button type="submit" class="btn btn-primary form-btn-submit">' + plugin.labels.get("changePassword") + '</button>' +
						'</div>' +
					'</div>' +
					'<div class="control-group rtb-form-buttons form-changeAvatar">' +
						'<div class="controls">' +
							'<button type="submit" class="btn btn-primary form-btn-submit">' + plugin.labels.get("changePassword") + '</button>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</form>' +
		'</div>');
	//
	var modalObj;
	// hide all
	modalBody.find(".rtb-form-input,.rtb-form-buttons").hide();
	// show
	switch(fName) {
		case 'login':
			modalBody.find(".rtb-form-input-email,.rtb-form-input-password").show();
			modalBody.find(".rtb-email-form-login").show();
			var modalTitle = plugin.labels.get("login");
		break;
		case 'changePassword':
			modalBody.find(".rtb-form-input-password3,.rtb-form-input-password4").show();
			modalBody.find(".form-changePassword").show();
			var modalTitle = plugin.labels.get("liChangePassword");
		break;
		case 'changeName':
			modalBody.find(".rtb-form-input-password3,.rtb-form-input-name2").show();
			modalBody.find(".form-changeName").show();
			var modalTitle = plugin.labels.get("liChangeName");
		break;
		case 'changeAvatar':
			modalBody.find(".rtb-form-input-password3,.rtb-form-input-avatar").show();
			modalBody.find(".form-changeAvatar").show();
			var modalTitle = plugin.labels.get("liChangeAvatar");
		break;
	};
	
	// register
	modalBody.find(".form-btn-register").click(function() {
		modalBody.find(".rtb-form-input,.rtb-form-buttons").hide();
		modalBody.find(".rtb-form-input-email,.rtb-form-input-password,.rtb-form-input-password2,.rtb-form-input-name,.rtb-form-input-avatar").show();
		modalBody.find(".rtb-email-form-register").show();
	});
	modalBody.find(".rtb-email-form-register .form-btn-cancel").click(function() {
		modalBody.find(".rtb-form-input,.rtb-form-buttons").hide();
		modalBody.find(".rtb-form-input-email,.rtb-form-input-password").show();
		modalBody.find(".rtb-email-form-login").show();
	});

	modalBody.find(".rtb-form-input-avatar").click(function() {
		if($(this).is(":visible")) {
			plugin.initChuteDialog(function(assets) {
				var img = modalBody.find(".rtb-form-input-avatar img");
				img.attr("src", Chute.fill(100, 100, assets[0].url));
				modalBody.find(".rtb-form-input-avatar input").val(Chute.fill(100, 100, assets[0].url));
			});
		};
	});

	// change avatar
	modalBody.find(".form-changeAvatar .form-btn-submit").click(function() {
		var subBtn = $(this);
		var tt = modalBody.find('.rtb-email-form-errors');
		var f1 = modalBody.find("input[name='password3']").val();
		var f2 = modalBody.find("input[name='avatar']").val();
		if(f1 == "" || f2 == "") {
			RTB.Utils.Alert(tt, plugin.labels.get("alertError"), plugin.labels.get("badDataEntry"), "error", true, true);
		} else {
			// reset
			var data = {
				"appkey": component.config.get("appkey"),
				"identity": Echo.UserSession.get("identityUrl"),
				"password": f1,
				"avatar": f2,
				"bp_channel_id": Backplane.getChannelID(),
				"source_domain": document.location.protocol + '//' + RTB.Utils.getDomain(location.href)
			};
			plugin.submitButtonStates(subBtn, true);
			plugin.goAPI("/auth/update_avatar", data, function(rsp) {
				plugin.submitButtonStates(subBtn, false);
				// api returns
				var tt = modalBody.find('.rtb-email-form-errors');
				if(rsp.success == false) {
					RTB.Utils.Alert(tt, plugin.labels.get("alertError"), rsp.msg, "error", true, true);
				} else {
					// reset good
					RTB.Utils.Alert(tt, plugin.labels.get("alertSuccess"), plugin.labels.get("updateAvatarWorked"), "success", true, true);
					// update backplane
					Backplane.expectMessages("identity/ack");
					setTimeout(function() {
						modalObj.hide();
					}, 2500);
				};
			}, function(rsp) {
				// error
				plugin.submitButtonStates(subBtn, false);
				RTB.Utils.Alert(tt, plugin.labels.get("alertError"), plugin.labels.get("badDataEntry"), "error", true, true);
			});
		};
	});

	// change name
	modalBody.find(".form-changeName .form-btn-submit").click(function() {
		var subBtn = $(this);
		var tt = modalBody.find('.rtb-email-form-errors');
		var f1 = modalBody.find("input[name='password3']").val();
		var f2 = modalBody.find("input[name='name2']").val();
		if(f1 == "" || f2 == "") {
			RTB.Utils.Alert(tt, plugin.labels.get("alertError"), plugin.labels.get("badDataEntry"), "error", true, true);
		} else {
			// reset
			var data = {
				"appkey": component.config.get("appkey"),
				"identity": Echo.UserSession.get("identityUrl"),
				"password": f1,
				"name": f2,
				"bp_channel_id": Backplane.getChannelID(),
				"source_domain": document.location.protocol + '//' + RTB.Utils.getDomain(location.href)
			};
			plugin.submitButtonStates(subBtn, true);
			plugin.goAPI("/auth/update_name", data, function(rsp) {
				plugin.submitButtonStates(subBtn, false);
				// api returns
				var tt = modalBody.find('.rtb-email-form-errors');
				if(rsp.success == false) {
					RTB.Utils.Alert(tt, plugin.labels.get("alertError"), rsp.msg, "error", true, true);
				} else {
					// reset good
					RTB.Utils.Alert(tt, plugin.labels.get("alertSuccess"), plugin.labels.get("updateNameWorked"), "success", true, true);
					// update backplane
					Backplane.expectMessages("identity/ack");
					setTimeout(function() {
						modalObj.hide();
					}, 2500);
				};
			}, function(rsp) {
				// error
				plugin.submitButtonStates(subBtn, false);
				RTB.Utils.Alert(tt, plugin.labels.get("alertError"), plugin.labels.get("badDataEntry"), "error", true, true);
			});
		};
	});
	
	// change password
	modalBody.find(".form-changePassword .form-btn-submit").click(function() {
		var subBtn = $(this);
		var tt = modalBody.find('.rtb-email-form-errors');
		var f1 = modalBody.find("input[name='password3']").val();
		var f2 = modalBody.find("input[name='password4']").val();
		if(f1 == "" || f2 == "") {
			RTB.Utils.Alert(tt, plugin.labels.get("alertError"), plugin.labels.get("badDataEntry"), "error", true, true);
		} else {
			// reset
			var data = {
				"appkey": component.config.get("appkey"),
				"identity": Echo.UserSession.get("identityUrl"),
				"password": f1,
				"password2": f2
			};
			plugin.submitButtonStates(subBtn, true);
			plugin.goAPI("/auth/update_password", data, function(rsp) {
				plugin.submitButtonStates(subBtn, false);
				// api returns
				var tt = modalBody.find('.rtb-email-form-errors');
				if(rsp.success == false) {
					RTB.Utils.Alert(tt, plugin.labels.get("alertError"), rsp.msg, "error", true, true);
				} else {
					// reset good
					RTB.Utils.Alert(tt, plugin.labels.get("alertSuccess"), plugin.labels.get("updatePasswordWorked"), "success", true, true);
					setTimeout(function() {
						modalObj.hide();
					}, 2500);
				};
			}, function(rsp) {
				// error
				plugin.submitButtonStates(subBtn, false);
				RTB.Utils.Alert(tt, plugin.labels.get("alertError"), plugin.labels.get("badDataEntry"), "error", true, true);
			});
		};
	});
	
	modalBody.find(".rtb-email-form-register .form-btn-submit-register").click(function() {
		var subBtn = $(this);
		// do register
		var f1 = $.trim(modalBody.find("input[name='email']").val());
		var f2 = $.trim(modalBody.find("input[name='name']").val());
		var f3 = $.trim(modalBody.find("input[name='password']").val());
		var f4 = $.trim(modalBody.find("input[name='password2']").val());
		var f5 = $.trim(modalBody.find(".rtb-form-input-avatar input").val());
		if(f1 == "" || !RTB.Utils.isEmailValid(f1) ||
			f2 == "" || f3 == "" || f4 == "" || f3 != f4 || f3.length < 4) {
			var tt = modalBody.find('.rtb-email-form-errors');
			RTB.Utils.Alert(tt, plugin.labels.get("alertError"), plugin.labels.get("badRegister"), "error", true, true);
		} else {
			// reset
			var data = {
				"appkey": component.config.get("appkey"),
				"email": f1,
				"password": f3,
				"display_name": f2,
				"source_domain": document.location.protocol + '//' + RTB.Utils.getDomain(location.href),
				"bp_channel_id": Backplane.getChannelID(),
				"avatar": f5
			};
			plugin.submitButtonStates(subBtn, true);
			plugin.goAPI("/auth/register", data, function(rsp) {
				plugin.submitButtonStates(subBtn, false);
				// api returns
				var tt = modalBody.find('.rtb-email-form-errors');
				if(rsp.success == false) {
					RTB.Utils.Alert(tt, plugin.labels.get("alertError"), rsp.msg, "error", true, true);
				} else {
					// reset good
					RTB.Utils.Alert(tt, plugin.labels.get("alertSuccess"), plugin.labels.get("registerGood"), "success", true, true);
					// show login form
					modalBody.find(".rtb-form-input,.rtb-form-buttons").hide();
					//modalBody.find(".rtb-form-input-email,.rtb-form-input-password").show();
					//modalBody.find(".rtb-email-form-login").show();
					modalBody.find("input[name='password']").val("");
				};
			}, function(rsp) {
				// error
				plugin.submitButtonStates(subBtn, false);
				RTB.Utils.Alert(tt, plugin.labels.get("alertError"), plugin.labels.get("badLogin"), "error", true, true);
			});
		};
	});
	// login
	modalBody.find(".form-reset-password").click(function() {
		var subBtn = $(this);

		plugin.submitButtonStates(subBtn, true);
		var formEmail = modalBody.find("input[name='email']").val();
		
		modalBody.find(".rtb-form-input,.rtb-form-buttons").hide();
		modalBody.find(".rtb-form-input-email,.rtb-email-form-reset").show();
	});
		
	modalBody.find(".rtb-email-form-reset .form-btn-cancel").click(function() {
		modalObj.hide();
	});
		
	modalBody.find(".form-btn-submit-reset").click(function() {	
		var subBtn = $(this);
		var formEmail = modalBody.find("input[name='email']").val();
		//
		var tt = modalBody.find('.rtb-email-form-errors');
		if($.trim(formEmail) == "" || !RTB.Utils.isEmailValid(formEmail)) {
			RTB.Utils.Alert(tt, plugin.labels.get("alertError"), plugin.labels.get("badReset"), "error", true, true);
		} else {
			// reset
			var data = {
				"appkey": component.config.get("appkey"),
				"email": formEmail
			};
			// disable button
			plugin.submitButtonStates(subBtn, true);
			// ajax
			plugin.goAPI("/auth/request_reset_password", data, function(rsp) {
				plugin.submitButtonStates(subBtn, false);
				// api returns
				var tt = modalBody.find('.rtb-email-form-errors');
				if(rsp.success == false) {
					RTB.Utils.Alert(tt, plugin.labels.get("alertError"), plugin.labels.get("badReset"), "error", true, true);
				} else {
					// reset good
					RTB.Utils.Alert(tt, plugin.labels.get("alertSuccess"), plugin.labels.get("emailSentReset"), "success", true, true);
				};
			}, function(rsp) {
				// error
				plugin.submitButtonStates(subBtn, false);
				RTB.Utils.Alert(tt, plugin.labels.get("alertError"), plugin.labels.get("badReset"), "error", true, true);
			});
		};
	});
	
	modalBody.find(".form-btn-signin").click(function() {
		var subBtn = $(this);
		// login
		var data = {
			"appkey": component.config.get("appkey"),
			"email": modalBody.find("input[name='email']").val(),
			"password": modalBody.find("input[name='password']").val(),
			"bp_channel_id": Backplane.getChannelID(),
			"source_domain": document.location.protocol + '//' + RTB.Utils.getDomain(location.href)
		};
		plugin.submitButtonStates(subBtn, true);
		plugin.goAPI("/auth/login", data, function(rsp) {
			plugin.submitButtonStates(subBtn, false);
			// api returns
			var tt = modalBody.find('.rtb-email-form-errors');
			if(rsp.success == false) {
				RTB.Utils.Alert(tt, plugin.labels.get("alertError"), plugin.labels.get("badLogin"), "error", true, true);
			} else {
				// login good
				Backplane.expectMessages("identity/ack");
				modalObj.hide();
			};
		}, function(rsp) {
			// error
			plugin.submitButtonStates(subBtn, false);
			RTB.Utils.Alert(tt, plugin.labels.get("alertError"), plugin.labels.get("badLogin"), "error", true, true);
		});
	});
	
	modalObj = new Echo.GUI.Modal({
		"data": {
			"title": modalTitle,
			"body": modalBody,
			"buttons": []
		},
		"onShow": function() {
			Backplane.expectMessages("identity/ack");
		},
		"extraClass": "rtb-apps-comments",
		//"width": popup.width,
		"header": true,
		"footer": false,
		"fade": true,
		"show": true
	});
};

plugin.methods.submitButtonStates = function(btn, disable) {
	if(disable) {
		btn.attr('disabled', 'disabled');
	} else {
		btn.removeAttr('disabled');
	};
};

plugin.methods.initChuteDialog = function(callback) {
	var plugin = this, submit = plugin.component, txt = submit.view.get('text');
	var scheme = window.location.protocol === "https:" ? "https://ssl." : "http://cdn.";
	scheme = "http://dev."
	Echo.Loader.download([{
		"url": scheme + "realtidbits.com/libs/v3/partners/chute-media-chooser.js",
		"loaded": function() { return !!window.Chute; }
	}], function() {
		Chute.setApp(plugin.config.get('apiKey'));

		Chute.MediaChooser.choose({
			"limit": 1,
			//"embed": (dialog != "null" ? dialog.element.find("#" + id).empty() : ""), // also remove "Loading..."
			"picker_version":"v2",
			"captions":"optional",
			"css": scheme + 'realtidbits.com/libs/v3/comments/chute.css'
		}, function(urls, data){
			callback(data.assets);
		});
	});
};

Echo.Plugin.create(plugin);

})(Echo.jQuery);
