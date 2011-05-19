/**
 * @author Aijoona
 */
var AbstractCache = (function() {
	function Constructor() {
		this._types = {};
	}

	Constructor.prototype.install = function(type, obj) {
		if(obj.init) {
			obj.init.call(this);
		}
	
		this._types[type] = obj;
		
		if(!this._default) {
			this._default = type;
		}
		
		return this;
	}	
	
	Constructor.prototype.get = function(key, opts) {
		opts = opts || {};
		
		var type = opts.type in this._types ? opts.type : this._default;
		
		return this._types[type].get(key, opts);
	}
	
	Constructor.prototype.aget = function(key, fn, opts) {
		opts = opts || {};
		
		var type = opts.type in this._types ? opts.type : this._default;
	}
	
	Constructor.prototype.set = function(key, value, opts) {
		opts = opts || {};
		
		var type = opts.type in this._types ? opts.type : this._default;
		
		return this._types[type].set(key, value, opts);	
	}
	
	return Constructor;
})();