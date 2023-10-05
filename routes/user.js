var express = require('express');
var router = express.Router();
const fileUploader = require('../config/cloudinary.config');



const User = require("../models/User")

const { isLoggedIn } = require('../middleware/route-guard')

/* GET PROFILE */
router.get('/profile', (req, res) => {

  res.render('user/profile.hbs', { user: req.session.user })

});

//EDIT PROFILE
router.post('/profile/edit', isLoggedIn, fileUploader.single('imageurl'), (req, res, next) => {
  const userID = req.session.user._id
  const { fullName, email, password } = req.body
  // console.log(req.params, req.body)

  let image;
  if (req.file) {
    image = req.file.path;
  } else {
    image = req.session.user.imageurl;
  }

  // if(req.session.user.password !== password) {

  // }

  User.findByIdAndUpdate(userID, { fullName, email, password, imageurl: image }, {new: true})
  .then((updatedProfile) => {
    req.session.user = updatedProfile  //reflect changes immediately
    res.redirect("/user/profile")
  })
  .catch(error => next(error));
  });

//DELETE PROFILE
router.get('/profile/delete', (req, res, next) => {

  res.render('user/delete.hbs')

})

router.post('/profile/delete', (req, res, next) => {

  if(req.body.delete === 'delete'){

  const userID = req.session.user._id
  const { fullName, email, password } = req.body

  User.findByIdAndDelete(userID, { fullName, email, password }, {new: true})
  .then((deletedProfile) => {
    if(userID) {
      console.log("deleted user", deletedProfile)

      req.session.destroy()
      // alert("Sorry to see you go!")
      res.redirect("/")
    }
    })
    .catch(error => next(error))
  } else {
      res.render('user/delete.hbs', {errorMessage: "Try again, please."})
  }})



module.exports = router;