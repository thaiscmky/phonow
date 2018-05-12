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
    }
};