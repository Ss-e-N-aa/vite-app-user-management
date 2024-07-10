import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import classes from '../Components/UserProfile.module.css';
import { Link } from 'react-router-dom';

export default function UserProfile() {
    const userCtx = useContext(UserContext);

    return (
        <>
            {userCtx.state.userToken && (
                <div className={classes.containerUser}>
                    <h2>Profile details</h2>
                    <ul>
                        <li className={classes.fullNameControl}>
                            <label>First name: </label>{userCtx.state.userToken.firstName}
                            <label>Last name: </label>{userCtx.state.userToken.lastName}
                        </li>
                        <li className={classes.fullNameControl}>
                            <label>User name: </label>{userCtx.state.userToken.username}
                            <label>Password: </label>{userCtx.state.userToken.password}
                        </li>
                        <li className={classes.fullNameControl}><label>Role: </label>{userCtx.state.userToken.role}</li>
                        <Link to={`/users/${userCtx.state.userToken.id}`}><button>Edit</button></Link>
                    </ul>
                </div>
            )}
        </>
    );
}
