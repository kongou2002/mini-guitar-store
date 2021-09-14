const { Product } = require('../models/product')
const { ApiError } = require('../middleware/apiError')
const httpStatus = require('http-status')
const mongoose = require('mongoose')

const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: 'sangtran127',
    api_key: '261637981334771',
    api_secret: `${process.env.CN_API_SECRET}`,
})

const addProduct = async (body) => {
    try {
        const product = new Product({
            ...body
        })
        await product.save()
        return product
    } catch (error) {
        throw error;
    }
}
const getProductById = async (_id) => {
    try {
        const product = await Product.findById(_id).populate('brand')
        if (!product) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Product not found')
        }
        return product
    } catch (error) {
        throw error;
    }
}
const updateProductById = async (_id, productUpdate) => {
    try {
        const product = await Product.findOneAndUpdate(
            { _id },
            { "$set": productUpdate },
            { new: true }
        )
        if (!product) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Product not found')
        }
        return product
    } catch (error) {
        throw error;
    }
}
const deleteProductById = async (_id) => {
    try {
        const product = await Product.findByIdAndRemove(_id)
        if (!product) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Product not found')
        }
        return product
    } catch (error) {
        throw error
    }
}
const allProducts = async (req) => {
    try {
        const products = await Product.find({}).populate('brand').sort([
            [req.query.sortBy, req.query.order]
        ]).limit(parseInt(req.query.limit))
        return products
    } catch (error) {
        throw error
    }
}
const paginateProducts = async (req) => {
    try {

        // const example = {
        //     "keywords"
        // }
        let aggregateQueryArray = [];

        if (req.body.keywords && req.body.keywords != '') {
            const regex = new RegExp(`${req.body.keywords}`, 'gi')
            aggregateQueryArray.push({
                $match: { model: { $regex: regex } }
            })
        }

        if (req.body.brand && req.body.brand.length > 0) {
            let newBrandArray = req.body.brand.map((item) => (
                mongoose.Types.ObjectId(item)
            ))
            aggregateQueryArray.push({
                $match: { brand: { $in: newBrandArray } }
            })
        }

        if (req.body.frets && req.body.frets.length > 0) {
            aggregateQueryArray.push({
                $match: { frets: { $in: req.body.frets } }
            })
        }

        if (req.body.min && req.body.min > 0 || req.body.max && req.body.max < 5000) {
            if (req.body.min) {
                aggregateQueryArray.push({ $match: { price: { $gt: req.body.min } } })
                // minium price of guitar > 0
            }
            if (req.body.max) {
                aggregateQueryArray.push({ $match: { price: { $lt: req.body.max } } })
                // maximum price of guitar < 5000
            }

        }

        // add populate 
        aggregateQueryArray.push(
            {
                $lookup: {
                    from: "brands", //which collection of database
                    localField: "brand",
                    foreignField: "_id",
                    as: "brand"
                }
            },
            {
                $unwind: "$brand"
            }
        )
        ////////////////////////////////


        let aggregateQuery = Product.aggregate(aggregateQueryArray)
        const option = {
            page: req.body.page,
            limit: 6,
            sort: {
                date: 'desc'
            },

        }
        const products = await Product.aggregatePaginate(aggregateQuery, option)
        return products
    } catch (error) {
        throw error
    }
}
const picUpload = async (req) => {
    try {
        // file ko co s la do formData.append("file", values.pic) o file upload.js ben front-end
        const upload = await cloudinary.uploader.upload(req.files.file.path, {
            public_id: `${Date.now()}`,
            folder: 'guitar'
        })
        console.log(upload)
        return {
            public_id: upload.public_id,
            url: upload.url
        }
    } catch (error) {
        throw error
    }
}
module.exports = {
    addProduct,
    getProductById,
    updateProductById,
    deleteProductById,
    allProducts,
    paginateProducts,
    picUpload
}