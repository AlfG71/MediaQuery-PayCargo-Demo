var express = require('express');
var router = express.Router();

const bcryptjs = require('bcryptjs');
const saltRounds = 10;

const User = require('../models/User')

router.get('/signup', (req, res, next) => {
// console.log("this is working")
  res.render('auth/signup.hbs')

})


router.post("/signup", (req, res, next) => {
  console.log("The form data: ", req.body);

  const { firstName, lastName, email, password } = req.body;

  if (!email || !password || !firstName || !lastName) {
    res.render("auth/signup.hbs", {
      errorMessage:
        "All fields are mandatory. Please provide your email, first name, last name, and password.",
    });
    return;
  }

  User.findOne({
    email,
  })
    .then((foundUser) => {
      if (!foundUser) {
        bcryptjs
          .genSalt(saltRounds)
          .then((salt) => bcryptjs.hash(password, salt))
          .then((hashedPassword) => {
            console.log("This is the hashed password ==>", hashedPassword)
            return User.create({
              firstName,
              lastName,
              email,
              password: hashedPassword,
            });
          })
          .then((createdUser) => {
            console.log("Newly created user is: ", createdUser);
            req.session.user = createdUser;
            console.log("Session after signup ===>", req.session)
            res.redirect('/user/profile')
          })
          .catch((error) => {
            console.log(error);
            next(error);
          });
      } else {
        res.render("auth/signup.hbs", {
          errorMessage: "Email already taken.",
        });
        return;
      }
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

router.get('/profile', (req, res, next) => {

  res.render('user/profile.hbs', req.session.user)

})

router.get("/login", (req, res, next) => {

  res.render("auth/login.hbs")

})


router.post('/login', (req, res, next) => {
  console.log('SESSION =====> ', req.session);
  const { email, password } = req.body;

  const validationError = 'Email not found and/or incorrect password.'

  if (email === '' || password === '') {
    res.render('auth/login', {
      errorMessage: 'Please enter your email or password to login.'
    });
    return;
  }

  User.findOne({ email })
    .then(user => {
      if (!user) {
        console.log("Email not registered. ");
        res.render('auth/login', { errorMessage: validationError });
        return;
      } else if (bcryptjs.compareSync(password, user.password)) {

          req.session.user = user
          console.log("Session after success ===>", req.session)

          res.redirect('/')
      } else {
        console.log("Incorrect password. ");
        res.render('auth/login.hbs', { errorMessage: validationError });
      }
    })
    .catch(error => next(error));
});

router.post('/logout', (req, res, next) => {
  // req.session.destroy(err => {
    // if (err) next(err);
    res.redirect('/');
  // });
});

// router.post('/update', (req, res, next) => { // unfinished request
//   const { firstName, lastName, email, password } = req.body

//   User.findByIdAndUpdate()
// })

module.exports = router;