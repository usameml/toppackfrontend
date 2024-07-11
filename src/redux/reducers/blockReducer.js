import { GET_BLOCKS_SUCCESS } from '../actions/blockActions';

const initialState = {
  blocks: [],
};

export const blockReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BLOCKS_SUCCESS:
      return {
        ...state,
        blocks: action.payload,
      };
    default:
      return state;
  }
};
