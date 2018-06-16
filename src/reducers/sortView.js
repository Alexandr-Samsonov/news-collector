const initialState = {
  sortView: 'default'
};

export default (state = initialState, action) => {
  switch(action.type) {
    case 'CHANGE_SORT_VIEW':
      return {
        ...state,
        sortView: action.payload
      };
    default:
      return state;
  }
};