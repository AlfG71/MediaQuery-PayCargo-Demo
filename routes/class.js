var express = require('express');
var router = express.Router();

const Class = require('../models/Class')

router.get('/all-classes', (req, res, next) => {

    Class.find()
    .then((classes) => {
        console.log("Found classes ===>", classes)
        res.render('class/all-classes.hbs', { classes })
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })

})


module.exports = router;