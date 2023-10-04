// IF we were to delete, we'd have to edit the app.js to replace indexRouter with authRouter

var express = require('express');
var router = express.Router();

const Class = require('../models/Class')

/* GET login page for home page. */

// router.get('/', (req, res, next) => {
  
//   res.render('auth/login.hbs')

// })

// router.get('/', function(req, res, next) {
//   Class.find()
//   // .populate('owner')
//   .then((classes) => {
//       console.log("Found classes ===>", classes)
//       res.render('index.hbs', { title: 'Welcome to PayCargo Academy!', user: req.session.user, classes: classes })
//   })
//   .catch((err) => {
//       console.log(err)
//       next(err)
//   })

// });

module.exports = router;
