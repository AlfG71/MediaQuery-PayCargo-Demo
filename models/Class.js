const { Schema, model } = require('mongoose');

const classSchema = new Schema(
  {
      title: String,
      videoCreator: String,
      videoImg: String,
      videoURL: String,
      comments: [{type: Schema.Types.ObjectId, ref: "Comment"}],
  },
  {
      timestamps: true,
  }
);

module.exports = model('Class', classSchema);
