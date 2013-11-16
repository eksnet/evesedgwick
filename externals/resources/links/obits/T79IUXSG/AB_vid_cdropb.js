(function() { 
    var setCookie = function (name, value, expires, path, domain) {
        var today = new Date();
        today.setTime(today.getTime());

        if (expires) { expires = expires * 1000 * 60 * 60 * 24; }
        var expiresDate = new Date(today.getTime() + (expires));

        var cookieStr = name + "=" + window.escape( value ) +
            ((path) ? ";path=" + path : ";path=/" ) +
            ((expires) ? ";expires=" + expiresDate.toGMTString() : "" ) +
            ((domain) ? ";domain=" + domain : ";domain=.nytimes.com" );
        document.cookie = cookieStr;
    };

    var getCookie = function (name) {
        return new RegExp(name + '=([^;]+)').test(unescape(document.cookie)) ? RegExp.$1 : null;
    };

    var abvidCookie = getCookie('abvidIntb');
    
    if(!abvidCookie) {
        var randomNum = Math.floor(Math.random() * 10); //changed from THelck original value (20) per shane
        var duration = 14;     // duration in days, 1/24 = 1 hour

        if (randomNum === 1) {       // 10% probability of this happening
            setCookie('abvidIntb', 'var1', duration);
        }    
        else if (randomNum === 2) {  // 10% probability of this happening
            setCookie('abvidIntb', 'var2', duration);
        }
        else {                       // 80% probablity of this happening
            setCookie('abvidIntb', 'control', duration);    
        }
    }

})() 