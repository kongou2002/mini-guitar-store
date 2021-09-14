const passport = require('passport')
const {ApiError} = require('./apiError')
const httpStatus = require('http-status')
const {roles} = require('../config/role')
const verify = (req, res, resolve, reject, props) => async (err, user) => {
    if (err || !user) {
        return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Sorry, UNAUTHORIZED'))
    }
    req.user = user;
    // before resolve
    // check if props dc truyen vao
    if (props.length) {
        const action = props[0] // createAny, readAny ................
        const resource = props[1] // profile, user ... ...
        const permissions = roles.can(req.user.role)[action](resource)
        if (!permissions.granted) {
            return reject(new ApiError(httpStatus.FORBIDDEN, 'You are not allowed to be allowed'))
        }
        res.locals.permissions = permissions
    }

    resolve()
}
const auth = (...props) => async (req, res, next) => {
    return new Promise((resolve, reject) => {
        passport.authenticate('jwt', {session: false}, verify(req, res, resolve, reject, props))(req, res, next)
    })
    .then(() => next())
    .catch((err) => next(err))
}
module.exports = auth