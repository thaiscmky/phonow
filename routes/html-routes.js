const express = require('express');
const router = express.Router();

// -------- Homepage route
router.get('', (req,res) => {
    const title='Welcome to Pho Now!';
    res.render('./main/index', {title: title });
});

// --------------- Menu
router.get('/menu', (req, res) => {
    res.render('./main/menu');
});

// --------------- Store Info
router.get('/about', (req, res) => {
    res.render('./main/about');
});

// --------------- Contact Us
router.get('/contact', (req, res) => {
    res.render('./main/contact');
});

module.exports = router;