var express = require('express');
var router = express.Router();

const Class = require('../models/Class')

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'WELCOME!!!' });
// });

router.get('/all', (req, res, next) => {

  Class.find()
  // .populate('owner')
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