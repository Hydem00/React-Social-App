const express = require("express");
const router = express.Router();
const {
    getUsers,
    getUser,
    getAllUsers,
    getTrendingUsers,
    follow,
    unfollow,
    feed,
    editUser,
} = require("../controllers/user");
const { protect } = require("../utils/protect");

router.route("/").get(protect, getUsers);
router.route("/feed").get(protect, feed);
router.route("/trending").get(protect, getTrendingUsers);
router.route("/all").get(protect, getAllUsers);
router.route("/").put(protect, editUser);
router.route("/:username").get(protect, getUser);
router.route("/:id/follow").get(protect, follow);
router.route("/:id/unfollow").get(protect, unfollow);


module.exports = router;