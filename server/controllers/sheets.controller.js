const { sheetService } = require( '../services' );

const sheetController = {
    async addSheet( req, res, next ) {
        try {
            const sheet = await sheetService.addSheet( req.body )
            res.json( sheet )

        }
        catch ( error ) {
            next( error )
        }
    },
    async findSheetById( req, res, next ) {
        try {
            const _id = req.params.id;
            const sheet = await sheetService.getSheetById( _id )
            res.json( sheet )

        }
        catch ( error ) {
            next( error )
        }
    },
    async updateSheetById( req, res, next ) {
        try {
            const _id = req.params.id
            const sheet = await sheetService.updateSheetById( _id, req.body )
            res.json( sheet )
        }
        catch ( error ) {
            next( error )
        }
    },
    async deleteSheetById( req, res, next ) {
        try {
            const _id = req.params.id
            const sheet = await sheetService.deleteSheetById( _id )
            res.json( sheet )
        }
        catch ( error ) {
            next( error )
        }
    },
    async allSheets( req, res, next ) {
        try {
            const sheets = await sheetService.allSheets( req )
            res.json( sheets )
        }
        catch ( error ) {
            next( error )
        }
    },
    // async getSheetByEmployeeId( req, res, next ) {
    //     try {
    //         const employeeId = req.params.id
    //         const sheets = await sheetService.getSheetByEmployeeId( employeeId )
    //         res.json( sheets )
    //     }
    //     catch ( error ) {
    //         next( error )
    //     }
    // }

}

module.exports = sheetController

// {
//     "sheetNumber": "Sheet 03",
//         "startTime": "18:00",
//             "endTime": "6:00",
//                 "salaryCoefficient": 1.5
// }