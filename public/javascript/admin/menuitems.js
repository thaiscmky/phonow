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
        var request = {};
        formdata.forEach(field => request[field.name] = field.value);
        request.isActive = typeof request.isActive !== 'undefined' && request.isActive !== null;

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
        var formdata = $(this).serializeArray();
        var request = {};
        formdata.forEach(field => request[field.name] = field.value);
        request.isActive = typeof request.isActive !== 'undefined' && request.isActive !== null;
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
        let itemId = $(this).parents("tr[id^='menuitem-']")[0].id;
        itemId = parseInt(itemId.replace('menuitem-',''));

        $('.loading').show();
        $('.spinner').show();

        $.ajax({
            url: '/api/menuitem',
            type: 'delete',
            data: JSON.stringify({id: itemId}),
            headers: {
                "x-auth-token": localStorage.accessToken,
                "Content-Type": "application/json"
            },
            dataType: 'json',
            context: this,
            success: function (response, request) {
                $(this).parents("tr[id^='menuitem-']").detach();
            }
        });
    })
}
