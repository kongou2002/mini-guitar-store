// _id: ObjectId( unique identifier )
// sheetNumber: String( sheet number - "Sheet 01", "Sheet 02", etc.)
// startTime: String( start time in format "HH:mm" )
// endTime: String( end time in format "HH:mm" )
// salaryCoefficient: Float( salary coefficient for the sheet)

const mongoose = require( 'mongoose' )
const sheetSchema = mongoose.Schema( {
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    sheetNumber: {
        type: String,
        required: true,
        enum: [ "sheet 1", "sheet 2", "sheet 3" ],
        trim: true,
        maxLength: 100,
    },
    startTime: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100,
    },
    endTime: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100,
    },
    salaryCoefficient: {
        type: Number,
        required: true,
        trim: true,
        maxLength: 100,
    },
} )

const Sheet = mongoose.model( 'Sheet', sheetSchema )

module.exports = {
    Sheet
}