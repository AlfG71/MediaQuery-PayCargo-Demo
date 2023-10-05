const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    fullName: String,
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    imageurl: {
      type: String,
      default: 'https://cvhrma.org/wp-content/uploads/2015/07/default-profile-photo.jpg'
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model('User', userSchema);