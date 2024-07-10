export const actionTypes = {
    SET_USERS: 'SET_USERS',
    SET_QUERY: 'SET_QUERY',
    SET_TOTAL_PAGES: 'SET_TOTAL_PAGES',
    SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
};

// eslint-disable-next-line no-unused-vars
const initialState = {
    users: [],
    query: '',
    totalPages: 0,
    currentPage: 1,
};

export function userReducer(state, action) {
    switch (action.type) {
        case (actionTypes.SET_USERS):
            return { ...state, users: action.payload };
        case actionTypes.SET_QUERY:
            return { ...state, query: action.payload };
        case actionTypes.SET_TOTAL_PAGES:
            return { ...state, totalPages: action.payload };
        case actionTypes.SET_CURRENT_PAGE:
            return { ...state, currentPage: action.payload };
        default:
            return state;
    }
}