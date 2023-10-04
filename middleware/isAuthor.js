const Comment = require('../models/Comment')

const isAuthor = (req, res, next) => {

    Comment.findById(req.params.commentID)
        .populate('author')
        .then((foundComment) => {
            console.log('Found comment ===>', foundComment)
            console.log("User in session ===>", req.session.user)
            if (foundComment.author._id.toString() === req.session.user._id) {
                console.log("Match")
                next()
            } else {
                res.redirect(`/single-class/${{_id}}`)
            }
        })
        .catch((err) => {
            console.log(err)
            next(err)
        })

}

module.exports = isAuthor