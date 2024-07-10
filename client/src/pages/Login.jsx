import { useContext } from "react"
import Navbar from "../Components/Navbar";
import { UserContext } from "../context/UserContext";
import useForm from '../hooks/useForm.js'

export default function LogIn() {
    const [data, handleChange] = useForm({ email: '', password: '' });
    const userCtx = useContext(UserContext)

    function handleSubmit(e) {
        e.preventDefault();
        const { email, password } = data;
        userCtx.login(email, password)
    }

    return <>
        <Navbar title='Login Page' />
        <div className='randomUser'>
            userEmail@gmail.com
            <br />
            user1234
            <br />
            xinia1234@gmail.com
            <br />
            xinia1234
        </div>

        <div className="containerLogin">
            <h1 className="authTitle">Login</h1>
            <form onSubmit={handleSubmit}>
                <span>Don&apos;t have an account yet? <a href="/register">Signup</a></span>
                <input name="email" value={data.email} type="email" placeholder="Email" onChange={handleChange} />
                <input name="password" value={data.password} type="password" placeholder="Password" onChange={handleChange} />
                <button type='submit'>Log In</button>
            </form>
        </div >
    </>
}
