import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react"
import Modal from "./Modal";
import { toast } from 'react-hot-toast';

import axios from "axios"

export default function LogIn() {
    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate()

    // -------- refs --------
    const modal = useRef();

    const emailRef = useRef();
    const passwordRef = useRef();


    async function loginUser(e) {
        e.preventDefault();

        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;

        // -------- validation --------
        if (
            enteredEmail.trim() === '' ||
            enteredPassword.trim() === ''
        ) {
            // -------- show  modal --------
            modal.current.open();
            return;
        }

        try {
            const { data } = await axios('/', {
                email: enteredEmail,
                password: enteredPassword
            })
            if (data.error) {
                toast.error(data.error)
            } else {
                setData({

                })
                toast.success('Login Successful . Welcome!')
                navigate('/userslist')
            }
        } catch (error) {
            console.log(error)
        }

    }

    function handleChange(e) {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    return <>
        <Modal ref={modal}>
            <div className="modal-backdrop">
                <div className="modal-container">
                    <h2>Invalid Input</h2>
                    <p>Please provide a valid username and password.</p>
                    <form method="dialog">
                        <button className="customBtn">Close</button>
                    </form>
                </div>
            </div>
        </Modal>
        <p className='randomUser'>
            atuny0@sohu.com
            <br />
            9uQFF1Lh
        </p>
        <div className="containerLogin">
            <h1 className="authTitle">Login</h1>
            <form onSubmit={loginUser}>
                <span>Dont have an account yet? <a href="/signup">Signup</a></span>
                <input name="email" value={data.email} type="email" placeholder="Email" onChange={handleChange} ref={emailRef} />
                <input name="password" value={data.password} type="password" placeholder="Password" onChange={handleChange} ref={passwordRef} />
                <button type='submit'>Log In</button>
            </form>
        </div >
    </>
}
