import * as action from './index'
import axios from 'axios'
import { getAuthHeader, removeTokenCookie, getTokenCookie } from '../../utils/tools'

axios.defaults.headers.post['Content-Type'] = 'application/json'

export const userRegister = (values) => {
    return async (dispatch) => {
        try {
            const user = await axios.post('/api/auth/register', {
                email: values.email,
                password: values.password,
            });
            dispatch(action.userAuthenticate({
                data: user.data.user,
                auth: true,
            }))
            dispatch(action.successGlobal('Welcome, check your mail to verify your account'))
        } catch (error) {
            dispatch(action.errorGlobal(error.response.data.message))
        }
    }
}
export const userLogin = (values) => {
    return async (dispatch) => {
        try {
            const user = await axios.post('/api/auth/signin', {
                email: values.email,
                password: values.password,
            })
            dispatch(action.userAuthenticate({ data: user.data.user, auth: true }))
            dispatch(action.successGlobal(`Welcome back !! ${user.data.user.email}`))
        } catch (error) {
            dispatch(action.errorGlobal(error.response.data.message))
        }
    }
}

export const userIsAuth = () => {
    return async (dispatch) => {
        try {
            if (!getTokenCookie()) {
                throw new Error();
            }

            const user = await axios.get(`/api/auth/isauth`, getAuthHeader());

            console.log(user)

            dispatch(action.userAuthenticate({ data: user.data, auth: true }))
        } catch (error) {
            dispatch(action.userAuthenticate({ data: {}, auth: false }));
        }
    }
}
export const userSignOut = () => {
    return async (dispatch) => {
        removeTokenCookie()
        dispatch(action.userSignOut())
        dispatch(action.successGlobal(`Good bye !`))
    }
}
export const userUpdateProfile = (data) => {
    return async (dispatch, getState) => {
        try {
            const profile = await axios.patch('/api/users/profile', {
                data: data,
            }, getAuthHeader())
            const userData = {
                ...getState().users.data,
                firstName: profile.data.firstName,
                lastName: profile.data.lastName,
            }
            dispatch(action.userUpdateProfile(userData))
            dispatch(action.successGlobal('Profile updated successfully'))
        } catch (error) {
            dispatch(action.errorGlobal(error.response.data.message))
        }
    }
}
export const userChangeEmail = (data) => {
    return async (dispatch) => {
        try {
            await axios.patch(`/api/users/email`, {
                email: data.email,
                newEmail: data.newEmail,
            }, getAuthHeader())
            dispatch(action.userChangeEmail(data.newEmail))
            dispatch(action.successGlobal('Email updated successfully, Remember to verify your email'))
        } catch (error) {
            dispatch(action.errorGlobal(error.response.data.message))
        }
    }
}

export const userAddToCart = (item) => {
    return async (dispatch, getState) => {
        try {
            const cart = getState().users.cart;
            dispatch(action.userAddToCart([
                ...cart,
                item
            ]))
            dispatch(action.successGlobal(`${item.model} added to cart 🥰`))
        } catch (error) {
            dispatch(action.errorGlobal(error.response.data.message))
        }
    }
}

export const removeFromCart = (position) => {
    return async (dispatch, getState) => {
        try {
            const cart = getState().users.cart;
            cart.splice(position, 1)
            dispatch(action.userAddToCart(cart));
            
        } catch (error) {
            dispatch(action.errorGlobal(error.response.data.message))
        }
    }
}

export const userPurchaseSuccess = (orderID) => {
    return async (dispatch) => {
        try {
            const user = await axios.post('/api/transaction', {
                orderID
            }, getAuthHeader())
            dispatch(action.successGlobal('Thank you for purchase'))
            dispatch(action.userPurchaseSuccess(user.data))
        } catch (error) {
            dispatch(action.errorGlobal(error.response.data.message))
        }
    }
}