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
        "geninfo": {
            "restaurant_name": "Pho Now",
            "contact_name": "Uyen Tran",
            "contact_email": "phonow@example.com",
            "address": {
                "line1": "[phonow.restaurants.address]",
                "line2": "",
                "restaurant_state": "Texas",
                "restaurant_city": "Houston",
                "restaurant_zip": "77077"
            }
        }
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

