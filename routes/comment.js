var express = require('express');
var router = express.Router();

const Comment = require('../models/Comment');
const Class = require('../models/Class');

const { isLoggedIn } = require('../middleware/route-guard');

// const canEdit = require('../middleware/canEdit');

const isAuthor = require('../middleware/isAuthor');

router.post('/new/:classID', isLoggedIn, (req, res, next) => {
  Comment.create({
    author: req.session.user._id,
    comment: req.body.comment
  })
  .then((newComment) => {
    console.log("this is the new comment ===>", newComment)
    return Class.findByIdAndUpdate(
      req.params.classID,
      {
        $push: {comments: newComment._id}
      },
      {new: true}
    )
  })
  .then((classAfterComment) => {
    console.log("Class after comment ===>", classAfterComment)
    res.redirect(`/class/single-class/${classAfterComment._id}`)
  })
  .catch((err) => {
    console.log(err)
    next(err)
  })
})

router.post('/edit/:commentId/:classId', isLoggedIn, (req, res, next) => {

  Comment.findByIdAndUpdate(
    req.params.commentId,
    {
      comment: req.body.comment
    },
    {new: true}
  )
  .then((updatedComment) => {
    console.log("Updated comment", updatedComment)
    res.redirect(`/class/single-class/${req.params.classId}`)

  })
  .catch((err) => {
    console.log(err)
    next(err)
  })


})

router.post("/delete/:commentId/:classId", isLoggedIn, (req, res, next) => {

    Comment.findByIdAndRemove(req.params.commentId)
    .then((deleted) => {
      console.log("Deleted comment:", deleted)
      res.redirect(`/class/single-class/${req.params.classId}`)
    })
    .catch((err) => {
      console.log(err)
      next(err)
    })

})

//COPIED
// router.get('/details/:roomId', isLoggedIn, canEdit, (req, res, next) => {

//   Room.findById(req.params.roomId)
//   .populate('owner')
//   .populate({
//       path: 'reviews',
//       populate: {path: 'user'}
//   })
//   .then((room) => {

//       console.log("Found room ===>", room)
//       res.render('rooms/room-details.hbs', {room, canEdit: req.session.user.canEdit, reviews: room.reviews})
//   })
//   .catch((err) => {
//       console.log(err)
//       next(err)
//   })

// })

// router.get('/edit/:roomId', isLoggedIn, isOwner, (req, res, next) => {

//   Room.findById(req.params.roomId)
//   .then((room) => {
//       console.log("Found room ===>", room)
//       res.render('rooms/edit-room.hbs', room)
//   })
//   .catch((err) => {
//       console.log(err)
//       next(err)
//   })

// })

// router.post('/edit/:roomId', isLoggedIn, isAuthor, (req, res, next) => {

//   Room.findByIdAndUpdate(
//       req.params.roomId,
//       req.body,
//       {new: true}
//       )
//       .then((updatedRoom) => {
//           console.log("Room after update", updatedRoom)
//           res.redirect(`/rooms/details/${updatedRoom._id}`)
//       })
//       .catch((err) => {
//           console.log(err)
//           next(err)
//       })

// })

// router.get('/delete/:roomId', isLoggedIn, isAuthor, (req, res, next) => {

//   Room.findByIdAndRemove(req.params.roomId)
//       .then((deletedRoom) => {
//           console.log("Deleted room ==>", deletedRoom)
//           res.redirect('/rooms/all')
//       })
//       .catch((err) => {
//           console.log(err)
//           next(err)
//       })

// })

module.exports = router;