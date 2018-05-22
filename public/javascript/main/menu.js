console.log('LOADED: javascript/menu.js');
$('#menu-content').ready(function () {
    $('#menu-content-loader').hide();
});
$(document).ready(function () {
    $('.nav-category').on('click', function () {
        let menuID = $(this).data('menuid') + '';
        console.log(menuID);
        loadMenu(menuID);
    });
    $('#menu-content')

    var loadMenu = function (menuID) {
        console.log(menuID);
        $('.category').hide();
        $(`[data-categorytype=${menuID}]`).show();
    }
    // loadMenu(['1']);
});

// $.ajax('/api/subcategories/', {
//     type: 'GET',
// }).then(function (asdf) {
//     console.log(asdf);
//     res.render('./main/menu', { title: title, menu: menuJson, data: asdf });
// });