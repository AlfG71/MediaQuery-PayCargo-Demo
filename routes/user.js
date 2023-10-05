var express = require('express');
var router = express.Router();

const User = require('../models/User')

//const { isLoggedIn } = require('../middleware/route-guard')

/* GET PROFILE */
router.get('/profile', (req, res) => {

  res.render('user/profile.hbs', { user: req.session.user })

});

//EDIT PROFILE
router.post('/profile/edit', (req, res, next) => { 
  const userID = req.session.user._id
  const { fullName, email, password } = req.body
  // console.log(req.params, req.body)

  User.findByIdAndUpdate(userID, { fullName, email, password }, {new: true})
  .then((updatedProfile) => {
    req.session.user = updatedProfile  //reflect changes immediately
    res.redirect("/user/profile")
  })
  .catch(error => next(error));
  });

//DELETE PROFILE
router.post('/profile/delete', (req, res, next) => { 
  const userID = req.session.user._id
  const { fullName, email, password } = req.body

  User.findByIdAndDelete(userID, { fullName, email, password }, {new: true})
  .then((deletedProfile) => {
    if(userID) {
      req.session.user = deletedProfile
      alert("Sorry to see you go!")
      res.redirect("/")
    } 
    })
    .catch(error => next(error))    
  })



module.exports = router;