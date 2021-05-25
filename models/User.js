const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  googleID: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  avatarURL: {
    type: String
  },
  cloudinary_id: {
    type: String
  },
  bio: {
    type: String
  },
  age: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  gender: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  following: [{ type: mongoose.Schema.ObjectId, ref: "users" }],
  followers: [{ type: mongoose.Schema.ObjectId, ref: "users" }],

  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("users", UserSchema);
