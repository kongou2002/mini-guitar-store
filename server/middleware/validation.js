const {check, validationResult} = require('express-validator')
const httpStatus = require('http-status')
const addProductValidator = [
    //list of all thing we gonna check 
    check('model')
        .trim().not().isEmpty().withMessage('You need to add a model').bail()
        .isLength({min: 3}).withMessage('Minimum 3 character required').bail(),
    check('brand')
        .trim().not().isEmpty().withMessage('You need to add a brand'), 
    (req, res, next) => {
        const error = validationResult(req)
        // not isEmpty
        if (!error.isEmpty()) {
            return res.status(httpStatus.BAD_REQUEST).json({
                errors: error.array(),
            })
        }
        next();
    }
        

];

module.exports = {
    addProductValidator,
}