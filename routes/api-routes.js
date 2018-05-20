const express = require('express');
let path = require('path');
const { ensureAuthenticated } = require(path.join(__basedir,'/helpers/auth'));

module.exports = router => {
    /**
     * Get routes
     */
    router.get('/api/settings', (req, res) => {
        //request store settings via ORM
        a.then( data => {
            res.json({'success': data});
        }).catch((err)=>{
            res.json({'error': err});
        });
    });

    router.get('/api/subcategories', (req, res) => {
        //request store settings via ORM
        a.then( data => {
            res.json({'success': data});
        }).catch((err)=>{
            res.json({'error': err});
        });
    });

    router.get('/api/categories', (req, res) => {
        //request store settings via ORM
        a.then( data => {
            res.json({'success': data});
        }).catch((err)=>{
            res.json({'error': err});
        });
    });

    router.get('/api/menuitems', (req, res) => {
        //request store settings via ORM
        a.then( data => {
            res.json({'success': data});
        }).catch((err)=>{
            res.json({'error': err});
        });
    });

    /**
     * Post routes
     */
    router.post('/api/addcategory', ensureAuthenticated, (req,res)=>{
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

    router.post('/api/addresturanthours', ensureAuthenticated, (req,res)=>{
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

    router.put('/api/editmenuitem', (req, res) => {
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


};