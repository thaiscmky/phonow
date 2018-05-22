$(document).ready(function () {
    onAddNew();
    onGridSubmit();
    onGridEvents();
});

function onAddNew(){
    $("#newcategory").submit(function( event ) {
        event.preventDefault();
        var formdata = $(this).serializeArray();
        var request = {};
        formdata.forEach(field => request[field.name] = field.value);
        request.isActive = typeof request.isActive !== 'undefined' && request.isActive !== null;

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
        var formdata = $(this).serializeArray();
        var request = {};
        formdata.forEach(field => request[field.name] = field.value);
        request.isActive = typeof request.isActive !== 'undefined' && request.isActive !== null;
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
        $(this).parents("tr[id^='category-']").hide();
        $('.grid .action i').css('opacity','0.2');
    });
    //On request to submit row
    $('.grid .action button').on('click', function(e) {
        $(this).parents('.edit-mode').hide();
        $("tr[id^='category-']").show();
        $('.grid .action i').css('opacity','1');
    });
    //On request to delete row
    $(".grid tr[id^='category-']").on('click', '.fa-trash', function (event) {
        event.preventDefault();
        let catId = $(this).parents("tr[id^='category-']")[0].id;
        catId = parseInt(catId.replace('category-',''));

        $('.loading').show();
        $('.spinner').show();

        $.ajax({
            url: '/api/category',
            type: 'delete',
            data: JSON.stringify({id: catId}),
            headers: {
                "x-auth-token": localStorage.accessToken,
                "Content-Type": "application/json"
            },
            dataType: 'json',
            context: this,
            success: function (response, request) {
                $(this).parents("tr[id^='category-']").detach();
                $('.loading').hide();
                $('.spinner').hide();
            }
        });
    })
}
