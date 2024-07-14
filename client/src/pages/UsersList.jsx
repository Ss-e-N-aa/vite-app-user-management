import { useContext } from "react";
import Navbar from "../Components/Navbar";
import { UserContext } from '../context/UserContext';
import { UsersListContext } from '../context/UsersListContext';
import UsersTable from '../Components/UsersTable';
import Pagination from "../Components/Pagination";

export default function UsersList() {
    const userCtx = useContext(UserContext);
    const usersListCtx = useContext(UsersListContext);

    return (
        <>
            {userCtx.state.userToken && <Navbar title={`Welcome, ${userCtx.state.userToken.username}`} linkTo='logout' />}
            <div className='listContainer'>
                <UsersTable data={usersListCtx.state.users} />
                <Pagination />
            </div>
        </>
    );
}