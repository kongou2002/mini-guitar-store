const {User} = require('../models/user')
const httpStatus = require('http-status')
const {ApiError} = require('../middleware/apiError')
const userService = require('./user.service')
const createUser = async(email, password) => {
    try {
        if(await User.emailTaken(email)) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'emaiL already taken')
        }
        const user = new User({
            email,
            password
        });
        await user.save()
        return user;
    } catch (error) {
        throw error;
    }
}
const genAuthToken = async (user) => {
    const token = await user.generateAuthToken()
    return token;
}
const signInWithEmailandPassword = async (email, password) => {
    try {
        // check mail 
        const user = await userService.findUserByEmail(email)
        if (!user) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'sorry bad email')
        }
        // check correct password 
        if (!(await user.comparePassword(password))) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'sorry bad password')
        }
        return user
    } catch (error) {
        throw error
    }
}
module.exports = {
    createUser,
    genAuthToken,
    signInWithEmailandPassword,
}