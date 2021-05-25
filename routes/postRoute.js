const express = require("express");
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const { check, validationResult } = require("express-validator");
const authMiddleware = require("../middleware/auth");

//models
const Post = require("../models/Posts");
const User = require("../models/User");
//@route /api/posts
//@desc Get All posts of a particular user
//@access private
router.get("/", authMiddleware, async (req, res) => {
  try {
    const posts = await Post.find({ postedBy: req.user.id }).populate(
      "comments.postedBy postedBy",
      "name avatarURL"
    );
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error!");
  }
});

//@route /api/posts/:postId
//@desc Get single posts of a user
//@access private
router.get("/:postId", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).populate(
      "comments.postedBy",
      "name"
    );
    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error!");
  }
});

//@route /api/posts/new/:userId
//@desc Create a new post
//@access private
router.post(
  "/new/:userId",
  [
    authMiddleware,
    [
      check("postTitle", "Post title is required!")
        .not()
        .isEmpty(),
      check("postDesc", "Post description is required!")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { postTitle, postDesc, image } = req.body;

    try {
      const result = await cloudinary.uploader.upload(image);

      const userData = await User.findById(req.user.id);
      console.log(userData);

      const newPost = new Post({
        postTitle,
        postDesc,
        postedBy: req.user.id,
        posterName: userData.name,
        postImageURL: result.secure_url,
        cloudinary_id: result.public_id
      });

      const post = await newPost.save();

      res.json({ post });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error!");
    }
  }
);

//@route /api/posts/feed
//@desc get feed for particular user
//@access Private
router.get("/feed/:userId", authMiddleware, async (req, res) => {
  try {
    let user = await User.findById(req.params.userId);
    let posts = await Post.find({ postedBy: { $in: user.following } }).populate(
      "comments.postedBy",
      "name"
    );
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error!");
  }
});

//@route /api/posts/:postId
//@desc updating a particular post
//@access Private
router.put(
  "/:postId",
  [
    authMiddleware,
    upload.single("image"),
    [
      check("postText", "Please enter text to update post")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { postText } = req.body;

    try {
      let post = await Post.findById(req.params.postId);

      if (!post) {
        return res.status(404).json({ msg: "Post not found" });
      }
      //check user owns post
      if (post.postedBy.toString() !== req.user.id) {
        return res.status(401).json({ msg: "Not Authorized!" });
      }
      await cloudinary.uploader.destroy(post.cloudinary_id);
      const result = await cloudinary.uploader.upload(req.file.path);

      const postField = {};
      if (postText) postField.postText = postText;

      if (result.secure_url) postField.postImageURL = result.secure_url;
      if (result.public_id) postField.cloudinary_id = result.public_id;

      console.log(postField);

      post = await Post.findByIdAndUpdate(
        req.params.postId,
        { $set: postField },
        { new: true }
      );
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//@route /api/posts/:postId
//@desc removes a post
//@access private
router.delete("/:postId", authMiddleware, async (req, res) => {
  try {
    //find post by id
    let post = await Post.findById(req.params.postId);
    //if post not found
    if (!post) {
      return res.status(404).json({ msg: "Post not found!" });
    }
    //check user owns post
    if (post.postedBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorized!" });
    }
    //removing the post
    await Post.findByIdAndRemove(req.params.postId);
    //Delete image from cloudinary
    await cloudinary.uploader.destroy(post.cloudinary_id);
    res.json({ msg: "Post deleted & image is also deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

//@route /api/posts/like/:postId
//@desc likes a post
//@access private
router.put("/like/:postId", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    //check post for already liked or not
    if (
      post.likes.filter(like => like._id.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: "Post already been liked!" });
    }

    let result = await Post.findByIdAndUpdate(
      req.params.postId,
      { $push: { likes: req.user.id } },
      { new: true }
    ).populate("likes", "name");
    res.json(result.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

//@route /api/posts/unlike
//@desc unlikes a post
//@access private
router.put("/unlike/:postId", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    //check post is liked or not
    if (
      post.likes.filter(like => like._id.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).json({ msg: "Post has not been liked!" });
    }
    let result = await Post.findByIdAndUpdate(
      req.params.postId,
      { $pull: { likes: req.user.id } },
      { new: true }
    );
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

//@route /api/posts/comment/:postId
//@desc comments a post
//@access private
router.put(
  "/comment/:postId",
  [
    authMiddleware,
    check("comment", "To comment on a post comment(text) is compulsory!")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let comment = req.body.comment;
      comment.postedBy = req.user.id;

      let result = await Post.findByIdAndUpdate(
        req.params.postId,
        { $push: { comments: { comment, postedBy: req.user.id } } },
        { new: true }
      )
        .populate("comments.postedBy", "_id name avatarURL", "users")
        .exec();

      res.json(result.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error!");
    }
  }
);

//@route /api/posts/uncomment/:postId
//@desc uncomments a post
//@access private
router.put(
  "/uncomment/:postId/:commentId",
  [
    authMiddleware,
    check("comment", "Comment(text) is required to delete comment!")
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const post = await Post.findById(req.params.postId);
      //pull out comment
      const comments = post.comments.find(
        comment => comment.id === req.params.commentId
      );
      //check comment exists or not
      if (!comments) {
        return res.status(404).json({ msg: "Comment not found" });
      }

      let result = await Post.findByIdAndUpdate(
        req.params.postId,
        { $pull: { comments: { _id: req.params.commentId } } },
        { new: true }
      )
        .populate("comments.postedBy", "_id name", "users")
        .exec();
      // const removeIndex = post.comments
      //   .map(comment => comment.postedBy._id.toString())
      //   .indexOf(req.user.id);

      // post.comments.splice(removeIndex, 1);
      // await post.save();

      res.json(result);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error!");
    }
  }
);

// router.post("/upload", upload.single("image"), async (req, res) => {
//   try {
//     const result = await cloudinary.uploader.upload(req.file.path);
//     res.json(result);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Internal Server Error");
//   }
// });

module.exports = router;
