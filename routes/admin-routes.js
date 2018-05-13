const express = require('express');
const router = express.Router();

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

// ----------- Inactivate a category,
router.delete('/:id',(req,res) => {
    db.menuCategory.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(() => { res.redirect('/admin');} );
});

module.exports = router;

