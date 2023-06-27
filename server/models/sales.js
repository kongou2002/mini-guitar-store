// {
//     "_id": ObjectId( "sale_id" ),
//         "employeeId": ObjectId( "employee_id" ),
//             "productId": ObjectId( "product_id" ),
//                 "quantity": 5,
//                     "timestamp": ISODate( "2023-06-27T08:30:00.000Z" )
// }

const mongoose = require( 'mongoose' )
const saleSchema = mongoose.Schema( {
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        trim: true,
        maxLength: 100,
    },
    timestamp: {
        type: Date,
        default: Date.now,
        required: true,
        trim: true,
        maxLength: 100,
    },
    price: {
        type: Number,
        required: true,
        trim: true,
        maxLength: 100,
    }
} )

const Sale = mongoose.model( 'Sale', saleSchema )

module.exports = {
    Sale
}