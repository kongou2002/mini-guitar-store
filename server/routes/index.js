const express = require( 'express' )
const authRoute = require( './auth.route' )
const usersRoute = require( './user.route' )
const brandRoute = require( './brand.route' )
const productRoute = require( './product.route' )
const siteRoute = require( './site.route' )
const transactionRoute = require( './transaction.route' )
const sheet = require( './sheet.route' )
const sale = require( './sale.route' )
const router = express.Router()

const routesIndex = [
    {
        path: '/auth',
        route: authRoute
    },
    {
        path: '/users',
        route: usersRoute
    },
    {
        path: '/brands',
        route: brandRoute
    },
    {
        path: '/products',
        route: productRoute
    },
    {
        path: '/site',
        route: siteRoute
    },
    {
        path: '/transaction',
        route: transactionRoute
    },
    {
        path: '/sheet',
        route: sheet
    },
    {
        path: '/sale',
        route: sale
    }

    // không cần phải app.use() mỗi route con nữa
]
routesIndex.forEach( route => {
    router.use( route.path, route.route )
} )


module.exports = router