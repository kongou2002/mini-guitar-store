const {brandService} = require('../services')


const brandController = {
    async addBrand(req, res, next) {
        try {
            const brand = await brandService.addBrand(req.body.brandName)
            res.json(brand)
        } catch (error) {
            next(error);
        }
    },   
    async getBrand(req, res, next) {
        try {
            const id = req.params.id
            const brand = await brandService.getBrandById(id)
            res.json(brand)
        } catch (error) {
            next(error);
        }
    },
    async deleteBrand(req, res, next) {
        try {
            const id = req.params.id
            const brand = await brandService.deleteBrandById(id)  
            res.json(brand)    
        } catch (error) {
            next(error);
        }
    },
    async getAllBrand(req, res, next) {
        try {
            const brand = await brandService.showAllBrand(req.body)
            res.json(brand)
        } catch (error) {
            next(error)
        }
    }
}



module.exports = brandController;