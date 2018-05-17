const express = require('express');
const router = express.Router();
const db = require('../models');

// -------- Homepage route
router.get('', (req,res) => {
    const title='index';
    res.render('./main/index', {title: title });
});

// --------------- Menu
router.get('/menu', (req, res) => {
    const title='menu';
    res.render('./main/menu', {title: title });
});

// --------------- Store Info
router.get('/about', (req, res) => {
    const title='about';
    res.render('./main/about', {title: title });
});

// --------------- Contact Us
router.get('/contact', (req, res) => {
    const title='contact';
    res.render('./main/contact', {title: title});
});



//add user 
router.post('/user/:id/:fName/:lName/:email/:secGrpId',(req,res)=>{
 db.sequelize.sync().then(() => {
    db.user.create({
        user_first_name:req.params.fName,
        user_last_name:req.params.lName,
        user_email: req.params.email,
        UserSecGrpGrpCode: req.params.secGrpId,
    });
    done();
})
});


// get user
router.get('/user',(req,res)=>{
    db.sequelize.sync().then(() => {
          db.user.findAll({where:{isActive:true}}).then((user) =>{
 res.render('./admin/user', {layout:'main-admin', title: "System user", settings: user});
   });
         done();
     })
 });
// update user 
router.put('/user/:id/:fName/:lName/:email',(req,res)=>{
    db.sequelize.sync().then(() => {
          db.user.update({
             user_first_name:req.params.fName,
             user_last_name:req.params.lName,
             user_email: req.params.email,
         }, { where: { user_id:req.params.id } });
         done();
     })
 
 });

 // delete user 
 router.put('/user/:id',(req,res)=>{
    db.sequelize.sync().then(() => {
          db.user.update({
             isActive: false
         }, { where: { user_id:req.params.id } });
         done();
     })
 });

module.exports = router;