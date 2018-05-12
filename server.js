const flash = require('connect-flash');
const methodOverride = require('method-override');
const express = require("express");
const session = require('express-session');
const exphbs = require('express-handlebars');
const bodyParser = require("body-parser");
const path = require("path");

var app = express();

//handlebars helpers
const {
    capitalize
} = require('./helpers/hbs.js');

// Routes
const html = require('./routes/html-routes');
const admin = require('./routes/admin-routes');

// Requiring our models for syncing
var db = require("./models");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//  ************** MIDDLEWARES ****************
// --------------------------------------------Handle-bars middleware
app.engine('handlebars', exphbs({
    helpers: {
        capitalize: capitalize
    },
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

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
app.use('/', html);
app.use('/admin', admin);


var PORT = process.env.PORT || 3000;
// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});
