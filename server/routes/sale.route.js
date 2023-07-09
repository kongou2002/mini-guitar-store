const express = require( 'express' );
const router = express.Router();
const saleController = require( '../controllers/sale.controller' );
const auth = require( '../middleware/auth' );

router.post( '/', auth( 'createAny', 'sale' ), saleController.addSale );
router.get( '/:id', saleController.findSaleById );
router.put( '/:id', auth( 'createAny', 'sale' ), saleController.updateSaleById );
router.delete( '/:id', auth( 'createAny', 'sale' ), saleController.deleteSaleById );
router.get( '/', auth( 'readAny', 'sale' ), saleController.allSales );
router.get( '/employee/:id', auth( 'createAny', 'sale' ), saleController.getSaleByEmployeeId );
router.delete( '/admin/delete', saleController.deleteAllSales);

module.exports = router;