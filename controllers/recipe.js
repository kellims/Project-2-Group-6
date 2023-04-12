const express = require('express');
const router = express.Router();
//I don't think we need the port in our controllers if we're already listening in the .env or server.js files?
// const port = 4000;

//does recipes need to be capitalized?
let { recipes } = require('../models');


//If we have "homepage" above, would be want to have our controller be the start of the user's pages?
router.get('/', async (req, res, next) => {
    try {
        let myRecipes = await recipes.find({});
        return res.render('recipes/index.ejs', {recipe: myRecipes});
    } catch(err){
        console.log(err);
        return next();
    }
});
//Add New Recipes (Need to decide on our /route for server.js. For now it's /recipe)
router.get('/new', (req, res) => {
    res.render('recipes/new.ejs')
});


router.get("/:id", async (req, res, next) => {
    try {
        const myRecipe = await recipes.findById(req.params.id);
        res.render("recipes/show.ejs", {recipe: myRecipe})
    } catch(err) {
        console.log(err);
        next();
    }    
});

//Might need to change the redirect based on what we decide on homepage vs. user account hoomepage
router.post('', async (req, res, next) => {
    try{
        let newRecipe = await recipes.create(req.body);
        res.redirect('/recipe');
    } catch(err) {
        console.log(err);
        next();
    }
});


//Edit route w/ redirect to updated show page
router.get('/:id/edit', async (req, res, next) => {
    try {
        const recipeToEdit = await recipe.findById(req.params.id);
        res.render('recipes/edit.ejs', {recipe: recipeToEdit})
    } catch(err) {
        console.log(err);
        next()
    }
});
router.put('/:id', async (req, res, next) => {
    try {
        const updatedRecipe = await recipe.findByIdAndUpdate(req.params.id, req.body);
        res.redirect(`/recipes/${req.params.id}`)
    } catch(err) {
        console.log(err);
        next();
    }
});


router.get('/:id/delete', async (req, res, next) => {
    try {
        const recipeToBeDeleted = await recipe.findById(req.params.id);
        res.render('recipes/delete.ejs', {recipe: recipeToBeDeleted})
    } catch(err) {
        console.log(err);
        next();
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const deletedRecipe = await recipe.findByIdAndDelete(req.params.id);
        res.redirect('/recipe');
    } catch(err) {
        console.log(err);
        next();
    }
})

//What additional routes will we need to add?
//remove? Would we do this after we were able to create a favorites list/add favorite? 
//Search results page? 


module.exports = router;