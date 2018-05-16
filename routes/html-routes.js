const express = require('express');
const router = express.Router();

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

module.exports = router;