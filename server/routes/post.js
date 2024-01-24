const express = require("express");
const router = express.Router();
const {
    addComment,
} = require("../controllers/post");
const { protect } = require("../utils/protect");


router.route("/:id/comments").post(protect, addComment);

module.exports = router;