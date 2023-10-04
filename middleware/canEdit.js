const Comment = require('../models/Comment')

const canEdit = (req, res, next) => {

    Comment.findById(req.params.commentID)
        .populate('author')
        .then((foundComment) => {
            console.log('Found comment ===>', foundComment)
            console.log("User in session ===>", req.session.user)
            if (foundComment.author._id.toString() === req.session.user._id) {
                console.log("Match")
                req.session.user.canEdit = true
                console.log("User after edit check", req.session.user)
                next()
            } else {
                req.session.user.canEdit = false
                console.log("User after edit check", req.session.user)
                next()
            }
        })
        .catch((err) => {
            console.log(err)
            next(err)
        })

}

module.exports = canEdit