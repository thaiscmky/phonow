const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureGuest } = require('../helpers/auth');
var db = require("../models");


// -------- Homepage route
router.get('/', (req, res) => {
    const title = 'Pho Now Administrator Dashboard';
    res.render('./admin/index', { layout: 'main-admin', title: title });
});

// -------- sample dashboard route
router.get('/dash', (req, res) => {
    const title = 'Welcome to Pho Now!';
    res.render('./admin/dash-sample', { layout: 'main-admin', title: title });
});

// -------- Set settings
router.get('/settings', (req, res) => {
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
router.get('/categories', (req, res) => {
    const title = 'Pho Now\'s menu categories';
    //this is a temporary solution, should go in a controller or helper
    //TODO obtain information from database/model
    let settingsObj = {
        "category": {
            "list": [
                {
                    "id": 1,
                    "category_name": "Noodles",
                    "category_description": "Glutten free options available",
                    "isActive": true,
                    "createdAt": '01/01/2018 13:00:12PM',
                    "updatedAt": '01/01/2018 13:00:12PM',
                },
                {
                    "id": 2,
                    "category_name": "Rices",
                    "category_description": "You can add shrimp on any rice",
                    "isActive": false,
                    "createdAt": '01/01/2018 13:00:12PM',
                    "updatedAt": '01/01/2018 13:00:12PM',
                }
            ]
        }
    };
    res.render('./admin/categories', { layout: 'main-admin', title: title, settings: settingsObj });
});

// -------- Menu Items route
router.get('/menuitems', (req, res) => {



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
    
    var menuTypes = {};
    db.menu_type.findAll({
    }).then(function (menuTypes) {
        menuTypes = menuTypes;
        db.menu_category.findAll({
        }).then(function (categories) {
            res.render('./admin/menuitems', { layout: 'main-admin', title: title, settings: settingsObj, categories: categories, menuTypes: menuTypes });
        });
    });

});

router.post('/menuitems', (req, res) => {
    console.log(req.body);
    db.menu_items.create(req.body).then(function (data) {
        res.json(data);
    });

});

// -------- fail route
router.get('/403', (req, res) => {
    res.render('./admin/403', { layout: 'main-admin' });
});

// -------- Authorized route - dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('./admin/index', { layout: 'main-admin' });
});

module.exports = router;

