const {Brand} = require('../models/brand')
const {ApiError} = require('../middleware/apiError')
const httpStatus = require('http-status')
const addBrand = async (brandName) => {
    try {
        const brand = new Brand({
            name: brandName,
        })
        await brand.save()
        return brand
    } catch (error) {
        throw error
    }
}
const getBrandById = async (id) => {
    try {
        const brand = await Brand.findById(id)
        if (!brand) {
            throw new ApiError(httpStatus.NOT_FOUND, 'brand not found')
        }
        return brand
    } catch (error) {
        throw error
    }
}
const deleteBrandById = async (id) => {
    try {
        const brand = await Brand.findByIdAndRemove(id)
        return brand;
    } catch (error) {
        throw error
    }
}
const showAllBrand = async (args) => {
    try {
        let order = args.order ? args.order : "asc"
        let limit = args.limit ? args.limit : 1000
        const brands = await Brand.find({}).sort([["_id", order]]).limit(limit)
        if (!brands) {
            throw new ApiError(httpStatus.NOT_FOUND, 'brand not found')
        }
        return brands
    } catch (error) {
        throw error
    }
}

module.exports = {
    addBrand,
    getBrandById,
    deleteBrandById,
    showAllBrand,
}