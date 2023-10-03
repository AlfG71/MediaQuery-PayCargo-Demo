var express = require('express');
var router = express.Router();

//const { isLoggedIn } = require('../middleware/route-guard')

/* GET users listing. */
router.get('/profile', (req, res) => {

  res.render('user/profile.hbs', { user: req.session.user })

});

router.get('/update-profile', (req, res, next) => {

  res.render('user/update-profile')

})

router.post('/update', (req, res, next) => { // unfinished request
  const { email, password } = req.body

  User.findByIdAndUpdate()
})



module.exports = router;