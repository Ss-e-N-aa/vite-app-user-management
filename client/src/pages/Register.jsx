import { useContext } from "react";
import Navbar from "../Components/Navbar";
import UserContext from "../context/UserContext";
import useForm from '../hooks/useForm.js'

export default function SignUp() {
    const userCtx = useContext(UserContext)
    const [data, handleChange] = useForm(userCtx.state.formData)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { firstName, lastName, username, email, password } = data;
        userCtx.register(firstName, lastName, username, email, password);
    }

    return <>
        <Navbar title='Signup Page' />
        <div className="containerSignUp">
            <h1 id="authTitle">Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <input name="firstName" value={data.firstName} onChange={handleChange} type="text" placeholder="First name" />
                <input name="lastName" value={data.lastName} onChange={handleChange} type="text" placeholder="Last name" />
                <input name="username" value={data.username} onChange={handleChange} type="text" placeholder="Username" />
                <input name="email" value={data.email} onChange={handleChange} type="email" placeholder="Email" />
                <input name="password" value={data.password} onChange={handleChange} type="password" placeholder="Password" />
                <button type="submit">Create account</button>
                <span>Already have an account? <a href='/login'>Login</a></span>
            </form>
        </div>
    </>
}