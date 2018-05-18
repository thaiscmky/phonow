module.exports = {
    truncate: function(str, len) {
        if (str.length > len) {
            const newStr = str.substring(0, len - 3); // Cuts off three extra characters for "..."
            return `${newStr}...`;
        }
        return str;
    },
    capitalize: function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    debug: function(value, context){
        console.log(`TYPEOF ${typeof value}`);
        console.log(`VALUE ${JSON.stringify(value, null, 2)}`);
    },
    assignJSON: function (varname, enumerableValue, context) {
        this[varname] = enumerableValue;
    },
    /**
     * Checks if two arguments are identical
     * @param mix
     * @param mix
     * @returns {boolean}
     */
    equals: function(arg1, arg2){
        return arg1 === arg2;
    },
    /**
     * If two elements are identical, return the elements, else return nothing
     * @param mix
     * @param mix
     * @param options
     * @returns {*}
     */
    returnSelf: function (arg1, arg2, options) {
        if (arg1 === arg2) {
            return options.fn(this);
        }
        return options.inverse(this);
    },
};