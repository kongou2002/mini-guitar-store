import axios from 'axios'
import * as action from './index'

export const getAllBrands = () => {
    return async (dispatch) => {
        try {
            const brands = await axios.get(`/api/brands/all`)
            dispatch(action.getAllBrands(brands.data))
        } catch (error) {
            dispatch(action.errorGlobal(error.response.data.message))
        }
    }
}