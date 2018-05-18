console.log('LOADED: javascript/menu.js');
$(document).ready(function () {
    $('.nav-category').on('click', function () {
        let category = $(this).data('category');
        loadMenu(category);
    });

    var loadMenu = function (categoryID) {
        switch (categoryID) {
            case '1': break;
            case '2': break;
            case '3': break;
            case '4': break;
            case '5': break;
            case '6': break;
            case '7': break;
            case '8': break;
        }
    }
});