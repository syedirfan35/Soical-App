const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  postTitle: {
    type: String,
    required: true
  },
  postDesc: {
    type: String,
    required: true
  },
  postImageURL: {
    type: String
  },
  cloudinary_id: {
    type: String
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
    }
  ],
  comments: [
    {
      comment: String,
      created: {
        type: Date,
        default: Date.now()
      },
      postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  posterName: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("posts", PostSchema);
