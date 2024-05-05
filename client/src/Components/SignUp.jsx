import { useRef, useState } from "react";
/* import userData from '../data.json'; */
import Modal from "./Modal";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";


export default function SignUp() {
    const [data, setData] = useState({
        id: '',
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        image: ''
    })

    const navigate = useNavigate()

    // -------- refs --------
    const modal = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const emailRef = useRef();


    const registerUser = async (e) => {
        e.preventDefault();

        const enteredFirstName = firstNameRef.current.value;
        const enteredLastName = lastNameRef.current.value;
        const enteredUsername = usernameRef.current.value;
        const enteredPassword = passwordRef.current.value;
        const enteredEmail = emailRef.current.value;

        // -------- validation --------
        if (
            enteredFirstName.trim() === '' ||
            enteredLastName.trim() === '' ||
            enteredPassword.trim() === '' ||
            enteredUsername.trim() === '' ||
            enteredEmail.trim() === ''
        ) {
            // -------- show  modal --------
            modal.current.open();
            return;
        }

        // -------- Post request --------
        try {
            // Fetch maximum ID from database
            const { data: maxIdData } = await axios.get('/maxUserId');
            const newId = maxIdData.maxId + 1;

            const { data } = await axios.post('/signup', {
                id: newId,
                firstName: enteredFirstName,
                lastName: enteredLastName,
                username: enteredUsername,
                email: enteredEmail,
                password: enteredPassword,
                image: "https://picsum.photos/id/0/200"
            })
            if (data.error) {
                toast.error(data.error)
            } else {
                setData({
                    id: '',
                    firstName: '',
                    lastName: '',
                    username: '',
                    email: '',
                    password: '',
                    image: ''
                })
                toast.success('Signup Successful . Welcome!')
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
                    <p>Please provide a valid value for every field.</p>
                    <form method="dialog">
                        <button className="customBtn">Close</button>
                    </form>
                </div>
            </div>
        </Modal>

        <div className="containerSignUp">
            <h1 id="authTitle">Sign Up</h1>
            <form onSubmit={registerUser}>
                <span>Already have an account? <a href='/'>Login</a></span>
                <input name="firstName" value={data.firstName} onChange={handleChange} ref={firstNameRef} type="text" placeholder="Firstname" />
                <input name="lastName" value={data.lastName} onChange={handleChange} ref={lastNameRef} type="text" placeholder="Lastname" />
                <input name="username" value={data.username} onChange={handleChange} ref={usernameRef} type="text" placeholder="Username" />
                <input name="email" value={data.email} onChange={handleChange} ref={emailRef} type="email" placeholder="Email" />
                <input name="password" value={data.password} onChange={handleChange} ref={passwordRef} type="password" placeholder="Password" />
                <button type="submit">Create account</button>
            </form>
        </div>
    </>
}