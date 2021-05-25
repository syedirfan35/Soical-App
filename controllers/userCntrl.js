const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const cloudinary = require("cloudinary");

const { validationResult } = require("express-validator");

const User = require("../models/User");
const Post = require("../models/Posts");

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists!" });
    }
    user = new User({
      name,
      email,
      password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    let payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      config.get("jwtSecretKey"),
      {
        expiresIn: 360000
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error!");
  }
};

const addFollowing = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await User.findById(req.body.userId);

    if (
      user.following.filter(f => f._id.toString() === req.body.followId)
        .length > 0
    ) {
      return res.status(400).json({ msg: "Already Following!" });
    } else {
      const result = await User.findByIdAndUpdate(req.body.userId, {
        $push: { following: req.body.followId }
      }).select("followers");
      res.json(result);
      // next();
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error!");
  }
};

const removeFollowing = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await User.findById(req.body.userId);

    if (
      user.following.filter(f => f._id.toString() === req.body.unfollowId)
        .length === 0
    ) {
      return res.status(400).json({ msg: "No Following!" });
    } else {
      const result = await User.findByIdAndUpdate(req.body.userId, {
        $pull: { following: req.body.unfollowId }
      }).select("following");
      res.json(result);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error!");
  }
};

const addFollower = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await User.findById(req.body.userId);

    if (
      user.followers.filter(f => f._id.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: "Already Followers!" });
    } else {
      const result = await User.findByIdAndUpdate(
        req.body.followId,
        { $push: { followers: req.body.userId } },
        { new: true }
      )
        .populate("followers", "_id name")
        .exec();
      res.json(result);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error!");
  }
};

const removeFollower = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.body.unfollowId, {
      $pull: { followers: req.body.userId }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
};

const findPeople = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const findPeople = await User.find({
      _id: { $nin: user.following }
    }).select("name followers following avatarURL");
    let result = findPeople.filter(f => f._id.toString() !== req.user.id);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error!");
  }
};

const updateDetails = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const result = await cloudinary.uploader.upload(req.body.avatarURL);

    let user = await User.findByIdAndUpdate(req.user.id, {
      bio: req.body.bio,
      age: req.body.age,
      phoneNumber: req.body.phoneNumber,
      gender: req.body.gender,
      avatarURL: result.secure_url,
      cloudinary_id: result.public_id
    });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error!");
  }
};

const removeUser = async (req, res) => {
  try {
    const posts = await Post.find({ postedBy: req.user.id });
    if (posts) {
      posts.map(async post => {
        await cloudinary.uploader.destroy(post.cloudinary_id);
      });
    }

    let deletedUser = await User.findByIdAndRemove(req.user.id);
    res.json(deletedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error!");
  }
};

module.exports = {
  addFollowing,
  removeFollowing,
  addFollower,
  findPeople,
  removeFollower,
  register,
  updateDetails,
  removeUser
};
