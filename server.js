'use strict';

//var routes = require("./controllers/burgers_controller");
const flash = require('connect-flash');
const methodOverride = require('method-override');
const express = require("express");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const bodyParser = require("body-parser");
const passport = require('passport');
const path = require("path");
const app = express();
const db=require("./models");


//pasport config
require('./config/passport')(passport);

//handlebars helpers
const hbshelpers = require('./helpers/hbs.js');
const capitalize = hbshelpers.capitalize;
const debug = hbshelpers.debug;
// Routes
const auth = require('./routes/auth');
const html = require('./routes/html-routes');
const admin = require('./routes/admin-routes');
app.use(express.static(path.join(__dirname,'./public')));

//bodyparser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//  ************** MIDDLEWARES ****************
// --------------------------------------------Handle-bars middleware
app.engine('handlebars', exphbs({
    helpers: {
        capitalize: capitalize,
        debug: debug
    },
    defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');

//***************  PASSPORT MIDDLEWARE *********/
app.use(passport.initialize());
app.use(passport.session());

//***************  cookieParser MIDDLEWARE *********/
app.use(cookieParser());
//***************  session MIDDLEWARE *********/
app.use(session(
    {
        secret: 'secret',
        resave: false,
        saveUninitialized: false
    })
);

// -------------------------------------------- flash middleware
app.use(flash());
// -------------------------------------------- method Override middleware
app.use(methodOverride('_method'));
// -------------------------------------------- express-session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//Global variables
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null; //send me user or null
    next();
});

// Static directory
app.use(express.static(path.join(__dirname, 'public')));

// Use route
app.use('/auth', auth);
app.use('/', html);
app.use('/admin', admin);


const PORT = process.env.PORT || 3000;
// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});
