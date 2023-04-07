// This connects the config file that links MongoDB and Mongoose to the rules for each of the dbs we create
require('../configuration/connection');

module.exports = {
    recipes: require('./Recipes')
}