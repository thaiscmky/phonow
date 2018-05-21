console.log('LOADED: javascript/menu.js');
$('#menu-content').ready(function () {
    $('#menu-content-loader').hide();
});
$(document).ready(function () {
    $('.nav-category').on('click', function () {
        let categoryID = $(this).data('categoryname') + '';
        console.log(categoryID);
        loadMenu(categoryID);
    });
    $('#menu-content')

    var loadMenu = function (id) {
        $('.category').hide();
        $(`[data-categorytype=${id}]`).show();
    }
    // loadMenu(['1']);
});