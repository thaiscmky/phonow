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
        console.log('Passed in handlebars:');
        console.log('Passed in handlebars:');
        console.log(value);
        console.log(`typeof: ${typeof value}`);
        console.log(`value: ${JSON.stringify(value, null, 2)}`);
    },
    assignJSON: function(varname, enumerableValue, context){
        this[varname] = enumerableValue;
    },
    equals: function(arg1, arg2){
        return arg1 === arg2
    }
};