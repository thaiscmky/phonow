var express=require("express");
var bodyParser=require("body-parser");
var handlbar=require("express-handlebars");
//var routes = require("./controllers/burgers_controller");
var path=require("path");

var app=express();
app.use(express.static(path.join(__dirname,'./public')));

var PORT=process.env.PORT || 3001
//bodyparser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//handelbars
app.engine("handlebars",handlbar({defaultLayout:"main"}));
app.set("view engine","handlebars");
//router
// app.use('/',routes);

//start server
 var db=require("./models")
   db.contact.sequelize.sync();
  //db.customer.sequelize.sync();
  //db.burger.sequelize.sync({force:true});
// .then(function(){
 
    console.log("sync database")
    app.listen(PORT,function(){
        console.log("server start " + PORT)
    })
// })


