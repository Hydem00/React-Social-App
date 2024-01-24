const mongoose = require("mongoose");
const Comment = require("../models/Comment");
const asyncHandler = require("../utils/asyncHandler");

exports.addComment = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        return next({
            message: `No post found for id ${req.params.id}`,
            statusCode: 404,
        });
    }

    let comment = await Comment.create({
        user: req.user.id,
        post: req.params.id,
        text: req.body.text,
    });

    post.comments.push(comment._id);
    post.commentsCount = post.commentsCount + 1;
    await post.save();

    comment = await comment
        .populate({ path: "user", select: "avatar username fullname" })
        .execPopulate();

    res.status(200).json({ success: true, data: comment });
});