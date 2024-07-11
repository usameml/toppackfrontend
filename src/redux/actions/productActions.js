import axios from 'axios';
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

// Product Actions
export const getProducts = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3000/api/products');
    dispatch({ type: GET_PRODUCTS_SUCCESS, payload: response.data });
    dispatch(getCliches()); // Ensure clichés are fetched when products are fetched
  } catch (error) {
    console.error('Error fetching products', error);
  }
};

export const addProduct = (product) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3000/api/products', product);
    dispatch({ type: ADD_PRODUCT_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error adding product', error);
  }
};

export const updateProduct = (product) => async (dispatch) => {
  try {
    const response = await axios.put(`http://localhost:3000/api/products/${product.id}`, product);
    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error updating product', error);
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:3000/api/products/${productId}`);
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: productId });
  } catch (error) {
    console.error('Error deleting product', error);
  }
};

export const deleteHistoryRecord = (productId, historyId) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:3000/api/products/${productId}/history/${historyId}`);
    dispatch({
      type: DELETE_HISTORY_RECORD,
      payload: { productId, historyId },
    });
  } catch (error) {
    console.error('Error deleting history record:', error);
  }
};

// Cliche Actions
export const getCliches = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3000/api/cliches');
    dispatch({ type: GET_CLICHES_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error fetching cliches', error);
  }
};

export const addCliche = (cliche, productId) => async (dispatch) => {
  try {
    const response = await axios.post(`http://localhost:3000/api/cliches/${productId}`, cliche);
    dispatch({ type: ADD_CLICHE_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error adding cliche', error);
  }
};

export const updateCliche = (cliche) => async (dispatch) => {
  try {
    const response = await axios.put(`http://localhost:3000/api/cliches/${cliche.id}`, cliche);
    dispatch({ type: UPDATE_CLICHE_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error updating cliche', error);
  }
};

export const deleteCliche = (clicheId) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:3000/api/cliches/${clicheId}`);
    dispatch({ type: DELETE_CLICHE_SUCCESS, payload: clicheId });
  } catch (error) {
    console.error('Error deleting cliche', error);
  }
};

export const deleteClicheHistoryRecord = (clicheId, historyId) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:3000/api/cliches/${clicheId}/history/${historyId}`);
    dispatch({
      type: DELETE_CLICHE_HISTORY_RECORD,
      payload: { clicheId, historyId },
    });
  } catch (error) {
    console.error('Error deleting history record:', error);
  }
};
