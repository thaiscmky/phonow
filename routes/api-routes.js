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
    router.post('/category', ensureAuthenticated, (req,res)=>{
        let newcat = {
            category_name: req.body.category_name,
            category_description:req.body.category_description,
            isActive:true
        };

        menuController.insertCategory(newcat).then( data => {
            res.json({'success': data});
        }).catch((err)=>{
            res.json({'error': err});
        });
    });

    router.post('/resturanthours', ensureAuthenticated, (req,res)=> {
        let count = req.body.day_name.length;
        let values = [];

        for(let i = 0; i < count; i++){
            values[i] = {
                day_name: req.body.day_name[i],
                start_time: req.body.start_time[i],
                end_time: req.body.end_time[i],
                isActive: true
            }
        }
        restaurantController.udpatetRestaurantHours(values).then( data => {
            res.json({'success': data});
        }).catch((err)=>{
            res.json({'error': err});
        });
    });

    /**
     * Put routes
     */
    router.put('/category', (req, res) => {
        let update = {
            category_name: req.body.category_name,
            category_description: req.body.discription,
            isActive: req.body.isActive
        };
        menuController.updateCategory(req.body.id,update).then( data => {
            res.json({'success': data});
        }).catch((err)=>{
            res.json({'error': err});
        });
    });

    router.put('/menuitem', (req, res) => {
        let update = {
            item_name_english: req.body.item_name_english,
            item_name_vietnamese : req.body.item_name_vietnamese,
            item_price: req.body.item_price,
            menuCategoryId: req.body.menuCategoryId
        };

        menuController.updateMenuItem(req.body.id,update).then( data => {
            res.json({'success': data});
        }).catch((err)=>{
            res.json({'error': err});
        });
    });

    router.put('/resturanthours', (req, res) => {

        let count = req.body.day_name.length;
        let values = [];

        for(let i = 0; i < count; i++){
            values[i] = {
                day_name: req.body.day_name[i],
                start_time: req.body.start_time[i],
                end_time: req.body.end_time[i],
                isActive: req.body.isActive //TODO needs review
            }
        }
        restaurantController.udpatetRestaurantHours(values).then( data => {
            res.json({'success': data});
        }).catch((err)=>{
            res.json({'error': err});
        });

    });

module.exports = router;