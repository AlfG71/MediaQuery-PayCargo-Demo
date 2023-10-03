const { Schema, model } = require('mongoose');

const classSchema = new Schema(
  {
      title: String,
      videoCreator: String,
      videoImg: String,
      videoURL: String,
      comments: [],
  },
  {
      timestamps: true,
  }
);

module.exports = model('Class', classSchema);

//{type: Schema.Types.ObjectId, ref: "Comment"}