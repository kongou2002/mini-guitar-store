const express = require( 'express' );
const router = express.Router()
const sheetController = require( '../controllers/sheets.controller' )


router.route( '/' )
    .get( sheetController.allSheets )
    .post( sheetController.addSheet )


router.route( '/:id' )
    .get( sheetController.findSheetById )
    .patch( sheetController.updateSheetById )
    .delete( sheetController.deleteSheetById )

module.exports = router