'use strict';

global.__basedir = __dirname;
const flash = require('connect-flash');
const methodOverride = require('method-override');
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const bodyParser = require("body-parser");
const passport = require('passport');
const path = require("path");
const app = express();
// require("./models/User");

const db=require("./models");

//pasport config
require('./config/passport')(passport);

//handlebars helpers
const {truncate,capitalize,debug,assignJSON,equals} = require('./helpers/hbs.js');

// Routes
const auth = require('./routes/auth');
const html = require('./routes/html-routes');
const admin = require('./routes/admin-routes');
app.use(express.static(path.join(__dirname,'public')));

//  ************** MIDDLEWARES ****************
// --------------------------------------------Handle-bars middleware
app.engine('handlebars', exphbs({
    helpers: {
        capitalize: capitalize,
        debug: debug,
        assignJSON: assignJSON,
        equals: equals
    },
    defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');

//bodyparser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//***************  cookieParser MIDDLEWARE *********/
app.use(cookieParser());
// -------------------------------------------- express-session middleware
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));


//***************  PASSPORT MIDDLEWARE *********/
app.use(passport.initialize());
app.use(passport.session());


// -------------------------------------------- flash middleware
app.use(flash());
// -------------------------------------------- method Override middleware
app.use(methodOverride('_method'));

//Global variables
app.use(function (req, res, next) {
    res.locals.user = req.user || null; //send me user or null
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

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
