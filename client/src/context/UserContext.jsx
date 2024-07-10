import axios from "axios";
import { createContext, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { userReducer, actionTypes } from '../context/userContextReducer';

export const UserContext = createContext({
    users: [],
    userToken: null,
    error: null,
    formData: {
        id: '',
        role: '',
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
    },
    register: () => { },
    login: () => { },
    logout: () => { },
    updateUserData: () => { }
});

export function UserContextProvider({ children }) {
    const [state, dispatch] = useReducer(userReducer, {
        users: [],
        userToken: null,
        error: null,
        formData: {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
        }
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = document.cookie.split('; ').find(row => row.startsWith('token='));
            if (token) {
                try {
                    const { data } = await axios.get('/profile');
                    dispatch({ type: actionTypes.SET_USER_TOKEN, payload: data });
                } catch (err) {
                    console.error("Error fetching profile:", err);
                    if (!state.error) {
                        dispatch({ type: actionTypes.SET_ERROR, payload: "Failed to fetch user data" });
                        toast.error("Failed to fetch user data");
                    }
                }
            }
        };

        fetchUserProfile();
    }, [state.error]);

    const register = async (firstName, lastName, username, email, password) => {
        try {
            const { data: maxIdData } = await axios.get('/maxUserId');
            const newId = maxIdData.maxId + 1;

            const { data } = await axios.post('/register', {
                id: newId,
                role: 'user',
                firstName,
                lastName,
                username,
                email,
                password
            });

            if (data.error) {
                toast.error(data.error);
            } else {
                dispatch({ type: actionTypes.RESET_FORM_DATA });
                toast.success('Signup Successful. Welcome!');
                navigate('/login');
            }
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    const login = async (email, password) => {
        try {
            const { data } = await axios.post('/login', { email, password });

            if (data.error) {
                toast.error(data.error);
            } else {
                dispatch({ type: actionTypes.SET_USER_TOKEN, payload: data.user });
                toast.success('Login Successful. Welcome!');
                if (data.user && data.user.role === 'admin') {
                    navigate('/userslist');
                } else if (data.user && data.user.role === 'user') {
                    navigate('/dashboard');
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const logout = async () => {
        try {
            await axios.post('/logout');
            dispatch({ type: actionTypes.LOGOUT });
        } catch (error) {
            console.error('Logout failed:', error);
            toast.error("Logout failed");
        }
    };

    const updateUserData = async (id, updateData) => {
        try {
            console.log(`Updating user with ID: ${id}`);  // Debugging line
            const response = await axios.put(`/users/${id}`, updateData);
            const updatedUser = response.data;

            if (dispatch({ type: actionTypes.SET_USER_TOKEN, payload: updatedUser })) {
                console.log(`User updated successfully:`, updatedUser);  // Debugging line
                logout();
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
            toast.error("Updating failed");
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`/users/${id}`);
            dispatch({ type: actionTypes.DELETE_USER, payload: { id } });
            toast.success("User deleted successfully");
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error("Failed to delete user");
        }
    };

    const userCtx = { state, register, login, logout, updateUserData, deleteUser }

    return (
        <UserContext.Provider value={userCtx}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;
