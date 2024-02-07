const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");

exports.login = asyncHandler(async (req, res, next) => {
    /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'User login'
    #swagger.description = 'Endpoint for user login.'
    #swagger.requestBody = {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        username: {
                            type: 'string',
                            description: 'Username of the user',
                            required: true
                        },
                        password: {
                            type: 'string',
                            description: 'Password of the user',
                            required: true
                        }
                    },
                    required: ['username', 'password']
                },
                examples: {
                    example1: {
                        value: {
                            username: 'newuser',
                            password: 'newpassword123'
                        }
                    }
                }
            }
        }
    }
    #swagger.responses[200] = {
        description: 'Login successful',
        schema: { success: true, token: 'JWT_TOKEN_HERE' }
    }
    #swagger.responses[400] = {
        description: 'Missing credentials or invalid login details',
    }
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
    #swagger.requestBody = {
    required: true,
    content: {
        'application/json': {
            schema: {
                type: 'object',
                properties: {
                    username: {
                        type: 'string',
                        description: 'Desired username for the new user account',
                        required: true
                    },
                    password: {
                        type: 'string',
                        description: 'Desired password for the new user account',
                        required: true
                    }
                },
                required: ['username', 'password']
            },
            examples: {
                example1: {
                    value: {
                        username: 'newuser',
                        password: 'newpassword123'
                    }
                }
            }
        }
    }
    }
    #swagger.responses[201] = {
        description: 'User registration successful',
        schema: { success: true, token: 'JWT_TOKEN_HERE' }
    }
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
    #swagger.security = [{ "bearerAuth": [] }]
        #swagger.responses[200] = { 
            description: 'List of followed users successfully retrieved.',
            schema: { 
                success: true, 
                data: {
                    $avatar: 'URL_to_avatar',
                    $userxname: 'UserASDASDUsername',
                    $fullname: 'User Fullname',
                    $email: 'user@example.com',
                    $_id: 'UserID',
                    $website: 'http://userwebsite.com',
                    $bio: 'User biography...'
                }
            }
        }
    #swagger.responses[403] = { 
        description: 'Unauthorized. Token missing or invalid.'
    }
    */
    const { avatar, username, fullname, email, _id, website, bio } = req.user;

    res
        .status(200)
        .json({
            success: true,
            data: { avatar, username, fullname, email, _id, website, bio },
        });
});