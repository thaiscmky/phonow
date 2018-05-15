const express = require('express');
const router = express.Router();
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

// -------- Homepage route
router.get('/', (req,res) => {
    const title='Welcome to Pho Now!';
    res.render('./admin/index', {layout:'main-admin',title: title });
});

// -------- sample dashboard route
router.get('/dash', (req,res) => {
    const title='Welcome to Pho Now!';
    res.render('./admin/dash-sample', {layout:'main-admin',title: title });
});

// -------- Add category
router.get('/addcategories', (req,res) => {
    res.render('./admin/add-categ', {layout:'main-admin'});
});

// -------- Add item
router.get('/additem', (req,res) => {
    res.render('./admin/add-item', {layout:'main-admin'});
});

// -------- fail route
router.get('/403', (req,res) => {
    res.render('./admin/403', {layout:'main-admin'});
});

// -------- Authorized route - dashboard
router.get('/dashboard',ensureAuthenticated, (req,res) => {
    res.render('./admin/index', {layout:'main-admin'});
});

module.exports = router;

