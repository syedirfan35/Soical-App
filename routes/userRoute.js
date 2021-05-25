const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const authMiddleware = require("../middleware/auth");

const userCntrl = require("../controllers/userCntrl");

// @route POST /api/users
// @desc Register a user
// @access Public
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please enter valid email-id").isEmail(),
    check(
      "password",
      "Please enter a password with more than 6 chars"
    ).isLength({ min: 6 })
  ],
  userCntrl.register
);

//@route /api/users/follow
//@desc To follow a user
//@access Private
router.put(
  "/follow",
  [
    authMiddleware,
    check("userId", "Please enter user ID.")
      .not()
      .isEmpty(),
    check("followId", "Please enter a follower ID.")
      .not()
      .isEmpty()
  ],
  userCntrl.addFollowing,
  userCntrl.addFollower
);

//@route /api/users/unfollow
//@desc Unfollow a user
//@access Private
router.put(
  "/unfollow",
  [
    authMiddleware,
    check("userId", "User ID is required!")
      .not()
      .isEmpty(),
    check("unfollowId", "Unfollow ID is required!")
      .not()
      .isEmpty()
  ],
  userCntrl.removeFollowing,
  userCntrl.removeFollower
);

//@route /api/users/findPeople
//@desc Show all users
//@access Private
router.get("/find-people", authMiddleware, userCntrl.findPeople);

//@route /api/users/updateDetails
//@desc Update user details
//@access Private
router.post(
  "/update-details",
  [
    authMiddleware,
    check("bio", "Descprition is neeeded!")
      .not()
      .isEmpty(),
    check("age", "Please enter your age!")
      .not()
      .isEmpty(),
    check("phoneNumber", "Phone number is needed!")
      .not()
      .isEmpty(),
    check("gender", "Gender is needed!")
      .not()
      .isEmpty()
  ],
  userCntrl.updateDetails
);

//@route /api/users/remove
//@desc Update user details
//@access Private
router.delete("/remove", authMiddleware, userCntrl.removeUser);

module.exports = router;
