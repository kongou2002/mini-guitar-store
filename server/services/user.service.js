const {User} = require('../models/user')
const {ApiError} = require('../middleware/apiError')
const httpStatus = require('http-status')
const jwt = require('jsonwebtoken')
require('dotenv').config()
// modify password user ...

const validateToken = async (token) => {
    return jwt.verify(token, process.env.DB_SECRET)
}

const findUserByEmail = async (email) => {
    return await User.findOne({email})
}
const findUserById = async (_id) => {
    return await User.findById(_id)
}
const updateUserProfile = async (req) => {
    try {

        // make sure to validate
    

        const user = await User.findOneAndUpdate(
            {_id: req.user._id}, 
            {
                "$set": {
                    ...req.body.data
                }
            
            },
            {new: true}
        )
        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
        }
        return user;
    } catch (error) {
        throw error
    }
}
const updateUserEmail = async(req) => {
    try {
        if (await User.emailTaken(req.body.newEmail)) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
        }
        const user = await User.findOneAndUpdate(
            {_id: req.user._id, email: req.user.email}, 
            {
                "$set": {
                    email: req.body.newEmail,
                    verified: false,
                }
            
            },
            {new: true}
        )
        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
        }
        return user;
    } catch (error) {
        throw error;
    }
}
module.exports = {
    findUserByEmail,
    findUserById,
    updateUserProfile,
    updateUserEmail,
    validateToken,
}