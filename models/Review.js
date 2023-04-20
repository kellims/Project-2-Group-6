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
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    reviewRecipe: {
        type: mongoose.Types.ObjectId,
        ref: 'recipe'
    },

});

const Review = mongoose.model('review', reviewSchema);
module.exports = Review;