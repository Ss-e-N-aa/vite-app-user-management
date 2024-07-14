
export const actionTypes = {
    SET_USER_TOKEN: 'SET_USER_TOKEN',
    LOGOUT: 'LOGOUT',
    SET_ERROR: 'SET_ERROR',
    RESET_FORM_DATA: 'RESET_FORM_DATA',
    UPDATE_USER: 'UPDATE_USER',
    DELETE_USER: 'DELETE_USER'
};

const initialState = {
    users: [],
    userToken: null,
    error: null,
    formData: {
        id: '',
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: ''
    }
};

export function userReducer(state, action) {
    switch (action.type) {
        case actionTypes.SET_USER_TOKEN:
            return { ...state, userToken: action.payload };
        case actionTypes.LOGOUT:
            return { ...state, userToken: initialState.userToken, error: initialState.error };
        case actionTypes.SET_ERROR:
            return { ...state, error: action.payload };
        case actionTypes.RESET_FORM_DATA:
            return { ...state, formData: initialState.formData };
        case actionTypes.UPDATE_USER:
            return {
                ...state, users: initialState.users.map(i => i.id === action.payload.id ? action.payload : i)
            };
        case actionTypes.DELETE_USER:
            return {
                ...state, users: state.users.filter(i => i.id !== action.payload.id)
            };
        default:
            return state;
    }
}
