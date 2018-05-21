$(document).ready(function () {

    onGridSubmit();
    onGridEvents();
});

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
    $(".grid tr[id^='category-']").on('click', '.fa-edit', function (e) {
        e.preventDefault();
        $(this).parents("tr[id^='category-']").prev().show();
    });

    $('.grid .action button').on('click', function(e) {
        $(this).parents('.edit-mode').hide();
    });

    $(".grid tr[id^='category-']").on('click', '.fa-trash', function (e) {
        e.preventDefault();
    })
}
