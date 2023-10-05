var express = require('express');
var router = express.Router();
const fileUploader = require('../config/cloudinary.config');

const User = require("../models/User")

//const { isLoggedIn } = require('../middleware/route-guard')

/* PROFILE */
router.get('/profile', (req, res) => {

  res.render('user/profile.hbs', { user: req.session.user })

});

// router.get('/update-profile', (req, res, next) => {

//   res.render('user/update-profile', { user: req.session.user })

// })

router.post('/profile/edit', fileUploader.single('imageurl'), (req, res) => {
  const id  = req.session.user._id;
  const { fullName } = req.body;
  // console.log("This is the request", req)
  console.log("this is the id", id)
  console.log("this is the file", req.file) // returning undefined so far ASK Dustin
  let imageurl;
  if (req.file) {
    imageurl = req.file.path;
  } else {
    imageurl = req.session.user.imageurl;
  }

  User.findByIdAndUpdate(
      id,
      {
          fullName,
          imageurl: imageurl
      },
      { new: true })
    .then((updatedUser) => {
      req.session.user = updatedUser
      console.log("updatedUser", updatedUser)
      res.redirect('/user/profile')
  })
    .catch(error => console.log(`Error while updating user: ${error}`));
});

//EDIT PROFILE
// router.post('/profile/edit', (req, res, next) => {
//   const userID = req.session.user._id
//   const { fullName, email, password } = req.body
//   // console.log(req.params, req.body)

//   User.findByIdAndUpdate(userID, { fullName, email, password }, {new: true})
//   .then((updatedProfile) => {
//     req.session.user = updatedProfile  //reflect changes immediately
//     res.redirect("/user/profile")
//   })
//   .catch(error => next(error));
//   });

  //DELETE PROFILE
router.post('/profile/delete', (req, res, next) => {
  const userID = req.session.user._id
  const { fullName, email, password } = req.body

  User.findByIdAndDelete(userID, { fullName, email, password }, {new: true})
  .then((deletedProfile) => {
    if(userID) {
      req.session.user = deletedProfile
      // alert("Sorry to see you go!")
      res.redirect("/")
    }
    })
    .catch(error => next(error))
  })



module.exports = router;