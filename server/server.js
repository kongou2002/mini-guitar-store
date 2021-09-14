const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3030
const mongoose = require('mongoose')
const xss = require('xss-clean') // middle that help prevent people breaking out server
const mongoSanitize = require('express-mongo-sanitize')
const routes = require('./routes')
const passport = require('passport')
const {jwtStrategy} = require('./middleware/passport')
const {handleError, convertToApiError} = require('./middleware/apiError')

// mongodb+srv://admin:<password>@cluster0.zp1bn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const mongoUri = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,
    useFindAndModify:false
})
//set up 
// body parser
app.use(express.json())
// sanitize
app.use(xss())
app.use(passport.initialize())
passport.use('jwt', jwtStrategy)
app.use(mongoSanitize())
// routes
app.use('/api', routes)
// handle error middleware
app.use(convertToApiError)
// if error not recognize ... convert to api error
app.use((err, req, res, next) => {
    handleError(err, res);
    
})





app.listen(port, () =>console.log(`listening on port ${port}`))