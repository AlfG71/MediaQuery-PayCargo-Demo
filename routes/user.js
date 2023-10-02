var express = require('express');
var router = express.Router();

//const { isLoggedIn } = require('../middleware/route-guard')

/* GET users listing. */
router.get('/profile', (req, res) => {

  res.render('user/profile.hbs', { user: req.session.user })

});



module.exports = router;