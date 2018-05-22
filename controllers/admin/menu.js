"use strict";
let Controller = require('./baseController.js');

let menu = {
    getCategories: async () => {
        let category = new Controller('menu_category');
        return category.getData().then(data => data)
            .catch(err => JSON.stringify(err));
    },
    getItems: async () => {
        let item = new Controller('menu_items');
        return item.getData().then(data => data)
            .catch(err => JSON.stringify(err));
    },
    getMenuTypes: async () => {
        let menutype = new Controller('menu_type');
        return menutype.getData().then(data => data)
            .catch(err => JSON.stringify(err));
    },
    insertCategory: async (values) => {
        let category = new Controller('menu_category');
        return category.createData(values).then(categoryData => categoryData).catch(err => JSON.stringify(err));
    },
    insertMenuType: async (values) => {
        let type = new Controller('menu_type');
        return type.createData(values).then(typeData => typeData).catch(err => JSON.stringify(err));
    },
    updateCategory: async (id, values) => {
        let category = new Controller('menu_category');
        return category.setData(id,values).then(categoryData => JSON.stringify(categoryData))
            .catch(err => JSON.stringify(err));
    },
    updateMenuType: async (id, values) => {
        let menutype = new Controller('menu_type');
        return menutype.setData(id,values).then(menutypeData => JSON.stringify(menutypeData))
            .catch(err => JSON.stringify(err));
    },
    updateMenuItem: async (id, values) => {
        let item = new Controller('menu_items');
        return item.setData(id,values).then(data => data)
            .catch(err => JSON.stringify(err));
    },
    /**
     * TODO delete operations
     */
};

module.exports = menu;