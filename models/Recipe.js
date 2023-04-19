const mongoose = require('mongoose');

const user = require('./User');

const recipeSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        unique: true,
        required: [true, 'Recipe name is required!'],
    },
    ingredients: {
        type: Array, // array feature 
        required: true
    },
    nutrients: {
        type: Array, // array feature 
        required: true
    },
    cookingTime: {
        type: String, //number feature
        trim: true,
    },
    instructions: {
        type: String,
        required: true
    },
    calories: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/1280px-Good_Food_Display_-_NCI_Visuals_Online.jpg',
    },
    category: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }
});

const Recipe = mongoose.model('recipe', recipeSchema);
module.exports = Recipe;