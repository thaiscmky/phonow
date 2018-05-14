const express = require('express');
const router = express.Router();

// -------- Homepage route
router.get('/', (req,res) => {
    const title='Welcome to Pho Now!';
    res.render('./admin/index', {title: title });
});


module.exports = router;