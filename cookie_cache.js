var cookieCache = new AbstractCache();

cookieCache.install('COOKIE', {
	init: function() {
	},
	get: function(key, opts) {
        var search = document.cookie.match(
            '(?:^|;)\\s*' + key.replace(/([-.*+?^${}()|[\]\/\\])/g, '\\$1') + '=([^;]*)'
        );

        return search ? decodeURIComponent(search[1]) : null;
	},
	set: function(key, value, opts) { 
		var cookie, date;
		
        opts = opts || {};

        var cookie = key + '=' + encodeURIComponent(value);

        if (opts.time) {
            date = new Date;
            date.setTime( +date + ( opts.time * 1000 ) );

            cookie += '; expires=' + date.toGMTString();
        }

		document.cookie = cookie;
        return this;
	}	
});

cookieCache.set('test', 1);
console.log(cookieCache.get('test'));