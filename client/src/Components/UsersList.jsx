import axios from 'axios';
import { useState, useEffect } from "react";

export default function UsersList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/userslist');
                setUsers(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUsers();
    }, []);

    return <>
        <nav className='navbar'>
            <div className='logout'>
                <h1>Users List</h1>
                <a href="/">Logout</a>
            </div>
        </nav>

        <div className="list-container">
            <table>
                <thead>
                    <tr>
                        <th className='image-col'></th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((i) => (
                        <tr key={i.id}>
                            <td className='image-col'><img src="https://picsum.photos/id/0/200" alt="profile picture" /></td>
                            <td><h3>{`${i.firstName} ${i.lastName}`}</h3></td>
                            <td><h4>{i.username}</h4></td>
                            <td><p>{i.email}</p></td>
                            <td className='btn-col'><p><button>Edit</button><button>Delete</button></p></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
}

