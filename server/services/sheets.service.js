const { Sheet } = require( '../models/sheets' );
const { ApiError } = require( '../middleware/apiError' );
const httpStatus = require( 'http-status' );

const addSheet = async ( body ) => {
    try {
        const sheet = new Sheet( {
            ...body,
        } );
        await sheet.save();
        return sheet;
    } catch ( error ) {
        throw error;
    }
}
const allSheets = async ( req ) => {
    try {
        const sheets = await Sheet.find();
        return sheets;
    } catch ( error ) {
        throw error;
    }
}
const getSheetById = async ( _id ) => {
    try {
        const sheet = await Sheet.findById( _id ).populate( 'employeeId' ).populate( 'productId' );
        if ( !sheet ) {
            throw new ApiError( httpStatus.NOT_FOUND, 'Sheet not found' );
        }
        return sheet;
    } catch ( error ) {
        throw error;
    }
}
const updateSheetById = async ( _id, sheetUpdate ) => {
    try {
        const sheet = await Sheet.findOneAndUpdate(
            { _id },
            { $set: sheetUpdate },
            { new: true }
        );
        if ( !sheet ) {
            throw new ApiError( httpStatus.NOT_FOUND, 'Sheet not found' );
        }
        return sheet;
    } catch ( error ) {
        throw error;
    }
}
const deleteSheetById = async ( _id ) => {
    try {
        const sheet = await Sheet.findByIdAndRemove( _id );
        if ( !sheet ) {
            throw new ApiError( httpStatus.NOT_FOUND, 'Sheet not found' );
        }
        return sheet;
    } catch ( error ) {
        throw error;
    }
}

const getSheetByDate = async ( date ) => {
    try {
        const sheet = await Sheet.find( { date } ).populate( 'employeeId' ).populate( 'productId' );
        if ( !sheet ) {
            throw new ApiError( httpStatus.NOT_FOUND, 'Sheet not found' );
        }
        return sheet;
    } catch ( error ) {
        throw error;
    }
}

module.exports = {
    addSheet,
    allSheets,
    getSheetById,
    updateSheetById,
    deleteSheetById,
    getSheetByDate
}
