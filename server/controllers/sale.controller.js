const { saleService, productService } = require( '../services' )
const { updateProductById } = require( '../services/product.service' )
const saleController = {
    async addSale( req, res, next ) {
        try {
            const employeeId = req.user._id
            const { productId, quantity } = req.body
            const product = await productService.getProductById( productId )
            if ( product.quantity < quantity ) {
                throw new Error( 'Not enough product in stock' )
            } else if ( product.quantity === 0 ) {
                throw new Error( 'Product out of stock' )
            }
            const updateProduct = await updateProductById( productId, { available: product.available - quantity } )
            console.log( updateProduct )
            const productPrice = await saleService.getPrice( productId )
            const price = productPrice * quantity
            const sale = await saleService.addSale( { productId, quantity, employeeId, price } )
            res.json( sale )
        }
        catch ( error ) {
            next( error )
        }
    },
    async findSaleById( req, res, next ) {
        try {
            const _id = req.params.id;
            const sale = await saleService.getSaleById( _id )
            res.json( sale )

        }
        catch ( error ) {
            next( error )
        }
    },
    async updateSaleById( req, res, next ) {
        try {
            const _id = req.params.id
            const sale = await saleService.updateSaleById( _id, req.body )
            res.json( sale )
        }
        catch ( error ) {
            next( error )
        }
    },
    async deleteSaleById( req, res, next ) {
        try {
            const _id = req.params.id
            const sale = await saleService.deleteSaleById( _id )
            res.json( sale )
        }
        catch ( error ) {
            next( error )
        }
    },
    async allSales( req, res, next ) {
        try {
            const sales = await saleService.allSales( req )
            res.json( sales )
        }
        catch ( error ) {
            next( error )
        }
    },
    async getSaleByEmployeeId( req, res, next ) {
        try {
            const employeeId = req.params.id
            const sales = await saleService.getSaleByEmployeeId( employeeId )
            res.json( sales )
        }
        catch ( error ) {
            next( error )
        }
    }
}

module.exports = saleController;