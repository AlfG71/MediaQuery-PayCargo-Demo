var express = require('express');
var router = express.Router();

const Class = require('../models/Class')

router.get('/all-classes', (req, res, next) => {
    res.render('class/all-classes.hbs', { classes })
})


module.exports = router;