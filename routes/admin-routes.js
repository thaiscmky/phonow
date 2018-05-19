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
        res.json(data);
        res.render('./admin/settings', { layout: 'main-admin', title: title, settings: data });

    }).catch((err) => {
        throw err
    });

});

// -------- Menu Categories route

router.get('/subcategories', ensureAuthenticated, (req, res) => {

    const title = 'Pho Now\'s menu subcategories';

    // db.menu_type.findAll({
    // }).then(function (menuTypes) {
    //     menuTypes = menuTypes;
    //     db.menu_category.findAll({
    //     }).then(function (data) {
    //       res.render('./admin/categories', { layout: 'main-admin', title: title, settings: data, menutypes: menuTypes });
    //     });
    // }).catch((err)=>{
    //            throw err
    // });
    db.menu_category.findAll({}).then((data) => {
        res.json(data);
         res.render('./admin/categories', { layout: 'main-admin', title: title, settings: data });

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
      res.render('./admin/menuitems', { layout: 'main-admin', title: title, settings: menuTypes});
  });
});

// -------- Menu Items route
router.get('/menuitems', ensureAuthenticated, (req, res) => {

    const title = 'Pho Now\'s menu items';


    var menuTypes = {};
    db.menu_type.findAll({
    }).then(function (menuTypes) {
        menuTypes = menuTypes;
        db.menu_category.findAll({
        }).then(function (categories) {
          categories = categories;
           db.menu_items.findAll({
            }).then(function (menuitems) {
                res.render('./admin/menuitems', { layout: 'main-admin', title: title, settings: menuitems, categories: categories, menuTypes: menuTypes });
            });
        });
    });
});

/*router.post('/menuitems', ensureAuthenticated, (req, res) => {
    console.log(req.body);
    db.menu_items.create(req.body).then(function (data) {
        res.json(data);
    });
});*/

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


//add categore
router.post('/addcategory', (req, res) => {
    console.log(req.body);
    db.menu_category.create(
        {
            category_name: req.body.category_name,
            category_description: req.body.category_description,
            isActive: true
        }
    ).catch((err) => {
        throw err

    }).then((data) => {
        console.log(data);
    })
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

