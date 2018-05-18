const express = require('express');
const router = express.Router();
const db = require('../models');
const menuList = require('../public/javascript/main/dummyobjects/menuList.js');

// -------- Homepage route
router.get('', (req, res) => {
    const title = 'index';
    res.render('./main/index', { title: title });
});

// --------------- Menu
router.get('/menu', (req, res) => {
    const title = 'menu';
    // menuList needs to eventually do this through a DB call
    var menuList = require('../public/javascript/main/dummyobjects/menuList.js');
    res.render('./main/menu', { title: title, menu: menuList });
});

// --------------- Store Info
router.get('/about', (req, res) => {
    const title = 'about';
    // These are a bunch of dummy objects to be replace with real stuff later please THANKS!
    const hours = {
        monday: { open: '11:00am', close: '10:00pm' },
        tuesday: { open: '11:00am', close: '10:00pm' },
        wednesday: { open: '11:00am', close: '10:00pm' },
        thursday: { open: '11:00am', close: '10:00pm' },
        friday: { open: '11:00am', close: '11:00pm' },
        saturday: { open: '11:00am', close: '11:00pm' },
        sunday: { open: '11:00am', close: '10:00pm' }
    }
    const address = {
        fulladdress: '536 East Tidwell RD Houston, TX 77022'
    }
    const contact = {
        phone: '(713) 699-4444',
        email: 'PhoNowTexas@gmail.com'
    }
    res.render('./main/about', { title: title, hours: hours, address: address, contact: contact });
});

// --------------- Contact Us
router.get('/contact', (req, res) => {
    const title = 'contact';
    const address = {
        fulladdress: '536 East Tidwell RD Houston, TX 77022'
    }
    const contact = {
        phone: '(713) 699-4444',
        email: 'PhoNowTexas@gmail.com'
    }
    res.render('./main/contact', { title: title, address: address, contact: contact });
});



//add user 
router.post('/user/:id/:fName/:lName/:email/:secGrpId', (req, res) => {
    db.sequelize.sync().then(() => {
        db.user.create({
            user_first_name: req.params.fName,
            user_last_name: req.params.lName,
            user_email: req.params.email,
            UserSecGrpGrpCode: req.params.secGrpId,
        });
        done();
    })
});


// get user
router.get('/user', (req, res) => {
    db.sequelize.sync().then(() => {
        db.user.findAll({ where: { isActive: true } }).then((user) => {
            res.render('./admin/user', { layout: 'main-admin', title: "System user", settings: user });
        });
        done();
    })
});
// update user 
router.put('/user/:id/:fName/:lName/:email', (req, res) => {
    db.sequelize.sync().then(() => {
        db.user.update({
            user_first_name: req.params.fName,
            user_last_name: req.params.lName,
            user_email: req.params.email,
        }, { where: { user_id: req.params.id } });
        done();
    })

});

// delete user 
router.put('/user/:id', (req, res) => {
    db.sequelize.sync().then(() => {
        db.user.update({
            isActive: false
        }, { where: { user_id: req.params.id } });
        done();
    })
});

//update categories
router.put('/categories/:id/:categName/:categDescription', (req, res) => {
    db.sequelize.sync().then(() => {
        db.user.update({
            category_name: req.params.categName,
            category_description: req.params.categDescription,

        }, { where: { id: req.params.id } });
        done();
    })

});

//delete categories 

router.put('/categories/:id', (req, res) => {
    db.sequelize.sync().then(() => {
        db.menu_category.update({
            isActive: false
        }, { where: { id: req.params.id } });
        done();
    })
});

module.exports = router;