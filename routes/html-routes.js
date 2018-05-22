const express = require('express');
const router = express.Router();
const db = require('../models');
const nodemailer = require('nodemailer');
const menuList = require('../public/javascript/main/dummyobjects/menuList.js');
const request = require('request-promise');

// -------- Homepage route
router.get('', (req, res) => {
    const title = 'index';
    res.render('./main/index', { title: title });
});

// --------------- Menu
router.get('/menu', (req, res) => {
    const host = 'http://' + req.headers.host;
    const title = 'menu';
    var menuJson = require('../public/javascript/main/dummyobjects/menuJson.js');

    var data = {
        menuitem: {
            list: [],
            categories: [],
            menu_types: []
        }
    };

    db.menu_items.findAll().then(function (menuItem) {
        menuItem.forEach(function (element) {
            data.menuitem.list.push(element.dataValues);
        });
    }).then(function () {
        db.menu_category.findAll().then(function (menuCategory) {
            menuCategory.forEach(function (element) {
                data.menuitem.categories.push(element.dataValues);
            });
        }).then(function () {
            db.menu_type.findAll().then(function (menuType) {
                menuType.forEach(function (element) {
                    data.menuitem.menu_types.push(element.dataValues);
                });
            }).then(function () {
                res.render('./main/menu', { title: title, menu: data });
            });
        });
    });
});

// --------------- Store Info
router.get('/about', (req, res) => {
    const host = 'http://'+req.headers.host;
    const title = 'about';
    let restaurant = {};
    const queryHours = host + '/api/resturanthours';
    const queryAddress = host + '/api/resturantaddress';
    const queryContact = host + '/api/restaurantcontact';

    let options = {"method":"GET", "uri": queryHours, "json": true};

    request(options).then(response => {
        restaurant.hours = response.success;
        options.uri = queryAddress;
        request(options).then(response => {
            restaurant.address = response.success;
            options.uri = queryContact;
            request(options).then(response => {
                restaurant.contact = response.success;
                res.render('./main/about', { title: title, hours: restaurant.hours, address: getAddress(restaurant.address), contact: (restaurant.contact) });
            });
        });
    }).catch(error => {
        res.render('./main/index', {error: JSON.stringify(error)});
    });
});

// --------------- Contact Us
router.get('/contact', (req, res) => {
    const title = 'contact';
    const host = 'http://'+req.headers.host;
    let restaurant = {};

    const queryAddress = host + '/api/resturantaddress';
    const queryContact = host + '/api/restaurantcontact';

    let options = {"method":"GET", "uri": queryAddress, "json": true};

    request(options).then(response => {
        restaurant.address = response.success;
        options.uri = queryContact;
        request(options).then(response => {
            restaurant.contact = response.success;
            res.render('./main/contact', { title: title, address: getAddress(restaurant.address), contact: getContact(restaurant.contact) });
        });
    }).catch(error => {
        res.render('./main/index', {error: JSON.stringify(error)});
    });

});

router.post('/send', (req, res) => {
    const emailContent = `
    <p>New email from Pho Now contact form</p>
    <h3>Details</h3>
    <ul>
        <li>Name: ${req.body.inputName}</li>
        <li>Email: ${req.body.inputEmail}</li>
        <li>Phone: ${req.body.inputPhone}</li>
    </ul>
    <h3>Message</h3>
        <p>${req.body.inputMessage}</p>
    `;

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        pool: true,
        secure: false,     // false, // true for 465, false for other ports
        auth: {
            user: 'PhoNowTexas@gmail.com', // generated ethereal user
            pass: 'Uyen2307', // generated ethereal password
        },
        tsl: {
            rejectUnauthorized: false
        },
        debug: false,
        logger: false
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Pho Now Restaurant" <PhoNowTexas@gmail.com>', // sender address
        to: 'PhoNowTexas@gmail.com, ', // list of receivers
        subject: 'Pho Now Email', // Subject line
        html: emailContent // html body
    };

    // verify connection configuration
    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log('Server is ready to take our messages');
        }
    });

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
    req.flash('success_msg', 'Your email has been sent.');
    res.redirect('/contact');
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

//TODO convert the bellow into API calls
//TODO correct query by passing post/put vars in the payload
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