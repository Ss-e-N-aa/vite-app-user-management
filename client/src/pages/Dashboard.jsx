import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Navbar from "../Components/Navbar";
import UserProfile from "../Components/UserProfile";

export default function Dashboard() {
    const userCtx = useContext(UserContext)

    return (
        <>
            {userCtx.state.userToken && <Navbar title={`Welcome , ${userCtx.state.userToken.username}`} linkTo='logout' />}
            <UserProfile />
        </>
    )
}
