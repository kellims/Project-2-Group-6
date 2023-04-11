const express = require('express');
const router = express.Router();
//I don't think we need the port in our controllers if we're already listening in the .env or server.js files?
// const port = 4000;
let { recipes } = require('../models');

// Homepage Route - Would we want to put this in our server.js?
router.get('/homepage', (req, res) => {
    res.render('info/homepage.ejs')
});

//If we have "homepage" above, would be want to have our controller be the start of the user's pages?
router.get('/', async (req, res, next) => {
    try {
        let myRecipes = await recipes.find({});
        return res.render('red_wine/index.ejs', {recipe: myRecipes});
    } catch(err){
        console.log(err);
        return next();
    }
});

//Add New Recipes (Need to decide on our /route for server.js. For now it's /recipe)
router.get('/new', (req, res) => {
    res.render('/recipe/new.ejs')
});

module.exports = router;