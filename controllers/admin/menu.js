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
        let args = {};
        let menuTypes = {};
        let menuItems = {};
        let categories = {};

        let menutype = new Controller('menu_type');
        return menutype.getData().then(menuData => {
            menuTypes = menuData;
            menu.getCategories().then(categoriesData => {
                categories = categoriesData;
                menu.getItems().then(menuData => {
                    menuItems = menuData;
                    args.categories = categories;
                    args.menuTypes = menuTypes;
                    args.menuItems = menuItems;
                    return args;
                });
            });

        }).catch(err => JSON.stringify(err));
    },
    insertCategory: async (values) => {
        let category = new Controller('menu_category');
        return category.createData(values).then(categoryData => {
            return {"id": categoryData.id};
        }).catch(err => JSON.stringify(err));
    },
    updateCategory: async (id, values) => {
        let category = new Controller('menu_category');
        return category.setData(id,values).then(categoryData => categoryData)
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