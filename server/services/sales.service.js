const { Sale } = require( '../models/sales' );
const { ApiError } = require( '../middleware/apiError' );
const { Product } = require( '../models/product' );
const httpStatus = require( 'http-status' );

const addSale = async (body) => {
    try {
        const sale = new Sale({
            ...body,
        });
        await sale.save();
        return sale;
    } catch (error) {
        throw error;
    }
  };
const allSales = async ( req ) => {
    try {
        const sales = await Sale.find().populate( 'employeeId' ).populate( 'products.productId' );
        return sales;
    } catch ( error ) {
        throw error;
    }
}
const getSaleById = async ( _id ) => {
    try {
        const sale = await Sale.findById( _id ).populate( 'employeeId' ).populate( 'productId' );
        if ( !sale ) {
            throw new ApiError( httpStatus.NOT_FOUND, 'Sale not found' );
        }
        return sale;
    } catch ( error ) {
        throw error;
    }
}
const updateSaleById = async ( _id, saleUpdate ) => {
    try {
        const sale = await Sale.findOneAndUpdate(
            { _id },
            { $set: saleUpdate },
            { new: true }
        );
        if ( !sale ) {
            throw new ApiError( httpStatus.NOT_FOUND, 'Sale not found' );
        }
        return sale;
    } catch ( error ) {
        throw error;
    }
}
const deleteSaleById = async ( _id ) => {
    try {
        const sale = await Sale.findByIdAndRemove( _id );
        if ( !sale ) {
            throw new ApiError( httpStatus.NOT_FOUND, 'Sale not found' );
        }
        return sale;
    } catch ( error ) {
        throw error;
    }
}
const getSaleByEmployeeId = async ( employeeId ) => {
    try {
        const sales = await Sale.find( { employeeId } );
        return sales;
    } catch ( error ) {
        throw error;
    }
}
const getPrice = async ( productId ) => {
    try {
        const product = await Product.findById( productId );
        return product.price;
    } catch ( error ) {
        throw error;
    }
}
const deleteMany = async()=>{
    try {
        const sale = await Sale.deleteMany();
        return sale;
    } catch (error) {
        throw error;
    }
}
module.exports = {
    addSale,
    allSales,
    updateSaleById,
    deleteSaleById,
    getSaleById,
    getSaleByEmployeeId,
    getPrice,
    deleteMany
}