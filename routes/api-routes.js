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
            res.json({'success': data.reverse()});
        }).catch((err)=>{
            res.json({'error': err});
        });
    });

    router.get('/subcategories', (req, res) => {
        menuController.getCategories().then( data => {
            res.json({'success': data.reverse()});
        }).catch((err)=>{
            res.json({'error': err});
        });
    });

    router.get('/categories', (req, res) => {
        menuController.getMenuTypes().then( data => {
            res.json({'success': data.reverse()});
        }).catch((err)=>{
            res.json({'error': err});
        });
    });

    router.get('/resturanthours', (req, res) => {
        restaurantController.getBusinessHours().then( data => {
            res.json({'success': data});
        }).catch((err)=>{
            res.json({'error': err});
        });
    });

    router.get('/resturantaddress', (req, res) => {
        restaurantController.getRestaurant().then( data => {
            res.json({'success': data});
        }).catch((err)=>{
            res.json({'error': err});
        });
    });

    router.get('/restaurantcontact', (req, res) => {
        restaurantController.getContacts().then( data => {
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
            category_description: req.body.category_description,
            menu_type_id: req.body.menu_type_id,
            isActive:true
        };

        menuController.insertCategory(newcat).then( data => {
            res.json({'success': data.reverse()});
        }).catch((err)=>{
            res.json({'error': err});
        });
    });

    router.post('/menutype', ensureAuthenticated, (req,res)=>{
        let newtype= {
            menu_type_name: req.body.menu_type_name,
            menu_type_description:req.body.menu_type_description,
            isActive:true
        };
        menuController.insertMenuType(newtype).then( data => {
            res.json({'success': data.reverse()});
        }).catch((err)=>{
            res.json({'error': err});
        });
    });

    router.post('/menuitem', (req, res) => {
        let newitem = {
            item_name_english: req.body.item_name_english,
            item_name_vietnamese : req.body.item_name_vietnamese,
            item_price: req.body.item_price,
            item_description: req.body.item_description,
            menuCategoryId: req.body.menuCategoryId,
            menuTypeId: req.body.menuTypeId,
            isActive: true
        };

        menuController.insertMenuItem(newitem).then( data => {
            res.json({'success': data.reverse()});
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
            res.json({'success': data.reverse()});
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
            category_description: req.body.category_description,
            menu_type_id: req.body.menu_type_id,
            isActive: req.body.isActive
        };
        menuController.updateCategory(req.body.id,update).then( data => {
            res.json({'success': data.reverse()});
        }).catch((err)=>{
            res.json({'error': err});
        });
    });

    router.put('/menutype', (req, res) => {
        let update = {
            menu_type_name: req.body.menu_type_name,
            menu_type_description: req.body.menu_type_description,
            isActive: req.body.isActive,
            menuCategoryId: 0 //TODO remove this table and its relationship from models
        };
        menuController.updateMenuType(req.body.id,update).then( data => {
            console.log(data);
            res.json({'success': data.reverse()});
        }).catch((err)=>{
            res.json({'error': err});
        });
    });

    router.put('/menuitem', (req, res) => {
        let update = {
            item_name_english: req.body.item_name_english,
            item_name_vietnamese : req.body.item_name_vietnamese,
            item_price: req.body.item_price,
            item_description: req.body.item_description,
            menuCategoryId: req.body.menuCategoryId,
            menuTypeId: req.body.menuTypeId,
            isActive: req.body.isActive
        };

        menuController.updateMenuItem(req.body.id,update).then( data => {
            res.json({'success': data.reverse()});
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
            res.json({'success': data.reverse()});
        }).catch((err)=>{
            res.json({'error': err});
        });

    });

    /**
     * Delete Routes
     */
    router.delete('/menutype', (req, res) => {
        let id = parseInt(req.body.id);
        menuController.deleteMenuType(id).then( result => {
            res.json({'success': result});
        }).catch((err)=>{
            res.json({'error': err});
        });
    });

    router.delete('/category', (req, res) => {
        let id = parseInt(req.body.id);
        menuController.deleteCategory(id).then( result => {
            res.json({'success': result});
        }).catch((err)=>{
            res.json({'error': err});
        });
    });

    router.delete('/menuitem', (req, res) => {
        let id = parseInt(req.body.id);
        menuController.deleteMenuItem(id).then( result => {
            res.json({'success': result});
        }).catch((err)=>{
            res.json({'error': err});
        });
    });

module.exports = router;