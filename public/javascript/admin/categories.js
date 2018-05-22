$(document).ready(function () {
    onAddNew();
    onGridSubmit();
    onGridEvents();
});

function onAddNew(){
    $("#newmenutype").submit(function( event ) {
        event.preventDefault();
        var formdata = $(this).serializeArray();
        var request = {};
        formdata.forEach(field => request[field.name] = field.value);
        request.isActive = typeof request.isActive !== 'undefined' && request.isActive !== null;

        $('.loading').show();
        $('.spinner').show();

        $.ajax({
            url: '/api/menutype',
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
        var formdata = $(this).serializeArray();
        var request = {};
        formdata.forEach(field => request[field.name] = field.value);
        request.isActive = typeof request.isActive !== 'undefined' && request.isActive !== null;

        $(this).parents('.edit-mode').hide();

        $('.loading').show();
        $('.spinner').show();

        $.ajax({
            url: '/api/menutype',
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
    $(".grid tr[id^='menutype-']").on('click', '.fa-edit', function (e) {
        e.preventDefault();
        $(this).parents("tr[id^='menutype-']").prev().show();
    });
    //On request to submit row
    $('.grid .action button').on('click', function(e) {
        $(this).parents('.edit-mode').hide();
    });
    //On request to delete row

    $(".grid tr[id^='menutype-']").on('click', '.fa-trash', function (e) {
        e.preventDefault();

        let catId = $(this).parents("tr[id^='menutype-']")[0].id;
        catId = parseInt(catId.replace('menutype-',''));

        $('.loading').show();
        $('.spinner').show();

        $.ajax({
            url: '/api/menutype',
            type: 'delete',
            data: JSON.stringify({id: catId}),
            headers: {
                "x-auth-token": localStorage.accessToken,
                "Content-Type": "application/json"
            },
            dataType: 'json',
            context: this,
            success: function (response, request) {
                $(this).parents("tr[id^='menutype-']").detach();
                $('.loading').hide();
                $('.spinner').hide();
            }
        });
       
    });
}
