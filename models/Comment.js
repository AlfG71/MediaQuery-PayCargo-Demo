const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
  {
      comment: String,
      date: Date,
      author: { type: Schema.Types.ObjectId, ref: "User" }
  },
  {
      timestamps: true,
  }
);

// owner: { type: Schema.Types.ObjectId, ref: "User" }
// {type: Schema.Types.ObjectId, ref: "Comment"}

module.exports = model('Comment', commentSchema);