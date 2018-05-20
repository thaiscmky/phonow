const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../helpers/auth');
let db = require("../models");

// -------- Homepage route
router.get('/', (req, res) => {
    const title = 'Pho Now Administrator Dashboard';
    res.render('./admin/index', { layout: 'login' });
});

// -------- Set settings
router.get('/settings', ensureAuthenticated, (req, res) => {
    const title = 'Pho Now\'s settings';
    //this is a temporary solution, should go in a controller or helper
    //TODO obtain information from database/model

    db.restaurant_hour.findAll({}).then((data) => {
        res.render('./admin/settings', { layout: 'main-admin', title: title, settings: data });

    }).catch((err) => {
        throw err
    });

});

// -------- Menu Categories route

router.get('/subcategories', ensureAuthenticated, (req, res) => {

    const title = 'Pho Now\'s menu subcategories';

    db.menu_type.findAll({
    }).then(function (menuTypes) {
        menuTypes = menuTypes;
        db.menu_category.findAll({
        }).then(function (data) {
            res.render('./admin/categories', { layout: 'main-admin', title: title, settings: data, menutypes: menuTypes });
        });

    }).catch((err) => {
        throw err
    });
});

// -------- Menu types route
// TODO data still refers to subcategories, correct it

router.get('/categories', ensureAuthenticated, (req, res) => {
    const title = 'Pho Now\'s menu categories';
    let menuTypes = {};
    db.menu_type.findAll({
    }).then(function (menuTypes) {
        res.render('./admin/menuitems', { layout: 'main-admin', title: title, settings: menuTypes });
    });
});

// -------- Menu Items route
router.get('/menuitems', ensureAuthenticated, (req, res) => {
    const title = 'Pho Now\'s menu items';
    let args = {};
    let menuTypes = {};
    let menuItems = {};
    let categories = {};

    db.menu_type.findAll({
    }).then(function (menuData) {
        menuTypes = menuData;
        db.menu_category.findAll({
        }).then(function (categoriesData) {
            categories = categoriesData;
            db.menu_items.findAll({
                where: { isActive: true },
                include: [{
                    model: db.menu_category,
                    as: 'menu_category',
                },
                {
                    model: db.menu_type,
                    as: 'menu_type',
                }
                ]

            }).then(function (menuData) {
                menuItems = menuData;
                args.categories = categories;
                args.menuTypes = menuTypes;
                args.menuItems = menuItems;
                res.render('./admin/menuitems', { layout: 'main-admin', title: title, args: args });
            });
        });
    });
});

router.post('/menuitems', ensureAuthenticated, (req, res) => {
    console.log(req.body);
    db.menu_items.create(req.body).then(function (data) {
        res.json(data);
    });
});

// update user 
router.put('/menuitems/:id', (req, res) => {
    db.sequelize.sync().then(() => {
        db.menu_items.update({
            // item_name_english: req.body.item_name_english,
            // item_name_vietnamese : req.body.item_name_vietnamese,
            // item_price = req.body.item_price,
            // menuCategoryId = req.body.menuCategoryId
           
        }, { where: { id: req.params.id } });
        done();
    })

});


// -------- fail route
router.get('/403', (req, res) => {
    res.render('./admin/403');
});

// -------- Authorized route - dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('./admin/settings', { layout: 'main-admin' });
});


//add category
router.post('/addcategory',(req,res)=>{
    console.log(req.body);
    db.menu_category.create(
        {category_name:req.body.category_name,
            category_description:req.body.category_description,
            isActive:true}
    ).catch((err)=>{
        throw err

    }).then((data)=>{
        console.log(data);
    })
});

// -------- Add item
router.get('/additem', ensureAuthenticated, (req, res) => {
    let categories = [{
        id: 1,
        category_name: "Kids"
    },
        {
            id: 2,
            category_name: "Drinks"
        }];

    let menuTypes = [{
        id: 1,
        menu_type_name: "Breakfast"
    },
        {
            id: 2,
            menu_type_name: "Lunch"
        }];

    res.render('./admin/add-item', {layout: 'main-admin', categories: categories, menuTypes: menuTypes});
});

//update categories
router.put('/editcategories', (req, res) => {
    db.menu_category.update({
        category_name: req.body.category_name,
        category_description: req.body.discription,
        isActive: req.body.isActive
    }, { where: { id: req.body.id } }).then((result) => {
        res.json(result);
    }).catch((err) => {
        throw err;
    });
});
router.get('/settings', ensureAuthenticated, (req, res) => {

    const title = 'Pho Now\'s menu categories';
    
    db.restaurant_hour.findAll({
    }).then(function (resHours) {
        res.render('./admin/settings', { layout: 'main-admin', title: title, settings: resHours});
    });
  });

//add resturant_hours 
router.post('/addresturanthours', (req, res) => {
    db.restaurant_hour.create({
        day_name: req.body.day_name,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        isActive: true
    }).then((result) => {
        res.json(result);
    }).catch((err) => {
        throw err;
    });
});

//update resturant_hours 
router.put('/editresturanthours', (req, res) => {
    db.restaurant_hour.update({
        day_name: req.body.day_name,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        isActive: req.body.isActive
    }, { where: { id: req.body.id } }).then((result) => {
        res.json(result);
    }).catch((err) => {
        throw err;
    });
});

module.exports = router;

