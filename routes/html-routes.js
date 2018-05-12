const express = require('express');
const router = express.Router();

// -------- Homepage route
router.get('', (req,res) => {
    const title='Welcome to Pho Now!';
    res.render('index', {title: title });
});

// --------------- Menu
router.get('/menu', (req, res) => {
    res.render('menu');
});

// --------------- Store Info
router.get('/about', (req, res) => {
    res.render('about');
});

// --------------- Contact Us
router.get('/contact', (req, res) => {
    res.render('contact');
});

module.exports = router;