var express = require('express');
var router = express.Router();
const fileUploader = require('../config/cloudinary.config');

const User = require("../models/User")

//const { isLoggedIn } = require('../middleware/route-guard')

/* GET users listing. */
router.get('/profile', (req, res) => {

  res.render('user/profile.hbs', { user: req.session.user })

});

router.get('/update-profile', (req, res, next) => {

  res.render('user/update-profile', { user: req.session.user })

})

router.post('/update', fileUploader.single('imageurl'), (req, res) => {
  const id  = req.session.user._id;
  const { fullName } = req.body;

  console.log("this is the id", id)
 console.log("this is the file", req.file)
  let imageUrl;
  if (req.file) {
    imageUrl = req.file.path;
  } else {
    imageUrl = req.session.user.imageurl;
  }
 
  User.findByIdAndUpdate(
      id, 
      { 
          fullName,
          imageurl: imageUrl 
      }, 
      { new: true })
    .then((updatedUser) => {
      req.session.user = updatedUser
      console.log("updatedUser", updatedUser)
      res.redirect('/user/profile')
  })
    .catch(error => console.log(`Error while updating user: ${error}`));
});



module.exports = router;