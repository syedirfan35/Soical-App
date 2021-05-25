const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const authMiddleware = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

//modals
const User = require("../models/User");

//@route GET /api/auth/google
//@desc log in a user
//@access Public
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  res.redirect("https://socialapp35.herokuapp.com/");
});

router.get("/current_user", (req, res) => {
  // console.log(req.user);
  let payload = {
    user: {
      id: req.user.id
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
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("https://socialapp35.herokuapp.com//");
});

//@route GET /api/auth
//@desc get logged in user
//@access Private
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("following", "_id name avatarURL")
      .populate("followers", "_id name avatarURL")
      .exec();
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error!");
  }
});

//@route POST /api/auth
//@desc login a user
//@access public
router.post(
  "/",
  [
    check("email", "Please enter a valid email-id!").isEmail(),
    check("password", "Password must be 6 chars long!").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials!" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials!" });
      }

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
      console.error(err.message);
      res.status(500).send("Server Error!");
    }
  }
);

module.exports = router;
