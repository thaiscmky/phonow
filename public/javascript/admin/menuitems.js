console.log('LOADED: admin/menu.js');



$(document).ready(function () {
    $(document).on("click", "#submit_newitem", handleAddMenuFormSubmit);
    $("#edititems").on("click","submit",handleUpdateMenuFormSubmit)
})

function handleUpdateMenuFormSubmit(event)
{
    console.log( $( this ).serializeArray() );
}
// A function to handle what happens when the form is submitted to create a new Author
function handleAddMenuFormSubmit(event) {
    event.preventDefault();

    var menuItem = {
        item_name_english: "",
        item_name_vietnamese: "",
        item_description: "",
        item_price: 0,
        rating: 0,
        isActive: 1,
        created_by: "",
        updatedAt: "",
        menuTypeId: 0,
        menuCategoryId: 0

    }

    // Don't do anything if the item  name fields hasn't been filled out
    if (!$("#add_name_english").val().trim().trim()) {
        return;
    }

    menuItem.item_name_english = $("#add_name_english").val();
    menuItem.item_name_vietnamese = $("#add_name_vietnamese").val();
    menuItem.item_description = $("#item_description").val();
    menuItem.item_price = $("#add_price").val();
    //menuItem.rating = $("#item_rating").val();
    menuItem.isActive = 1;
    menuItem.menuTypeId = $("#add_menutype option:selected").val();
    menuItem.menuCategoryId = $("#add_category option:selected").val();
  
    addMenu( menuItem);
}


 
  function addMenu(menuItem) {
    $.post("/admin/menuitems",menuItem);
      
  }