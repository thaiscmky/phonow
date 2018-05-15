const express = require('express');
const router = express.Router();
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

// -------- Homepage route
router.get('/', (req,res) => {
    const title='Pho Now Administrator Dashboard';
    res.render('./admin/index', {layout:'main-admin',title: title });
});

// -------- sample dashboard route
router.get('/dash', (req,res) => {
    const title='Welcome to Pho Now!';
    res.render('./admin/dash-sample', {layout:'main-admin',title: title });
});

// -------- Set settings
router.get('/settings', (req,res) => {
    const title='Pho Now\'s settings';
    //this is a temporary solution, should go in a controller or helper
    //TODO obtain information from database/model
    var settingsObj = {
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
            }
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
            {"google_maps": {"on": true, "label": "Google Maps"} },
            {"contact_form": {"on": false, "label": "Contact Us Form"} },
            {"hours_ops": {"on": true, "label": "Hours of Operation"} },
        ]
    };
    res.render('./admin/settings', {layout:'main-admin', title: title, settings: settingsObj});
});

// -------- Add category
router.get('/addcategories', (req,res) => {
    res.render('./admin/add-categ', {layout:'main-admin'});
});

// -------- Add item
router.get('/additem', (req,res) => {
    res.render('./admin/add-item', {layout:'main-admin'});
});

// -------- fail route
router.get('/403', (req,res) => {
    res.render('./admin/403', {layout:'main-admin'});
});

// -------- Authorized route - dashboard
router.get('/dashboard',ensureAuthenticated, (req,res) => {
    res.render('./admin/index', {layout:'main-admin'});
});

module.exports = router;

