console.log('LOADED: javascript/menu.js');
$('#menu-content').ready(function () {
    $('#menu-content-loader').hide();
});
$(document).ready(function () {
    $('.nav-category').on('click', function () {
        let categoryStr = $(this).data('categoryarr') + '';
        let categoryArr = categoryStr.split(',');
        loadMenu(categoryArr);
    });
    $('#menu-content')

    var loadMenu = function (categoryArr) {
        $('.category').hide();
        categoryArr.forEach(element => {
            $(`[data-categoryid=${element}]`).show();
        });
    }
    loadMenu(['1']);
});