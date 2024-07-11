export const GET_BLOCKS_SUCCESS = 'GET_BLOCKS_SUCCESS';

export const getBlocks = () => (dispatch) => {
  const blocks = [
    { id: 1, name: 'Block A', items: [] },
    { id: 2, name: 'Block B', items: [] },
    { id: 3, name: 'Block C', items: [] },
    { id: 4, name: 'Block D', items: [] },
    { id: 5, name: 'Block E', items: [] },
    { id: 6, name: 'Block F', items: [] },
    { id: 7, name: 'Block G', items: [] },
    { id: 8, name: 'Block H', items: [] },
    { id: 9, name: 'Block I', items: [] },
    { id: 10, name: 'Block J', items: [] },
    { id: 11, name: 'Block K', items: [] },
    { id: 12, name: 'Block L', items: [] },
    { id: 13, name: 'Block M', items: [] },
  ];
  dispatch({ type: GET_BLOCKS_SUCCESS, payload: blocks });
};
