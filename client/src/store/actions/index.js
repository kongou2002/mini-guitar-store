import {
    GET_PROD_BY_SOLD,
    GET_PROD_BY_DATE,
    GET_PROD_PAGINATE,
    GET_PROD_BY_ID,
    CLEAR_CURRENT_PROD,
    REMOVE_PROD,
    ADD_PROD,
    CLEAR_PROD_ADD,
    ERROR_GLOBAL,
    SUCCESS_GLOBAL,
    CLEAR_NOTIFICATION,
    AUTH_USER,
    USER_ADD_TO_CART,
    USER_PAYMENT_SUCCESS,
    SIGN_OUT,
    UPDATE_PROFILE,
    CHANGE_EMAIL,
    GET_ALL_BRANDS,
    
} from '../types'

// USER

export const userAuthenticate = (user) => ({
    type: AUTH_USER,
    payload: user
})

export const userSignOut = (user) => ({
    type: SIGN_OUT,
})

export const userUpdateProfile = (user) => ({
    type: UPDATE_PROFILE,
    payload: user
})

export const userChangeEmail = (user) => ({
    type: CHANGE_EMAIL,
    payload: user
})

export const userAddToCart = (data) => ({
    type: USER_ADD_TO_CART,
    payload: data
})

export const userPurchaseSuccess = (data) => ({
    type: USER_PAYMENT_SUCCESS,
    payload: data
})

/// PRODUCTS

export const productsBySold = (data) => ({
    type: GET_PROD_BY_SOLD,
    payload: data
})

export const productsByDate = (data) => ({
    type: GET_PROD_BY_DATE,
    payload: data
})

export const productsByPaginate = (products) => ({
    type: GET_PROD_PAGINATE,
    payload: products
})

export const productsRemove = () => ({
    type: REMOVE_PROD,
})

export const productsAdd = (product) => ({
    type: ADD_PROD,
    payload: product
})

export const clearProductsAdd = () => ({
    type: CLEAR_PROD_ADD,
})
export const productsById = (product) => ({
    type: GET_PROD_BY_ID,
    payload: product
})

export const clearCurrentProducts = (data) => ({
    type: CLEAR_CURRENT_PROD,
    payload: data
})
/// NOTIFICATIONS


export const errorGlobal = (message) => ({
    type: ERROR_GLOBAL,
    payload: message
})
export const successGlobal = (message) => ({
    type: SUCCESS_GLOBAL,
    payload: message
})
export const clearNotification = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAR_NOTIFICATION,
        })
    }
}
/// BRANDS
export const getAllBrands = (brands) => ({
    type: GET_ALL_BRANDS,
    payload: brands
})