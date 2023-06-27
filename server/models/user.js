const mongoose = require( 'mongoose' )
const validator = require( 'validator' )
const bcrypt = require( 'bcrypt' )
const jwt = require( 'jsonwebtoken' )
require( 'dotenv' ).config()
const userSchema = mongoose.Schema( {
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate( value ) {
            if ( !validator.isEmail( value ) ) {
                throw new Error( 'Invalid Email' )
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        enum: [ 'user', 'admin', 'sale_employees', 'manager' ], // enum just allow user or admin
        default: 'user'
    },
    firstName: {
        type: String,
        maxLength: 100,
        trim: true,
        default: '',
    },
    lastName: {
        type: String,
        maxLength: 100,
        trim: true,
        default: '',
    },
    cart: {
        type: Array,
        default: [],
    },
    history: {
        type: Array,
        default: [],
    },
    verified: {
        type: Boolean,
        default: false
    },
    sheets: {
        Array: [],
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sheet'
    }
} )
// ========= HASHING PASSWORD
// this method will run before save()
userSchema.pre( 'save', async function ( next ) {
    let user = this // this dai dien cho user intance tu cai req
    // if để khi mà người dùng thay đổi password thì thằng này mới chạy
    if ( user.isModified( 'password' ) ) {
        const salt = await bcrypt.genSalt( 10 ) // generate salt
        const hash = await bcrypt.hash( user.password, salt )
        user.password = hash
    }
    next() // next de di den save(), neu ko next() la ham save() ko chay
} )

// generate token, dont need to ask password to Auth milion time when user move
// so that we using token
userSchema.methods.generateAuthToken = function () {
    let user = this
    const userObj = {
        sub: user._id.toHexString(),
        email: user.email
    }
    const token = jwt.sign( userObj, process.env.DB_SECRET, { expiresIn: '1d' } )
    return token
}
userSchema.methods.generateRegisterToken = function () {
    let user = this
    const userObj = {
        sub: user._id.toHexString()
    }
    const token = jwt.sign( userObj, process.env.DB_SECRET, { expiresIn: '10h' } )
    return token
}

userSchema.statics.emailTaken = async function ( email ) {
    const user = await this.findOne( { email } );
    return !!user;
}
userSchema.methods.comparePassword = async function ( candidatePassword ) {
    // candidate password = hash password
    const user = this
    const match = await bcrypt.compare( candidatePassword, user.password )
    return match
}
// create instance

const User = mongoose.model( 'User', userSchema )

module.exports = { User }