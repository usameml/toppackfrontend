import {
  GET_REVENUES_SUCCESS,
  GET_EXPENSES_SUCCESS,
  ADD_REVENUE_SUCCESS,
  ADD_EXPENSE_SUCCESS,
  DELETE_REVENUE_SUCCESS,
  DELETE_EXPENSE_SUCCESS,
} from '../actions/financeActions';

const initialState = {
  revenues: [],
  expenses: [],
};

export const financeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVENUES_SUCCESS:
      return {
        ...state,
        revenues: action.payload,
      };
    case GET_EXPENSES_SUCCESS:
      return {
        ...state,
        expenses: action.payload,
      };
    case ADD_REVENUE_SUCCESS:
      return {
        ...state,
        revenues: [...state.revenues, action.payload],
      };
    case ADD_EXPENSE_SUCCESS:
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
      case DELETE_REVENUE_SUCCESS:
      return {
        ...state,
        revenues: state.revenues.filter((revenue) => revenue._id !== action.payload),
      };
    case DELETE_EXPENSE_SUCCESS:
      return {
        ...state,
        expenses: state.expenses.filter((expense) => expense._id !== action.payload),
      };
    default:
      return state;
  }
};
