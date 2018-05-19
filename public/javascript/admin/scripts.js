console.log('LOADED: admin/scripts.js');
/** The purpose of this file is to serve Admin UI-wide site scripts **/
/**

 $('tr[id^="mitem-"]').on("click", ".fa-edit", showEditForm);

 function showEditForm(){
	...
	//var editForm, where edit-form contains the id from the clicked element id: mitem-{{this.id}}
	$(this).hide();
	$(editForm).show();
	$(editForm).children('input[id^="item_name-"').focus();
	...

}

 **/