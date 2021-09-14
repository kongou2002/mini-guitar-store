import {
    AUTH_USER,
    SIGN_OUT,
    UPDATE_PROFILE,
    CHANGE_EMAIL,
    USER_ADD_TO_CART,
    USER_PAYMENT_SUCCESS
} from '../types'

let DEFAULT_USER_STATE = {
    data: {
        _id: null,
        email: null,
        firstName: null,
        lastName: null,
        history: [],
        verified: null,

    },
    auth: null,
    cart: []
}
export default function usersReducer(state = DEFAULT_USER_STATE, action) {
    switch (action.type) {
        case AUTH_USER:
            return {
                ...state,
                // dong` 24 ly do neu khong co no thi cai data no thay doi sau khi tra xuong, nen minh muon thay doi ngay tuc thi
                data: { ...state.data, ...action.payload.data },
                //payload.data se lien he axios lay toan bo thong tin o backend vd o cuoi trang
                auth: action.payload.auth,
            }
        case SIGN_OUT:
            return {
                ...state,
                data: { ...DEFAULT_USER_STATE.data },
                auth: false
            }
        case UPDATE_PROFILE:
            return {
                ...state,
                data: { ...action.payload }
            }
        case CHANGE_EMAIL:
            return {
                ...state,
                data: { ...state.data, email: action.payload }
            }
        case USER_ADD_TO_CART:
            return {
                ...state,
                cart: action.payload
            }
        case USER_PAYMENT_SUCCESS: 
            return {
                ...state,
                cart:[],
                data: {
                    ...state.data, 
                    history: action.payload.history
                }
            }
        default:
            return state;
    }
}








/// ==========PAYLOAD.DATA==================================================
// {
//     "user": {
//         "role": "user",
//         "firstName": "",
//         "lastName": "",
//         "cart": [],
//         "history": [],
//         "verified": false,
//         "_id": "61250086e72a538198a9185f",
//         "email": "tranquangsang1207@gmail.com",
//         "password": "$2b$10$rz5ktFE8.KwSiOoj9F6r0uRYHWG9hiicp4QIoS4rYqz.etvB4yWe.",
//         "__v": 0
//     },
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTI1MDA4NmU3MmE1MzgxOThhOTE4NWYiLCJlbWFpbCI6InRyYW5xdWFuZ3NhbmcxMjA3QGdtYWlsLmNvbSIsImlhdCI6MTYyOTgxNDkxOCwiZXhwIjoxNjI5OTAxMzE4fQ.QYzBaFyM1SZv5iV9SE2-9LKAqD4z3bVzjKwzCw0iht0"
// }