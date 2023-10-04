var express = require('express');
var router = express.Router();

const Class = require('../models/Class')

/*
let argument = 'arg'

function explainer(parameter) {

}

*/

router.get('/all-classes', (req, res, next) => {

    Class.find()
    .then((classes) => {
        // console.log("Found classes ===>", classes)
        res.render('class/all-classes.hbs', { classes })
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })

})

router.post('/single-class/:classID', (req, res, next) => {

    Class.findById(req.params.classID)
    .populate({
        path: 'comments',
        populate: {path: 'author'}
        })
    .then((foundClass) => {
        console.log("Details ===>", foundClass)
        res.render('class/single-class.hbs', foundClass)

    })
    .catch((err) => {
        console.log(err)
        next(err)
    })


})

router.get('/single-class/:classID', (req, res, next) => {

    Class.findById(req.params.classID)
    .populate({
        path: 'comments',
        populate: {path: 'author'}
        })
    .then((foundClass) => {
        console.log("Details ===>", foundClass)
        res.render('class/single-class.hbs', foundClass)

    })
    .catch((err) => {
        console.log(err)
        next(err)
    })


})

module.exports = router;