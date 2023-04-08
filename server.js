const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = 4000;
const methodOverride = require('method-override');
const recipeController = require('./controllers/Recipe');

//Middleware
app.use(express.urlencoded({ extended: true}));
app.use(express.json()); // help to submit the data from page to page with form
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
// app.set("view options", { layout: true } );

app.get('/', (req, res) => {
    res.send('Hello, world!');
});


app.listen(port, () => console.log(`Listening for client requests on port ${port}`));
