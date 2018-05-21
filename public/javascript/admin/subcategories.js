console.log('LOADED: admin/menu.js');

$(document).ready(function () {
    $(document).on("click", "#menuItem-form", handleAddMenuFormSubmit);
});

// A function to handle what happens when the form is submitted to create a new Author
function handleAddMenuFormSubmit(event) {
    event.preventDefault();

    var newCategory = {
        category_name: "",
        category_description: "",
        isActive: true,
    }

    // Don't do anything if the item  name fields hasn't been filled out
    if (!$("#item_name_english").val().trim().trim()) {
        return;
    }

    menuItem.item_name_english = $("#item_name_english").val();
    menuItem.item_name_vietnamese = $("#item_name_vietnamese").val();
    menuItem.item_description = $("#item_description").val();
  
    addCategory( newCategory);
}


 
  function addCategory(newCategory) {
    $.post("/api/newCategory",newCategory);
      
  }