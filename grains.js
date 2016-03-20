/**
 * parse string with template variables
 * @param  {string} input
 * @param  {object} tmpVars     template vars
 * @param  {function} errCallback if a template var is not defined
 * @return {string}             pased string
 */
var grains = function (input, tmpVars, errCallback) {
	var templateRegex = /\{{2,2}([^{}]*)\}{2,2}/g,// {{var}}
		/**
		 * Is given test a string or value
		 * @param  {Mixed} test
		 * @param  {string} fallback
		 * @return {string|number}
		 */
		allowedTypes = function (test, fallback) {
			return (typeof test === "string" || typeof test === "number") ? test : fallback;
		},

		/**
		 * parse string to functions
		 * @param  {string} templateValue "{{test1(test2)}}"
		 * @param  {string} functionKey   "test1(test2)"
		 * @return {string|number}
		 */
		parseVar = function (templateValue, functionKey) {
			var trimedFunctionKey = functionKey.replace( /\s/g, ''),
				stack = functionKey.replace(/\)/g, '').split(/\(/g).reverse(),
				result = '';

			stack.forEach(function (task, index) {
				switch(typeof tmpVars[task]) {
					case 'function':
						result = tmpVars[task](result);
						break;

					case 'string':
						result = tmpVars[task];
						break;

					case 'number':
						result = tmpVars[task] + '';
						break;

					case 'undefined':
						if (task.match(/\'([^]*)\'$/)) {
							result = task.replace(/\'/g, '');
						} else if (task.match(/^[\d]{1,}$/)) {
							result = task + '';
						} else {
							//result = '??' + task + '??';
							if (typeof errCallback !== 'undefined') {
								errCallback(task);
							}
						}
						break;
				}
			});

            return result;
		};

    return input.replace(templateRegex, parseVar);
};

// Export module
if (typeof exports === 'object') {
    module.exports = grains;
} else if (typeof define === 'function' && define.amd) {
    define(['grains'], grains);
} else if (typeof window === 'object') {
    window.grains = grains;
}
