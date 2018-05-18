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
 
    db.user.create({
        user_first_name:req.params.fName,
        user_last_name:req.params.lName,
        user_email: req.params.email,
        UserSecGrpGrpCode: req.params.secGrpId,
    }).then((err)=>{
        throw err ;
    });
});


// get user
router.get('/user',(req,res)=>{
   db.user.findAll({where:{isActive:true}}).then((user) =>{
 res.render('./admin/user', {layout:'main-admin', title: "System user", settings: user});
   }).then((err)=>{
   throw err ;
   });
 });
// update user 
router.put('/user/:id/:fName/:lName/:email',(req,res)=>{
          db.user.update({
             user_first_name:req.params.fName,
             user_last_name:req.params.lName,
             user_email: req.params.email,
         }, { where: { user_id:req.params.id } }).then((err) =>{
             throw err ;
         });
 });

 // delete user 
 router.put('/user/:id',(req,res)=>{
          db.user.update({
             isActive: false
         }, { where: { user_id:req.params.id } }),then((err)=>{
             throw err
         });
 });

//update categories
router.put('/categories/:id/:categName/:categDescription',(req,res)=>{
          db.menu_category.update({
            category_name:req.params.categName,
            category_description:req.params.categDescription,
         }, { where: { id:req.params.id } }).then((err)=>{
             throw err
         });
 });

 //delete categories 

 router.put('/categories/:id',(req,res)=>{
    
          db.menu_category.update({
             isActive: false
         }, { where: { id:req.params.id } }).then((err)=>{
             throw err
         });
         
 });

 
module.exports = router;