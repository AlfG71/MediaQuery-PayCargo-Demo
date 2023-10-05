var express = require('express');
var router = express.Router();

const { isLoggedIn } = require('../middleware/route-guard')
const canEdit = require('../middleware/canEdit');
// const isAuthor = require('../middleware/isAuthor')

const Class = require('../models/Class')

/*
let argument = 'arg'

function explainer(parameter) {
    return parameter
}

console.log(explainer(argument))

*/

router.get('/all-classes', isLoggedIn, (req, res, next) => {

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

router.post('/single-class/:classID', isLoggedIn, (req, res, next) => {

    // console.log("User in session", req.session.user)

    Class.findById(req.params.classID)
    .populate({
        path: 'comments',
        populate: {path: 'author'}
        })
    .then((foundClass) => {
        console.log("foundClass before MAP ===>", foundClass)

        let comments = foundClass.comments.map((comment) => {
            // console.log("This is comment", comment)


            if (req.session.user._id === String(comment.author._id)) {
                console.log("TRUE")
                return {...comment._doc, canEdit: true, classId: foundClass._id};
            } else {
                return comment;
            }
        });

        // console.log("COMMENTS after MAP ===>", comments)
        res.render('class/single-class.hbs', {foundClass, comments})
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })

})

/*
FOR editing comments
 let comments = class.comments.map((comment) => {
            if (req.session.user._id === review.author._id.toString()) {
                return {...comment._doc, canEdit: true}
            } else {
                return comment
            }
        })
*/

router.get('/single-class/:classID', isLoggedIn, (req, res, next) => {

    Class.findById(req.params.classID)
    .populate({
        path: 'comments',
        populate: {path: 'author'}
        })
        .then((foundClass) => {
            console.log("foundClass before MAP ===>", foundClass)

            let comments = foundClass.comments.map((comment) => {
                console.log("This is comment", comment)

                if (req.session.user._id === String(comment.author._id)) {
                    console.log("TRUE")
                    return {...comment._doc, canEdit: true, classId: foundClass._id};
                } else {
                    return comment;
                }
            });

            console.log("COMMENTS after MAP ===>", comments)
            res.render('class/single-class.hbs', {foundClass, comments})
        })
    .catch((err) => {
        console.log(err)
        next(err)
    })

})

module.exports = router;