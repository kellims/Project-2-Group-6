const express = require('express');
const router = express.Router();
const port = 4000;
let { recipes } = require('../models');

// Homepage Route
router.get('/homepage', (req, res) => {
    res.render('info/homepage.ejs')
});



module.exports = router;