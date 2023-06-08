import axios from "axios";
import * as action from "./index";
import {
  getAuthHeader,
  removeTokenCookie,
  getTokenCookie,
} from "../../utils/tools";
axios.defaults.headers.post["Content-Type"] = "application/json";
export const productsBySort = ({ limit, sortBy, order, where }) => {
  return async (dispatch) => {
    try {
      const products = await axios.get(`api/products/all`, {
        params: { limit, sortBy, order },
      });

      switch (where) {
        case "bySold":
          dispatch(action.productsBySold(products.data));
          break;
        case "byDate":
          dispatch(action.productsByDate(products.data));
          break;
        default:
          return false;
      }
    } catch (error) {
      dispatch(action.errorGlobal(error.response?.data?.message));
    }
  };
};

export const productsByPaginate = (args) => {
  return async (dispatch) => {
    try {
      const products = await axios.post("/api/products/paginate/all", args);
      dispatch(action.productsByPaginate(products.data));
    } catch (error) {
      dispatch(action.errorGlobal(error.response.data.message));
    }
  };
};
export const productsRemove = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/products/product/${id}`, getAuthHeader());
      dispatch(action.productsRemove());
      dispatch(action.successGlobal("Delete product successfully"));
    } catch (error) {
      dispatch(action.errorGlobal(error.response.data.message));
    }
  };
};
export const productsAdd = (data) => {
  return async (dispatch) => {
    try {
      const product = await axios.post(`/api/products/`, data, getAuthHeader());
      dispatch(action.productsAdd(product.data));
      dispatch(action.successGlobal("Add product successfully"));
    } catch (error) {
      dispatch(action.errorGlobal(error.response.data.message));
    }
  };
};

export const productsById = (id) => {
  return async (dispatch) => {
    try {
      const product = await axios.get(`/api/products/product/${id}`);
      dispatch(action.productsById(product.data));
    } catch (error) {
      dispatch(action.errorGlobal(error.response.data.message));
    }
  };
};

export const productEdit = (values, id) => {
  return async (dispatch) => {
    try {
      await axios.patch(`/api/products/product/${id}`, values, getAuthHeader());
      dispatch(action.successGlobal("Updated successfully"));
    } catch (error) {
      dispatch(action.errorGlobal(error.response.data.message));
    }
  };
};
