const express = require('express');
const router = express.Router();
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

// -------- Homepage route
router.get('/', (req,res) => {
    const title='Welcome to Pho Now!';
    res.render('./admin/index', {title: title });
});

// -------- Add category
router.get('/addcategories', (req,res) => {
    res.render('./admin/add-categ');
});

// -------- Add item
router.get('/additem', (req,res) => {
    res.render('./admin/add-item');
});

// -------- fail route
router.get('/403', (req,res) => {
    res.render('./admin/403');
});

// -------- Authorized route - dashboard
router.get('/dashboard',ensureAuthenticated, (req,res) => {
    res.render('./admin/index');
});

module.exports = router;

