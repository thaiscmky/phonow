const Nightmare = require('nightmare');
const assert = require('assert');
const db = require('../models');
// const Sequelize = require('sequelize');
const mocha = require('mocha');
const domain = process.env.HEROKU_APP_SERVER || 'http://localhost:' + (process.env.PORT || 3000)

// db.Sequelize = Sequelize;
describe('Load a Page', function () {
    // Recommended: 5s locally, 10s to remote server, 30s from airplane ¯\_(ツ)_/¯
    this.timeout('5s');

    let nightmare = null;
    beforeEach(() => {
        nightmare = new Nightmare();
    });

    describe('/ (Home Page)', () => {
        it('should load without error', done => {
            nightmare.goto(domain + '/')
                .end()
                .then(function (result) {
                    done();
                })
                .catch(done);
        });
    });

    describe('/ (Menu Page)', () => {
        it('should load without error', done => {
            nightmare.goto(domain + '/menu')
                .end()
                .then(function (result) {
                    done();
                })
                .catch(done);
        });
    });

    describe('/ (Store Info Page)', () => {
        it('should load without error', done => {
            nightmare.goto(domain + '/about')
                .end()
                .then(function (result) {
                    done();
                })
                .catch(done);
        });
    });

    describe('/ (Contact Page)', () => {
        it('should load without error', done => {
            nightmare.goto(domain + '/contact')
                .end()
                .then(function (result) {
                    done();
                })
                .catch(done);
        });
    });

    describe('/ (Admin Home Page)', () => {
        it('should load without error', done => {
            nightmare.goto(domain + '/admin')
                .end()
                .then(function (result) {
                    done();
                })
                .catch(done);
        });
    });

    describe('/ (ADMIN: Add categories Page)', () => {
        it('should load without error', done => {
            nightmare.goto(domain + '/admin/addcategories')
                .end()
                .then(function (result) {
                    done();
                })
                .catch(done);
        });
    });

    describe('/ (ADMIN: Add item Page)', () => {
        it('should load without error', done => {
            nightmare.goto(domain + '/admin/additem')
                .end()
                .then(function (result) {
                    done();
                })
                .catch(done);
        });
    });

    describe('/ (ADMIN: Dashboard)', () => {
        it('should load without error', done => {
            nightmare.goto(domain + '/admin/dashboard')
                .end()
                .then(function (result) {
                    done();
                })
                .catch(done);
        });
    });

    describe('/ (ADMIN: site page to edit content)', () => {
        it('should load without error', done => {
            nightmare.goto(domain + '/admin/editcontent')
                .end()
                .then(function (result) {
                    done();
                })
                .catch(done);
        });
    });

    describe('/ (ADMIN: site page home page)', () => {
        it('should load without error', done => {
            nightmare.goto(domain + '/admin/sitehomepage')
                .end()
                .then(function (result) {
                    done();
                })
                .catch(done);
        });
    });

    describe('/ (ADMIN: Landing page for adding items)', () => {
        it('should load without error', done => {
            nightmare.goto(domain + '/admin/addingitems')
                .end()
                .then(function (result) {
                    done();
                })
                .catch(done);
        });
    });


    // DB create test
    var newRestaurant = { restaurant_name: "phonow", restaurant_state: "Houston" };
    var newUserSecGrps = { grp_code: "admin", grp_name: "administrator" }
    var newMenuType = { MenuType_name: "lunch", MenuType_description: "food for lunch" }
    var newMenuCategory = { category_name: "beef noodle soup", category_description: "so yummy" }
    var newRestaurantHour = { day_name: "Monday", start_time: "8:00 am", end_time: "6:30 pm", restaurantId: 1 }
    var newUser = { user_first_name: "Yewbdar", user_last_name: "Abera", user_email: "you@me.com", UserSecGrpGrpCode: "admin" }
    var newMenuItems = { item_name_english: "food", item_name_vietnamese: "vihsueksenje", item_price: "10.00", menuTypeId: 1, menuCategoryId: 1 }
    var newRestContact = {
        social_contact: "facebook/phnow", contact_email: "phonow@gmail.com", contact_phone1: "123123123",
        restaurantId: 1
    }
    creatTable(db.restaurant, newRestaurant, "Restaurant");
    creatTable(db.User_sec_grp, newUserSecGrps, "UserSecGrps");
    creatTable(db.menu_type, newMenuType, "MenuType");
    creatTable(db.menu_category, newMenuCategory, "MenuCategory");
    creatTable(db.restaurant_hour, newRestaurantHour, "RestaurantHour");
    creatTable(db.user, newUser, "User");
    creatTable(db.menu_items, newMenuItems, "MenuItems");

    creatTable(db.restaurant_contact, newRestContact, "RestContact");

    function creatTable(table, data, title) {

        describe('/ (SEQUELIZE : CRUD - CREATE ' + title + ')', () => {
            it('It should create' + title + 'table', function () {

                return db.sequelize.sync().then(() => {
                    return table.create(
                        data
                    ).then(() => { console.log('data created') }).
                        catch(err => { console.log(err) });
                    done();
                })
            })
        });
    }

    // DB update test

    var updateRestaurant = [{ restaurant_name: "new phonow", restaurant_state: "NY" }, { id: 1 }];
    var updateUserSecGrps = [{ grp_code: "admin", grp_name: "system admin" }, { grp_code: "admin" }]
    var updateMenuType = [{ MenuType_name: "dinner", MenuType_description: "food for dinner" }, { id: 1 }]
    var updateMenuCategory = [{ category_name: "beef soup", category_description: "so yummy" }, { id: 1 }]
    var updateRestaurantHour = [{ day_name: "sunday", start_time: "8:00 am", end_time: "6:00 pm", restaurantId: 1 }, { id: 1 }]
    var updateUser = [{ user_first_name: "Thais", user_last_name: "", user_email: "you@me.com", UserSecGrpGrpCode: "admin" }, { user_id: 1 }]
    var updateMenuItems = [{ item_name_english: "goodfood", item_name_vietnamese: "vihsueksenje", item_price: "10.00", menuTypeId: 1, menuCategoryId: 1 }, { id: 1 }]
    var updateRestContact = [{
        social_contact: "facebook/phnow", contact_email: "phonow@gmail.com", contact_phone1: "444666555",
        restaurantId: 1
    }, { id: 1 }]
    updateTable(db.restaurant, updateRestaurant, "Restaurant");
    updateTable(db.User_sec_grp, updateUserSecGrps, "UserSecGrps");
    updateTable(db.menu_type, updateMenuType, "MenuType");
    updateTable(db.menu_category, updateMenuCategory, "MenuCategory");
    updateTable(db.restaurant_hour, updateRestaurantHour, "RestaurantHour");
    updateTable(db.user, updateUser, "User");
    updateTable(db.menu_items, updateMenuItems, "MenuItems");

    updateTable(db.restaurant_contact, updateRestContact, "RestContact");

    function updateTable(table, data, title) {
        describe('/ (SEQUELIZE : CRUD - update ' + title + ' )', () => {
            it('It should update ' + title + 'table', function () {
                return db.sequelize.sync().then(() => {
                    return table.update(data[0], { where: data[1] });
                    done();
                })
            })
        });
    }

});
