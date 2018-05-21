$(document).ready(function () {

    
    $("#submit_newcategory").on('click', function () {
        if($("#add_name").val() === "" && $("#add_description").val() ===""){
            alert("insert category name or category description");
            return;
        }
    });

    $(".btn").on('click', function () {
        
        var updateData = new Object();
        updateData.id = $(this).val();

        if($("#category_name-" + updateData.id).val() === "" && $("#category_description-" + updateData.id).val() ===""){
            alert("insert category name or category description");
            return;
        }
        else{
        updateData.name = $("#category_name-" + updateData.id).val();
        updateData.discription = $("#category_description-" + updateData.id).val();
        }
        $.ajax("/admin/editcategories/", {
            contentType: 'application/json',
            data: JSON.stringify(updateData),
            dataType: 'json',
            success: function (data) {

                console.log("request made and response is " + data);
            },
            error: function () {

                console.log("error while making request");
            },
            type: 'PUT'

        }).then(

            function () {

                console.log("Updated id ", id);
            });
        location.reload();
    });

    $(".btn-search").on('click', function () {
        let searchData = {};
        searchData.name = $("#search-term").val();
        $.ajax("/admin/searchcategory/", {
            type: "GET",
            data: searchData,
        })
    })
//load data
    $.ajax("/admin/subcategories/", {
        type: "GET",
    });



    //show and hide 

    $("tr[id^='category-'").on('click', '.fa-edit', function () {
        console.log('hi');
        var id = $(this).val();
        $("#edit-category-" + id).show();
        $("#category-" + id).hide();
    });
    $(".fa-trash ").on('click', function () {
        var id = $(this).val();

        $("#edit-category-" + id).show();
        $("#category-" + id).hide();


    })

});










