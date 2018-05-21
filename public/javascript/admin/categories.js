$(document).ready(function () {
    onAddNew();
    onGridSubmit();
    onGridEvents();
});

function onAddNew(){
    $(".newcategory").submit(function( event ) {
        event.preventDefault();
        var formid = $(this).id;
        var formdata = $(this).serializeArray();
        var values = formdata.map(field => field.value);
        var request = {
            category_name: values[0],
            menu_type_id: values[1],
            category_description: values[2]
        };

        $('.loading').show();
        $('.spinner').show();
        $.ajax({
            url: '/api/category',
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
        var request = {
            id: values[0],
            category_name: values[1],
            menu_type_id: values[2],
            category_description: values[3],
            isActive: values.length >=5
        };
        $(this).parents('.edit-mode').hide();
        $('.loading').show();
        $('.spinner').show();
        $.ajax({
            url: '/api/category',
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
    $(".grid tr[id^='category-']").on('click', '.fa-edit', function (e) {
        e.preventDefault();
        $(this).parents("tr[id^='category-']").prev().show();
    });
    //On request to submit row
    $('.grid .action button').on('click', function(e) {
        $(this).parents('.edit-mode').hide();
    });
    //On request to delete row
    $(".grid tr[id^='category-']").on('click', '.fa-trash', function (e) {
        e.preventDefault();
        //TODO
    })
}