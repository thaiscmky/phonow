const express = require('express');
const router = express.Router();
const passport = require('passport');

//route for authentication
router.get('/google', passport.authenticate(
    'google', { scope: ['profile', 'email'] })
);

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/admin/error-pages/403' }),
    (req, res) => {
        // Successful authentication, redirect to dashboard.
        res.redirect('/dashboard');
    });

//Verification route
router.get('/verify', (req,res) => {
    if(req.user) {
        console.log(req.user);
    } else {
        console.log('Not auth');
    }
});

//Logout route
router.get('/logout', (req,res) => {
    req.logOut();
    res.redirect('/');
});

module.exports = router;