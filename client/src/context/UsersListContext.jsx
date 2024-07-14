import { useReducer, createContext, useEffect } from "react";
import { userReducer, actionTypes } from "./usersListReducer";
import axios from 'axios';

export const UsersListContext = createContext({
    users: [],
    query: '',
    totalPages: 0,
    currentPage: 1,
    prevPage: () => { },
    nextPage: () => { },
    handlePageChange: () => { },
    setQuery: () => { },
});

export function UsersListContextProvider({ children }) {
    const [state, dispatch] = useReducer(userReducer, {
        users: [],
        query: '',
        totalPages: 0,
        currentPage: 1,
    });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`/userslist?q=${state.query}&page=${state.currentPage}&limit=8`);
                dispatch({ type: actionTypes.SET_USERS, payload: response.data.users });
                dispatch({ type: actionTypes.SET_TOTAL_PAGES, payload: response.data.totalPages });
                dispatch({ type: actionTypes.SET_CURRENT_PAGE, payload: response.data.currentPage });
            } catch (err) {
                console.error('Error fetching users:', err);
            }
        };
        fetchUsers();
    }, [state.query, state.currentPage]);

    const prevPage = () => {
        if (state.currentPage > 1) {
            dispatch({ type: actionTypes.SET_CURRENT_PAGE, payload: state.currentPage - 1 });
        }
    };

    const nextPage = () => {
        if (state.currentPage < state.totalPages) {
            dispatch({ type: actionTypes.SET_CURRENT_PAGE, payload: state.currentPage + 1 });
        }
    };

    const handlePageChange = (page) => {
        dispatch({ type: actionTypes.SET_CURRENT_PAGE, payload: page });
    };

    const setQuery = (query) => {
        dispatch({ type: actionTypes.SET_QUERY, payload: query });
    };

    const userListCtx = {
        state,
        prevPage, nextPage, handlePageChange, setQuery
    }

    return (
        <UsersListContext.Provider value={userListCtx}>
            {children}
        </UsersListContext.Provider>
    );
}

export default UsersListContext;