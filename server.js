//Dependencies
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = 4000;
const methodOverride = require('method-override');

const recipeController = require('./controllers/recipe');

//Middleware
app.use(express.urlencoded({ extended: true}));
app.use(express.json()); // help to submit the data from page to page with form
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));



//Redirecting to homepage link for home page
app.get('/', (req, res) => {
    res.redirect('/homepage');
});

app.get('/homepage', (req, res) => {
    res.render('Info/homepage.ejs')
});


//About page route
app.get('/about', (req, res) => {
    res.render('Info/about.ejs')
});

//Recipe route which connects to controllers/recipe.js
app.use('/recipe', recipeController);


//404 route
app.get('*/', (req, res) => {
    res.render('./Info/404.ejs');
});


app.listen(port, () => console.log(`Listening for client requests on port ${port}`));
