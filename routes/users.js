const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const localStratergy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');

router.get('/register', function (req, res) {
    res.render('register');
});


router.post('/register', function (req, res) {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ success: false, message: 'Username and password are required.' });
    }

    let newUser = new User({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        age: req.body.age,
        latitude: Number(req.body.latitudeofuser) || 0,
        longitude: Number(req.body.longitudeofuser) || 0,
    });

    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err.message);
            return res.status(400).json({ success: false, message: err.message });
        }
        console.log('Signed up as ' + user.username);
        return res.json({ success: true, message: 'Registered successfully.' });
    });
});


router.get('/login', function (req, res) {
    res.render('login');
});


router.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/mainpage',
        failureRedirect: '/login',
    }),
    function (req, res) { }
);


router.get('/logout', function (req, res) {
    // passport 0.4.x uses a synchronous req.logout()
    if (typeof req.logout === 'function') {
        try {
            req.logout();
        } catch (e) {
            // passport >=0.6 requires a callback; ignore here since we pin 0.4.x
        }
    }
    console.log('Logged out!!');
    res.redirect('/login');
});

module.exports = router;
