console.log('LOADED: admin/menu.js');



$(document).ready(function () {
    $(document).on("click", "#menuItem-form", handleAddMenuFormSubmit);
})

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
    if (!$("#item_name_english").val().trim().trim()) {
        return;
    }

    menuItem.item_name_english = $("#item_name_english").val();
    menuItem.item_name_vietnamese = $("#item_name_vietnamese").val();
    menuItem.item_description = $("#item_description").val();
    menuItem.item_price = $("#item_price").val();
    menuItem.rating = $("#item_rating").val();
    menuItem.isActive = 1;
    menuItem.menuTypeId = $("#optionMenuType option:selected").val();
    menuItem.menuCategoryId = $("#optionMenuCategory option:selected").val();
  
    addMenu( menuItem);
}


 
  function addMenu(menuItem) {
    $.post("/admin/menuitems",menuItem);
      
  }