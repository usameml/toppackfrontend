import axios from 'axios';

export const GET_REVENUES_SUCCESS = 'GET_REVENUES_SUCCESS';
export const GET_EXPENSES_SUCCESS = 'GET_EXPENSES_SUCCESS';
export const ADD_REVENUE_SUCCESS = 'ADD_REVENUE_SUCCESS';
export const ADD_EXPENSE_SUCCESS = 'ADD_EXPENSE_SUCCESS';
export const DELETE_REVENUE_SUCCESS = 'DELETE_REVENUE_SUCCESS';
export const DELETE_EXPENSE_SUCCESS = 'DELETE_EXPENSE_SUCCESS';

export const getRevenues = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3000/api/finance/revenues');
    dispatch({ type: GET_REVENUES_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error fetching revenues', error);
  }
};

export const getExpenses = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3000/api/finance/expenses');
    dispatch({ type: GET_EXPENSES_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error fetching expenses', error);
  }
};

export const addRevenue = (revenue) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3000/api/finance/revenues', revenue);
    dispatch({ type: ADD_REVENUE_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error adding revenue', error);
  }
};

export const addExpense = (expense) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3000/api/finance/expenses', expense);
    dispatch({ type: ADD_EXPENSE_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error adding expense', error);
  }
};

export const deleteRevenue = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:3000/api/finance/revenues/${id}`);
    dispatch({ type: DELETE_REVENUE_SUCCESS, payload: id });
  } catch (error) {
    console.error('Error deleting revenue', error);
  }
};

export const deleteExpense = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:3000/api/finance/expenses/${id}`);
    dispatch({ type: DELETE_EXPENSE_SUCCESS, payload: id });
  } catch (error) {
    console.error('Error deleting expense', error);
  }
};
