const path = require('path');
const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require(path.join(__basedir,'/helpers/auth'));
const menuController = require(path.join(__basedir,'/controllers/admin/menu.js'));
const restaurantController = require(path.join(__basedir,'/controllers/admin/restaurant.js'));
const userController = require(path.join(__basedir,'/controllers/admin/user.js'));

    /**
     * Get routes
     */
    router.get('/menuitems', (req, res) => {
        menuController.getItems().then( data => {
            res.json({'success': data});
        }).catch((err)=>{
            res.json({'error': err});
        });
    });

    router.get('/subcategories', (req, res) => {
        menuController.getCategories().then( data => {
            res.json({'success': data});
        }).catch((err)=>{
            res.json({'error': err});
        });
    });

    router.get('/categories', (req, res) => {
        menuController.getMenuTypes().then( data => {
            res.json({'success': data});
        }).catch((err)=>{
            res.json({'error': err});
        });
    });

    router.get('/getresturanthours', (req, res) => {
        restaurantController.getBusinessHours().then( data => {
            res.json({'success': data});
        }).catch((err)=>{
            res.json({'error': err});
        });
    });

    /**
     * Post routes
     */
    router.post('/addcategory', ensureAuthenticated, (req,res)=>{
        let insert = {
            category_name: req.body.category_name,
            category_description:req.body.category_description,
            isActive:true
        };

        //request store settings via ORM, pass the insert values
        a.then( data => {
            res.json({'success': data});
        }).catch((err)=>{
            res.json({'error': err});
        });
    });

    router.post('/addresturanthours', ensureAuthenticated, (req,res)=>{
        let insert = {
            day_name: req.body.day_name,
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            isActive: true
        };
        //request store settings via ORM, pass the update values
        a.then( data => {
            res.json({'success': data});
        }).catch((err)=>{
            res.json({'error': err});
        });
    });

    /**
     * Put routes
     */

    router.put('/editcategories', (req, res) => {
        let update = {
            category_name: req.body.category_name,
            category_description: req.body.discription,
            isActive: req.body.isActive
        };

        // where: { id: req.body.id }

        //request store settings via ORM, pass the update values
        a.then( data => {
            res.json({'success': data});
        }).catch((err)=>{
            res.json({'error': err});
        });

    });

    router.put('/editmenuitem', (req, res) => {
        let update = {
            item_name_english: req.body.item_name_english,
            item_name_vietnamese : req.body.item_name_vietnamese,
            item_price: req.body.item_price,
            menuCategoryId: req.body.menuCategoryId
        };

        // where: { id: req.body.id }

        //request store settings via ORM, pass the update values
        a.then( data => {
            res.json({'success': data});
        }).catch((err)=>{
            res.json({'error': err});
        });
    });

    router.put('/editresturanthours', (req, res) => {
        let update = {
            day_name: req.body.day_name,
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            isActive: req.body.isActive
        };
        // where: { id: req.body.id }

        //request store settings via ORM, pass the update values
        a.then( data => {
            res.json({'success': data});
        }).catch((err)=>{
            res.json({'error': err});
        });
    });

module.exports = router;