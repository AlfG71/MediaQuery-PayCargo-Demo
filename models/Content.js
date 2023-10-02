const { Schema, model } = require('mongoose');

const contentSchema = new Schema(
  {
    title,
    body,
    type,
    source: String,
    comments

// source: String,
// main_title: {},
// sub_title: String

  },

  {
    timestamps: true
  }
);

module.exports = model('User', contentSchema);