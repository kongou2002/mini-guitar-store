const express = require('express');
const router = express.Router()
const productController = require('../controllers/product.controller')
const auth = require('../middleware/auth')
const {addProductValidator} = require('../middleware/validation')
const formidableMiddleware = require('express-formidable')

router.post('/', auth('createAny', 'product'), addProductValidator, productController.addProduct)

router.route('/product/:id')
.get(productController.findProductById)
.patch(auth('updateAny', 'product'), productController.updateProductById)
.delete(auth('deleteAny', 'product'), productController.deleteProductById)

router.get('/all', productController.allProducts)

router.post('/paginate/all', productController.paginateProducts)

/// UPLOADING IMAGE




router.post('/upload', auth('createAny', 'product'), formidableMiddleware(), productController.picUpload)



// uploading images

module.exports = router