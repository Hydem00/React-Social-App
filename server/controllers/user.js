const User = require("../models/User");
const Post = require("../models/Post");
const asyncHandler = require("../utils/asyncHandler");

exports.getUsers = asyncHandler(async (req, res, next) => {
    /*
        #swagger.tags = ['User']
        #swagger.summary = 'Get list of followed users'
        #swagger.description = 'Endpoint to retrieve all followed users.'
        #swagger.security = [{ "bearerAuth": [] }]
        #swagger.responses[200] = { 
            description: 'List of followed users successfully retrieved.',
            schema: { 
                $success: true, 
                $data: [{ 
                    _id: 'user_id', 
                    name: 'User Name', 
                    email: 'user@example.com', 
                    isFollowing: true 
                }]
            } 
        }
    */

    let users = await User.find().select("-password").lean().exec();

    users.forEach((user) => {
        user.isFollowing = false;
        const followers = user.followers.map((follower) => follower._id.toString());
        if (followers.includes(req.user.id)) {
            user.isFollowing = true;
        }
    });

    users = users.filter((user) => user._id.toString() !== req.user.id);

    res.status(200).json({ success: true, data: users });
});
/*
exports.getAllUsers = asyncHandler(async (req, res, next) => {
    /*
    #swagger.tags = ['User']
    #swagger.summary = 'Get all users'
    #swagger.description = 'Endpoint to retrieve all users from the database, excluding sensitive information.'
    #swagger.security = [{ "bearerAuth": [] }]
    

    const users = await User.find({})
        .select("_id username avatar fullname bio followers following")
        .lean()
        .exec();

    // Check if users were found
    if (!users || users.length === 0) {
        return next({
            message: 'No users found',
            statusCode: 404,
        });
    }

    // Respond with the list of all users
    res.status(200).json({ success: true, data: users });
});*/

exports.getAllUsers = asyncHandler(async (req, res, next) => {
    /*
    #swagger.tags = ['User']
    #swagger.summary = 'Get all users'
    #swagger.description = 'Endpoint to retrieve all users from the database, excluding sensitive information, and indicating whether the logged-in user is following them and if they are the logged-in user.'
    #swagger.security = [{ "bearerAuth": [] }]
    */

    const users = await User.find({})
        .select("-password")
        .lean()
        .exec();

    if (!users || users.length === 0) {
        return next({
            message: 'No users found',
            statusCode: 404,
        });
    }

    const loggedInUserId = req.user.id;

    const modifiedUsers = users.map(user => {
        const followers = user.followers.map(follower => follower.toString());

        return {
            ...user,
            isMe: user._id.toString() === loggedInUserId,
            isFollowing: followers.includes(loggedInUserId),
        };
    });

    res.status(200).json({ success: true, data: modifiedUsers });
});

exports.getUser = asyncHandler(async (req, res, next) => {
    /*
    #swagger.tags = ['User']
    #swagger.summary = 'Get specific user'
    #swagger.description = 'Endpoint to retrieve a specific user by their username.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['username'] = {
        in: 'path',
        description: 'Username of the user',
        required: true
    }
    */
    const user = await User.findOne({ username: req.params.username })
        .select("-password")
        .populate({
            path: "posts", select: "files tags user retweets retweetCount isLiked likes likesCount comments createdAt caption commentsCount likesCount",
            populate: { path: "user", select: "avatar fullname username" }

        })
        .populate({ path: "savedPosts", select: "files commentsCount likesCount" })
        .populate({ path: "followers", select: "avatar username fullname" })
        .populate({ path: "following", select: "avatar username fullname" })
        .lean()
        .exec();

    if (!user) {
        return next({
            message: `The user ${req.params.username} is not found`,
            statusCode: 404,
        });
    }

    user.posts.username = req.params.username

    user.posts.forEach((post) => {
        post.isLiked = false;
        const likes = post.likes.map((like) => like.toString());
        if (likes.includes(req.user.id)) {
            post.isLiked = true;
        }

        post.isRetweeted = false;
        const retweets = post.retweets && post.retweets.map((retweet) => retweet.toString());
        if (retweets && retweets.includes(req.user.id)) {
            post.isRetweeted = true;
        }



    })


    user.isFollowing = false;
    const followers = user.followers.map((follower) => follower._id.toString());

    user.followers.forEach((follower) => {
        follower.isFollowing = false;
        if (req.user.following.includes(follower._id.toString())) {
            follower.isFollowing = true;
        }
    });

    user.following.forEach((user) => {
        user.isFollowing = false;
        if (req.user.following.includes(user._id.toString())) {
            user.isFollowing = true;
        }
    });

    if (followers.includes(req.user.id)) {
        user.isFollowing = true;
    }

    user.isMe = req.user.id === user._id.toString();

    res.status(200).json({ success: true, data: user });
});

/*exports.getTrendingUsers = asyncHandler(async (req, res, next) => {
    /*
    #swagger.tags = ['User']
    #swagger.summary = 'Get trending or active users'
    #swagger.description = 'Endpoint to retrieve users based on engagement and activity or fallback to recently active users if no trending users are found.'
    #swagger.security = [{ "bearerAuth": [] }]
    

    let users = await User.aggregate([
        { $sort: { followersCount: -1, postCount: -1 } },
        { $limit: 10 } // Limit to top 10 trending users
    ]);

    // Fallback: If no trending users are found, fetch recently active or created users
    if (!users.length) {
        users = await User.find({})
            .sort({ createdAt: -1 }) // Sort by most recently created
            .limit(10) // Limit to 10 users
            .select("-password") // Exclude sensitive information
            .lean()
            .exec();
    }

    if (!users || users.length === 0) {
        return next({
            message: 'No users found',
            statusCode: 404,
        });
    }


    res.status(200).json({ success: true, data: users });
});*/

