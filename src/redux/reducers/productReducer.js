import {
  GET_PRODUCTS_SUCCESS,
  ADD_PRODUCT_SUCCESS,
  DELETE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_SUCCESS,
  DELETE_HISTORY_RECORD,
  GET_CLICHES_SUCCESS,
  ADD_CLICHE_SUCCESS,
  UPDATE_CLICHE_SUCCESS,
  DELETE_CLICHE_SUCCESS,
  DELETE_CLICHE_HISTORY_RECORD,
} from '../types';

const initialState = {
  products: [],
  cliches: [],
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
      };
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        ),
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.filter((product) => product._id !== action.payload),
      };
    case DELETE_HISTORY_RECORD:
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === action.payload.productId
            ? {
                ...product,
                history: product.history.filter(
                  (record) => record._id !== action.payload.historyId
                ),
              }
            : product
        ),
      };
    case GET_CLICHES_SUCCESS:
      return {
        ...state,
        cliches: action.payload,
      };
    case ADD_CLICHE_SUCCESS:
      return {
        ...state,
        cliches: [...state.cliches, action.payload],
      };
    case UPDATE_CLICHE_SUCCESS:
      return {
        ...state,
        cliches: state.cliches.map((cliche) =>
          cliche._id === action.payload._id ? action.payload : cliche
        ),
      };
    case DELETE_CLICHE_SUCCESS:
      return {
        ...state,
        cliches: state.cliches.filter((cliche) => cliche._id !== action.payload),
      };
    case DELETE_CLICHE_HISTORY_RECORD:
      return {
        ...state,
        cliches: state.cliches.map((cliche) =>
          cliche._id === action.payload.clicheId
            ? {
                ...cliche,
                history: cliche.history.filter(
                  (record) => record._id !== action.payload.historyId
                ),
              }
            : cliche
        ),
      };
    default:
      return state;
  }
};
