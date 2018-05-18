const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../helpers/auth');
let db = require("../models");




// -------- Homepage route
router.get('/', ensureAuthenticated, (req,res) => {
    const title='Pho Now Administrator Dashboard';
    res.render('./admin/index', {layout:'login'});
});

// -------- Set settings
router.get('/settings', ensureAuthenticated, (req, res) => {
    const title = 'Pho Now\'s settings';
    //this is a temporary solution, should go in a controller or helper
    //TODO obtain information from database/model
    let settingsObj = {
        "general_info": {
            "restaurant_name": "Pho Now",
            "contact_name": "Uyen Tran",
            "contact_email": "phonow@example.com",
            "contact_phone": "",
            "address": {
                "line1": "phonow restaurants address",
                "line2": "",
                "restaurant_state": "Texas",
                "restaurant_city": "Houston",
                "restaurant_zip": "77077"
            },
            "editMode": true

        },
        "restaurant_hour":
            {
                "list": [
                    {
                        "id": 1,
                        "day_name": "Monday",
                        "start_time": "1:00",
                        "end_time": "1:00",
                        "isActive": true
                    },
                    {
                        "id": 2,
                        "day_name": "Tuesday",
                        "start_time": "1:00",
                        "end_time": "1:00",
                        "isActive": false
                    },
                    {
                        "id": 3,
                        "day_name": "Wednesday",
                        "start_time": "1:00",
                        "end_time": "",
                        "isActive": true
                    }
                ]
            },
        "additional": [
            { "google_maps": { "on": true, "label": "Google Maps" } },
            { "contact_form": { "on": false, "label": "Contact Us Form" } },
            { "hours_ops": { "on": true, "label": "Hours of Operation" } },
        ]
    };
    res.render('./admin/settings', { layout: 'main-admin', title: title, settings: settingsObj });
});

// -------- Menu Categories route

router.get('/categories', ensureAuthenticated, (req, res) => {

    const title = 'Pho Now\'s menu categories';
        
        db.menu_category.findAll({}).then((data)=>{
           //res.json(data);
           res.render('./admin/categories', { layout: 'main-admin', title: title, settings: data });

        }).catch((err)=>{
           throw err
});
});

// -------- Menu Items route
router.get('/menuitems', ensureAuthenticated, (req, res) => {

    const title = 'Pho Now\'s menu items';
    //this is a temporary solution, should go in a controller or helper
    //TODO obtain information from database/model
    let settingsObj = {
        "menuitem": {
            "list": [
                {
                    "id": 1,
                    "item_name_english": "Shrimp Noodles with eggs",
                    "item_name_vietnamese": "Mì tôm với trứng",
                    "item_description": "Glutten free options available. We serve with fresh eggs",
                    "item_price": 5.00,
                    "item_category": "Noodles",
                    "isActive": true,
                    "createdAt": '01/01/2018 13:00:12PM',
                    "updatedAt": '01/01/2018 13:00:12PM',
                },
                {
                    "id": 2,
                    "item_name_english": "Rice with Lo Mein",
                    "item_name_vietnamese": "Cơm với Lo Mein",
                    "item_description": "Special and seasonal fried rice and lo mein mix",
                    "item_price": 5.00,
                    "item_category": "Rice",
                    "isActive": false,
                    "createdAt": '01/01/2018 13:00:12PM',
                    "updatedAt": '01/01/2018 13:00:12PM',
                }
            ],
            "categories": [
                { "id": 1, "name": "Noodles" },
                { "id": 2, "name": "Rice" }
            ]
        }
    };


    let menuTypes = {};
    db.menu_type.findAll({
    }).then(function (menuTypes) {
        menuTypes = menuTypes;
        db.menu_category.findAll({
        }).then(function (categories) {
            res.render('./admin/menuitems', { layout: 'main-admin', title: title, settings: settingsObj, categories: categories, menuTypes: menuTypes });
        });
    });

});

router.post('/menuitems', ensureAuthenticated, (req, res) => {
    console.log(req.body);
    db.menu_items.create(req.body).then(function (data) {
        res.json(data);
    });
});

// -------- fail route
router.get('/403', (req, res) => {
    res.render('./admin/403');
});

// -------- Authorized route - dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('./admin/settings', { layout: 'main-admin' });
});


// -------- sample dashboard route ---------
router.get('/dash', (req, res) => {
    const title = 'Welcome to Pho Now!';
    res.render('./admin/dash-sample', { layout: 'main-admin', title: title });
});

//add category
router.post('/addcategory', ensureAuthenticated, (req,res)=>{
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

//update categories
router.put('/editcategories', ensureAuthenticated, (req,res)=>{
          db.menu_category.update({
            category_name:req.body.category_name,
            category_description:req.body.discription,
            isActive:req.body.isActive            
         }, { where: { id:req.body.id } }).then((result)=>{
             res.json(result);
         }).catch((err)=>{
            throw err; 
         });
 });

/*** TODO Review the following routes (may no longer be needed)
 *     - should most likely be in an api call with _ensureAuthorized_ headers
 ***/

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

    res.render('./admin/add-item', { layout: 'main-admin', categories: categories ,menuTypes:menuTypes });

});

/*** END OF TODO ***/


module.exports = router;

