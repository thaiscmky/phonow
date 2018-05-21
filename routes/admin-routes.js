const express = require('express');
const router = express.Router();
const request = require('request-promise');
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
    const querySubcats = host + '/api/subcategories';
    const queryCats = host + '/api/categories';

    let options = {"method":"GET", "uri": querySubcats, "json": true};
    request(options).then(response => {
        let categories = {
            list: response
        };
        options.uri = queryCats;
        request(options).then(response => {
            categories.menuTypes = response;
            res.render('./admin/subcategories', { layout: 'main-admin', title: title, args: categories });
        });
    }).catch(error => {
        res.render('./admin/index', { layout: 'main-admin', error: JSON.stringify(error)});
    });

});

//search category by name
router.get('/searchcategory/',ensureAuthenticated,(req, res) => {
    const title = 'Pho Now\'s menu subcategories';
    db.menu_category.findAll({where:{category_name : req.query.name}}).then((data) => {
        res.render('./admin/subcategories', { layout: 'main-admin', title: title, settings: data });

    }).catch((err) => {
        throw err
    });
  
});
// -------- Menu types route

router.get('/categories', ensureAuthenticated, (req, res) => {
    const host = 'http://'+req.headers.host;
    const title = 'Pho Now\'s menu categories';
    const queryUrl = host + '/api/categories';

    let options = {"method":"GET", "uri": queryUrl, "json": true};
    request(options).then(response => {
        let menuTypes = { list: response };
        res.render('./admin/categories', { layout: 'main-admin', title: title, args: menuTypes });
    }).catch(error => {
        res.render('./admin/index', { layout: 'main-admin', error: JSON.stringify(error)});
    });
});

// -------- Menu Items route
router.get('/menuitems', ensureAuthenticated, (req, res) => {
    const host = 'http://'+req.headers.host;
    const title = 'Pho Now\'s menu items';
    const queryItems = host + '/api/menuitems';
    const querySubcats = host + '/api/subcategories';
    const queryCats = host + '/api/categories';

    let options = {"method":"GET", "uri": queryItems, "json": true};
    request(options).then(response => {
        let menuItems = {
            list: response
        };
        options.uri = queryCats;
        request(options).then(response => {
            menuItems.menutypes = response;
            options.uri = querySubcats;
            request(options).then(response => {
                menuItems.categories = response;
                res.render('./admin/menuitems', { layout: 'main-admin', title: title, args: menuItems });
            });
        });
    }).catch(error => {
        res.render('./admin/index', { layout: 'main-admin', error: JSON.stringify(error)});
    });
});

router.get('/settings', ensureAuthenticated, (req, res) => {
    const title = 'Pho Now\'s restaurant settings';
    db.restaurant_hour.findAll({
    }).then(function (resHours) {
        res.render('./admin/settings', { layout: 'main-admin', title: title, settings: resHours});
    });
});

// ---------- Add category route
router.post('/category', ensureAuthenticated,(req, res) => {
    values = {
        "category_name": req.body.category_name,
        "category_description": req.body.category_description,
        "isActive": true
    };

    const host = 'http://'+req.headers.host;
    const title = 'Pho Now\'s menu categories';
    const queryUrl = host + '/api/categories';

    let options = {"method":"POST", "uri": queryUrl, "json": true, "body" : values};
    request(options).then(parsedBody => {
        let settings = { list: parsedBody };
         res.render('./admin/categories', { layout: 'main-admin', title: title, args: settings });
    }).catch(error => {
        //res.render('./admin/index', { layout: 'main-admin', error: JSON.stringify(error)});
        res.json(error);
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

//add resturant_hours 
router.post('/addresturanthours',ensureAuthenticated, (req, res) => {
    db.restaurant_hour.create({
        day_name: req.body.day_name,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        isActive: true
    }).then((result) => {
        //res.json(result);
    }).catch((err) => {
        throw err;
    });
});

//update resturant_hours 
router.put('/editresturanthours', ensureAuthenticated,(req, res) => {
    db.restaurant_hour.update({
        day_name: req.body.day_name,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        isActive: req.body.isActive
    }, { where: { id: req.body.id } }).then((result) => {
        //res.json(result);
    }).catch((err) => {
        throw err;
    });
});

//update categories
router.put('/editcategories/',(req, res) => {
    console.log(req.body );
    db.menu_category.update({
        category_name: req.body.name,
        category_description: req.body.discription
        // isActive: req.body.isActive
    }, { where: { id:req.body.id } }).then((result) => {
        res.json(result);
    }).catch((err) => {
        throw err;
    });

});

module.exports = router;

