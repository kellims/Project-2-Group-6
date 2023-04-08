const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcryptjs');

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.get('/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/login', async(req, res, next) => {
    try {
        let user;
        const loggedInUser = req.body;
        const userExists = await User.exists({email: req.body.email}); //see if the user exist in the db. If yes, return the Id, if not redirect to the login page
        if(userExists) {
            user = await User.find({email: req.body.email});
            //console.log(user);
        } else {
            return res.redirect('/login');
        }
        const match = bcrypt.compare(req.body.password, user.password); //this line does the decryption and see if the user match the password entered
        if(match) {
            req.session.currentUser = {
                id: user._id,
                username: user.username
            };
            //console.log(req.session); // "req" is a request to see if a person is in a session
            //console.log(match);
            //console.log(userExists);
            res.redirect('/recipies');
        }  else res.redirect('/login');
    } catch(err) {
        console.log(err);
        next();
    }
})

router.post('/signup', async(req, res, next) => {
    try {
        const newUser = req.body;
        // console.log(newUser);
        const rounds = process.env.SALT_ROUNDS
        const salt = await bcrypt.genSalt(parseInt(rounds));
        // console.log(`My salt is ${salt}`);
        const hash = await bcrypt.hash(newUser.password, salt);
        // console.log(`My hash is ${hash}`);
        newUser.password = hash;
        // console.log(newUser);
        await User.create(newUser);
        res.redirect('/login');
    } catch(err) {
        console.log(err);
        next();
    }
})

module.exports = router;