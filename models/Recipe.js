const mongoose = require('mongoose');
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
        type: String, //number feature nice way
        trim: true,
    },
    instructions: {
        type: String,
        required: true
    },
    measurement: {
        type: String,
        required: true
    },
    image: {
        type: String,
       // default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/1280px-Good_Food_Display_-_NCI_Visuals_Online.jpg', // edit link 
    },
    category: {
        type: String,
        required: true,
      //  enum: ['American', 'Turkishcusine', 'French', 'Desserts']    // I need to edit this section.
    },
    authorUser: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;