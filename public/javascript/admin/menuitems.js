$(document).ready(function () {
    onAddNew();
    onGridSubmit();
    onGridEvents();
    $('.grid .action i').css('opacity','1');
});

function onAddNew(){

    $("#newmenuitem").submit(function( event ) {
        event.preventDefault();
        var formdata = $(this).serializeArray();
        var values = formdata.map(field => field.value);
        var request = {
            item_name_english: values[0],
            item_name_vietnamese: values[1],
            item_price: values[2],
            menuCategoryId: values[3],
            menuTypeId: values[4],
            item_description: values[5],
            isActive: values.length >=6
        };

        $('.loading').show();
        $('.spinner').show();

        $.ajax({
            url: '/api/menuitem',
            type: 'post',
            data: JSON.stringify(request),
            headers: {
                "x-auth-token": localStorage.accessToken,
                "Content-Type": "application/json"
            },
            dataType: 'json',
            context: this,
            success: function (response, request) {
                window.location.reload();
            }
        });
    });
}

function onGridSubmit(){
    $(".grid form").submit(function( event ) {
        event.preventDefault();
        var formid = $(this).id;
        var formdata = $(this).serializeArray();
        var values = formdata.map(field => field.value);
        console.log(values);
        var request = {
            id: values[0],
            item_name_english: values[1],
            item_name_vietnamese: values[2],
            item_price: values[3],
            menuCategoryId: values[4],
            menuTypeId: values[5],
            item_description: values[6],
            isActive: values.length >=7
        };
        $(this).parents('.edit-mode').hide();
        $('.loading').show();
        $('.spinner').show();
        $.ajax({
            url: '/api/menuitem',
            type: 'put',
            data: JSON.stringify(request),
            headers: {
                "x-auth-token": localStorage.accessToken,
                "Content-Type": "application/json"
            },
            dataType: 'json',
            context: this,
            success: function (response, request) {
                window.location.reload();
            }
        });
    });
}

function onGridEvents(){
    //On request to edit row
    $(".grid tr[id^='menuitem-']").on('click', '.fa-edit', function (e) {
        e.preventDefault();
        $(this).parents("tr[id^='menuitem-']").prev().show();
        $(this).parents("tr[id^='menuitem-']").hide();
        $('.grid .action i').css('opacity','0.2');
    });
    //On request to submit row
    $('.grid .action button').on('click', function(e) {
        $(this).parents('.edit-mode').hide();
        $("tr[id^='menuitem-']").show();
        $('.grid .action i').css('opacity','1');
    });
    //On request to delete row
    $(".grid tr[id^='menuitem-']").on('click', '.fa-trash', function (e) {
        e.preventDefault();
        //TODO
    })
}
