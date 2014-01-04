function AjaxUtil(){

	var self = this;
	self.reload = function() {
		// moved to function so it can be stubbed out for testing, otherwise it reloads the page in an infinite loop when you test...
		location.reload();
	};
	
	self.getDataFromServer = function(url, data, functionToCallOnSuccess, functionToCallOnError, type, async){
		var params = {	"url": url,
						"type": type == null ? "POST" : type,
						"data": data, 
						"success": function(data, textStatus, jqXHR) {
										if(functionToCallOnSuccess) {
											functionToCallOnSuccess(data, textStatus, jqXHR);
										}
										$("body").css("cursor", "default");
									},
						"error": function(data, textStatus, jqXHR) {
										if(data.status == 419) {
											self.reload();
										}else if(functionToCallOnError) {
											functionToCallOnError(data, textStatus, jqXHR);
										}
									},
						"async" : (async == null ? true : async)
		};
		
		$("body").css("cursor", "wait");
		$.ajax(params);
	};
	
	self.getJsonDataFromServer = function(url, postData, functionToCallOnSuccess, functionToCallOnError, type, async){
		var params = {	"url": url,
						"type": type == null ? "POST" : type,
						"dataType": "json",
						"data": postData, 
						"success": function(data, textStatus, jqXHR) {
										if(functionToCallOnSuccess) {
											functionToCallOnSuccess(data, textStatus, jqXHR);
										}
										$("body").css("cursor", "default");
									},
						"error": function(data, textStatus, jqXHR) {
										if(functionToCallOnError) {
											functionToCallOnError(data, textStatus, jqXHR);
										}
									},
						"async" : (async == null ? true : async)
		};
		
		$("body").css("cursor", "wait");
		$.ajax(params);
	};
	
	
	self.getSearchAssistDataFromServer = function(url, postData, functionToCallOnSuccess, functionToCallOnError){
		var params = {	"url": url,
						"type": "POST",
						"dataType": "json",
						"data": postData, 
						"success": function(data, textStatus, jqXHR) {
										functionToCallOnSuccess(data, postData.limiter);
										$("body").css("cursor", "default");
									},
						"error": function(data, textStatus, jqXHR) {
										functionToCallOnError(postData.limiter);
									},
						"async" : true
		};
		
		$("body").css("cursor", "wait");
		$.ajax(params);
	};
}