const express = require('express');
const router = express.Router();
const request = require('request');
const path = require('path');
const { ensureAuthenticated } = require('../helpers/auth');
let db = require("../models");


// -------- Homepage route
router.get('/', (req, res) => {
    const title = 'Pho Now Administrator Dashboard';
    res.render('./admin/index', { layout: 'login' });
});

// -------- Menu Categories route

router.get('/subcategories', ensureAuthenticated, (req, res) => {
    const host = 'http://'+req.headers.host;
    const title = 'Pho Now\'s menu subcategories';
    const queryUrl = host + '/subcategories';

    request(queryUrl, (error, response, body) => {
        if (!error) {
            const menutypes = {}; //TODO review
            res.render('./admin/subcategories', { layout: 'main-admin', title: title, settings: body, menutypes: menuTypes });
        } else {
            res.render('./admin/index', { layout: 'main-admin', error: JSON.stringify(error)});
        }
    });

});

// -------- Menu types route
// TODO review

router.get('/categories', ensureAuthenticated, (req, res) => {
    const host = 'http://'+req.headers.host;
    const title = 'Pho Now\'s menu categories';
    const queryUrl = host + '/categories';

    request(queryUrl, (error, response, body) => {
        if (!error) {
            res.render('./admin/categories', { layout: 'main-admin', title: title, settings: body });
        } else {
            res.render('./admin/index', { layout: 'main-admin', error: JSON.stringify(error)});
        }
    });
});

// -------- Menu Items route
router.get('/menuitems', ensureAuthenticated, (req, res) => {
    const host = 'http://'+req.headers.host;
    const title = 'Pho Now\'s menu items';
    const queryUrl = host + '/api/menuitems';
    request(queryUrl, (error, response, body) => {
        if (!error) {
            let menuTypes = {}; //TODO review
            let categories = {}; //TODO review
            res.render('./admin/menuitems', { layout: 'main-admin', title: title, args: body });
        } else {
            req.session['error'] = JSON.stringify(error);
            res.redirect('./dashboard');
        }
    });
});

router.get('/settings', ensureAuthenticated, (req, res) => {

    const title = 'Pho Now\'s restaurant settings';

    db.restaurant_hour.findAll({
    }).then(function (resHours) {
        res.render('./admin/settings', { layout: 'main-admin', title: title, settings: resHours});
    });
});

// -------- fail route
router.get('/403', (req, res) => {
    res.render('./admin/403');
});

// -------- Authorized route - dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('./admin/index', { layout: 'main-admin' });
});

// -------- Authorized route - dashboard
router.get('/dash',ensureAuthenticated, (req, res) => {
    res.render('./admin/dash-sample', { layout: 'main-admin' });
});


//TODO review other routes


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
router.post('/additem', ensureAuthenticated, (req, res) => {
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

