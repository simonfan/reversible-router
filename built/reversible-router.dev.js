//     reversible-rout
//     (c) simonfan
//     reversible-rout is licensed under the MIT terms.

/**
 * @module reversible-router
 */

define('reversible-router',['require','exports','module','lodash','lowercase-backbone'],function (require, exports, module) {
	

	var _ = require('lodash'),
		router = require('lowercase-backbone').router;

	var optionalParam = /\((.*?)\)/g,
		namedParam    = /(\(\?)?:\w+/g,
		splatParam    = /\*\w+/g,
		escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;




	/**
	 * Removes all weird tokens from the raw string and returns the key
	 * to be used when looking for the correspondant value.
	 *
	 * @method getKey
	 * @private
	 * @param str {String}
	 */
	function getKey(str) {
		return str.replace(/(\(|\(.*:|:|\)|\*)/g, '');
	}

	/**
	 * Formats the data into the given route string.
	 *
	 * @method formatRoute
	 * @private
	 * @param route {String}
	 * @param data {Object}
	 */
	function formatRoute(route, data) {

		// place optional named data
		route = route.replace(optionalParam, function (match) {
		//	console.log('match -> ' + match);

			var key = getKey(match);
		//	console.log('key -> ' + key);

			return data[key] ? data[key] : '';
		});

		// place named data
		route = route.replace(namedParam, function (match) {

			var key = getKey(match);

			return data[key] ? data[key] : match;
		});

		// place splat data
		route = route.replace(splatParam, function (match) {
			var key = getKey(match);

			return data[key] ? data[key] : '';
		});

		// remove optionals that were not used.
		return route.replace(optionalParam, '');
	};


	/**
	 *
	 * The arch router builder.
	 *
	 *
	 */
	var archRouter = module.exports = router.extend({
		initialize: function initialize() {
			this.initializeArchRouter.apply(this, arguments);
		},


		initializeArchRouter: function initializeArchRouter() {
			this.routeFormats = {};
		},

		/**
		 * Intercepts calls for the route method, so that
		 * we can save the route strings to a formats hash for navigation use.
		 *
		 * @method route
		 */
		route: function defineRoute(route, name, callback) {

			// save the route to the routeFormats if a name is defined
			if (_.isString(name)) {
				this.routeFormats[name] = route;
			}

			// continue normal execution
			return router.prototype.route.apply(this, arguments);
		},

		/**
		 * Intercepts the original navigate method,
		 * so that the router automatically takes advantage
		 * of format methods.
		 *
		 * @method navigate
		 * @param route|format {String|Object}
		 * @param data|options {Object}
		 * @param [options] {Object}
		 */
		navigate: function navigate(first, second, third) {
			// [1] try to get a format
			var format = this.routeFormats[first];

			if (!format) {
				// simple navigation
				return router.prototype.navigate.apply(this, arguments);
			} else {
				// build up the route
				var route = formatRoute(format, second);

				// navigate
				return router.prototype.navigate.call(this, route, third);
			}

		},
	});
});

