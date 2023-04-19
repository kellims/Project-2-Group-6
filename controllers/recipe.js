const express = require('express');
const router = express.Router();


let { recipes } = require('../models');

const seededRecipes = [
    {
        author: "Test One",
        title: "Title One",
        ingredients: "one",
        nutrients: "nutrients one",
        cookingTime: "5 minutes",
        instructions: "Cooking One",
        measurement: "Measurement One",
        image: "Enter Image Here",
        category: "Category One",
        authorUser: "User One"
    }, {
        author: "Test Two",
        title: "Title Two",
        ingredients: "two",
        nutrients: "nutrients Two",
        cookingTime: "10 minutes",
        instructions: "Cooking Two",
        measurement: "Measurement Two",
        image: "Enter Image Here",
        category: "Category Two",
        authorUser: "User Two"
    }, {
        author: "Test Three",
        title: "Title Three",
        ingredients: "three",
        nutrients: "nutrients Three",
        cookingTime: "15 minutes",
        instructions: "Cooking Three",
        measurement: "Measurement Three",
        image: "Enter Image Here",
        category: "Category Three",
        authorUser: "User Three"
    }, {
        author: "Test Four",
        title: "Title Four",
        ingredients: "four",
        nutrients: "nutrients Four",
        cookingTime: "20 minutes",
        instructions: "Cooking Four",
        measurement: "Measurement Four",
        image: "Enter Image Here",
        category: "Category Four",
        authorUser: "User Four"
    }
]


//Homepage for recipes, links to /recipe
router.get('/', async (req, res, next) => {
    try {
        console.log(req.query); //query for the search bar
        let myRecipes;
        if(req.query.s) {
            myRecipes = await recipes.find({category:req.query.s}) //if ask for a recipe of this category find them
            //console.log(myRecipes);
        } else {
            myRecipes = await recipes.find({}); // else find all the recipes
        }
        console.log(myRecipes);
        res.render('recipes/index.ejs', {recipe: myRecipes});
    } catch(err){
        console.log(err);
        return next();
    }
});

//Add New Recipes 
router.get('/new', (req, res) => {
    res.render('recipes/new.ejs')
});

//added Seed route
router.get('/seed', async (req, res, next) => {
    try {
        await recipes.deleteMany({});
        await recipes.insertMany(seededRecipes);
        res.redirect('/recipe');
    } catch(err) {
        console.log(err);
        next();
    }
})

//Show page for each Recipe
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
        console.log(req.body)
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
        const recipeToEdit = await recipes.findById(req.params.id);
        res.render('recipes/edit.ejs', {recipe: recipeToEdit})
    } catch(err) {
        console.log(err);
        next()
    }
});
router.put('/:id', async (req, res, next) => {
    try {
        const updatedRecipe = await recipes.findByIdAndUpdate(req.params.id, req.body);
        res.redirect(`/recipe/${req.params.id}`)
    } catch(err) {
        console.log(err);
        next();
    }
});


router.get('/:id/delete', async (req, res, next) => {
    try {
        const recipeToBeDeleted = await recipes.findById(req.params.id);
        res.render('recipes/delete.ejs', {recipe: recipeToBeDeleted})
    } catch(err) {
        console.log(err);
        next();
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const deletedRecipe = await recipes.findByIdAndDelete(req.params.id);
        res.redirect('/recipe');
    } catch(err) {
        console.log(err);
        next();
    }
})



module.exports = router;