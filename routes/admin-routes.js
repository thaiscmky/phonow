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
    const title = 'Pho Now Administrator Dashboard';
    const host = 'http://'+req.headers.host;
    let restaurant = {};
    let count = {};
    const queryHours = host + '/api/resturanthours';
    const queryAddress = host + '/api/resturantaddress';
    const queryContact = host + '/api/restaurantcontact';
    const queryItems = host + '/api/menuitems';
    const queryCats = host + '/api/categories';

    let options = {"method":"GET", "uri": queryHours, "json": true};

    request(options).then(response => {
        restaurant.hours = response.success;
        options.uri = queryAddress;
        request(options).then(response => {
            restaurant.address = response.success;
            options.uri = queryContact;
            request(options).then(response => {
                restaurant.contact = response.success;
                options.uri = queryItems;
                request(options).then(response => {
                    count.items = response.success;
                    options.uri = queryCats;
                    request(options).then(response => {
                        count.cats = response.success;
                        //render here
                        res.render('./admin/index', { layout: 'main-admin',
                            title: title,
                            hours: restaurant.hours,
                            address: getAddress(restaurant.address),
                            contact: getContact(restaurant.contact),
                            count: count
                        });
                    });
                });
            });
        });
    }).catch(error => {
        res.render('./admin/index', { layout: 'main-admin', error: JSON.stringify(error)});
    });
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

//TODO refactor helper functions
// Tay's Helper functions
var getAddress = (ormData) => {
    let data = ormData[0];
    return { fulladdress: `${data.address} ${data.resturant_city}, ${data.restaurant_state} ${data.restaurant_zip}` };
}

var getContact = (ormData) => {
    let data = ormData[0];
    // This line below reformats the phone number to correct format. If something is breaking it's probably the line below
    data.contact_phone1 = `(${data.contact_phone1.substr(0, 3)}) ${data.contact_phone1.substr(3, 3)}-${data.contact_phone1.substr(6)}`;
    return { phone: `${data.contact_phone1}`, email: `${data.contact_email}` };
}

var getHours = (ormData) => {
    let fullobject = {}
    ormData.forEach(function (element) {
        for (var key in element) {
            fullobject[element.day_name] = {};
        }
    });
    for (var key in fullobject) {
        ormData.forEach(function (element) {
            if (key === element.day_name) {
                fullobject[key].open = element.start_time;
                fullobject[key].close = element.end_time;
            }
        })
    }
    return fullobject
};

module.exports = router;

