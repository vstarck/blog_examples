var memoryCache = new AbstractCache();

memoryCache.install('MEMORY', {
	init: function() {
		this._memory = {};
	},
	get: function(key, opts) {
		return this._memory[key];
	},
	set: function(key, value, opts) {
		return this._memory[key] = value;
	}	
});
/*
memoryCache.set('test', 1);
memoryCache.get('test'); // 1
*/