exports.getTrendingUsers = asyncHandler(async (req, res, next) => {
    let users = await User.aggregate([
        { $sort: { followersCount: -1, postCount: -1 } },
        { $limit: 10 } // Limit to top 10 trending users
    ]);

    // Fallback: If no trending users are found, fetch recently active or created users
    if (!users.length) {
        users = await User.find({})
            .sort({ createdAt: -1 }) // Sort by most recently created
            .limit(10) // Limit to 10 users
            .select("-password") // Exclude sensitive information
            .lean()
            .exec();
    }

    if (!users || users.length === 0) {
        return next({
            message: 'No users found',
            statusCode: 404,
        });
    }

    const loggedInUserId = req.user.id;

    const modifiedUsers = users.map(user => {

        user = user.toObject ? user.toObject() : user;

        // Add isMe and isFollowing flags
        user.isMe = user._id.toString() === loggedInUserId;
        user.isFollowing = user.followers && user.followers.includes(loggedInUserId);

        // Remove fields not needed in the response
        delete user.followers;
        delete user.following;

        return user;
    });

    res.status(200).json({ success: true, data: modifiedUsers });
});

exports.follow = asyncHandler(async (req, res, next) => {
    /*
    #swagger.tags = ['User']
    #swagger.summary = 'Follow a user'
    #swagger.description = 'Endpoint for the current user to follow another user.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID of the user to follow',
        required: true
    }
    */
    // make sure the user exists
    const user = await User.findById(req.params.id);

    if (!user) {
        return next({
            message: `No user found for id ${req.params.id}`,
            statusCode: 404,
        });
    }

    // make the sure the user is not the logged in user
    if (req.params.id === req.user.id) {
        return next({ message: "You can't unfollow/follow yourself", status: 400 });
    }

    // only follow if the user is not following already
    if (user.followers.includes(req.user.id)) {
        return next({ message: "You are already following him", status: 400 });
    }

    await User.findByIdAndUpdate(req.params.id, {
        $push: { followers: req.user.id },
        $inc: { followersCount: 1 },
    });
    await User.findByIdAndUpdate(req.user.id, {
        $push: { following: req.params.id },
        $inc: { followingCount: 1 },
    });

    res.status(200).json({ success: true, data: {} });
});

exports.unfollow = asyncHandler(async (req, res, next) => {
    /*
    #swagger.tags = ['User']
    #swagger.summary = 'Unfollow a user'
    #swagger.description = 'Endpoint for the current user to unfollow another user.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID of the user to unfollow',
        required: true
    }
    */
    const user = await User.findById(req.params.id);

    if (!user) {
        return next({
            message: `No user found for ID ${req.params.id}`,
            statusCode: 404,
        });
    }

    // make the sure the user is not the logged in user
    if (req.params.id === req.user.id) {
        return next({ message: "You can't follow/unfollow yourself", status: 400 });
    }

    await User.findByIdAndUpdate(req.params.id, {
        $pull: { followers: req.user.id },
        $inc: { followersCount: -1 },
    });
    await User.findByIdAndUpdate(req.user.id, {
        $pull: { following: req.params.id },
        $inc: { followingCount: -1 },
    });

    res.status(200).json({ success: true, data: {} });
});

exports.feed = asyncHandler(async (req, res, next) => {
    /*
    #swagger.tags = ['User']
    #swagger.summary = 'Get user feed'
    #swagger.description = 'Endpoint to retrieve the feed for a user.'
    #swagger.security = [{ "bearerAuth": [] }]
    */

    const following = req.user.following;

    const users = await User.find()
        .where("_id")
        .in(following.concat([req.user.id]))
        .exec();

    const postIds = users.map((user) => user.posts).flat();

    const posts = await Post.find()
        .populate({
            path: "comments",
            select: "text",
            populate: { path: "user", select: "avatar fullname username" },
        })
        .populate({ path: "user", select: "avatar fullname username" })
        .sort("-createdAt")
        .where("_id")
        .in(postIds)
        .lean()
        .exec();

    posts.forEach((post) => {
        // is the loggedin user liked the post
        post.isLiked = false;
        const likes = post.likes.map((like) => like.toString());
        if (likes.includes(req.user.id)) {
            post.isLiked = true;
        }

        post.isRetweeted = false;
        const retweets = post.retweets && post.retweets.map((retweet) => retweet.toString());
        if (retweets && retweets.includes(req.user.id)) {
            post.isRetweeted = true;
        }

        // is the loggedin saved this post
        post.isSaved = false;
        const savedPosts = req.user.savedPosts.map((post) => post.toString());
        if (savedPosts.includes(post._id)) {
            post.isSaved = true;
        }

        // is the post belongs to the loggedin user
        post.isMine = false;
        if (post.user._id.toString() === req.user.id) {
            post.isMine = true;
        }

        // is the comment belongs to the loggedin user
        post.comments.map((comment) => {
            comment.isCommentMine = false;
            if (comment.user._id.toString() === req.user.id) {
                comment.isCommentMine = true;
            }
        });
    });

    res.status(200).json({ success: true, data: posts });
});

exports.editUser = asyncHandler(async (req, res, next) => {
    /*
    #swagger.tags = ['User']
    #swagger.summary = 'Edit user details'
    #swagger.description = 'Endpoint to edit the details of a user, with the option to update the avatar.'
    #swagger.security = [{ "bearerAuth": [] }]
    */

    const { fullname, bio, avatar } = req.body;

    let update = { fullname, bio, avatar };

    const user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: update },
        { new: true, runValidators: true }
    ).select("-password"); // Exclude password from the returned document

    if (!user) {
        return next({
            message: 'User not found',
            statusCode: 404,
        });
    }

    res.status(200).json({ success: true, data: user });
});