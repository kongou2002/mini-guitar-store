const { productService } = require( '../services' )



const productController = {
    async addProduct( req, res, next ) {
        try {
            const product = await productService.addProduct( req.body )
            res.json( product )

        } catch ( error ) {
            next( error )
        }
    },
    async findProductById( req, res, next ) {
        try {
            const _id = req.params.id;
            const product = await productService.getProductById( _id )
            res.json( product )

        } catch ( error ) {
            next( error )
        }
    },
    async updateProductById( req, res, next ) {
        try {
            const _id = req.params.id
            const product = await productService.updateProductById( _id, req.body )
            res.json( product )
        } catch ( error ) {
            next( error )
        }
    },
    async deleteProductById( req, res, next ) {
        try {
            const _id = req.params.id
            const product = await productService.deleteProductById( _id )
            res.json( product )
        } catch ( error ) {
            next( error )
        }
    },
    async allProducts( req, res, next ) {
        try {
            const products = await productService.allProducts( req )
            res.json( products )
        } catch ( error ) {
            next( error )
        }
    },
    async paginateProducts( req, res, next ) {
        try {
            const products = await productService.paginateProducts( req )
            res.json( products )
        } catch ( error ) {
            next( error )
        }
    },
    async picUpload( req, res, next ) {
        try {
            // nhờ vào thg formidable nên req nó đã có sẵn json của hình ảnh
            const picture = await productService.picUpload( req )
            res.json( picture )
        } catch ( error ) {
            next( error )
        }
    }
}

// {
//     "model":"Jet bt gold",
//     "brand":"6049a1ad9c9a2615b86c04f2",
//     "frets":22,
//     "woodtype":"Mahogany",
//     "description":"This is the content of the post",
//     "price":239,
//     "available":19,
//     "itemsSold":10,
//     "shipping":true
// }




module.exports = productController;