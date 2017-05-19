
function mkCache(createFn) {
	var data = {};

	return {
		get: function(id) {
			if (id == null) return id;

			const value = data[id];
			if (value) return value;

			const el = createFn(id);
			data[id] = el;
			return el;
		},
		getAll: function () {
			return data;
		},
		check: function(id) {
			return data[id] !== undefined;
		},
		clear: function() {
			data = {};
		},
		remove: function(id) {
			delete data[id];
		}
	}
}

function mkCachePromise(createFn) {
	var data = {};

	return {
		get: function(id) {
			if (id == null) return Promise.resolve(id);		// allow null and undefined for id here

			const val = data[id];
			if (val) return val;

			var newVal = createFn(id);

			if (newVal != null && newVal.then) {			// check for a promise result
				data[id] = newVal;
				return newVal;
			}
			else {
				newVal = Promise.resolve(newVal);
				data[id] = newVal;
				return newVal;
			}
		},
		getAll: function () {
			return data;
		},
		check: function(id) {
			return data[id] !== undefined;
		},
		clear: function() {
			data = {};
		},
		remove: function(id) {
			delete data[id];
		}
	}
}

exports.Sync = mkCache;
exports.Async = mkCachePromise;
