import { useContext, useEffect } from 'react';
import classes from '../Components/Update.module.css';
import UserContext from '../src/context/UserContext.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import useForm from '../src/hooks/useForm.js'
import { toast } from 'react-hot-toast';

export default function Update() {
    const userCtx = useContext(UserContext);
    const [userData, handleChange, setFormDataState] = useForm(userCtx.state.formData);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8000/users/${id}`)
            .then(res => {
                setFormDataState({
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    username: res.data.username,
                    email: res.data.email,
                    password: res.data.password,
                    role: res.data.role
                });
            })
            .catch(err => console.log('axios error', err));
    }, [id, setFormDataState]);

    async function handleSave() {
        try {
            if (userCtx.state.userToken.role === 'admin') {
                // Admin updates a user's info 
                userCtx.updateUserData(id, userData);
                toast.success("Updated successfully");
                navigate('/userslist');
                setTimeout(() => {
                    navigate(0);
                }, 1000);
            } else if (userCtx.state.userToken.role === 'user') {
                // User updates their info
                userCtx.updateUserData(id, userData);
                console.log('User Data after saving:', userData);
                userCtx.logout();
                navigate('/login');
                toast.success("Updated successfully");
            }
        } catch (err) {
            console.log('Error updating user:', err);
        }
    }

    function handleCloseModal() {
        if (userCtx.state.userToken.role === 'admin') { navigate('/userslist') }
        else if (userCtx.state.userToken.role === 'user') { navigate('/dashboard') }
    }

    return (
        <>
            <div className={classes.containerModal}>
                <div className={classes.containerItems}>
                    <header className={classes.header}><h2>Profile information:</h2></header>
                    <div className={classes.formItems}>
                        <section>
                            <div>
                                <label htmlFor="firstName">First name:</label>
                                <input type="text" name='firstName' placeholder='firstName' onChange={handleChange} value={userData.firstName} />
                            </div>
                            <div>
                                <label htmlFor="lastName">Last name:</label>
                                <input type="text" name='lastName' placeholder='lastName' onChange={handleChange} value={userData.lastName} />
                            </div>
                        </section>
                        <section>
                            <div>
                                <label htmlFor="username">Username:</label>
                                <input type="text" name='username' placeholder='username' onChange={handleChange} value={userData.username} />
                            </div>
                            <div>
                                <label htmlFor="password">Password:</label>
                                <input type="text" name='password' placeholder='password' onChange={handleChange} value={userData.password} />
                            </div>
                        </section>
                        <section>
                            {userCtx.state.userToken.role === 'admin' &&
                                <div>
                                    <label htmlFor="role">Role:</label>
                                    <select name="role" id="role" value={userData.role} onChange={handleChange}>
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>}
                            <div>
                                <button className={classes.closeBtn} onClick={handleCloseModal}>Close</button>
                                <button onClick={handleSave}>Save</button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}
