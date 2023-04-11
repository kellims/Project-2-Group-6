const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true 
    },
    creatorUser: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    reviewRecipe: {
        type: mongoose.Types.ObjectId,
        ref: 'Recipe'
    },

});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;