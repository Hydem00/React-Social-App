const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");

exports.login = asyncHandler(async (req, res, next) => {
    /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'User login'
    #swagger.description = 'Endpoint for user login.'
    */
    const { username, password } = req.body;

    if (!username || !password) {
        return next({
            message: "Please provide email and password",
            statusCode: 400,
        });
    }

    const user = await User.findOne({ username });

    if (!user) {
        return next({
            message: "The email is not yet registered to an accout",
            statusCode: 400,
        });
    }

    const match = await user.checkPassword(password);

    if (!match) {
        return next({ message: "The password does not match", statusCode: 400 });
    }
    const token = user.getJwtToken();
    res.status(200).json({ success: true, token });
});

exports.signup = asyncHandler(async (req, res, next) => {
    /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'User signup'
    #swagger.description = 'Endpoint for user registration.'
    */
    const { username, password } = req.body;

    const user = await User.create({ username, password });
    const token = user.getJwtToken();

    res.status(201).json({ success: true, token });
});

exports.me = asyncHandler(async (req, res, next) => {
    /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'Get current user'
    #swagger.description = 'Endpoint to get the current logged-in user information.'
    */
    const { avatar, username, fullname, email, _id, website, bio } = req.user;

    res
        .status(200)
        .json({
            success: true,
            data: { avatar, username, fullname, email, _id, website, bio },
        });
});