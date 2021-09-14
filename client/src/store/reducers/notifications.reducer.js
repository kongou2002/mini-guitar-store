import {
    ERROR_GLOBAL,
    SUCCESS_GLOBAL,
    CLEAR_NOTIFICATION,
    REMOVE_PROD,
    // CLEAR_PROD_ADD,
} from '../types'
export default function notificationReducer(state = {}, action) {

    switch (action.type) {
        case ERROR_GLOBAL:
            return { ...state, error: true, message: action.payload }
        case SUCCESS_GLOBAL:
            return { ...state, success: true, message: action.payload }
        case CLEAR_NOTIFICATION:
            return {}
        case REMOVE_PROD:
            return { ...state, removeArticle: true }
        default:
            return state;
    }
}