const initialState = {
    category: 'all'
};

export default function(state = initialState, action) {
    switch(action.type) {
        case 'CHANGE_REGION':
            return {
                ...state,
                category: action.payload
            };
        default:
            return state;
    }
};