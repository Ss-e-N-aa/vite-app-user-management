import { Link } from "react-router-dom"
import Navbar from "../Components/Navbar"

export default function Home() {
    return (
        <>
            <Navbar title='Home Page' />
            <div className="container">
                <h1>Welcome !</h1>
                <ul>
                    <li>
                        <p>Login to an existing account <Link to='/login'><button>Login</button></Link></p>
                    </li>

                    <li >
                        <p>Create a new account <Link to='/register'><button>Signup</button></Link></p>
                    </li>
                </ul>
            </div>
        </>
    )
}
