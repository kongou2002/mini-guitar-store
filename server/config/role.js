const AccessControl = require( 'accesscontrol' );

const allPowers = {
    'create:any': [ '*' ],
    'read:any': [ '*' ],
    'update:any': [ '*' ],
    'delete:any': [ '*' ],
}

let grantsObject = {
    admin: {
        profile: allPowers,
        brand: allPowers,
        product: allPowers,
        site: allPowers,
        sale: allPowers,
        sheet: allPowers,
    },
    manager: {
        profile: {
            'read:own': [ '*' ],
            'update:own': [ '*' ],
        },
        product: {
            'read:any': [ '*' ],
            'update:any': [ '*' ],
            'create:any': [ '*' ],
        },
        brand: {
            'read:any': [ '*' ],
            'update:any': [ '*' ],
            'create:any': [ '*' ],
        },
        sheet: {
            'read:any': [ '*' ],
            'update:any': [ '*' ],
            'create:any': [ '*' ],
        },
        sale: {
            'read:any': [ '*' ],
            'update:any': [ '*' ],
            'create:any': [ '*' ],
        }
    },
    sale_employees: {
        profile: {
            'read:own': [ '*' ],
            'update:own': [ '*' ],
        },
        product: {
            'read:any': [ '*' ],
            'update:any': [ '*' ],
            'create:any': [ '*' ],
        },
        brand: {
            'read:any': [ '*' ],
            'update:any': [ '*' ],
            'create:any': [ '*' ],
        },
        sale: {
            'read:any': [ '*' ],
            'update:any': [ '*' ],
            'create:any': [ '*' ],
        }, sheet: {
            'read:any': [ '*' ],
        }
    },
    user: {
        profile: {
            'read:own': [ '*', '!password', '!_id' ],
            'update:own': [ '*' ],
        },
        brand: {
            'read:any': [ '*' ],
        },
        product: {
            'read:any': [ '*' ],
        }
    },
}
const roles = new AccessControl( grantsObject )
module.exports = {
    roles
}