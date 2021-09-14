const AccessControl = require('accesscontrol');

const allPowers = {
    'create:any': ['*'],
    'read:any': ['*'],
    'update:any': ['*'],
    'delete:any': ['*'],
}

let grantsObject = {
    admin: {
        profile: allPowers,
        brand: allPowers,
        product: allPowers,
        site: allPowers,
    },
    user: {
       profile: {
           'read:own':['*', '!password', '!_id'],
           'update:own':['*'],
       },
       brand: {
           'read:any': ['*'],
       },
       product: {
           'read:any': ['*'],
       }
    },
}
const roles = new AccessControl(grantsObject)
module.exports = {
    roles
}