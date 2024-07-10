import classes from '../Components/UsersTable.module.css';
import { Link, useNavigate } from "react-router-dom"
import UserContext from '../context/UserContext';
import { useContext } from 'react';

export default function UsersTable({ data }) {
    const userCtx = useContext(UserContext);
    const navigate = useNavigate();

    const handleDelete = (id) => {
        userCtx.deleteUser(id);
        // if i dont set a timeout and i use navigate(0); immediately , i get error bcus it aborts the request
        setTimeout(() => {
            navigate(0);
        }, 1000);
    };

    return (
        <>
            <table>
                <thead>
                    <tr className={classes.tableHeader}>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((i) => (
                        <tr className={classes.tableRow} key={i.id}>
                            <td><h3>{`${i.firstName} ${i.lastName}`}</h3></td>
                            <td><h4>{i.username}</h4></td>
                            <td><h4>{i.role}</h4></td>
                            <td><p>{i.email}</p></td>
                            <td className={classes.btnCol}><p><Link to={`/users/${i.id}`}><button>Edit</button></Link><button onClick={() => handleDelete(i.id)}>Delete</button></p></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}